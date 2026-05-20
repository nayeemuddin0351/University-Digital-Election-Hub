import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useElection } from "@/lib/context";
import VoteBg from "@/components/VoteBg";

const LOGO_URL = "/logo.png";

export default function CandidatePortalPage() {
  const [, setLocation] = useLocation();
  const { currentUser } = useElection();

  useEffect(() => {
    if (!currentUser) {
      setLocation("/auth");
    }
  }, [currentUser, setLocation]);

  if (!currentUser) return null;

  const isCandidate = currentUser.role === "CANDIDATE";

  return (
    <div className="bg-page flex items-center justify-center min-h-screen px-4 py-10 relative">
      <VoteBg />

      <motion.div
        className="bg-card rounded-2xl shadow-2xl border border-line w-full max-w-lg overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="h-1 bg-cyan-400" />

        <div className="p-8 sm:p-10 text-center">
          <img src={LOGO_URL} alt="RMSTU" className="w-16 h-16 object-contain rounded-xl mx-auto mb-4" />
          <h2 className="text-2xl font-black text-fg mb-2">CANDIDATE PORTAL</h2>

          {isCandidate ? (
            <>
              <p className="text-muted text-sm mb-6">
                Welcome, <strong className="text-fg">{currentUser.name}</strong>. Manage your campaign and view standings.
              </p>
              <div className="bg-page rounded-xl p-5 mb-6 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-muted">Update your manifesto and profile</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-muted">View live vote counts and standings</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">3</span>
                  <span className="text-muted">Engage with voters through your manifesto</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-muted text-sm mb-6">
                Hello, <strong className="text-fg">{currentUser.name}</strong>. Your current role is <strong className="text-cyan-400">VOTER</strong>.
              </p>
              <div className="bg-cyan-500/10 border border-cyan-500/25 rounded-xl p-4 mb-6">
                <p className="text-cyan-300 text-sm leading-relaxed">
                  You have not been approved as a candidate yet. Apply through the dashboard or wait for admin approval.
                </p>
              </div>
            </>
          )}

          <button
            onClick={() => setLocation("/dashboard")}
            className="w-full py-3.5 font-bold text-black rounded-xl bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 active:scale-95 shadow-lg cursor-pointer"
          >
            GO TO DASHBOARD
          </button>

          <div className="mt-5">
            <button
              onClick={() => setLocation("/portal")}
              className="text-dim hover:text-muted text-sm transition-colors cursor-pointer"
            >
              &#8592; Back to Portal Select
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
