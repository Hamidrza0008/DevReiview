"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 22 } }
  };

  return (
    <div className="h-screen bg-[#F8FAFC] flex text-[#111827] font-sans antialiased relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl" />

      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2563EB] relative items-center justify-center p-12 overflow-hidden border-r border-[#E5E7EB]/10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="relative z-10 max-w-xl w-full text-white space-y-8">
          <motion.div variants={itemVariants} className="flex items-center space-x-3 w-fit">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-[#2563EB] font-black text-xl">&lt;/&gt;</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">DevReview</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight">Build. Share. Grow. 🚀</h1>
            <p className="text-blue-100 text-lg">Join thousands of developers showcasing their projects and improving together.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <h3 className="text-xs font-bold tracking-wider font-mono">Peer Network Graph</h3>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-[11px] font-bold">4.8k online</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-xs font-mono">FT</div>
                  <div>
                    <p className="text-xs font-bold">Finance Tracker app</p>
                    <p className="text-[10px] text-blue-200/80">Next.js • MongoDB</p>
                  </div>
                </div>
                <span className="text-[11px] px-2.5 py-1 bg-[#22C55E]/20 text-[#22C55E] rounded-md font-bold">Published</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-[#111827] mb-1">Join Community</h2>
          <p className="text-sm text-[#6B7280] mb-6">Create your profile workspace setup to initiate sharing.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">Full Handle Name</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Hamid Rza" className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-shadow duration-150" />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">Developer Communications Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@domain.com" className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-shadow duration-150" />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">Secure Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-shadow duration-150" />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] uppercase tracking-wider mb-1.5">Confirm Credentials Match</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 transition-shadow duration-150" />
            </div>

            <div className="flex items-start pt-1">
              <input id="terms-check" type="checkbox" required checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="w-4 h-4 mt-0.5 rounded text-[#2563EB] border-[#E5E7EB]" />
              <label htmlFor="terms-check" className="ml-2 text-xs text-[#6B7280] font-medium cursor-pointer">I authorize access terms and agree to code review policies.</label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3 px-4 bg-[#2563EB] hover:bg-[#3B82F6] text-white font-bold text-sm rounded-lg transition-colors duration-150 flex items-center justify-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="flex items-center space-x-2"
                  >
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Deploying Profile...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    Initialize System Account
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-6">Already verified? <a href="/auth/login" className="font-bold text-[#2563EB] hover:underline">Log In</a></p>
        </motion.div>
      </div>
    </div>
  );
}