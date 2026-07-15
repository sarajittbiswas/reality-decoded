import { Space_Grotesk } from 'next/font/google';
import { getRequestContext } from '@cloudflare/next-on-pages';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

export default async function CareersPage() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // 1. Fetch only jobs where the expiration date is in the future
  const { results: activeJobs } = await db.prepare(
    "SELECT * FROM syndicate_jobs WHERE expires_at > datetime('now') AND (is_active = 1 OR is_active IS NULL) ORDER BY created_at DESC"
  ).all();
  // 2. NEW: Track Page Views Directly in the Database (Server-side)
  try {
    const date = new Date().toISOString().split('T')[0];
    const analyticsId = `career_home_home_${date}`;
    await db.prepare(
      "INSERT INTO hr_analytics (id, page_type, job_id, date, views) VALUES (?, 'career_home', 'home', ?, 1) ON CONFLICT(id) DO UPDATE SET views = views + 1"
    ).bind(analyticsId, date).run();
  } catch (error) {
    // We wrap this in a try/catch so if analytics fails for any reason, 
    // it doesn't break the page for the user. It just silently skips tracking.
    console.error("Tracking error:", error);
  }

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative pb-32">
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .load-reveal { animation: fade-in-up 0.8s ease-out forwards; opacity: 0; }
      `}</style>

      <div className="absolute top-0 right-1/4 w-[40%] h-[40%] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 text-center border-b border-white/5 pb-16 load-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Recruitment Protocol Active
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-6 uppercase`}>
            Join The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Syndicate.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            We aren't just creating content. We are decoding reality. We are looking for relentless researchers, cinematic storytellers, and truth-seekers to join our ranks.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Uncensored Impact", desc: "We don't bow to corporate narratives. You will have the freedom to follow the story wherever the facts lead." },
            { title: "Cinematic Quality", desc: "We treat every investigation like a feature film. Work with top-tier assets and post-production standards." },
            { title: "Remote First", desc: "Truth has no borders. Work from anywhere in the world, on a schedule that fits the investigation." }
          ].map((value, i) => (
            <div key={i} className="group relative bg-[#111111]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] load-reveal" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-20"></div>
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="w-2 h-2 rounded-full bg-purple-400 group-hover:shadow-[0_0_10px_#a855f7]"></div>
              </div>
              <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors`}>{value.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions - NOW DYNAMIC */}
        <div className="mb-12 flex items-center justify-between load-reveal" style={{ animationDelay: '0.4s' }}>
          <h2 className={`${spaceGrotesk.className} text-3xl font-extrabold text-white flex items-center gap-4 uppercase tracking-wide`}>
            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
            Open Terminals
          </h2>
          <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full hidden md:block">{activeJobs.length} Nodes Available</span>
        </div>
        
        <div className="space-y-4 mb-20">
          {activeJobs.length === 0 ? (
            <div className="text-center text-gray-500 py-10 border border-white/5 rounded-2xl bg-[#111111]/60">
               No active terminals available. The network is currently full.
            </div>
          ) : (
            activeJobs.map((job: any, i: number) => (
              <div key={job.id} className="bg-[#111111]/60 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center justify-between group hover:bg-[#16102b] hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] load-reveal" style={{ animationDelay: `${0.5 + (i * 0.1)}s` }}>
                <div>
                  <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-3 group-hover:text-purple-400 transition-colors`}>
                    {job.role}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 font-mono">
                    <span className="bg-[#1a1a1a] border border-white/10 px-3 py-1 rounded-full group-hover:border-purple-500/30 transition-colors">📍 {job.location}</span>
                    <span className="bg-[#1a1a1a] border border-white/10 px-3 py-1 rounded-full group-hover:border-purple-500/30 transition-colors">⏱️ {job.type}</span>
                  </div>
                </div>
                <a href={`/careers/apply/${job.id}`} className="mt-6 md:mt-0 px-8 py-3 bg-transparent border border-purple-500/50 text-purple-400 rounded-full font-bold hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300 uppercase tracking-widest text-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-center">
                  Initialize
                </a>
              </div>
            ))
          )}
        </div>

        {/* Tracker & CTA Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Tracking Module */}
          <div className="bg-[#111111]/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 load-reveal flex flex-col justify-center" style={{ animationDelay: '0.8s' }}>
            <h3 className={`${spaceGrotesk.className} text-3xl font-bold text-white mb-2`}>Track Clearance</h3>
            <p className="text-gray-400 text-sm mb-6">Enter your unique transmission ID to view your application status.</p>
            <form action="/careers/status" method="GET" className="flex flex-col gap-4">
              <input 
                type="text" 
                name="id"
                placeholder="SYND-XXXX-XXXX" 
                className="bg-black border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition-all font-mono uppercase text-center"
                required
              />
              <button type="submit" className="w-full py-4 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-all uppercase tracking-widest text-sm">
                Decrypt Status
              </button>
            </form>
          </div>

          {/* General Pitch CTA */}
          <div className="relative bg-[#111111]/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 text-center overflow-hidden group load-reveal flex flex-col justify-center items-center" style={{ animationDelay: '0.9s' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className={`${spaceGrotesk.className} text-3xl font-extrabold text-white mb-4 relative z-10`}>Don't see your role?</h3>
            <p className="text-gray-400 mb-8 relative z-10 font-light leading-relaxed">
              If you have a unique skill set and a passion for uncovering the truth, pitch us your role directly.
            </p>
            <a href="mailto:hello@realitydecoded.in" className="relative z-10 inline-block bg-white text-purple-900 font-bold px-10 py-4 rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] uppercase tracking-widest text-sm">
              Transmit Portfolio
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}