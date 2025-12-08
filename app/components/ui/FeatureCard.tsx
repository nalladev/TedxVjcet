'use client';

import React from 'react';
import { FeatureCardProps } from '@/app/types';

export const FeatureCard = ({ number, title, desc }: FeatureCardProps) => (
  <div className="group flex gap-6 items-start p-6 border border-white/5 hover:bg-white/5 transition-all duration-300 hover:border-[#e62b1e]/50 rounded-lg">
    <div className="font-bold-display text-4xl text-gray-700 group-hover:text-[#e62b1e] transition-colors">{number}</div>
    <div>
      <h4 className="font-bold text-xl mb-2 tracking-wide text-white group-hover:translate-x-2 transition-transform">{title}</h4>
      <p className="text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
  </div>
);