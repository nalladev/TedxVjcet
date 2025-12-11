export interface ParallaxBackgroundProps {
  text: string;
  direction?: number;
  speed?: number;
  className?: string;
  opacity?: string;
  textColor?: string;
}

export interface Speaker {
  id: number;
  name: string;
  role: string;
  show_fullname?: boolean;
  gender: 'male' | 'female';
  description: string;
}

export interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

export interface FeatureCardProps {
  number: string;
  title: string;
  desc: string;
}

export interface Organizer {
  name: string;
  role: string;
  img: string;
}
