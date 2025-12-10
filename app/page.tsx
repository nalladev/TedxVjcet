'use client';

import React from "react";
import { Spotlight } from "@/app/components/ui";
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
  return (
    <div className="relative bg-[#050505] text-white font-sans overflow-x-hidden overflow-y-auto h-screen selection:bg-[#e62b1e] selection:text-white cursor-default">
      <GlobalStyles />
      <CombinedLoadingHero />
      <CountdownSection />
      <AboutSection />
      <SpeakersSection />
      <OrganizersSection />
      <RegistrationSection />
      <FooterSection />
      <Spotlight />
    </div>
  );
}
