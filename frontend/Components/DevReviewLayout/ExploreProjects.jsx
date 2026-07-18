"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Flame,
  Code,
  Heart,
  MessageSquare,
  ExternalLink,
  GitBranch,
  ArrowUpRight,
  Layers,
  Users,
  Star,
  Bookmark,
  CheckCircle,
  Eye,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { getExploreProjects } from "@/services/getExploreProjectsApi";
import { toggleLikes } from "@/services/toggleLikesApi";
import { getStats } from "@/services/statsApi";
import { useRouter } from "next/navigation";
import { toggleSaveProject } from "@/services/savedProjectsApi";

const CATEGORIES = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "MERN",
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Tailwind"
];

// Animated Number Helper
function AnimatedNumber({ value, duration = 900 }) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const target = typeof value === "number" ? value : parseFloat(value) || 0;
    const from = fromRef.current;
    let start = null;
    let raf;

    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (target - from) * eased;
      setDisplay(current);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        fromRef.current = target;
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{Math.round(display).toLocaleString()}</>;
}

// Shimmer Loader
function Shimmer({ className = "" }) {
  return <div className={`shimmer rounded-md ${className}`} />;
}

export default function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isPinned, setIsPinned] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const router = useRouter();
  const isMountedRef = useRef(true);

  const fetchProjects = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    setError(null);
    try {
      const res = await getExploreProjects();
      if (!isMountedRef.current) return;
      if (res?.projects) {
        setProjects(res.projects);
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      setError("Failed to load projects. Please check your connection or try again.");
    } finally {
      if (isMountedRef.current && showLoader) setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res = await getStats();
      if (!isMountedRef.current) return;
      if (res) setStats(res);
    } catch (err) {
      console.error("Failed to load platform stats:", err);
    } finally {
      if (isMountedRef.current) setStatsLoading(false);
    }
  };

  const handleSaveButton = async (e, projectId) => {
    e.stopPropagation();
    const previousProjects = [...projects];

    setProjects((current) =>
      current.map((p) => (p._id === projectId ? { ...p, isSaved: !p.isSaved } : p))
    );

    try {
      await toggleSaveProject(projectId);
    } catch (err) {
      setProjects(previousProjects);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchProjects();
    fetchStats();

    const handleScroll = () => {
      setIsPinned(window.scrollY > 420);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      isMountedRef.current = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLike = async (e, projectId) => {
    e.stopPropagation();
    const previousProjects = [...projects];

    setProjects((currentProjects) =>
      currentProjects.map((p) => {
        if (p._id === projectId) {
          const isCurrentlyLiked = p.isLiked;
          return {
            ...p,
            isLiked: !isCurrentlyLiked,
            likes: isCurrentlyLiked ? p.likes.slice(0, -1) : [...(p.likes || []), "temp-like"]
          };
        }
        return p;
      })
    );

    try {
      await toggleLikes(projectId);
      fetchProjects(false);
    } catch (err) {
      setProjects(previousProjects);
    }
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        project.title?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query) ||
        project.techStack?.some((tech) => tech.toLowerCase().includes(query));

      let matchesCategory = true;
      if (selectedCategory !== "All") {
        if (selectedCategory === "Trending") {
          matchesCategory =
            (project.likes?.length || 0) > 2 || parseFloat(project.averageRating || 0) >= 4.0;
        } else {
          matchesCategory = project.techStack?.some(
            (tech) => tech.toLowerCase() === selectedCategory.toLowerCase()
          );
        }
      }

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  const derivedAvgRating = useMemo(() => {
    if (stats?.avgRating) return parseFloat(stats.avgRating).toFixed(2);
    if (!projects.length) return null;
    const rated = projects.filter((p) => p.averageRating);
    if (!rated.length) return null;
    const avg = rated.reduce((sum, p) => sum + parseFloat(p.averageRating), 0) / rated.length;
    return avg.toFixed(2);
  }, [stats, projects]);

  const statCards = [
    {
      label: "Projects",
      value: stats?.projects ?? 0,
      icon: Layers,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      loading: statsLoading
    },
    {
      label: "Developers",
      value: stats?.developers ?? 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
      loading: statsLoading
    },
    {
      label: "Reviews",
      value: stats?.reviews ?? 0,
      icon: MessageSquare,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      loading: statsLoading
    },
    {
      label: "Avg Rating",
      value: derivedAvgRating,
      icon: Star,
      color: "text-amber-500 fill-amber-500",
      bg: "bg-amber-50",
      isRating: true,
      loading: statsLoading || (derivedAvgRating === null && loading)
    }
  ];

  // Hero Text Stagger Animation
  const heroTextVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 250, damping: 20 } }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#111827] font-sans selection:bg-emerald-500/20 selection:text-emerald-700 pb-24 overflow-hidden">
      <style jsx>{`
        .shimmer {
          background: linear-gradient(90deg, #f1f5f9 25%, #e5e7eb 37%, #f1f5f9 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Vibrant "Hara Bahra" Background Orbs */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-gradient-to-bl from-emerald-400/25 via-teal-300/15 to-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[300px] left-[-200px] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-400/20 to-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[600px] right-[10%] w-[400px] h-[400px] bg-gradient-to-l from-emerald-200/20 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none z-0"
        style={{ backgroundImage: `radial-gradient(#94A3B8 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
      />

      {/* Floating Sticky Search */}
      <AnimatePresence>
        {isPinned && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 inset-x-0 bg-[#FFFFFF]/80 backdrop-blur-xl border-b border-[#E5E7EB] z-50 py-3 shadow-sm px-6"
          >
            <div className="max-w-4xl mx-auto w-full flex items-center bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-1.5 shadow-sm transition-all focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-400">
              <div className="pl-3 pr-2 text-emerald-500">
                <Search className="w-4 h-4 stroke-[2.5]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search magical projects, frameworks..."
                className="flex-1 bg-transparent pl-2 pr-4 py-2 focus:outline-none text-sm text-[#111827] placeholder-[#6B7280]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 relative z-10">
        
        {/* KHATARNAK HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-8 mb-20">
          <motion.div 
            className="lg:col-span-7 space-y-6 text-left relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={heroTextVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 mb-5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <Sparkles className="w-4 h-4 text-emerald-500" /> Built for Creators
              </div>
            </motion.div>

            <motion.h1 variants={heroTextVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.1]">
              Explore Open Source <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-x drop-shadow-sm">
                Masterpieces.
              </span>
            </motion.h1>

            <motion.p variants={heroTextVariants} className="text-[#4B5563] text-lg sm:text-xl max-w-xl font-medium leading-relaxed">
              Discover production-ready projects built by passionate developers. Level up your tech stack with clean architecture.
            </motion.p>

            <motion.div variants={heroTextVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6">
              {statCards.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF]/60 border border-[#E5E7EB] rounded-2xl p-4 shadow-sm backdrop-blur-md hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] group-hover:text-[#374151] transition-colors">
                      {stat.label}
                    </span>
                    <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color}`}>
                      <stat.icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {stat.loading ? (
                    <Shimmer className="h-7 w-16" />
                  ) : (
                    <div className="text-2xl font-extrabold tracking-tight text-[#111827]">
                      {stat.isRating ? stat.value ?? "—" : <AnimatedNumber value={stat.value} />}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating Interactive Illustration */}
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-center select-none perspective-1000">
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-emerald-400/20 via-cyan-400/10 to-transparent rounded-full blur-3xl -z-10 animate-pulse" />
            
            <motion.div
              animate={{ y: [-10, 10, -10], rotateX: [2, -2, 2], rotateY: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-[420px] bg-[#FFFFFF]/90 border border-[#FFFFFF] rounded-3xl shadow-2xl shadow-emerald-500/10 p-6 space-y-5 backdrop-blur-xl relative z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
                <div className="flex items-center space-x-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-400 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm" />
                </div>
                <div className="h-6 bg-[#F8FAFC] rounded-lg px-6 text-[11px] text-[#6B7280] flex items-center justify-center font-mono font-semibold border border-[#E5E7EB]">
                  devreview.app/magic
                </div>
                <div className="w-6" />
              </div>

              <div className="space-y-4 pt-1">
                <div className="h-36 bg-gradient-to-br from-emerald-50 to-[#FFFFFF] rounded-2xl border border-dashed border-emerald-200 flex items-center justify-center overflow-hidden relative">
                  <motion.div 
                    animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.5, 1, 0.5] }} 
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.emerald.400/10)_0,transparent_100%)]" 
                  />
                  <div className="w-full px-6 space-y-4 relative z-10">
                    <div className="flex justify-between items-baseline">
                      <div className="h-3 bg-emerald-200 rounded-full w-1/3" />
                      <div className="h-6 bg-emerald-100 text-emerald-600 text-[11px] font-extrabold px-2.5 py-0.5 rounded-md flex items-center">
                        <Flame className="w-3 h-3 mr-1" /> +24.5%
                      </div>
                    </div>
                    <div className="h-6 bg-[#F1F5F9] rounded-lg w-1/2" />
                    <div className="flex items-end space-x-2 h-12 pt-2">
                      {[40, 65, 35, 80, 55, 95, 70, 85].map((h, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-md flex-1 shadow-sm" 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-[#F1F5F9] bg-[#F8FAFC] rounded-2xl space-y-2.5">
                    <div className="h-2 bg-[#CBD5E1] rounded-full w-2/3" />
                    <div className="h-4 bg-[#94A3B8] rounded-md w-1/2" />
                  </div>
                  <div className="p-4 border border-[#F1F5F9] bg-[#F8FAFC] rounded-2xl space-y-2.5">
                    <div className="h-2 bg-[#CBD5E1] rounded-full w-1/2" />
                    <div className="h-4 bg-[#94A3B8] rounded-md w-3/4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vibrant Search & Filters */}
        <section className="max-w-4xl mx-auto w-full mb-10 relative z-20">
          <div className="relative bg-[#FFFFFF] border-2 border-[#E5E7EB] rounded-2xl p-2 shadow-lg shadow-emerald-500/5 transition-all duration-300 flex items-center focus-within:ring-4 focus-within:ring-emerald-500/20 focus-within:border-emerald-400">
            <div className="pl-4 pr-2 text-emerald-500">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, tech stack, or framework..."
              className="flex-1 bg-transparent pl-2 pr-4 py-3.5 focus:outline-none text-base font-semibold text-[#111827] placeholder-[#94A3B8]"
            />
          </div>
        </section>

        {/* Dynamic Filter Pills */}
        <section className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-16">
          {CATEGORIES.map((chip) => {
            const isActive = selectedCategory === chip;
            return (
              <button
                key={chip}
                onClick={() => setSelectedCategory(chip)}
                className={`relative text-xs px-5 py-2.5 rounded-xl font-bold tracking-wide transition-all duration-300 outline-none border cursor-pointer ${
                  isActive
                    ? "text-[#FFFFFF] border-transparent shadow-md shadow-emerald-500/25"
                    : "bg-[#FFFFFF] border-[#E5E7EB] text-[#6B7280] hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="categoryPill"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl -z-10"
                  />
                )}
                {chip}
              </button>
            );
          })}
        </section>

        {/* Project Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#F1F5F9] pb-4">
            <h3 className="font-extrabold text-2xl flex items-center text-[#111827] tracking-tight">
              <Flame className="w-6 h-6 text-orange-500 mr-2.5 fill-orange-500/20 animate-pulse" />
              Trending Blueprints
            </h3>
            {!loading && !error && (
              <motion.span
                key={filteredProjects.length}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs text-emerald-700 font-bold bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl"
              >
                {filteredProjects.length} results
              </motion.span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {error && !loading && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-rose-50 border border-rose-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center max-w-lg mx-auto mt-10 shadow-sm"
              >
                <AlertCircle className="w-10 h-10 text-rose-500 mb-4" />
                <h3 className="text-lg font-bold text-rose-900">Connection Issue</h3>
                <p className="text-sm text-rose-700 mt-2 mb-6">{error}</p>
                <button
                  onClick={() => fetchProjects()}
                  className="px-6 py-2.5 bg-rose-500 text-[#FFFFFF] text-sm font-bold rounded-xl hover:bg-rose-600 transition-colors shadow-md cursor-pointer"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {loading && !error && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-[28px] h-[450px] flex flex-col justify-between overflow-hidden shadow-sm">
                    <div>
                      <Shimmer className="h-48 w-full rounded-none" />
                      <div className="p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                          <Shimmer className="w-8 h-8 rounded-full" />
                          <Shimmer className="h-3 w-24" />
                        </div>
                        <div className="space-y-3">
                          <Shimmer className="h-6 w-3/4" />
                          <Shimmer className="h-3 w-full" />
                          <Shimmer className="h-3 w-5/6" />
                        </div>
                        <div className="flex gap-2 pt-3">
                          <Shimmer className="h-6 w-16 rounded-md" />
                          <Shimmer className="h-6 w-16 rounded-md" />
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-[#F1F5F9] flex justify-between items-center bg-[#F8FAFC]">
                      <Shimmer className="h-5 w-24" />
                      <Shimmer className="h-9 w-24 rounded-xl" />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {!loading && !error && filteredProjects.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24 bg-[#FFFFFF]/80 backdrop-blur-sm rounded-[32px] border-2 border-dashed border-[#E5E7EB] shadow-sm max-w-2xl mx-auto mt-8"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-100">
                  <Code className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="text-[#111827] font-extrabold text-xl mb-2">No blueprints found</h3>
                <p className="text-[#6B7280] text-sm max-w-md mx-auto mb-8 font-medium">
                  We couldn't find any projects matching your exact criteria. Try adjusting your search query or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 bg-[#111827] text-[#FFFFFF] text-sm font-bold rounded-xl hover:bg-[#374151] transition-colors shadow-md cursor-pointer"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {!loading && !error && filteredProjects.length > 0 && (
              <motion.div
                key="grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => {
                  const badgeTypes = ["Trending", "New", "Staff Pick"];
                  const cardBadge = badgeTypes[index % badgeTypes.length];

                  return (
                    <motion.div
                      key={project._id}
                      variants={itemVariants}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="group bg-[#FFFFFF] border-2 border-[#F1F5F9] hover:border-emerald-300 rounded-[28px] flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div
                          onClick={() => router.push(`/projects/${project._id}`)}
                          className="relative h-48 w-full overflow-hidden cursor-pointer border-b border-[#F1F5F9] bg-[#F8FAFC] group/thumb"
                        >
                          <div className="absolute top-0 inset-x-0 h-9 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#F1F5F9] flex items-center justify-between px-4 z-30 transition-colors group-hover/thumb:bg-[#FFFFFF]">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-3 h-3 rounded-full bg-rose-400" />
                              <div className="w-3 h-3 rounded-full bg-amber-400" />
                              <div className="w-3 h-3 rounded-full bg-emerald-400" />
                            </div>
                            <div className="text-[10px] font-mono text-[#6B7280] tracking-tight max-w-[140px] truncate font-bold">
                              {project.title.toLowerCase().replace(/\s+/g, "-")}.io
                            </div>
                            <Bookmark className="w-4 h-4 text-[#94A3B8] opacity-50 hover:opacity-100 hover:text-emerald-500 transition-all" onClick={(e) => e.stopPropagation()} />
                          </div>

                          <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover/thumb:opacity-100 backdrop-blur-[3px] transition-all duration-300 z-20 flex items-center justify-center">
                            <span className="bg-[#FFFFFF] text-emerald-700 px-5 py-3 rounded-xl text-xs font-extrabold tracking-wide flex items-center gap-2 shadow-xl transform translate-y-6 group-hover/thumb:translate-y-0 transition-all duration-300">
                              View Blueprint <ArrowUpRight className="w-4 h-4 text-emerald-600 stroke-[3]" />
                            </span>
                          </div>

                          <div className="absolute top-12 left-4 z-20 pointer-events-none">
                            <span
                              className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-md tracking-wide text-[#FFFFFF] ${
                                cardBadge === "Trending"
                                  ? "bg-gradient-to-r from-orange-500 to-amber-500"
                                  : cardBadge === "New"
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
                              }`}
                            >
                              {cardBadge}
                            </span>
                          </div>

                          {project.thumbnail ? (
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              loading="lazy"
                              className="w-full h-full object-cover pt-9 transition-transform duration-700 ease-out group-hover/thumb:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full pt-9 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 text-emerald-400 p-4 transition-transform duration-700 group-hover/thumb:scale-105">
                              <Code className="w-10 h-10 mb-3 opacity-60" />
                              <span className="text-[11px] font-mono font-bold tracking-widest bg-[#FFFFFF] text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-lg uppercase shadow-sm">
                                {project.techStack?.[0] || "SOURCE"}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-6 space-y-4">
                          {project.owner && (
                            <div
                              onClick={() => router.push(`/users/${project.owner.username}`)}
                              className="flex items-center space-x-3 cursor-pointer group/owner w-fit"
                            >
                              <div className="relative">
                                {project.owner.profileImage ? (
                                  <img
                                    src={project.owner.profileImage}
                                    alt={project.owner.username}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-[#FFFFFF] shadow-sm group-hover/owner:border-emerald-200 transition-colors"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-[#FFFFFF] shadow-sm flex items-center justify-center text-[10px] font-extrabold text-emerald-700 uppercase group-hover/owner:border-emerald-200 transition-colors">
                                    {project.owner.username?.slice(0, 2)}
                                  </div>
                                )}
                                <div className="absolute -bottom-1 -right-1 bg-[#FFFFFF] rounded-full p-[2px] shadow-sm">
                                  <CheckCircle className="w-3 h-3 text-emerald-500 fill-emerald-500 stroke-[#FFFFFF]" />
                                </div>
                              </div>
                              <span className="text-xs font-bold text-[#6B7280] group-hover/owner:text-emerald-600 transition-colors">
                                @{project.owner.username}
                              </span>
                            </div>
                          )}

                          <div className="space-y-2">
                            <h4
                              onClick={() => router.push(`/projects/${project._id}`)}
                              className="font-extrabold text-[19px] text-[#111827] line-clamp-1 capitalize tracking-tight group-hover:text-emerald-600 cursor-pointer transition-colors"
                            >
                              {project.title}
                            </h4>
                            <p className="text-[13px] text-[#6B7280] line-clamp-2 min-h-[40px] leading-relaxed font-medium">
                              {project.description || "Production-ready codebase. Review architectures and implementation frameworks."}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.techStack?.slice(0, 4).map((tech, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-bold font-mono bg-[#F8FAFC] text-[#374151] px-3 py-1.5 rounded-lg border border-[#F1F5F9] group-hover:border-emerald-100 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors capitalize"
                              >
                                {tech}
                              </span>
                            ))}
                            {(project.techStack?.length || 0) > 4 && (
                              <span className="text-[11px] font-bold font-mono bg-[#F1F5F9] text-[#94A3B8] px-3 py-1.5 rounded-lg">
                                +{project.techStack.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-6 py-4 border-t-2 border-[#F8FAFC] flex items-center justify-between bg-[#FFFFFF] rounded-b-[28px]">
                        <div className="flex items-center space-x-5 text-[#6B7280]">
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => handleLike(e, project._id)}
                            className="flex items-center text-[12px] font-extrabold hover:text-rose-500 transition-colors group/like outline-none cursor-pointer"
                            aria-label="Like project"
                          >
                            <Heart
                              className={`w-4 h-4 mr-1.5 transition-all ${
                                project.isLiked
                                  ? "fill-rose-500 text-rose-500"
                                  : "stroke-[2.5] text-[#94A3B8] group-hover/like:text-rose-500"
                              }`}
                            />
                            {project.likes?.length || 0}
                          </motion.button>

                          <button
                            onClick={() => router.push(`/projects/${project._id}`)}
                            className="flex items-center text-[12px] font-extrabold hover:text-blue-500 transition-colors outline-none cursor-pointer"
                          >
                            <MessageSquare className="w-4 h-4 mr-1.5 stroke-[2.5] text-[#94A3B8]" />
                            {project.reviewsCount || 0}
                          </button>

                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={(e) => handleSaveButton(e, project._id)}
                            className="flex items-center hover:text-emerald-500 transition-colors group/save outline-none cursor-pointer"
                            aria-label="Save project"
                          >
                            <Bookmark
                              className={`w-4 h-4 transition-all ${
                                project.isSaved
                                  ? "fill-emerald-500 text-emerald-500"
                                  : "stroke-[2.5] text-[#94A3B8] group-hover/save:text-emerald-500"
                              }`}
                            />
                          </motion.button>
                        </div>

                        <div className="flex items-center space-x-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View source code on GitHub"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2.5 text-[#6B7280] hover:text-[#111827] bg-[#F1F5F9] hover:bg-[#E5E7EB] rounded-xl transition-all active:scale-95 cursor-pointer"
                            >
                              <GitBranch className="w-4 h-4 stroke-[2.5]" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View live project"
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-extrabold text-[#FFFFFF] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
                            >
                              <span>Live</span>
                              <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}