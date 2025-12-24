
import React from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';

// In-file component for the sponsor card
interface SponsorCardProps {
  name: string;
  website: string;
  image: string;
  isTitle?: boolean;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ name, website, image, isTitle = false }) => {
  const cardSize = isTitle ? "md:w-96" : "w-80";
  const imageContainerSize = isTitle ? "w-48 h-48" : "w-40 h-40";
  const imageSize = isTitle ? 180 : 150;

  return (
    <div
      className={`${cardSize} flex flex-col items-center text-center p-6 bg-white/5 rounded-lg border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-red-600/50 hover:bg-white/10`}
    >
      <a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className={`${imageContainerSize} rounded-full bg-white flex items-center justify-center mb-6 transition-transform duration-300 transform hover:scale-110`}
      >
        <Image
          src={image}
          alt={`${name} logo`}
          width={imageSize}
          height={imageSize}
          className="object-contain rounded-full p-2"
        />
      </a>
      <div className="font-tech">
        <p className="text-xl text-white">{name}</p>
      </div>
    </div>
  );
};

const SponsorsSection = () => {
  return (
    <div
      id="sponsors"
      className="relative z-30 bg-black text-white py-20 px-4 md:px-8 shadow-[0_-50px_100px_rgba(0,0,0,1)] border-t border-white/5 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1b1b1b 0%, #050505 100%)' }}
    >
      <ParallaxBackground text="SPONSORS" direction={-1} speed={0.3} opacity="opacity-[0.08]" />
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-7xl font-bold-display text-center mb-16 uppercase">
          Our <span className="text-[#e62b1e]">Sponsors</span>
        </h2>

        {/* Title Sponsor Tier */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold-display text-center text-red-500 mb-10">TITLE SPONSOR</h3>
          <div className="flex justify-center">
            <SponsorCard
              name="Santa Monica Study Abroad"
              website="https://santamonicaedu.in/"
              image="/sponsors/curated/santamonica.png"
              isTitle={true}
            />
          </div>
        </div>

        {/* Bronze Sponsors Tier */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold-display text-center text-red-500 mb-10">BRONZE SPONSORS</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <SponsorCard
              name="Joance Regency"
              website="https://joanceregency.com/"
              image="/sponsors/curated/joance.png"
            />
            <SponsorCard
              name="Digiora"
              website="https://www.digiora.com/"
              image="/sponsors/curated/digiora.png"
            />
          </div>
        </div>

        {/* In-Kind Sponsors Tier */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold-display text-center text-red-500 mb-10">IN-KIND SPONSORS</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <SponsorCard
              name="OHCO Chocolate"
              website="#"
              image="/sponsors/curated/ohco-a.png"
            />
            <SponsorCard
              name="Kottaram Sweet House"
              website="https://www.kottaramsweets.com/"
              image="/sponsors/curated/kottaram-a.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
