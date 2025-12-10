'use client';

import React from 'react';

interface SVGGridProps {
  opacity?: number;
  gridSize?: number;
  strokeWidth?: number;
  dotSize?: number;
  color?: string;
  className?: string;
}

export const SVGGrid: React.FC<SVGGridProps> = ({
  opacity = 0.2,
  gridSize = 60,
  strokeWidth = 0.8,
  dotSize = 1.5,
  color = 'rgba(230, 43, 30, 1)',
  className = ''
}) => {
  const dotColor = color.replace('1)', '0.6)');

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} style={{ opacity }}>
      <svg 
        className="w-full h-full" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern 
            id="grid-pattern"
            x="0" 
            y="0" 
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <rect 
              width={gridSize}
              height={gridSize}
              fill="transparent"
            />
            <path 
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none" 
              stroke={color}
              strokeWidth={strokeWidth}
            />
            <circle 
              cx="0" 
              cy="0" 
              r={dotSize}
              fill={dotColor}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
};