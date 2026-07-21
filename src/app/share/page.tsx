"use client";

import { useState, useEffect, useRef } from 'react';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function ShareStoryPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [recentDrops, setRecentDrops] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isOptedIn, setIsOptedIn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // [UNTOUCHED LOGIC] Feed fetch
  useEffect(() => {
    fetch('/api/share')
      .then(res => {
        if (!res.ok) return []; 
        return res.json();
      })
      .then(data => setRecentDrops(data))
      .catch(() => setRecentDrops([])); 
  }, []);

  // [UNTOUCHED LOGIC] File handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  // [UNTOUCHED LOGIC] Submission logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let finalImageUrl = "";

      // 1. UPLOAD TO IMGBB (If file exists)
      const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (file && imgbbKey) {
        const imgData = new FormData();
        imgData.append("image", file);
        
        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: "POST",
          body: imgData,
        });
        const imgJson = await imgRes.json();
        if (imgJson.success) finalImageUrl = imgJson.data.url;
      }

      const emailEndpointUrl = process.env.NEXT_PUBLIC_GETFORM_ENDPOINT;
      const alias = formData.get('alias') as string;
      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const story = formData.get('story') as string;

      // 2. TRANSMIT TO GETFORM (Email)
      let emailProviderRequest = Promise.resolve({ ok: true });
      if (emailEndpointUrl) {
        const forminitData = new FormData();
        if (alias) forminitData.append('fi-sender-fullName', alias);
        if (email) forminitData.append('fi-sender-email', email);
        forminitData.append('fi-text-subject', subject || 'No Subject');
        forminitData.append('fi-text-story', story || 'No Story');
        forminitData.append('fi-intent', isOptedIn ? 'HQ Submission' : 'General Tip');
        
        if (finalImageUrl) {
          forminitData.append('fi-image-url', finalImageUrl);
        }
        
        emailProviderRequest = fetch(emailEndpointUrl, {
          method: 'POST',
          body: forminitData,
          headers: { 'Accept': 'application/json' }
        });
      }

      // 3. TRANSMIT TO DATABASE
      const dbData = { 
        alias, 
        email, 
        subject, 
        story,
        file_url: finalImageUrl,
        isApplication: isOptedIn 
      };
      
      const dbRequest = fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbData)
      });

      const [emailRes, dbRes] = await Promise.all([emailProviderRequest, dbRequest]);

      if (!emailRes.ok) throw new Error("Email Transmission Failed.");
      if (!dbRes.ok) throw new Error("Database rejected transmission.");

      setStatus('success');
      form.reset();
      setFile(null);
      setIsOptedIn(false);
      
      fetch('/api/share').then(res => res.json()).then(data => setRecentDrops(data));
      setTimeout(() => setStatus('idle'), 4000);
      
    } catch (error: any) {
      console.error("Transmission Crash Log:", error);
      setStatus('idle');
      alert(`ERROR: ${error.message}`);
    }
  };

  const formatConfidentialName = (name: string) => {
    if (!name || name.trim() === '') return 'Anonymous';
    return name.trim().split(' ')[0];
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .load-reveal { animation: fade-in-up 1s ease-out forwards; }
        .float-anim { animation: float 5s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32 relative z-10">
        
        {/* TOP ROW: Header Text + Declassification Card */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-16 load-reveal">
          
          <div className="text-center md:text-left max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              Secure Protocol Active
            </div>
            <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-white`}>
              Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 drop-shadow-sm">story.</span>
            </h1>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              Have evidence? Witnessed something the world needs to see? Drop it here. Your identity is siloed, and your transmission is encrypted.
            </p>
          </div>

          <div className="w-full lg:max-w-[420px] shrink-0 relative group">
            {/* Background Beam on Card */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-lg transition-shadow duration-500 pointer-events-none">
              {/* 🚨 BULLETPROOF FIX */}
              <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.4)_100%)] animate-spin [animation-duration:6s] transition-opacity duration-500"></div>
              <div className="absolute inset-[1.5px] bg-[#050505] rounded-[30.5px] z-10"></div>
              <div className="absolute inset-[1.5px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 group-hover:border-transparent rounded-[30.5px] z-10 transition-colors duration-500"></div>
            </div>

            <div className="relative p-6 md:p-8 flex gap-5 items-start z-20">
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500">
                  <svg className="w-6 h-6 text-zinc-300 group-hover:scale-110 group-hover:text-white transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded flex items-center justify-center shadow-lg border-2 border-[#050505]">
                     <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <h4 className={`${spaceGrotesk.className} font-bold text-xl text-white mb-2 group-hover:text-zinc-200 transition-colors duration-300`}>
                  Declassify Your Story
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-light">
                  Want the world to see your evidence? Toggle <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded-sm font-medium border border-white/10 mx-1">Submit for publication</strong> below to route your drop to our Command Center for editorial review.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT SIDE: The Form */}
          <div className="lg:col-span-7 xl:col-span-8 load-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="relative bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl h-fit group">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-white/40 to-transparent transition-colors duration-500 z-20"></div>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>Alias / Name (Optional)</label>
                    <input type="text" name="alias" placeholder="Leave blank to remain anonymous" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>Secure Email (Optional)</label>
                    <input type="email" name="email" placeholder="For our investigators to reply" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>Subject line</label>
                  <input type="text" name="subject" required placeholder="What is this regarding?" className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-500 uppercase tracking-widest`}>The Intelligence</label>
                  <textarea name="story" rows={7} required placeholder="Detail the events, data, or evidence. Be specific." className="bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300 resize-none"></textarea>
                </div>

                <div className="relative border border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/50 transition-colors bg-[#050505] group/upload cursor-pointer mt-2">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  
                  {file ? (
                    <div className="flex flex-col items-center justify-center text-zinc-300">
                      <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p className="font-bold text-white text-sm">{file.name}</p>
                      <p className={`${jetBrainsMono.className} text-[9px] text-zinc-500 uppercase tracking-widest mt-2`}>Ready to transmit</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 text-zinc-700 mx-auto mb-4 group-hover/upload:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="text-zinc-400 font-medium text-sm group-hover/upload:text-white transition-colors">Attach Evidence (Image Only)</p>
                      <p className={`${jetBrainsMono.className} text-[9px] text-zinc-600 uppercase tracking-widest mt-2`}>(Optional)</p>
                    </>
                  )}
                </div>

                {/* Platinum Toggle UI */}
                <div className="flex items-center gap-4 mt-3 mb-2 relative z-30">
                  <label className="relative flex items-center cursor-pointer group/toggle">
                    <input 
                      type="checkbox" 
                      checked={isOptedIn} 
                      onChange={() => setIsOptedIn(!isOptedIn)} 
                      className="sr-only" 
                    />

                    <div className={`relative w-14 h-7 rounded-full transition-all duration-500 overflow-hidden flex items-center ${isOptedIn ? 'bg-white/10 border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.15)]' : 'bg-[#050505] border border-white/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]'}`}>
                      <div className={`absolute inset-0 bg-white/20 transition-opacity duration-500 ${isOptedIn ? 'opacity-100' : 'opacity-0'}`}></div>
                      <div className={`absolute left-1 w-5 h-5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center z-10 ${isOptedIn ? 'translate-x-7 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-zinc-600 shadow-[0_2px_5px_rgba(0,0,0,0.5)]'}`}>
                         <svg className={`w-3 h-3 text-black transition-opacity duration-300 delay-100 ${isOptedIn ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>

                    <span className={`ml-4 text-xs font-semibold uppercase tracking-widest transition-all duration-300 select-none ${isOptedIn ? 'text-white' : 'text-zinc-500 group-hover/toggle:text-zinc-300'}`}>
                      Submit for publication
                    </span>
                  </label>

                  <div className="group/tooltip relative flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-white/5 border border-white/20 flex items-center justify-center cursor-help shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:bg-white/20 hover:border-white transition-all duration-300">
                      <span className="text-zinc-400 text-xs font-bold leading-none block group-hover/tooltip:text-white">?</span>
                    </div>
                    <div className="absolute bottom-full pb-3 left-1/2 -translate-x-1/2 w-64 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none group-hover/tooltip:pointer-events-auto">
                      <div className="relative p-5 bg-[#111111]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col gap-2">
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111111]/95 border-b border-r border-white/20 rotate-45"></div>
                        <p className="text-xs text-zinc-300 leading-relaxed font-light">
                          <strong className="text-white block mb-1 font-bold">Command Center Routing</strong>
                          Checking this box alerts our HQ. If the intel is verified, it will be moved into our editor, crafted, and published as a live public article.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" disabled={status === 'submitting'}
                  className="
                    group relative inline-flex items-center justify-center w-full
                    px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest
                    bg-white text-black
                    transition-all duration-300 ease-out
                    hover:bg-zinc-200 hover:scale-[1.02]
                    shadow-[0_5px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]
                    active:scale-95 disabled:opacity-50 disabled:pointer-events-none
                  "
                >
                  {status === 'idle' && 'Submit Intelligence'}
                  {status === 'submitting' && 'Encrypting & Transmitting...'}
                  {status === 'success' && 'Transmission Logged ✓'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Live Intelligence Feed */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col load-reveal" style={{ animationDelay: '0.2s' }}>
            
            <div className="flex items-center justify-between mb-8">
              <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white`}>Live Drops</h3>
              <div className={`${jetBrainsMono.className} flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest`}>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                Syncing
              </div>
            </div>

            <div className="flex flex-col gap-5 relative">
              <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-white/30 via-white/5 to-transparent -z-10"></div>

              {recentDrops.length > 0 ? (
                recentDrops.map((drop, i) => (
                  <article 
                    key={i} 
                    className="group relative bg-[#050505] p-5 rounded-2xl border border-white/5 transition-all duration-500 float-anim flex items-start gap-4 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_5px_20px_rgba(255,255,255,0.05)] hover:bg-white/[0.02] cursor-default"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-white/30 to-transparent transition-colors duration-500"></div>
                    
                    <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <svg className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                    </div>

                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                          {formatConfidentialName(drop.name)}
                        </span>
                        <span className={`${jetBrainsMono.className} text-[9px] text-zinc-600 font-bold tracking-widest uppercase group-hover:text-zinc-400`}>Encrypted</span>
                      </div>
                      <span className="text-zinc-400 text-xs leading-relaxed font-light line-clamp-2 group-hover:text-zinc-200 transition-colors">
                        {drop.story}
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <div className={`${jetBrainsMono.className} p-8 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]`}>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Monitoring frequencies. <br/> Awaiting incoming intelligence...</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}