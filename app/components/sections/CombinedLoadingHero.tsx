'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMousePosition } from '@/app/hooks/useMousePosition';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * CombinedLoadingHero Component
 *
 * A sophisticated scroll-driven animation sequence featuring:
 * 1. Loading screen stays completely FIXED
 * 2. Gradient wipe transition (black rectangle with top/bottom fade)
 * 3. Floating X SVG that moves from center to TEDx logo position
 * 4. TEDx logo section that zooms out from extreme scale
 * 5. TEDx part slides left while VJCET part reveals from right
 */

// SVG X Component (extracted from TedxLogo)
const XSvg = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="234.1 66.6 34.4 39.8"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      d="M234.1,106.4L228,96.3l-5.9,10.1h-14.6L221.3,86L208,66.6h14.6l5.4,9.6l5.5-9.6h14.6L234.8,86l13.8,20.3H234.1z"
      fill="#EE2922"
    />
  </svg>
);

// TEDx Part Component
const TedxPart = React.forwardRef<SVGGElement, { className?: string }>((props, ref) => (
  <svg
    viewBox="0 0 803 319"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <g ref={ref}>
      <path d="M679 243L721.264 180.622L680.597 121H723.462L740.748 151.92L758.532 121H801.39L760.736 180.62L803 242.998L760.108 243L740.748 210.775L721.867 243H679Z" fill="#EB0028"/>
      <path d="M481 319L481.002 121H581.472C612.087 121 635.489 131.282 651.025 151.566C667.535 173.109 671 200.513 671 219.707C671 250.863 662.667 275.243 646.235 292.166C628.943 309.972 603.096 319 569.406 319H481ZM540.905 269.659H566.022C605.241 269.659 611.097 237.821 611.097 218.851C611.097 173.845 573.152 170.343 561.522 170.343H540.905V269.659Z" fill="#EB0028"/>
      <path d="M303 319V121H470V171H363V197H470V243H363V269H470V319H303Z" fill="#EB0028"/>
      <path d="M176 319V171H121V121H293V171H237V319H176Z" fill="#EB0028"/>
    </g>
  </svg>
));
TedxPart.displayName = 'TedxPart';

// VJCET Part Component
const VjcetPart = React.forwardRef<SVGGElement, { className?: string }>((props, ref) => (
  <svg
    viewBox="854.434 124.638 825.766 205.997"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <g ref={ref}>
      <path d="M872.879 127.273L933.106 297.132H934.8L995.027 127.273H1013.47L943.364 320H924.543L854.434 127.273H872.879ZM1101.86 127.273H1119.46V266.266C1119.39 278.813 1117.13 289.29 1112.68 297.697C1108.23 306.041 1102.08 312.283 1094.24 316.424C1086.39 320.565 1077.39 322.635 1067.23 322.635C1057.25 322.635 1048.34 320.784 1040.5 317.083C1032.66 313.381 1026.48 308.174 1021.96 301.461C1017.51 294.748 1015.28 286.875 1015.28 277.841H1032.6C1032.6 283.55 1034.1 288.6 1037.11 292.992C1040.13 297.321 1044.23 300.708 1049.44 303.155C1054.71 305.602 1060.64 306.825 1067.23 306.825C1074.07 306.825 1080.06 305.382 1085.2 302.496C1090.41 299.611 1094.49 295.188 1097.44 289.228C1100.38 283.205 1101.86 275.551 1101.86 266.266V127.273ZM1329.54 187.5H1311.85C1310.53 180.913 1308.15 174.827 1304.7 169.244C1301.31 163.597 1297.05 158.672 1291.9 154.469C1286.76 150.266 1280.92 147.003 1274.4 144.682C1267.87 142.361 1260.82 141.2 1253.22 141.2C1241.05 141.2 1229.95 144.368 1219.91 150.705C1209.94 157.041 1201.94 166.358 1195.91 178.654C1189.95 190.888 1186.97 205.882 1186.97 223.636C1186.97 241.516 1189.95 256.573 1195.91 268.807C1201.94 281.04 1209.94 290.326 1219.91 296.662C1229.95 302.936 1241.05 306.072 1253.22 306.072C1260.82 306.072 1267.87 304.912 1274.4 302.591C1280.92 300.269 1286.76 297.038 1291.9 292.898C1297.05 288.694 1301.31 283.77 1304.7 278.123C1308.15 272.477 1310.53 266.36 1311.85 259.773H1329.54C1327.98 268.619 1325.03 276.868 1320.7 284.522C1316.43 292.114 1310.97 298.764 1304.32 304.473C1297.74 310.182 1290.15 314.636 1281.55 317.836C1272.96 321.035 1263.51 322.635 1253.22 322.635C1237.04 322.635 1222.67 318.588 1210.12 310.495C1197.58 302.34 1187.73 290.859 1180.58 276.053C1173.49 261.247 1169.94 243.775 1169.94 223.636C1169.94 203.498 1173.49 186.026 1180.58 171.22C1187.73 156.414 1197.58 144.964 1210.12 136.871C1222.67 128.716 1237.04 124.638 1253.22 124.638C1263.51 124.638 1272.96 126.238 1281.55 129.437C1290.15 132.574 1297.74 137.028 1304.32 142.8C1310.97 148.509 1316.43 155.159 1320.7 162.75C1325.03 170.342 1327.98 178.591 1329.54 187.5ZM1378.83 320V127.273H1490.63V143.082H1396.43V215.637H1484.7V231.447H1396.43V304.19H1492.51V320H1378.83ZM1532.45 143.082V127.273H1672.2V143.082H1611.13V320H1593.53V143.082H1532.45Z" fill="white"/>
    </g>
  </svg>
));
VjcetPart.displayName = 'VjcetPart';

