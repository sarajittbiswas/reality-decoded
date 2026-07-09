import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function BlogsPage() {
  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative pb-32">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-20 right-0 w-[40%] h-[40%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 uppercase`}>
              Field <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500">Reports</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl font-light">
              Official written investigations, document dumps, and verified public drops from our community.
            </p>
          </div>
          <a href="/share" className="shrink-0 bg-white text-purple-900 font-bold px-6 py-3 rounded-lg hover:bg-purple-500 hover:text-white transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] uppercase tracking-widest text-sm">
            Submit a Drop
          </a>
        </div>

        <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4 uppercase tracking-wide`}>
          Official Investigations
        </h2>
        
        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <a href="/blogs/corporate-shell-games" className="block group">
            <article className="cursor-pointer h-full bg-[#111111]/80 backdrop-blur-md rounded-2xl border border-white/5 p-4 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] flex flex-col">
              <div className="aspect-[16/9] bg-gray-900 rounded-xl overflow-hidden mb-6 relative">
                <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600" alt="Documents" className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute top-4 left-4 bg-purple-600/90 backdrop-blur text-white text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-widest border border-purple-400/30">
                  Deep Dive
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mb-3 px-2">
                <span className="text-purple-400">RD Team</span>
                <span>•</span>
                <span>July 8, 2026</span>
              </div>
              <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight px-2`}>
                Corporate Shell Games: Tracing the Offshore Billions
              </h3>
              <p className="text-gray-400 line-clamp-3 px-2 font-light">
                We acquired 4,000 pages of leaked customs manifests. Here is the written breakdown of how modern tech giants are routing hardware through neutral ports to avoid oversight.
              </p>
            </article>
          </a>

          <a href="/blogs/digital-breadcrumbs" className="block group">
            <article className="cursor-pointer h-full bg-[#111111]/80 backdrop-blur-md rounded-2xl border border-white/5 p-4 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] flex flex-col">
              <div className="aspect-[16/9] bg-gray-900 rounded-xl overflow-hidden mb-6 relative">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600" alt="Servers" className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
                <div className="absolute top-4 left-4 bg-purple-600/90 backdrop-blur text-white text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-widest border border-purple-400/30">
                  Analysis
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mb-3 px-2">
                <span className="text-purple-400">Lead Investigator</span>
                <span>•</span>
                <span>July 2, 2026</span>
              </div>
              <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight px-2`}>
                Following the Digital Breadcrumbs: A Method to the Madness
              </h3>
              <p className="text-gray-400 line-clamp-3 px-2 font-light">
                A step-by-step written guide on the open-source intelligence (OSINT) tools we use to verify corporate filings and uncover hidden shell companies.
              </p>
            </article>
          </a>
        </div>

        {/* SECTION 2: Public Drops */}
        <div className="bg-[#111111]/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-20"></div>
          
          <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-6">
            <h2 className={`${spaceGrotesk.className} text-2xl font-extrabold text-white flex items-center gap-3`}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              PUBLIC DROPS
            </h2>
            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">Crowdsourced</span>
          </div>

          <div className="space-y-8">
            <article className="relative border-l border-purple-500/30 pl-8 hover:border-purple-400 transition-colors group">
              {/* Node indicator */}
              <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-purple-500 group-hover:bg-purple-400 group-hover:shadow-[0_0_10px_#a855f7] transition-all"></div>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#1a1a1a] text-gray-300 border border-white/10 text-[10px] font-mono px-2 py-1 rounded uppercase tracking-widest">
                  Anonymous
                </span>
                <span className="text-xs text-green-500 font-mono flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Verified by RD Staff
                </span>
              </div>
              <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors`}>
                The factory conditions they aren't reporting
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light italic">
                "I've worked on the assembly floor for three years. The recent safety inspections were completely staged. They moved the hazardous materials to off-site storage 24 hours before the inspectors arrived..."
              </p>
              <a href="/blogs/factory-conditions" className="inline-flex items-center gap-2 text-purple-400 text-xs font-mono font-bold hover:text-purple-300 transition-colors uppercase tracking-widest">
                Decrypt Full File &rarr;
              </a>
            </article>
          </div>
        </div>

      </div>
    </main>
  );
}