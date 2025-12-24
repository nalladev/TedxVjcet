
import React from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';

const sponsors = [
  {
    name: 'Santa Monica Study Abroad Pvt. Ltd.',
    website: 'https://santamonicaedu.in/',
    sponsorship: 'Title Sponsor',
    image: '/sponsors/curated/santamonica.png',
  },
  {
    name: 'OHCO Chocolate',
    sponsorship: 'In-Kind Sponsor (15k)',
    image: '/sponsors/curated/ohco-a.png',
  },
  {
    name: 'Kottaram Sweet House',
    website: 'https://www.kottaramsweets.com/',
    sponsorship: 'In-Kind Sponsor',
    image: '/sponsors/curated/kottaram-a.png',
  },
  {
    name: 'Joance Regency',
    website: 'https://joanceregency.com/',
    sponsorship: 'Bronze Sponsor (10k)',
    image: '/sponsors/curated/joance.png',
  },
  {
    name: 'Digiora',
    website: 'https://www.digiora.com/',
    sponsorship: 'Bronze Sponsor (10k)',
    image: '/sponsors/curated/digiora.png',
  },
];

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
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="w-80 flex flex-col items-center text-center p-6 bg-white/5 rounded-lg border border-white/10 transform transition-all duration-300 hover:scale-105 hover:border-red-600/50 hover:bg-white/10"
            >
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-40 h-40 rounded-full bg-white flex items-center justify-center mb-6 transition-transform duration-300 transform hover:scale-110"
              >
                <Image
                  src={sponsor.image}
                  alt={`${sponsor.name} logo`}
                  width={150}
                  height={150}
                  className="object-contain rounded-full p-2"
                />
              </a>
              <div className="font-tech">
                <p className="text-xl text-white">{sponsor.name}</p>
                <p className="text-red-500 mt-1">{sponsor.sponsorship}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsSection;
