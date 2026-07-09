import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

// Initialize the premium font
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      
      {/* SCROLL ANIMATION STYLES */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .scroll-reveal {
          animation: fade-in-up 1s ease-out both;
          animation-timeline: view();
          animation-range: entry 5% cover 20%;
        }
        .load-reveal {
          animation: fade-in-up 1s ease-out forwards;
        }
        @supports not (animation-timeline: view()) {
          .scroll-reveal {
            animation: fade-in-up 1s ease-out forwards;
          }
        }
      `}</style>

      {/* 1. HERO SECTION (The Mission) */}
      <section className="relative w-full pt-40 pb-24 px-6 load-reveal flex flex-col items-center text-center border-b border-white/5">
        
        {/* Ambient Purple Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl h-64 bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="mb-6 inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold uppercase tracking-widest border border-purple-500/20">
            Our Mission
          </span>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight`}>
            The truth isn't hidden. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              It's just ignored.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Reality Decoded was built to tear down the artificial narratives constructed by algorithms and corporate media. We exist to find the signal in the noise.
          </p>
        </div>
      </section>

      {/* 2. THE STORY SECTION (50/50 Split) */}
      <section className="relative max-w-7xl mx-auto px-6 py-32 z-10 scroll-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Abstract Image Box */}
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden group border border-white/10 bg-[#111]">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-purple-500 to-transparent transition-colors duration-500 z-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop" 
              alt="Data and code" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100 mix-blend-luminosity"
            />
            {/* Inner Shadow to make the image blend */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a] via-transparent to-[#0a0a0a]/50"></div>
          </div>

          {/* Right Side: Text */}
          <div className="flex flex-col justify-center">
            <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-bold mb-6 text-white`}>
              We saw the system <br/> <span className="text-purple-400">breaking down.</span>
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                Mainstream media is incentivized by clicks, not facts. Independent creators are buried by algorithms if they don't play the game. We realized that to tell the stories that actually matter, we had to build our own platform.
              </p>
              <p>
                Starting as a small group of open-source investigators and digital journalists, Reality Decoded has grown into a decentralized intelligence network.
              </p>
              <p>
                We don't take corporate money. We don't run manipulative ads. We are entirely supported by viewers who value unedited, uncompromised reality.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE PRINCIPLES (The CarePay-style Grid) */}
      <section className="relative w-full bg-[#0f0f0f] py-32 border-t border-white/5 scroll-reveal">
        {/* Subtle purple spotlight in the background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-bold text-center mb-16 text-white`}>
            Our Core Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Principle 1 */}
            <article className="group relative bg-[#141414]/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] flex flex-col items-center text-center">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-purple-500/40 to-transparent transition-colors duration-500"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Radical Transparency</h3>
              <p className="text-gray-400 leading-relaxed">
                We cite our sources, show our data, and let you draw your own conclusions. No hidden agendas.
              </p>
            </article>

            {/* Principle 2 */}
            <article className="group relative bg-[#141414]/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] flex flex-col items-center text-center">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-red-500/40 to-transparent transition-colors duration-500"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-500">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-300 transition-colors">Uncompromised</h3>
              <p className="text-gray-400 leading-relaxed">
                No corporate sponsors. No venture capital. We answer only to the truth and the viewers who support us.
              </p>
            </article>

            {/* Principle 3 */}
            <article className="group relative bg-[#141414]/80 backdrop-blur-sm p-10 rounded-3xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] flex flex-col items-center text-center">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-purple-500/40 to-transparent transition-colors duration-500"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Data Driven</h3>
              <p className="text-gray-400 leading-relaxed">
                Every story starts with the raw data. We analyze the digital footprints to construct undeniable narratives.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION (Bottom) */}
      <section className="relative w-full py-32 px-6 scroll-reveal border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-extrabold mb-6 text-white`}>
            Got a story they want buried?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            We are always looking for whistleblowers, data leaks, and untold realities. Reach out to our investigation team through our secure portal.
          </p>
          
          <Link 
            href="/share" 
            className="
              group relative inline-flex items-center justify-center
              px-10 py-4 rounded-full font-bold text-lg tracking-wide
              bg-white text-red-600
              transition-all duration-300 ease-out
              hover:bg-black hover:text-red-500 hover:scale-105
              hover:shadow-[0_0_35px_rgba(168,85,247,0.6)]
              active:scale-95
              border border-transparent hover:border-purple-500/50
            "
          >
            Submit A Lead
          </Link>
        </div>
      </section>

    </main>
  );
}