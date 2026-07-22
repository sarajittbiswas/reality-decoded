"use client";

import { motion, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

// 1. ANIMATED COUNTER (Untouched Logic)
function NumberTicker({ target, suffix }: { target: number, suffix: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, target, {
      duration: 2.5,
      onUpdate: (value) => { node.textContent = Math.floor(value).toString() + suffix; }
    });
    return () => controls.stop();
  }, [target, suffix]);
  return <span ref={nodeRef} className={`${spaceGrotesk.className} text-4xl md:text-5xl font-black text-white block`} />;
}

export default function PressPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget; 
    const formData = new FormData(form);
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); 
        
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
        
      } else {
        alert("Transmission failed. Check your connection.");
        setStatus('idle');
      }
    } catch (error) {
      alert("Transmission failed. An error occurred.");
      setStatus('idle');
    }
  };

  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden pb-32 ${inter.className}`}>
      
      {/* High-End Background Elements */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 pt-32 md:pt-40 relative z-10">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-24 text-center">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Media Syndicate Access
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 uppercase text-white`}>
            Partnerships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">Press.</span>
          </h1>
          <p className="text-zinc-400 font-light tracking-wide text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Authorized portal for brand inquiries, media asset requests, and content collaborations. We treat every investigation like a feature film and partner with those who value the truth.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { target: 500, suffix: 'K+', label: 'Syndicate Reach' },
            { target: 1.2, suffix: 'M', label: 'Verified Transmissions' },
            { target: 42, suffix: '', label: 'Global Nodes' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group rounded-3xl overflow-hidden bg-[#0a0a0a] text-center"
            >
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.3)_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] z-10 transition-colors duration-500 group-hover:bg-[#0d0d0d]"></div>
              
              <div className="relative p-10 z-20">
                <NumberTicker target={stat.target} suffix={stat.suffix} />
                <div className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-3`}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Authority / Mentions */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-10">
             <h3 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white uppercase`}>Intelligence Features</h3>
             <div className="h-px bg-white/10 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 🚀 UPGRADED: Feature Card 1 (Always-On Glow Beam) */}
            <div className="group relative rounded-3xl overflow-hidden">
              <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] z-10 transition-colors duration-500"></div>
              
              <div className="relative p-8 z-20">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                </div>
                <div className={`${jetBrainsMono.className} text-emerald-400 text-[10px] uppercase tracking-widest mb-4 font-bold`}>Media Coverage</div>
                <h4 className={`${spaceGrotesk.className} text-xl text-white font-bold mb-3`}>"Redefining Open-Source Journalism"</h4>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">Recognized for deploying cutting-edge OSINT and decentralized sourcing to verify ground-zero realities before traditional outlets arrive.</p>
              </div>
            </div>

            {/* 🚀 UPGRADED: Feature Card 2 (Always-On Glow Beam) */}
            <div className="group relative rounded-3xl overflow-hidden">
              <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] animate-[spin_5s_linear_infinite_reverse] opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] z-10 transition-colors duration-500"></div>
              
              <div className="relative p-8 z-20">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div className={`${jetBrainsMono.className} text-emerald-400 text-[10px] uppercase tracking-widest mb-4 font-bold`}>Platform Integrity</div>
                <h4 className={`${spaceGrotesk.className} text-xl text-white font-bold mb-3`}>"Zero Corporate Compromise"</h4>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">Highlighted as a premier independent network maintaining 100% editorial control, funded by the syndicate, and untethered from external ad-revenue pressures.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Upgraded Collaborations Grid */}
        <div className="mb-32">
          <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-10 text-center uppercase text-white`}>Active Event Collaborations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Global Tech Summit", img: "https://plus.unsplash.com/premium_photo-1674118771197-de18d929a7c7?w=900&auto=format&fit=crop&q=60" },
              { title: "Future Security Expo", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
              { title: "Digital Ethics Forum", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" }
            ].map((collab, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a]">
                <div className="aspect-[4/3] w-full overflow-hidden">
                   <img src={collab.img} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={collab.title} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 inset-x-0 p-6 text-center">
                  <h4 className={`${spaceGrotesk.className} font-bold text-white text-lg`}>{collab.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form + Assets Section (Upgraded UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          
          {/* Inquiry Form */}
          <div className="relative group rounded-3xl overflow-hidden min-h-[420px] flex flex-col">
            <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.4)_100%)] animate-[spin_5s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] z-10"></div>
            
            <div className="relative p-8 md:p-12 z-20 flex-1 flex flex-col">
              <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-8 uppercase text-white`}>Media Inquiry</h3>
              
              {status === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-2 uppercase tracking-wide`}>Transmission Received</h4>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-xs mx-auto">
                    Our syndicate will review your inquiry and establish contact shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-end">
                  <input type="text" name="entity" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-zinc-400 focus:bg-white/10 transition-all placeholder:text-zinc-600" placeholder="Entity Name" />
                  <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-zinc-400 focus:bg-white/10 transition-all placeholder:text-zinc-600" placeholder="Your Email" />
                  <textarea name="message" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm text-white min-h-[140px] focus:outline-none focus:border-zinc-400 focus:bg-white/10 transition-all placeholder:text-zinc-600" placeholder="Project Details"></textarea>
                  
                  {/* Glowing Submit Button */}
                  <button type="submit" disabled={status === 'submitting'} className="relative group/btn w-full h-[55px] rounded-xl overflow-hidden p-[1.5px] disabled:opacity-50 mt-2">
                    <div className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#e4e4e7_0%,#e4e4e7_75%,#71717a_100%)] animate-[spin_2.5s_linear_infinite] z-0"></div>
                    <div className={`${jetBrainsMono.className} relative w-full h-full bg-white text-black font-bold uppercase tracking-widest text-xs rounded-[10.5px] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]`}>
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Transmitting
                        </>
                      ) : 'Transmit Inquiry'}
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Press Assets Card */}
          <div className="relative group rounded-3xl overflow-hidden">
            <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] z-10"></div>
            <div className="absolute inset-[1px] border border-white/5 group-hover:border-white/20 rounded-[23px] z-20 transition-colors duration-500"></div>
            
            <div className="relative p-8 md:p-12 z-30 h-full flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </div>
              <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-4 uppercase text-white`}>Press Assets</h3>
              <p className="text-zinc-400 mb-8 text-sm font-light leading-relaxed max-w-sm">
                Download our official media kit. Includes high-resolution logos, brand guidelines, and syndicate bios.
              </p>
              
              <a 
                href="/Press-Kit.zip" 
                download 
                className={`${jetBrainsMono.className} w-full max-w-[250px] relative text-center bg-transparent border border-white/20 hover:border-white text-white font-bold py-4 rounded-xl uppercase tracking-widest text-xs transition-all overflow-hidden group/down`}
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover/down:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                <span className="relative z-10 group-hover/down:text-black transition-colors duration-300">Download Kit</span>
              </a>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DO NOT TOUCH: Horizontal Communication Block as requested  */}
        {/* ======================================================== */}
        <motion.div 
            whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(168,85,247,0.2)" }} 
            className="bg-gradient-to-r from-purple-900/20 to-black p-10 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
        >
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white">Need Direct Access?</h4>
              <p className="text-sm text-gray-400 mt-1">If your inquiry is urgent, use our dedicated business channel.</p>
            </div>
            <a href="mailto:business@realitydecoded.in" className="flex flex-col items-center group bg-purple-600/10 px-8 py-4 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition-all">
                <span className="text-3xl font-black text-white group-hover:text-purple-400 transition-colors">EMAIL US</span>
                <span className="text-xs text-gray-500 font-mono mt-1">business@realitydecoded.in</span>
            </a>
        </motion.div>
        {/* ======================================================== */}
        
      </div>
    </main>
  );
}