'use client';

import React from 'react';
import { TechBadge } from './atoms';

export default function FeaturedProjects() {
  const showcases = [
    { 
      title: 'Finance Tracker', 
      stack: ['Next.js', 'MongoDB', 'Tailwind'], 
      dev: 'Hamid Raza', 
      reviews: 12,
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
    },
    { 
      title: 'Task Management App', 
      stack: ['React', 'Node.js', 'PostgreSQL'], 
      dev: 'Alex Rivera', 
      reviews: 8,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
    },
    { 
      title: 'E-Commerce Platform', 
      stack: ['Next.js', 'TailwindCSS', 'Stripe'], 
      dev: 'Sarah Chen', 
      reviews: 16,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="w-full px-6 md:px-12 py-20 bg-white border-b border-[#E5E7EB]">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-12 max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-[#111827] tracking-tight">Featured Projects</h2>
          <p className="text-sm text-[#6B7280] mt-1">Top engineering works this week</p>
        </div>
        <a 
          href="#" 
          className="text-sm font-semibold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 group/btn transition-colors duration-200"
        >
          View all 
          <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {showcases.map((project, idx) => (
          <div 
            key={idx} 
            className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 transform hover:-translate-y-1.5 group cursor-pointer flex flex-col"
          >
            {/* Premium Visual Thumbnail Window with Image Overlay */}
            <div className="h-48 bg-slate-950 border-b border-[#E5E7EB] relative overflow-hidden flex items-center justify-center">
              {/* Unsplash Dynamic Screen Layer */}
              <img 
                src={project.imageUrl} 
                alt={`${project.title} Preview`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] opacity-85 group-hover:opacity-100"
              />
              
              {/* Dark Gradient Overlay Mask for Premium Tech Aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Float Micro Code Indicator Icon */}
              <div className="absolute top-3 right-3 w-7 h-7 border border-white/10 rounded-lg bg-slate-900/60 backdrop-blur-md flex items-center justify-center font-mono text-[9px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                &lt;/&gt;
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1 justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors duration-200 mb-2">
                  {project.title}
                </h3>
                
                {/* Tech Tags Container */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map(tech => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-[#6B7280]">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-[#2563EB] font-bold flex items-center justify-center text-[10px] border border-blue-100">
                    {project.dev.charAt(0)}
                  </div>
                  <span>by <strong className="text-[#111827] font-semibold">{project.dev}</strong></span>
                </div>
                
                <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md font-medium text-[#475569] group-hover:bg-blue-50 group-hover:text-[#2563EB] transition-colors duration-200">
                  <span>💬</span>
                  <span>{project.reviews} reviews</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}