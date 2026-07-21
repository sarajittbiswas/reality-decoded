import Link from 'next/link';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

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
      <section className="relative w-full pt-40 pb-24 px-6 load-reveal flex flex-col items-center text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            Mission Protocol
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl lg:text-[5rem] font-extrabold tracking-tight mb-8 text-white leading-[1.05]`}>
            The truth isn't hidden. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 drop-shadow-sm">
              It's just ignored.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Reality Decoded was built to tear down the artificial narratives constructed by algorithms and corporate media. We exist to find the signal in the noise.
          </p>
        </div>
      </section>

      {/* 2. THE STORY SECTION (50/50 Split) */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 z-10 scroll-reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Abstract Image Box with Beam Glow */}
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden group shadow-2xl p-[2px]">
            {/* 🚨 BULLETPROOF FIX */}
            <div className="absolute inset-[-150%] animate-spin [animation-duration:6s] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_40%,rgba(255,255,255,0.6)_80%,#ffffff_100%)] z-0 opacity-70"></div>
            <div className="relative w-full h-full bg-[#050505] rounded-[22px] overflow-hidden z-10 border border-black">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-30"></div>
              <img 
                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop" 
                alt="Data and code" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-60 group-hover:opacity-100 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/40 to-transparent"></div>
            </div>
          </div>

          {/* Right Side: Text */}
          <div className="flex flex-col justify-center">
            <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-bold mb-8 text-white leading-tight`}>
              We saw the system <br/> <span className="text-zinc-500">breaking down.</span>
            </h2>
            <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg">
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

      {/* 3. CORE PRINCIPLES (With Optimized Beam Glow) */}
      <section className="relative w-full py-20 md:py-32 scroll-reveal">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-center mb-16 text-white tracking-tight`}>
            Our Core Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'Radical Transparency', desc: 'We cite our sources, show our data, and let you draw your own conclusions. No hidden agendas.' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Uncompromised', desc: 'No corporate sponsors. No venture capital. We answer only to the truth and the viewers who support us.' },
              { icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', title: 'Data Driven', desc: 'Every story starts with the raw data. We analyze the digital footprints to construct undeniable narratives.' }
            ].map((principle, i) => (
              
              <article key={i} className="relative group block h-full flex flex-col hover:z-50 hover:-translate-y-2 transition-transform duration-500">
                {/* Background Beam */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-shadow duration-500 pointer-events-none">
                  {/* 🚨 BULLETPROOF FIX */}
                  <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] animate-spin [animation-duration:6s] transition-opacity duration-500"></div>
                  <div className="absolute inset-[1.5px] bg-[#050505] rounded-[22.5px] z-10"></div>
                  <div className="absolute inset-[1.5px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 group-hover:border-transparent rounded-[22.5px] z-10 transition-colors duration-500"></div>
                </div>

                <div className="relative p-10 flex flex-col items-center text-center h-full z-20">
                  <div className="absolute inset-x-8 top-[1.5px] h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-white/40 to-transparent transition-colors duration-500"></div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:text-black text-zinc-300 transition-all duration-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={principle.icon}></path></svg>
                  </div>
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-4 transition-colors`}>{principle.title}</h3>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              </article>
              
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="relative w-full py-32 px-6 scroll-reveal overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight`}>
            Got a story they want buried?
          </h2>
          <p className="text-lg text-zinc-400 font-light mb-10 max-w-2xl mx-auto">
            We are always looking for whistleblowers, data leaks, and untold realities. Reach out to our investigation team through our secure portal.
          </p>
          
          <Link 
            href="/share" 
            className="
              group relative inline-flex items-center justify-center
              px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest
              bg-white text-black
              transition-all duration-300 ease-out
              hover:bg-zinc-200 hover:scale-105
              shadow-[0_10px_30px_rgba(255,255,255,0.15)]
              active:scale-95
            "
          >
            Submit Intelligence
          </Link>
        </div>
      </section>

    </main>
  );
}