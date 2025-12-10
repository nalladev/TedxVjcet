'use client';

import React from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';
import { Organizer } from '@/app/types';

export const OrganizersSection = () => {
  const organizers: Organizer[] = [
    { name: "Nivin K Sunil", role: "Organizer", img: "/organizers/1.png" },
    { name: "Ms.Jesline Joseph", role: "Staff Incharge", img: "/organizers/2.png" },
    { name: "Abhijith Shaji", role: "Co-organizer", img: "/organizers/3.png" },
  ];

  return (
    <div className="bg-[#111] py-24 border-t border-white/10 relative z-30 overflow-hidden">
      <ParallaxBackground text="TEAM" direction={1} speed={0.35} opacity="opacity-[0.08]" className='-top-400 md:-top-120'/>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-6xl font-bold-display uppercase mb-4">The Team</h2>
           <div className="w-24 h-1 bg-[#e62b1e] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {organizers.map((org, i) => (
              <div key={i} className="group relative bg-[#050505] p-1 border border-white/10 hover:border-[#e62b1e] transition-colors duration-300">
                 <div className="absolute top-2 left-2 z-10 font-tech text-[10px] bg-black/50 backdrop-blur px-2 text-white border border-white/20">
                    PLAYER_0{i+1}
                 </div>
                 <div className="aspect-square overflow-hidden mb-4 relative">
                    <Image
                      src={org.img}
                      alt={org.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-size-[100%_4px,3px_100%] pointer-events-none"></div>
                 </div>
                 <div className="p-4 text-center">
                    <h3 className="text-xl font-bold uppercase tracking-wider">{org.name}</h3>
                    <p className="text-[#e62b1e] font-tech text-xs mt-1">{org.role}</p>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};
