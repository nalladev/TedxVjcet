'use client';

import React, { useState, useEffect, useRef } from "react";
// Removed Next.js Image import to fix build error
import {
  Calendar, MapPin, ArrowRight, ChevronDown,
  Ticket, Quote, Instagram, Linkedin, Twitter, Globe
} from "lucide-react";

// --- Utility Hooks ---

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

const useScrollProgress = (ref: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;

      const topOffset = -rect.top;

      // Fix for NaN error: Ensure totalDistance is valid and positive
      let p = 0;
      if (totalDistance > 0) {
        p = topOffset / totalDistance;
      }

      // Clamp and safeguard against NaN
      p = Math.min(Math.max(p, 0), 1);
      if (Number.isNaN(p)) p = 0;

      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
};

// --- Reusable Components ---

interface ParallaxBackgroundProps {
  text: string;
  direction?: number;
  speed?: number;
  className?: string;
  opacity?: string;
  textColor?: string;
}

const ParallaxBackground = ({ text, direction = 1, speed = 0.2, className = "", opacity = "opacity-[0.03]", textColor = "text-white" }: ParallaxBackgroundProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed * direction);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction, speed]);

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0 ${className}`}>
      <span
        className={`text-[25vw] font-bold-display whitespace-nowrap will-change-transform leading-none ${textColor} ${opacity}`}
        style={{ transform: `translateX(${offset}px)` }}
      >
        {text}
      </span>
    </div>
  );
};

const Spotlight = () => {
  const { x, y } = useMousePosition();
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(230, 43, 30, 0.06), transparent 40%)`
      }}
    />
  );
};

// --- Main Application ---

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
      <AboutSection />
      <SpeakersSection />
      <QuotesSection />
      <OrganizersSection />
      <RegistrationSection />
    </div>
  );
}

// --- Sections ---

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const { x, y } = useMousePosition();
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    }

    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll Parallax
  const scale = Math.max(1 - scrollY / 1000, 0.8);
  const opacity = Math.max(1 - scrollY / 800, 0);
  const translateY = scrollY * 0.5;

  // Enhanced Mouse Parallax (Restored: disabled on screens smaller than 768px)
  const parallaxX = windowSize.w > 768 ? (x - windowSize.w / 2) / 30 : 0;
  const parallaxY = windowSize.w > 768 ? (y - windowSize.h / 2) / 30 : 0;

  return (
    <div className="relative h-screen w-full flex items-center justify-center sticky top-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 grid-bg opacity-30"></div>

      {/* Background Blobs (Inverse Movement) */}
      <div
         className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#e62b1e] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse transition-transform duration-100 ease-out"
         style={{ transform: `translate(${parallaxX * -2}px, ${parallaxY * -2}px)` }}
      ></div>
      <div
         className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse transition-transform duration-100 ease-out"
         style={{ animationDelay: "1s", transform: `translate(${parallaxX * -2}px, ${parallaxY * -2}px)` }}
      ></div>

      <div
        className="relative z-10 text-center p-6 will-change-transform"
        style={{
            opacity,
            transform: `scale(${scale}) translateY(${translateY}px) translate(${parallaxX}px, ${parallaxY}px)`
        }}
      >
        <div className="inline-flex items-center gap-2 mb-8 border border-white/10 bg-white/5 px-4 py-2 rounded-full backdrop-blur-md hover:border-[#e62b1e]/50 transition-colors">
           <span className="w-2 h-2 bg-[#e62b1e] rounded-full animate-ping"></span>
           <span className="text-[#e62b1e] font-tech tracking-widest text-xs uppercase">Transmission Live</span>
        </div>

        <div className="mb-8 flex justify-center transform hover:scale-105 transition-transform duration-500 relative h-24 md:h-32 w-64 md:w-96">
            <img
              src="/tedx/logo-white.png"
              alt="TEDxVJCET"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm font-tech text-gray-400 mt-8">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>DEC 11, 2025</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>KERALA, INDIA</span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 transition-opacity duration-300"
        style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
      >
        <span className="text-[10px] tracking-widest uppercase text-white/60">Scroll to Initialize</span>
        <ChevronDown size={20} className="text-white animate-bounce" />
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="relative z-10 bg-[#050505] min-h-[100vh] shadow-[0_-50px_100px_rgba(0,0,0,1)] overflow-hidden border-t border-white/5">
      <ParallaxBackground text="IDEAS" direction={-1} speed={0.3} />

      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-20">
          <div className="space-y-8">
             <div className="overflow-hidden">
                <h2 className="text-4xl md:text-7xl font-bold-display uppercase leading-[0.9] animate-slide-up">
                  What is <br/><span className="text-[#e62b1e]">TEDx?</span>
                </h2>
             </div>
             <p className="font-tech text-gray-400 text-sm md:text-base border-l-2 border-[#e62b1e] pl-6 max-w-md">
               In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience.
             </p>
          </div>

          <div className="grid gap-6">
            <FeatureCard number="01" title="EVOLVE THINKING" desc="Engage with keynotes from industry experts that challenge the status quo." />
            <FeatureCard number="02" title="EXPAND TOOLBOX" desc="Hands-on workshops designed to give you practical, actionable skills." />
            <FeatureCard number="03" title="ELEVATE CAREER" desc="Network with visionaries and find your next big breakthrough." />
          </div>
        </div>
      </div>
    </div>
  );
};

