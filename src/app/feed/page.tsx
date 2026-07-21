"use client";

import { useState } from 'react';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default function FeedPage() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `// Reality Decoded OSINT Ingest Script (JavaScript)
async function fetchSyndicateIntelligence() {
  const response = await fetch('https://realitydecoded.in/api/share', {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });
  const telemetry = await response.json();
  console.log("Declassified Intelligence Streams:", telemetry);
}
fetchSyndicateIntelligence();`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/api/share',
      category: 'Intelligence',
      desc: 'Retrieves recent public intelligence drops and whistleblower submissions in structured JSON format.',
      href: '/api/share',
      // Database / Drop Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 3.75v3.75m-16.5-3.75v3.75" />
    },
    {
      method: 'GET',
      path: '/feed.xml',
      category: 'Syndication',
      desc: 'Standard RSS 2.0 XML syndication feed for all published field reports and dossier summaries.',
      href: '/feed.xml',
      // RSS Broadcast Wave Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    },
    {
      method: 'GET',
      path: '/blogs',
      category: 'Field Reports',
      desc: 'Access master field reports, dossier summaries, and investigative article indexes.',
      href: '/blogs',
      // Newspaper / Article Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    },
    {
      method: 'GET',
      path: '/videos',
      category: 'Broadcasts',
      desc: 'Dedicated broadcast stream index for cinematic video logs and documentary releases.',
      href: '/videos',
      // Video Play Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    },
    {
      method: 'GET',
      path: '/monitor',
      category: 'Telemetry',
      desc: 'Returns live node operational health, edge synchronization metrics, and current DEFCON threat level.',
      href: '/monitor',
      // Activity / Pulse Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    },
    {
      method: 'GET',
      path: '/search?q={query}',
      category: 'Query Engine',
      desc: 'Programmatic search endpoint to query title parameters, tags, and declassified categories.',
      href: '/search?q=investigation',
      // Magnifying Glass Search Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    },
    {
      method: 'GET',
      path: '/author',
      category: 'Directory',
      desc: 'Public metadata directory of core investigative operatives and publication counts.',
      href: '/author',
      // User / Operative Badge Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    },
    {
      method: 'GET',
      path: '/archives',
      category: 'Database',
      desc: 'Structured access to master declassified article categories, tags, and historical logs.',
      href: '/archives',
      // Folder / Vault Archive Icon
      svg: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    }
  ];

  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden pt-40 pb-32 ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              Open Data Specification v2.4
            </div>
            <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold tracking-tight mb-4 uppercase text-white`}>
              Public API & <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Data Feeds.</span>
            </h1>
            <p className="text-zinc-500 font-light tracking-wide text-sm max-w-xl">
              Ingest structured intelligence data programmatically for academic research, automated RSS ingest, and analytical syndication.
            </p>
          </div>
          
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-xl">
            <svg className="w-7 h-7 text-zinc-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
        </div>

        {/* Quick Protocols Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Authentication', val: 'None Required (Public)' },
            { label: 'Rate Limit', val: '1,000 req / min per node' },
            { label: 'Response Format', val: 'JSON / RSS 2.0 XML' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/10 p-5 rounded-2xl backdrop-blur-xl">
              <div className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500 mb-1`}>{item.label}</div>
              <div className="text-white font-bold text-xs">{item.val}</div>
            </div>
          ))}
        </div>

        {/* Endpoints List with Beam Glows & Unique SVGs */}
        <div className="space-y-6">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="relative group block rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-[-150%] z-0 opacity-30 group-hover:opacity-80 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] animate-spin [animation-duration:8s] pointer-events-none"></div>
              <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[15px] z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5 group-hover:text-white group-hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      {ep.svg}
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`${jetBrainsMono.className} text-[9px] bg-white/10 text-white px-2.5 py-1 rounded font-bold uppercase tracking-widest border border-white/10`}>
                        {ep.method}
                      </span>
                      <span className={`${jetBrainsMono.className} text-[9px] text-zinc-500 uppercase tracking-widest bg-white/[0.03] px-2 py-0.5 rounded`}>
                        {ep.category}
                      </span>
                    </div>
                    <span className="font-mono text-sm text-zinc-200 block mb-1">{ep.path}</span>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">{ep.desc}</p>
                  </div>
                </div>
                
                <div className="relative group/btn p-[1.5px] rounded-xl overflow-hidden shrink-0">
                  <div className="absolute inset-[-150%] z-0 opacity-60 group-hover/btn:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.9)_100%)] animate-spin [animation-duration:4s]"></div>
                  <Link href={ep.href} target="_blank" className={`${jetBrainsMono.className} relative z-10 px-5 py-3 bg-white text-black rounded-[10px] text-xs font-bold uppercase tracking-widest text-center transition-colors block shadow-md hover:bg-zinc-200`}>
                    Access Stream &rarr;
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CODE SNIPPET BOX WITH CIRCLING BEAM GLOW & COPY BUTTON */}
        <div className="mt-16 relative group rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-[-150%] z-0 opacity-60 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.8)_100%)] animate-spin [animation-duration:6s] pointer-events-none"></div>
          
          <div className="relative bg-[#080808]/95 backdrop-blur-2xl border border-white/10 rounded-[22px] p-6 md:p-8 z-10">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className={`${jetBrainsMono.className} text-xs text-zinc-400 font-bold ml-2 tracking-widest`}>
                  API_FETCH_PAYLOAD.js
                </span>
              </div>

              <button 
                onClick={handleCopy}
                className={`${jetBrainsMono.className} flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest transition-all duration-300`}
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="overflow-x-auto py-2 font-mono text-xs leading-relaxed text-zinc-300">
              <code>
                <span className="text-zinc-600">// Reality Decoded OSINT Ingest Script (JavaScript)</span>{"\n"}
                <span className="text-purple-400 font-semibold">async function</span> <span className="text-blue-400">fetchSyndicateIntelligence</span>() &#123;{"\n"}
                {"  "}<span className="text-purple-400 font-semibold">const</span> response = <span className="text-purple-400 font-semibold">await</span> <span className="text-yellow-300">fetch</span>(<span className="text-emerald-400">&apos;https://realitydecoded.in/api/share&apos;</span>, &#123;{"\n"}
                {"    "}method: <span className="text-emerald-400">&apos;GET&apos;</span>,{"\n"}
                {"    "}headers: &#123; <span className="text-emerald-400">&apos;Accept&apos;</span>: <span className="text-emerald-400">&apos;application/json&apos;</span> &#125;{"\n"}
                {"  "}&#125;);{"\n"}
                {"  "}<span className="text-purple-400 font-semibold">const</span> telemetry = <span className="text-purple-400 font-semibold">await</span> response.<span className="text-yellow-300">json</span>();{"\n"}
                {"  "}console.<span className="text-yellow-300">log</span>(<span className="text-emerald-400">&quot;Declassified Intelligence Streams:&quot;</span>, telemetry);{"\n"}
                &#125;{"\n"}
                <span className="text-blue-400">fetchSyndicateIntelligence</span>();
              </code>
            </pre>

          </div>
        </div>

      </div>
    </main>
  );
}