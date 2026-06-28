'use client';

import React from 'react';

export default function Community() {
  return (
    <section className="w-full px-6 md:px-12 py-20 bg-[#F8FAFC] border-b border-[#E5E7EB]">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">Community Feedback Feed</h2>
          <p className="text-sm text-[#6B7280] mt-1">Real reviews posted by engineering peers</p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-xs shrink-0">
            RS
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm mb-1">
              <span className="font-bold text-[#111827]">Rahul Sharma</span>
              <span className="text-[#6B7280] text-xs">• 2 hours ago</span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Great UI and clean code! Maybe improve the mobile responsive part in the main dashboard panel, specifically the sidebar visibility grid. Overall awesome execution! 🔥
            </p>
            <div className="flex items-center gap-1 text-[#22C55E] text-xs mt-3 font-semibold">
              ★★★★★ <span className="text-[#6B7280] ml-2 font-normal">(Verified Engineer)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}