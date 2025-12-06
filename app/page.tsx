'use client';

import React, { useState, useEffect } from "react";
import { Instagram, Calendar, MapPin, ArrowRight, Terminal } from "lucide-react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Mouse movement for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Timer Logic
  useEffect(() => {
    // Target: Thursday, December 12, 2025 at 4 PM for website launch
    const targetDate = new Date('2025-12-12T16:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden selection:bg-[#e62b1e] selection:text-black">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        .font-tech { font-family: 'Space Mono', monospace; }
        .font-bold-display { font-family: 'Anton', sans-serif; }

        .stroke-text {
          -webkit-text-stroke: 3px rgba(255, 255, 255, 0.8);
          color: rgba(255, 255, 255, 0.1);
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }

        .grid-bg {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        @keyframes pulse-line {
          0% { height: 0%; opacity: 0; }
          50% { height: 100%; opacity: 1; }
          100% { height: 100%; opacity: 0; }
        }

        .animate-line {
          animation: pulse-line 3s ease-in-out infinite;
        }
      `}</style>

      {/* --- Dynamic Background Layer --- */}
      <div className="absolute inset-0 z-0 grid-bg pointer-events-none"></div>

      {/* Massive Background Typography (Parallax) */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-80 select-none z-[1]"
        style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
      >
        <h1 className="text-[20vw] font-bold-display stroke-text whitespace-nowrap leading-none tracking-tighter">
          TEDxVJCET
        </h1>
      </div>



      {/* --- Main Content Grid --- */}
      <main className="relative z-10 min-h-screen flex flex-col justify-between p-6 md:p-12 max-w-7xl mx-auto border-x border-white/5 bg-[#050505]/30 backdrop-blur-sm">

        {/* Header Section */}
        <header className="flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-5xl font-bold-display tracking-wide">
              <span className="text-[#e62b1e]">TEDx</span>VJCET
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs font-tech text-gray-500">
              <span className="w-2 h-2 bg-[#e62b1e] rounded-full animate-pulse"></span>
              <span>SYSTEM_STATUS: PRE_LAUNCH</span>
            </div>
          </div>

          {/* Decorative Technical Info */}
          <div className="hidden md:block text-right font-tech text-xs text-gray-600">
             <p>LAT: 9.9506° N</p>
             <p>LNG: 76.6317° E</p>
             <p>ID: 2025_EDITION</p>
          </div>
        </header>


        {/* Centerpiece */}
        <div className="flex flex-col items-center justify-center flex-grow py-20 relative">

           {/* Animated Red Line Connector */}
           <div className="absolute top-0 w-px h-20 bg-gradient-to-b from-transparent to-[#e62b1e]/50"></div>

           <div className="text-center space-y-8 relative">
             <div className="inline-block relative">
                <h3 className="font-tech text-[#e62b1e] text-sm md:text-base tracking-[0.3em] uppercase mb-4">
                  Incoming Transmission
                </h3>
                {/* Decorative brackets */}
                <div className="absolute -left-4 -top-4 w-4 h-4 border-l border-t border-gray-700"></div>
                <div className="absolute -right-4 -bottom-4 w-4 h-4 border-r border-b border-gray-700"></div>
             </div>

             <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold-display leading-[0.9] tracking-tight mix-blend-difference">
               IDEAS<br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">WORTH</span><br />
               SPREADING
             </h1>

             <p className="font-tech text-gray-400 max-w-md mx-auto text-xs md:text-sm leading-relaxed border-l-2 border-[#e62b1e] pl-4 text-left">
               &gt; Initiating sequence...<br/>
               &gt; Loading extraordinary concepts...<br/>
               &gt; Prepare for impact.
             </p>
           </div>
        </div>


        {/* Bottom Section: Countdown & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end border-t border-white/10 pt-8">

          {/* Countdown Display */}
          <div className="space-y-4">
            <p className="font-tech text-xs text-gray-500 uppercase tracking-widest">
              T-Minus to Website Launch
            </p>
            <div className="flex gap-4 md:gap-8 font-tech text-3xl md:text-5xl">
              <div className="flex flex-col">
                <span className="text-white">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-600 mt-1">DAYS</span>
              </div>
              <span className="text-[#e62b1e] animate-pulse">:</span>
              <div className="flex flex-col">
                <span className="text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-600 mt-1">HRS</span>
              </div>
               <span className="text-[#e62b1e] animate-pulse">:</span>
              <div className="flex flex-col">
                <span className="text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-600 mt-1">MIN</span>
              </div>
               <span className="text-[#e62b1e] animate-pulse">:</span>
              <div className="flex flex-col">
                <span className="text-[#e62b1e]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-600 mt-1">SEC</span>
              </div>
            </div>
          </div>

          {/* Actions & Details */}
          <div className="flex flex-col md:items-end space-y-6">
            <div className="flex gap-8 text-sm font-tech text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#e62b1e]" />
                {/* Updated Year to 2026 */}
                <span>JAN 03, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#e62b1e]" />
                <span>VJCET_AUDITORIUM</span>
              </div>
            </div>

            <a
              href="https://www.instagram.com/tedxvjcet/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white text-black px-6 py-3 font-bold font-bold-display tracking-wide hover:bg-[#e62b1e] hover:text-white transition-all duration-300"
            >
              <Instagram size={20} />
              <span>FOLLOW PROTOCOL</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </main>

      {/* Decorative Corners */}
      <div className="fixed top-6 left-6 w-4 h-4 border-l-2 border-t-2 border-[#e62b1e] pointer-events-none"></div>
      <div className="fixed top-6 right-6 w-4 h-4 border-r-2 border-t-2 border-[#e62b1e] pointer-events-none"></div>
      <div className="fixed bottom-6 left-6 w-4 h-4 border-l-2 border-b-2 border-[#e62b1e] pointer-events-none"></div>
      <div className="fixed bottom-6 right-6 w-4 h-4 border-r-2 border-b-2 border-[#e62b1e] pointer-events-none"></div>

    </div>
  );
}
