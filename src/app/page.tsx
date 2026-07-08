import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default async function Home() {
  // Pull database videos
  //const db = (getRequestContext().env as any).reality_decoded_db;
  //const { results } = await db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();
// 2. Add this test line:
const videos = { results: [{ title: "Test Connection Successful" }] };
  return (
    <main className="w-full">
      
      {/* 1. HERO SECTION: Radiant Red Gradient with Perfect 50/50 Split */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-white via-red-900 to-black pt-24 pb-12 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Text Block */}
          <div className="text-white">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-tight">
              REVEAL <br/><span className="text-black drop-shadow-lg">THE TRUTH</span>
            </h1>
            <p className="text-xl text-gray-200 font-medium mb-8 max-w-md">
              Unedited reality, authentic stories, and investigations that matter. Explore our latest findings.
            </p>
            <a href="https://www.youtube.com/" className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition-colors shadow-2xl inline-block">
              Watch Latest Videos
            </a>
          </div>

          {/* Right Split Image Block */}
          <div className="relative w-full aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden group">
            
            {/* Image 1: Left Side (YouTube) - Now has hover scale! */}
            <img 
              src="/yt_img.png" 
              alt="YouTube Channel" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Image 2: Right Side (Instagram) - Perfect 50/50 balance */}
            <img 
              src="ig_img.png" 
              alt="Instagram Profile" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 35% 100%)' }}
            />
            
          </div>
        </div>
      </section>




      {/* 2. LATEST VIDEOS SECTION */}
      <section id="videos" className="bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-extrabold text-white">Latest Investigations</h2>
            <a href="/videos" className="text-red-500 font-semibold hover:text-red-400">View All &rarr;</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((video: any) => (
  <a href={`/watch/${video.id}`} key={video.id} className="block group">
                <article className="rounded-xl overflow-hidden bg-[#141414] border border-white/5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] h-full">
                  <div className="aspect-video bg-gray-900 overflow-hidden relative">
                    <img src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-red-500 transition-colors">{video.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

{/* BRAND SHOWCASE SECTION (ANIMATED)
      <section className="w-full bg-black py-12 border-b border-white/10 relative z-20 overflow-hidden">
        
        
        <style>{`
          @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-loop {
            animation: infinite-scroll 20s linear infinite;
            width: max-content;
          }
          
          .animate-loop:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest">
            Brands we have worked with
          </p>
        </div>
        
       
        <div className="w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_15%,_black_85%,transparent_100%)]">
          
          
          <div className="flex animate-loop gap-16 md:gap-32 pl-8">
            
           
            {[1, 2].map((loopIndex) => (
              <div key={loopIndex} className="flex items-center gap-16 md:gap-32">
               
                {['/toko.png', '/netflix1.png', '/google.png', '/nin.png', '/fedex.png', '/adidas.png', '/chatgpt.png'].map((logoPath, index) => (
                  <img 
                    key={index}
                    src={logoPath}
                    alt="Brand Partner" 
                    
                    className="h-12 w-auto object-contain grayscale hover:grayscale-0 hover:scale-125 hover:drop-shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all duration-300 cursor-pointer"
                  />
                ))}
              </div>
            ))}

          </div>
        </div>
      </section> */}

      {/* 3. TESTIMONIALS SECTION */}
      <section className="bg-[#111] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">What Viewers Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 relative">
              <div className="text-red-600 text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-gray-300 relative z-10 mb-6 italic">"The level of research in these documentaries is unmatched. It completely changed how I view modern tech."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div>
                  <div className="font-bold text-sm text-white">Alex M.</div>
                  <div className="text-xs text-gray-500">Subscriber</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 relative">
              <div className="text-red-600 text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-gray-300 relative z-10 mb-6 italic">"Finally, a platform that doesn't just scratch the surface. The 'Silicon Horizon' doc was mind-blowing."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div>
                  <div className="font-bold text-sm text-white">Sarah J.</div>
                  <div className="text-xs text-gray-500">Patreon Supporter</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 relative">
              <div className="text-red-600 text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-gray-300 relative z-10 mb-6 italic">"The production quality is insane for an independent creator. Keep bringing the truth."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div>
                  <div className="font-bold text-sm text-white">Marcus T.</div>
                  <div className="text-xs text-gray-500">Viewer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




    </main>
  );
}