'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-01-03T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-600 flex items-center justify-center p-4 font-inter">
      <div className="text-center max-w-4xl mx-auto">
        {/* TEDx Logo/Branding */}
        <div className="mb-8">
          <Image
            src="/tedx/logo-black.png"
            alt="TEDx VJCET Logo"
            width={400}
            height={120}
            priority
            className="mx-auto"
          />
        </div>

        {/* Main Message */}
        <div className="space-y-8 mb-8">
          <h2 className="text-4xl md:text-5xl font-extralight text-gray-800 leading-tight tracking-wide">
            Ideas ❤️ Worth
            <span className="block text-red-700 font-bold">Spreading</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
            Something extraordinary is coming to VJCET.
            <span className="block mt-2 text-red-700 font-medium">Stay tuned for an unforgettable experience.</span>
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="text-lg text-gray-700 mb-4 font-medium">Event Date: January 3rd, 2026</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
            <div className="bg-white/20 backdrop-blur-sm border border-red-600/30 rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-red-700">{timeLeft.days}</div>
              <div className="text-sm text-gray-600 font-medium">Days</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-red-600/30 rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-red-700">{timeLeft.hours}</div>
              <div className="text-sm text-gray-600 font-medium">Hours</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-red-600/30 rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-red-700">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-600 font-medium">Minutes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-red-600/30 rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-red-700">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-600 font-medium">Seconds</div>
            </div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-3 bg-white/30 border border-red-600/50 rounded-full px-8 py-4 backdrop-blur-sm mb-8">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <span className="text-red-800 font-semibold text-lg tracking-wide">Website Coming Soon</span>
        </div>

        {/* Social Media Link */}
        <div className="mb-16">
          <a
            href="https://www.instagram.com/tedxvjcet/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow us on Instagram
          </a>
        </div>

        {/* Footer */}
        <div className="mt-20 text-gray-600 text-sm font-light">
          <p>Viswajyothi College of Engineering and Technology</p>
          <p className="mt-1">Get ready to be inspired</p>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/3 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
