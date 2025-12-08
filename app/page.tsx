'use client';

import React, { useState, useEffect } from "react";
import { LoadingScreen, Spotlight } from "@/app/components/ui";
import {
  HeroSection,
  CountdownSection,
  AboutSection,
  SpeakersSection,
  OrganizersSection,
  RegistrationSection,
  FooterSection
} from "@/app/components/sections";
import { GlobalStyles } from "@/app/styles/GlobalStyles";

export default function TEDxWebsite() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-[#e62b1e] selection:text-white cursor-default">
      <GlobalStyles />
      <Spotlight />

      <HeroSection />
      <CountdownSection />
      <AboutSection />
      <SpeakersSection />
      {/*<OrganizersSection />*/}
      <RegistrationSection />
      <FooterSection />
    </div>
  );
}
