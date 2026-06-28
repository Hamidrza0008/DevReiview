"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Check, ArrowRight } from 'lucide-react';

export default function ReviewsReceived() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6 animate-pulse">
        <div className="h-10 bg-[#E5E7EB] rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white rounded-xl border border-[#E5E7EB]"></div>)}
        </div>
        <div className="h-64 bg-white rounded-xl border border-[#E5E7EB]"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Reviews Received</h1>
        <p className="text-[#6B7280]">Code review assertions and developer ratings across your spectrum.</p>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Average Score", val: "4.87 / 5.0" },
          { label: "Total Reviews", val: "32" },
          { label: "Actioned Reviews", val: "28" },
          { label: "Pending Responses", val: "4" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white border border-[#E5E7EB] p-4 rounded-xl">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">{item.label}</p>
            <p className="text-xl font-bold mt-1">{item.val}</p>
          </div>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
        <h3 className="font-bold text-lg mb-6">Reviewer Feedback Timeline</h3>
        <div className="relative border-l border-[#E5E7EB] ml-4 space-y-8">
          {[
            { user: "Marcus Aurelius", role: "Principal Architect", project: "E-Commerce Engine", rating: 5, feedback: "Exceptional application of architectural design patterns. The Redis implementation avoids caching staleness risks elegantly.", date: "Just now" },
            { user: "Clara Oswald", role: "Senior Frontend Engineer", project: "DevReview Dashboard", rating: 4, feedback: "Beautifully responsive dashboard implementation. Highly clean semantics, but check the bundle footprint on heavy animations.", date: "3 hours ago" }
          ].map((rev, i) => (
            <div key={i} className="relative pl-6">
              <div className="absolute -left-3.5 bg-white border border-[#2563EB] text-[#2563EB] rounded-full p-1 w-7 h-7 flex items-center justify-center">
                <Check className="w-3 h-3" />
              </div>
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-lg transition-all hover:border-[#3B82F6]">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                  <div>
                    <h4 className="font-bold text-sm text-[#111827]">{rev.user} <span className="font-normal text-xs text-[#6B7280]">({rev.role})</span></h4>
                    <span className="text-xs text-[#2563EB] font-medium">Project: {rev.project}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0 text-xs">
                    <div className="flex text-amber-500 font-bold items-center"><Star className="w-3.5 h-3.5 fill-current mr-1" />{rev.rating}.0</div>
                    <span className="text-[#6B7280]">• {rev.date}</span>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] leading-relaxed">"{rev.feedback}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}