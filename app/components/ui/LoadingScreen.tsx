'use client';

import React from 'react';

export const LoadingScreen = () => (
  <div className="fixed inset-0 bg-[#050505] z-50 flex items-center justify-center">
    <div className="text-center">
       <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-[#e62b1e]/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#e62b1e] border-t-transparent rounded-full animate-spin"></div>
       </div>
       <div className="font-tech text-2xl text-white tracking-[0.2em] animate-pulse">INITIALIZING</div>
       <div className="mt-2 text-[#e62b1e] text-xs font-tech">TEDxVJCET</div>
    </div>
  </div>
);