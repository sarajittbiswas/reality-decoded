"use client";

import { motion, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// 1. ANIMATED COUNTER
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
  return <span ref={nodeRef} className="text-4xl md:text-5xl font-black text-white block" />;
}

export default function PressPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    // 1. Capture the form before the await
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
        // 2. Use the captured form variable
        form.reset(); 
        alert("Transmission received. We will contact you soon.");
        setStatus('idle');
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
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen relative pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-purple-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 mb-6 uppercase tracking-widest">
            Media Syndicate Access
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase`}>
            Partnerships & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500">Press.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Authorized portal for brand inquiries, media asset requests, and content collaborations. We treat every investigation like a feature film and partner with those who value the truth.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { target: 500, suffix: 'K+', label: 'Syndicate Reach' },
            { target: 1.2, suffix: 'M', label: 'Verified Transmissions' },
            { target: 42, suffix: '', label: 'Global Nodes' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
              className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all text-center"
            >
              <NumberTicker target={stat.target} suffix={stat.suffix} />
              <div className="text-xs font-mono text-gray-500 uppercase mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Syndicate Collaborations */}
        <div className="mb-24">
          <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-12 text-center uppercase`}>Syndicate Collaborations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Global Tech Summit", img: "https://plus.unsplash.com/premium_photo-1674118771197-de18d929a7c7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNvbGxhYnxlbnwwfHwwfHx8MA%3D%3D" },
              { title: "Future Security Expo", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800" },
              { title: "Digital Ethics Forum", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" }
            ].map((collab, i) => (
              <motion.div 
                whileHover={{ y: -10, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }} 
                key={i} 
                className="group bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/50 transition-all"
              >
                <img src={collab.img} className="w-full h-48 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="p-6 text-center">
                  <h4 className="font-bold text-white mb-1">{collab.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form + Assets Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(168,85,247,0.2)" }} className="bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-purple-500/50 transition-all">
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-4 uppercase`}>Media Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="entity" required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition-all" placeholder="Entity Name" />
              <input type="email" name="email" required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500 transition-all" placeholder="Your Email" />
              <textarea name="message" required className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 min-h-[120px] focus:border-purple-500 transition-all" placeholder="Project Details"></textarea>
              <button className="w-full bg-purple-600 py-4 rounded-xl uppercase font-bold tracking-widest text-sm hover:bg-purple-500 transition-colors">
                {status === 'submitting' ? 'Transmitting...' : 'Transmit Inquiry'}
              </button>
            </form>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,255,255,0.1)" }} className="bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-white/30 transition-all flex flex-col justify-center">
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-6 uppercase`}>Press Assets</h3>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">Download our official media kit.</p>
            <motion.a 
              href="/press-kit.zip" 
              download 
              animate={{ boxShadow: ["0 0 10px #fff", "0 0 25px #fff", "0 0 10px #fff"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full text-center bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest text-sm hover:scale-105 transition-transform"
            >
              Download Press Kit
            </motion.a>
          </motion.div>
        </div>

        {/* Horizontal Communication Block */}
        <motion.div 
            whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(168,85,247,0.2)" }} 
            className="bg-gradient-to-r from-purple-900/20 to-black p-10 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
        >
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold">Need Direct Access?</h4>
              <p className="text-sm text-gray-400 mt-1">If your inquiry is urgent, use our dedicated business channel.</p>
            </div>
            <a href="mailto:business@realitydecoded.in" className="flex flex-col items-center group bg-purple-600/10 px-8 py-4 rounded-2xl border border-purple-500/20 hover:border-purple-400 transition-all">
                <span className="text-3xl font-black group-hover:text-purple-400 transition-colors">EMAIL US</span>
                <span className="text-xs text-gray-500 font-mono mt-1">business@realitydecoded.in</span>
            </a>
        </motion.div>
      </div>
    </main>
  );
}