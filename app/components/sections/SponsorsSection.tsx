
import React from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';
import { SPONSORS_DATA } from '@/app/constants';

// Card for an individual sponsor in the grid
interface SponsorGridCardProps {
  name: string;
  website: string;
  image: string;
  isTitle?: boolean;
}
const SponsorGridCard: React.FC<SponsorGridCardProps> = ({ name, website, image, isTitle = false }) => {
  const cardSize = isTitle ? 'w-80' : 'w-72';
  const imageContainerSize = isTitle ? 'w-40 h-40' : 'w-36 h-36';
  const imageSize = isTitle ? 250 : 200;

  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardSize} flex flex-col items-center text-center p-2 md:p-4 bg-white/5 rounded-lg border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-red-600/50`}
    >
      <div className={`${imageContainerSize} rounded-full bg-white flex items-center justify-center mb-2 md:mb-4`}>
        <Image src={image} alt={name} width={imageSize} height={imageSize} className="object-contain rounded-full p-2" />
      </div>
      <p className="text-base md:text-lg text-white font-tech">{name}</p>
    </a>
  );
};


// A full section for a tier, containing a title and a grid of sponsors
interface TierSectionProps {
  title: string;
  sponsors: SponsorGridCardProps[];
}
const TierSection: React.FC<TierSectionProps> = ({ title, sponsors }) => (
  <div className="h-full shrink-0 flex flex-col items-center justify-start p-8 space-y-8 border-r-2 border-white/10" style={{ width: 'max-content', minWidth: '45vw' }}>
    <h3 className="text-3xl font-bold-display text-red-500 uppercase">{title}</h3>
    <div className="flex flex-wrap justify-center gap-8">
      {sponsors.map((sponsor, index) => (
        <SponsorGridCard key={index} {...sponsor} />
      ))}
    </div>
  </div>
);


// The content of the entire scrolling strip, composed of multiple TierSections
const SponsorStripContent = () => {
  return (
    <div className="flex items-stretch">
      <TierSection title="Title Sponsor" sponsors={SPONSORS_DATA.title} />
      <TierSection title="Bronze Sponsors" sponsors={SPONSORS_DATA.bronze} />
      <TierSection title="In-Kind Sponsors" sponsors={SPONSORS_DATA.inKind} />
    </div>
  );
};


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

        <div className="relative scroller-container w-full overflow-hidden whitespace-nowrap scroller-fade-mask">
          <div className="inline-block animate-scroll">
            <SponsorStripContent />
          </div>
          <div className="inline-block animate-scroll" aria-hidden="true">
            <SponsorStripContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
