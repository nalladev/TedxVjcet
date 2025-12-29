'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ParallaxBackgroundProps } from '@/app/types';

export const ParallaxBackground = ({ 
  text, 
  direction = 1, 
  speed = 0.2, 
  className = "", 
  opacity = "opacity-[0.03]", 
  textColor = "text-white" 
}: ParallaxBackgroundProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setCurrentSpeed(isMobile ? speed * 2 : speed);
    };

    handleResize(); // Set initial speed
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [speed]);

  useEffect(() => {
    if (!ref.current) return;

    // 1️⃣ Intersection Observer for visibility detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !ref.current || !textRef.current) return;

    let rafId: number;

    // 2️⃣ rAF-based scroll progress mapping
    const updateParallax = () => {
      if (!ref.current || !textRef.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through this section
      const progress = Math.min(
        1,
        Math.max(
          0,
          (viewportHeight - rect.top) / (viewportHeight + rect.height)
        )
      );

      // Map progress to horizontal movement
      const maxOffset = window.innerWidth * 0.8 * currentSpeed;
      const offset = progress * maxOffset * direction;

      // Use transform for GPU acceleration
      textRef.current.style.transform = `translateX(${offset}px)`;

      rafId = requestAnimationFrame(updateParallax);
    };

    rafId = requestAnimationFrame(updateParallax);

    return () => cancelAnimationFrame(rafId);
  }, [isVisible, direction, currentSpeed]);

  return (
    <div ref={ref} className={`absolute inset-0 flex items-center pointer-events-none overflow-hidden z-0 ${className} ${direction > 0 ? 'justify-start' : 'justify-end'}`}>
      <span
        ref={textRef}
        className={`text-[25vw] font-bold-display whitespace-nowrap will-change-transform leading-none ${textColor} ${opacity}`}
      >
        {text}
      </span>
    </div>
  );
};