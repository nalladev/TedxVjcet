'use client';

import React from 'react';
import { ArrowRight, Ticket } from 'lucide-react';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';
import { EVENT_DATE } from '@/app/constants';

export const RegistrationSection = () => {
  return (
    <div id="registration" className="relative z-30 bg-[#e62b1e] text-white min-h-[90vh] flex flex-col items-center justify-center text-center p-6 overflow-hidden">
       {/* Restored customized background text settings from user */}
       <ParallaxBackground text="TICKETS" direction={-1} speed={0.3} opacity="opacity-[0.1]" className="z-0 -top-50" />

       <div className="max-w-4xl space-y-10 relative z-10">
         <div className="inline-block bg-white text-[#e62b1e] px-6 py-2 font-tech text-sm uppercase tracking-[0.2em] mb-10 border border-white/20 shadow-lg animate-pulse">
            Status: Registration Open
         </div>
         <h2 className="text-6xl md:text-9xl font-bold-display leading-[0.9] tracking-tighter hover:scale-105 transition-transform duration-500 cursor-default">
           SECURE YOUR<br/>SEAT
         </h2>
         <p className="font-sans text-xl md:text-3xl opacity-90 max-w-2xl mx-auto font-light">
           Event Date: <span className="font-bold underline decoration-4 decoration-black underline-offset-4">{EVENT_DATE.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>. <br/>Don&apos;t miss the future.
         </p>
         <div className="pt-8">
            <a href="https://www.ted.com/tedx/events/64560" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden bg-black text-white px-20 py-8 text-2xl font-bold hover:bg-white hover:text-[#e62b1e] transition-all duration-300 items-center gap-4 mx-auto group shadow-2xl inline-flex rounded-sm ring-4 ring-transparent hover:ring-black/20">
               <span className="relative z-10 flex items-center gap-3">
                 <Ticket size={32} />
                 BOOK TICKETS
                 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </span>
            </a>
         </div>
       </div>
    </div>
  );
};
