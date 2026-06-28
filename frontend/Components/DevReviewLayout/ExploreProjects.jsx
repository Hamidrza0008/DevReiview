"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Flame, Code, Star } from 'lucide-react';

export default function ExploreProjects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6 animate-pulse">
        <div className="h-10 bg-[#E5E7EB] rounded w-1/2"></div>
        <div className="h-12 bg-white rounded-xl border border-[#E5E7EB]"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 bg-white rounded-xl"></div>
          <div className="h-48 bg-white rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Explore Ecosystems</h1>
        <p className="text-[#6B7280]">Discover modern developer code solutions, boilerplate, and design templates.</p>
      </div>

      {/* Modern Search/Filter Input Wrapper */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#6B7280]" />
          <input 
            type="text" 
            placeholder="Search language stack, frameworks, platforms..." 
            className="w-full bg-white border border-[#E5E7EB] pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#2563EB] text-sm text-[#111827] placeholder-[#6B7280]"
          />
        </div>
        <button className="bg-white border border-[#E5E7EB] px-4 py-3 rounded-xl text-sm font-medium text-[#111827] flex items-center space-x-2 hover:bg-[#F8FAFC]">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Category Chips Selection */}
      <div className="flex flex-wrap gap-2 mb-8">
        {["Trending", "React", "Rust Core", "Web3", "Machine Learning", "Tailwind Component"].map((chip, idx) => (
          <span 
            key={idx} 
            className={`cursor-pointer text-xs px-4 py-2 rounded-full font-medium transition-all ${idx === 0 ? 'bg-[#2563EB] text-white' : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#3B82F6]'}`}
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Featured Grid Showcase */}
      <h3 className="font-bold text-lg mb-4 flex items-center"><Flame className="w-5 h-5 text-amber-500 mr-2 fill-amber-500" /> Trending Showcases</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "Superfluid Workflow Engine", creator: "0xDevEngine", stars: 890, tags: ["Rust", "Wasm"] },
          { name: "Glassmorphism UI System", creator: "StudioVercel", stars: 541, tags: ["Tailwind", "CSS"] },
        ].map((item, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -4 }}
            className="bg-white border border-[#E5E7EB] p-6 rounded-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-[#6B7280]">by @{item.creator}</span>
                <span className="flex items-center text-xs font-semibold text-amber-500"><Star className="w-3.5 h-3.5 fill-current mr-1" />{item.stars}</span>
              </div>
              <h4 className="font-bold text-base mb-2">{item.name}</h4>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#E5E7EB]">
              <div className="flex space-x-2">
                {item.tags.map((t, i) => <span key={i} className="text-[11px] font-mono bg-[#F8FAFC] px-2 py-0.5 border rounded text-[#6B7280]">{t}</span>)}
              </div>
              <button className="text-xs font-bold text-[#2563EB] hover:underline flex items-center">Inspect <Code className="w-3.5 h-3.5 ml-1" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}