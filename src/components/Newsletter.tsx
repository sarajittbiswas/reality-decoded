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
    <section className="py-24 relative bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-b from-[#111] to-black p-10 md:p-16 rounded-3xl border border-white/5 shadow-2xl text-center relative overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
          {/* Subtle hover background glow */}
          <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white mb-4 uppercase relative z-10`}>Join the Syndicate</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto relative z-10 text-sm md:text-base">Establish a secure connection. Get direct notifications when classified investigations are published.</p>
          
          {/* Form Container (Fixed height to prevent jumping during animation) */}
          <div className="relative max-w-xl mx-auto h-[60px]">
            {status === 'success' ? (
              // The Merged "Connected" State
              <div className="absolute inset-0 flex items-center justify-center bg-purple-500/10 border border-purple-500 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-[pulse_2s_ease-in-out_infinite]">
                <span className="font-mono text-purple-300 font-bold tracking-[0.2em] uppercase text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
                  Connection Established
                </span>
              </div>
            ) : (
              // The Input State
              <form onSubmit={handleSubmit} className="absolute inset-0 flex flex-col md:flex-row gap-3">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'submitting'}
                  placeholder="ENTER ENCRYPTED EMAIL" 
                  className="flex-grow h-full bg-black border border-white/10 rounded-xl px-6 text-white font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-50" 
                />
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="h-full bg-white text-black font-bold uppercase tracking-widest text-sm px-8 rounded-xl transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === 'submitting' ? 'Encrypting...' : 'Connect'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}