export const CombinedLoadingHero = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const { x, y } = useMousePosition();
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return { w: window.innerWidth, h: window.innerHeight };
    }
    return { w: 0, h: 0 };
  });

  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const transitionWipeRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const floatingXRef = useRef<HTMLDivElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const tedxContainerRef = useRef<HTMLDivElement>(null);
  const vjcetContainerRef = useRef<HTMLDivElement>(null);
  const tedxPartRef = useRef<SVGGElement>(null);
  const vjcetPartRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPageLoaded || !containerRef.current || typeof window === 'undefined') return;

    // Initialize animations after components are mounted
    const initializeAnimations = () => {
      try {
        // Ensure all refs are available
        if (!loadingScreenRef.current || !transitionWipeRef.current || !heroImageRef.current ||
            !floatingXRef.current || !logoSectionRef.current || !tedxContainerRef.current || !vjcetContainerRef.current) {
          console.warn('Some animation refs are not ready yet');
          return;
        }

        // Kill any existing animations to prevent conflicts
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Create main scroll timeline with smooth scrubbing
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5, // Smooth scrubbing
            refreshPriority: -1,
            invalidateOnRefresh: true,
          }
        });

        // ===== ANIMATION SEQUENCE =====

        // PHASE 1: Gradient wipe transition moves up (0-25% scroll)
        // Loading screen stays FIXED, transition wipe moves up revealing hero image
        mainTimeline.fromTo(transitionWipeRef.current,
          {
            y: "0vh" // Start covering the screen
          },
          {
            y: "-120vh", // Move up to reveal hero image underneath
            duration: 2,
            ease: "power2.inOut"
          }, 0);

        // PHASE 2: Floating X appears and moves (20-50% scroll)
        mainTimeline.fromTo(floatingXRef.current,
          {
            x: "0vw",
            y: "0vh",
            scale: 4,
            opacity: 0
          },
          {
            x: "0vw",
            y: "0vh",
            scale: 3,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out"
          }, 1.2);

        // PHASE 3: Floating X moves toward TEDx position (30-60% scroll)
        mainTimeline.to(floatingXRef.current,
          {
            x: "15vw", // Move towards TEDx X position
            y: "-10vh",
            scale: 0.5,
            rotation: 360, // Add rotation for visual interest
            duration: 1.5,
            ease: "power2.inOut"
          }, 1.8);

        // PHASE 4: Logo section zooms out dramatically (50-75% scroll)
        mainTimeline.fromTo(logoSectionRef.current,
          {
            scale: 12,
            opacity: 0,
            rotation: -5
          },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 2,
            ease: "power3.out"
          }, 2.5);

        // PHASE 5: Floating X disappears as logo X takes its place (65% scroll)
        mainTimeline.to(floatingXRef.current, {
          opacity: 0,
          scale: 0.2,
          duration: 0.5,
          ease: "power2.in"
        }, 3.2);

        // PHASE 6: TEDx logo slides left with overshoot (70-85% scroll)
        mainTimeline.to(tedxContainerRef.current, {
          x: "-35%",
          duration: 1.2,
          ease: "back.out(1.7)"
        }, 3.5);

        // PHASE 7: VJCET reveals from right (75-95% scroll)
        mainTimeline.fromTo(vjcetContainerRef.current,
          {
            x: "150%",
            opacity: 0,
            scale: 0.7,
            rotation: 10
          },
          {
            x: "5%", // Slight overlap for visual cohesion
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "power3.out"
          }, 3.8);

        // PHASE 8: Final position adjustment (90-100% scroll)
        mainTimeline.to(vjcetContainerRef.current, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, 4.8);

        // ===== SECTION PINNING =====

        // Pin loading screen (stays completely fixed)
        ScrollTrigger.create({
          trigger: loadingScreenRef.current,
          start: "top top",
          end: "+=150vh",
          pin: true,
          pinSpacing: false,
          id: "loading-pin"
        });

        // Pin hero image during animations
        ScrollTrigger.create({
          trigger: heroImageRef.current,
          start: "top top",
          end: "+=300vh",
          pin: true,
          pinSpacing: false,
          id: "hero-pin"
        });

        // Pin logo section during final animations
        ScrollTrigger.create({
          trigger: logoSectionRef.current,
          start: "top top",
          end: "+=200vh",
          pin: true,
          pinSpacing: false,
          id: "logo-pin"
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

      } catch (error) {
        console.error('Error initializing GSAP animations:', error);
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(initializeAnimations, 200);

    return () => {
      clearTimeout(timer);
      try {
        // Clean up all ScrollTrigger instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Kill any remaining tweens
        gsap.killTweensOf([
          loadingScreenRef.current,
          transitionWipeRef.current,
          heroImageRef.current,
          floatingXRef.current,
          logoSectionRef.current,
          tedxContainerRef.current,
          vjcetContainerRef.current,
        ]);

        // Clear timeline
        gsap.globalTimeline.clear();
      } catch (error) {
        console.error('Error cleaning up animations:', error);
      }
    };
  }, [isPageLoaded]);

  // Enhanced Mouse Parallax (disabled on screens smaller than 768px)
  const parallaxX = windowSize.w > 768 ? (x - windowSize.w / 2) / 30 : 0;
  const parallaxY = windowSize.w > 768 ? (y - windowSize.h / 2) / 30 : 0;

  return (
    <>
      {/* Loading Screen Layer - COMPLETELY FIXED */}
      <div
        ref={loadingScreenRef}
        className="sticky top-0 left-0 w-full h-screen bg-[#050505] flex items-center justify-between flex-col "
      >
        <div className='w-dvw pt-10'>
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

        {isPageLoaded && (
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer"
            style={{ animation: 'fadeIn 1s ease-out' }}
          >
            <div className="mb-2 text-sm text-gray-300 font-light tracking-wide">
              Scroll to explore
            </div>
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ animation: 'bounce 2s infinite' }}
            >
              <svg
                className="w-6 h-6 text-red-500"
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

        <div className='w-dvw pb-10'>
          <Image
            src="/dot-grid.png"
            alt="Dot Grid"
            width={400}
            height={100}
            className='w-[200px] md:w-sm ml-auto grayscale-30 md:translate-x-10'
          />
        </div>
      </div>

      {/* Gradient Wipe Transition Overlay */}
      <div
        ref={transitionWipeRef}
        className=" w-full pointer-events-none"
        style={{
          height: '400px',
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              rgba(0, 0, 0, 0.3) 10%,
              rgba(0, 0, 0, 0.9) 25%,
              #000000 50%,
              rgba(0, 0, 0, 0.9) 75%,
              rgba(0, 0, 0, 0.3) 90%,
              transparent 100%
            )
          `,
          willChange: 'transform'
        }}
      />

      {/* Hero Section Image Layer */}
      <div
        ref={heroImageRef}
        className="sticky top-0 left-0 w-full h-screen bg-[#050505] flex items-center justify-center"
        style={{
          transform: `translate(${parallaxX}px, ${parallaxY}px)`
        }}
      >
        <Image
          src="/poster.png"
          alt="Hero Background"
          width={1920}
          height={1080}
          className='w-dvw h-dvh object-center md:object-[0%_23%] object-cover'
          priority
        />

        {/* Floating X SVG that moves to TEDx logo position */}
        <div
          ref={floatingXRef}
          className="absolute w-24 h-24 md:w-40 md:h-40 z-30 pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 0 20px rgba(238, 41, 34, 0.8))'
          }}
        >
          <XSvg className="w-full h-full" />
        </div>
      </div>

      {/* Logo Section */}
      <div
        ref={logoSectionRef}
        className="sticky top-0 left-0 w-full h-screen bg-[#050505] flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* TEDx Part Container */}
          <div
            ref={tedxContainerRef}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 lg:w-[28rem]"
            style={{
              willChange: 'transform',
              filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
            }}
          >
            <TedxPart ref={tedxPartRef} className="w-full h-auto" />
          </div>

          {/* VJCET Part Container */}
          <div
            ref={vjcetContainerRef}
            className="absolute left-3/4 top-1/2 transform -translate-y-1/2 w-80 md:w-96 lg:w-[28rem] opacity-0"
            style={{
              willChange: 'transform, opacity',
              filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
            }}
          >
            <VjcetPart ref={vjcetPartRef} className="w-full h-auto" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.1); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }

        @keyframes heartbeatGlow {
          0% { filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6)); }
          14% { filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1)) drop-shadow(0 0 60px rgba(238, 41, 34, 0.8)); }
          28% { filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6)); }
          42% { filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1)) drop-shadow(0 0 60px rgba(238, 41, 34, 0.8)); }
          70% { filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6)); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(5px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
