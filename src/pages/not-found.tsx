import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-page text-fg p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-9xl font-black text-orange-500 mb-4">404</h1>
        <p className="text-xl text-muted mb-8 font-medium italic">Oops! This election page is lost in the digital cloud.</p>
        <button
          onClick={() => setLocation("/")}
          className="px-8 py-3 bg-fg text-page font-black rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
        >
          GO BACK HOME
        </button>
      </motion.div>
    </div>
  );
}
