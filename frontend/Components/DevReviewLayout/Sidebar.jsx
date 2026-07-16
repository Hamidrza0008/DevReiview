"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  MessageSquare,
  Compass,
  Bookmark,
  Users,
  User,
  Terminal,
  LogOut
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Explore Projects", icon: Compass, path: "/projects/explore" },
    { name: "Users", icon: Users, path: "/users/explore" },
    { name: "My Projects", icon: FolderGit2, path: "/projects/my" },
    { name: "Reviews Received", icon: MessageSquare, path: "/review", badge: "New" },
    { name: "Saved Projects", icon: Bookmark, path: "/projects/saved" },
    { name: "Community", icon: Users, path: "/community" },
    { name: "Profile", icon: User, path: "/profile/my" },
  ];

  const isMenuActive = (item) => {
    switch (item.name) {
      case "Dashboard":
        return pathname === "/dashboard";
      case "Explore Projects":
        return (
          pathname === "/projects" ||
          pathname === "/projects/explore" ||
          pathname === "/projects/create" ||
          (pathname.startsWith("/projects/") &&
            !pathname.startsWith("/projects/my") &&
            !pathname.startsWith("/projects/saved"))
        );
      case "My Projects":
        return pathname.startsWith("/projects/my");
      case "Users":
        return pathname.startsWith("/users");
      case "Profile":
        return pathname.startsWith("/profile");
      case "Saved Projects":
        return pathname.startsWith("/projects/saved");
      case "Reviews Received":
        return pathname.startsWith("/review");
      case "Community":
        return pathname.startsWith("/community");
      default:
        return pathname === item.path;
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-[#E5E7EB] fixed top-0 bottom-0 left-0 z-40 flex flex-col justify-between hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.01)]">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* Logo Branding - Original Size with subtle hover bounce */}
        <div className="h-16 flex items-center px-6 border-b border-[#E5E7EB]/50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => router.push("/dashboard")}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center shadow-sm shadow-[#2563EB]/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#2563EB]/40 group-hover:-rotate-6">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111827]">
              Dev<span className="text-[#2563EB]">Review</span>
            </span>
          </div>
        </div>

        {/* Navigation Map - Original Padding with Slide-in Hover */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isMenuActive(item);

            return (
              <button
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "text-[#2563EB] font-semibold"
                    : "text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827]"
                }`}
              >
                {/* Active Sidebar Highlight pill */}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActivePill"
                    className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#2563EB]/5 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Animated Left Border */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebarActiveBorder"
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.4)]" 
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Icon & Text with Right-Slide Hover Effect */}
                <div className="flex items-center gap-3 transform transition-transform duration-300 group-hover:translate-x-1">
                  <Icon 
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive 
                        ? "text-[#2563EB]" 
                        : "text-[#9CA3AF] group-hover:text-[#2563EB]"
                    }`} 
                  />
                  <span>{item.name}</span>
                </div>

                {/* Badge */}
                {item.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-colors duration-300 ${
                    isActive 
                      ? "bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/30" 
                      : "bg-[#F1F5F9] text-[#475569] group-hover:bg-[#E2E8F0]"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Embedded Fixed Mini Profile - Original Layout with hover slide */}
      <div className="p-4 border-t border-[#E5E7EB] bg-gradient-to-t from-[#F8FAFC] to-white flex items-center justify-between gap-2 group/profile">
        
        {/* Profile info slides slightly on hover */}
        <div className="flex items-center gap-3 min-w-0 transition-transform duration-300 group-hover/profile:translate-x-1">
          <div className="relative flex-shrink-0">
            <img
              src={user?.profileImage || "data:image/png;base64,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"}
              alt="Profile avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm transition-all duration-300 group-hover/profile:ring-[#E5E7EB]"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#22C55E] rounded-full ring-2 ring-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#111827] truncate">{user?.username || "Guest User"}</p>
            <p className="text-[11px] text-[#6B7280] truncate">{user?.email || "guest@devreview.com"}</p>
          </div>
        </div>

        {/* Actionable Logout Button with smooth hover */}
        <button
          onClick={() => logout()}
          className="p-2 text-[#9CA3AF] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-all duration-300 flex-shrink-0 group/logout"
          title="Log Out"
        >
          <LogOut className="w-4 h-4 transition-transform duration-300 group-hover/logout:-translate-x-0.5" />
        </button>
      </div>
    </aside>
  );
}