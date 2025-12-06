'use client';

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

// Custom Instagram Icon Component (from Simple Icons)
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set mounted flag using a proper pattern
    const timer = setTimeout(() => setMounted(true), 0);

    // Check if fonts are loaded
    const checkFonts = async () => {
      try {
        await document.fonts.load('400 16px "Space Mono"');
        await document.fonts.load('400 16px "Anton"');
        await document.fonts.ready;
        setFontsLoaded(true);
      } catch (error) {
        // Fallback: wait 2 seconds then proceed
        setTimeout(() => setFontsLoaded(true), 2000);
      }
    };

    checkFonts();

    // Mouse movement for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check if everything is ready
  useEffect(() => {
    if (mounted && fontsLoaded) {
      // Small delay to ensure smooth transition
      const readyTimer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(readyTimer);
    }
  }, [mounted, fontsLoaded]);

  // Timer Logic
  useEffect(() => {
    // Target: Thursday, December 12, 2025 at 4 PM for website launch
    const targetDate = new Date('2025-12-11T16:00:00').getTime();

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

  // Loading screen
  if (!isReady) {
    return (
      <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden flex items-center justify-center">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
          .font-tech { font-family: 'Space Mono', monospace; }
          .font-bold-display { font-family: 'Anton', sans-serif; }
        `}</style>
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-[#e62b1e] rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-[#e62b1e] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-[#e62b1e] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="font-tech text-gray-400 text-sm tracking-widest">
            LOADING_TRANSMISSION...
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#e62b1e] to-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden selection:bg-[#e62b1e] selection:text-black opacity-0 animate-[fadeIn_0.5s_ease-in_forwards]">

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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* --- Dynamic Background Layer --- */}
      <div className="absolute inset-0 z-0 grid-bg pointer-events-none"></div>

      {/* Massive Background Typography (Parallax) */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-50 select-none z-[1]"
        style={{ transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)` }}
      >
        {/*<h1 className="text-[20vw] font-bold-display stroke-text whitespace-nowrap leading-none tracking-tighter">
          TEDxVJCET
        </h1>*/}
        <Image src="/tedx/logo-white.png" alt="TEDxVJCET Logo" width={1500} height={100}/>
      </div>



      {/* --- Main Content Grid --- */}
      <main className="relative z-10 min-h-screen flex flex-col justify-between p-6 md:p-12 max-w-7xl mx-auto border-x border-white/5 bg-[#050505]/30 backdrop-blur-sm">

        {/* Header Section */}
        <header className="flex justify-between items-start">
          <div className="flex flex-col">
            <Image src="/tedx/logo-white.png" alt="TEDxVJCET Logo" width={250} height={100} className="-translate-x-5" />
            <div className="flex items-center gap-2 text-xs font-tech text-gray-500">
              <span className="w-2 h-2 bg-[#e62b1e] rounded-full animate-pulse"></span>
              <span>SYSTEM_STATUS: PRE_LAUNCH</span>
            </div>
          </div>

          {/* Decorative Technical Info */}
          <div className="hidden md:block text-right font-tech text-xs text-gray-600">
             <p>LAT: 9.9508° N</p>
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
            <div className="flex gap-4 md:gap-8 text-sm font-tech text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#e62b1e]" />
                {/* Updated Year to 2026 */}
                <span>JAN 03, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#e62b1e]" />
                <a
                  href="https://maps.app.goo.gl/2Ki22FMMpcF1HZuU8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline"
                >
                  VJCET_MBA_SEMINAR_HALL
                </a>
              </div>
            </div>

            <a
              href="https://www.instagram.com/tedxvjcet/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white text-black px-6 py-3 font-bold font-bold-display tracking-wide hover:bg-[#e62b1e] hover:text-white transition-all duration-300"
            >
              <InstagramIcon size={20} />
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
