"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, ThumbsUp, MessageSquare, Terminal, Search, Plus, 
  Flame, CheckCircle, Eye, Clock, Hash, Trophy, Star, 
  GitFork, Briefcase, ExternalLink, ShieldCheck, Bell, 
  ChevronRight, Code2, Database, Layout, Server, Cpu
} from 'lucide-react';

// --- Dummy Data (Realistic Developer Content) ---

const filters = ["Trending", "Latest", "Unanswered", "Solved", "Backend", "Frontend", "AI", "DevOps", "Open Source"];

const discussions = [
  {
    id: 1,
    user: "Alex Chen",
    handle: "alexc_dev",
    initials: "AC",
    color: "bg-blue-100 text-blue-700",
    rep: "14.2K",
    time: "2 hours ago",
    title: "Best authentication strategy for Next.js 16 App Router?",
    preview: "I'm migrating a large scale SaaS from Pages to App router. What's the current consensus on Auth.js vs Supabase Auth vs Clerk for edge compatibility and middleware?",
    tags: ["nextjs", "auth", "architecture"],
    upvotes: 342,
    replies: 56,
    views: "14.5K",
    lastActivity: "10 mins ago",
    isHot: true,
    isSolved: false,
  },
  {
    id: 2,
    user: "Maria Gonzalez",
    handle: "maria_codes",
    initials: "MG",
    color: "bg-emerald-100 text-emerald-700",
    rep: "8.9K",
    time: "4 hours ago",
    title: "Why is my Express API slowing down after deployment?",
    preview: "Locally my API responds in ~40ms, but on AWS ECS it's taking 400ms+. I've checked the DB connection pool and it seems fine. Could it be a VPC routing issue?",
    tags: ["nodejs", "aws", "performance"],
    upvotes: 128,
    replies: 34,
    views: "5.2K",
    lastActivity: "2 hours ago",
    isHot: false,
    isSolved: false,
  },
  {
    id: 3,
    user: "David Kim",
    handle: "dkim_tech",
    initials: "DK",
    color: "bg-indigo-100 text-indigo-700",
    rep: "22.1K",
    time: "1 day ago",
    title: "React Query vs SWR in production - 2026 Perspective",
    preview: "We are heavily relying on client-side state. Both libraries are great, but React Query v5 seems to have better DevTools. Thoughts from anyone who has scaled both?",
    tags: ["react", "state-management"],
    upvotes: 512,
    replies: 89,
    views: "22.1K",
    lastActivity: "1 hour ago",
    isHot: true,
    isSolved: true,
  },
  {
    id: 4,
    user: "Sarah Jenkins",
    handle: "sjenkins",
    initials: "SJ",
    color: "bg-rose-100 text-rose-700",
    rep: "12.4K",
    time: "2 days ago",
    title: "How to optimize MongoDB aggregation pipelines?",
    preview: "I have a collection with 50M+ documents. My current $lookup and $group pipeline is hitting the 100MB RAM limit. How can I optimize or paginate this effectively?",
    tags: ["mongodb", "database", "optimization"],
    upvotes: 245,
    replies: 41,
    views: "8.9K",
    lastActivity: "5 hours ago",
    isHot: false,
    isSolved: true,
  },
  {
    id: 5,
    user: "James Wilson",
    handle: "jwilson",
    initials: "JW",
    color: "bg-amber-100 text-amber-700",
    rep: "2.3K",
    time: "3 days ago",
    title: "Show your portfolio for review! (July Edition)",
    preview: "Drop your portfolio links below! Let's help each other improve our personal sites. Looking specifically for clean typography and good lighthouse scores.",
    tags: ["showcase", "frontend", "design"],
    upvotes: 890,
    replies: 312,
    views: "45.2K",
    lastActivity: "Just now",
    isHot: true,
    isSolved: false,
  },
  {
    id: 6,
    user: "Priya Patel",
    handle: "priya_dev",
    initials: "PP",
    color: "bg-fuchsia-100 text-fuchsia-700",
    rep: "6.7K",
    time: "4 days ago",
    title: "Dockerizing MERN applications - Best practices for volumes",
    preview: "When setting up docker-compose for local development, how do you handle node_modules syncing between the host and container to avoid rebuilds?",
    tags: ["docker", "devops", "mern"],
    upvotes: 156,
    replies: 22,
    views: "6.1K",
    lastActivity: "1 day ago",
    isHot: false,
    isSolved: true,
  },
  {
    id: 7,
    user: "Liam O'Connor",
    handle: "liam_oc",
    initials: "LO",
    color: "bg-cyan-100 text-cyan-700",
    rep: "18.5K",
    time: "5 days ago",
    title: "AI code review tools worth using?",
    preview: "Has anyone integrated AI code reviewers into their GitHub Actions pipeline? Looking for tools that actually catch logical bugs, not just linting errors.",
    tags: ["ai", "github-actions", "testing"],
    upvotes: 432,
    replies: 67,
    views: "18.3K",
    lastActivity: "3 hours ago",
    isHot: true,
    isSolved: false,
  },
  {
    id: 8,
    user: "Devon Ross",
    handle: "devon_r",
    initials: "DR",
    color: "bg-teal-100 text-teal-700",
    rep: "9.1K",
    time: "1 week ago",
    title: "Firebase vs Supabase in 2026 - Migration Guide",
    preview: "We just finished migrating a 5-year-old Firebase project to Supabase. Here is a breakdown of our challenges with RLS, Edge Functions, and pricing differences.",
    tags: ["supabase", "firebase", "backend"],
    upvotes: 785,
    replies: 104,
    views: "32.4K",
    lastActivity: "2 days ago",
    isHot: false,
    isSolved: true,
  }
];

