'use client';

import React from 'react';

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600;800&display=swap');

    .font-tech { font-family: 'Space Mono', monospace; }
    .font-bold-display { font-family: 'Anton', sans-serif; }
    .font-anton {font-family: 'Anton';}
    .font-vanguard {font-family: Vanguard,sans-serif;}
    .font-sans { font-family: 'Inter', sans-serif; }

    .grid-bg {
      background-size: 50px 50px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }

    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .animate-slide-up {
      animation: slide-up 0.8s ease-out forwards;
    }

    /* Hide Scrollbar but allow scroll */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #050505;
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #e62b1e;
    }

    /* Countdown Card Levitation Effect */
    .countdown-card {
      transform: translateY(0px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .countdown-card:hover {
      transform: translateY(-12px);
      box-shadow: 0 20px 40px rgba(230, 43, 30, 0.2);
    }
  `}</style>
);
