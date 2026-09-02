'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import TransparentLogo from './TransparentLogo';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/#services-section' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const hash = href.replace('/', '');
      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/') {
      if (window.location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // For other links like /about and /contact, let Next.js <Link> handle the routing naturally.
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 border-b border-[#3B82F6]/30 shadow-2xl backdrop-blur-md bg-[#112644]/40'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative">
            {/* Logo Only (Text Removed) */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="group flex items-center transition-transform duration-300 hover:scale-105"
                title="Elvina Infra"
              >
                <div className="relative w-14 h-14 flex items-center justify-center rounded-md">
                  <TransparentLogo className="object-contain w-full h-full scale-[1.2]" />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden md:flex flex-1 justify-center absolute inset-x-0 pointer-events-none">
              <nav className="flex items-center space-x-8 pointer-events-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-mono tracking-widest text-[#E2E8F0] hover:text-white transition-colors duration-200 uppercase relative group py-1 mx-2"
                    onClick={(e) => {
                      if (link.href.startsWith('/#') || (link.href === '/' && window.location.pathname === '/')) {
                        handleLinkClick(e, link.href);
                      }
                    }}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#3B82F6] transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-[#3B82F6]/30 text-white bg-[#0E223D]/80 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#071220]/95 backdrop-blur-2xl border-b border-[#3B82F6]/30 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-base font-mono tracking-widest text-[#E2E8F0] hover:text-[#3B82F6] transition-colors py-2 border-b border-white/10"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="flex items-center justify-center w-full py-3 text-xs font-bold tracking-widest text-white uppercase bg-[#3B82F6] rounded-lg shadow-lg"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
