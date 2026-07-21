// src/components/Newsletter.tsx
"use client";
import { useState } from 'react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // 1. Transmit to Formspree (for email alerts & spam filtering)
      const formspreePromise = fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, request: 'Newsletter Subscription' })
      });

      // 2. Transmit to secure D1 Database (for internal storage)
      const databasePromise = fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });

      // Execute both requests simultaneously for maximum speed
      const [formspreeRes, dbRes] = await Promise.all([formspreePromise, databasePromise]);

      if (formspreeRes.ok && dbRes.ok) {
        setStatus('success');
      } else {
        alert("Transmission interrupted. Please try again.");
        setStatus('idle');
      }
    } catch (err) {
      alert("Network failure. Could not establish connection.");
      setStatus('idle');
    }
  };

  return (
    <section className="py-24 relative bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      
      {/* Custom CSS for the elegant ambient animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes aura-breathe {
          0%, 100% { transform: scale(1) translate(-50%, -50%); opacity: 0.3; }
          50% { transform: scale(1.1) translate(-45%, -45%); opacity: 0.5; }
        }
        @keyframes shimmer-pan {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}} />

      {/* 🚀 ANIMATION 1: Ambient Background Aura (Soft & Elegant) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl aspect-square bg-purple-600/30 blur-[120px] rounded-full mix-blend-screen pointer-events-none [animation:aura-breathe_8s_ease-in-out_infinite] z-0"></div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        
        {/* Main Sleek Glassmorphism Card */}
        <div className="relative bg-black/40 backdrop-blur-2xl p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-purple-500/30 transition-colors duration-700 text-center">
          
          {/* Subtle Top Inner Highlight to sell the "glass" look */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-purple-400/50 to-transparent transition-colors duration-700"></div>

          {/* Premium Tag */}
          <div className="relative z-10 flex justify-center mb-6">
            <span className="flex items-center gap-2 text-[10px] text-gray-300 font-medium uppercase tracking-[0.2em] px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]"></span>
              Priority Access
            </span>
          </div>
          
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight relative z-10`}>
            Join the Syndicate
          </h2>
          
          <p className="text-gray-400 mb-10 max-w-lg mx-auto relative z-10 text-sm md:text-base font-light leading-relaxed">
            Join our network. Get direct notifications the moment classified investigations and new documentaries are published.
          </p>
          
          {/* Form Container */}
          <div className="relative max-w-xl mx-auto h-[55px] z-10">
            {status === 'success' ? (
              // The Merged "Connected" State (Elegant Version)
              <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10 border border-purple-500/40 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-sm">
                <span className="font-semibold text-purple-300 tracking-wider text-sm flex items-center gap-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Subscription Confirmed
                </span>
              </div>
            ) : (
              // The Input State
              <form onSubmit={handleSubmit} className="absolute inset-0 flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow h-full">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'submitting'}
                    placeholder="Enter your email address..." 
                    className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 text-white text-sm focus:outline-none focus:border-purple-500 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 placeholder:text-gray-500" 
                  />
                  {/* 🚀 ANIMATION 2: Subtle Shimmer effect on the input when hovered */}
                  <div className="absolute inset-0 rounded-xl bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 pointer-events-none [animation:shimmer-pan_3s_ease-in-out_infinite]"></div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="h-full bg-white text-black font-bold uppercase tracking-widest text-xs px-8 rounded-xl transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Connecting
                    </>
                  ) : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}