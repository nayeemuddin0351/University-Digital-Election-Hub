import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useElection } from "@/lib/context";
import VoteBg from "@/components/VoteBg";

const LOGO_URL = "/logo.png";

type Tab = "signin" | "signup";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const { memberDB, currentUser, registerUser, setCurrentUser } = useElection();

  const initialMode = new URLSearchParams(window.location.search).get("mode") === "signup" ? "signup" : "signin";
  const [tab, setTab] = useState<Tab>(initialMode);

  // Sign In
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign Up
  const [regId, setRegId] = useState("");
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (currentUser) {
    setLocation("/portal");
    return null;
  }

  const handleSignIn = () => {
    setError("");
    const id = loginId.trim();
    const pass = loginPassword.trim();
    if (!id || !pass) {
      setError("Please enter both ID and password.");
      return;
    }
    const user = memberDB[id];
    if (!user) {
      setError("Account not found. Please sign up first.");
      return;
    }
    if (user.password !== pass) {
      setError("Incorrect password.");
      return;
    }
    setCurrentUser(user);
    setLoading(true);
  };

  const handleSignUp = () => {
    setError("");
    if (!regId.trim() || !regName.trim() || !regPassword.trim()) {
      setError("All fields are required.");
      return;
    }
    if (memberDB[regId.trim()]) {
      setError("This ID is already registered. Please sign in instead.");
      return;
    }
    const newUser = {
      id: regId.trim(),
      name: regName.trim(),
      password: regPassword.trim(),
      role: "VOTER" as const,
      hasVoted: false,
    };
    registerUser(newUser);
    setCurrentUser(newUser);
    setLoading(true);
  };

  const switchTab = (t: Tab) => {
    setError("");
    setTab(t);
  };

  return (
    <div className="bg-page flex items-center justify-center min-h-screen px-4 relative">
      <VoteBg />

      <motion.div
        className="bg-card rounded-2xl shadow-2xl border border-line w-full max-w-md overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="h-1 bg-gradient-to-r from-orange-500 to-green-500" />

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-7">
            <img src={LOGO_URL} alt="RMSTU" className="w-10 h-10 object-contain rounded-lg" />
            <div>
              <p className="text-xs text-dim uppercase tracking-widest">RMSTU Hub</p>
              <h2 className="text-xl font-black text-fg uppercase tracking-tight">
                {tab === "signin" ? "SIGN IN" : "SIGN UP"}
              </h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-page p-1 mb-7 gap-1">
            <button
              onClick={() => switchTab("signin")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                tab === "signin"
                  ? "bg-orange-500 text-white shadow"
                  : "text-muted hover:text-fg"
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => switchTab("signup")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                tab === "signup"
                  ? "bg-green-500 text-white shadow"
                  : "text-muted hover:text-fg"
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="mb-5 p-3 bg-red-500/15 border border-red-500/40 rounded-lg text-red-400 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {tab === "signin" ? (
              <motion.div
                key="signin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      placeholder="Enter your Student ID"
                      onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                      className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                      className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg placeholder-gray-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                    />
                  </div>
                  <div className="p-3 bg-page rounded-lg text-xs text-dim flex flex-wrap gap-2">
                    <span className="text-orange-400 font-bold">Demo:</span>
                    <span>ID: <code className="text-muted">voter1</code> / Pass: <code className="text-muted">voter123</code></span>
                  </div>
                  <button
                    onClick={handleSignIn}
                    disabled={loading}
                    className="w-full py-3.5 font-bold text-white rounded-xl bg-orange-500 hover:bg-orange-400 transition-all duration-200 active:scale-95 shadow-lg mt-1 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? "SIGNING IN..." : "SIGN IN"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
                      Student ID
                    </label>
                    <input
                      type="text"
                      value={regId}
                      onChange={(e) => setRegId(e.target.value)}
                      placeholder="e.g. 2021-001"
                      className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
                      Password
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Create a password"
                      onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
                      className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleSignUp}
                    disabled={loading}
                    className="w-full py-3.5 font-bold text-white rounded-xl bg-green-500 hover:bg-green-400 transition-all duration-200 active:scale-95 shadow-lg mt-1 disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-7 pt-5 border-t border-line text-center">
            <button
              onClick={() => setLocation("/")}
              className="text-dim hover:text-muted text-sm transition-colors cursor-pointer"
            >
              &#8592; Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
