import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useElection } from "@/lib/context";
import type { ElectionStatus, Candidate } from "@/lib/context";
import { useTheme } from "@/lib/theme";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const LOGO_URL = "/logo.png";

type Panel =
  | "home"
  | "election-phase"
  | "approve-candidates"
  | "manage-posts"
  | "ballot-box"
  | "apply-candidate"
  | "my-goals"
  | "results"
  | "ongoing-result";

const NAV_ADMIN: { label: string; panel: Panel }[] = [
  { label: "Home", panel: "home" },
  { label: "Election Phase", panel: "election-phase" },
  { label: "Approve Candidates", panel: "approve-candidates" },
  { label: "Manage Posts", panel: "manage-posts" },
  { label: "Ongoing Result", panel: "ongoing-result" },
  { label: "Results", panel: "results" },
];

const NAV_CANDIDATE: { label: string; panel: Panel }[] = [
  { label: "Home", panel: "home" },
  { label: "Ballot Box", panel: "ballot-box" },
  { label: "My Goals", panel: "my-goals" },
  { label: "Ongoing Result", panel: "ongoing-result" },
  { label: "Results", panel: "results" },
];

const NAV_VOTER: { label: string; panel: Panel }[] = [
  { label: "Home", panel: "home" },
  { label: "Ballot Box", panel: "ballot-box" },
  { label: "Apply as Candidate", panel: "apply-candidate" },
  { label: "Ongoing Result", panel: "ongoing-result" },
  { label: "Results", panel: "results" },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="bg-card border border-line rounded-xl px-6 py-4 mb-6">
      <h2 className="text-fg font-black text-lg tracking-wide">{title}</h2>
    </div>
  );
}

