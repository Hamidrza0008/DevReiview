'use client';

import React, { useState } from 'react';
import { DevReviewLogo, PrimaryButton } from './atoms';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Explore Projects', 'Reviews', 'Community', 'About'];

  return (
    // 'sticky top-0 z-[100]' solid glassmorphic layer
    <nav className="w-full fixed top-0 left-0 z-[100] bg-transparent backdrop-blur-md border-b border-[#E5E7EB]/30 transition-all duration-300">
      
      {/* Container wrapper for responsiveness */}
      <div className="max-w-7xl mx-auto h-16 px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo Wrapper with Hover Scale */}
        <div className="hover:scale-[1.02] transition-transform duration-200 active:scale-[0.98]">
          <DevReviewLogo />
        </div>
        
        {/* Center Navigation Links - Desktop Only */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a 
              key={link} 
              href="#" 
              className="relative text-sm font-medium text-[#6B7280] hover:text-[#111827] py-2 transition-colors duration-200 group"
            >
              {link}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#2563EB] rounded-full transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Action Stack - Desktop Only */}
        <div className="hidden md:flex items-center gap-5">
          <button className="relative text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0">
            Login
          </button>
          
          <PrimaryButton className="relative overflow-hidden group !px-6 !py-2.5 rounded-xl shadow-sm hover:shadow-md hover:shadow-shadow-blue-500/10 hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200">
            <span className="relative z-10 flex items-center gap-1">
              Get Started
              <svg 
                className="w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </PrimaryButton>
        </div>

        {/* Hamburger Menu Icon - Mobile Only */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-xl hover:bg-slate-100 transition-colors gap-[4px]"
          aria-label="Toggle Navigation"
        >
          <span className={`bg-[#111827] h-0.5 w-5 rounded transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`bg-[#111827] h-0.5 w-5 rounded transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
          <span className={`bg-[#111827] h-0.5 w-5 rounded transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown Drawer Container */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[#E5E7EB]/50 bg-white/95 backdrop-blur-xl ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          {links.map((link) => (
            <a 
              key={link} 
              href="#" 
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#6B7280] hover:text-[#111827] active:pl-1 transition-all duration-200"
            >
              {link}
            </a>
          ))}
          
          <hr className="border-[#E5E7EB]/60 my-1" />
          
          {/* Action Row for Mobile: Styled Side-by-Side buttons */}
          <div className="flex items-center gap-3 pt-1">
            {/* Mobile Login Button with User Icon */}
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-[#475569] border border-[#E5E7EB] hover:bg-slate-50 hover:text-[#111827] active:bg-slate-100 transition-all duration-200">
              <svg 
                className="w-4 h-4 text-[#6B7280]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h5a3 3 0 013 3v1" />
              </svg>
              Login
            </button>
            
            {/* Get Started Button for Mobile */}
            <PrimaryButton className="flex-1 !justify-center !py-2.5 rounded-xl text-sm shadow-sm">
              Get Started
            </PrimaryButton>
          </div>
        </div>
      </div>
    </nav>
  );
}