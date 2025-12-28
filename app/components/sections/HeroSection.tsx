'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { useMousePosition } from '@/app/hooks/useMousePosition';
import { CONTACT } from '@/app/constants';

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const { x, y } = useMousePosition();
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return { w: window.innerWidth, h: window.innerHeight };
    }
    return { w: 0, h: 0 };
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Scroll Parallax
  const scale = Math.max(1 - scrollY / 1000, 0.8);
  const opacity = Math.max(1 - scrollY / 800, 0);
  const translateY = scrollY * 0.5;

  // Enhanced Mouse Parallax (Restored: disabled on screens smaller than 768px)
  const parallaxX = windowSize.w > 768 ? (x - windowSize.w / 2) / 30 : 0;
  const parallaxY = windowSize.w > 768 ? (y - windowSize.h / 2) / 30 : 0;

  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      {/* Background Blobs (Inverse Movement) */}
      <div
         className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#e62b1e] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse transition-transform duration-100 ease-out"
         style={{ transform: `translate(${parallaxX * -2}px, ${parallaxY * -2}px)` }}
      ></div>
      <div
         className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse transition-transform duration-100 ease-out"
         style={{ animationDelay: "1s", transform: `translate(${parallaxX * -2}px, ${parallaxY * -2}px)` }}
      ></div>

      <div
        className="relative z-10 text-center p-6 will-change-transform"
        style={{
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px) translate(${parallaxX}px, ${parallaxY}px)`
        }}
      >
        <div className="inline-flex items-center gap-2 mb-8 border border-white/10 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md hover:border-[#e62b1e]/50 transition-colors">
           <span className="w-2 h-2 bg-[#e62b1e] rounded-full animate-ping"></span>
           <span className="text-[#e62b1e] font-tech tracking-widest text-xs uppercase">Transmission Live</span>
        </div>

        <div className="mb-8 flex justify-center transform hover:scale-105 transition-transform duration-500 relative h-24 md:h-32 w-64 md:w-96">
            <Image
              src="/tedx/logo-white.png"
              alt="TEDxVJCET"
              width={384}
              height={128}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm font-tech text-gray-400 mt-8">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{CONTACT.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>VJCET, EKM</span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-opacity duration-300"
        style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
      >
        <span className="text-[10px] tracking-widest uppercase text-white/60">Scroll to Initialize</span>
        <ChevronDown size={20} className="text-white animate-bounce" />
      </div>
    </div>
  );
};
