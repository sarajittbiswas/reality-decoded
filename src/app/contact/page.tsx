"use client";

import { useState } from 'react';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

// Initialize the premium font
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ContactPage() {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // State for button loading/success UI
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 1. TRANSMIT TO CLOUDFLARE D1 DATABASE
      const dbRequest = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 2. TRANSMIT TO FORMSPREE (Email Notification)
      // IMPORTANT: Replace the URL below with your actual Formspree endpoint
      const emailRequest = fetch('https://formspree.io/f/xykqawpo', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Fire both requests at the exact same time
      const [dbResponse, emailResponse] = await Promise.all([dbRequest, emailRequest]);

      if (dbResponse.ok && emailResponse.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset button after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        // If one succeeds but the other fails
        setStatus('idle');
        alert("Transmission partially failed. Please check your connection and try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Network error. Transmission failed.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      
      {/* SCROLL ANIMATION STYLES */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .scroll-reveal {
          animation: fade-in-up 1s ease-out both;
          animation-timeline: view();
          animation-range: entry 5% cover 20%;
        }
        .load-reveal {
          animation: fade-in-up 1s ease-out forwards;
        }
        @supports not (animation-timeline: view()) {
          .scroll-reveal {
            animation: fade-in-up 1s ease-out forwards;
          }
        }
      `}</style>

      {/* HEADER SECTION */}
      <section className="relative w-full pt-40 pb-16 px-6 load-reveal flex flex-col items-center text-center">
        {/* Ambient Purple Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-64 bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="mb-4 inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold uppercase tracking-widest border border-purple-500/20">
            Establish Connection
          </span>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white`}>
            Secure <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              Channels
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Whether you have a story that needs to be told, leaked data that needs analyzing, or just want to collaborate—this is how you reach the syndicate.
          </p>
        </div>
      </section>

      {/* CONTACT GRID & FORM SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pb-40 z-10 scroll-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT SIDE: Contact Methods */}
          <div className="flex flex-col gap-6">
            
            {/* Secure Tip Line Card (ACTIVATED) */}
            <article className="group relative bg-[#111111]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-red-500/50 to-transparent transition-colors duration-500"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-500">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <div>
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors`}>Secure Tip Line</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    For whistleblowers and highly sensitive information. Download our PGP public key to encrypt your transmission before emailing.
                  </p>
                  <div className="flex gap-4">
                    {/* Link to download your PGP key (Place a file named public-key.asc in your public folder) */}
                    <a href="/public-key.asc" download className="text-red-500 text-sm font-bold hover:text-red-400 transition-colors flex items-center gap-1">
                      Download PGP Key <span>&darr;</span>
                    </a>
                    <a href="mailto:secure@realitydecoded.com" className="text-gray-500 text-sm font-bold hover:text-white transition-colors">
                      secure@realitydecoded.com
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* General Inquiries Card */}
            <article className="group relative bg-[#111111]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors`}>General Inquiries</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Questions about our investigations, feedback on recent videos, or ideas for future stories.
                  </p>
                  <a href="mailto:info@realitydecoded.com" className="text-purple-400 text-sm font-bold hover:text-purple-300 transition-colors">
                    info@realitydecoded.com
                  </a>
                </div>
              </div>
            </article>

            {/* Press & Partnerships Card */}
            <article className="group relative bg-[#111111]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-blue-500/50 to-transparent transition-colors duration-500"></div>
              <div className="flex items-start gap-6 relative z-10">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"></path></svg>
                </div>
                <div>
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors`}>Press & Media</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    For interview requests, media syndication, or collaboration with other creators.
                  </p>
                  <a href="mailto:press@realitydecoded.com" className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors">
                    press@realitydecoded.com
                  </a>
                </div>
              </div>
            </article>

          </div>

          {/* RIGHT SIDE: Direct Message Form (NOW CONNECTED) */}
          <div className="relative bg-[#111111]/50 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl h-fit">
            
            <h2 className={`${spaceGrotesk.className} text-3xl font-bold text-white mb-8`}>
              Send a Transmission
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Input Group: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-bold text-gray-400 uppercase tracking-wider">Alias / Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="secure@proton.me"
                    className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Input Group: Subject */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Regarding the latest investigation..."
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300"
                />
              </div>

              {/* Input Group: Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-bold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea 
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Enter your transmission here..."
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                ></textarea>
              </div>

              {/* Submit Button (Animated states based on status) */}
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="
                  group relative inline-flex items-center justify-center w-full sm:w-auto self-start mt-4
                  px-10 py-4 rounded-full font-bold text-lg tracking-wide
                  bg-white text-red-600
                  transition-all duration-300 ease-out
                  hover:bg-black hover:text-red-500 hover:scale-105
                  hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]
                  active:scale-95 disabled:opacity-50 disabled:pointer-events-none
                  border border-transparent hover:border-purple-500/50
                "
              >
                {status === 'idle' && (
                  <>
                    Transmit Message
                    <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
                {status === 'submitting' && 'Encrypting...'}
                {status === 'success' && 'Transmission Sent ✓'}
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  );
}