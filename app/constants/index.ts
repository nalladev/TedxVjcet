import { Speaker } from "../types";
import speakersData from '@/app/data/revealed-speakers.json';

// Event Configuration
export const EVENT_DATE = new Date('2026-01-03T00:00:00.000Z');

// Event Details
export const EVENT_INFO = {
  date: EVENT_DATE,
  name: 'TEDxVJCET',
  location: 'Kerala, India',
  venue: 'VJCET Campus',
} as const;

// Countdown Labels
export const COUNTDOWN_LABELS = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
} as const;

// Theme Colors
export const THEME_COLORS = {
  primary: '#e62b1e',
  background: '#050505',
  text: '#ffffff',
  textMuted: '#666666',
  accent: '#333333',
} as const;

// Contact Information
export const CONTACT_INFO = {
  email: 'tedx@vjcet.org',
  phone: '+91 87149 30113',
  phone2: '+91 95264 94491',
  website: 'https://tedxvjcet.in',
  address: {
    venue: 'Viswajyothi College of Engineering & Technology',
    street: 'Vazhakulam, Muvattupuzha',
    city: 'Kerala 686670, India'
  },
  mapUrl: 'https://maps.app.goo.gl/S52rk41bxgKPRPP5A'
} as const;

// Export speakers data (safe for client)
export const speakers = speakersData as Speaker[];

// Calculate speaker counts
const revealedCount = speakers.filter(speaker =>
  speaker.name !== `SPEAKER ${speaker.id}` && speaker.role !== 'TO BE REVEALED'
).length;

export const speakerCounts = {
  total: speakers.length,
  revealed: revealedCount,
  unrevealed: speakers.length - revealedCount
};
