import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#071220] text-white selection:bg-[#1B4D89] selection:text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white uppercase tracking-tight">Terms & Conditions</h1>
        
        <div className="space-y-8 text-neutral-300 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>Welcome to Elvina Infra Pvt Ltd. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. Construction & Architectural Services</h2>
            <p>All information provided on this website is for general informational purposes. Elvina Infra reserves the right to modify project specifications, pricing, and availability without prior notice. Any final contractual agreements for construction or architectural services will supersede the information presented on this digital platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Intellectual Property</h2>
            <p>All content, architectural blueprints, digital twin models, text, graphics, logos, and images on this website are the intellectual property of Elvina Infra Pvt Ltd unless otherwise noted. Unauthorized reproduction, distribution, or use of these materials is strictly prohibited.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
            <p>Elvina Infra Pvt Ltd shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, or use of, the website or our construction consulting services prior to a formal signed agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Governing Law</h2>
            <p>These terms shall be governed and construed in accordance with the laws of the jurisdiction in which Elvina Infra Pvt Ltd operates, without regard to its conflict of law provisions.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
