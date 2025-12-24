'use client';

import React, { useRef, useState, lazy, Suspense } from "react";
import { Spotlight } from "@/app/components/ui";
import { ScrollIndicator } from "@/app/components/ui/ScrollIndicator";
import {
  CombinedLoadingHero,
  CountdownSection,
  AboutSection,
  FooterSection
} from "@/app/components/sections";
import { GlobalStyles } from "@/app/styles/GlobalStyles";

// Dynamic imports for heavy components
const SpeakersSection = lazy(() => import("@/app/components/sections").then(module => ({ default: module.SpeakersSection })));
const OrganizersSection = lazy(() => import("@/app/components/sections").then(module => ({ default: module.OrganizersSection })));
const RegistrationSection = lazy(() => import("@/app/components/sections").then(module => ({ default: module.RegistrationSection })));
const SponsorsSection = lazy(() => import("@/app/components/sections").then(module => ({ default: module.SponsorsSection })));

export default function TEDxWebsite() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [heroContainerRef, setHeroContainerRef] = useState<React.RefObject<HTMLDivElement | null> | null>(null);

  return (
    <div 
      ref={scrollContainerRef}
      className="relative bg-[#050505] text-white font-sans overflow-x-hidden overflow-y-auto h-screen selection:bg-[#e62b1e] selection:text-white cursor-default"
    >
      <GlobalStyles />
      <CombinedLoadingHero 
        scrollContainerRef={scrollContainerRef}
        onLoadStateChange={setIsPageLoaded}
        onContainerRefReady={setHeroContainerRef}
      />
      <CountdownSection />
      <AboutSection />
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading speakers...</div>
      </div>}>
        <SpeakersSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading organizers...</div>
      </div>}>
        <OrganizersSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading sponsors...</div>
      </div>}>
        <SponsorsSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-screen bg-red-600 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading registration...</div>
      </div>}>
        <RegistrationSection />
      </Suspense>
      <FooterSection />
      <Spotlight />
      {heroContainerRef && (
        <ScrollIndicator 
          containerRef={heroContainerRef}
          scrollContainerRef={scrollContainerRef}
          isPageLoaded={isPageLoaded}
        />
      )}
    </div>
  );
}
