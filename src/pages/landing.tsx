import { useLocation } from "wouter";
import { motion } from "framer-motion";
import VoteBg from "@/components/VoteBg";

const LOGO_URL = "/logo.png";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="bg-page flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
      <VoteBg />

      <motion.div
        className="flex flex-col items-center text-center max-w-3xl w-full relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-400 leading-tight mb-8"
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
            data-testid="img-logo"
          />
        </motion.div>

        <motion.p
          className="text-lg sm:text-xl font-medium text-muted italic mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Cast your vote with ease and trust.
        </motion.p>

        <motion.button
          data-testid="button-enter"
          onClick={() => setLocation("/check")}
          className="group relative px-12 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl rounded-lg transition-all duration-200 shadow-2xl hover:shadow-orange-500/30 active:scale-95 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ENTER
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
    </div>
  );
}
