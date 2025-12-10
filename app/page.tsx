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
    <div className="bg-[#050505] relative text-white font-sans overflow-x-hidden selection:bg-[#e62b1e] selection:text-white cursor-default">
      <GlobalStyles />
      <Spotlight />
      <CombinedLoadingHero />
      <CountdownSection />
      <AboutSection />
      <SpeakersSection />
      <OrganizersSection />
      <RegistrationSection />
      <FooterSection />
    </div>
  );
}
