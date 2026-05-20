import { useLocation } from "wouter";
import { motion } from "framer-motion";
import VoteBg from "@/components/VoteBg";

export default function AdminCheckPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-page flex items-center justify-center min-h-screen px-4 relative">
      <VoteBg />
      <motion.div
        className="bg-card rounded-2xl p-10 sm:p-14 shadow-2xl border border-line w-full max-w-lg text-center relative z-10"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl font-black text-fg mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          WHO ARE YOU?
        </motion.h2>
        <motion.p
          className="text-muted mb-10 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Select your account type to continue.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => setLocation("/auth?mode=signup")}
            className="flex-1 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-base rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-600/20 cursor-pointer"
          >
            NEW USER
          </button>
          <button
            onClick={() => setLocation("/auth?mode=signin")}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            REGISTERED USER
          </button>
        </motion.div>

        <motion.button
          onClick={() => setLocation("/")}
          className="mt-6 text-dim hover:text-muted text-sm transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          &#8592; Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
