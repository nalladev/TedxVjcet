
import React from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';

interface BrandLogoProps {
  href: string;
  imageSrc: string;
  altText: string;
  heightClass: string;
  widthClass: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ href, imageSrc, altText, heightClass, widthClass }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${heightClass} ${widthClass} flex-shrink-0 transition-transform duration-300 hover:scale-110`}>
      <div className="h-full w-full relative bg-white rounded-lg p-3">
        <Image src={imageSrc} alt={altText} layout="fill" objectFit="contain" />
      </div>
    </a>
  );
};

const SponsorStripContent = () => (
  <div className="flex items-center space-x-16 px-8">
    {/* Tier 1 */}
    <h3 className="text-3xl font-bold-display text-red-500 uppercase flex-shrink-0">Title Sponsor</h3>
    <BrandLogo
      href="https://santamonicaedu.in/"
      imageSrc="/sponsors/curated/santamonica.png"
      altText="Santa Monica Study Abroad"
      heightClass="h-32"
      widthClass="w-64"
    />
    
    <div className="w-px h-24 bg-white/20"></div>

    {/* Tier 2 */}
    <h3 className="text-3xl font-bold-display text-red-500 uppercase flex-shrink-0">Bronze Sponsors</h3>
    <BrandLogo
      href="https://joanceregency.com/"
      imageSrc="/sponsors/curated/joance.png"
      altText="Joance Regency"
      heightClass="h-24"
      widthClass="w-48"
    />
    <BrandLogo
      href="https://www.digiora.com/"
      imageSrc="/sponsors/curated/digiora.png"
      altText="Digiora"
      heightClass="h-24"
      widthClass="w-48"
    />

    <div className="w-px h-24 bg-white/20"></div>

    {/* Tier 3 */}
    <h3 className="text-3xl font-bold-display text-red-500 uppercase flex-shrink-0">In-Kind Sponsors</h3>
    <BrandLogo
      href="#"
      imageSrc="/sponsors/curated/ohco-a.png"
      altText="OHCO Chocolate"
      heightClass="h-24"
      widthClass="w-48"
    />
    <BrandLogo
      href="https://www.kottaramsweets.com/"
      imageSrc="/sponsors/curated/kottaram-a.png"
      altText="Kottaram Sweet House"
      heightClass="h-24"
      widthClass="w-48"
    />
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
