import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { getRequestContext } from '@cloudflare/next-on-pages';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';

export default async function CareersPage() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // 1. Fetch only jobs where the expiration date is in the future
  const { results: activeJobs } = await db.prepare(
    "SELECT * FROM syndicate_jobs WHERE expires_at > datetime('now') AND (is_active = 1 OR is_active IS NULL) ORDER BY created_at DESC"
  ).all();
  
  // 2. Track Page Views Directly in the Database (Server-side) [UNTOUCHED]
  try {
    const date = new Date().toISOString().split('T')[0];
    const analyticsId = `career_home_home_${date}`;
    await db.prepare(
      "INSERT INTO hr_analytics (id, page_type, job_id, date, views) VALUES (?, 'career_home', 'home', ?, 1) ON CONFLICT(id) DO UPDATE SET views = views + 1"
    ).bind(analyticsId, date).run();
  } catch (error) {
    console.error("Tracking error:", error);
  }

  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden pb-32 ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .load-reveal { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 text-center border-b border-white/5 pb-16 load-reveal" style={{ animationDelay: '0.1s' }}>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            Recruitment Protocol Active
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase text-white`}>
            Join The <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-600 drop-shadow-sm">Syndicate.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
            We aren't just creating content. We are decoding reality. We are looking for relentless researchers, cinematic storytellers, and truth-seekers to join our ranks.
          </p>
        </div>

        {/* Core Values (Beam Glow Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Uncensored Impact", desc: "We don't bow to corporate narratives. You will have the freedom to follow the story wherever the facts lead." },
            { title: "Cinematic Quality", desc: "We treat every investigation like a feature film. Work with top-tier assets and post-production standards." },
            { title: "Remote First", desc: "Truth has no borders. Work from anywhere in the world, on a schedule that fits the investigation." }
          ].map((value, i) => (
            
            <div key={i} className="relative group block h-full load-reveal" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-shadow duration-500 pointer-events-none">
                {/* 🚨 BULLETPROOF FIX */}
                <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] animate-spin [animation-duration:6s] transition-opacity duration-500"></div>
                <div className="absolute inset-[1.5px] bg-[#050505] rounded-[22.5px] z-10"></div>
                <div className="absolute inset-[1.5px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 group-hover:border-transparent rounded-[22.5px] z-10 transition-colors duration-500"></div>
              </div>

              <div className="relative p-8 flex flex-col h-full z-20">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-black transition-colors"></div>
                </div>
                <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-3 group-hover:text-zinc-200 transition-colors`}>{value.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">{value.desc}</p>
              </div>
            </div>

          ))}
        </div>

        {/* Open Positions */}
        <div className="mb-12 flex items-center justify-between load-reveal" style={{ animationDelay: '0.4s' }}>
          <h2 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-extrabold text-white flex items-center gap-4 uppercase tracking-wide`}>
            <span className="w-2 h-8 bg-zinc-300 rounded-sm"></span>
            Open Terminals
          </h2>
          <span className={`${jetBrainsMono.className} text-[10px] font-bold text-zinc-300 bg-white/10 border border-white/20 px-3 py-1.5 rounded-sm uppercase tracking-widest hidden md:block`}>{activeJobs.length} Nodes Available</span>
        </div>
        
        <div className="space-y-4 mb-20">
          {activeJobs.length === 0 ? (
            <div className={`${jetBrainsMono.className} text-center text-zinc-500 py-12 border border-dashed border-white/10 rounded-2xl bg-white/[0.01] uppercase tracking-widest text-xs font-bold`}>
               No active terminals available. The network is currently full.
            </div>
          ) : (
            activeJobs.map((job: any, i: number) => (
              <div key={job.id} className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] load-reveal" style={{ animationDelay: `${0.5 + (i * 0.1)}s` }}>
                <div>
                  <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-200 mb-4 group-hover:text-white transition-colors`}>
                    {job.role}
                  </h3>
                  <div className={`${jetBrainsMono.className} flex flex-wrap gap-3 text-[10px] text-zinc-400 font-bold uppercase tracking-widest`}>
                    <span className="bg-[#050505] border border-white/10 px-3 py-1.5 rounded-sm group-hover:border-white/30 transition-colors">📍 {job.location}</span>
                    <span className="bg-[#050505] border border-white/10 px-3 py-1.5 rounded-sm group-hover:border-white/30 transition-colors">⏱️ {job.type}</span>
                  </div>
                </div>
                <a href={`/careers/apply/${job.id}`} className={`${jetBrainsMono.className} mt-6 md:mt-0 px-8 py-3.5 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all duration-300 uppercase tracking-widest text-[10px] text-center shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:scale-105`}>
                  Initialize
                </a>
              </div>
            ))
          )}
        </div>

        {/* Tracker & CTA Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Tracking Module */}
          <div className="bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 load-reveal flex flex-col justify-center shadow-xl" style={{ animationDelay: '0.8s' }}>
            <h3 className={`${spaceGrotesk.className} text-3xl font-extrabold text-white mb-3 tracking-tight`}>Track Clearance</h3>
            <p className="text-zinc-400 text-sm mb-8 font-light">Enter your unique transmission ID to view your application status.</p>
            <form action="/careers/status" method="GET" className="flex flex-col gap-4">
              <input 
                type="text" 
                name="id"
                placeholder="SYND-XXXX-XXXX" 
                className={`${jetBrainsMono.className} bg-[#050505] border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 transition-all uppercase tracking-widest text-center text-sm`}
                required
              />
              <button type="submit" className={`${jetBrainsMono.className} w-full py-4 bg-white/5 text-zinc-300 border border-white/10 rounded-xl font-bold hover:bg-white hover:text-black transition-all uppercase tracking-widest text-[10px]`}>
                Decrypt Status
              </button>
            </form>
          </div>

          {/* General Pitch CTA */}
          <div className="relative bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 text-center overflow-hidden group load-reveal flex flex-col justify-center items-center shadow-xl" style={{ animationDelay: '0.9s' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className={`${spaceGrotesk.className} text-3xl font-extrabold text-white mb-4 relative z-10 tracking-tight`}>Don't see your role?</h3>
            <p className="text-zinc-400 mb-10 relative z-10 font-light leading-relaxed max-w-sm">
              If you have a unique skill set and a passion for uncovering the truth, pitch us your role directly.
            </p>
            <a href="mailto:hello@realitydecoded.in" className={`${jetBrainsMono.className} relative z-10 inline-block bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.15)] uppercase tracking-widest text-[10px]`}>
              Transmit Portfolio
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}