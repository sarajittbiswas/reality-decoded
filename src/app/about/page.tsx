export const runtime = 'edge';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
            Beyond The <span className="text-red-600">Surface</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Reality Decoded is an independent investigative platform dedicated to uncovering the truth behind corporate narratives, digital illusions, and hidden systems.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-extrabold text-white mb-6 border-l-4 border-red-600 pl-4 uppercase tracking-wide">
              Our Mission
            </h2>
            <div className="bg-[#111] p-8 rounded-2xl border border-white/5 text-gray-300 leading-relaxed space-y-4 shadow-xl">
              <p>
                In an era of algorithmic manipulation and PR-filtered reality, the truth is rarely on the front page. We believe that raw, unedited facts are the most valuable currency in the modern world.
              </p>
              <p>
                We don't do opinion pieces. We follow the paper trails, verify the public drops, and present the evidence. Our team of researchers, open-source intelligence (OSINT) analysts, and whistleblowers work globally to decode the stories that others won't touch.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold text-white mb-6 border-l-4 border-red-600 pl-4 uppercase tracking-wide">
              Independence & Funding
            </h2>
            <div className="bg-[#111] p-8 rounded-2xl border border-white/5 text-gray-300 leading-relaxed shadow-xl">
              <p>
                To maintain absolute editorial integrity, Reality Decoded accepts zero corporate sponsorships or venture capital. We are entirely funded by our community of viewers and private, no-strings-attached grants. 
              </p>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}