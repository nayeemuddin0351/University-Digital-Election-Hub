import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  increment,
  query,
  where,
  deleteDoc,
  getDocs,
  writeBatch
} from "firebase/firestore";
import { db } from "./firebase";

export type Role = "ADMIN" | "VOTER" | "CANDIDATE";
export type ElectionStatus = "ONGOING" | "FINISHED";

export interface User {
  id: string;
  name: string;
  role: Role;
  password?: string;
  hasVoted?: boolean;
  votedPosts?: string[];
}

export interface Candidate {
  id: string;
  userId: string;
  name: string;
  posts: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  manifesto?: string;
  photoUrl?: string;
  votes: number;
  postVotes?: Record<string, number>;
  notified?: boolean;
  rejectionReason?: string;
}

interface ElectionConfig {
  status: ElectionStatus;
  date: string;
  startTime: string;
  endTime: string;
  duration?: string;
  officialWinner: string;
  availablePosts: string[];
}

interface ElectionContextType {
  memberDB: Record<string, User>;
  candidates: Candidate[];
  availablePosts: string[];
  currentUser: User | null;
  electionStatus: ElectionStatus;
  electionDate: string;
  electionDuration: string;
  electionStartTime: string;
  electionEndTime: string;
  officialWinner: string;
  setCurrentUser: (user: User | null) => void;
  registerUser: (user: User) => Promise<void>;
  addCandidate: (candidate: Candidate) => Promise<void>;
  updateCandidateStatus: (candidateId: string, status: "APPROVED" | "REJECTED", rejectionReason?: string) => Promise<void>;
  updateManifesto: (candidateId: string, manifesto: string) => Promise<void>;
  castVote: (candidateId: string, post?: string) => Promise<void>;
  updateElectionConfig: (config: Partial<ElectionConfig>) => Promise<void>;
  setElectionStatus: (status: ElectionStatus) => Promise<void>;
  setElectionDuration: (duration: string) => Promise<void>;
  setElectionDate: (date: string) => Promise<void>;
  setElectionStartTime: (time: string) => Promise<void>;
  setElectionEndTime: (time: string) => Promise<void>;
  setOfficialWinner: (winner: string) => Promise<void>;
  addPost: (post: string) => Promise<void>;
  resetElectionData: () => Promise<void>;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {},
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const ElectionContext = createContext<ElectionContextType | undefined>(undefined);

export function ElectionProvider({ children }: { children: ReactNode }) {
  const [memberDB, setMemberDB] = useState<Record<string, User>>({});
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [availablePosts, setAvailablePosts] = useState<string[]>(["President", "General Secretary", "VP"]);
  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("election_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed as User;
      }
    } catch {}
    return null;
  });

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      const { password, ...safe } = user;
      localStorage.setItem("election_user", JSON.stringify(safe));
    } else {
      localStorage.removeItem("election_user");
    }
  };
  const [electionDate, setElectionDate] = useState("");
  const [electionDuration, setElectionDuration] = useState("10:00 AM - 4:00 PM");
  const [electionStartTime, setElectionStartTime] = useState("10:00");
  const [electionEndTime, setElectionEndTime] = useState("16:00");
  const [officialWinner, setOfficialWinner] = useState("");
  const [electionStatus, setElectionStatus] = useState<ElectionStatus>("FINISHED");

  const getBangladeshNow = () => {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + 6 * 3600000);
  };

  const parseTimeStr = (timeStr: string) => {
    const ampm = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (ampm) {
      let hours = parseInt(ampm[1]);
      const minutes = parseInt(ampm[2]);
      const period = ampm[3].toUpperCase();
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return { hours, minutes };
    }
    const h24 = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (h24) {
      return { hours: parseInt(h24[1]), minutes: parseInt(h24[2]) };
    }
    return null;
  };

  const calculateStatus = () => {
    if (!electionDate || !electionStartTime || !electionEndTime) return "FINISHED";
    const start = parseTimeStr(electionStartTime);
    const end = parseTimeStr(electionEndTime);
    if (!start || !end) return "FINISHED";
    const now = getBangladeshNow();
    const currentDate = now.toISOString().slice(0, 10);
    if (electionDate !== currentDate) {
      return electionDate > currentDate ? "FINISHED" : "FINISHED";
    }
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = start.hours * 60 + start.minutes;
    const endMinutes = end.hours * 60 + end.minutes;
    if (currentMinutes < startMinutes) return "FINISHED";
    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) return "ONGOING";
    return "FINISHED";
  };

  const syncStatusToFirestore = (status: ElectionStatus) => {
    updateDoc(doc(db, "config", "election"), {
      status,
      ...(status === "FINISHED" ? {
        officialWinner: candidates
          .filter(c => c.status === "APPROVED")
          .reduce((max, c) => (c.votes > (max?.votes ?? -1) ? c : max), candidates.filter(c => c.status === "APPROVED")[0])
          ?.name || ""
      } : {})
    }).catch(err => console.error("Auto status update error:", err));
  };

  // Returns true only if the election end time has genuinely passed
  const hasEnded = () => {
    if (!electionDate || !electionEndTime) return false;
    const now = getBangladeshNow();
    if (electionDate < now.toISOString().slice(0, 10)) return true;
    if (electionDate > now.toISOString().slice(0, 10)) return false;
    const end = parseTimeStr(electionEndTime);
    if (!end) return false;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    return currentMinutes >= end.hours * 60 + end.minutes;
  };

  const applyAutoStatus = () => {
    const computed = calculateStatus();
    if (computed === electionStatus) return;
    // Don't override manual ONGOING unless election has truly ended
    if (electionStatus === "ONGOING" && computed === "FINISHED" && !hasEnded()) return;
    setElectionStatus(computed);
    syncStatusToFirestore(computed);
  };

  // Auto-detect status when config changes
  useEffect(() => { applyAutoStatus(); }, [electionDate, electionStartTime, electionEndTime]);

  // Poll for time-based transitions
  useEffect(() => {
    const timer = setInterval(applyAutoStatus, 10000);
    return () => clearInterval(timer);
  }, [electionDate, electionStartTime, electionEndTime, electionStatus, candidates]);

  // Sync Users
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const users: Record<string, User> = {};
      snapshot.forEach((doc) => {
        users[doc.id] = doc.data() as User;
      });
      
      // Seed default admin if missing
      if (!users["admin"]) {
        const defaultAdmin: User = {
          id: "admin",
          name: "System Administrator",
          role: "ADMIN",
          password: "admin123",
          hasVoted: false,
        };
        setDoc(doc(db, "users", "admin"), defaultAdmin).catch(err => console.error("Admin seed error:", err));
      }

      // Seed a test voter for convenience
      if (!users["voter1"]) {
        setDoc(doc(db, "users", "voter1"), {
          id: "voter1",
          name: "Sample Voter",
          role: "VOTER",
          password: "voter123",
          hasVoted: false
        }).catch(err => console.error("Voter seed error:", err));
      }
      
      setMemberDB(users);
    }, (error) => console.error("Firestore sync error (users):", error));
    return unsub;
  }, []);

  // Sync Candidates
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "candidates"), (snapshot) => {
      const list: Candidate[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as Candidate & { post?: string };
        if (!Array.isArray(data.posts)) {
          data.posts = data.posts ? [String(data.posts)] : data.post ? [data.post] : [];
          updateDoc(doc(db, "candidates", docSnap.id), { posts: data.posts }).catch(err =>
            console.error("Migration write failed:", err)
          );
        }
        list.push(data as Candidate);
      });
      setCandidates(list);
    }, (error) => console.error("Firestore sync error (candidates):", error));
    return unsub;
  }, []);

  // Sync Configuration
  useEffect(() => {
    const configDocRef = doc(db, "config", "election");
    const unsub = onSnapshot(configDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.status) setElectionStatus(data.status);
        if (data.date) setElectionDate(data.date);
        if (data.duration) setElectionDuration(data.duration);
        if (data.startTime) setElectionStartTime(data.startTime);
        if (data.endTime) setElectionEndTime(data.endTime);
        if (data.officialWinner) setOfficialWinner(data.officialWinner);
        if (data.availablePosts) setAvailablePosts(data.availablePosts);
      } else {
        // Initialize if not exists
        setDoc(configDocRef, {
          status: "FINISHED",
          date: "",
          duration: "10:00 AM - 4:00 PM",
          startTime: "10:00",
          endTime: "16:00",
          officialWinner: "",
          availablePosts: ["President", "General Secretary", "VP"]
        }).catch(err => console.error(err));
      }
    }, (error) => console.error("Firestore sync error (config):", error));
    return unsub;
  }, []);

  const registerUser = async (user: User) => {
    try {
      await setDoc(doc(db, "users", user.id), user);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.id}`);
    }
  };

  const addCandidate = async (candidate: Candidate) => {
    try {
      await setDoc(doc(db, "candidates", candidate.id), candidate);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `candidates/${candidate.id}`);
    }
  };

  const updateCandidateStatus = async (candidateId: string, status: "APPROVED" | "REJECTED", rejectionReason?: string) => {
    try {
      const candidate = candidates.find(c => c.id === candidateId);
      if (!candidate) return;

      const updateData: Record<string, unknown> = { status, notified: true };
      if (rejectionReason) updateData.rejectionReason = rejectionReason;
      await updateDoc(doc(db, "candidates", candidateId), updateData);

      if (status === "APPROVED") {
        await updateDoc(doc(db, "users", candidate.userId), { role: "CANDIDATE" });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `candidates/${candidateId}`);
    }
  };

  const updateManifesto = async (candidateId: string, manifesto: string) => {
    try {
      await updateDoc(doc(db, "candidates", candidateId), { manifesto });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `candidates/${candidateId}`);
    }
  };

  const castVote = async (candidateId: string, post?: string) => {
    if (!currentUser) return;
    if (post && currentUser.votedPosts?.includes(post)) return;
    if (!post && currentUser.hasVoted) return;
    try {
      const candidateRef = doc(db, "candidates", candidateId);
      const candidate = candidates.find(c => c.id === candidateId);
      const currentPostVotes = candidate?.postVotes || {};
      const updatedPostVotes = post
        ? { ...currentPostVotes, [post]: (currentPostVotes[post] || 0) + 1 }
        : currentPostVotes;

      await updateDoc(candidateRef, {
        votes: increment(1),
        postVotes: updatedPostVotes,
      });

      if (post) {
        const newVotedPosts = [...(currentUser.votedPosts || []), post];
        await updateDoc(doc(db, "users", currentUser.id), { votedPosts: newVotedPosts });
        setCurrentUser(prev => prev ? { ...prev, votedPosts: newVotedPosts } : null);
      } else {
        await updateDoc(doc(db, "users", currentUser.id), { hasVoted: true });
        setCurrentUser(prev => prev ? { ...prev, hasVoted: true } : null);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `vote-operation`);
    }
  };

  const updateElectionConfig = async (config: Partial<ElectionConfig>) => {
    try {
      await updateDoc(doc(db, "config", "election"), config);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `config/election`);
    }
  };

  const setElectionStatusAction = async (status: ElectionStatus) => {
    setElectionStatus(status);
    try {
      if (status === "FINISHED") {
        const approved = candidates.filter(c => c.status === "APPROVED");
        const top = approved.reduce((max, c) => (c.votes > (max?.votes ?? -1) ? c : max), approved[0]);
        await updateDoc(doc(db, "config", "election"), { status, officialWinner: top?.name || "" });
      } else {
        await updateDoc(doc(db, "config", "election"), { status });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `config/election`);
    }
  };

  const setElectionDurationAction = async (duration: string) => {
    try {
      await updateDoc(doc(db, "config", "election"), { duration });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `config/election`);
    }
  };

  const setElectionDateAction = async (date: string) => {
    try {
      await updateDoc(doc(db, "config", "election"), { date });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `config/election`);
    }
  };

  const setElectionStartTimeAction = async (time: string) => {
    try {
      await updateDoc(doc(db, "config", "election"), { startTime: time });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `config/election`);
    }
  };

  const setElectionEndTimeAction = async (time: string) => {
    try {
      await updateDoc(doc(db, "config", "election"), { endTime: time });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `config/election`);
    }
  };

  const setOfficialWinnerAction = async (winner: string) => {
    try {
      await updateDoc(doc(db, "config", "election"), { officialWinner: winner });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `config/election`);
    }
  };

  const addPost = async (post: string) => {
    if (!availablePosts.includes(post)) {
      try {
        await updateDoc(doc(db, "config", "election"), { 
          availablePosts: [...availablePosts, post] 
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `config/election`);
      }
    }
  };

  const resetElectionData = async () => {
    try {
      const batch = writeBatch(db);

      // 1. Clear Candidates
      const candidateSnap = await getDocs(collection(db, "candidates"));
      candidateSnap.forEach((d) => {
        batch.delete(d.ref);
      });

      // 2. Delete all registered users (except admin) — must re-register
      const userSnap = await getDocs(collection(db, "users"));
      userSnap.forEach((d) => {
        const userData = d.data();
        if (userData.id !== "admin") {
          batch.delete(d.ref);
        }
      });

      // 3. Reset Config
      const configRef = doc(db, "config", "election");
      batch.update(configRef, {
        status: "FINISHED",
        officialWinner: "",
        duration: electionDuration,
        availablePosts: availablePosts,
        date: electionDate,
        startTime: electionStartTime,
        endTime: electionEndTime,
      });

      await batch.commit();
      localStorage.removeItem("election_user");
      setCurrentUserState(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "reset-operation");
    }
  };

  return (
    <ElectionContext.Provider
      value={{
        memberDB,
        candidates,
        availablePosts,
        currentUser,
        electionStatus,
        electionDate,
        electionDuration,
        electionStartTime,
        electionEndTime,
        officialWinner,
        setCurrentUser: (u) => setCurrentUser(u),
        registerUser,
        addCandidate,
        updateCandidateStatus,
        updateManifesto,
        castVote,
        updateElectionConfig,
        setElectionStatus: setElectionStatusAction,
        setElectionDuration: setElectionDurationAction,
        setElectionDate: setElectionDateAction,
        setElectionStartTime: setElectionStartTimeAction,
        setElectionEndTime: setElectionEndTimeAction,
        setOfficialWinner: setOfficialWinnerAction,
        addPost,
        resetElectionData,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
}

export function useElection() {
  const context = useContext(ElectionContext);
  if (!context) {
    throw new Error("useElection must be used within an ElectionProvider");
  }
  return context;
}
