import { useLocation } from "wouter";
import { motion } from "framer-motion";
import VoteBg from "@/components/VoteBg";
import { HandVoteIllustration, VotersIllustration, BallotCheckIllustration, ElectionBadge } from "@/components/VoteIllustration";
const LOGO_URL = "/logo.png";

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure Voting",
    desc: "One-student-one-vote system with Firebase authentication and real-time vote tracking.",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Real-Time Sync",
    desc: "Firestore-powered live updates across all devices instantly reflect election changes.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Candidate Management",
    desc: "Admins can approve/reject applications, manage posts, and oversee the election.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Live Results",
    desc: "Transparent vote counting with live leaderboard and official winner declaration.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/30",
  },
];

const STEPS = [
  { n: "1", text: "Student registers or logs in via the Voter or Candidate portal." },
  { n: "2", text: "Candidates apply for posts; admins review and approve applications." },
  { n: "3", text: "Election status is set to ONGOING by the admin." },
  { n: "4", text: "Voters cast their ballot securely from the Ballot Box." },
  { n: "5", text: "Results are published live and the winner is declared when finished." },
];

const TECH_STACK = [
  { name: "React 19", color: "border-cyan-400 text-cyan-400 bg-cyan-400/10" },
  { name: "TypeScript", color: "border-blue-400 text-blue-400 bg-blue-400/10" },
  { name: "Tailwind CSS v4", color: "border-teal-400 text-teal-400 bg-teal-400/10" },
  { name: "Firebase Firestore", color: "border-yellow-400 text-yellow-400 bg-yellow-400/10" },
  { name: "Framer Motion", color: "border-purple-400 text-purple-400 bg-purple-400/10" },
  { name: "Wouter", color: "border-green-400 text-green-400 bg-green-400/10" },
  { name: "Vite", color: "border-orange-400 text-orange-400 bg-orange-400/10" },
  { name: "TanStack Query", color: "border-red-400 text-red-400 bg-red-400/10" },
];

export default function OverviewPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-page min-h-screen relative overflow-hidden">
      <VoteBg />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero — Get Started */}
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-400 leading-tight mb-6"
            style={{ fontFamily: "Georgia, serif", letterSpacing: "0.04em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            UNIVERSITY DIGITAL<br />ELECTION HUB
          </motion.h1>

          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl scale-110" />
            <img
              src={LOGO_URL}
              alt="RMSTU Digital Election Hub Logo"
              className="relative w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-2xl rounded-full"
            />
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl font-medium text-muted italic mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Cast your vote with ease and trust.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <ElectionBadge className="w-14 h-14 sm:w-16 sm:h-16 text-fg" />
            <BallotCheckIllustration className="w-12 h-14 sm:w-14 sm:h-16 text-fg" />
          </motion.div>

          <motion.button
            onClick={() => setLocation("/check")}
            className="group relative px-12 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl rounded-lg transition-all duration-200 shadow-2xl hover:shadow-orange-500/30 active:scale-95 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GET STARTED
            <span className="ml-3 group-hover:translate-x-1 inline-block transition-transform">&#8594;</span>
          </motion.button>

          <motion.p
            className="mt-10 text-dim text-xs tracking-[0.25em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            RMSTU &mdash; Secure Digital Voting System
          </motion.p>
        </motion.div>

        {/* What is this */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <h2 className="text-xl font-black text-orange-400 uppercase tracking-widest mb-6 text-center">
            What is This System?
          </h2>
          <div className="bg-card border border-line rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <VotersIllustration className="w-full sm:w-48 h-28 sm:h-32 text-fg flex-shrink-0" />
              <p className="text-muted leading-relaxed text-sm sm:text-base">
                The <strong className="text-fg">RMSTU Digital Election Hub</strong> is a full-stack web application
                designed to digitize the university's student election process. It replaces traditional paper ballots
                with a secure online system featuring real-time vote tracking, candidate management, and transparent
                results — all powered by Firebase Firestore for live synchronization across devices.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-black text-orange-400 uppercase tracking-widest mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className={`bg-card border ${f.border} rounded-2xl p-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.4 }}
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                  <span className={f.color}>{f.icon}</span>
                </div>
                <h3 className="text-fg font-bold text-base mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-black text-orange-400 uppercase tracking-widest mb-8 text-center">
            How It Works
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                className="flex gap-4 items-start bg-card border border-line rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.4 }}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-black text-sm">
                  {s.n}
                </span>
                <p className="text-muted text-sm pt-1.5">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h2 className="text-xl font-black text-orange-400 uppercase tracking-widest mb-8 text-center">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((t) => (
              <span
                key={t.name}
                className={`px-4 py-2 rounded-full text-xs font-bold border ${t.color}`}
              >
                {t.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-dim text-xs tracking-[0.25em] uppercase">
            RMSTU &mdash; Secure Digital Voting System
          </p>
        </motion.div>
      </div>
    </div>
  );
}
