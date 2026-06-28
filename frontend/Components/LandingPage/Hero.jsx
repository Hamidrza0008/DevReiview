'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PrimaryButton, SecondaryButton, TechBadge } from './atoms';

export default function Hero() {
  const springConfig = { type: 'spring', stiffness: 100, damping: 20 };

  return (
    <section className="relative w-full min-h-screen bg-white px-6 md:px-16 lg:px-24 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden select-none z-10">
      
      {/* 🌌 DYNAMIC MOVING BACKGROUND MESH */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Moving Fluid Blob 1 - Blue */}
        <motion.div 
          animate={{ 
            x: [0, 60, -30, 0], 
            y: [0, -50, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px]"
        />
        
        {/* Animated Moving Fluid Blob 2 - Light Indigo */}
        <motion.div 
          animate={{ 
            x: [0, -50, 40, 0], 
            y: [0, 60, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-5 right-[10%] w-[600px] h-[600px] bg-indigo-300/10 rounded-full blur-[120px]"
        />

        {/* Dots grid indicator overlay */}
        <div className="absolute top-24 right-1/3 w-32 h-32 opacity-20 bg-[radial-gradient(#6B7280_1.5px,transparent_1.5px)] bg-[size:12px_12px]" />
      </div>
      
      {/* 📝 LEFT TEXT & METRICS CONTENT BLOCK */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 lg:col-span-6 z-10 text-center lg:text-left items-center lg:items-start"
      >
        {/* Top Tagline */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
          <span>☆</span> Trusted by 10K+ developers worldwide
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-[52px] lg:text-[56px] font-extrabold text-[#111827] tracking-tight leading-[1.1]">
          Showcase your projects. Get feedback from <span className="text-[#2563EB]">developers.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-lg">
          Share your work, receive code reviews, optimize architecture, and build a stellar developer reputation within an elite community.
        </p>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} transition={springConfig}>
            <PrimaryButton className="w-full !px-7 !py-3.5 shadow-sm font-semibold text-sm">
              Start Sharing Projects →
            </PrimaryButton>
          </motion.div>
          
          <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} transition={springConfig}>
            <SecondaryButton className="w-full !px-7 !py-3.5 bg-white font-semibold text-sm border border-[#E5E7EB]">
              Explore Projects
            </SecondaryButton>
          </motion.div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-8 pt-6 border-t border-slate-100 w-full text-left">
          <div>
            <div className="text-2xl font-bold text-[#111827]">10K+</div>
            <div className="text-xs text-[#6B7280] mt-0.5">Developers</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-[#111827]">25K+</div>
            <div className="text-xs text-[#6B7280] mt-0.5">Projects Reviewed</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-[#111827]">4.9/5 ★</div>
            <div className="text-xs text-[#6B7280] mt-0.5">Community Rating</div>
          </div>
        </div>
      </motion.div>
      
      {/* 🖼️ RIGHT VISUAL INTERACTIVE LAYER */}
      <div className="w-full lg:col-span-6 flex justify-center lg:justify-end relative z-10 px-2 sm:px-0 lg:pl-10">
        
        {/* Main Dashboard Card Component */}
        <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-[#E5E7EB] p-4 flex flex-col gap-3.5 relative group hover:border-slate-300 transition-all duration-300">
          
          {/* Top Window Header */}
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                HR
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#111827]">Finance Tracker Dashboard</h4>
                <p className="text-[10px] font-medium text-[#6B7280]">by Hamid Raza</p>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-full">
              Live
            </span>
          </div>

          {/* Graphical/Screenshot Mock Section */}
          <div className="w-full h-48 bg-[#090D16] rounded-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-4">
            {/* Inner Dashboard Layout lines imitating dark mode graph */}
            <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono">
              <span>USERS: LAST 7 DAYS USING MEDIAN</span>
              <span>•••</span>
            </div>
            
            {/* Visual Vector Bars simulating dark analytics charts */}
            <div className="w-full flex items-end justify-between h-24 gap-1 px-2 opacity-80">
              <div className="w-full bg-blue-500/40 h-[30%] rounded-sm" />
              <div className="w-full bg-blue-400 h-[60%] rounded-sm relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-[8px] text-slate-900 px-1 rounded shadow-sm">57.5%</div>
              </div>
              <div className="w-full bg-blue-500/40 h-[45%] rounded-sm" />
              <div className="w-full bg-blue-500/20 h-[20%] rounded-sm" />
              <div className="w-full bg-blue-400 h-[80%] rounded-sm" />
              <div className="w-full bg-blue-500/50 h-[40%] rounded-sm" />
            </div>

            {/* Absolute Tech Badge stacking layout */}
            <div className="flex flex-wrap gap-1.5 z-10">
              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-white/10 text-white backdrop-blur-md">Next.js</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-white/10 text-white backdrop-blur-md">TailwindCSS</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-white/10 text-white backdrop-blur-md">Recharts</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-medium bg-white/10 text-white backdrop-blur-md">PostgreSQL</span>
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="flex items-center gap-4 text-[11px] font-medium text-[#6B7280] pt-1">
            <span className="flex items-center gap-1">💬 16 Reviews</span>
            <span className="flex items-center gap-1">👍 128 Likes</span>
          </div>
        </div>

        {/* 🏆 FLOATING SPECIFIC ELEMENT: XP Top Box */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-5 right-20 bg-white border border-[#E5E7EB] shadow-md px-3 py-1 rounded-full flex items-center gap-1.5 z-20"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span className="text-[10px] font-bold text-[#111827]">Score +45 XP</span>
        </motion.div>

        {/* 💬 FLOATING CARD 1: Left Rahul Review Box */}
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 -left-8 max-w-[210px] bg-white border border-[#E5E7EB] shadow-xl p-3 rounded-xl hidden md:flex items-start gap-2 z-20"
        >
          <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between w-full gap-4">
              <span className="text-[10px] font-bold text-[#111827]">Rahul Sharma</span>
              <span className="text-[8px] text-slate-400">2h ago</span>
            </div>
            <p className="text-[9px] text-[#6B7280] leading-snug">
              "Clean layout structure! Optimize the server cache keys here."
            </p>
            <div className="text-[8px] text-amber-400 mt-0.5">★★★★★</div>
          </div>
        </motion.div>

        {/* 💬 FLOATING CARD 2: Right Simran Review Box */}
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute bottom-12 -right-8 max-w-[190px] bg-white border border-[#E5E7EB] shadow-xl p-3 rounded-xl hidden md:flex items-start gap-2 z-20"
        >
          <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between w-full gap-4">
              <span className="text-[10px] font-bold text-[#111827]">Simran Kaur</span>
              <span className="text-[8px] text-slate-400">4h ago</span>
            </div>
            <p className="text-[9px] text-[#6B7280] leading-snug">
              "Great use of charts and filters."
            </p>
            <div className="text-[8px] text-amber-400 mt-0.5">★★★★★</div>
          </div>
        </motion.div>

        {/* 📈 FLOATING CARD 3: Central Growth XP Tracker */}
        <motion.div 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20px] right-24 bg-white border border-[#E5E7EB] shadow-xl px-4 py-3 rounded-xl hidden sm:flex flex-col gap-1 z-20 min-w-[150px]"
        >
          <span className="text-[9px] text-slate-500 font-medium">Reputation Growth</span>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-bold text-[#111827]">+120 XP</span>
            {/* Vector wave graphic mimic line using simple inline svg */}
            <svg className="w-12 h-5 text-blue-600" viewBox="0 0 50 20" fill="none">
              <path d="M0 15 Q12 5 25 10 T50 2" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </motion.div>

        {/* 💻 FLOATING ICON ELEMENT: Code Snippet Tag */}
        <div className="absolute right-[-30px] top-1/3 w-10 h-10 border border-slate-100 rounded-xl bg-slate-50 shadow-sm hidden lg:flex items-center justify-center font-mono text-xs text-blue-500">
          &lt;/&gt;
        </div>

      </div>
    </section>
  );
}