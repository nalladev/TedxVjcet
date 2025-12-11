'use client';

import React from 'react';
import { useMousePosition } from '@/app/hooks/useMousePosition';

export const Spotlight = () => {
  const { x, y } = useMousePosition();
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(230, 43, 30, 0.2), transparent 40%)`
      }}
    />
  );
};
