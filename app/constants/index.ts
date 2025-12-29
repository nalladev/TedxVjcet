import { Speaker } from "../types";
import speakersData from '@/app/data/revealed-speakers.json';

// Shared Configuration
const SHARED = {
  urls: {
    instagram: "https://www.instagram.com/tedxvjcet/",
    linkedin: "https://www.linkedin.com/company/tedxvjcet",
    website: "https://www.tedxvjcet.in",
  },
};

export const LOCATION = {
  venue: "Viswajyothi College of Engineering & Technology",
  street: "Vazhakulam, Muvattupuzha",
  state: "Kerala",
  pincode: "686670",
  country: "India",
  map: "https://maps.app.goo.gl/S52rk41bxgKPRPP5A",
  directions: "Located 8km from Muvattupuzha, easily accessible by road. Free parking available on campus."
};

// Export for metadata
export const METADATA = {
  ...SHARED.urls,
  date: new Date("2026-01-03T00:00:00.000Z"),
  venue: LOCATION.venue,
  street: LOCATION.street,
};

// Export for contact information
export const CONTACT = {
  ...SHARED.urls,
  email: "tedx@vjcet.org",
  phone: "+91 87149 30113",
  phone2: "+91 95264 94491",
  map: LOCATION.map,
  address: `${LOCATION.venue}, ${LOCATION.street}, ${LOCATION.state} ${LOCATION.pincode}, ${LOCATION.country}`,
  ted: "https://www.ted.com/tedx/events/64560",
  makeMyPass: "https://makemypass.com/event/tedx-vjcet",
  date: METADATA.date,
};

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

export const SPONSORS_DATA = {
  title: [
    { name: 'Santa Monica Study Abroad', website: 'https://santamonicaedu.in/', image: '/sponsors/curated/santamonica.png', isTitle: true },
  ],
  platinum: [
    { name: 'Sowthzide Games', website: '#', image: '/sponsors/curated/sowthzide.png' },
  ],
  bronze: [
    { name: 'Joance Regency', website: 'https://joanceregency.com/', image: '/sponsors/curated/joance.png' },
    { name: 'Digiora', website: 'https://www.digiora.com/', image: '/sponsors/curated/digiora.png' },
  ],
  inKind: [
    { name: 'OHCO Chocolate', website: 'https://ohco.in/', image: '/sponsors/curated/ohco-a.png' },
    { name: 'Kottaram Sweet House', website: 'https://www.kottaramsweets.com/', image: '/sponsors/curated/kottaram-a.png' },
  ],
};
