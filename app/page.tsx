'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import ConstructionSequence from '@/components/ConstructionSequence';
import ServicesSection from '@/components/ServicesSection';
import ProjectShowcase from '@/components/ProjectShowcase';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#071220] text-white selection:bg-[#1B4D89] selection:text-white">
      {/* Fixed Luxury Architectural Header */}
      <Navbar />

      {/* 1. Hero Construction Scrollytelling Sequence (In-Place 50 Frames) */}
      <ConstructionSequence />

      {/* About Section / Founder Vision */}
      <AboutSection />

      {/* 2. "OUR SERVICES" Interactive Expanding Accordion Gallery */}
      <ServicesSection />

      {/* 3. "PROJECT SHOWCASE" Filtering Gallery */}
      <ProjectShowcase />

      {/* FAQ Section */}
      <FAQSection />

      {/* 3. Global Luxury Brand Footer */}
      <Footer />
    </main>
  );
}
