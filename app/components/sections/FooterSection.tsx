'use client';

import React from 'react';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';
import { SiInstagram, SiLinkedin, SiTed } from 'react-icons/si';
import { CONTACT_INFO } from '@/app/constants';

export const FooterSection = () => {
  return (
    <footer id="footer" className="relative bg-black text-red-500 py-16 overflow-hidden z-5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-anton tracking-tight mb-6">GET IN TOUCH</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="mt-1 shrink-0" />
                <div className='text-white'>
                  <p className="font-tech text-sm font-bold mb-1">VENUE</p>
                  <p className="text-sm leading-relaxed">
                    {CONTACT_INFO.address.venue}<br />
                    {CONTACT_INFO.address.street}<br />
                    {CONTACT_INFO.address.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={20} className=" mt-1 shrink-0" />
                <div className='text-white'>
                  <p className="font-tech text-sm font-bold mb-1">EMAIL</p>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm hover:text-red-500 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={20} className=" mt-1 shrink-0" />
                <div className='text-white'>
                  <p className="font-tech text-sm font-bold mb-1">CONTACT</p>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm hover:text-red-500 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>,
                  <a href={`tel:${CONTACT_INFO.phone2}`} className="text-sm hover:text-red-500 transition-colors">
                    {CONTACT_INFO.phone2}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Globe size={20} className=" mt-1 shrink-0" />
                <div className='text-white'>
                  <p className="font-tech text-sm font-bold mb-1">WEBSITE</p>
                  <a href={CONTACT_INFO.website} className="text-sm hover:text-red-500 transition-colors">
                    {CONTACT_INFO.website.replace('https://', '')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-anton tracking-tight mb-6">CONNECT</h3>

            <div className="space-y-4 text-white">
              <div>
                <p className="font-tech text-sm font-bold mb-3">FOLLOW US</p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/tedxvjcet/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow TEDxVJCET on Instagram"
                    className="p-3 bg-white/10 rounded-lg hover:bg-red-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <SiInstagram size={24} className="group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/tedxvjcet"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow TEDxVJCET on LinkedIn"
                    className="p-3 bg-white/10 rounded-lg hover:bg-red-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <SiLinkedin size={24} className="group-hover:text-white" />
                  </a>
                  <a
                    href="https://www.ted.com/tedx/events/64560"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit official TED website"
                    className="p-3 bg-white/10 rounded-lg hover:bg-red-500 hover:scale-110 transition-all duration-300 group"
                  >
                    <SiTed size={24} className="group-hover:text-white" />
                  </a>
                </div>
              </div>

              <div>
                <p className="font-tech text-sm font-bold mb-3">QUICK LINKS</p>
                <div className="space-y-2">
                  <a href="#about" className="block text-sm hover:text-red-500 transition-colors">About TEDxVJCET</a>
                  <a href="#countdown" className="block text-sm hover:text-red-500 transition-colors">Countdown</a>
                  <a href="#speakers" className="block text-sm hover:text-red-500 transition-colors">Our Speakers</a>
                  <a href="#registration" className="block text-sm hover:text-red-500 transition-colors">Registration</a>
                  <a href="#footer" className="block text-sm hover:text-red-500 transition-colors">Contact Us</a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-anton tracking-tight mb-6">FIND US</h3>

            <div className="relative">
              <div className="aspect-video bg-black/20 rounded-lg overflow-hidden border border-white/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d402.6394291724978!2d76.63135200786144!3d9.95089619388399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07dd2f17cb29c3%3A0x3fc041fde393bd!2sViswajyothi%20Institute%20Of%20Management%20Studies!5e1!3m2!1sen!2sin!4v1765213999316!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  title="Google Maps location of Viswajyothi College of Engineering & Technology"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="mt-4 p-4 bg-black/20 rounded-lg backdrop-blur-sm border border-white/10">
                <p className="font-tech text-xs font-bold mb-2">DIRECTIONS</p>
                <p className="text-xs leading-relaxed">
                  Located 25km from Ernakulam, easily accessible by road.
                  Free parking available on campus.
                </p>
                <a
                  href={CONTACT_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-white hover:text-red-500 transition-colors font-tech"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-anton text-lg mb-2">TEDxVJCET © {new Date().getFullYear()}</p>
            <p className="text-sm text-white/80 max-w-md pb-2"><span className='text-red-500'>X</span> = independently organized TED event</p>
            <p className="text-sm text-white/80 max-w-md">
              All content and ideas shared are those of the speakers.
            </p>
          </div>

          <div className="text-center md:text-right">
            <div className="inline-flex items-center gap-2 mb-4 border border-white/20 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              <span className="font-tech tracking-widest text-xs uppercase">Ideas Worth Spreading</span>
            </div>
            <p className="text-xs text-white/60 font-tech">
              Made with <span className="bg-white p-1 rounded-full text-red-500">❤️</span> for the TEDx community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
