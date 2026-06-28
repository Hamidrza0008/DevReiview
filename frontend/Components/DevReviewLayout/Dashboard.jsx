"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FolderGit2, 
  MessageSquare, 
  ThumbsUp, 
  Eye, 
  Star, 
  Plus, 
  ExternalLink, 
  ArrowUpRight, 
  Search, 
  Bell, 
  ChevronDown 
} from "lucide-react";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("My Projects");
  const [activeNav, setActiveNav] = useState("Dashboard");

  // Premium loading state sequence trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion staggered grid layout entry animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans antialiased flex">
      {/* 1. FIXED SIDEBAR SECTION */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* MAIN CONTAINER WORKSPACE LAYOUT */}
      <div className="flex-1 flex flex-col min-h-screen">
        
        {/* DASHBOARD NAVBAR LAYER */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] sticky top-0 z-30 px-8 flex items-center justify-between">
          <div className="w-96 relative group hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#2563EB] transition-colors" />
            <input
              type="text"
              placeholder="Search components, code reviews..."
              className="w-full text-sm pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto sm:ml-0">
            <button className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#2563EB] rounded-full ring-2 ring-white" />
            </button>
            <div className="h-5 w-px bg-[#E5E7EB]" />
            <button className="flex items-center gap-2 p-1.5 hover:bg-[#F8FAFC] rounded-xl transition-all">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Hamid profile top headshot"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-[#111827]">Hamid</span>
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </button>
          </div>
        </header>

        {/* CENTRAL DASHBOARD VIEWPORTS */}
        <div className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              /* ========================================================================= */
              /* 4. LOADING EXPERIENCE (SKELETON ANIMATIONS FRAME) */
              /* ========================================================================= */
              <motion.div
                key="skeleton-view"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="space-y-8"
              >
                {/* Header Profile Summary Skeleton */}
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5 w-full">
                    <div className="w-16 h-16 rounded-2xl bg-[#E5E7EB] animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-5 bg-[#E5E7EB] rounded animate-pulse w-1/3" />
                      <div className="h-4 bg-[#E5E7EB] rounded animate-pulse w-1/4" />
                    </div>
                  </div>
                </div>

                {/* Analytics Panels Skeleton Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="h-3 bg-[#E5E7EB] rounded animate-pulse w-16" />
                        <div className="w-7 h-7 rounded-lg bg-[#E5E7EB] animate-pulse" />
                      </div>
                      <div className="h-7 bg-[#E5E7EB] rounded animate-pulse w-12" />
                      <div className="h-3 bg-[#E5E7EB] rounded animate-pulse w-20" />
                    </div>
                  ))}
                </div>

                {/* Sub-section Grid Tabbed Interface Area Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="h-6 bg-[#E5E7EB] rounded animate-pulse w-32" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-4 space-y-4">
                          <div className="aspect-video w-full bg-[#E5E7EB] rounded-xl animate-pulse" />
                          <div className="h-4 bg-[#E5E7EB] rounded animate-pulse w-2/3" />
                          <div className="h-3 bg-[#E5E7EB] rounded animate-pulse w-1/2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ========================================================================= */
              /* PRIMARY LOADED DASHBOARD INTERFACES REVEAL */
              /* ========================================================================= */
              <motion.div
                key="dashboard-view"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                
                {/* 1. PROFILE SUMMARY SECTION */}
                <motion.div 
                  variants={itemVariants}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                        alt="Hamid Master Profile Graphic"
                        className="w-16 h-16 rounded-2xl object-cover ring-4 ring-[#2563EB]/5"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white border border-[#E5E7EB] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm text-[#2563EB]">
                        PRO
                      </div>
                    </div>
                    
                    <div>
                      <h1 className="text-xl font-bold tracking-tight text-[#111827]">
                        Welcome back, Hamid! <span className="inline-block animate-bounce origin-bottom-right">👋</span>
                      </h1>
                      <p className="text-sm text-[#6B7280] mt-0.5">Here's what's happening with your projects.</p>
                      <p className="text-xs font-medium text-[#3B82F6] mt-2 bg-[#3B82F6]/5 px-2.5 py-1 rounded-lg inline-block">
                        Senior Full-Stack Architect
                      </p>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#3B82F6] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-[#2563EB]/10 group self-stretch md:self-auto justify-center"
                  >
                    <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                    Submit Project
                  </motion.button>
                </motion.div>

                {/* 2. ANALYTICS PANEL */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                >
                  {[
                    { title: "Total Projects", value: "8", change: "+2 this month", icon: FolderGit2, color: "text-[#2563EB] bg-[#2563EB]/5" },
                    { title: "Total Views", value: "152", change: "+24 tracking", icon: Eye, color: "text-[#111827] bg-[#111827]/5" },
                    { title: "Likes Received", value: "56", change: "+14% velocity", icon: ThumbsUp, color: "text-[#22C55E] bg-[#22C55E]/5" },
                    { title: "Reviews Received", value: "24", change: "+8 new audits", icon: MessageSquare, color: "text-[#3B82F6] bg-[#3B82F6]/5" },
                  ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ y: -4, shadow: "0 10px 15px -3px rgba(0,0,0,0.04)" }}
                        className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm transition-all duration-200 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#6B7280] tracking-wider uppercase">{card.title}</span>
                          <div className={`p-2 rounded-xl transition-transform duration-300 group-hover:scale-110 ${card.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="text-2xl font-bold tracking-tight text-[#111827] tabular-nums">
                            {card.value}
                          </span>
                          <span className="text-[11px] font-medium text-[#22C55E] flex items-center bg-[#22C55E]/5 px-1.5 py-0.5 rounded">
                            <ArrowUpRight className="w-3 h-3 mr-0.5" />
                            {card.change.split(" ")[0]}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">{card.change.substring(card.change.indexOf(" ") + 1)}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* 3. PROJECT MANAGEMENT SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Left Interactive Flow (Tabs & Lists Content Mapping) */}
                  <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-6 border-b border-[#E5E7EB] pb-px">
                      {["My Projects", "Feedback Received"].map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-semibold transition-all relative ${
                              isActive ? "text-[#2563EB]" : "text-[#6B7280] hover:text-[#111827]"
                            }`}
                          >
                            {tab}
                            {isActive && (
                              <motion.div 
                                layoutId="dashboardTabLine" 
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB]" 
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Conditional Grid Layout Content Engine */}
                    <AnimatePresence mode="wait">
                      {activeTab === "My Projects" ? (
                        <motion.div
                          key="my-projects-grid"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          {[
                            {
                              name: "Finance Tracker",
                              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
                              stack: ["Next.js", "Tailwind CSS", "Prisma"],
                              likes: 24,
                              reviews: 9,
                              status: "Reviewed"
                            },
                            {
                              name: "Task Management App",
                              image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
                              stack: ["React", "TypeScript", "Tailwind CSS"],
                              likes: 18,
                              reviews: 5,
                              status: "In Review"
                            },
                            {
                              name: "E-Commerce Platform",
                              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
                              stack: ["Next.js", "GraphQL", "Tailwind CSS"],
                              likes: 14,
                              reviews: 10,
                              status: "Reviewed"
                            }
                          ].map((project, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ y: -6, shadow: "0 12px 20px -3px rgba(0,0,0,0.05)" }}
                              className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col group cursor-pointer"
                            >
                              <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3">
                                  <span className={`text-[11px] font-bold tracking-wide px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                                    project.status === "Reviewed" 
                                      ? "bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E]" 
                                      : "bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]"
                                  }`}>
                                    {project.status}
                                  </span>
                                </div>
                              </div>

                              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                  <h3 className="font-bold text-base text-[#111827] group-hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                                    {project.name}
                                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </h3>
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {project.stack.map((tech, i) => (
                                      <span key={i} className="text-xs bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] font-medium px-2 py-0.5 rounded-lg">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] text-xs font-semibold text-[#6B7280]">
                                  <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 hover:text-[#22C55E] transition-colors">
                                      <ThumbsUp className="w-3.5 h-3.5" /> {project.likes}
                                    </span>
                                    <span className="flex items-center gap-1 hover:text-[#2563EB] transition-colors">
                                      <MessageSquare className="w-3.5 h-3.5" /> {project.reviews}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        /* FEEDBACK RECEIVED ACTIVE SUB-TAB VIEWPORT mapping review text directly */
                        <motion.div
                          key="feedback-list"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-4"
                        >
                          {[
                            {
                              reviewer: "Sarah Jenkins",
                              role: "Lead Architect at Vercel",
                              message: "The database configuration models layout built across this finance platform looks extremely modular. Production grade performance optimization indices executed cleanly.",
                              rating: 5,
                              date: "2 hours ago"
                            },
                            {
                              reviewer: "Alex Rivera",
                              role: "Senior Dev Ecosystem Specialist",
                              message: "Brilliant UI modular parsing rules implemented. State synchronization bounds look solid, responsive break lines are perfectly crisp.",
                              rating: 4,
                              date: "Yesterday"
                            }
                          ].map((feedback, idx) => (
                            <div key={idx} className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm space-y-3">
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <h4 className="font-bold text-sm text-[#111827]">{feedback.reviewer}</h4>
                                  <p className="text-xs text-[#6B7280]">{feedback.role}</p>
                                </div>
                                <span className="text-xs text-[#6B7280]">{feedback.date}</span>
                              </div>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-3.5 h-3.5 ${i < feedback.rating ? "text-amber-400 fill-current" : "text-[#E5E7EB]"}`} />
                                ))}
                              </div>
                              <p className="text-xs text-[#6B7280] leading-relaxed">"{feedback.message}"</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Right Static Sidebar Summary Layout Panel */}
                  <motion.div variants={itemVariants} className="space-y-6 w-full">
                    <div>
                      <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Activity Trackers</h2>
                    </div>
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full" />
                        <div className="text-xs font-medium text-[#111827]">
                          System Health: <span className="text-[#6B7280]">All checks operational</span>
                        </div>
                      </div>
                      <div className="h-px bg-[#E5E7EB]" />
                      <p className="text-xs text-[#6B7280] leading-relaxed">
                        Your submitted repositories are sync'd securely with real-time GitHub integration lines.
                      </p>
                    </div>
                  </motion.div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}