interface Speaker {
  id: number;
  name: string;
  role: string;
  img: string;
}

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

const SpeakerCard = ({ speaker, index }: SpeakerCardProps) => {
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

  return (
    <div
      ref={ref}
      className={`group relative aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <img
        src={speaker.img}
        alt={speaker.name}
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

const SpeakersSection = () => {
  const speakers = [
    { id: 1, name: "Nivin K Sunil", role: "Tech Visionary", img: "/placeholder.jpeg" },
    { id: 2, name: "Sarah Connor", role: "AI Ethicist", img: "/placeholder.jpeg" },
    { id: 3, name: "David Chen", role: "Urban Planner", img: "/placeholder.jpeg" },
    { id: 4, name: "Elena V", role: "Quantum Physicist", img: "/placeholder.jpeg" },
  ];

  return (
    <div className="relative z-20 bg-white text-black py-24 md:py-32 px-6 overflow-hidden min-h-[80vh]">
      <ParallaxBackground text="SPEAKERS" direction={1} speed={0.2} className="top-20" textColor="text-black" opacity="opacity-[0.05]" />

      <div className="relative z-10 max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-6">
         <div>
            <span className="font-tech text-sm font-bold bg-[#e62b1e] text-white px-3 py-1 mb-4 inline-block tracking-widest">CONFIRMED LINEUP</span>
            <h2 className="text-5xl md:text-8xl font-bold-display tracking-tighter uppercase">Speakers</h2>
         </div>
         <div className="text-right hidden md:block">
            <p className="font-tech text-sm font-bold">BATCH: 2026</p>
            <p className="font-tech text-sm text-gray-500">4 / 8 REVEALED</p>
         </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {speakers.map((speaker, index) => (
          <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
        ))}
      </div>
    </div>
  );
};

const QuotesSection = () => {
  const quotes = [
    { id: 1, text: "Technology is best when it brings people together. We are building the future, one connection at a time.", author: "Nivin K Sunil", role: "TECH VISIONARY", img: "/placeholder.jpeg" },
    { id: 2, text: "The only way to predict the future is to create it yourself. Innovation distinguishes between a leader and a follower.", author: "Sarah Connor", role: "AI ETHICIST", img: "/placeholder.jpeg" },
    { id: 3, text: "Sustainable design isn't just about the environment; it's about designing systems that allow humanity to thrive.", author: "David Chen", role: "URBAN PLANNER", img: "/placeholder.jpeg" }
  ];

  return (
    <div className="relative bg-[#050505] z-20">

      {/* Background Parallax Text - Fixed Position Behind content */}
      <ParallaxBackground text="VOICES" direction={-1} speed={0.4} />

      <div className="relative max-w-5xl px-6 w-full mx-auto py-24">

         <div className="text-center mb-16 relative z-10">
            <Quote size={48} className="text-[#e62b1e] mx-auto mb-4" />
            <h2 className="text-2xl font-tech text-gray-400">TRANSMISSIONS FROM THE FUTURE</h2>
         </div>

         {/* NATIVE CSS STICKY STACK - ROBUST & UNBREAKABLE */}
         <div className="flex flex-col gap-12 pb-24">
           {quotes.map((quote, index) => (
             <div
                key={quote.id}
                className="sticky top-32 md:top-48 z-10" // Sticky top creates the stack effect naturally
                style={{ zIndex: index + 10 }}
             >
                <div className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-lg transform transition-transform hover:scale-[1.02] border-t-2 border-t-white/20">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                       <div className="relative w-24 h-24 flex-shrink-0">
                           <img
                             src={quote.img}
                             alt={quote.author}
                             className="w-full h-full rounded-full border-2 border-[#e62b1e] object-cover"
                           />
                       </div>
                       <div className="text-center md:text-left">
                          <p className="text-xl md:text-3xl lg:text-4xl font-bold font-sans leading-tight mb-6 text-white">"{quote.text}"</p>
                          <div>
                             <p className="font-bold text-[#e62b1e] tracking-wider text-lg">{quote.author}</p>
                             <p className="text-sm text-gray-500 font-tech">{quote.role}</p>
                          </div>
                       </div>
                    </div>
                </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

const OrganizersSection = () => {
  const organizers = [
    { name: "Alex Morgan", role: "Lead Organizer", img: "/placeholder.jpeg" },
    { name: "Sam Alt", role: "Curator", img: "/placeholder.jpeg" },
    { name: "Lisa Su", role: "Design Head", img: "/placeholder.jpeg" },
  ];

  return (
    <div className="bg-[#111] py-24 border-t border-white/10 relative z-30 overflow-hidden">
      <ParallaxBackground text="TEAM" direction={1} speed={0.15} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-4xl md:text-6xl font-bold-display uppercase mb-4">The Team</h2>
           <div className="w-24 h-1 bg-[#e62b1e] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {organizers.map((org, i) => (
              <div key={i} className="group relative bg-[#050505] p-1 border border-white/10 hover:border-[#e62b1e] transition-colors duration-300">
                 <div className="absolute top-2 left-2 z-10 font-tech text-[10px] bg-black/50 backdrop-blur px-2 text-white border border-white/20">
                    PLAYER_0{i+1}
                 </div>
                 <div className="aspect-square overflow-hidden mb-4 relative">
                    <img
                      src={org.img}
                      alt={org.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                 </div>
                 <div className="p-4 text-center">
                    <h3 className="text-xl font-bold uppercase tracking-wider">{org.name}</h3>
                    <p className="text-[#e62b1e] font-tech text-xs mt-1">{org.role}</p>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const RegistrationSection = () => {
  return (
    <div className="relative z-30 bg-[#e62b1e] text-white min-h-[90vh] flex flex-col items-center justify-center text-center p-6 overflow-hidden">
       {/* Restored customized background text settings from user */}
       <ParallaxBackground text="TICKETS" direction={0.3} speed={0.3} opacity="opacity-20 -translate-y-50" className="z-0" />

       <div className="max-w-4xl space-y-10 relative z-10">
         <div className="inline-block bg-white text-[#e62b1e] px-6 py-2 font-tech text-sm uppercase tracking-[0.2em] mb-4 border border-white/20 shadow-lg animate-pulse">
            Status: Registration Open
         </div>
         <h2 className="text-6xl md:text-9xl font-bold-display leading-[0.85] tracking-tighter hover:scale-105 transition-transform duration-500 cursor-default">
           SECURE YOUR<br/>SEAT
         </h2>
         <p className="font-sans text-xl md:text-3xl opacity-90 max-w-2xl mx-auto font-light">
           Event Date: <span className="font-bold underline decoration-4 decoration-black underline-offset-4">DEC 11, 2025</span>. <br/>Don't miss the future.
         </p>
         <div className="pt-8">
            <a href="https://www.ted.com/tedx/events/64560" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden bg-black text-white px-20 py-8 text-2xl font-bold hover:bg-white hover:text-[#e62b1e] transition-all duration-300 flex items-center gap-4 mx-auto group shadow-2xl inline-flex rounded-sm ring-4 ring-transparent hover:ring-black/20">
               <span className="relative z-10 flex items-center gap-3">
                 <Ticket size={32} />
                 BOOK TICKETS
                 <ArrowRight className="group-hover:translate-x-2 transition-transform" />
               </span>
            </a>
         </div>
       </div>

       <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row justify-between items-end text-xs font-tech text-white/80 border-t border-black/10 mt-20 bg-gradient-to-t from-black/20 to-transparent relative z-10">
          <div className="text-left space-y-2 mb-4 md:mb-0">
            <p className="font-bold text-lg">TEDxVJCET © 2026</p>
            <p className="max-w-xs">This independent TEDx event is operated under license from TED.</p>
            <a href="https://www.tedxvjcet.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black mt-2"><Globe size={14} /> Official Website</a>
          </div>
          <div className="flex gap-6 text-2xl">
            <a href="https://www.instagram.com/tedxvjcet/" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:scale-110 transition-all"><Instagram size={24} /></a>
            <a href="https://www.linkedin.com/company/tedxvjcet" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:scale-110 transition-all"><Linkedin size={24} /></a>
            <a href="https://www.ted.com/tedx/events/64560" target="_blank" rel="noopener noreferrer" className="hover:text-black hover:scale-110 transition-all"><Globe size={24} /></a>
          </div>
       </div>
    </div>
  );
};

interface FeatureCardProps {
  number: string;
  title: string;
  desc: string;
}

const FeatureCard = ({ number, title, desc }: FeatureCardProps) => (
  <div className="group flex gap-6 items-start p-6 border border-white/5 hover:bg-white/5 transition-all duration-300 hover:border-[#e62b1e]/50 rounded-lg">
    <div className="font-bold-display text-4xl text-gray-700 group-hover:text-[#e62b1e] transition-colors">{number}</div>
    <div>
      <h4 className="font-bold text-xl mb-2 tracking-wide text-white group-hover:translate-x-2 transition-transform">{title}</h4>
      <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
  </div>
);

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-[#050505] z-50 flex items-center justify-center">
    <div className="text-center">
       <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-[#e62b1e]/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#e62b1e] border-t-transparent rounded-full animate-spin"></div>
       </div>
       <div className="font-tech text-2xl text-white tracking-[0.2em] animate-pulse">INITIALIZING</div>
       <div className="mt-2 text-[#e62b1e] text-xs font-tech">TEDxVJCET</div>
    </div>
  </div>
);

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600;800&display=swap');

    .font-tech { font-family: 'Space Mono', monospace; }
    .font-bold-display { font-family: 'Anton', sans-serif; }
    .font-sans { font-family: 'Inter', sans-serif; }

    .grid-bg {
      background-size: 50px 50px;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }

    @keyframes slide-up {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .animate-slide-up {
      animation: slide-up 0.8s ease-out forwards;
    }

    /* Hide Scrollbar but allow scroll */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #050505;
    }
    ::-webkit-scrollbar-thumb {
      background: #333;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #e62b1e;
    }
  `}</style>
);
