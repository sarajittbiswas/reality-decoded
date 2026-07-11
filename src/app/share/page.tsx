"use client";

import { useState, useEffect, useRef } from 'react';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { submitIntel } from '@/app/actions/intel';


const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ShareStoryPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [recentDrops, setRecentDrops] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isOptedIn, setIsOptedIn] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch('/api/share')
      .then(res => res.json())
      .then(data => setRecentDrops(data))
      .catch(() => console.log("Awaiting network..."));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const emailEndpointUrl = process.env.NEXT_PUBLIC_GETFORM_ENDPOINT;
      if (!emailEndpointUrl) {
        throw new Error("Endpoint URL is missing. Did you restart the server?");
      }

      // 1. THE TRANSLATOR: FORMAT FOR FORMINIT
      const forminitData = new FormData();
      
      const alias = formData.get('alias') as string;
      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const story = formData.get('story') as string;
      const postAsBlog = formData.get('postAsBlog') === 'on';
      
      if (alias) forminitData.append('fi-sender-fullName', alias);
      if (email) forminitData.append('fi-sender-email', email);
      
      forminitData.append('fi-text-subject', subject || 'No Subject');
      forminitData.append('fi-text-story', story || 'No Story');
      
      const file = formData.get('attachment') as File;
      if (file && file.size > 0) {
        forminitData.append('fi-file-attachment', file); 
      }

      // 2. TRANSMIT TO FORMINIT (Handles the file attachment securely & Email)
      const emailProviderRequest = fetch(emailEndpointUrl, {
        method: 'POST',
        body: forminitData,
        headers: { 'Accept': 'application/json' }
      });

      // 3. TRANSMIT TO DATABASE (Live UI Feed)
      const dbData = { alias, email, subject, story };
      const dbRequest = fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbData)
      });

      // 4. TRANSMIT TO CMS (Conditional based on Toggle)
      let cmsRequest = Promise.resolve({ success: true, error: null }); 
      
      if (postAsBlog) {
        const cmsData = new FormData();
        cmsData.append('title', subject || 'Untitled Intelligence Drop');
        cmsData.append('author', alias || 'Anonymous Contributor');
        cmsData.append('description', story ? story.substring(0, 150) + '...' : 'Classified public drop.');
        cmsData.append('content', story || '');
        
        cmsRequest = fetch('/api/intel', {
           method: 'POST',
           body: cmsData
        }).then(res => res.json());
      }

      // Fire all applicable payloads simultaneously
      const [emailRes, dbRes, cmsRes] = await Promise.all([
        emailProviderRequest, 
        dbRequest, 
        cmsRequest
      ]);

      if (!emailRes.ok) throw new Error("Forminit Email Transmission Failed.");
      if (!dbRes.ok) throw new Error("Live Feed Save Failed.");
      if (!cmsRes.success) throw new Error(cmsRes.error || "Command Center Injection Failed.");

      setStatus('success');
      form.reset();
      setFileName(null);
      
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
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative">
      
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

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[40%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32 relative z-10">
        
        {/* TOP ROW: Header Text + Declassification Card */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-16 load-reveal">
          
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Secure Protocol Active
            </div>
            <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-4`}>
              Share your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">story.</span>
            </h1>
            <p className="text-lg text-gray-400">
              Have evidence? Witnessed something the world needs to see? Drop it here. Your identity is siloed, and your transmission is encrypted.
            </p>
          </div>

          <div className="w-full lg:max-w-[420px] shrink-0">
            <div className="relative p-6 md:p-8 rounded-[2rem] bg-[#111111]/80 backdrop-blur-xl border border-white/5 overflow-hidden group hover:border-purple-500/30 transition-colors duration-500 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent -translate-x-full group-hover:animate-shimmer opacity-0 group-hover:opacity-100"></div>

              <div className="relative z-10 flex gap-5 items-start">
                <div className="shrink-0 mt-1">
                  <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a] border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500">
                    <svg className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded flex items-center justify-center shadow-lg border-2 border-[#111111]">
                       <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h4 className={`${spaceGrotesk.className} font-bold text-xl text-white mb-2 group-hover:text-purple-300 transition-colors duration-300`}>
                    Declassify Your Story
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Want the world to see your evidence? Toggle <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded font-medium border border-white/10">Submit for publication</strong> below to transform your drop into a featured public article.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT SIDE: The Form */}
          <div className="lg:col-span-7 xl:col-span-8 load-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="relative bg-[#111111]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl h-fit group">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-20"></div>

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-400">Alias / Name (Optional)</label>
                    <input type="text" name="alias" placeholder="Leave blank to remain anonymous" className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-400">Secure Email (Optional)</label>
                    <input type="email" name="email" placeholder="For our investigators to reply" className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400">Subject line</label>
                  <input type="text" name="subject" required placeholder="What is this regarding?" className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-400">The Intelligence</label>
                  <textarea name="story" rows={7} required placeholder="Detail the events, data, or evidence. Be specific." className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 resize-none"></textarea>
                </div>

                <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors bg-[#0a0a0a] group/upload cursor-pointer mt-2">
                  <input type="file" name="attachment" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  
                  {fileName ? (
                    <div className="flex flex-col items-center justify-center text-purple-400">
                      <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p className="font-bold text-white">{fileName}</p>
                      <p className="text-xs text-gray-500 mt-1">Ready to transmit</p>
                    </div>
                  ) : (
                    <>
                      <svg className="w-10 h-10 text-gray-600 mx-auto mb-4 group-hover/upload:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="text-gray-400 font-medium group-hover/upload:text-white transition-colors">Attach Evidence or Documents</p>
                      <p className="text-xs text-gray-600 mt-2">(Optional)</p>
                    </>
                  )}
                </div>

{/* THE NEW FUTURISTIC TOGGLE SWITCH */}
                <div className="flex items-center gap-4 mt-3 mb-2 relative z-30">
                  <label className="relative flex items-center cursor-pointer group/toggle">
                    <input 
                      type="checkbox" 
                      name="postAsBlog" 
                      checked={isOptedIn} 
                      onChange={() => setIsOptedIn(!isOptedIn)} 
                      className="sr-only" 
                    />

                    {/* Futuristic Toggle Track - Controlled by React State */}
                    <div className={`relative w-14 h-7 rounded-full transition-all duration-500 overflow-hidden flex items-center ${isOptedIn ? 'bg-purple-900/50 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-[#050505] border border-gray-700 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]'}`}>
                      
                      {/* Inner background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 transition-opacity duration-500 ${isOptedIn ? 'opacity-40' : 'opacity-0'}`}></div>

                      {/* The sliding physical dot */}
                      <div className={`absolute left-1 w-5 h-5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center z-10 ${isOptedIn ? 'translate-x-7 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-gray-500 shadow-[0_2px_5px_rgba(0,0,0,0.5)]'}`}>
                         <svg className={`w-3 h-3 text-purple-600 transition-opacity duration-300 delay-100 ${isOptedIn ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    </div>

                    {/* Glowing Text */}
                    <span className={`ml-4 text-sm font-semibold transition-all duration-300 select-none ${isOptedIn ? 'text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-gray-400 group-hover/toggle:text-gray-200'}`}>
                      Submit for publication
                    </span>
                  </label>

                  {/* Tooltip Icon & Popover (Unchanged) */}
                  <div className="group/tooltip relative flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center cursor-help shadow-[0_0_10px_rgba(168,85,247,0.3)] animate-pulse hover:animate-none hover:bg-purple-500/40 hover:border-purple-400 transition-all duration-300">
                      <span className="text-purple-400 text-xs font-bold leading-none block group-hover/tooltip:text-white">?</span>
                    </div>
                    <div className="absolute bottom-full pb-3 left-1/2 -translate-x-1/2 w-64 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50 pointer-events-none group-hover/tooltip:pointer-events-auto">
                      <div className="relative p-4 bg-[#111111]/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-[0_10px_40px_rgba(168,85,247,0.4)] flex flex-col gap-2">
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111111]/95 border-b border-r border-purple-500/30 rotate-45"></div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          <strong className="text-purple-400 block mb-1">Publishing Guidelines</strong>
                          Checking this box submits your transmission to our editors. If the intel is verified, it will be published as a live public article.
                        </p>
                        <Link href="/terms" target="_blank" className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2 decoration-purple-500/50 hover:decoration-purple-400 transition-all">
                          Read submission terms
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" disabled={status === 'submitting'}
                  className="
                    group relative inline-flex items-center justify-center w-full
                    px-8 py-4 rounded-xl font-bold text-lg
                    bg-white text-purple-900
                    transition-all duration-300 ease-out
                    hover:bg-purple-500 hover:text-white hover:scale-[1.02]
                    hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]
                    active:scale-95 disabled:opacity-50 disabled:pointer-events-none
                    border border-transparent hover:border-purple-400
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
            
            <div className="flex items-center justify-between mb-6">
              <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white`}>Live Drops</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                Syncing
              </div>
            </div>

            <div className="flex flex-col gap-5 relative">
              <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-purple-500/50 via-white/5 to-transparent -z-10"></div>

              {recentDrops.length > 0 ? (
                recentDrops.map((drop, i) => (
                  <article 
                    key={i} 
                    className="group relative bg-[#111111] p-5 rounded-2xl border border-white/5 transition-all duration-500 float-anim flex items-start gap-4 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-[#16102b] cursor-default"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-purple-400/80 to-transparent transition-colors duration-500"></div>
                    
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center group-hover:border-purple-400 group-hover:bg-purple-500/20 transition-all duration-500 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                      <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                    </div>

                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-gray-400 group-hover:text-purple-300 transition-colors">
                          {formatConfidentialName(drop.name)}
                        </span>
                        <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase group-hover:text-purple-400/70">Encrypted</span>
                      </div>
                      <span className="text-gray-300 text-sm leading-snug line-clamp-2 group-hover:text-white transition-colors">
                        {drop.subject}
                      </span>
                    </div>
                  </article>
                ))
              ) : (
                <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl bg-[#111]">
                  <p className="text-gray-500 text-sm">Monitoring frequencies. Awaiting incoming intelligence...</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}