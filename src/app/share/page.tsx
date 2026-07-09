"use client";

import { useState, useEffect, useRef } from 'react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ShareStoryPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [recentDrops, setRecentDrops] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Fetch recent submissions on mount
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
      // 0. Ensure the endpoint variable is loaded
      const emailEndpointUrl = process.env.NEXT_PUBLIC_GETFORM_ENDPOINT;
      if (!emailEndpointUrl) {
        throw new Error("Endpoint URL is missing. Did you restart the server?");
      }

      // 1. THE TRANSLATOR: FORMAT FOR FORMINIT
      // Forminit strictly requires "fi-" prefixes. We translate our form to their language here.
      const forminitData = new FormData();
      
      const alias = formData.get('alias');
      if (alias) forminitData.append('fi-sender-fullName', alias as string);
      
      const email = formData.get('email');
      if (email) forminitData.append('fi-sender-email', email as string);
      
      forminitData.append('fi-text-subject', (formData.get('subject') as string) || 'No Subject');
      forminitData.append('fi-text-story', (formData.get('story') as string) || 'No Story');
      
      const file = formData.get('attachment') as File;
      if (file && file.size > 0) {
        forminitData.append('fi-file-attachment', file); 
      }

      // 2. TRANSMIT TO FORMINIT (Handles the file attachment securely)
      const emailProviderRequest = fetch(emailEndpointUrl, {
        method: 'POST',
        body: forminitData,
        headers: { 'Accept': 'application/json' }
      });

      // 3. TRANSMIT TO DATABASE (Text only, keeping our original clean keys for the UI feed)
      const dbData = {
        alias: alias,
        email: email,
        subject: formData.get('subject'),
        story: formData.get('story')
      };
      
      const dbRequest = fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbData)
      });

      // Fire both simultaneously
      const [emailRes, dbRes] = await Promise.all([emailProviderRequest, dbRequest]);

      // 4. EXACT ERROR CHECKING
      if (!emailRes.ok) {
        console.error("Email Provider rejected:", await emailRes.text());
        throw new Error("Forminit Email Transmission Failed.");
      }
      if (!dbRes.ok) {
        console.error("Database rejected:", await dbRes.text());
        throw new Error("Database Save Failed.");
      }

      // 5. SUCCESS
      setStatus('success');
      form.reset();
      setFileName(null);
      
      // Refresh the live feed with the new submission
      fetch('/api/share').then(res => res.json()).then(data => setRecentDrops(data));
      
      setTimeout(() => setStatus('idle'), 4000);
      
    } catch (error: any) {
      console.error("Transmission Crash Log:", error);
      setStatus('idle');
      alert(`ERROR: ${error.message}`);
    }
  };

  // Helper to format names to "Joh..." or "Ano..."
  const formatConfidentialName = (name: string) => {
    if (!name || name.trim() === '') return 'Ano...';
    return name.substring(0, 3) + '...';
  };

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative">
      
      {/* SCROLL, FLOAT & GLOW ANIMATIONS */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .load-reveal {
          animation: fade-in-up 1s ease-out forwards;
        }
        .float-anim {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[40%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left load-reveal">
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
          <p className="text-lg text-gray-400 max-w-2xl">
            Have evidence? Witnessed something the world needs to see? Drop it here. Your identity is siloed, and your transmission is encrypted.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT SIDE: The Form */}
          <div className="lg:col-span-7 xl:col-span-8 load-reveal" style={{ animationDelay: '0.1s' }}>
            <div className="relative bg-[#111111]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl h-fit group">
              {/* Top Glass Edge */}
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

                {/* ATTACHMENT UPLOAD AREA */}
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

                <button 
                  type="submit" disabled={status === 'submitting'}
                  className="
                    group relative inline-flex items-center justify-center w-full mt-4
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
              {/* Connecting vertical line */}
              <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-purple-500/50 via-white/5 to-transparent -z-10"></div>

              {recentDrops.length > 0 ? (
                recentDrops.map((drop, i) => (
                  <article 
                    key={i} 
                    className="group relative bg-[#111111] p-5 rounded-2xl border border-white/5 transition-all duration-500 float-anim flex items-start gap-4 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:bg-[#16102b] cursor-default"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-purple-400/80 to-transparent transition-colors duration-500"></div>
                    
                    {/* Abstract Avatar node */}
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