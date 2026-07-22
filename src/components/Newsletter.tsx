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
      const formspreePromise = fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, request: 'Newsletter Subscription' })
      });

      const databasePromise = fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });

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
    <section className="py-24 relative overflow-hidden flex items-center justify-center">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes aura-breathe {
          0%, 100% { transform: scale(1) translate(-50%, -50%); opacity: 0.15; }
          50% { transform: scale(1.1) translate(-45%, -45%); opacity: 0.3; }
        }
        @keyframes shimmer-pan {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}} />

      {/* Ambient Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl aspect-square bg-zinc-500/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none [animation:aura-breathe_8s_ease-in-out_infinite] z-0"></div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        
        {/* Main Sleek Glassmorphism Card */}
        <div className="relative bg-[#050505]/40 backdrop-blur-2xl p-10 md:p-16 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-white/30 transition-colors duration-700 text-center">
          
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-white/60 to-transparent transition-colors duration-700"></div>

          {/* 🚀 GLOW BEAM 1: Priority Access Plate */}
          <div className="relative z-10 flex justify-center mb-6">
            <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
              {/* Spinning White Beam */}
              <div className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.8)_100%)] animate-[spin_3s_linear_infinite] z-0"></div>
              {/* Inner Solid Mask */}
              <div className="relative flex items-center gap-2 text-[10px] text-zinc-300 font-medium uppercase tracking-[0.2em] px-4 py-1.5 bg-[#0a0a0a] rounded-full z-10">
                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full shadow-[0_0_8px_#ffffff] animate-pulse"></span>
                Priority Access
              </div>
            </div>
          </div>
          
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight relative z-10`}>
            Join the Syndicate
          </h2>
          
          <p className="text-zinc-400 mb-10 max-w-lg mx-auto relative z-10 text-sm md:text-base font-light leading-relaxed">
            Join our network. Get direct notifications the moment classified investigations and new documentaries are published.
          </p>
          
          {/* 🚨 FIX: Removed absolute positioning and fixed height constraints here so it stacks perfectly on mobile */}
          <div className="relative max-w-xl mx-auto z-10">
            {status === 'success' ? (
              // Connected State
              <div className="h-[55px] flex items-center justify-center bg-white/5 border border-white/20 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-sm">
                <span className="font-semibold text-zinc-200 tracking-wider text-sm flex items-center gap-3">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Subscription Confirmed
                </span>
              </div>
            ) : (
              // Form Layout: flex-col on mobile, flex-row on desktop
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
                
                {/* Email Input */}
                <div className="relative flex-grow h-[55px]">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'submitting'}
                    placeholder="Enter your email address..." 
                    className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 text-white text-sm focus:outline-none focus:border-zinc-400 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 placeholder:text-zinc-500" 
                  />
                  {/* Subtle Shimmer effect */}
                  <div className="absolute inset-0 rounded-xl bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 pointer-events-none [animation:shimmer-pan_3s_ease-in-out_infinite]"></div>
                </div>
                
                {/* 🚀 GLOW BEAM 2: Subscribe Button */}
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="relative group w-full md:w-auto h-[55px] rounded-xl overflow-hidden p-[1.5px] disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
                >
                  {/* Spinning Dark/Silver Beam for white button */}
                  <div className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#e4e4e7_0%,#e4e4e7_75%,#71717a_100%)] animate-[spin_2.5s_linear_infinite] z-0"></div>
                  
                  {/* Solid White Inner Button */}
                  <div className="relative w-full h-full bg-white text-black font-bold uppercase tracking-widest text-xs px-8 rounded-[10.5px] flex items-center justify-center gap-2 hover:bg-zinc-100 transition-colors z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Connecting
                      </>
                    ) : 'Subscribe'}
                  </div>
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}