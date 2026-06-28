"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, GitCommit, Award, ShieldAlert } from 'lucide-react';

export default function Profile() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6 animate-pulse">
        <div className="h-32 bg-white rounded-xl"></div>
        <div className="h-48 bg-white rounded-xl"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]">
      {/* Profile Header Canvas */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#2563EB] text-white font-bold text-3xl flex items-center justify-center shadow-inner">
          AR
        </div>
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl font-bold">Alex Rivera</h2>
          <p className="text-sm text-[#6B7280]">@alexrivera • San Francisco, CA</p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            {["Next.js", "TypeScript", "GraphQL", "Go"].map((skill, i) => (
              <span key={i} className="text-xs bg-[#F1F5F9] border border-[#E5E7EB] text-[#111827] px-2.5 py-1 rounded-md font-medium">{skill}</span>
            ))}
          </div>
        </div>
        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] text-center min-w-[120px]">
          <p className="text-xs font-semibold text-[#6B7280] uppercase">Reputation</p>
          <p className="text-2xl font-bold text-[#2563EB] mt-1">2,450</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-[#E5E7EB] p-6 rounded-xl">
          <h3 className="font-bold text-base mb-4 flex items-center"><GitCommit className="w-5 h-5 text-[#2563EB] mr-2" /> Activity & Contribution Index</h3>
          <div className="space-y-4">
            {[
              { desc: "Reviewed 'Substrate Core Consensus Framework'", date: "2 days ago" },
              { desc: "Pushed 4 updates to 'DevReview Platform Dashboard'", date: "3 days ago" },
              { desc: "Earned Silver Code Optimization badge", date: "1 week ago" }
            ].map((act, i) => (
              <div key={i} className="flex justify-between items-center text-sm p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg">
                <span className="text-[#111827] font-medium">{act.desc}</span>
                <span className="text-xs text-[#6B7280]">{act.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-6 rounded-xl">
          <h3 className="font-bold text-base mb-4 flex items-center"><Award className="w-5 h-5 text-[#22C55E] mr-2" /> Developer Bio</h3>
          <p className="text-sm text-[#6B7280] leading-relaxed">
            Fullstack engineer focusing on compiler safety, fast rendering architectures, and accessible UI engineering models. Ex-Stripe integration engineer.
          </p>
        </div>
      </div>
    </motion.div>
  );
}