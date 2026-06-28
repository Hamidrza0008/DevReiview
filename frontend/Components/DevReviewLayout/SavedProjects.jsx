"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Folder, ArrowRight } from 'lucide-react';

export default function SavedProjects() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate empty state data scenario
      setItems([]); 
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6 animate-pulse">
        <div className="h-10 bg-[#E5E7EB] rounded w-1/4"></div>
        <div className="h-56 bg-white border border-[#E5E7EB] rounded-xl"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Saved Projects</h1>
        <p className="text-[#6B7280]">Your curated bookmarks, patterns, and reference architectures.</p>
      </div>

      {items.length === 0 ? (
        <motion.div 
          initial={{ scale: 0.97, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border border-[#E5E7EB] rounded-xl p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto mt-12"
        >
          <div className="p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-full text-[#6B7280] mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold">No Bookmarked Code Repositories</h3>
          <p className="text-sm text-[#6B7280] max-w-xs mt-2 mb-6">
            When browsing the global exploration page, click the bookmark action icon to save core files here.
          </p>
          <button className="bg-[#2563EB] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 hover:bg-[#3B82F6]">
            <span>Browse Explore Feed</span> <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {/* Fallback code execution visualization pattern */}
        </div>
      )}
    </motion.div>
  );
}