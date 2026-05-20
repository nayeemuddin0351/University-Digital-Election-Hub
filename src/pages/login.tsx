import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useElection, type Role } from "@/lib/context";
import VoteBg from "@/components/VoteBg";

const LOGO_URL = "/logo.png";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const params = useParams<{ role: string }>();
  const routeRole = params.role || "voter";
  const { memberDB, currentUser, setCurrentUser } = useElection();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  // Registration state
  const [regId, setRegId] = useState("");
  const [regName, setRegName] = useState("");
  const [regPass, setRegPass] = useState("");

  const { registerUser } = useElection();

  const handleRegister = async () => {
    if (!regId || !regName || !regPass) {
      setError("Please fill all registration fields.");
      return;
    }
    await registerUser({
      id: regId,
      name: regName,
      password: regPass,
      role: "VOTER",
      hasVoted: false
    });
    setId(regId);
    setPassword(regPass);
    setShowRegister(false);
    setError("");
  };

  useEffect(() => {
    if (isLoggingIn && currentUser) {
      setLocation("/dashboard");
    }
  }, [isLoggingIn, currentUser, setLocation]);

  const handleLogin = async () => {
    setError("");
    const trimmedId = id.trim();
    const trimmedPass = password.trim();

    if (!trimmedId || !trimmedPass) {
      setError("Please enter both ID and password.");
      return;
    }

    const user = memberDB[trimmedId];
    
    if (!user) {
      if (Object.keys(memberDB).length === 0) {
        setError("Connecting to database... Please wait a few seconds.");
        return;
      }
      setError("User ID not found.");
      return;
    }

    if (user.password !== trimmedPass) {
      setError("Incorrect password.");
      return;
    }
    
    const routeRoleUpper = routeRole?.toUpperCase();
    if (routeRoleUpper === "ADMIN" && user.role !== "ADMIN") {
       setError("Access denied. Admin portal requires admin account.");
       return;
    }

    setCurrentUser(user);
    setIsLoggingIn(true);
  };

  return (
    <div className="bg-page flex items-center justify-center min-h-screen px-4 relative">
      <VoteBg />
      <motion.div
        className="bg-card rounded-2xl shadow-2xl border border-line w-full max-w-md overflow-hidden relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={`h-1 ${routeRole === 'admin' ? 'bg-orange-500' : 'bg-blue-500'}`} />
        <div className="p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {showRegister ? (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-fg font-black tracking-tight text-lg uppercase">Create Voter Account</h3>
                  <button onClick={() => setShowRegister(false)} className="text-[10px] text-dim hover:text-fg underline font-bold uppercase tracking-wider">Back to Login</button>
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-dim mb-1.5 uppercase tracking-widest">Student ID</label>
                   <input
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)}
                    placeholder="e.g. 2021-CS-12"
                    className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-dim mb-1.5 uppercase tracking-widest">Full Name</label>
                   <input
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                   <label className="block text-[10px] font-bold text-dim mb-1.5 uppercase tracking-widest">Initial Password</label>
                   <input
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    type="password"
                    placeholder="Choose a password"
                    className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {error && <p className="text-red-400 text-xs font-bold">{error}</p>}

                <button
                  onClick={handleRegister}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                  COMPLETE REGISTRATION
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <img 
                    src={LOGO_URL} 
                    alt="RMSTU" 
                    className="w-10 h-10 object-contain rounded-lg shadow-lg" 
                    onError={(e) => {
                      e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/2910/2910189.png";
                    }}
                  />
                  <div>
                    <p className="text-[10px] text-dim uppercase tracking-[0.2em] font-bold">RMSTU Hub</p>
                    <h2 className="text-xl font-black text-fg uppercase tracking-tight">{routeRole} LOGIN</h2>
                  </div>
                </div>

                {Object.keys(memberDB).length === 0 ? (
                   <div className="mb-6 flex items-center gap-3 text-xs text-orange-400 font-bold bg-orange-400/10 p-3.5 rounded-xl border border-orange-400/20 shadow-inner">
                      <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                      CONNECTING TO HUB...
                   </div>
                ) : (
                   <div className="mb-6 flex items-center gap-3 text-xs text-green-400 font-bold bg-green-400/10 p-3.5 rounded-xl border border-green-400/20 shadow-inner">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      SYNC ACTIVE (V.{Object.keys(memberDB).length})
                   </div>
                )}

                <AnimatePresence mode="wait">
                  {error && (
                    <motion.div
                      className="mb-5 p-3.5 bg-red-500/15 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <span className="w-4 h-4 rounded-full bg-red-500 text-black flex items-center justify-center text-[10px]">!</span>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-dim mb-1.5 uppercase tracking-widest">Account ID</label>
                    <input
                      type="text"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="Enter your ID"
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-dim mb-1.5 uppercase tracking-widest">Secret Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      className="w-full px-4 py-3 bg-page border border-line rounded-xl text-fg focus:outline-none focus:border-orange-500 transition-colors shadow-inner"
                    />
                  </div>
                  
                  {routeRole === 'admin' ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-page rounded-xl text-[10px] text-dim flex justify-between items-center px-4 border border-line">
                        <span className="text-orange-400 font-bold uppercase tracking-wider">Default Admin:</span>
                        <span className="text-fg font-mono">admin / admin123</span>
                      </div>
                      <button
                        onClick={handleLogin}
                        disabled={isLoggingIn || Object.keys(memberDB).length === 0}
                        className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50"
                      >
                        {isLoggingIn ? "VERIFYING..." : "ENTER ADMIN HUB"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={handleLogin}
                        disabled={isLoggingIn || Object.keys(memberDB).length === 0}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                      >
                        {isLoggingIn ? "VERIFYING..." : "LOGIN TO VOTE"}
                      </button>
                      <button
                        onClick={() => setShowRegister(true)}
                        className="w-full py-3 bg-transparent border border-line hover:bg-white/5 text-muted hover:text-fg rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        New Student? Register Here
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setLocation("/")} 
            className="mt-8 text-dim hover:text-fg text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center w-full gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&#8592;</span> Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
