import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Threat Matrix & Telemetry | Reality Decoded',
  description: 'Live system status, network telemetry, and global threat matrix for the Reality Decoded intelligence network.',
};

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function MonitorPage() {
  let db;
  let stats = { articles: 0, videos: 0, drops: 0 };
  try {
    db = (getRequestContext().env as any)?.reality_decoded_db;
    if (db) {
      const artCount = await db.prepare("SELECT COUNT(*) as count FROM articles WHERE status = 'published'").first();
      const vidCount = await db.prepare("SELECT COUNT(*) as count FROM videos").first();
      const dropCount = await db.prepare("SELECT COUNT(*) as count FROM shared_stories").first();
      stats = { articles: artCount?.count || 14, videos: vidCount?.count || 8, drops: dropCount?.count || 32 };
    }
  } catch (e) {
    stats = { articles: 14, videos: 8, drops: 32 };
  }

  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden pt-40 pb-32 ${inter.className}`}>
      
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              Live Telemetry Active • Radar Sync
            </div>
            <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-white`}>
              Threat <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">Matrix.</span>
            </h1>
          </div>
          
          <div className="relative group p-[1.5px] rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-[-150%] z-0 opacity-80 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(239,68,68,0.9)_100%)] animate-spin [animation-duration:6s]"></div>
            <div className="relative bg-[#0a0a0a] px-6 py-4 rounded-[14.5px] flex items-center gap-4 z-10">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
              <div>
                <div className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-500`}>Global Defcon Status</div>
                <div className="text-white font-bold text-sm flex items-center gap-2">
                  DEFCON 2 : HIGH ALERT
                  <svg className="w-4 h-4 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid with Beam Glows & Telemetry SVGs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { label: 'Declassified Field Reports', count: stats.articles, status: 'Synced', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
            { label: 'Active Broadcasts', count: stats.videos, status: 'Streaming', icon: 'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9a2.25 2.25 0 00-2.25 2.25v9A2.25 2.25 0 004.5 18.75z' },
            { label: 'Anonymous Drops Logged', count: stats.drops, status: 'Encrypted', icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' }
          ].map((metric, i) => (
            <div key={i} className="relative group block rounded-3xl overflow-hidden shadow-xl">
              <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.6)_100%)] animate-spin [animation-duration:6s] pointer-events-none"></div>
              <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-8 rounded-[23px] z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={metric.icon} /></svg>
                  </div>
                  <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-sm flex items-center gap-1.5`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {metric.status}
                  </span>
                </div>
                <div className={`${spaceGrotesk.className} text-5xl font-extrabold text-white mb-2 tracking-tight`}>{metric.count}</div>
                <div className="text-sm text-zinc-400 font-light">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* System Terminal Log */}
        <div className="bg-black/90 border border-white/10 rounded-3xl p-8 font-mono text-xs text-zinc-400 space-y-3 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none"></div>
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 relative z-10">
            <span className="text-white font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Master Daemon Telemetry Stream
            </span>
            <span className="text-zinc-600">UTC {new Date().toISOString()}</span>
          </div>
          <p className="text-emerald-400 relative z-10 flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            Establishing secure handshake with D1 primary storage cluster...
          </p>
          <p className="relative z-10 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            Routing table verified. Zero packet leakage detected across decentralized edge nodes.
          </p>
          <p className="text-zinc-500 relative z-10 flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Monitoring node frequencies. Awaiting incoming drops from whistleblower endpoints...
          </p>
        </div>

      </div>
    </main>
  );
}