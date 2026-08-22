'use client';

import React, { useRef, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CheckCircle2, Award, HardHat, Clock, ShieldCheck, Ruler, Home, Building2, Factory, Hammer, Key, Shield, Lightbulb, Search, Target, Handshake } from 'lucide-react';
import Image from 'next/image';

// Animation 1: Split Text Reveal (Simulated with simple stagger)
const splitTextContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};
const splitTextChild = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// Animation 3: Count Up Simulation
const Counter = ({ end, label, suffix = '' }: { end: number, label: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center p-6 bg-[#0E223D] border border-[#1B4D89]/30 rounded-2xl shadow-xl">
      <div className="text-4xl md:text-5xl font-black text-[#3B82F6] mb-2">{count}{suffix}</div>
      <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">{label}</div>
    </div>
  );
};

export default function AboutPage() {
  const heroRef = useRef(null);
  
  // Animation 2: Image Parallax
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(heroScroll, [0, 1], [1, 0]);

  // Approach Timeline
  const approachRef = useRef(null);
  const { scrollYProgress: approachScroll } = useScroll({ target: approachRef, offset: ["start center", "end center"] });
  const pathLength = useTransform(approachScroll, [0, 1], [0, 1]);

  return (
    <main className="min-h-screen bg-[#071220] text-white selection:bg-[#1B4D89] selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#071220]/80 via-[#071220]/50 to-[#071220] z-10" />
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?q=80&w=1920&auto=format&fit=crop"
            alt="Construction Hero"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <motion.div style={{ opacity: opacityText }} className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
          <motion.div variants={splitTextContainer} initial="hidden" animate="visible">
            <motion.h1 variants={splitTextChild} className="text-sm font-mono tracking-[0.3em] text-[#3B82F6] uppercase mb-6">
              About Elvina Infra
            </motion.h1>
            <motion.h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-tight">
              <span className="block overflow-hidden pb-4"><motion.span variants={splitTextChild} className="block">Building With</motion.span></span>
              <span className="block overflow-hidden pb-4"><motion.span variants={splitTextChild} className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#3B82F6]">Purpose.</motion.span></span>
              <span className="block overflow-hidden pb-4"><motion.span variants={splitTextChild} className="block mt-4 text-3xl md:text-5xl font-serif italic text-neutral-300 normal-case">Creating with precision.</motion.span></span>
            </motion.h2>
          </motion.div>
        </motion.div>
      </section>

      {/* AboutSection (David Elvira) */}
      <AboutSection variant="about" />

      {/* Our Story & Who We Are */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 bg-[#071220]">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h3 className="text-sm font-mono text-[#3B82F6] uppercase tracking-widest mb-4">Our Story</h3>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">From Ground Zero to Skylines.</h2>
          <p className="text-neutral-400 leading-relaxed mb-6">
            Elvina Infra was established with a singular vision: to bring uncompromised engineering quality to the modern construction landscape. What started as a specialized structural firm has rapidly grown into a full-scale infrastructure and luxury development powerhouse.
          </p>
          <p className="text-neutral-400 leading-relaxed">
            Over the years, we have achieved significant milestones, delivering landmark commercial towers and high-end residential complexes that redefine city skylines, combining robust monolithic substructures with breathtaking aesthetic facades.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
           <div className="absolute inset-0 bg-[#3B82F6]/20 blur-[100px] rounded-full" />
           <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-[#1B4D89]/30">
             <Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" alt="Our Team" fill className="object-cover" />
           </div>
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-[#050C16] border-y border-[#1B4D89]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-sm font-mono text-[#3B82F6] uppercase tracking-widest mb-4">What We Do</h3>
            <h2 className="text-3xl md:text-5xl font-bold">Comprehensive Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Residential Construction', icon: <Home /> },
              { title: 'Commercial Buildings', icon: <Building2 /> },
              { title: 'Industrial Construction', icon: <Factory /> },
              { title: 'Renovation & Remodeling', icon: <Hammer /> },
              { title: 'Civil & Structural Works', icon: <Ruler /> },
              { title: 'Turnkey Projects', icon: <Key /> }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-[#0E223D]/50 border border-[#1B4D89]/30 p-8 rounded-xl hover:bg-[#1B4D89]/20 transition-colors group"
              >
                <div className="text-[#3B82F6] mb-4 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-neutral-400">Delivering excellence with precision and robust engineering standards.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Numbers (Count Up) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Counter end={10} suffix="+" label="Years Experience" />
          <Counter end={50} suffix="+" label="Projects Completed" />
          <Counter end={100} suffix="%" label="Quality Commitment" />
          <Counter end={95} suffix="%+" label="Client Satisfaction" />
        </div>
      </section>

      {/* Our Approach (Scroll Timeline) */}
      <section ref={approachRef} className="py-32 bg-[#050C16] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h3 className="text-sm font-mono text-[#3B82F6] uppercase tracking-widest mb-4">Our Approach</h3>
            <h2 className="text-3xl md:text-5xl font-bold">The Elvina Methodology</h2>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* The Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#1B4D89]/30 -translate-x-1/2 rounded-full overflow-hidden">
              <motion.div style={{ scaleY: pathLength, transformOrigin: 'top' }} className="w-full h-full bg-[#3B82F6]" />
            </div>

            {/* Steps */}
            {[
              { step: '01', title: 'Plan', desc: 'Comprehensive site analysis, architectural feasibility, and robust project scheduling.' },
              { step: '02', title: 'Design', desc: 'BIM modeling, structural engineering, and sustainable material selection.' },
              { step: '03', title: 'Build', desc: 'Execution with precision, safety protocols, and rigorous structural integrity.' },
              { step: '04', title: 'Inspect', desc: 'Multi-stage quality assurance, acoustic testing, and safety compliance checks.' },
              { step: '05', title: 'Deliver', desc: 'Turnkey handover with complete documentation and facility management briefing.' }
            ].map((item, i) => (
              <div key={item.step} className={`relative flex items-center justify-between mb-16 md:mb-24 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#0E223D] border-2 border-[#3B82F6] -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <div className="w-full pl-12 md:pl-0 md:w-5/12">
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-[#0E223D]/80 border border-[#1B4D89]/40 p-6 rounded-2xl shadow-xl backdrop-blur-sm"
                  >
                    <span className="text-3xl font-black text-[#1B4D89]/50 absolute -top-4 -right-2">{item.step}</span>
                    <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                    <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Values */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="text-sm font-mono text-[#3B82F6] uppercase tracking-widest mb-4">Why Choose Elvina Infra</h3>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Excellence Engineered.</h2>
          <p className="max-w-2xl mx-auto text-neutral-400 text-lg">
            We don't just build structures; we build trust through uncompromised quality, transparent processes, and innovative engineering.
          </p>
        </div>

        {/* Mission & Vision Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#050C16] border border-[#1B4D89]/30 p-8 md:p-12 rounded-2xl shadow-2xl shadow-[#0E223D]/50 relative overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
            <h4 className="font-black text-white mb-6 text-3xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                <Target className="w-6 h-6" />
              </div>
              Our Mission
            </h4>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Our mission is to deliver high-quality, safe, and reliable construction projects across government and private sectors. We are committed to maintaining strong engineering standards, transparent practices, timely project completion, and cost-effective solutions while building lasting relationships with our clients.
            </p>
          </div>
          
          <div className="bg-[#050C16] border border-[#1B4D89]/30 p-8 md:p-12 rounded-2xl shadow-2xl shadow-[#0E223D]/50 relative overflow-hidden group hover:border-[#3B82F6]/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3B82F6] to-transparent"></div>
            <h4 className="font-black text-white mb-6 text-3xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                <Lightbulb className="w-6 h-6" />
              </div>
              Our Vision
            </h4>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Our vision is to become a trusted and leading construction company recognized for quality, integrity, innovation, and excellence. We aim to create durable infrastructure and modern spaces that contribute to sustainable development and deliver long-term value to our clients and communities.
            </p>
          </div>
        </div>

        {/* Core Values 6 Boxes Grid */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-bold uppercase tracking-widest text-white/80">Our Core Values</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: 'Integrity', icon: <Shield /> },
            { name: 'Quality', icon: <Award /> },
            { name: 'Safety', icon: <HardHat /> },
            { name: 'Innovation', icon: <Lightbulb /> },
            { name: 'Transparency', icon: <Search /> },
            { name: 'Commitment', icon: <Handshake /> }
          ].map((value, i) => (
            <motion.div
              key={value.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#0E223D] border border-[#1B4D89]/30 py-8 px-4 rounded-xl flex flex-col items-center justify-center text-center shadow-lg hover:bg-[#1B4D89]/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-[#3B82F6]/20 flex items-center justify-center mb-4 text-[#3B82F6] group-hover:scale-110 group-hover:bg-[#3B82F6]/30 transition-all">
                {React.cloneElement(value.icon as React.ReactElement, { className: 'w-7 h-7' })}
              </div>
              <span className="font-bold text-sm tracking-wider uppercase text-neutral-200">{value.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects (Clip Path Reveal) */}
      <section className="py-24 bg-[#050C16] border-y border-[#1B4D89]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-sm font-mono text-[#3B82F6] uppercase tracking-widest mb-4">Portfolio</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Driving Progress Through Infrastructure.</h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                With a strong emphasis on government projects and road contracts, Elvina Infra has successfully delivered numerous large-scale infrastructure developments. Our portfolio is a testament to our commitment to national growth, structural integrity, and timely project execution in the public sector.
              </p>
              <ul className="space-y-4 mb-8 text-sm font-mono text-neutral-300">
                <li className="flex items-center space-x-3"><Target className="w-4 h-4 text-[#3B82F6]" /><span>Major Government Contracts</span></li>
                <li className="flex items-center space-x-3"><Target className="w-4 h-4 text-[#3B82F6]" /><span>National Highway Expansions</span></li>
                <li className="flex items-center space-x-3"><Target className="w-4 h-4 text-[#3B82F6]" /><span>State Infrastructure Development</span></li>
              </ul>
              <a href="/services" className="text-[#3B82F6] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors flex items-center space-x-2">
                <span>View All Projects</span>
                <span className="text-lg">→</span>
              </a>
            </motion.div>

            {/* Right Images */}
            <div className="grid grid-cols-1 gap-8">
              {[
                { name: 'National Highway Phase II', img: 'https://images.unsplash.com/photo-1503708928676-1cb796a0891e?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8aGlnaHdheSUyMGNvbnN0cnVjdGlvbnxlbnwwfHx8fDE3ODc2MzcyMTZ8MA&ixlib=rb-4.1.0' },
                { name: 'Coastal Bridge Infrastructure', img: 'https://images.unsplash.com/photo-1529792083865-d23889753466?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8aGlnaHdheSUyMGNvbnN0cnVjdGlvbnxlbnwwfHx8fDE3ODc2MzcyMTZ8MA&ixlib=rb-4.1.0' }
              ].map((proj, i) => (
                <motion.div
                  key={proj.name}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.2 }}
                  className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group shadow-2xl border border-[#1B4D89]/30"
                >
                  <Image src={proj.img} alt={proj.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                    <h3 className="text-2xl font-bold text-white">{proj.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-8">
            Let's Build Something <br/><span className="text-[#3B82F6]">That Lasts.</span>
          </h2>
          <a href="/contact" className="inline-flex items-center px-8 py-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold rounded-lg uppercase tracking-widest transition-colors shadow-lg shadow-[#3B82F6]/30">
            Start Your Project
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
