"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Bell, Shield, Eye } from 'lucide-react';

export default function Settings() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-[#F8FAFC] min-h-screen space-y-6 animate-pulse">
        <div className="h-10 bg-[#E5E7EB] rounded w-1/4"></div>
        <div className="h-64 bg-white rounded-xl"></div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-[#F8FAFC] min-h-screen text-[#111827]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-[#6B7280]">Configure notifications, keys, profile parameters, and visualization metrics.</p>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl max-w-4xl overflow-hidden">
        {/* Account settings tab matrix wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="border-r border-[#E5E7EB] p-4 space-y-1 bg-[#F8FAFC]/50">
            {[
              { n: "Profile Settings", i: Sliders, active: true },
              { n: "Notifications", i: Bell, active: false },
              { n: "Security Keys", i: Shield, active: false },
            ].map((tab, idx) => (
              <button 
                key={idx} 
                className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-lg flex items-center space-x-2 transition-all ${tab.active ? 'bg-white text-[#2563EB] border border-[#E5E7EB] shadow-sm' : 'text-[#6B7280] hover:text-[#111827]'}`}
              >
                <tab.i className="w-4 h-4" />
                <span>{tab.n}</span>
              </button>
            ))}
          </div>

          {/* Form parameters content section */}
          <div className="p-6 md:col-span-3 space-y-6">
            <div>
              <h3 className="font-bold text-base mb-4 pb-2 border-b border-[#E5E7EB]">Public Profile Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Developer Handle</label>
                  <input type="text" defaultValue="alexrivera" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-2 rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">Portfolio Endpoint</label>
                  <input type="text" defaultValue="https://rivera.dev" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] px-3 py-2 rounded-lg text-sm text-[#111827] focus:outline-none focus:border-[#2563EB]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base mb-4 pb-2 border-b border-[#E5E7EB]">Notification Thresholds</h3>
              <div className="space-y-3">
                {[
                  { title: "Review Assertion Triggers", desc: "Instantly alert my workstation when a project score is calculated." },
                  { title: "Weekly Digest Index", desc: "Compile global ecosystem trending metrics into a summary mail." }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-[#6B7280]">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#2563EB] border-[#E5E7EB] rounded mt-1 accent-[#2563EB]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex justify-end">
              <motion.button 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.99 }}
                className="bg-[#2563EB] hover:bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-colors"
              >
                Save Core Configuration
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}