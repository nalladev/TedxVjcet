'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const TedxLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);
  const xRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (logoRef.current && pathRefs.current.every((ref) => ref) && xRef.current && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
        },
      });
      gsap.set(pathRefs.current, { opacity: 0 });
      pathRefs.current.forEach((path) => {
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
            fill: "none",
            stroke: "#EE2922",
          });

          tl.to(path, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.inOut",
          });
          tl.to(path, { fill: "#EE2922", duration: 0.3 }, "-=0.1");
        }
      });

      // Get the bounding box of the X
      const xBBox = xRef.current.getBBox();

      // Calculate new viewBox values to zoom into X while keeping it centered
      const zoomScale = 0.4; // Adjust this value to control the zoom level (smaller = more zoom)
      const newWidth = xBBox.width / zoomScale;
      const newHeight = xBBox.height / zoomScale;
      const newX = xBBox.x - (newWidth - xBBox.width) / 2;
      const newY = xBBox.y - (newHeight - xBBox.height) / 2;

      // Zoom into X using viewBox animation
      tl.to(logoRef.current, {
        attr: { viewBox: `${newX} ${newY} ${newWidth} ${newHeight}` },
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Change background to red and X to black
      tl.to(containerRef.current, { backgroundColor: "#EE2922", duration: 0.5 }, "-=0.5");
      tl.to(xRef.current, { fill: "black", duration: 0.5 }, "-=0.5");
    }
  }, []);

  return (
    <div ref={containerRef} className="flex items-center justify-center h-screen w-screen bg-black overflow-hidden">
      <svg
        ref={logoRef}
        viewBox="0 0 276 198" // Original viewBox
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto max-w-screen-lg mx-auto" // Ensure SVG is responsive and centered
      >
        {/* Original paths */}
        <path ref={(el) => (pathRefs.current[0] = el)} d="M45.1,83.3H27V66.7h56v16.5H64.9v48H45.1V83.3z" />
        <path ref={(el) => (pathRefs.current[1] = el)} d="M86.1,66.7h54.4v16.5H106v8h34.5v15.4H106v8h34.5v16.5H86.1V66.7z" />
        <path
          ref={(el) => (pathRefs.current[2] = el)}
          d="M163.7,114.7h7.8c12.4,0,14.2-10,14.2-16.1c0-4.1-1.3-15.3-15.6-15.3h-6.3V114.7z M143.8,66.7h32.6
          c21.5,0,29.1,15.9,29.1,32.2c0,19.8-10.5,32.3-33,32.3h-28.7V66.7z"
        />
        <path
          ref={(el) => {
            pathRefs.current[3] = el;
            xRef.current = el;
          }}
          d="M234.1,106.4L228,96.3l-5.9,10.1h-14.6L221.3,86L208,66.6h14.6l5.4,9.6l5.5-9.6h14.6L234.8,86l13.8,20.3H234.1z"
        />
      </svg>
    </div>
  );
};
