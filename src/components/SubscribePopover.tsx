"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function SubscribePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [email, setEmail] = useState('');
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (popoverRef.current && popoverRef.current.contains(document.activeElement)) return; 
      if (status !== 'submitting') setIsOpen(false);
    }, 400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const formspreePromise = fetch(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, request: 'Blog Popover Subscription' })
      });
      const databasePromise = fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });

      const [formspreeRes, dbRes] = await Promise.all([formspreePromise, databasePromise]);

      if (formspreeRes.ok && dbRes.ok) {
        setStatus('success');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
          setEmail('');
        }, 2500);
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
    <div 
      className={`relative ${inter.className} z-50`} 
      ref={popoverRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] hover:bg-zinc-200 focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Subscribe
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-4 right-0 w-[280px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Static Top Arrow */}
          <div className="absolute -top-2 right-6 w-4 h-4 bg-[#0a0a0a] border-t border-l border-white/20 rotate-45 z-10"></div>
          
          {/* Animated Glow Border Wrapper */}
          <div className="relative rounded-2xl overflow-hidden z-20 group">
            {/* Spinning Beam */}
            <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.7)_100%)] animate-[spin_3s_linear_infinite] z-0"></div>
            
            {/* Solid Inner Mask */}
            <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[15px] z-10"></div>

            {/* Form Content */}
            <div className="relative p-4 z-20">
              {status === 'success' ? (
                <div className="flex items-center justify-center py-6 text-emerald-400 gap-2 font-medium text-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Confirmed
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'submitting'}
                    placeholder="name@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-400 transition-colors disabled:opacity-50 placeholder:text-zinc-600"
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-zinc-300 text-black font-semibold text-sm py-2.5 rounded-lg hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:opacity-50 shadow-md"
                  >
                    {status === 'submitting' ? (
                       <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : 'Submit'}
                  </button>
                  
                  <div className="text-center mt-2">
                    <span className="text-[11px] text-zinc-500 flex items-center justify-center gap-1.5">
                      or follow the 
                      <Link href="/feed.xml" className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                        <svg className="w-3 h-3 text-[#f26522]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.86c8.3 0 15.05 6.75 15.05 15.05h-3.84c0-6.18-5.02-11.2-11.2-11.2V4.86M4 10.3c5.3 0 9.61 4.31 9.61 9.61h-3.84c0-3.18-2.59-5.77-5.77-5.77V10.3z" />
                        </svg>
                        <span className="underline decoration-zinc-600 hover:decoration-white underline-offset-2">RSS feed</span>
                      </Link>
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}