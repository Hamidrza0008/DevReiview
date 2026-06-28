"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, ThumbsUp, MessageSquare, Terminal } from 'lucide-react';

export default function Community() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(setTimeoutId);
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6 animate-pulse">
        <div className="h-10 bg-[#E5E7EB] rounded w-1/4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-64 bg-white rounded-xl"></div>
          <div className="h-64 bg-white rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Community Forum</h1>
        <p className="text-[#6B7280]">Engage with fellow developers across deep technical code discussions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Discussion Stream */}
        <div className="lg:col-span-2 space-y-4">
          {[
            { user: "Sarah Jenkins", handle: "sjenkins", topic: "Is it worth migrating microservices to Rust for performance gains?", upvotes: 112, replies: 43 },
            { user: "Devon Ross", handle: "devon_r", topic: "RFC: Proposing clean standards for Next.js 16 server action folder structures", upvotes: 64, replies: 19 }
          ].map((post, i) => (
            <div key={i} className="bg-white border border-[#E5E7EB] p-5 rounded-xl hover:border-[#3B82F6] transition-all">
              <div className="flex items-center space-x-2 text-xs text-[#6B7280] mb-2">
                <span className="font-semibold text-[#111827]">{post.user}</span>
                <span>@{post.handle}</span>
              </div>
              <h4 className="font-bold text-base mb-4 text-[#111827] hover:text-[#2563EB] cursor-pointer">{post.topic}</h4>
              <div className="flex space-x-4 text-xs font-medium text-[#6B7280]">
                <button className="flex items-center space-x-1 hover:text-rose-500"><ThumbsUp className="w-4 h-4" /> <span>{post.upvotes}</span></button>
                <span className="flex items-center space-x-1"><MessageSquare className="w-4 h-4" /> <span>{post.replies} Replies</span></span>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Statistics */}
        <div className="space-y-6">
          <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl">
            <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider mb-4 flex items-center"><Users className="w-4 h-4 mr-2 text-[#2563EB]" /> Community Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-[#6B7280]">Active Members</span> <span className="font-bold">14,205</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B7280]">Reviews Posted</span> <span className="font-bold">98,122</span></div>
              <div className="flex justify-between text-sm"><span className="text-[#6B7280]">Online Now</span> <span className="text-[#22C55E] font-bold">● 412</span></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] text-white p-5 rounded-xl">
            <Terminal className="w-5 h-5 text-[#22C55E] mb-2" />
            <h4 className="font-bold text-sm">Weekly Hackathon</h4>
            <p className="text-xs text-gray-400 mt-1 mb-4">Optimize a slow legacy database controller logic pipeline.</p>
            <button className="w-full bg-[#2563EB] hover:bg-[#3B82F6] text-white py-2 rounded-lg font-medium text-xs transition-colors">Join Sprint</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}