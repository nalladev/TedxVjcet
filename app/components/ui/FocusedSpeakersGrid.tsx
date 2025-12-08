'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Speaker } from '@/app/types';

interface FocusedSpeakersGridProps {
  speakers: Speaker[];
}

export const FocusedSpeakersGrid = ({ speakers }: FocusedSpeakersGridProps) => {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleCardFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const isPlaceholder = (speaker: Speaker) => {
    return speaker.name.startsWith('SPEAKER') || speaker.role === 'TO BE REVEALED';
  };

  return (
    <div className="relative w-full">
      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:flex justify-center items-center space-x-2 lg:space-x-4 p-4 overflow-hidden">
        {speakers.map((speaker, index) => {
          const isFocused = index === focusedIndex;
          const isPlaceholderCard = isPlaceholder(speaker);

          return (
            <div
              key={speaker.id}
              className={`relative cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
                isFocused
                  ? 'w-80 h-96 z-20 scale-[1.02]'
                  : 'w-20 h-96 z-10 hover:w-24'
              }`}
              onMouseEnter={() => handleCardFocus(index)}
            >
              <div
                className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  isFocused ? 'shadow-2xl shadow-red-500/20' : 'shadow-lg'
                }`}
              >
                {isPlaceholderCard ? (
                  // Placeholder card
                  <div className={`w-full h-full bg-[#161616] flex flex-col items-center justify-center transition-all duration-500 ${
                    !isFocused ? 'grayscale brightness-50' : ''
                  }`}>
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 border-4 border-[#e62b1e] rounded-full flex items-center justify-center mb-4 shadow-lg shadow-red-500/50">
                        <svg className="w-8 h-8 text-[#e62b1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      {isFocused && (
                        <div className="text-center">
                          <p className="text-white font-bold text-sm mb-1">SPEAKER #{speaker.id}</p>
                          <p className="text-[#e62b1e] text-xs uppercase tracking-wider">Revealing Soon</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Real speaker card
                  <>
                    <Image
                      src={speaker.img}
                      alt={speaker.name}
                      width={400}
                      height={600}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        !isFocused ? 'grayscale brightness-75 scale-110' : 'grayscale-0 scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </>
                )}

                {/* Speaker name overlay */}
                {!isPlaceholderCard && (
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white">
                    {isFocused && (
                      <>
                        <div className="w-8 h-1 bg-[#e62b1e] mb-2 shadow-sm shadow-red-500/50"></div>
                        <h3 className="text-xl lg:text-2xl font-bold-display uppercase leading-tight">
                          {speaker.name}
                        </h3>
                        <p className="font-tech text-xs text-gray-300 uppercase tracking-widest mt-1">
                          {speaker.role}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Layout - Vertical */}
      <div className="md:hidden flex flex-col space-y-2 p-4">
        {speakers.map((speaker, index) => {
          const isFocused = index === focusedIndex;
          const isPlaceholderCard = isPlaceholder(speaker);

          return (
            <div
              key={speaker.id}
              className={`relative cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
                isFocused
                  ? 'h-80 z-20 scale-[1.02]'
                  : 'h-20 z-10 hover:h-24'
              }`}
              onClick={() => handleCardFocus(index)}
            >
              <div
                className={`relative w-full h-full rounded-lg overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  isFocused ? 'shadow-2xl shadow-red-500/20' : 'shadow-lg'
                }`}
              >
                {isPlaceholderCard ? (
                  // Placeholder card
                  <div className={`w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-between px-4 transition-all duration-500 ${
                    !isFocused ? 'grayscale brightness-50' : ''
                  }`}>
                    <div className="flex items-center">
                      <div className={`border-4 border-[#e62b1e] rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 ${
                        isFocused ? 'w-16 h-16' : 'w-12 h-12'
                      }`}>
                        <svg className={`text-[#e62b1e] ${
                          isFocused ? 'w-8 h-8' : 'w-6 h-6'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className={`text-white font-bold mb-1 ${
                          isFocused ? 'text-lg' : 'text-sm'
                        }`}>SPEAKER #{speaker.id}</p>
                        <p className={`text-[#e62b1e] uppercase tracking-wider ${
                          isFocused ? 'text-sm' : 'text-xs'
                        }`}>Revealing Soon</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Real speaker card
                  <div className="relative w-full h-full flex">
                    {/* Image container - maintains size */}
                    <div className="absolute inset-0">
                      <Image
                        src={speaker.img}
                        alt={speaker.name}
                        width={400}
                        height={320}
                        className={`w-full h-80 object-cover transition-all duration-500 ${
                          !isFocused ? 'grayscale brightness-75' : 'grayscale-0'
                        }`}
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent"></div>
                    </div>

                    {/* Content overlay */}
                    <div className={`relative z-10 flex w-full px-4 ${
                      isFocused ? 'items-end pb-4' : 'items-center'
                    }`}>
                      <div className="text-white">
                        <div className={`w-8 h-1 bg-[#e62b1e] mb-2 shadow-sm shadow-red-500/50 transition-all duration-300 ${
                          !isFocused ? 'w-4' : 'w-8'
                        }`}></div>
                        <h3 className={`font-bold-display uppercase leading-tight transition-all duration-500 ${
                          isFocused ? 'text-2xl' : 'text-base'
                        }`}>
                          {speaker.name}
                        </h3>
                        <p className={`font-tech text-gray-300 uppercase tracking-widest mt-1 transition-all duration-500 ${
                          isFocused ? 'text-xs opacity-100' : 'text-xs opacity-80'
                        }`}>
                          {speaker.role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
