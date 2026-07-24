"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function NavbarClient({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'main' | 'intelligence' | 'syndicate'>('main');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  // Sub-tabs for dynamic left-hover content
  const [intelTab, setIntelTab] = useState<'videos' | 'articles' | 'archives' | 'monitor'>('videos');
  const [syndicateTab, setSyndicateTab] = useState<'about' | 'team' | 'authors' | 'careers'>('about');
  
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      closeAll();
      setSearchQuery("");
    }
  };

  const closeAll = () => {
    setActiveMenu(null);
    setIsOpen(false);
    setMobileView('main');
    document.body.style.overflow = 'auto';
  };

  const toggleMobileMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      closeAll();
    }
  };

  {/* UPGRADED NAV CARD WITH CIRCLING BEAM GLOW */}
  const NavCard = ({ title, subtitle, label, image, href }: any) => (
    <Link href={href} onClick={closeAll} className="relative group block h-[135px] w-full hover:-translate-y-0.5 transition-transform duration-300">
      {/* Background Beam Layer */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg pointer-events-none">
        <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.7)_100%)] animate-spin [animation-duration:6s] transition-opacity duration-500"></div>
        <div className="absolute inset-[1.5px] bg-[#0a0a0a] rounded-[14.5px] z-10"></div>
        <div className="absolute inset-[1.5px] bg-white/[0.02] border border-white/5 group-hover:border-transparent rounded-[14.5px] z-10 transition-colors duration-500"></div>
      </div>

      {/* Foreground Content Layer */}
      <div className="relative p-4 flex flex-col justify-end h-full w-full z-20 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
        {image ? (
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700" />
        ) : (
          <div className="absolute inset-0 opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_80%)]"></div>
        )}
        <div className="relative z-20">
          {label && <span className={`${jetBrainsMono.className} text-[9px] bg-white/10 text-white px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold mb-1.5 inline-block backdrop-blur-md`}>{label}</span>}
          <h4 className={`${spaceGrotesk.className} text-white text-sm font-bold mb-0.5 line-clamp-1`}>{title}</h4>
          {subtitle && <p className="text-[11px] text-zinc-400 font-light line-clamp-1">{subtitle}</p>}
        </div>
      </div>
    </Link>
  );

  return (
    <nav 
      className={`fixed top-0 inset-x-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/5 py-4 ${inter.className}`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" onClick={closeAll} className="group text-2xl font-extrabold tracking-tighter flex items-center gap-2 transition-all duration-500 relative z-20">
          <img src="/final_no_bg.png" alt="Reality Decoded" className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-105" />
          <span className="text-white transition-colors duration-500">
            reality<span className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">decoded</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-6 relative">
          
          <Link href="/" onClick={closeAll} onMouseEnter={() => setActiveMenu(null)} className={`px-2 py-2 text-sm font-semibold transition-colors duration-300 ${pathname === '/' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
            Home
          </Link>

          {/* INTELLIGENCE MEGA MENU */}
          <div className="group" onMouseEnter={() => setActiveMenu('intelligence')}>
            <Link href="/blogs" className={`px-2 py-2 text-sm font-semibold transition-colors duration-300 flex items-center gap-1 ${activeMenu === 'intelligence' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
              Intelligence
              <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </Link>

            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-out z-50 w-[640px] ${activeMenu === 'intelligence' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
              <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-4 shadow-2xl flex gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>
                
                <div className="w-1/3 flex flex-col gap-1.5 relative z-10 p-2 border-r border-white/5">
                  <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 mb-2 px-3`}>Sectors</span>
                  <Link href="/videos" onMouseEnter={() => setIntelTab('videos')} onClick={closeAll} className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${intelTab === 'videos' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
                    Videos <span>&rarr;</span>
                  </Link>
                  <Link href="/blogs" onMouseEnter={() => setIntelTab('articles')} onClick={closeAll} className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${intelTab === 'articles' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
                    Articles <span>&rarr;</span>
                  </Link>
                  <Link href="/archives" onMouseEnter={() => setIntelTab('archives')} onClick={closeAll} className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${intelTab === 'archives' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
                    Archives <span>&rarr;</span>
                  </Link>
                  <Link href="/monitor" onMouseEnter={() => setIntelTab('monitor')} onClick={closeAll} className={`px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${intelTab === 'monitor' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
  <span className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-red-500 group-hover:animate-pulse"></span>
    Threat Matrix
  </span>
  <span>&rarr;</span>
</Link>
                </div>

                <div className="w-2/3 relative z-10 flex flex-col justify-center p-2 min-h-[160px]">
                  {intelTab === 'videos' && (
                    <div className="flex flex-col gap-2 animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 px-1`}>Latest Video Stream</span>
                      {data.videos?.[0] ? <NavCard href={`/watch/${data.videos[0].id}`} label="Broadcast" title={data.videos[0].title} image={data.videos[0].image} /> : <p className="text-xs text-zinc-500 p-4">No active video logs.</p>}
                    </div>
                  )}
                  {intelTab === 'articles' && (
                    <div className="flex flex-col gap-2 animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 px-1`}>Latest Field Report</span>
                      {data.articles?.[0] ? <NavCard href={`/blogs/${data.articles[0].slug}`} label="Exposé" title={data.articles[0].title} image={data.articles[0].image} /> : <p className="text-xs text-zinc-500 p-4">No field reports.</p>}
                    </div>
                  )}
                  {intelTab === 'archives' && (
                    <div className="flex flex-col gap-2 animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 px-1`}>Master Vault Preview</span>
                      <div className="grid grid-cols-2 gap-2">
                        {data.videos?.[0] && <NavCard href={`/watch/${data.videos[0].id}`} label="Video" title={data.videos[0].title} image={data.videos[0].image} />}
                        {data.articles?.[0] && <NavCard href={`/blogs/${data.articles[0].slug}`} label="Article" title={data.articles[0].title} image={data.articles[0].image} />}
                      </div>
                    </div>
                  )}
                  {intelTab === 'monitor' && (
                    <div className="flex flex-col gap-2 animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 px-1 flex items-center gap-2`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        Live System Telemetry
                      </span>
                      
                      <div className="grid grid-cols-2 gap-3 h-[135px]">
                        
                        {/* CARD 1: DEFCON / THREAT STATUS */}
                        <Link href="/monitor" onClick={closeAll} className="relative group block rounded-2xl overflow-hidden shadow-lg h-full hover:-translate-y-0.5 transition-transform duration-300">
                          <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.7)_100%)] animate-spin [animation-duration:5s] transition-opacity duration-500 pointer-events-none"></div>
                          <div className="absolute inset-[1.5px] bg-[#111] rounded-[14.5px] z-10"></div>
                          <div className="absolute inset-[1.5px] bg-white/[0.02] border border-white/5 group-hover:border-transparent rounded-[14.5px] z-10 transition-colors duration-500"></div>
                          
                          <div className="relative z-20 p-4 h-full flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-red-400 group-hover:bg-red-500/10 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                              </div>
                              <span className={`${jetBrainsMono.className} text-[8px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest`}>Alert</span>
                            </div>
                            <div>
                              <h4 className={`${spaceGrotesk.className} text-white font-bold text-sm mb-0.5`}>DEFCON 2</h4>
                              <p className="text-[10px] text-zinc-400 font-light">Global Threat Active</p>
                            </div>
                          </div>
                        </Link>

                        {/* CARD 2: NETWORK / NODE HEALTH */}
                        <Link href="/monitor" onClick={closeAll} className="relative group block rounded-2xl overflow-hidden shadow-lg h-full hover:-translate-y-0.5 transition-transform duration-300">
                          <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.7)_100%)] animate-spin [animation-duration:7s] transition-opacity duration-500 pointer-events-none"></div>
                          <div className="absolute inset-[1.5px] bg-[#111] rounded-[14.5px] z-10"></div>
                          <div className="absolute inset-[1.5px] bg-white/[0.02] border border-white/5 group-hover:border-transparent rounded-[14.5px] z-10 transition-colors duration-500"></div>
                          
                          <div className="relative z-20 p-4 h-full flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                              </div>
                              <span className={`${jetBrainsMono.className} text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest`}>Online</span>
                            </div>
                            <div>
                              <h4 className={`${spaceGrotesk.className} text-white font-bold text-sm mb-0.5`}>Node Health</h4>
                              <p className="text-[10px] text-zinc-400 font-light">Zero Packet Leakage</p>
                            </div>
                          </div>
                        </Link>

                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SYNDICATE MEGA MENU */}
          <div className="group" onMouseEnter={() => setActiveMenu('syndicate')}>
            <Link href="/about" className={`px-2 py-2 text-sm font-semibold transition-colors duration-300 flex items-center gap-1 ${activeMenu === 'syndicate' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
              Syndicate
              <svg className="w-3 h-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </Link>

            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-out z-50 w-[640px] ${activeMenu === 'syndicate' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
              <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-4 shadow-2xl flex gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50"></div>
                
                <div className="w-1/3 flex flex-col gap-1.5 relative z-10 p-2 border-r border-white/5">
                  <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 mb-2 px-3`}>Organization</span>
                  <Link href="/about" onMouseEnter={() => setSyndicateTab('about')} onClick={closeAll} className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${syndicateTab === 'about' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
                    About Us <span>&rarr;</span>
                  </Link>
                  <Link href="/team" onMouseEnter={() => setSyndicateTab('team')} onClick={closeAll} className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${syndicateTab === 'team' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
                    Core Team <span>&rarr;</span>
                  </Link>
                  <Link href="/author" onMouseEnter={() => setSyndicateTab('authors')} onClick={closeAll} className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${syndicateTab === 'authors' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
                    Authors <span>&rarr;</span>
                  </Link>
                  <Link href="/careers" onMouseEnter={() => setSyndicateTab('careers')} onClick={closeAll} className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${syndicateTab === 'careers' ? 'bg-white/10 text-white font-bold' : 'text-zinc-400 hover:text-white'}`}>
                    Careers <span>&rarr;</span>
                  </Link>
                </div>

                <div className="w-2/3 relative z-10 flex flex-col justify-center p-2 min-h-[160px]">
                  {syndicateTab === 'about' && (
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 flex flex-col justify-center h-[135px] animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] bg-white/10 text-white px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold mb-2 w-max`}>Philosophy</span>
                      <h4 className={`${spaceGrotesk.className} text-white font-bold text-sm mb-1`}>Uncompromised Truth</h4>
                      <p className="text-xs text-zinc-400 font-light">We bypass algorithmic echo chambers for unedited reality.</p>
                    </div>
                  )}
                  {syndicateTab === 'team' && (
                    <div className="bg-[#111] border border-white/5 rounded-2xl p-5 flex flex-col justify-center h-[135px] animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] bg-white/10 text-white px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold mb-2 w-max`}>Core Operative</span>
                      <h4 className={`${spaceGrotesk.className} text-white font-bold text-sm mb-1`}>Alex Vance</h4>
                      <p className="text-xs text-zinc-400 font-light">Lead Cybersecurity Investigator & Data Analyst.</p>
                    </div>
                  )}
                  {syndicateTab === 'authors' && (
                    <div className="flex flex-col gap-2 animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 px-1`}>Top Contributors (2)</span>
                      <div className="grid grid-cols-2 gap-2">
                        {data.authors?.[0] ? <NavCard href={`/author/${data.authors[0].id}`} label="Author" title={data.authors[0].name} subtitle={data.authors[0].role} image={data.authors[0].avatar} /> : <div className="text-xs text-zinc-500 p-2">No authors found.</div>}
                        {data.authors?.[1] ? <NavCard href={`/author/${data.authors[1].id}`} label="Author" title={data.authors[1].name} subtitle={data.authors[1].role} image={data.authors[1].avatar} /> : null}
                      </div>
                    </div>
                  )}
                  {syndicateTab === 'careers' && (
                    <div className="flex flex-col gap-2 animate-[fade-in-up_0.2s_ease-out]">
                      <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 px-1`}>Latest Open Terminals (2)</span>
                      <div className="grid grid-cols-2 gap-2">
                        {data.jobs?.[0] ? <NavCard href={`/careers/apply/${data.jobs[0].id}`} label="Hiring" title={data.jobs[0].role} subtitle={data.jobs[0].location} /> : <div className="text-xs text-zinc-500 p-2">No active terminals.</div>}
                        {data.jobs?.[1] ? <NavCard href={`/careers/apply/${data.jobs[1].id}`} label="Hiring" title={data.jobs[1].role} subtitle={data.jobs[1].location} /> : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link href="/contact" onClick={closeAll} onMouseEnter={() => setActiveMenu(null)} className={`px-2 py-2 text-sm font-semibold transition-colors duration-300 ${pathname === '/contact' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
            Contact
          </Link>
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex items-center gap-4 relative z-20">
          
          {/* SEARCH BAR WITH CIRCLING BEAM GLOW */}
          <div className="relative group p-[1.5px] rounded-full overflow-hidden">
            <div className="absolute inset-[-150%] z-0 opacity-50 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.7)_100%)] animate-spin [animation-duration:6s] pointer-events-none"></div>
            <form onSubmit={handleSearch} className="relative z-10 flex items-center bg-[#050505] rounded-full px-2 py-0.5 overflow-hidden">
              <input type="text" placeholder="Search intel..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-0 bg-transparent text-white placeholder-zinc-500 focus:outline-none transition-all duration-500 group-hover:w-40 group-hover:pl-3 py-1.5 text-sm" />
              <button type="submit" className="p-2 text-zinc-400 hover:text-white transition-colors duration-300 shrink-0"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
            </form>
          </div>
          
          {/* SUBMIT INTEL CTA WITH CIRCLING BEAM GLOW */}
          <div className="relative group p-[1.5px] rounded-full overflow-hidden inline-block">
            <div className="absolute inset-[-150%] z-0 opacity-80 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.9)_100%)] animate-spin [animation-duration:4s]"></div>
            <Link href="/share" onClick={closeAll} className="relative z-10 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest bg-white text-black transition-all duration-300 hover:bg-zinc-200 block text-center">
              Submit Intel
            </Link>
          </div>
        </div>

        {/* MOBILE HAMBURGER ICON */}
        <div className="lg:hidden flex items-center relative z-50">
          <button onClick={toggleMobileMenu} className="text-zinc-400 hover:text-white focus:outline-none transition-colors p-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE RESEND-STYLE DRILL-DOWN MENU */}
      <div className={`fixed inset-0 bg-[#050505] z-40 transition-transform duration-500 lg:hidden flex flex-col h-screen overflow-y-auto ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-[#050505] sticky top-0 z-50">
          {mobileView !== 'main' ? (
            <button onClick={() => setMobileView('main')} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg> Back
            </button>
          ) : (
            <img src="/final_no_bg.png" alt="Logo" className="w-8 h-8 object-contain" />
          )}
          <div className="w-8"></div>
        </div>

        <div className="flex-1 px-6 py-8 pb-32">
          
          {mobileView === 'main' && (
            <div className="flex flex-col gap-4 animate-[fade-in-up_0.3s_ease-out]">
              <div className="relative group p-[1.5px] rounded-2xl overflow-hidden w-full mb-2">
                <div className="absolute inset-[-150%] z-0 opacity-80 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.9)_100%)] animate-spin [animation-duration:4s]"></div>
                <Link href="/share" onClick={closeAll} className="relative z-10 w-full bg-white text-black px-6 py-4 rounded-2xl font-bold text-sm text-center block">Submit Intelligence</Link>
              </div>
              
              <form onSubmit={handleSearch} className="flex items-center bg-white/5 rounded-2xl border border-white/10 px-4 py-3 mb-4">
                <input type="text" placeholder="Search intel..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent w-full text-white focus:outline-none text-sm placeholder-zinc-500" />
                <button type="submit" className="text-zinc-500 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
              </form>

              <Link href="/" onClick={closeAll} className="py-4 block border-b border-white/5 text-lg font-medium text-zinc-300 hover:text-white">Home</Link>
              <button onClick={() => setMobileView('intelligence')} className="flex items-center justify-between py-4 text-left text-lg font-medium text-zinc-300 border-b border-white/5 hover:text-white">
                Intelligence <span className="text-zinc-600">&rarr;</span>
              </button>
              <button onClick={() => setMobileView('syndicate')} className="flex items-center justify-between py-4 text-left text-lg font-medium text-zinc-300 border-b border-white/5 hover:text-white">
                Syndicate <span className="text-zinc-600">&rarr;</span>
              </button>
              <Link href="/contact" onClick={closeAll} className="py-4 block border-b border-white/5 text-lg font-medium text-zinc-300 hover:text-white">Contact</Link>
            </div>
          )}

          {mobileView === 'intelligence' && (
            <div className="flex flex-col gap-6 animate-[fade-in-up_0.3s_ease-out]">
              <span className={`${jetBrainsMono.className} text-xs uppercase tracking-widest text-zinc-500`}>Select Sector</span>
              {data.videos?.[0] && <NavCard href={`/watch/${data.videos[0].id}`} label="Latest Video" title={data.videos[0].title} image={data.videos[0].image} />}
              {data.articles?.[0] && <NavCard href={`/blogs/${data.articles[0].slug}`} label="Latest Article" title={data.articles[0].title} image={data.articles[0].image} />}
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <Link href="/videos" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">All Videos &rarr;</Link>
                <Link href="/blogs" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">All Articles &rarr;</Link>
                <Link href="/archives" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">Master Archives &rarr;</Link>
                <Link href="/monitor" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">Threat Matrix &rarr;</Link>
              </div>
            </div>
          )}

          {mobileView === 'syndicate' && (
            <div className="flex flex-col gap-6 animate-[fade-in-up_0.3s_ease-out]">
              <span className={`${jetBrainsMono.className} text-xs uppercase tracking-widest text-zinc-500`}>Organization</span>
              <div className="grid grid-cols-2 gap-4">
                 {data.jobs?.[0] ? <NavCard href={`/careers/apply/${data.jobs[0].id}`} label="Hiring" title={data.jobs[0].role} /> : <NavCard href="/careers" label="Careers" title="Join Network" />}
                 {data.authors?.[0] ? <NavCard href="/author" label="Author" title={data.authors[0].name} image={data.authors[0].avatar} /> : <NavCard href="/author" label="Team" title="Core Operatives" />}
              </div>
              <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                <Link href="/about" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">About Us &rarr;</Link>
                <Link href="/team" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">Core Team &rarr;</Link>
                <Link href="/author" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">Authors &rarr;</Link>
                <Link href="/careers" onClick={closeAll} className="py-3 text-lg font-medium text-zinc-300">Careers &rarr;</Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}