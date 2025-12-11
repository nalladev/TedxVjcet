'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Zap, Ticket, ArrowRight } from 'lucide-react';
import { EVENT_DATE, COUNTDOWN_LABELS } from '@/app/constants';
import { SVGGrid } from '@/app/components/ui/SVGGrid';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isEventPassed, setIsEventPassed] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = EVENT_DATE.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        setIsEventPassed(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const updateTime = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTime(); // Initial calculation

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: COUNTDOWN_LABELS.days },
    { value: timeLeft.hours, label: COUNTDOWN_LABELS.hours },
    { value: timeLeft.minutes, label: COUNTDOWN_LABELS.minutes },
    { value: timeLeft.seconds, label: COUNTDOWN_LABELS.seconds }
  ];

  return (
    <section id="countdown" className="relative z-10 bg-linear-to-b from-[#050505] via-[#0a0a0a] to-[#050505] py-20 overflow-hidden">
      {/* Background Elements */}
      <SVGGrid opacity={0.4} gridSize={50} strokeWidth={0.6} dotSize={1.2} />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e62b1e] rounded-full mix-blend-multiply filter blur-[200px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[200px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 mb-8 border border-[#e62b1e]/20 bg-[#e62b1e]/5 px-6 py-3 rounded-full backdrop-blur-md">
            <Zap size={16} className="text-[#e62b1e]" />
            <span className="font-tech tracking-widest text-xs uppercase text-[#e62b1e]">
              {isEventPassed ? 'Event Completed' : 'Countdown Active'}
            </span>
          </div>

          {/* Section Title */}
          <h2 className="text-4xl md:text-6xl font-anton tracking-tight mb-4 bg-linear-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            {isEventPassed ? 'EVENT COMPLETE' : 'COUNTDOWN TO IDEAS'}
          </h2>

          {/* Subtitle */}
          <p className="text-lg font-tech text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isEventPassed
              ? 'Thank you for being part of our incredible journey of ideas worth spreading.'
              : 'The stage is set, the speakers are ready. Join us as we countdown to a transformative experience.'
            }
          </p>
        </div>

        {!isEventPassed && (
          <>
            {/* Countdown Display */}
            <div className="grid grid-cols-4 gap-3 md:gap-8 mb-12 max-w-4xl mx-auto">
              {timeUnits.map((unit, index) => (
                <div
                  key={unit.label}
                  className="countdown-card group bg-white/5 border border-white/10 rounded-lg p-3 md:p-5 backdrop-blur-md hover:border-[#e62b1e]/50 transition-all duration-300 hover:bg-white/10 md:animate-none animate-jump-mobile"
                  style={{
                    transition: 'transform 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6), box-shadow 0.3s ease',
                    animationDelay: `${index * 0.5}s`
                  }}
                >
                  <div className="text-center">
                    <div className="text-xl md:text-5xl font-tech text-white mb-1 md:mb-2 group-hover:text-[#e62b1e] transition-colors duration-300">
                      {unit.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] md:text-sm font-tech tracking-wider text-gray-400 uppercase">
                      {unit.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Event Details */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-gray-400 mb-12">
              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-[#e62b1e]" />
                <span className="font-tech text-sm">January 3, 2026</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-gray-600"></div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-[#e62b1e]" />
                <span className="font-tech text-sm">Ideas Worth Spreading</span>
              </div>
            </div>

            {/* Book Ticket Button */}
            <div className="text-center">
              <a
                href="https://makemypass.com/event/tedx-vjcet"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-linear-to-r from-[#e62b1e] to-red-600 hover:from-red-600 hover:to-[#e62b1e] text-white font-tech px-8 py-4 rounded-xl border border-[#e62b1e]/20 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#e62b1e]/20 text-sm tracking-wider uppercase animate-blip"
              >
                <Ticket size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Book Your Ticket</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </>
        )}

        {isEventPassed && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎉</div>
            <p className="text-xl text-gray-300 font-tech">
              TEDxVJCET has concluded. Thank you for joining us on this incredible journey!
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes jump-mobile {
          0%, 70%, 100% {
            transform: translateY(0) scale(1);
            border-color: rgba(255, 255, 255, 0.1);
            background-color: rgba(255, 255, 255, 0.05);
          }
          15%, 35% {
            transform: translateY(-8px) scale(1.05);
            border-color: rgba(230, 43, 30, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
          }
        }

        @keyframes blip {
          0%, 60%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 15px rgba(230, 43, 30, 0.2);
          }
          10%, 20% {
            transform: scale(1.02);
            box-shadow: 0 6px 25px rgba(230, 43, 30, 0.4);
          }
          30%, 40% {
            transform: scale(1.02);
            box-shadow: 0 6px 25px rgba(230, 43, 30, 0.4);
          }
        }

        @media (max-width: 768px) {
          .animate-jump-mobile {
            animation: jump-mobile 4s infinite ease-in-out;
          }
        }

        @media (min-width: 769px) {
          .animate-jump-mobile {
            animation: none;
          }
        }

        .animate-blip {
          animation: blip 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};
