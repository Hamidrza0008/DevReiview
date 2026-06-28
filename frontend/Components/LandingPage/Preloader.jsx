'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  const logSteps = [
    { text: 'fetching devreview dependencies...', type: 'info' },
    { text: 'loading premium light theme configs...', type: 'info' },
    { text: 'tailwind engine injected successfully.', type: 'success' },
    { text: 'ready on http://localhost:3000', type: 'ready' }
  ];

  useEffect(() => {
    logSteps.forEach((step, index) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
      }, (index + 1) * 400);
    });

    // 2.2s par uupar slide hone ki animation shuru hogi
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 2200);

    // 2.8s par screen se poora hat jayega
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-[#F8FAFC] z-[9999] flex flex-col items-center justify-center font-mono transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'translate-y-[-100%]' : 'translate-y-0'
      }`}
    >
      {/* Premium Light Card */}
      <div className="flex flex-col items-start gap-4 p-6 bg-white rounded-2xl border border-[#E5E7EB] max-w-md w-full mx-4 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
        
        {/* Top Header Controls */}
        <div className="w-full flex items-center justify-between border-b border-[#F1F5F9] pb-3 mb-1">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#E5E7EB]" />
            <div className="w-3 h-3 rounded-full bg-[#E5E7EB]" />
            <div className="w-3 h-3 rounded-full bg-[#E5E7EB]" />
          </div>
          <span className="text-[11px] font-sans font-medium text-[#6B7280]">devreview-terminal.sh</span>
        </div>

        {/* Log Feed Area */}
        <div className="w-full flex flex-col gap-2 min-h-[110px] text-xs font-semibold">
          <div className="text-[#111827] flex items-center">
            <span className="text-[#2563EB] mr-2 font-bold">▲</span>
            <span>npm run devreview</span>
          </div>

          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {log.type === 'info' && <span className="text-[#6B7280]">•</span>}
              {log.type === 'success' && <span className="text-[#22C55E]">✔</span>}
              {log.type === 'ready' && <span className="text-[#2563EB] font-bold">➔</span>}

              <span className={
                log.type === 'success' ? 'text-[#22C55E]' : 
                log.type === 'ready' ? 'text-[#2563EB] font-bold' : 'text-[#6B7280]'
              }>
                {log.text}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-[3px] bg-[#F1F5F9] rounded-full overflow-hidden mt-3">
          <div className="h-full bg-gradient-to-r from-[#2563EB] to-[#22C55E] rounded-full animate-[loadingBar_2s_cubic-bezier(0.2,0.8,0.2,1)_forwards]" />
        </div>
      </div>

      <div className="absolute bottom-10 flex items-center gap-2 text-[11px] font-sans font-bold tracking-widest text-[#6B7280]/60 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
        <span>compiling environment stack</span>
      </div>
    </div>
  );
}