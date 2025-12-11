'use client';

import React from 'react';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';
// import { FeatureCard } from '@/app/components/ui/FeatureCard';

export const AboutSection = () => {
  return (
    <div id="about" className="relative z-10 bg-[#050505] py-20 shadow-[0_-50px_100px_rgba(0,0,0,1)] overflow-hidden border-t border-white/5">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/bg-video-2.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 z-5"></div>

      <ParallaxBackground text="IDEAS" direction={-1} speed={0.3} opacity="opacity-[0.08]" />

      <div className="sticky top-0 flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-20">
          <div className="space-y-8">
             <div className="overflow-hidden">
                <h2 className="text-4xl md:text-7xl font-bold-display uppercase leading-[0.9] animate-slide-up">
                  What is <br/><span className="text-[#e62b1e]">TEDx?</span>
                </h2>
             </div>
             <p className="font-tech text-gray-400 text-sm md:text-base border-l-2 border-[#e62b1e] pl-6 max-w-md">
               In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
             </p>
          </div>

          {/*<div className="grid gap-6">
            <FeatureCard number="01" title="EVOLVE THINKING" desc="Engage with keynotes from industry experts that challenge the status quo." />
            <FeatureCard number="02" title="EXPAND TOOLBOX" desc="Hands-on workshops designed to give you practical, actionable skills." />
            <FeatureCard number="03" title="ELEVATE CAREER" desc="Network with visionaries and find your next big breakthrough." />
          </div>*/}
        </div>
      </div>
    </div>
  );
};
