import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Methodology | Reality Decoded',
  description: 'How we investigate social issues: RTI filings, public record audits, and on-the-ground journalism.',
};

export default function MethodologyPage() {
  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden pt-40 pb-32 ${inter.className}`}>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-20 border-b border-white/5 pb-12">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Journalistic Protocol
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold tracking-tight mb-6 uppercase text-white`}>
            Investigative <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600">Methodology.</span>
          </h1>
          <p className="text-zinc-400 font-light tracking-wide text-base max-w-3xl leading-relaxed">
            We do not rely on PR statements or access journalism. Reality Decoded rebuilds the truth from the ground up using Right to Information (RTI) laws, public record audits, and rigorous on-the-ground community sourcing. 
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              id: '01', 
              title: 'RTI & Public Record Audits', 
              desc: 'We weaponize the Right to Information Act to force transparency. By extracting unredacted government tenders, municipal budgets, and civic contracts, we map exactly where public funds are being diverted.',
              icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            },
            { 
              id: '02', 
              title: 'Ground Sourcing & Testimony', 
              desc: 'Data only tells half the story. We deploy to the field to verify civic claims, cross-referencing official statistics with the lived reality of marginalized communities and local whistleblowers.',
              icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            },
            { 
              id: '03', 
              title: 'Corporate & NGO Footprinting', 
              desc: 'We map shell companies, proxy directors, and the flow of dark money in the social sector. We expose when charitable organizations and corporate CSR initiatives fail to deliver on their public mandates.',
              icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75'
            },
            { 
              id: '04', 
              title: 'Digital Fact-Checking', 
              desc: 'In an era of deepfakes and orchestrated misinformation, we utilize reverse-image sourcing, metadata extraction, and chronolocation to verify viral claims surrounding social unrest and political movements.',
              icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            }
          ].map((item) => (
            <div key={item.id} className="relative group block rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.6)_100%)] animate-spin [animation-duration:6s] pointer-events-none transition-opacity duration-500"></div>
              <div className="absolute inset-[1.5px] bg-[#0a0a0a] rounded-[22.5px] z-10"></div>
              
              <div className="relative p-8 md:p-10 z-20 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:bg-white/10 transition-all duration-300 shadow-inner">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                  </div>
                  <span className={`${jetBrainsMono.className} text-[10px] uppercase tracking-widest text-zinc-500 font-bold bg-white/5 px-3 py-1 rounded-sm border border-white/5`}>Module {item.id}</span>
                </div>
                <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4`}>{item.title}</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed flex-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}