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
  email: 'contact@tedxvjcet.example.com',
  phone: '+91 98765 43210',
  website: 'https://tedxvjcet.com',
  address: {
    venue: 'Viswajyothi College of Engineering & Technology',
    street: 'Vazhakulam, Muvattupuzha',
    city: 'Kerala 686670, India'
  },
  mapUrl: 'https://maps.app.goo.gl/S52rk41bxgKPRPP5A'
} as const;