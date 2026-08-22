'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Send, Sparkles, Building, Phone, Mail, MapPin } from 'lucide-react';
import { constructionData } from '@/data/construction';

export default function FinalSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Commercial / Residential Tower',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', projectType: 'Commercial / Residential Tower', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact-section"
      className="relative py-28 md:py-40 bg-neutral-950 text-white overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-construction-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Vision */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-construction-orange/40 bg-construction-orange/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-construction-orange" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-construction-orange uppercase">
                COMMISSION THE FUTURE
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.92] text-white">
              BUILT TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-construction-orange via-white to-architectural-gold">
                STAND OUT.
              </span>
            </h2>

            <p className="mt-6 text-lg sm:text-xl text-neutral-300 font-light max-w-xl leading-relaxed">
              {constructionData.finalCTA.subheading}
            </p>

            <p className="mt-4 text-sm text-neutral-400 font-light max-w-lg leading-relaxed">
              {constructionData.finalCTA.description}
            </p>

            {/* Quick Contact Badges */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <MapPin className="w-4 h-4 text-construction-orange shrink-0" />
                <span className="font-mono">540 Vanguard Blvd, NY</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Mail className="w-4 h-4 text-construction-orange shrink-0" />
                <span className="font-mono">contact@elvira-arch.com</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-neutral-300">
                <Phone className="w-4 h-4 text-construction-orange shrink-0" />
                <span className="font-mono">+1 (800) 555-ELVR</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Consultation Form */}
          <div className="lg:col-span-5">
            <div className="relative p-8 sm:p-10 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-2xl shadow-2xl">
              <div className="absolute top-0 right-0 p-6 pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-construction-orange animate-ping" />
              </div>

              <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
                Initiate Consultation
              </h3>
              <p className="text-xs text-neutral-400 mb-6 font-light">
                Direct channel to our principal architects and engineering directors.
              </p>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase">Inquiry Received</h4>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    Our lead structural architect will review your project requirements and respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-construction-orange transition-colors font-sans placeholder:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alexander@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-construction-orange transition-colors font-sans placeholder:text-neutral-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Development Scope
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-construction-orange transition-colors font-sans"
                    >
                      <option value="Commercial / Residential Tower">Commercial / Residential Tower</option>
                      <option value="Parametric High-Rise Superstructure">Parametric High-Rise Superstructure</option>
                      <option value="Bespoke Cultural / Civic Architecture">Bespoke Cultural / Civic Architecture</option>
                      <option value="Private Estate & Sky Villa Development">Private Estate & Sky Villa Development</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Brief Message / Site Location
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share estimated square footage, timeline, or site coordinates..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-construction-orange transition-colors font-sans placeholder:text-neutral-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-4 px-6 rounded-lg bg-construction-orange hover:bg-construction-orange-light text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-construction-orange/30 group"
                  >
                    <span>{constructionData.finalCTA.buttonText}</span>
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
