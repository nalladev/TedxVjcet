"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { SVGGrid } from '@/app/components/ui/SVGGrid';



// Animation constants
const INITIAL_SCALE = 600;
const FINAL_SCALE = 1;




// TEDx Part Component
const TedxPart = React.forwardRef<SVGGElement, { className?: string }>(
  (props, ref) => (
    <svg
      viewBox="0 0 803 319"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g ref={ref}>
        <path
          d="M679 243L721.264 180.622L680.597 121H723.462L740.748 151.92L758.532 121H801.39L760.736 180.62L803 242.998L760.108 243L740.748 210.775L721.867 243H679Z"
          fill="#EB0028"
        />
        <path
          d="M481 319L481.002 121H581.472C612.087 121 635.489 131.282 651.025 151.566C667.535 173.109 671 200.513 671 219.707C671 250.863 662.667 275.243 646.235 292.166C628.943 309.972 603.096 319 569.406 319H481ZM540.905 269.659H566.022C605.241 269.659 611.097 237.821 611.097 218.851C611.097 173.845 573.152 170.343 561.522 170.343H540.905V269.659Z"
          fill="#EB0028"
        />
        <path
          d="M303 319V121H470V171H363V197H470V243H363V269H470V319H303Z"
          fill="#EB0028"
        />
        <path d="M176 319V171H121V121H293V171H237V319H176Z" fill="#EB0028" />
      </g>
    </svg>
  ),
);
TedxPart.displayName = "TedxPart";

// VJCET Part Component
const VjcetPart = React.forwardRef<SVGGElement, { className?: string }>(
  (props, ref) => (
    <svg
      viewBox="854.434 124.638 825.766 205.997"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <g ref={ref}>
        <path
          d="M872.879 127.273L933.106 297.132H934.8L995.027 127.273H1013.47L943.364 320H924.543L854.434 127.273H872.879ZM1101.86 127.273H1119.46V266.266C1119.39 278.813 1117.13 289.29 1112.68 297.697C1108.23 306.041 1102.08 312.283 1094.24 316.424C1086.39 320.565 1077.39 322.635 1067.23 322.635C1057.25 322.635 1048.34 320.784 1040.5 317.083C1032.66 313.381 1026.48 308.174 1021.96 301.461C1017.51 294.748 1015.28 286.875 1015.28 277.841H1032.6C1032.6 283.55 1034.1 288.6 1037.11 292.992C1040.13 297.321 1044.23 300.708 1049.44 303.155C1054.71 305.602 1060.64 306.825 1067.23 306.825C1074.07 306.825 1080.06 305.382 1085.2 302.496C1090.41 299.611 1094.49 295.188 1097.44 289.228C1100.38 283.205 1101.86 275.551 1101.86 266.266V127.273ZM1329.54 187.5H1311.85C1310.53 180.913 1308.15 174.827 1304.7 169.244C1301.31 163.597 1297.05 158.672 1291.9 154.469C1286.76 150.266 1280.92 147.003 1274.4 144.682C1267.87 142.361 1260.82 141.2 1253.22 141.2C1241.05 141.2 1229.95 144.368 1219.91 150.705C1209.94 157.041 1201.94 166.358 1195.91 178.654C1189.95 190.888 1186.97 205.882 1186.97 223.636C1186.97 241.516 1189.95 256.573 1195.91 268.807C1201.94 281.04 1209.94 290.326 1219.91 296.662C1229.95 302.936 1241.05 306.072 1253.22 306.072C1260.82 306.072 1267.87 304.912 1274.4 302.591C1280.92 300.269 1286.76 297.038 1291.9 292.898C1297.05 288.694 1301.31 283.77 1304.7 278.123C1308.15 272.477 1310.53 266.36 1311.85 259.773H1329.54C1327.98 268.619 1325.03 276.868 1320.7 284.522C1316.43 292.114 1310.97 298.764 1304.32 304.473C1297.74 310.182 1290.15 314.636 1281.55 317.836C1272.96 321.035 1263.51 322.635 1253.22 322.635C1237.04 322.635 1222.67 318.588 1210.12 310.495C1197.58 302.34 1187.73 290.859 1180.58 276.053C1173.49 261.247 1169.94 243.775 1169.94 223.636C1169.94 203.498 1173.49 186.026 1180.58 171.22C1187.73 156.414 1197.58 144.964 1210.12 136.871C1222.67 128.716 1237.04 124.638 1253.22 124.638C1263.51 124.638 1272.96 126.238 1281.55 129.437C1290.15 132.574 1297.74 137.028 1304.32 142.8C1310.97 148.509 1316.43 155.159 1320.7 162.75C1325.03 170.342 1327.98 178.591 1329.54 187.5ZM1378.83 320V127.273H1490.63V143.082H1396.43V215.637H1484.7V231.447H1396.43V304.19H1492.51V320H1378.83ZM1532.45 143.082V127.273H1672.2V143.082H1611.13V320H1593.53V143.082H1532.45Z"
          fill="white"
        />
      </g>
    </svg>
  ),
);
VjcetPart.displayName = "VjcetPart";

