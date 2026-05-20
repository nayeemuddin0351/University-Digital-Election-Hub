import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useElection } from "@/lib/context";
import VoteBg from "@/components/VoteBg";

interface PortalCardProps {
  title: string;
  description: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  target: string;
  delay: number;
  testId: string;
}

function PortalCard({ title, description, accentColor, borderColor, glowColor, target, delay, testId }: PortalCardProps) {
  const [, setLocation] = useLocation();
  return (
    <motion.div
      className={`bg-card rounded-2xl p-8 sm:p-10 border-2 ${borderColor} flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform duration-200 shadow-2xl relative overflow-hidden group`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ boxShadow: `0 0 40px -10px ${glowColor}` }}
      onClick={() => setLocation(target)}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} style={{ background: glowColor }} />

      <div className={`w-16 h-16 rounded-full border-2 ${borderColor} flex items-center justify-center mb-6`} style={{ background: `${glowColor}20` }}>
        {title.includes("VOTER") ? (
          <svg className="w-8 h-8" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ) : (
          <svg className="w-8 h-8" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>

      <h3 className="text-2xl font-black mb-3" style={{ color: accentColor }}>
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed mb-8 max-w-xs">
        {description}
      </p>

      <button
        data-testid={testId}
        className="w-full py-3 font-bold text-sm rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
        style={{ background: accentColor, color: "#000" }}
      >
        ACCESS PORTAL
      </button>
    </motion.div>
  );
}

export default function PortalSelectPage() {
  const [, setLocation] = useLocation();
  const { currentUser } = useElection();

  useEffect(() => {
    if (!currentUser) {
      setLocation("/auth");
    }
  }, [currentUser, setLocation]);

  if (!currentUser) return null;

  return (
    <div className="bg-page flex flex-col items-center justify-center min-h-screen px-4 py-12 relative">
      <VoteBg />
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-orange-400 mb-2">RMSTU</p>
        <h1 className="text-3xl sm:text-4xl font-black text-fg">SELECT YOUR PORTAL</h1>
        <p className="text-muted mt-3 text-sm">Choose the portal that matches your role to continue.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl relative z-10">
        <PortalCard
          title="VOTER PORTAL"
          description="Cast your digital ballot securely and transparently. One student, one vote."
          accentColor="#39FF14"
          borderColor="border-green-400"
          glowColor="#39FF14"
          target="/voter-portal"
          delay={0.2}
          testId="button-voter-portal"
        />
        <PortalCard
          title="CANDIDATE PORTAL"
          description="Set your election manifesto, view standings, and engage with voters."
          accentColor="#00D9FF"
          borderColor="border-cyan-400"
          glowColor="#00D9FF"
          target="/candidate-portal"
          delay={0.35}
          testId="button-candidate-portal"
        />
      </div>

      <motion.button
        data-testid="button-back"
        onClick={() => setLocation("/auth")}
        className="mt-10 text-dim hover:text-muted text-sm transition-colors cursor-pointer relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        &#8592; Back to Step
      </motion.button>
    </div>
  );
}
