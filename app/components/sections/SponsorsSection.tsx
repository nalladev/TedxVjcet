
import React from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';

// Card for an individual sponsor, designed to be used within the carousel
interface SponsorCardProps {
  name: string;
  website: string;
  image: string;
}
const SponsorCard: React.FC<SponsorCardProps> = ({ name, website, image }) => {
  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center justify-center text-center p-4 bg-white/5 rounded-lg border border-white/10 w-full h-full transform transition-transform duration-300 hover:scale-105"
    >
      <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-4">
        <Image src={image} alt={name} width={240} height={240} className="object-contain rounded-full p-2" priority />
      </div>
      <p className="md:text-lg text-white font-tech">{name}</p>
    </a>
  );
};

// The 3D carousel component
const SponsorsCarousel = () => {
  const sponsorsData = [
    { name: 'Santa Monica Study Abroad', website: 'https://santamonicaedu.in/', image: '/sponsors/curated/santamonica.png' },
    { name: 'Joance Regency', website: 'https://joanceregency.com/', image: '/sponsors/curated/joance.png' },
    { name: 'Digiora', website: 'https://www.digiora.com/', image: '/sponsors/curated/digiora.png' },
    { name: 'OHCO Chocolate', website: '#', image: '/sponsors/curated/ohco-a.png' },
    { name: 'Kottaram Sweet House', website: 'https://www.kottaramsweets.com/', image: '/sponsors/curated/kottaram-a.png' },
  ];
  const numElements = sponsorsData.length;

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        style={
          {
            '--_num-elements': numElements,
          } as React.CSSProperties
        }
      >
        <ul className="item-wrapper">
          {sponsorsData.map((sponsor, index) => (
            <li
              key={index}
              className="item"
              style={
                {
                  '--_index': index + 1,
                } as React.CSSProperties
              }
            >
              <SponsorCard {...sponsor} />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .carousel-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70vh;
          width: 100%;
        }

        .carousel {
          --carousel-transition-duration: 250ms;
          --carousel-transition-ease: ease-out;
          --carousel-item-width: 18rem;
          --carousel-item-height: 22rem;
          --carousel-diameter: 40rem;
          --carousel-3d-perspective: 1000px;
          --carousel-3d-perspective-origin: 50% 20%;
          --carousel-animation-duration: 40s;
          --carousel-animation-play-state: running;

          --_diameter: var(--carousel-diameter);
          --_radius: calc(var(--_diameter) / 2);
          --_item-width: var(--carousel-item-width);
          --_item-height: var(--carousel-item-height);
          perspective: var(--carousel-3d-perspective);
          perspective-origin: var(--carousel-3d-perspective-origin);
          width: var(--_diameter);
          height: var(--_diameter);
          position: relative;
        }

        @media only screen and (max-width: 48rem) {
          .carousel-container {
            height: 40vh;
          }
          .carousel {
            --_diameter: calc(var(--carousel-diameter) * 0.6);
            --_item-width: calc(var(--carousel-item-width) * 0.6);
            --_item-height: calc(var(--carousel-item-height) * 0.6);
          }
        }

        .item-wrapper {
          --_z: calc(var(--_radius) * -1);
          transform: translateZ(var(--_z));
          transform-style: preserve-3d;
          width: inherit;
          height: inherit;
          list-style-type: none;
          position: relative;
          animation: carousel-rotation-normal var(--carousel-animation-duration) normal linear infinite
            var(--carousel-animation-play-state);
          transition: all var(--carousel-transition-duration) var(--carousel-transition-ease);
        }

        .item-wrapper:hover {
          --carousel-animation-play-state: paused;
        }

        .item {
          --_width: var(--_item-width);
          --_height: var(--_item-height);
          --_rotation: calc(360 / var(--_num-elements) * var(--_index) * 1deg);
          left: calc(var(--_radius) - var(--_item-width) / 2);
          top: calc(var(--_radius) - var(--_item-height) / 2);
          transform: rotateY(var(--_rotation)) translateZ(var(--_radius));
          transform-style: inherit;
          width: var(--_width);
          height: var(--_height);
          transition: all var(--carousel-transition-duration) var(--carousel-transition-ease);
          position: absolute;
        }
      `}</style>
      <style jsx global>{`
        @keyframes carousel-rotation-normal {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>
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

        <SponsorsCarousel />
      </div>
    </div>
  );
};

export default SponsorsSection;
