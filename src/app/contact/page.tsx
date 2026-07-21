"use client";

import { useState } from 'react';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function ContactPage() {
  // State to handle form inputs (Untouched)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Handle form submission (Untouched)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const dbRequest = fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const emailRequest = fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const [dbResponse, emailResponse] = await Promise.all([dbRequest, emailRequest]);

      if (dbResponse.ok && emailResponse.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
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
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

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
        <div className="relative z-10 max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            Establish Connection
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white`}>
            Secure <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 drop-shadow-sm">
              Channels
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you have a story that needs to be told, leaked data that needs analyzing, or just want to collaborate—this is how you reach the syndicate.
          </p>
        </div>
      </section>

      {/* CONTACT GRID & FORM SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pb-40 z-10 scroll-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* LEFT SIDE: Contact Methods */}
          <div className="flex flex-col gap-6">
            
            {[
              { title: 'Secure Tip Line', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', desc: 'For whistleblowers and highly sensitive information. Download our PGP public key to encrypt your transmission before emailing.', links: [{ href: '/public-key.asc', label: 'Download PGP Key ↓', download: true }, { href: 'mailto:admin@realitydecoded.in', label: 'admin@realitydecoded.in' }] },
              { title: 'General Inquiries', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', desc: 'Questions about our investigations, feedback on recent videos, or ideas for future stories.', links: [{ href: 'mailto:info@realitydecoded.in', label: 'info@realitydecoded.in' }, { href: 'mailto:hello@realitydecoded.in', label: 'hello@realitydecoded.in' }] },
              { title: 'Press & Media', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2', desc: 'For interview requests, media syndication, or collaboration with other creators.', links: [{ href: 'mailto:business@realitydecoded.in', label: 'business@realitydecoded.in' }] }
            ].map((method, idx) => (
              
              <article key={idx} className="relative group block w-full hover:-translate-y-1 transition-transform duration-500">
                {/* Background Beam */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-shadow duration-500 pointer-events-none">
                  {/* 🚨 BULLETPROOF FIX */}
                  <div className="absolute inset-[-150%] z-0 opacity-20 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.4)_100%)] animate-spin [animation-duration:6s] transition-opacity duration-500"></div>
                  <div className="absolute inset-[1px] bg-[#050505] rounded-[23px] z-10"></div>
                  <div className="absolute inset-[1px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 group-hover:border-transparent rounded-[23px] z-10 transition-colors duration-500"></div>
                </div>

                {/* Foreground */}
                <div className="relative p-6 sm:p-8 flex items-start gap-4 sm:gap-6 z-20">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black text-zinc-400 transition-all duration-500">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={method.icon}></path></svg>
                  </div>
                  <div className="w-full">
                    <h3 className={`${spaceGrotesk.className} text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors`}>{method.title}</h3>
                    <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed mb-4">
                      {method.desc}
                    </p>
                    <div className={`flex flex-col xl:flex-row items-start gap-3 xl:gap-5 ${jetBrainsMono.className} text-[10px] sm:text-xs font-bold uppercase tracking-widest`}>
                      {method.links.map((link, i) => (
                        <a key={i} href={link.href} download={link.download} className="text-zinc-300 hover:text-white transition-colors">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}

          </div>

          {/* RIGHT SIDE: Direct Message Form */}
          <div className="relative bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl h-fit">
            
            <h2 className={`${spaceGrotesk.className} text-3xl font-extrabold text-white mb-8 tracking-tight`}>
              Send a Transmission
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>Alias / Name</label>
                  <input 
                    type="text" id="name" value={formData.name} onChange={handleChange} required placeholder="John Doe"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>Email Address</label>
                  <input 
                    type="email" id="email" value={formData.email} onChange={handleChange} required placeholder="secure@proton.me"
                    className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>Subject</label>
                <input 
                  type="text" id="subject" value={formData.subject} onChange={handleChange} required placeholder="Regarding the latest investigation..."
                  className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>Message</label>
                <textarea 
                  id="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Enter your transmission here..."
                  className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="
                  group relative inline-flex items-center justify-center w-full sm:w-auto self-start mt-4
                  px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest
                  bg-white text-black
                  transition-all duration-300 ease-out
                  hover:bg-zinc-200 hover:scale-[1.02]
                  hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)]
                  active:scale-95 disabled:opacity-50 disabled:pointer-events-none
                "
              >
                {status === 'idle' && (
                  <>
                    Transmit Message
                    <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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