import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whistleblower Protocol & Legal | Reality Decoded',
  description: 'Our absolute source confidentiality framework, zero-retention mandate, and PGP encryption guidelines for secure intelligence drops.',
};

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default function LegalPage() {
  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden pt-40 pb-32 ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Legal Framework & Source Protection Protocol
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold tracking-tight mb-4 uppercase text-white`}>
            Whistleblower <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Privilege.</span>
          </h1>
          <p className="text-zinc-500 font-light tracking-wide text-sm">
            Last Updated: July 2026 • Protocol Version 4.2 • Zero-Retention Mandate
          </p>
        </div>

        {/* Content Body with Beam Glow Cards & Animated SVGs */}
        <div className="space-y-8 text-zinc-300 font-light leading-relaxed">
          
          {/* Section 1: Confidentiality */}
          <div className="relative group block rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.6)_100%)] animate-spin [animation-duration:8s] pointer-events-none"></div>
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[23px] z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                    <svg className="w-6 h-6 text-zinc-200 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500`}>Directive 01</span>
                    <h2 className={`${spaceGrotesk.className} text-xl md:text-2xl font-bold text-white`}>Absolute Source Confidentiality</h2>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className={`${jetBrainsMono.className} text-[9px] text-zinc-500 uppercase tracking-widest`}>Encrypted</span>
                </div>
              </div>
              <p className="mb-4 text-zinc-400">
                Reality Decoded operates under strict journalistic and ethical protection protocols. We recognize that the exposure of systemic corruption relies entirely on the courage of insiders, whistleblowers, and technical contributors.
              </p>
              <p className="text-zinc-400">
                Under our operational charter, we maintain a zero-retention policy for sensitive metadata when utilizing our <Link href="/share" className="text-white underline decoration-white/30 underline-offset-4 hover:text-zinc-200 font-medium">Secure Drop Portal</Link>.
              </p>
            </div>
          </div>

          {/* Section 2: PGP & Cryptography */}
          <div className="relative group block rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.6)_100%)] animate-spin [animation-duration:8s] pointer-events-none"></div>
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[23px] z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                  <svg className="w-6 h-6 text-zinc-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
                <div>
                  <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500`}>Directive 02</span>
                  <h2 className={`${spaceGrotesk.className} text-xl md:text-2xl font-bold text-white`}>Cryptographic Siloing & PGP</h2>
                </div>
              </div>
              <p className="mb-6 text-zinc-400">
                All communications containing classified intelligence should be encrypted using our official PGP Public Key. Once a transmission is decrypted within our secure air-gapped terminal, source identifiers are immediately scrubbed.
              </p>
              
              <div className="relative group/btn inline-block p-[1.5px] rounded-xl overflow-hidden">
                <div className="absolute inset-[-150%] z-0 opacity-70 group-hover/btn:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.9)_100%)] animate-spin [animation-duration:4s]"></div>
                <a href="/public-key.asc" download className={`${jetBrainsMono.className} relative z-10 flex items-center gap-2.5 px-6 py-3.5 bg-white text-black rounded-[10px] text-xs font-bold uppercase tracking-widest transition-colors block text-center shadow-lg`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  <span>Download Official PGP Key (.asc)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Section 3: Decentralized Jurisdiction */}
          <div className="relative group block rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.6)_100%)] animate-spin [animation-duration:8s] pointer-events-none"></div>
            <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[23px] z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
                  <svg className="w-6 h-6 text-zinc-200 animate-spin" style={{ animationDuration: '20s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.25m0 0A17.936 17.936 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500`}>Directive 03</span>
                  <h2 className={`${spaceGrotesk.className} text-xl md:text-2xl font-bold text-white`}>Data Retention & Jurisdiction</h2>
                </div>
              </div>
              <p className="text-zinc-400">
                We do not log visitor IP addresses on secure drop endpoints. Content published on Reality Decoded is distributed across decentralized server networks designed to resist legal suppression, gag orders, and malicious subpoenas.
              </p>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}