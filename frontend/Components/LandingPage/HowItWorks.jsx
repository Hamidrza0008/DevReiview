'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    { 
      number: '01', 
      title: 'Create Profile', 
      desc: 'Sign up and sync your GitHub credentials.',
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      number: '02', 
      title: 'Upload Project', 
      desc: 'Provide links, markdown READMEs, and mock snapshots.',
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
      )
    },
    { 
      number: '03', 
      title: 'Receive Reviews', 
      desc: 'Get targeted, deep architectural notes from peers.',
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    { 
      number: '04', 
      title: 'Improve & Grow', 
      desc: 'Refactor code safely and update your status logs.',
      icon: (
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section className="w-full px-6 md:px-12 py-24 bg-gradient-to-b from-white to-[#F8FAFC] border-b border-[#E5E7EB] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Workflow
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] mt-3 tracking-tight">
            How it works
          </h2>
          <p className="text-[#6B7280] mt-2 text-sm md:text-base max-w-md mx-auto">
            Supercharge your development process in four simple stages.
          </p>
        </div>

        {/* Steps Flex/Grid Layout Layer */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 relative"
        >
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Step Card Element */}
              <motion.div 
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center text-center p-6 bg-white border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 relative z-10 w-full lg:max-w-[260px] min-h-[250px]"
              >
                {/* Step Icon & Number Badge */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm">
                    <div className="group-hover:scale-105 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <span className="absolute -top-2 -right-3 bg-white text-gray-400 group-hover:text-blue-600 group-hover:border-blue-100 border border-gray-100 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Step Info */}
                <h3 className="text-lg font-bold text-[#111827] mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>

              {/* Modern Linear Connecting Arrow Indicator */}
              {idx !== steps.length - 1 && (
                <div className="flex items-center justify-center z-0 my-2 lg:my-0 lg:mx-2 text-slate-300 group">
                  {/* Horizontal Arrow for Desktop Screens */}
                  <svg 
                    className="w-8 h-8 hidden lg:block text-slate-300 transform transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  
                  {/* Vertical Arrow for Mobile/Tablet Screens */}
                  <svg 
                    className="w-6 h-6 lg:hidden text-slate-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

      </div>
    </section>
  );
}