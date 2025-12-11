"use client";

import React, { useState, useEffect } from "react";

interface ScrollIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  isPageLoaded: boolean;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  containerRef,
  scrollContainerRef,
  isPageLoaded,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !scrollContainerRef?.current || !isPageLoaded) return;

    const handleScroll = () => {
      if (!containerRef.current || !scrollContainerRef?.current) return;

      const container = containerRef.current;
      
      // Get container position relative to viewport
      const containerRect = container.getBoundingClientRect();
      const containerBottom = containerRect.bottom;
      const screenBottom = window.innerHeight;

      // Hide indicator when container bottom reaches or passes screen bottom
      setIsVisible(containerBottom > screenBottom);
    };

    // Initial check
    handleScroll();

    // Add scroll listener to the scroll container
    const currentScrollContainer = scrollContainerRef.current;
    currentScrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      currentScrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, scrollContainerRef, isPageLoaded]);

  if (!isPageLoaded || !isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center cursor-pointer z-50"
        style={{ animation: "fadeIn 1s ease-out" }}
      >
        <div className="mb-2 text-sm text-gray-300 font-light tracking-wide">
          Scroll to explore
        </div>
        <div
          className="w-8 h-8 flex items-center justify-center"
          style={{ animation: "bounce 2s infinite" }}
        >
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(5px);
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