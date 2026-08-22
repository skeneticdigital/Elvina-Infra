'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Mail, Phone, Instagram, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', projectType: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  return (
    <main className="min-h-screen bg-[#071220] text-white selection:bg-[#1B4D89] selection:text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-neutral-300 font-light max-w-2xl mx-auto">
            Ready to discuss your next landmark project? Reach out to our engineering and architectural team.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* Top Row: Map & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Side: Google Map */}
            <div className="w-full min-h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-2xl border border-[#1B4D89]/30 relative group">
              <div className="absolute inset-0 bg-[#3B82F6]/10 pointer-events-none mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10" />
              <iframe 
                src="https://www.google.com/maps?q=Chennai&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(80%) contrast(120%)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0"
              ></iframe>
            </div>

            {/* Right Side: Contact Details */}
            <div className="bg-[#0E223D]/50 border border-[#1B4D89]/30 rounded-2xl p-8 backdrop-blur-sm flex flex-col justify-center h-full">
              <h3 className="text-xl font-bold uppercase tracking-wider mb-6 border-b border-[#1B4D89]/40 pb-4">Corporate Office</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#3B82F6]/10 p-3 rounded-lg border border-[#3B82F6]/20">
                    <MapPin className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1 uppercase tracking-wider">Location</h4>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">540 Vanguard Tower, Financial & Infrastructure Corridor<br/>Chennai, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-[#3B82F6]/10 p-3 rounded-lg border border-[#3B82F6]/20">
                      <Phone className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <div className="flex flex-col">
                      <p className="text-white font-bold mb-1">Phone</p>
                      <p className="text-sm text-neutral-400 font-mono">+91 63690 49059</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-[#3B82F6]/10 p-3 rounded-lg border border-[#3B82F6]/20">
                      <Mail className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <div className="flex flex-col">
                      <p className="text-white font-bold mb-1">Email</p>
                      <p className="text-sm text-neutral-400 font-mono">info@elvinainfra.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-2">
                  <div className="bg-[#E1306C]/10 p-3 rounded-lg border border-[#E1306C]/20">
                    <Instagram className="w-5 h-5 text-[#E1306C]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1 uppercase tracking-wider">Social</h4>
                    <a href="https://www.instagram.com/elvina_infra_pvt_ltd?igsi=MTAzcGU3b2RrYnh4Ng==" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 font-mono hover:text-[#E1306C] transition-colors">
                      @elvina_infra_pvt_ltd
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Contact Form */}
          <div className="w-full">
            <div className="bg-[#050C16] border border-[#1B4D89]/30 rounded-2xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
              {/* Success Overlay */}
              <div className={`absolute inset-0 bg-[#050C16] z-20 flex flex-col items-center justify-center transition-opacity duration-500 ${submitStatus === 'success' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Inquiry Sent!</h3>
                <p className="text-neutral-400 text-center max-w-sm">Thank you for reaching out. Our team will contact you shortly.</p>
              </div>

              <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 text-center">Send an Inquiry</h3>
              
              <form className="space-y-6 max-w-4xl mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Full Name *</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-[#0E223D]/50 border border-[#1B4D89]/40 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-[#0E223D]/50 border border-[#1B4D89]/40 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors" placeholder="+91 98765 43210" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Email Address *</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#0E223D]/50 border border-[#1B4D89]/40 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Project Type</label>
                    <input name="projectType" value={formData.projectType} onChange={handleChange} type="text" className="w-full bg-[#0E223D]/50 border border-[#1B4D89]/40 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors" placeholder="e.g., Commercial Tower" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Message *</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-[#0E223D]/50 border border-[#1B4D89]/40 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-[#3B82F6] transition-colors resize-none" placeholder="Tell us about your project requirements..."></textarea>
                </div>

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm font-mono text-center">
                    Failed to send inquiry. Please try again.
                  </div>
                )}

                <div className="pt-2">
                  <button disabled={isSubmitting} type="submit" className={`w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold uppercase tracking-widest text-sm py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                    {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
