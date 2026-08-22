'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What types of construction projects do you handle?",
    answer: "We specialize in a wide range of projects including luxury residential complexes, commercial high-rises, industrial facilities, turnkey projects, and comprehensive civil and structural works. Our team is equipped to handle both ground-up construction and large-scale remodeling."
  },
  {
    question: "How do you ensure the quality and safety of your projects?",
    answer: "Safety and quality are our top priorities. We adhere to strict international safety standards, use premium-grade materials, and employ advanced construction methodologies. Every project undergoes rigorous quality control inspections at every stage of the build process."
  },
  {
    question: "Do you provide end-to-end turnkey solutions?",
    answer: "Yes, our turnkey solutions cover everything from initial architectural planning and structural design to construction, interior finishing, and final handover. We manage the entire lifecycle of the project so you can have a hassle-free experience."
  },
  {
    question: "How long does a typical commercial construction project take?",
    answer: "Project timelines vary significantly based on scale, complexity, and requirements. A standard commercial building might take anywhere from 12 to 24 months. During the consultation phase, we provide a detailed, realistic timeline and stick to strict milestone deliveries."
  },
  {
    question: "Are you equipped to handle sustainable and green building requirements?",
    answer: "Absolutely. We are committed to eco-friendly construction practices. We integrate sustainable materials, energy-efficient designs, and waste-reduction methodologies to ensure your building meets modern green certifications."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#050C16] border-t border-[#1B4D89]/30">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h3 className="text-sm font-mono text-[#3B82F6] uppercase tracking-widest mb-4">Have Questions?</h3>
          <h2 className="text-3xl md:text-5xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-[#1B4D89]/40 rounded-xl overflow-hidden bg-[#0E223D]/50 backdrop-blur-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <h4 className="text-lg font-semibold pr-8">{faq.question}</h4>
                <div className="flex-shrink-0 text-[#3B82F6]">
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-neutral-400 leading-relaxed border-t border-[#1B4D89]/20 pt-4 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
