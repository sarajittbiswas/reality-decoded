export const runtime = 'edge';

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16 text-center border-b border-white/10 pb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
            Join The <span className="text-red-600">Mission</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We aren't just creating content. We are decoding reality. We are looking for relentless researchers, cinematic storytellers, and truth-seekers to join our ranks.
          </p>
        </div>

        {/* Core Values / Why Join Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-[#111] p-8 rounded-xl border border-white/5 hover:border-red-500/20 transition-colors">
            <h3 className="text-xl font-bold text-white mb-3">Uncensored Impact</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We don't bow to corporate narratives. You will have the freedom to follow the story wherever the facts lead.
            </p>
          </div>
          <div className="bg-[#111] p-8 rounded-xl border border-white/5 hover:border-red-500/20 transition-colors">
            <h3 className="text-xl font-bold text-white mb-3">Cinematic Quality</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We treat every investigation like a feature film. Work with top-tier assets and post-production standards.
            </p>
          </div>
          <div className="bg-[#111] p-8 rounded-xl border border-white/5 hover:border-red-500/20 transition-colors">
            <h3 className="text-xl font-bold text-white mb-3">Remote First</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Truth has no borders. Work from anywhere in the world, on a schedule that fits the investigation.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <h2 className="text-3xl font-extrabold text-white mb-8 border-l-4 border-red-600 pl-4">
          Open Positions
        </h2>
        
        <div className="space-y-4 mb-16">
          {/* Role 1 */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between group hover:border-red-500/40 transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                Lead Investigative Researcher
              </h3>
              <div className="flex gap-4 text-sm text-gray-500 font-mono">
                <span>📍 Remote</span>
                <span>⏱️ Full-Time</span>
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-8 py-3 border border-red-600 text-red-500 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider text-sm">
              Apply Now
            </button>
          </div>

          {/* Role 2 */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between group hover:border-red-500/40 transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                Senior Video Editor (Documentary)
              </h3>
              <div className="flex gap-4 text-sm text-gray-500 font-mono">
                <span>📍 Remote</span>
                <span>⏱️ Contract / Full-Time</span>
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-8 py-3 border border-red-600 text-red-500 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider text-sm">
              Apply Now
            </button>
          </div>

          {/* Role 3 */}
          <div className="bg-[#141414] border border-white/5 p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between group hover:border-red-500/40 transition-all hover:shadow-[0_0_15px_rgba(220,38,38,0.1)]">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                Motion Graphics Artist
              </h3>
              <div className="flex gap-4 text-sm text-gray-500 font-mono">
                <span>📍 Remote</span>
                <span>⏱️ Freelance</span>
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-8 py-3 border border-red-600 text-red-500 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all uppercase tracking-wider text-sm">
              Apply Now
            </button>
          </div>
        </div>

        {/* General Pitch CTA */}
        <div className="bg-gradient-to-r from-red-900/20 to-black p-8 md:p-12 rounded-2xl border border-red-900/30 text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/5 blur-[100px] pointer-events-none"></div>
          
          <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Don't see your role?</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
            We are always looking for exceptional talent. If you have a unique skill set and a passion for uncovering the truth, pitch us your role.
          </p>
          <a href="mailto:hello@realitydecoded.in" className="relative z-10 inline-block bg-white text-black font-extrabold px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors shadow-xl uppercase tracking-widest text-sm">
            Email Your Portfolio
          </a>
        </div>

      </div>
    </main>
  );
}