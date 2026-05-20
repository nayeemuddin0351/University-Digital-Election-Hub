import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useElection } from "@/lib/context";
import VoteBg from "@/components/VoteBg";

const LOGO_URL = "/logo.png";

export default function VoterPortalPage() {
  const [, setLocation] = useLocation();
  const { currentUser } = useElection();

  useEffect(() => {
    if (!currentUser) {
      setLocation("/auth");
    }
  }, [currentUser, setLocation]);

  if (!currentUser) return null;

  return (
    <div className="bg-page flex items-center justify-center min-h-screen px-4 py-10 relative">
      <VoteBg />

      <motion.div
        className="bg-card rounded-2xl shadow-2xl border border-line w-full max-w-lg overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="h-1 bg-green-500" />

        <div className="p-8 sm:p-10 text-center">
          <img src={LOGO_URL} alt="RMSTU" className="w-16 h-16 object-contain rounded-xl mx-auto mb-4" />
          <h2 className="text-2xl font-black text-fg mb-2">VOTER PORTAL</h2>
          <p className="text-muted text-sm mb-6">
            Welcome, <strong className="text-fg">{currentUser.name}</strong>. Cast your ballot securely and transparently.
          </p>

          <div className="bg-page rounded-xl p-5 mb-6 text-left space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">1</span>
              <span className="text-muted">Review candidates and their manifestos</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">2</span>
              <span className="text-muted">Cast your vote for each position</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold">3</span>
              <span className="text-muted">Track live results after voting</span>
            </div>
          </div>

          <button
            onClick={() => setLocation("/dashboard")}
            className="w-full py-3.5 font-bold text-black rounded-xl bg-green-500 hover:bg-green-400 transition-all duration-200 active:scale-95 shadow-lg cursor-pointer"
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
