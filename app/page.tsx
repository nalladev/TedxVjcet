'use client';

import React, { useRef, useState } from "react";
import { Spotlight } from "@/app/components/ui";
import { ScrollIndicator } from "@/app/components/ui/ScrollIndicator";
import {
  CombinedLoadingHero,
  CountdownSection,
  AboutSection,
  SpeakersSection,
  OrganizersSection,
  RegistrationSection,
  FooterSection
} from "@/app/components/sections";
import { GlobalStyles } from "@/app/styles/GlobalStyles";

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
      <SpeakersSection />
      <OrganizersSection />
      <RegistrationSection />
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
