'use client';

import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';
import TransparentLogo from './TransparentLogo';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#112644] border-t border-[#1B4D89]/20 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0E223D]/5 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-[-1]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20">
          
          {/* Brand & Identity */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-xl">
              <TransparentLogo className="object-contain w-full h-full scale-[1.2]" />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed font-light max-w-[250px]">
              Pioneering modern architecture and sustainable landmark construction across commercial and residential horizons.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm mb-6 flex items-center space-x-2">
              <span className="w-1 h-4 bg-[#3B82F6]"></span>
              <span>QUICK LINKS</span>
            </h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-neutral-300 hover:text-white transition-colors duration-300 text-base font-light inline-block relative group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm mb-6 flex items-center space-x-2">
              <span className="w-1 h-4 bg-[#3B82F6]"></span>
              <span>LEGAL</span>
            </h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/terms-and-conditions"
                  className="text-neutral-300 hover:text-white transition-colors duration-300 text-base font-light inline-block relative group"
                >
                  Terms & Conditions
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy-policy"
                  className="text-neutral-300 hover:text-white transition-colors duration-300 text-base font-light inline-block relative group"
                >
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Office */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-sm mb-6 flex items-center space-x-2">
              <span className="w-1 h-4 bg-[#3B82F6]"></span>
              <span>CORPORATE OFFICE</span>
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3 text-neutral-300 text-base font-light leading-relaxed group cursor-pointer">
                <MapPin className="w-5 h-5 mt-0.5 text-[#3B82F6] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>540 Vanguard Tower, Financial & Infrastructure Corridor</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-300 text-base font-light group cursor-pointer">
                <Mail className="w-5 h-5 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">info@elvinainfra.com</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-300 text-base font-light group cursor-pointer">
                <Phone className="w-5 h-5 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors font-mono">+91 6369049059</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-300 text-base font-light group cursor-pointer">
                <Instagram className="w-5 h-5 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <a href="https://www.instagram.com/elvina_infra_pvt_ltd?igsi=MTAzcGU3b2RrYnh4Ng==" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors font-mono">
                  @elvina_infra_pvt_ltd
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-10 border-t border-[#1B4D89]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-neutral-400 font-mono flex items-center space-x-6 text-center md:text-left">
            <span>© 2026 Elvina Infra Pvt Ltd. All Rights Reserved.</span>
          </div>

          <div className="flex items-center space-x-8 text-sm font-mono md:pr-24">
            <span className="text-neutral-400">Crafted by <a href="https://skeneticdigital.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#3B82F6] transition-colors font-bold">skeneticdigital</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