const trendingTags = [
  { name: "nextjs", count: "1,204" },
  { name: "react", count: "983" },
  { name: "nodejs", count: "842" },
  { name: "typescript", count: "756" },
  { name: "mongodb", count: "512" },
  { name: "tailwind", count: "489" },
  { name: "docker", count: "394" },
  { name: "ai", count: "315" },
];

const topContributors = [
  { name: "Sarah Jenkins", role: "Senior Frontend", rep: "12.4K", points: "+450", initials: "SJ", color: "bg-rose-100 text-rose-700" },
  { name: "David Kim", role: "Staff Engineer", rep: "22.1K", points: "+380", initials: "DK", color: "bg-indigo-100 text-indigo-700" },
  { name: "Alex Chen", role: "Full Stack", rep: "14.2K", points: "+310", initials: "AC", color: "bg-blue-100 text-blue-700" },
  { name: "Liam O'Connor", role: "DevOps Lead", rep: "18.5K", points: "+295", initials: "LO", color: "bg-cyan-100 text-cyan-700" },
  { name: "Maria Gonzalez", role: "Backend Dev", rep: "8.9K", points: "+210", initials: "MG", color: "bg-emerald-100 text-emerald-700" },
];

const resources = [
  { title: "Next.js Docs", desc: "The React Framework for the Web", icon: <Layout className="w-6 h-6 text-slate-800" />, href: "#" },
  { title: "React Docs", desc: "The library for web and native UIs", icon: <Code2 className="w-6 h-6 text-blue-500" />, href: "#" },
  { title: "Node.js", desc: "JavaScript runtime built on V8", icon: <Server className="w-6 h-6 text-green-600" />, href: "#" },
  { title: "MongoDB", desc: "The developer data platform", icon: <Database className="w-6 h-6 text-emerald-500" />, href: "#" },
  { title: "Tailwind CSS", desc: "Rapidly build modern websites", icon: <Cpu className="w-6 h-6 text-cyan-500" />, href: "#" },
  { title: "System Design", desc: "Architecture patterns & guides", icon: <Server className="w-6 h-6 text-indigo-500" />, href: "#" },
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Community() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(setTimeoutId);
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8 lg:p-12 bg-[#F8FAFC] min-h-screen space-y-8 animate-pulse">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-12 bg-[#E5E7EB] rounded-lg w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-white rounded-2xl shadow-sm border border-slate-200"></div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-white rounded-2xl border border-slate-200"></div>
              <div className="h-80 bg-white rounded-2xl border border-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8 lg:p-10 bg-[#F8FAFC] min-h-screen text-[#111827] font-sans selection:bg-blue-100"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">Developer Community</h1>
              <p className="text-slate-500 text-lg max-w-2xl">Connect, collaborate, and share knowledge with thousands of developers worldwide.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search discussions..." 
                  className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm shadow-blue-600/20 transition-colors whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span>New Discussion</span>
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter, i) => (
              <button 
                key={i} 
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  i === 0 
                  ? "bg-slate-900 text-white shadow-sm" 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Feed (Left - 8 Cols) */}
          <motion.div 
            className="lg:col-span-8 space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {discussions.map((post) => (
              <motion.div 
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${post.color}`}>
                      {post.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{post.user}</span>
                        <span className="text-slate-500 text-sm">@{post.handle}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 text-xs font-medium bg-slate-100 px-2 py-0.5 rounded-md">{post.rep}</span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.isHot && <span className="flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-1 rounded-full text-xs font-medium"><Flame className="w-3.5 h-3.5" /> Hot</span>}
                    {post.isSolved && <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full text-xs font-medium"><CheckCircle className="w-3.5 h-3.5" /> Solved</span>}
                  </div>
                </div>

                <h3 className="font-bold text-xl mb-2 text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {post.preview}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer px-2.5 py-1 rounded-md transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex space-x-6 text-sm font-medium text-slate-500">
                    <button className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" /> <span>{post.upvotes}</span>
                    </button>
                    <button className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" /> <span>{post.replies} Replies</span>
                    </button>
                    <div className="flex items-center space-x-1.5">
                      <Eye className="w-4 h-4" /> <span>{post.views} Views</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">
                    Last active {post.lastActivity}
                  </div>
                </div>
              </motion.div>
            ))}
            
            <button className="w-full py-4 text-sm font-semibold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 rounded-2xl hover:border-blue-200 hover:shadow-sm transition-all">
              Load More Discussions
            </button>
          </motion.div>

          {/* Right Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Community Stats */}
            <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" /> Community Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">Active Developers</span> <span className="font-bold text-slate-900">24,592</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">Projects Shared</span> <span className="font-bold text-slate-900">8,104</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">Discussions</span> <span className="font-bold text-slate-900">142,883</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">Replies</span> <span className="font-bold text-slate-900">1.2M</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">OS Contributions</span> <span className="font-bold text-slate-900">34,912</span></div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-900 font-medium text-sm">Online Members</span> 
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> 1,412</span>
                </div>
              </div>
            </motion.div>

            {/* Weekly Challenge */}
            <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
              <Terminal className="w-6 h-6 text-emerald-400 mb-3 relative z-10" />
              <div className="relative z-10">
                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase mb-2 block">Weekly Challenge</span>
                <h4 className="font-bold text-lg mb-2 leading-tight">Build an AI-powered Portfolio Review Tool</h4>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-slate-300">Prize: Featured on Homepage</span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs text-slate-400 font-medium bg-slate-800 px-2.5 py-1 rounded-md">⏳ 3 Days Left</span>
                  <button className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors shadow-sm">
                    Join Challenge
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Trending Tags */}
            <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Hash className="w-4 h-4 text-blue-500" /> Trending Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag, i) => (
                  <div key={i} className="flex items-center justify-between w-full group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors -mx-2">
                    <span className="text-slate-700 font-medium text-sm group-hover:text-blue-600 transition-colors">#{tag.name}</span>
                    <span className="text-slate-400 text-xs bg-slate-100 px-2 py-0.5 rounded-md">{tag.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Contributors */}
            <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" /> Top Contributors
              </h3>
              <div className="space-y-4">
                {topContributors.map((user, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${user.color}`}>
                      {user.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">{user.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{user.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-slate-700">{user.rep}</div>
                      <div className="text-xs text-emerald-500 font-medium">{user.points} this wk</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Open Source Spotlight */}
            <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <GitFork className="w-4 h-4 text-purple-500" /> Open Source Spotlight
              </h3>
              <div className="border border-slate-200 rounded-xl p-4 hover:border-purple-300 transition-colors cursor-pointer group">
                <h4 className="font-bold text-slate-900 flex items-center gap-2 group-hover:text-purple-600 transition-colors">
                  <BookIcon className="w-4 h-4 text-slate-400" />
                  next-saas-starter
                </h4>
                <p className="text-sm text-slate-500 mt-2 mb-4 line-clamp-2">An open-source, production-ready SaaS starter kit built with Next.js 16, Prisma, and Stripe.</p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> 14.2k</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> 1.2k</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> TypeScript</span>
                </div>
              </div>
            </motion.div>

            {/* Hiring Corner */}
            <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-500" /> Hiring Corner
              </h3>
              <div className="space-y-3">
                <div className="p-3 border border-slate-100 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-sm text-slate-900">Frontend Developer</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">Remote</span>
                    <span className="text-xs font-medium text-emerald-600">₹12-18 LPA</span>
                  </div>
                </div>
                <div className="p-3 border border-slate-100 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-sm text-slate-900">Backend Engineer</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">Remote (US/EU)</span>
                    <span className="text-xs font-medium text-slate-600">$120k-$150k</span>
                  </div>
                </div>
                <div className="p-3 border border-slate-100 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <h4 className="font-semibold text-sm text-slate-900">Full Stack Intern</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">Hybrid (London)</span>
                    <span className="text-xs font-medium text-blue-600">Apply</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div variants={itemVariants} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-rose-500" /> Recent Achievements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 p-1.5 rounded-md shrink-0 text-rose-600">🎉</div>
                  <p className="text-sm text-slate-700"><strong>Ahmed</strong> earned the <span className="font-semibold text-slate-900">"Top Reviewer"</span> badge</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-md shrink-0 text-blue-600">🚀</div>
                  <p className="text-sm text-slate-700"><strong>Sarah</strong> published a new project: <span className="font-semibold text-blue-600 cursor-pointer hover:underline">CodeSnip</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-1.5 rounded-md shrink-0 text-amber-600">🔥</div>
                  <p className="text-sm text-slate-700"><strong>John</strong> reached 500 reputation points this week</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-1.5 rounded-md shrink-0 text-emerald-600">⭐</div>
                  <p className="text-sm text-slate-700"><strong>Maria</strong> received 100 likes on her latest tutorial</p>
                </div>
              </div>
            </motion.div>

            {/* Community Guidelines */}
            <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-500" /> Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Be respectful</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Give constructive feedback</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> No spam or self-promo</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Share knowledge openly</li>
              </ul>
            </motion.div>

          </div>
        </div>

        {/* Bottom Section: Popular Resources */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Popular Resources</h2>
              <p className="text-slate-500 mt-1">Official documentation and community guides</p>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer flex items-start gap-4"
              >
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                  {res.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {res.title}
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">{res.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// Helper icon component for Repository
function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}