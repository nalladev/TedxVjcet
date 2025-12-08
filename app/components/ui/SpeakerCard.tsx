'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { SpeakerCardProps } from '@/app/types';

export const SpeakerCard = ({ speaker, index }: SpeakerCardProps) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Check if this is a placeholder speaker (no real data)
  const isPlaceholder = speaker.name.startsWith('SPEAKER') || speaker.role === 'TO BE REVEALED';
  
  if (isPlaceholder) {
    return (
      <div
        ref={ref}
        className={`group relative aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <div className="w-20 h-20 border-4 border-[#e62b1e] rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-[#e62b1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold-display uppercase leading-none mb-2 text-center">SPEAKER</h3>
          <p className="font-tech text-xs text-gray-300 uppercase tracking-widest text-center">REVEALING SOON</p>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e62b1e]/50 transition-colors duration-300 pointer-events-none m-2"></div>
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-[#e62b1e] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{index + 1}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Image
        src={speaker.img}
        alt={speaker.name}
        width={300}
        height={400}
        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
         <div className="w-10 h-1 bg-[#e62b1e] mb-4 w-0 group-hover:w-10 transition-all duration-300"></div>
         <h3 className="text-2xl font-bold-display uppercase leading-none mb-1">{speaker.name}</h3>
         <p className="font-tech text-xs text-gray-300 uppercase tracking-widest">{speaker.role}</p>
      </div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e62b1e] transition-colors duration-300 pointer-events-none m-2"></div>
    </div>
  );
};