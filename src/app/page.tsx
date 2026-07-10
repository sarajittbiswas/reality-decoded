import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import Newsletter from '@/components/Newsletter';


// Initialize the premium font
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Pull database videos
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { results } = await db.prepare('SELECT * FROM videos').all();

  return (
    <main className="w-full bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* 
        SCROLL ANIMATION STYLES & MOBILE FALLBACK
      */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .scroll-reveal {
          animation: fade-in-up 1s ease-out both;
          animation-timeline: view();
          animation-range: entry 5% cover 25%;
        }
        .load-reveal {
          animation: fade-in-up 1s ease-out forwards;
        }
        /* MOBILE FALLBACK: If the browser doesn't support scroll-timeline, just fade it in normally */
        @supports not (animation-timeline: view()) {
          .scroll-reveal {
            animation: fade-in-up 1s ease-out forwards;
          }
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center pt-32 pb-16 load-reveal">
        
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Text Block */}
          <div>
            <span className="mb-4 inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold uppercase tracking-widest border border-purple-500/20">
              The Truth is Here
            </span>
            
            {/* The Space Grotesk Heading */}
            <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-tight text-white`}>
              Reveal <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                The Truth
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 font-medium mb-10 max-w-md">
              Unedited reality, authentic stories, and investigations that matter. We decode the narratives they want you to ignore.
            </p>
            
            {/* The Tactile Premium CTA */}
            <Link 
              href="/videos" 
              className="
                group relative inline-flex items-center justify-center
                px-8 py-3.5 rounded-full font-bold text-lg tracking-wide
                bg-white text-red-600
                transition-all duration-300 ease-out
                hover:bg-black hover:text-red-500 hover:scale-105
                hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
                active:scale-95
                border border-transparent hover:border-purple-500/50
              "
            >
              Watch Latest Videos
              <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </div>

          {/* Right Split Image Block - Clean Cut (No Neon Line) */}
          <div className="
            relative w-full aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer
            border border-white/10 bg-[#111]
            transition-all duration-500 ease-out
            hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]
            hover:-translate-y-2
          ">
            {/* The Top Glass Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-purple-500 to-transparent transition-colors duration-500 z-30"></div>

            {/* Image 1: Left Side (YouTube) */}
            <img 
              src="/yt_img.png" 
              alt="YouTube Channel" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-x-4 z-10"
            />
            
            {/* Image 2: Right Side (Instagram) with Diagonal Clip */}
            <img 
              src="/ig_img.png" 
              alt="Instagram Profile" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-4 z-20"
              style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 35% 100%)' }}
            />
          </div>
        </div>
      </section>

      {/* 2. SYNDICATE REACH (SOCIAL PROOF) */}
      <section className="relative z-20 py-16 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: '500K+', label: 'YouTube Subscribers', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
              { num: '20K+', label: 'LinkedIn Network', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
              { num: '1.2M', label: 'Monthly Readers', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { num: '42', label: 'Countries Reached', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map((stat, i) => (
              <div key={i} className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 hover:bg-[#111] transition-all duration-500 overflow-hidden hover:-translate-y-1">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/10 group-hover:to-purple-500/20 transition-all duration-500"></div>
                {/* Animated Bottom Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-purple-500 group-hover:w-full transition-all duration-500 ease-out shadow-[0_0_10px_#a855f7]"></div>
                
                <svg className="w-8 h-8 text-purple-500/50 group-hover:text-purple-400 mb-4 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon} /></svg>
                <h3 className={`${spaceGrotesk.className} text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400 transition-all duration-300`}>
                  {stat.num}
                </h3>
                <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mt-2 group-hover:text-gray-400 transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 2. LATEST VIDEOS SECTION - MOBILE OPTIMIZED */}
      <section id="videos" className="bg-[#0a0a0a] py-32 relative scroll-reveal">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-extrabold text-white">Latest Investigations</h2>
            <Link href="/videos" className="text-purple-500 font-bold hover:text-purple-400 transition-colors flex items-center gap-1 group">
              View All 
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((video: any) => (
              <Link href={`/watch/${video.id}`} key={video.id} className="block group">
                <article className="
                  relative rounded-2xl overflow-hidden h-full flex flex-col
                  bg-[#111111]/80 backdrop-blur-xl 
                  border border-purple-500/30 md:border-white/5 
                  transition-all duration-500 ease-out
                  md:group-hover:-translate-y-2 md:group-hover:bg-[#161616]/90 md:group-hover:border-purple-500/30
                  shadow-[0_5px_20px_rgba(168,85,247,0.1)] md:shadow-none md:group-hover:shadow-[0_10px_40px_rgba(168,85,247,0.2)]
                ">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 md:via-white/10 md:group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-10"></div>
                  
                  <div className="aspect-video bg-black overflow-hidden relative border-b border-white/5">
                    <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" alt={video.title} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 opacity-90 md:opacity-80 md:group-hover:opacity-100" />
                    
                    {/* Play Button - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-purple-900/20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center pl-1 shadow-[0_0_20px_rgba(255,255,255,0.5)] md:group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow">
                    <h3 className="font-bold text-xl mb-3 text-purple-300 md:text-white md:group-hover:text-purple-400 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* THE MISSION (FUTURISTIC RADAR) */}
      <section className="bg-[#111] py-32 border-y border-white/5 relative overflow-hidden">
        {/* CSS for the Radar Sweep */}
        <style>{`
          @keyframes radar-scan {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .radar-sweep {
            background: conic-gradient(from 0deg, transparent 70%, rgba(168, 85, 247, 0.7) 100%);
            animation: radar-scan 3s linear infinite;
          }
        `}</style>
        
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[100%] bg-purple-900/10 blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-extrabold text-white uppercase mb-6`}>
              We don't just report. <br/><span className="text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">We decode.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              In an era of algorithmic echo chambers and surface-level headlines, Reality Decoded operates as an independent intelligence syndicate. We dig through the noise to bring you high-fidelity, cinematic investigations into technology, society, and the systems that govern our lives.
            </p>
            <div className="flex gap-4">
               <div className="w-1 h-12 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"></div>
               <p className="text-sm text-gray-500 font-mono italic">"The truth is rarely pure and never simple. We exist for the complex."</p>
            </div>
          </div>
          
          {/* Futuristic Radar Element */}
          <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl border border-white/5 bg-[#0a0a0a] shadow-2xl overflow-hidden flex items-center justify-center group hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] hover:border-purple-500/30 transition-all duration-700">
             {/* Tech Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             
             {/* Radar Screen */}
             <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-purple-500/30 flex items-center justify-center overflow-hidden bg-black/50">
                {/* Concentric UI Circles */}
                <div className="absolute inset-4 rounded-full border border-purple-500/20"></div>
                <div className="absolute inset-10 rounded-full border border-purple-500/20 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]"></div>
                <div className="absolute inset-16 rounded-full border border-white/5 border-dashed"></div>
                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-px bg-purple-500/40"></div>
                <div className="absolute inset-y-0 left-1/2 w-px bg-purple-500/40"></div>
                {/* The Scanning Sweep */}
                <div className="absolute inset-0 rounded-full radar-sweep origin-center"></div>
                {/* Detected Target (Blip) */}
                <div className="absolute top-[30%] left-[65%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_red] animate-ping"></div>
             </div>
             
             {/* Glowing Active Pill */}
             <div className="absolute text-purple-400 font-mono text-xs tracking-[0.3em] uppercase bg-black/80 backdrop-blur-md px-6 py-2 border border-purple-500/40 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] group-hover:border-purple-400 group-hover:text-purple-300 transition-all duration-300">
               System Active
             </div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS SECTION */}
      <section className="bg-[#0f0f0f] py-32 border-t border-white/5 relative scroll-reveal">
        {/* Subtle purple spotlight in the background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 text-white">
            What Viewers Are Saying
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group relative bg-[#141414]/80 backdrop-blur-sm p-8 rounded-2xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-purple-500/40 to-transparent transition-colors duration-500"></div>
              <div className="text-purple-500/30 group-hover:text-purple-500 text-6xl font-serif absolute -top-2 left-6 transition-colors duration-500">"</div>
              <p className="text-gray-300 relative z-10 mb-8 pt-4 leading-relaxed">
                The level of research in these documentaries is unmatched. It completely changed how I view modern tech.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full border border-gray-700 group-hover:border-purple-500/50 transition-colors"></div>
                <div>
                  <div className="font-bold text-white group-hover:text-purple-300 transition-colors">Alex M.</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-0.5">Subscriber</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="group relative bg-[#141414]/80 backdrop-blur-sm p-8 rounded-2xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-purple-500/40 to-transparent transition-colors duration-500"></div>
              <div className="text-purple-500/30 group-hover:text-purple-500 text-6xl font-serif absolute -top-2 left-6 transition-colors duration-500">"</div>
              <p className="text-gray-300 relative z-10 mb-8 pt-4 leading-relaxed">
                Finally, a platform that doesn't just scratch the surface. The 'Silicon Horizon' doc was mind-blowing.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full border border-gray-700 group-hover:border-purple-500/50 transition-colors"></div>
                <div>
                  <div className="font-bold text-white group-hover:text-purple-300 transition-colors">Sarah J.</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-0.5">Supporter</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group relative bg-[#141414]/80 backdrop-blur-sm p-8 rounded-2xl border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 group-hover:via-purple-500/40 to-transparent transition-colors duration-500"></div>
              <div className="text-purple-500/30 group-hover:text-purple-500 text-6xl font-serif absolute -top-2 left-6 transition-colors duration-500">"</div>
              <p className="text-gray-300 relative z-10 mb-8 pt-4 leading-relaxed">
                The production quality is insane for an independent creator. Keep bringing the truth to light.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full border border-gray-700 group-hover:border-purple-500/50 transition-colors"></div>
                <div>
                  <div className="font-bold text-white group-hover:text-purple-300 transition-colors">Marcus T.</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mt-0.5">Viewer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter/>
      
    </main>
  );
}