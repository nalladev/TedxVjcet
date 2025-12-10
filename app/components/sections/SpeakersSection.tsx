'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ParallaxBackground } from '@/app/components/ui/ParallaxBackground';
import { FocusedSpeakersGrid } from '@/app/components/ui/FocusedSpeakersGrid';
import { SVGGrid } from '@/app/components/ui/SVGGrid';
import { speakers } from '@/app/constants';

// {
//   id: i + 1,
//   name: `SPEAKER ${i + 1}`,
//   role: "TO BE REVEALED",
//   revealed: false,
//   description: "This speaker will be revealed soon. Stay tuned for more exciting announcements!"
// }

export const SpeakersSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSpeakers = 8;

  const revealedSpeakersCount = speakers.filter(speaker => speaker.revealed).length;

  const nextSpeaker = () => {
    setCurrentIndex((prev) => (prev + 1) % speakers.length);
  };

  const prevSpeaker = () => {
    setCurrentIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
  };

  const getCardStyle = (index: number) => {
    const position = (index - currentIndex + speakers.length) % speakers.length;

    if (position === 0) {
      // Current card - center, fully visible
      return {
        transform: 'translate(-50%, 0) scale(1)',
        opacity: 1,
        zIndex: 20
      };
    } else if (position === 1 || position === speakers.length - 1) {
      // Adjacent cards - stick out more with CSS responsive offsets
      const isNext = position === 1;
      return {
        transform: `translate(-50%, ${isNext ? 'var(--card-offset)' : 'calc(-1 * var(--card-offset))'}) scale(0.95)`,
        opacity: 0.8,
        zIndex: 10
      };
    } else {
      // Hidden cards
      return {
        transform: 'translate(-50%, 0) scale(0.9)',
        opacity: 0,
        zIndex: 0
      };
    }
  };

  return (
    <div id="speakers" className="relative z-20 bg-white text-black pt-24 md:pt-32 overflow-hidden min-h-[80vh]">
      <ParallaxBackground text="SPEAKERS" direction={1} speed={0.5} className="-top-500 md:-top-400" textColor="text-black" opacity="opacity-[0.05]" />

      <div className="z-10 max-w-7xl px-5 mx-auto mb-16 flex flex-col md:flex-row justify-between border-b-4 border-black pb-6">
         <div>
            <span className="font-tech text-sm font-bold bg-[#e62b1e] text-white px-3 py-1 mb-4 inline-block tracking-widest">CONFIRMED LINEUP</span>
            <h2 className="text-5xl md:text-8xl font-bold-display tracking-tighter uppercase">Speakers</h2>
         </div>
         <div className="text-right hidden md:block mt-auto">
            <p className="font-tech text-sm text-gray-500">{revealedSpeakersCount}/{totalSpeakers} SPEAKERS REVEALED</p>
         </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mb-16 px-3">
        <FocusedSpeakersGrid speakers={speakers} />
      </div>

      {/* Card Rotation Section - Only show if there's at least 1 speaker */}
      {revealedSpeakersCount > 0 && (
        <div id="speakers" className="relative min-h-screen w-full flex items-center justify-center px-4 py-16 bg-[#050505]">
          <SVGGrid opacity={0.4} gridSize={80} strokeWidth={0.5} dotSize={1} />
          <div className="flex w-full max-w-7xl mx-auto justify-center items-center flex-col">
            {/* Previous Button */}
            <button
              onClick={prevSpeaker}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center
                       hover:bg-gray-100 transition-colors duration-500 hover:shadow-red-500/30"
              aria-label="Previous speaker"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 text-[#28223f]">
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            </button>

            {/* Card Stack */}
            <div className="relative h-[800px] md:h-[880px] w-full max-w-5xl mx-auto my-6 flex items-center overflow-hidden [--card-offset:50px] md:[--card-offset:125px]">
              {speakers.map((speaker, index) => (
                <div
                  key={speaker.id}
                  className={`absolute w-full flex max-w-5xl mx-auto p-4  md:px-6 md:pb-0  rounded-xl transition-all duration-500 ease-in-out border border-white shadow-[0_0_18px_rgba(239,68,68,0.6)] left-1/2 bg-gradient-to-b md:bg-gradient-to-r from-black to-[#e62b1e]`}
                  style={getCardStyle(index)}
                >
                  {speaker.revealed ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[650px] md:h-[450px] lg:h-[450px] xl:h-[550px] md:items-start">
                      <div className="flex flex-col h-full overflow-hidden">
                        <div className="w-full flex-1 flex items-end justify-center overflow-hidden">
                          <Image
                            src={`/cards2/speaker${speaker.id}.png`}
                            alt={speaker.name}
                            width={400}
                            height={400}
                            style={{ width: "auto", height: "100%" }}
                            className="h-full max-w-full object-cover rounded object-bottom" />

                        </div>
                        {/*<div className="flex-row hidden md:flex font-anton">
                          <p className="text-2xl md:text-3xl text-red-600 font-medium">TEDx</p>
                          <p className="text-2xl md:text-3xl text-black font-medium">SPEAKER</p>
                        </div>*/}
                      </div>
                      <div className="flex flex-col justify-center space-y-2 h-full">
                        <div className="space-y-2 font-anton">
                          <h4 className="text-3xl md:text-6xl lg:text-7xl font-extralight" style={{ color: 'transparent', WebkitTextStroke: '2px white', textStroke: '2px white' }}>{speaker.name}</h4>
                          <h3 className="text-2xl md:text-3xl text-red-500 font-light">{speaker.role}</h3>
                        </div>
                        <p className="text-white leading-relaxed avantgarde text-xs md:text-base lg:text-lg">{speaker.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[650px] md:h-[350px] lg:h-[450px] xl:h-[550px]">
                      <div className="flex flex-col items-center justify-center space-y-6 h-full">
                        <div className="w-full max-w-md flex items-center justify-center">
                          <div className="w-48 h-48 border-4 border-[#e62b1e] rounded-full flex flex-col items-center justify-center">
                            <svg className="w-16 h-16 text-[#e62b1e] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span className="text-2xl font-bold text-[#e62b1e]">#{speaker.id}</span>
                          </div>
                        </div>
                        <div className="flex-row hidden md:flex font-anton">
                          <p className="text-4xl md:text-5xl text-red-600 font-medium">TEDx</p>
                          <p className="text-4xl md:text-5xl text-white font-medium">SPEAKER</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center space-y-4 text-white h-full">
                        <div className="space-y-4 font-anton">
                          <h4 className="text-3xl md:text-6xl lg:text-7xl font-medium" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>SPEAKER #{speaker.id}</h4>
                          <h3 className="text-2xl md:text-4xl text-red-500 font-medium">REVEALING SOON</h3>
                        </div>
                        <p className="text-white leading-relaxed avantgarde text-xs md:text-base lg:text-lg">
                          This incredible speaker will be revealed soon! Stay tuned for more exciting announcements about our amazing lineup.
                        </p>
                        <div className="mt-6">
                          <div className="inline-flex items-center px-4 py-2 bg-[#e62b1e] text-white rounded-lg">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-tech text-xs uppercase tracking-wider">Coming Soon</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSpeaker}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center
                       hover:bg-gray-100 transition-colors duration-300 hover:shadow-red-500/30"
              aria-label="Next speaker"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6 text-[#28223f]">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