function HomePanel() {
  const { currentUser, electionStatus, electionDate, electionStartTime, electionEndTime, officialWinner, candidates } = useElection();
  const statusColors: Record<string, string> = {
    ONGOING: "text-green-400 bg-green-400/10 border-green-400/30",
    FINISHED: "text-red-400 bg-red-400/10 border-red-400/30",
  };
  const isWinner = electionStatus === "FINISHED" && officialWinner && currentUser?.name === officialWinner;

  return (
    <div>
      <SectionHeader title={`DASHBOARD HOME — WELCOME ${currentUser?.name?.toUpperCase() || ""}`} />
      {isWinner && (
        <div className="mb-6 bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 rounded-2xl border border-yellow-400/30 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,200,0,0.15),transparent_70%)]" />
          <div className="relative">
            <span className="text-6xl block mb-3">🏆</span>
            <h2 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2">
              CONGRATULATIONS!
            </h2>
            <p className="text-lg sm:text-xl text-yellow-300/80 font-bold">
              You are the Official Winner of the RMSTU Election!
            </p>
          </div>
        </div>
      )}
      <div className="bg-card rounded-xl border border-orange-500/30 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-orange-400 font-black text-xl">Election Guidelines</h3>
        </div>

        <div className="mb-5 flex flex-wrap gap-3">
          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border ${statusColors[electionStatus]}`} data-testid="status-election">
            <span className="w-2 h-2 rounded-full bg-current" />
            Status: {electionStatus}
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold border text-blue-400 bg-blue-400/10 border-blue-400/30">
            {electionDate || "No date set"} &mdash; {electionStartTime || "?"} &mdash; {electionEndTime || "?"}
          </span>
        </div>

        <div className="space-y-4 text-sm text-muted">
          <div className="flex items-start gap-3 p-3 bg-page rounded-lg">
            <span className="text-green-400 mt-0.5">&#10003;</span>
            <p><strong className="text-fg">Rule 1:</strong> One student, one vote. Each registered student can cast exactly one ballot.</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-page rounded-lg">
            <span className="text-red-400 mt-0.5">&#10007;</span>
            <p><strong className="text-fg">Rule 2:</strong> Once voted, it cannot be changed or withdrawn.</p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-page rounded-lg">
            <span className="text-cyan-400 mt-0.5">&#9432;</span>
            <p><strong className="text-fg">Rule 3:</strong> Review each candidate's manifesto carefully before voting.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ElectionPhasePanel() {
  const { electionStatus, electionDate, electionStartTime, electionEndTime, setElectionStatus, updateElectionConfig, resetElectionData } = useElection();

  const [localDate, setLocalDate] = useState(electionDate);
  const [localStart, setLocalStart] = useState(electionStartTime);
  const [localEnd, setLocalEnd] = useState(electionEndTime);

  useEffect(() => {
    setLocalDate(electionDate);
    setLocalStart(electionStartTime);
    setLocalEnd(electionEndTime);
  }, [electionDate, electionStartTime, electionEndTime]);

  const handleSchedule = () => {
    updateElectionConfig({ date: localDate, startTime: localStart, endTime: localEnd });
  };

  return (
    <div>
      <SectionHeader title="ELECTION SCHEDULE" />
      <div className="max-w-lg mx-auto">
        <div className="bg-card rounded-xl border border-line p-6 sm:p-8">
          <div className="space-y-5">
            <div className="bg-page rounded-xl border border-line p-4 flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${
                electionStatus === "ONGOING" ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`} />
              <span className={`font-black text-lg ${
                electionStatus === "ONGOING" ? "text-green-400" : "text-red-400"
              }`}>{electionStatus}</span>
              <select
                value={electionStatus}
                onChange={(e) => setElectionStatus(e.target.value as "ONGOING" | "FINISHED")}
                className="ml-auto px-3 py-2 bg-card border border-line rounded-lg text-fg text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="FINISHED">FINISHED</option>
                <option value="ONGOING">ONGOING</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-dim mb-2 uppercase tracking-wider">Date</label>
              <input
                type="date"
                value={localDate}
                onChange={(e) => setLocalDate(e.target.value)}
                className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-dim mb-2 uppercase tracking-wider">Start Time</label>
                <input
                  type="time"
                  value={localStart}
                  onChange={(e) => setLocalStart(e.target.value)}
                  className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dim mb-2 uppercase tracking-wider">End Time</label>
                <input
                  type="time"
                  value={localEnd}
                  onChange={(e) => setLocalEnd(e.target.value)}
                  className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleSchedule}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
            >
              SCHEDULE ELECTION
            </button>

            <div className="pt-4 border-t border-line space-y-3">
              <button
                onClick={() => {
                  if (confirm("Start a new election? This clears all candidates, votes, and resets all users to VOTER.")) {
                    resetElectionData();
                  }
                }}
                className="w-full py-3 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white border border-cyan-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                START NEW ELECTION
              </button>
              <button
                onClick={() => {
                  if (confirm("Reset all election data? This cannot be undone.")) {
                    resetElectionData();
                  }
                }}
                className="w-full py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                RESET ALL DATA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApproveCandidatesPanel() {
  const { candidates, updateCandidateStatus } = useElection();
  const [viewPhoto, setViewPhoto] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async (id: string) => {
    try {
      await updateCandidateStatus(id, "APPROVED");
      showToast("success", "Candidate approved successfully");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast("error", `Failed to approve candidate: ${msg}`);
      console.error("Approve error:", err);
    }
  };

  const handleReject = async (id: string, reason: string) => {
    try {
      await updateCandidateStatus(id, "REJECTED", reason);
      setRejectingId(null);
      showToast("success", "Candidate rejected");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      showToast("error", `Failed to reject candidate: ${msg}`);
      console.error("Reject error:", err);
    }
  };

  return (
    <div>
      <SectionHeader title="APPROVE CANDIDATES" />

      {toast && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-bold ${
          toast.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
        }`}>
          {toast.message}
        </div>
      )}
      
      <AnimatePresence>
        {viewPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setViewPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-xl w-full bg-page rounded-2xl overflow-hidden border border-line"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={viewPhoto} className="w-full h-auto" />
              <div className="p-4 flex justify-end">
                <button 
                  onClick={() => setViewPhoto(null)}
                  className="px-6 py-2 bg-card hover:bg-page text-fg rounded-xl font-bold text-sm"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-4 flex gap-3">
         <a
          href="#"
          onClick={(e) => e.preventDefault()}
          data-testid="link-view-responses"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 rounded-lg text-sm font-semibold hover:bg-cyan-500/30 transition-colors"
        >
          VIEW FORM RESPONSES (MOCK) &#8599;
        </a>
      </div>
      {candidates.length === 0 ? (
        <div className="bg-card rounded-xl border border-line p-10 text-center text-dim">
          No candidates have applied yet.
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-line overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-line bg-page">
                  <th className="px-5 py-3 text-left text-dim font-semibold">Photo</th>
                  <th className="px-5 py-3 text-left text-dim font-semibold">ID</th>
                  <th className="px-5 py-3 text-left text-dim font-semibold">Candidate Name</th>
                  <th className="px-5 py-3 text-left text-dim font-semibold">Applied Posts</th>
                  <th className="px-5 py-3 text-left text-dim font-semibold">Status</th>
                  <th className="px-5 py-3 text-left text-dim font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-line hover:bg-page transition-colors"
                    data-testid={`row-candidate-${c.id}`}
                  >
                    <td className="px-5 py-3.5">
  {c.photoUrl ? (
    <div 
      className="relative group w-12 h-12"
      onClick={() => setViewPhoto(c.photoUrl || null)}
    >
      <img src={c.photoUrl} alt={c.name} className="w-12 h-12 rounded-lg object-cover border border-line shadow-lg" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg cursor-pointer">
        <span className="text-[10px] text-fg font-bold">VIEW</span>
      </div>
    </div>
  ) : (
    <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center text-xs text-dim">N/A</div>
  )}
</td>
                    <td className="px-5 py-3.5 text-muted font-mono text-xs">{c.userId}</td>
                    <td className="px-5 py-3.5 text-fg font-bold">{c.name}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {(c.posts || []).map((p) => (
                          <span key={p} className="px-2 py-0.5 bg-orange-500/10 text-orange-400 rounded text-[10px] font-semibold">{p}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        c.status === "APPROVED" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                        c.status === "REJECTED" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                        "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {c.status === "PENDING" && rejectingId !== c.id && (
                        <div className="flex gap-2">
                          <button
                            data-testid={`button-approve-${c.id}`}
                            onClick={() => handleApprove(c.id)}
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-400 text-black text-[10px] font-black rounded-lg transition-all duration-200 cursor-pointer shadow-lg shadow-green-500/20"
                          >
                            APPROVE
                          </button>
                          <button
                            onClick={() => { setRejectingId(c.id); setRejectReason(""); }}
                            className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/30 text-[10px] font-black rounded-lg transition-all duration-200 cursor-pointer"
                          >
                            REJECT
                          </button>
                        </div>
                      )}
                      {c.status === "PENDING" && rejectingId === c.id && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Reason for rejection..."
                            className="w-full px-3 py-2 bg-page border border-red-500/30 rounded-lg text-fg text-[10px] placeholder-dim focus:outline-none focus:border-red-500"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReject(c.id, rejectReason)}
                              disabled={!rejectReason.trim()}
                              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all cursor-pointer ${
                                rejectReason.trim() ? "bg-red-500 hover:bg-red-400 text-white" : "bg-card text-dim cursor-not-allowed"
                              }`}
                            >
                              CONFIRM REJECT
                            </button>
                            <button
                              onClick={() => setRejectingId(null)}
                              className="px-3 py-1.5 bg-card hover:bg-page text-muted text-[10px] font-black rounded-lg transition-all cursor-pointer"
                            >
                              CANCEL
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ManagePostsPanel() {
  const { availablePosts, addPost } = useElection();
  const [newPost, setNewPost] = useState("");
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (newPost.trim()) {
      addPost(newPost.trim());
      setNewPost("");
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div>
      <SectionHeader title="MANAGE ELECTION POSTS" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-line p-6">
          <h3 className="text-muted font-semibold mb-4 text-sm uppercase tracking-wider">Current Posts</h3>
          <div className="space-y-2">
            {availablePosts.map((post) => (
              <div key={post} className="flex items-center gap-3 px-4 py-2.5 bg-page rounded-lg" data-testid={`text-post-${post}`}>
                <span className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                <span className="text-fg font-medium">{post}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-xl border border-line p-6">
          <h3 className="text-muted font-semibold mb-4 text-sm uppercase tracking-wider">Add New Post</h3>
          <div className="space-y-3">
            <input
              data-testid="input-new-post"
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="e.g. Treasurer"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg placeholder-dim focus:outline-none focus:border-green-500 transition-colors"
            />
            <button
              data-testid="button-add-post"
              onClick={handleAdd}
              className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
            >
              {added ? "ADDED!" : "ADD POST"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BallotBoxPanel() {
  const { candidates, currentUser, castVote, electionStatus, electionDate, electionStartTime, electionEndTime, availablePosts } = useElection();
  const approved = candidates.filter((c) => c.status === "APPROVED");
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({});

  const postsWithCandidates = availablePosts.filter(p =>
    approved.some(c => (c.posts || []).includes(p))
  );

  const allVoted = postsWithCandidates.length > 0 && postsWithCandidates.every(p => selectedVotes[p]);
  const votedPosts = currentUser?.votedPosts || [];
  const hasVotedAll = postsWithCandidates.length > 0 && postsWithCandidates.every(p => votedPosts.includes(p));

  if (electionStatus !== "ONGOING") {
    return (
      <div>
        <SectionHeader title="SECURE BALLOT BOX" />
        <div className="bg-card rounded-xl border border-yellow-500/30 p-10 text-center">
            <h3 className="text-yellow-400 font-black text-xl mb-2">Election Not Active</h3>
            <p className="text-dim text-sm">Voting is only available when the election status is ONGOING.</p>
        </div>
      </div>
    );
  }

  if (hasVotedAll) {
    return (
      <div>
        <SectionHeader title="SECURE BALLOT BOX" />
        <div className="bg-card rounded-xl border border-green-500/30 p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-green-400 font-black text-xl mb-2">Vote Submitted!</h3>
          <p className="text-dim text-sm">Your votes have been recorded. Thank you for participating.</p>
        </div>
      </div>
    );
  }

  if (approved.length === 0) {
    return (
      <div>
        <SectionHeader title="SECURE BALLOT BOX" />
        <div className="bg-card rounded-xl border border-line p-10 text-center text-dim">
          No approved candidates are available yet. Check back after candidate approval.
        </div>
      </div>
    );
  }

  const handleCastVotes = () => {
    Object.entries(selectedVotes).forEach(([post, candidateId]) => {
      if (!votedPosts.includes(post)) {
        castVote(candidateId, post);
      }
    });
  };

  return (
    <div>
      <SectionHeader title="SECURE BALLOT BOX" />
      <div className="mb-4 px-4 py-2 bg-page rounded-xl border border-line text-[10px] text-dim uppercase tracking-wider flex items-center gap-4">
        <span>{electionDate || "No date"}</span>
        <span>{electionStartTime} &mdash; {electionEndTime}</span>
      </div>
      <div className="space-y-8">
        {postsWithCandidates.map((post) => {
          const candidatesForPost = approved.filter(c => (c.posts || []).includes(post));
          const alreadyVoted = votedPosts.includes(post);
          return (
            <div key={post} className="bg-card rounded-xl border border-line overflow-hidden">
              <div className="px-6 py-4 bg-page border-b border-line">
                <h3 className="text-orange-400 font-black text-lg">{post}</h3>
              </div>
              {alreadyVoted ? (
                <div className="p-6 text-center text-green-400 text-sm font-semibold">
                  ✓ You have voted for this position.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {candidatesForPost.map((c) => (
                      <motion.div
                          key={c.id}
                          className={`rounded-2xl border-2 p-5 flex flex-col items-center text-center cursor-pointer transition-all duration-200 ${
                            selectedVotes[post] === c.id
                              ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                              : "border-cyan-500/30 hover:border-cyan-500/70 bg-page"
                          }`}
                          onClick={() => setSelectedVotes(prev => ({ ...prev, [post]: c.id }))}
                        >
                          {c.photoUrl ? (
                            <img src={c.photoUrl} alt={c.name} className="w-24 h-24 rounded-full object-cover border-4 border-cyan-500/50 mb-3 shadow-lg" />
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-cyan-500/20 border-4 border-cyan-500/50 flex items-center justify-center mb-3 shadow-lg">
                              <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          )}
                          <h4 className="text-fg font-bold text-sm mb-1">{c.name}</h4>
                          {c.manifesto ? (
                            <p className="text-dim text-[10px] leading-relaxed line-clamp-2 italic mb-2">"{c.manifesto}"</p>
                          ) : (
                            <p className="text-muted/50 text-[10px] italic mb-2">No manifesto.</p>
                          )}
                      {selectedVotes[post] === c.id && (
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold">SELECTED</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <button
          onClick={handleCastVotes}
          disabled={!allVoted}
          className={`w-full py-4 font-black text-sm rounded-xl transition-all duration-200 active:scale-95 shadow-lg cursor-pointer ${
            allVoted
              ? "bg-green-500 hover:bg-green-400 text-black shadow-green-500/20"
              : "bg-card text-dim cursor-not-allowed"
          }`}
        >
          {allVoted ? "✓ SUBMIT ALL VOTES" : "SELECT A CANDIDATE FOR EACH POSITION"}
        </button>
      </div>
    </div>
  );
}

function ApplyCandidatePanel() {
  const { currentUser, availablePosts, candidates, addCandidate } = useElection();
  const [posts, setPosts] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const alreadyApplied = candidates.some((c) => c.userId === currentUser?.id);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("File size too large. Max 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    setError("");
    if (!photoUrl) { setError("Please upload a profile photo."); return; }
    if (posts.length === 0) { setError("Please select at least one post."); return; }
    if (!currentUser) return;
    try {
      await addCandidate({
        id: `${currentUser.id}-${Date.now()}`,
        userId: currentUser.id,
        name: currentUser.name,
        post: posts[0],
        posts,
        status: "PENDING",
        manifesto: "",
        votes: 0,
        photoUrl,
      } as Candidate & { post: string });
      setSubmitted(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`Submission failed: ${msg}`);
      console.error("Submit error:", e);
    }
  };

  if (alreadyApplied || submitted) {
    return (
      <div>
        <SectionHeader title="APPLY AS CANDIDATE" />
        <div className="bg-card rounded-xl border border-green-500/30 p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-green-400 font-black text-xl mb-2">Application Submitted</h3>
          <p className="text-dim text-sm">Your candidacy application is pending admin approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader title="APPLY AS CANDIDATE" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-line p-6">
            <label className="block text-xs font-semibold text-dim mb-4 uppercase tracking-wider">
              Candidate Profile Photo
            </label>
            <div className="flex flex-col items-center gap-5">
               <div 
                 onClick={handleUploadClick}
                 className={`w-32 h-32 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 overflow-hidden relative group ${
                   photoUrl ? "border-green-500/50 bg-green-500/5" : "border-dim/30 bg-page hover:border-orange-500 hover:bg-orange-500/5"
                 }`}
               >
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   className="hidden" 
                   accept="image/*" 
                   onChange={handleFileChange} 
                 />
                 {photoUrl ? (
                    <>
                      <img src={photoUrl} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-xs font-bold">CHANGE</span>
                      </div>
                    </>
                 ) : (
                    <>
                      <svg className="w-8 h-8 text-dim group-hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="text-[10px] text-dim group-hover:text-orange-500 text-center px-2">CLICK TO UPLOAD FROM DEVICE</span>
                    </>
                 )}
               </div>
               {photoUrl && (
                 <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
                   <span>✓ Photo Ready</span>
                 </div>
               )}
            </div>
          </div>

            <div className="bg-card rounded-xl border border-line p-6">
            <label className="block text-xs font-semibold text-dim mb-3 uppercase tracking-wider">Select Posts (up to 2)</label>
            <div className="space-y-2">
              {availablePosts.map((p) => {
                const checked = posts.includes(p);
                const disabled = !checked && posts.length >= 2;
                return (
                  <label key={p} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                    checked ? "bg-orange-500/10 border-orange-500/30" : "bg-page border-line hover:border-muted"
                  }`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => {
                        setPosts(prev =>
                          checked ? prev.filter(x => x !== p) : [...prev, p]
                        );
                      }}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className={`text-sm font-medium ${checked ? "text-orange-400" : "text-fg"}`}>{p}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm px-1 font-medium">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-sm rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-orange-500/20 cursor-pointer"
          >
            SUBMIT CANDIDACY
          </button>
        </div>

        <div className="bg-card rounded-xl border border-line p-8">
           <h3 className="text-fg font-black text-xl mb-6 tracking-tight flex items-center gap-3">
             <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-sm">!</span>
             ELIGIBILITY CRITERIA
           </h3>
           <div className="space-y-4">
             {[
               { icon: "🎓", title: "Regular Student", desc: "Must be an active student of RMSTU." },
               { icon: "📊", title: "Academic Record", desc: "Must have a minimum CGPA of 2.50." },
               { icon: "⚖️", title: "Clear Record", desc: "No record of disciplinary actions or police case." },
               { icon: "💰", title: "No Dues", desc: "All semester and library fees must be paid." },
               { icon: "📝", title: "Valid ID", desc: "A valid university student identity card is required." }
             ].map((item, i) => (
               <div key={i} className="flex gap-4 p-4 rounded-xl bg-page border border-line">
                 <span className="text-2xl pt-1">{item.icon}</span>
                 <div>
                   <h4 className="text-orange-400 font-bold text-sm mb-1">{item.title}</h4>
                   <p className="text-dim text-xs leading-relaxed">{item.desc}</p>
                 </div>
               </div>
             ))}
           </div>
           <p className="mt-8 text-[10px] text-dim uppercase tracking-widest text-center border-t border-line pt-6">
             RMSTU ELECTION COMMISSION — OFFICIAL RULES
           </p>
        </div>
      </div>
    </div>
  );
}

function MyGoalsPanel() {
  const { candidates, currentUser, updateManifesto, officialWinner, electionStatus } = useElection();
  const myCandidate = candidates.find((c) => c.userId === currentUser?.id);
  const isWinner = electionStatus === "FINISHED" && officialWinner && currentUser?.name === officialWinner;
  const [text, setText] = useState(myCandidate?.manifesto || "");
  const [saved, setSaved] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (myCandidate && (myCandidate.status === "APPROVED" || myCandidate.status === "REJECTED") && myCandidate.notified) {
      setShowNotif(true);
      const t = setTimeout(() => setShowNotif(false), 5000);
      return () => clearTimeout(t);
    }
  }, [myCandidate?.status, myCandidate?.notified]);

  if (!myCandidate) {
    return (
      <div>
        <SectionHeader title="MY ELECTION GOALS" />
        <div className="bg-card rounded-xl border border-line p-10 text-center text-dim">
          You are not registered as a candidate yet.
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateManifesto(myCandidate.id, text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <SectionHeader title="MY ELECTION GOALS" />

      {showNotif && myCandidate.status === "APPROVED" && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-green-400 font-bold text-sm">Congratulations! You have been approved as a candidate!</p>
            <p className="text-green-400/70 text-xs">You can now run for: {myCandidate.posts.join(", ")}</p>
          </div>
        </div>
      )}

      {isWinner && (
        <div className="mb-6 bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 rounded-2xl border border-yellow-400/30 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,200,0,0.15),transparent_70%)]" />
          <div className="relative">
            <span className="text-5xl block mb-2">🏆</span>
            <h2 className="text-2xl font-black text-yellow-400 mb-1">CONGRATULATIONS!</h2>
            <p className="text-yellow-300/80 font-bold">You are the Official Winner of the RMSTU Election!</p>
          </div>
        </div>
      )}

      {showNotif && myCandidate.status === "REJECTED" && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">😔</span>
            <p className="text-red-400 font-bold text-sm">Your candidacy has been rejected.</p>
          </div>
          {myCandidate.rejectionReason && (
            <p className="text-red-400/80 text-xs ml-11">Reason: {myCandidate.rejectionReason}</p>
          )}
        </div>
      )}

      <div className="bg-card rounded-xl border border-line p-6 sm:p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex-1">
            <span className="text-xs text-dim uppercase tracking-wider">Running for:</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {(myCandidate.posts || []).map((p) => (
                <span key={p} className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded text-sm font-bold">{p}</span>
              ))}
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase ${
            myCandidate.status === "APPROVED" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
            myCandidate.status === "REJECTED" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
            "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
          }`}>
            {myCandidate.status}
          </span>
        </div>

        {myCandidate.photoUrl && (
          <div className="mb-5 flex items-center gap-4 p-3 bg-page rounded-xl">
            <img src={myCandidate.photoUrl} className="w-16 h-16 rounded-xl object-cover border border-line" />
            <div>
              <p className="text-fg font-bold text-sm">{myCandidate.name}</p>
              <p className="text-dim text-xs">Candidate Photo</p>
            </div>
          </div>
        )}

        <div className="mb-5">
          <label className="block text-xs font-semibold text-dim mb-2 uppercase tracking-wider">Manifesto</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your plans..."
            rows={7}
            className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg placeholder-dim focus:outline-none focus:border-green-500 transition-colors resize-none"
          />
        </div>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
        >
          {saved ? "SAVED!" : "SAVE MANIFESTO"}
        </button>
      </div>
    </div>
  );
}

function OngoingResultPanel() {
  const { candidates, electionStatus, electionDate, electionStartTime, electionEndTime, availablePosts } = useElection();
  const approved = candidates.filter((c) => c.status === "APPROVED");

  const postsWithCandidates = availablePosts.filter(p =>
    approved.some(c => (c.posts || []).includes(p))
  );

  const getCandidatesForPost = (post: string) =>
    approved.filter(c => (c.posts || []).includes(post)).sort((a, b) => (b.postVotes?.[post] || b.votes) - (a.postVotes?.[post] || a.votes));

  const getVotes = (c: Candidate, post: string) => c.postVotes?.[post] ?? c.votes;

  return (
    <div>
      <SectionHeader title="ONGOING RESULT" />
      {approved.length === 0 ? (
        <div className="bg-card rounded-xl border border-line p-10 text-center text-dim">No approved candidates yet.</div>
      ) : (
        <div className="space-y-6">
          {postsWithCandidates.map((post) => {
            const postCandidates = getCandidatesForPost(post);
            return (
              <div key={post} className="bg-card rounded-xl border border-line overflow-hidden">
                <div className="px-5 py-3 bg-page border-b border-line">
                  <h3 className="text-orange-400 font-black text-base uppercase tracking-wider">{post}</h3>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-page text-dim uppercase text-[10px]">
                    <tr>
                      <th className="px-5 py-2.5 text-left w-12">Rank</th>
                      <th className="px-5 py-2.5 text-left">Candidate</th>
                      <th className="px-5 py-2.5 text-right w-20">Votes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {postCandidates.map((c, i) => (
                      <tr key={c.id} className="hover:bg-page transition-colors">
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                            i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                            i === 1 ? "bg-dim/20 text-muted" :
                            i === 2 ? "bg-orange-500/20 text-orange-400" :
                            "bg-page text-dim"
                          }`}>#{i + 1}</span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <span className="text-fg font-medium">{c.name}</span>
                            <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-400 rounded text-[10px] font-semibold">{post}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-right">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-600 text-white rounded-full font-bold text-sm">
                            {getVotes(c, post)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-4 px-5 py-3 bg-card rounded-xl border border-line text-[10px] text-dim uppercase tracking-wider flex items-center gap-4">
        <span>Status: <strong className={electionStatus === "ONGOING" ? "text-green-400" : "text-dim"}>{electionStatus}</strong></span>
        <span>{electionDate || "No date"}</span>
        <span>{electionStartTime} &mdash; {electionEndTime}</span>
      </div>
    </div>
  );
}

function ResultsPanel() {
  const { candidates, currentUser, electionStatus, officialWinner, availablePosts } = useElection();
  const approved = candidates.filter((c) => c.status === "APPROVED");

  const postsWithCandidates = availablePosts.filter(p =>
    approved.some(c => (c.posts || []).includes(p))
  );

  const getCandidatesForPost = (post: string) =>
    approved.filter(c => (c.posts || []).includes(post)).sort((a, b) => (b.postVotes?.[post] || b.votes) - (a.postVotes?.[post] || a.votes));

  const getVotes = (c: Candidate, post: string) => c.postVotes?.[post] ?? c.votes;

  const isFinished = electionStatus === "FINISHED" && approved.length > 0 && !!officialWinner;

  const postWinners = postsWithCandidates.map(post => ({
    post,
    winner: getCandidatesForPost(post)[0],
  }));

  const ResultTable = ({ showWinner }: { showWinner: boolean }) => (
    <div className="space-y-6">
      {showWinner && isFinished && (
        <div className="bg-gradient-to-br from-yellow-500/20 via-yellow-400/5 to-orange-500/20 rounded-2xl border border-yellow-400/30 p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,200,0,0.12),transparent_70%)]" />
          <div className="relative">
            <span className="text-6xl block mb-4">🏆</span>
            <h2 className="text-3xl sm:text-4xl font-black text-yellow-400 mb-4">OFFICIAL WINNERS</h2>
            <div className="flex flex-col items-center gap-3">
              {postWinners.map(({ post, winner }) => winner && (
                <div key={post} className="flex items-center gap-3 bg-white/5 rounded-xl px-6 py-3 border border-white/10 w-full max-w-md">
                  <span className="text-orange-400 font-bold text-sm uppercase tracking-wider min-w-0 shrink-0">{post}:</span>
                  <span className="text-fg font-black text-lg">{winner.name}</span>
                  <span className="ml-auto text-yellow-400 font-bold text-sm bg-yellow-400/10 px-3 py-1 rounded-full">
                    {getVotes(winner, post)} votes
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {postsWithCandidates.map((post) => {
        const postCandidates = getCandidatesForPost(post);
        return (
          <div key={post} className="bg-card rounded-xl border border-line overflow-hidden">
            <div className="px-5 py-3 bg-page border-b border-line">
              <h3 className="text-orange-400 font-black text-base uppercase tracking-wider">{post}</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-page text-dim uppercase text-[10px]">
                <tr>
                  <th className="px-5 py-2.5 text-left w-12">Rank</th>
                  <th className="px-5 py-2.5 text-left">Candidate</th>
                  <th className="px-5 py-2.5 text-right w-20">Votes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {postCandidates.map((c, i) => (
                  <tr key={c.id} className={`${showWinner && c.name === officialWinner ? "bg-yellow-500/5" : ""} hover:bg-page transition-colors`}>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                        i === 0 ? "bg-yellow-500/20 text-yellow-400" :
                        i === 1 ? "bg-dim/20 text-muted" :
                        i === 2 ? "bg-orange-500/20 text-orange-400" :
                        "bg-page text-dim"
                      }`}>#{i + 1}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-fg font-medium">{c.name}</span>
                        <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-400 rounded text-[10px] font-semibold">{post}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-600 text-white rounded-full font-bold text-sm">
                        {getVotes(c, post)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );

  if (!isFinished) {
    return (
      <div>
        <SectionHeader title="ELECTION RESULTS" />
        <div className="bg-card rounded-xl border border-line p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-dim/20 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8 text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-muted font-black text-xl mb-2">Results Pending</h3>
          <p className="text-dim text-sm">Please check back after the election concludes.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader title={currentUser?.role === "ADMIN" ? "ELECTION RESULTS (ADMIN VIEW)" : "ELECTION RESULTS"} />
      <ResultTable showWinner={true} />
    </div>
  );
}

const PANEL_COMPONENTS: Record<Panel, React.ComponentType> = {
  "home": HomePanel,
  "election-phase": ElectionPhasePanel,
  "approve-candidates": ApproveCandidatesPanel,
  "manage-posts": ManagePostsPanel,
  "ongoing-result": OngoingResultPanel,
  "ballot-box": BallotBoxPanel,
  "apply-candidate": ApplyCandidatePanel,
  "my-goals": MyGoalsPanel,
  "results": ResultsPanel,
};

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { currentUser, electionStatus, setCurrentUser } = useElection();
  const { currentTheme, themes, setTheme } = useTheme();
  const [activePanel, setActivePanel] = useState<Panel>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarThemeOpen, setSidebarThemeOpen] = useState(false);

  if (!currentUser) {
    if (typeof window !== 'undefined') setLocation("/");
    return null;
  }

  const navItems =
    currentUser.role === "ADMIN" ? NAV_ADMIN :
    currentUser.role === "CANDIDATE" ? NAV_CANDIDATE :
    electionStatus === "ONGOING" ? NAV_VOTER.filter(n => n.panel !== "apply-candidate") :
    NAV_VOTER;

  const handleLogout = () => {
    setCurrentUser(null);
    setLocation("/");
  };

  const PanelComponent = PANEL_COMPONENTS[activePanel];

  return (
    <div className="flex h-screen overflow-hidden bg-page">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`flex-shrink-0 w-64 flex flex-col z-40 transition-transform duration-300 lg:translate-x-0 lg:relative lg:flex fixed inset-y-0 left-0 bg-card border-r border-line ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-5 py-6 border-b border-line flex items-center gap-3">
            <img src={LOGO_URL} className="w-8 h-8 rounded-lg" />
            <h2 className="text-fg font-black text-sm uppercase tracking-tighter">Election hub</h2>
        </div>
        <div className="px-4 py-4 mb-2">
            <div className="p-3 rounded-xl bg-page border border-line">
                <p className="text-fg font-bold text-xs truncate uppercase">{currentUser.name}</p>
                <div className="mt-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 inline-block">
                    <p className="text-[10px] text-orange-400 font-bold uppercase">{currentUser.role}</p>
                </div>
            </div>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.panel}
              onClick={() => { setActivePanel(item.panel); setSidebarOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activePanel === item.panel ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-dim hover:text-fg hover:bg-page"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-line space-y-3">
          <div className="mx-2 p-2.5 rounded-xl bg-green-500/5 border border-green-500/20">
             <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Live Sync Hub</span>
             </div>
             <p className="text-[9px] text-dim leading-tight">Database is connected and streaming in real-time across all devices.</p>
          </div>

          {/* Theme toggle */}
          <div className="relative">
            <button
              onClick={() => setSidebarThemeOpen(!sidebarThemeOpen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-line bg-page hover:bg-page transition-colors cursor-pointer"
            >
              <span
                className="w-5 h-5 rounded-full border border-line flex-shrink-0"
                style={{ background: currentTheme.page }}
              />
              <span className="text-[10px] text-dim font-bold uppercase tracking-widest flex-1 text-left">{currentTheme.name}</span>
              <svg className="w-3 h-3 text-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={sidebarThemeOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            </button>
            {sidebarThemeOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-card border border-line rounded-xl p-2 shadow-2xl z-30">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setSidebarThemeOpen(false); }}
                    className={clsx(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors",
                      currentTheme.id === t.id ? "text-fg bg-page" : "text-dim hover:text-fg hover:bg-page"
                    )}
                  >
                    <span className="w-4 h-4 rounded-full border border-line flex-shrink-0" style={{ background: t.page }} />
                    <span className="font-medium">{t.name}</span>
                    {currentTheme.id === t.id && (
                      <svg className="w-3 h-3 ml-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleLogout} className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-black rounded-xl transition-all duration-200 cursor-pointer uppercase tracking-widest active:scale-95">
            LOGOUT SYSTEM
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-line">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-fg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-fg font-bold text-sm uppercase">{navItems.find(n => n.panel === activePanel)?.label}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={activePanel} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <PanelComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
