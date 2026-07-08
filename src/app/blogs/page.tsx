export const runtime = 'edge';

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase">
              Field <span className="text-red-600">Reports</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Official written investigations, document dumps, and verified public drops from our community.
            </p>
          </div>
          <a href="/share" className="shrink-0 bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm">
            Submit a Drop
          </a>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-8 border-l-4 border-red-600 pl-4 uppercase tracking-wide">
          Official Investigations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Featured Blog 1 - FIXED LINK & TEXT */}
          <a href="/blogs/corporate-shell-games" className="block group">
            <article className="cursor-pointer h-full">
              <div className="aspect-[16/9] bg-gray-900 rounded-xl overflow-hidden mb-4 relative">
                <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600" alt="Documents" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">
                  Deep Dive
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mb-3">
                <span>By Reality Decoded Team</span>
                <span>•</span>
                <span>July 8, 2026</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors leading-tight">
                Corporate Shell Games: Tracing the Offshore Billions
              </h3>
              <p className="text-gray-400 line-clamp-3">
                We acquired 4,000 pages of leaked customs manifests. Here is the written breakdown of how modern tech giants are routing hardware through neutral ports to avoid oversight.
              </p>
            </article>
          </a>

          {/* Featured Blog 2 - FIXED BROKEN IMAGE & LINK */}
          <a href="/blogs/digital-breadcrumbs" className="block group">
            <article className="cursor-pointer h-full">
              <div className="aspect-[16/9] bg-gray-900 rounded-xl overflow-hidden mb-4 relative">
                {/* Changed this image to a reliable server-room photo */}
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600" alt="Servers" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest">
                  Analysis
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mb-3">
                <span>By Lead Investigator</span>
                <span>•</span>
                <span>July 2, 2026</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors leading-tight">
                Following the Digital Breadcrumbs: A Method to the Madness
              </h3>
              <p className="text-gray-400 line-clamp-3">
                A step-by-step written guide on the open-source intelligence (OSINT) tools we use to verify corporate filings and uncover hidden shell companies.
              </p>
            </article>
          </a>
        </div>

        {/* SECTION 2: Public Drops */}
        <div className="bg-[#111] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
              PUBLIC DROPS
            </h2>
            <span className="text-sm font-mono text-gray-500">Crowdsourced Intelligence</span>
          </div>

          <div className="space-y-8">
            <article className="border-l-2 border-gray-700 pl-6 hover:border-red-500 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                  Anonymous Contributor
                </span>
                <span className="text-xs text-gray-500 font-mono">Verified by RD Staff</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">The factory conditions they aren't reporting</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                "I've worked on the assembly floor for three years. The recent safety inspections were completely staged. They moved the hazardous materials to off-site storage 24 hours before the inspectors arrived..."
              </p>
              <a href="/blogs/factory-conditions" className="inline-block text-red-500 text-sm font-bold hover:text-white transition-colors uppercase tracking-widest">
                Read Full Drop &rarr;
              </a>
            </article>
          </div>
        </div>

      </div>
    </main>
  );
}