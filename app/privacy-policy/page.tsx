import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#071220] text-white selection:bg-[#1B4D89] selection:text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white uppercase tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-neutral-300 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p>At Elvina Infra Pvt Ltd, we prioritize your privacy. We may collect personal information such as your name, email address, phone number, and company details when you fill out our contact forms, request tenders, or inquire about our construction services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p>The information we collect is used to respond to your inquiries, provide architectural consulting, send project updates, and improve our website's user experience. We do not sell or share your data with third-party marketers.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. However, no digital transmission over the internet or electronic storage system is 100% secure. We strive to use commercially acceptable means to protect your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">4. Cookies & Tracking</h2>
            <p>Our website may use cookies to enhance navigation and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect the functionality of certain site features.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">5. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact our corporate office at contact@elvinainfra.com.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
