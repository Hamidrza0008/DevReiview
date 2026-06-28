"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Heart, MessageSquare, ExternalLink } from 'lucide-react';

export default function MyProjects() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-10 bg-[#E5E7EB] rounded w-1/4"></div>
          <div className="h-10 bg-[#E5E7EB] rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-white border border-[#E5E7EB] rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const projects = [
    { title: "DevReview Dashboard", desc: "A premium dashboard designed for developers.", likes: 42, reviews: 14, status: "Published", tech: ["React", "Tailwind", "Framer Motion"] },
    { title: "E-Commerce Engine", desc: "High-performance headless checkout core microservices.", likes: 128, reviews: 34, status: "Published", tech: ["Go", "GraphQL", "Redis"] },
    { title: "CodeSnippet CLI", desc: "Instantly save and sync terminal code configurations.", likes: 19, reviews: 3, status: "Draft", tech: ["Node.js", "TypeScript"] },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
          <p className="text-[#6B7280]">Manage, deploy, and inspect your project submissions.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#2563EB] text-white px-4 py-2.5 rounded-lg font-medium flex items-center space-x-2 shadow-sm text-sm hover:bg-[#3B82F6] transition-colors"
        >
          <Plus className="w-4 h-4" /> <span>Upload Project</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, boxShadow: '0 12px 30px -10px rgba(0,0,0,0.08)' }}
            className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Dummy Project Canvas Cover Image Graphic */}
              <div className="h-40 bg-gradient-to-br from-[#EFF6FF] to-[#E5E7EB] flex items-center justify-center p-4 relative">
                <span className="text-xs uppercase tracking-widest font-bold text-[#3B82F6]">{project.tech[0]} project</span>
                <span className={`absolute top-3 right-3 text-xs px-2 py-0.5 rounded-md font-medium border ${project.status === 'Published' ? 'bg-[#E8FBF0] text-[#22C55E] border-[#22C55E]/20' : 'bg-[#F1F5F9] text-[#6B7280] border-[#E5E7EB]'}`}>
                  {project.status}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1 flex items-center justify-between">
                  {project.title}
                  <ExternalLink className="w-4 h-4 text-[#6B7280] opacity-0 hover:opacity-100 cursor-pointer" />
                </h3>
                <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-xs bg-[#F8FAFC] border border-[#E5E7EB] px-2 py-0.5 rounded text-[#6B7280]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-[#E5E7EB] mt-4 bg-[#F8FAFC]/50 flex justify-between text-xs text-[#6B7280] font-medium">
              <div className="flex space-x-4">
                <span className="flex items-center space-x-1"><Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> <span>{project.likes}</span></span>
                <span className="flex items-center space-x-1"><MessageSquare className="w-4 h-4 text-[#2563EB]" /> <span>{project.reviews} Reviews</span></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}