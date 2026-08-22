'use client';

import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';
import TransparentLogo from './TransparentLogo';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
                    className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm font-light inline-block relative group"
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
                  className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm font-light inline-block relative group"
                >
                  Terms & Conditions
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy-policy"
                  className="text-neutral-400 hover:text-white transition-colors duration-300 text-sm font-light inline-block relative group"
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
              <li className="flex items-start space-x-3 text-neutral-400 text-sm font-light leading-relaxed group cursor-pointer">
                <MapPin className="w-4 h-4 mt-1 text-[#3B82F6] group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>540 Vanguard Tower, Financial & Infrastructure Corridor</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-400 text-sm font-light group cursor-pointer">
                <Mail className="w-4 h-4 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors">contact@elvinainfra.com</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-400 text-sm font-light group cursor-pointer">
                <Phone className="w-4 h-4 text-[#3B82F6] group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-white transition-colors font-mono">+91 (044) 4000-ELVN</span>
              </li>
              <li className="flex items-center space-x-3 text-neutral-400 text-sm font-light group cursor-pointer">
                <Instagram className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <a href="https://www.instagram.com/elvina_infra_pvt_ltd?igsi=MTAzcGU3b2RrYnh4Ng==" target="_blank" rel="noopener noreferrer" className="group-hover:text-white transition-colors font-mono">
                  @elvina_infra_pvt_ltd
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1B4D89]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs text-neutral-500 font-mono flex items-center space-x-6">
            <span>© 2026 Elvina Infra Pvt Ltd. All Rights Reserved.</span>
          </div>

          <div className="flex items-center space-x-8 text-xs font-mono">
            <span className="text-neutral-500">Crafted by <a href="https://skeneticdigital.com" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:text-white transition-colors">skeneticdigital</a></span>
            <button 
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-[#3B82F6] hover:text-white transition-colors px-4 py-2 border border-[#3B82F6]/30 hover:border-[#3B82F6] rounded-md bg-[#0E223D]/50"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
