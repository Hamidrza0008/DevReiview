'use client';

import React from 'react';

export default function Features() {
  const featureList = [
    { title: 'Showcase Your Projects', description: 'Deploy your built work into a clean visual window tailored for dev inspectors.' },
    { title: 'Get Developer Feedback', description: 'Receive high-quality text, architecture reviews, and optimization thoughts.' },
    { title: 'Discover Amazing Projects', description: 'Browse and explore top-tier frameworks, concepts, and boilerplates.' },
    { title: 'Build Your Reputation', description: 'Gain review points, secure badges, and rise up the global technical leaderboards.' },
  ];

  return (
    <section className="w-full px-6 md:px-12 py-20 bg-white border-b border-[#E5E7EB]">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-[#111827] tracking-tight">Built explicitly for developer scale</h2>
        <p className="text-[#6B7280] mt-2">Everything you need to review code, share logic, and accelerate workflows.</p>
      </div>
      
      {/* Horizontal Progress Container */}
      <div className="relative max-w-7xl mx-auto">
        
        {/* Step Connecting Line (Only visible on large screens where grid shifts) */}
        <div className="absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-[#E5E7EB] hidden lg:block z-0" />
        
        {/* Horizontal Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {featureList.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
              
              {/* Step Number Circle with Connecting Line Logic */}
              <div className="relative flex items-center justify-center w-20 h-20 mb-6 bg-white border-2 border-[#2563EB] rounded-full shadow-sm group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300">
                <span className="text-xl font-bold text-[#2563EB] group-hover:text-white transition-colors duration-300">
                  {idx + 1}
                </span>
                
                {/* Small indicator arrows or bullets if wanted, but keeping it clean */}
              </div>

              {/* Feature Content */}
              <div className="p-5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm group-hover:shadow-md group-hover:border-[#2563EB]/40 transition-all duration-300 w-full min-h-[160px]">
                <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-[#2563EB] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}