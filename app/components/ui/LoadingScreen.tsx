'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Listen for page load
      window.addEventListener('load', handleLoad);
    }

    // Cleanup event listener
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);




  return (
    <div className="fixed top-0 left-0 bg-[#050505] flex items-center justify-between flex-col h-screen w-full overflow-hidden">
      <div className='w-[100dvw] pt-10'>
        <Image
          src="/dot-grid.png"
          alt="Dot Grid"
          width={400}
          height={100}
          className='w-[200px] md:w-sm rotate-180 grayscale-30 md:-translate-x-10'
        />
      </div>
      <Image
        src="/weird_x.png"
        alt="Tedx Logo"
        width={400}
        height={100}
        className='w-[150px] md:w-[270px]'
        style={{
          animation: 'heartbeat 1.5s ease-in-out infinite, heartbeatGlow 1.5s ease-in-out infinite'
        }}
      />
      <style jsx>{`
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.1);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(1);
          }
        }
        @keyframes heartbeatGlow {
          0% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
          }
          14% {
            filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1)) drop-shadow(0 0 60px rgba(238, 41, 34, 0.8));
          }
          28% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
          }
          42% {
            filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1)) drop-shadow(0 0 60px rgba(238, 41, 34, 0.8));
          }
          70% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
          }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {isPageLoaded && (
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer"
          style={{
            animation: 'fadeIn 1s ease-out'
          }}
        >
          <div className="mb-2 text-sm text-gray-300 font-light tracking-wide">
            Scroll to explore
          </div>
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              animation: 'bounce 2s infinite'
            }}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}

      <div className='w-[100dvw] pb-10'>
        <Image
          src="/dot-grid.png"
          alt="Dot Grid"
          width={400}
          height={100}
          className='w-[200px] md:w-sm ml-auto  grayscale-30 md:translate-x-10'
        />
      </div>
    </div>
  );
};