interface CombinedLoadingHeroProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  onLoadStateChange?: (isLoaded: boolean) => void;
  onContainerRefReady?: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

export const CombinedLoadingHero = ({
  scrollContainerRef,
  onLoadStateChange,
  onContainerRefReady,
}: CombinedLoadingHeroProps) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [parallaxTransform, setParallaxTransform] = useState({ x: 0, y: 0 });

  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroImageInnerRef = useRef<HTMLImageElement>(null);
  const tedxLogoRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    onContainerRefReady?.(containerRef);
  }, [onContainerRefReady]);

  // Mouse parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (typeof window === "undefined") return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate normalized mouse position (-1 to 1)
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    // Apply parallax movement (adjust multiplier for intensity)
    const parallaxIntensity = 20;
    setParallaxTransform({
      x: x * parallaxIntensity,
      y: y * parallaxIntensity
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
      onLoadStateChange?.(true);
    };

    // Check if page is already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("load", handleLoad);
      }
    };
  }, [onLoadStateChange]);

  useEffect(() => {
    if (!isPageLoaded || !containerRef.current || typeof window === "undefined")
      return;

    const oneHundredVh = window.innerHeight;
    const maxAnimationRange = oneHundredVh * 2; // End of all animations
    let animationComplete = false;
    let animationId: number | null = null;
    let isAnimating = false;

    // Easing function for deceleration (ease-out)
    const easeOut = (t: number): number => {
      return 1 - Math.pow(1 - t, 3); // Cubic ease-out
    };

    // Convert linear progress to exponential scale for smoother transitions
    const getScaleFromProgress = (progress: number): number => {
      // Use exponential interpolation for smoother scaling at lower values
      const minScale = Math.log(FINAL_SCALE);
      const maxScale = Math.log(INITIAL_SCALE);
      const logScale = maxScale - (progress * (maxScale - minScale));
      return Math.exp(logScale);
    };

    const updateAnimations = () => {
      if (!loadingScreenRef.current || !scrollContainerRef?.current) {
        isAnimating = false;
        return;
      }

      const scrollTop = scrollContainerRef.current.scrollTop;

      // Early exit if we're way past all animations (efficiency optimization)
      if (scrollTop > maxAnimationRange + oneHundredVh) {
        isAnimating = false;
        return;
      }

      // Loading screen animation (0 to 1vh)
      if (scrollTop <= oneHundredVh) {
        const progress = Math.min(scrollTop / oneHundredVh, 1);
        const height = (1 - progress) * 100;
        loadingScreenRef.current.style.height = `${height}vh`;

        // Hero image opacity animation
        if (heroImageRef.current) {
          const imageOpacity = 0.5 + (progress * 0.5); // From 0.5 to 1.0
          heroImageRef.current.style.opacity = `${imageOpacity}`;
        }

        // Check if animation is complete
        if (progress >= 1 && !animationComplete) {
          animationComplete = true;
          console.log("Loading screen animation completed!");
        }

        if (progress < 1) {
          animationComplete = false;
        }
      }

      // TEDx logo animation (1vh to 2vh)
      if (tedxLogoRef.current && scrollTop >= 0 && scrollTop <= maxAnimationRange) {
        const startScroll = oneHundredVh;
        const endScroll = oneHundredVh * 2;

        if (scrollTop >= startScroll && scrollTop <= endScroll) {
          const logoProgress = (scrollTop - startScroll) / (endScroll - startScroll);
          const easedProgress = easeOut(logoProgress);
          const scale = getScaleFromProgress(easedProgress);
          const backgroundOpacity = easedProgress;

          tedxLogoRef.current.style.transform = `scale(${scale})`;
          tedxLogoRef.current.style.backgroundColor = `rgba(5, 5, 5, ${backgroundOpacity})`;
        } else if (scrollTop < startScroll) {
          tedxLogoRef.current.style.display = `flex`;
          tedxLogoRef.current.style.transform = `scale(${INITIAL_SCALE})`;
          tedxLogoRef.current.style.backgroundColor = `transparent`;
        } else if (scrollTop > endScroll) {
          tedxLogoRef.current.style.transform = `scale(${FINAL_SCALE})`;
          tedxLogoRef.current.style.backgroundColor = `#050505`;
        }
      }

      isAnimating = false;
    };

    const onScroll = () => {
      if (isAnimating) return;

      const scrollTop = scrollContainerRef?.current?.scrollTop || 0;

      // Early exit if we're way past the animation range - but keep listener active
      if (scrollTop > maxAnimationRange + oneHundredVh) {
        return;
      }

      isAnimating = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(updateAnimations);
    };

    // Store current ref for cleanup
    const currentScrollContainer = scrollContainerRef?.current;

    // Add scroll listener to the container - keep it active for scroll-up detection
    if (currentScrollContainer) {
      currentScrollContainer.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      if (currentScrollContainer) {
        currentScrollContainer.removeEventListener('scroll', onScroll);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [scrollContainerRef, isPageLoaded]);

  return (
    <>
      <div ref={containerRef} className="h-[300dvh] w-1vw">

      </div>
      {/* Loading Screen Layer - Height animated on scroll */}
      <div
        ref={loadingScreenRef}
        className="fixed top-0 left-0 pointer-events-none w-full h-screen z-3 overflow-hidden bg-[#050505]"
      >
        <SVGGrid opacity={0.3} gridSize={40} strokeWidth={0.4} dotSize={0.8} />

        <div className="w-full h-screen flex items-center justify-around flex-col">
          {/*<div className="w-full pt-10">
            <Image
              src="/dot-grid.png"
              alt="Dot Grid"
              width={400}
              height={100}
              className="w-[200px] md:w-sm rotate-180 grayscale-30 md:-translate-x-10"
            />
          </div>*/}

          <Image
            src="/weird_x.png"
            alt="Tedx Logo"
            width={200}
            height={200}
            className="w-[150px] md:w-[270px]"
            loading="eager"
            style={{
              animation:
                "heartbeat 1.5s ease-in-out infinite, heartbeatGlow 1.5s ease-in-out infinite",
            }}
          />

          {/*<div className="w-dvw pb-10">
            <Image
              src="/dot-grid.png"
              alt="Dot Grid"
              width={400}
              height={100}
              className="w-[200px] md:w-sm ml-auto grayscale-30 md:translate-x-10"
            />
          </div>*/}
        </div>
      </div>

      {/* Hero Section Image Layer - Hidden behind loading screen initially */}
      <div
        ref={heroImageRef}
        className="fixed top-0 opacity-50 left-0 pointer-events-none w-full h-dvh z-2 bg-[#050505] flex items-center justify-center overflow-hidden"
      >
        <Image
          ref={heroImageInnerRef}
          src="/college-x.png"
          alt="Hero Background"
          width={1920}
          height={1080}
          className="w-dvw h-dvh object-center md:object-[0%_23%] object-cover transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${parallaxTransform.x}px, ${parallaxTransform.y}px) scale(1.1)`
          }}
          priority
        />
        {/* Mobile gradient overlay - top-left to bottom-right */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-br from-black/70 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Hero Section TEDx Logo Layer - Zooms out into view */}
      <div
        ref={tedxLogoRef}
        className={`fixed pointer-events-none inset-0 scale-${INITIAL_SCALE} origin-center w-full h-dvh z-4 hidden items-center justify-center`}
      >
        <Image
          src="/tedx-vjcet.svg"
          alt="TEDx Logo"
          width={400}
          height={100}
          className="w-[350px] md:w-2xl"
        />
      </div>

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
            filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1))
              drop-shadow(0 0 60px rgba(238, 41, 34, 0.8));
          }
          28% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
          }
          42% {
            filter: drop-shadow(0 0 40px rgba(238, 41, 34, 1))
              drop-shadow(0 0 60px rgba(238, 41, 34, 0.8));
          }
          70% {
            filter: drop-shadow(0 0 15px rgba(238, 41, 34, 0.6));
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
    </>
  );
};
