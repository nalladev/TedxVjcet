
import React from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';

const SponsorStripContent = () => (
  <div className="flex items-center space-x-12 px-6">
    {/* Tier 1 */}
    <h3 className="text-2xl font-bold-display text-red-500 uppercase flex-shrink-0">Title Sponsor</h3>
    <a href="https://santamonicaedu.in/" target="_blank" rel="noopener noreferrer" className="h-24 w-48 flex-shrink-0 transition-transform duration-300 hover:scale-110">
      <div className="h-full w-full relative bg-white rounded-md p-2">
        <Image src="/sponsors/curated/santamonica.png" alt="Santa Monica Study Abroad" layout="fill" objectFit="contain" />
      </div>
    </a>
    
    <div className="w-px h-16 bg-white/20"></div>

    {/* Tier 2 */}
    <h3 className="text-2xl font-bold-display text-red-500 uppercase flex-shrink-0">Bronze Sponsors</h3>
    <a href="https://joanceregency.com/" target="_blank" rel="noopener noreferrer" className="h-20 w-40 flex-shrink-0 transition-transform duration-300 hover:scale-110">
      <div className="h-full w-full relative bg-white rounded-md p-2">
        <Image src="/sponsors/curated/joance.png" alt="Joance Regency" layout="fill" objectFit="contain" />
      </div>
    </a>
    <a href="https://www.digiora.com/" target="_blank" rel="noopener noreferrer" className="h-20 w-40 flex-shrink-0 transition-transform duration-300 hover:scale-110">
      <div className="h-full w-full relative bg-white rounded-md p-2">
        <Image src="/sponsors/curated/digiora.png" alt="Digiora" layout="fill" objectFit="contain" />
      </div>
    </a>

    <div className="w-px h-16 bg-white/20"></div>

    {/* Tier 3 */}
    <h3 className="text-2xl font-bold-display text-red-500 uppercase flex-shrink-0">In-Kind Sponsors</h3>
    <a href="#" className="h-20 w-40 flex-shrink-0 transition-transform duration-300 hover:scale-110">
      <div className="h-full w-full relative bg-white rounded-md p-2">
        <Image src="/sponsors/curated/ohco-a.png" alt="OHCO Chocolate" layout="fill" objectFit="contain" />
      </div>
    </a>
    <a href="https://www.kottaramsweets.com/" target="_blank" rel="noopener noreferrer" className="h-20 w-40 flex-shrink-0 transition-transform duration-300 hover:scale-110">
      <div className="h-full w-full relative bg-white rounded-md p-2">
        <Image src="/sponsors/curated/kottaram-a.png" alt="Kottaram Sweet House" layout="fill" objectFit="contain" />
      </div>
    </a>
  </div>
);


const SponsorsSection = () => {
  return (
    <div
      id="sponsors"
      className="relative z-30 bg-black text-white py-20 shadow-[0_-50px_100px_rgba(0,0,0,1)] border-t border-white/5 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1b1b1b 0%, #050505 100%)' }}
    >
      <ParallaxBackground text="SPONSORS" direction={-1} speed={0.3} opacity="opacity-[0.08]" />
      <div className="container mx-auto relative z-10 space-y-16">
        <h2 className="text-4xl md:text-7xl font-bold-display text-center uppercase">
          Our <span className="text-[#e62b1e]">Sponsors</span>
        </h2>
        
        <div className="relative group w-full overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-scroll group-hover:paused">
            <SponsorStripContent />
          </div>
          <div className="inline-block animate-scroll group-hover:paused" aria-hidden="true">
            <SponsorStripContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
