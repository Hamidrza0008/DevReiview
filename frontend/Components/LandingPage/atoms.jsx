'use client';

import React from 'react';

// DevReview Premium Logo - Meaningful Code Bracket & Checkmark Design
export const DevReviewLogo = () => (
  <div className="flex items-center gap-2 select-none cursor-pointer">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Premium Dark Background Node */}
      <rect width="28" height="28" rx="8" fill="#111827"/>
      
      {/* Code Terminal Bracket Element (<) in Dev Blue */}
      <path 
        d="M11 10L7 14L11 18" 
        stroke="#2563EB" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Review Verified Checkmark (\checkmark) in Success Green */}
      <path 
        d="M15 15L18 18L22 11" 
        stroke="#22C55E" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
    <span className="text-xl font-bold tracking-tight text-[#111827]">
      Dev<span className="text-[#2563EB]">Review</span>
    </span>
  </div>
);


// Premium Primary Button
export const PrimaryButton = ({ children, onClick, className = '' }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-2.5 bg-[#2563EB] text-white font-medium text-sm rounded-lg shadow-sm hover:bg-[#1D4ED8] transition-all duration-150 active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);

// Premium Secondary Button
export const SecondaryButton = ({ children, onClick, className = '' }) => (
  <button 
    onClick={onClick}
    className={`px-5 py-2.5 bg-white text-[#6B7280] border border-[#E5E7EB] font-medium text-sm rounded-lg shadow-sm hover:bg-[#F8FAFC] hover:text-[#111827] transition-all duration-150 active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);

// Tech Stack Tag Badge
export const TechBadge = ({ name }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#F1F5F9] text-[#6B7280] border border-[#E5E7EB]">
    {name}
  </span>
);