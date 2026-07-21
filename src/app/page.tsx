import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Newsletter from '@/components/Newsletter';
import StatCounter from '@/components/StatCounter';
import Watermark from '@/components/Watermark';
import InvestigationsTicker from '@/components/InvestigationsTicker';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] }); 

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// --- DATA EXTRACTOR HELPERS ---
const getFirstImage = (html: string) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const stripHtml = (html: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
};

const getISTDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  return new Date(dateStr.replace(' ', 'T') + '+05:30');
};

const getSafeYouTubeId = (url: string | null | undefined) => {
  if (!url) return null;
  return url.includes('v=') ? url.split('v=')[1].split('&')[0] : null;
};

const testimonials = [
  { quote: "The level of research in these documentaries is unmatched. It completely changed how I view modern political corruption.", author: "Alex M.", role: "Subscriber" },
  { quote: "Finally, a platform that doesn't just scratch the surface. The deep-dive institutional exposés are mind-blowing.", author: "Sarah J.", role: "Supporter" },
  { quote: "The production quality and fearless reporting are insane for an independent syndicate. Keep exposing the truth.", author: "Marcus T.", role: "Viewer" },
  { quote: "Reality Decoded is the only channel I trust for unfiltered investigations into corporate and political greed.", author: "David K.", role: "Insider" },
  { quote: "Their breakdown of systemic power networks made me rethink my entire understanding of public affairs.", author: "Elena R.", role: "Analyst" },
  { quote: "Unbiased, raw, and terrifyingly accurate. This is what real investigative journalism is supposed to be.", author: "James W.", role: "Subscriber" },
];

export default async function Home() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const { results: latestVideos } = await db.prepare(
    'SELECT * FROM videos ORDER BY created_at DESC LIMIT 4' 
  ).all();

  const { results: allArticles } = await db.prepare(
    "SELECT * FROM articles WHERE status IN ('published', 'scheduled') ORDER BY created_at DESC"
  ).all();

  const now = new Date();
  const latestArticles = allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  );

  const spotlightArticle = latestArticles[0] || null;
  const gridArticles = latestArticles.slice(1, 5);
  const featuredVideo = latestVideos[0] || null;
  const gridVideos = latestVideos.slice(1, 4);

  return (
    <main className={`relative w-full bg-[#050505] text-zinc-300 overflow-x-hidden ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS (Unified seamless texture) */}
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none z-0"></div>

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
        @supports not (animation-timeline: view()) {
          .scroll-reveal {
            animation: fade-in-up 1s ease-out forwards;
          }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[95vh] flex items-center pt-32 pb-16 load-reveal">
        <div className="max-w-7xl mx-auto px-5 md:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-6 mt-4 lg:mt-0">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 text-zinc-300 text-[10px] font-semibold uppercase tracking-widest mb-6 lg:mb-8 border border-white/10 ${jetBrainsMono.className}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300"></span>
              </span>
              Independent Intelligence Syndicate
            </div>
            
            <h1 className={`${spaceGrotesk.className} text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight mb-6 lg:mb-8 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-sm`}>
              Reality <br/>
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">Decoded.</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-light mb-10 lg:mb-12 max-w-lg leading-relaxed">
              We bypass the algorithmic echo chambers to deliver unedited reality, institutional exposés, and high-fidelity investigations into systemic corruption.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <Link href="/videos" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-white text-black transition-all duration-300 ease-out hover:bg-zinc-200 hover:scale-[1.02] active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.15)] text-center">
                Access Transmissions
                <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
              <Link href="/blogs" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-transparent text-zinc-300 border border-zinc-700 transition-all duration-300 ease-out hover:bg-white/5 hover:text-white hover:border-zinc-500 text-center">
                Read Field Reports
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full aspect-square sm:aspect-[4/3] rounded-[24px] overflow-hidden p-[2px] group shadow-2xl">
            <div className="absolute inset-[-150%] [animation:spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_40%,rgba(255,255,255,0.6)_80%,#ffffff_100%)] z-0 opacity-80"></div>
            
            <div className="relative w-full h-full bg-[#050505] rounded-[22px] overflow-hidden z-10 border border-black">
               <img src="/yt_img.png" alt="YouTube Channel" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-x-4 z-10 opacity-80 group-hover:opacity-100" />
               <img src="/ig_img.png" alt="Instagram Profile" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-4 z-20 opacity-80 group-hover:opacity-100" style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 35% 100%)' }} />
               
               <div className="absolute inset-0 z-30 pointer-events-none shadow-[-5px_0_15px_rgba(0,0,0,0.8)]" style={{ clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 35% 100%)' }}></div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <InvestigationsTicker />
      </div>

      {/* 2. OPERATIONAL SECTORS */}
      <section className="py-20 md:py-32 relative scroll-reveal">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          <div className="mb-12 md:mb-16">
            <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4`}>Operational Sectors</h2>
            <p className="text-zinc-400 text-base md:text-lg font-light max-w-2xl">We categorize our investigations into three primary threat vectors targeting modern society.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { id: '01', title: 'Cybernetic & Surveillance', desc: 'Exposing data brokers, algorithmic manipulation, and the erosion of digital privacy.' },
              { id: '02', title: 'Corporate Oligarchy', desc: 'Investigations into monopolistic practices, financial crimes, and institutional greed.' },
              { id: '03', title: 'Systemic Corruption', desc: 'Unmasking political backroom deals, shadow lobbying, and societal manipulation.' }
            ].map((sector, i) => (
              
              <div key={i} className="relative w-full p-[1.5px] rounded-[24px] group overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-lg flex flex-col min-h-[260px] md:min-h-[300px]">
                <div className="absolute inset-[-150%] z-0 opacity-0 group-hover:opacity-60 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] [animation:spin_5s_linear_infinite] transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 group-hover:border-transparent rounded-[23px] p-8 md:p-10 flex flex-col z-10 transition-colors">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                     <svg className="w-20 h-20 md:w-24 md:h-24 text-white" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <span className={`${jetBrainsMono.className} text-zinc-500 text-xs font-bold mb-auto tracking-widest`}>SEC_{sector.id}</span>
                  <div className="mt-8">
                    <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-3 group-hover:text-white transition-colors`}>{sector.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{sector.desc}</p>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED DOSSIER / SPOTLIGHT INVESTIGATION */}
      {spotlightArticle && (
        <section className="py-20 md:py-32 relative scroll-reveal">
          <div className="absolute top-1/2 left-0 w-[40%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-0"></div>
          
          <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]"></span>
              <span className={`${jetBrainsMono.className} text-[10px] md:text-xs uppercase tracking-widest text-zinc-400`}>Top Priority Dossier</span>
            </div>

            <Link href={`/blogs/${spotlightArticle.slug}`} className="group block">
              <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl md:rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-white/30 transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                
                <div className="lg:col-span-7 relative h-64 sm:h-80 lg:min-h-[550px] lg:h-auto bg-[#0a0a0a] overflow-hidden">
                  {getFirstImage(spotlightArticle.content) ? (
                    <img src={getFirstImage(spotlightArticle.content)!} alt={spotlightArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-70 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 font-mono text-xs uppercase tracking-widest">Image Redacted</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent opacity-90"></div>
                </div>

                <div className="lg:col-span-5 p-8 sm:p-10 md:p-14 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className={`${jetBrainsMono.className} text-[9px] md:text-[10px] uppercase tracking-widest text-zinc-200 bg-white/10 px-3 py-1.5 rounded-sm`}>
                      {spotlightArticle.category || 'EXPOSÉ'}
                    </span>
                    <span className={`${jetBrainsMono.className} text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest`}>
                      {new Date(spotlightArticle.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h2 className={`${spaceGrotesk.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-100 group-hover:text-white transition-colors mb-4 md:mb-6 leading-[1.1]`}>
                    {spotlightArticle.title}
                  </h2>

                  <p className="text-sm md:text-base text-zinc-400 font-light mb-8 md:mb-10 line-clamp-3 md:line-clamp-4 leading-relaxed">
                    {spotlightArticle.excerpt || stripHtml(spotlightArticle.content)}
                  </p>

                  <div className="flex items-center text-xs md:text-sm font-semibold text-white group-hover:text-zinc-300 transition-colors uppercase tracking-widest">
                    Decrypt Full Report <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 4. CINEMATIC BROADCAST (Featured Video) */}
      {featuredVideo && (
        <section className="py-20 md:py-32 relative scroll-reveal">
          <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
             
             <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
               <div>
                  <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 md:mb-4`}>Cinematic Broadcasts</h2>
                  <p className="text-zinc-400 text-sm md:text-lg font-light max-w-xl">Deep-dive documentary intelligence, visually decoded for the public record.</p>
               </div>
               <Link href="/videos" className="text-zinc-400 hover:text-white font-medium text-xs md:text-sm flex items-center gap-2 transition-colors">
                 View Master Database <span className="text-lg">&rarr;</span>
               </Link>
             </div>

             <Link href={`/watch/${featuredVideo.id}`} className="group block relative w-full rounded-3xl md:rounded-[2rem] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 shadow-2xl bg-[#0a0a0a] h-64 sm:h-[400px] md:h-auto md:aspect-[21/9]">
                
                {getSafeYouTubeId(featuredVideo.url) ? (
                  <img src={`https://img.youtube.com/vi/${getSafeYouTubeId(featuredVideo.url)}/maxresdefault.jpg`} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000 ease-out" alt="Featured Broadcast" />
                ) : (
                  <div className="absolute inset-0 bg-[#0a0a0a]"></div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 md:w-28 md:h-28 bg-[#050505]/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center pl-1 md:pl-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:scale-110 group-hover:bg-white group-hover:text-black text-white transition-all duration-500">
                    <svg className="w-6 h-6 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-12">
                   <span className={`${jetBrainsMono.className} text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-zinc-300 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 mb-3 md:mb-4 inline-block`}>
                     Latest Video Log
                   </span>
                   <h3 className={`${spaceGrotesk.className} text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 max-w-4xl leading-tight line-clamp-2 md:line-clamp-none`}>{featuredVideo.title}</h3>
                </div>
             </Link>
          </div>
        </section>
      )}

      {/* 5. THE METHODOLOGY (Upgraded with Always-On Beam Glow) */}
      <section className="py-20 md:py-32 relative overflow-hidden scroll-reveal">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white uppercase mb-4 md:mb-6 leading-tight`}>
              The Syndicate Standard.
            </h2>
            <p className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed">
              We operate under a strict investigative framework designed to pierce through misinformation and corporate PR. This is our protocol.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Absolute Independence', desc: 'No corporate overlords. No political sponsors. Our narratives cannot be bought, leased, or manipulated.' },
              { title: 'Source Cryptography', desc: 'We utilize military-grade encryption and Secure Drop protocols to protect the identities of our whistleblowers.' },
              { title: 'Fidelity Verification', desc: 'Raw data is heavily vetted against public ledgers, open-source code, and primary source documentation.' }
            ].map((pillar, i) => (
              
              /* 🚨 FIX: Mobile-friendly ALWAYS-ON spinning beam glow added to The Syndicate Standard cards */
              <div key={i} className="relative w-full p-[1.5px] rounded-[24px] group overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2">
                
                {/* Opacity is now permanently 40% (so it shows on mobile) and brightens to 90% on hover */}
                <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] [animation:spin_6s_linear_infinite] transition-opacity duration-500"></div>
                
                {/* Inner Card content */}
                <div className="relative h-full bg-[#050505] p-8 md:p-10 rounded-[23px] border border-white/5 group-hover:border-transparent transition-all duration-500 z-10 flex flex-col">
                  <div className={`${jetBrainsMono.className} text-zinc-500 group-hover:text-zinc-300 font-bold text-2xl md:text-3xl mb-5 md:mb-6 transition-colors`}>0{i+1}</div>
                  <h3 className={`${spaceGrotesk.className} text-lg md:text-xl font-bold text-zinc-100 mb-3 md:mb-4 group-hover:text-white transition-colors`}>{pillar.title}</h3>
                  <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed">{pillar.desc}</p>
                </div>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* 6. LATEST INVESTIGATIONS FEED */}
      <section className="py-20 md:py-32 relative scroll-reveal">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 md:mb-12 gap-4">
            <div>
              <h2 className={`${spaceGrotesk.className} text-3xl md:text-4xl font-extrabold text-white tracking-tight`}>Intelligence Feed</h2>
              <p className="text-zinc-400 text-sm mt-1 md:mt-2 font-light">Recent field reports and secondary video logs.</p>
            </div>
            <Link href="/archives" className="text-zinc-300 font-semibold hover:text-white transition-colors flex items-center gap-2 group text-[10px] md:text-xs uppercase tracking-widest bg-white/[0.03] px-5 md:px-6 py-2.5 md:py-3 rounded-full border border-white/10 hover:border-white/25">
              Access Archives <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              gridArticles[0] ? { ...gridArticles[0], type: 'blog' } : null,
              gridVideos[0] ? { ...gridVideos[0], type: 'video' } : null,
              gridArticles[1] ? { ...gridArticles[1], type: 'blog' } : null,
              gridVideos[1] ? { ...gridVideos[1], type: 'video' } : null,
              gridArticles[2] ? { ...gridArticles[2], type: 'blog' } : null,
              gridVideos[2] ? { ...gridVideos[2], type: 'video' } : null
            ].filter(Boolean).map((item: any, idx: number) => {
              
              const isVideo = item.type === 'video';
              const targetUrl = isVideo ? `/watch/${item.id}` : `/blogs/${item.slug || item.id}`;
              
              let imageUrl = null;
              if (isVideo) {
                const ytId = getSafeYouTubeId(item.url);
                imageUrl = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '/yt_img.png';
              } else {
                imageUrl = getFirstImage(item.content);
              }

              return (
                <Link href={targetUrl} key={`${item.type}-${item.id}-${idx}`} className="block group">
                  <article className="relative rounded-2xl md:rounded-3xl overflow-hidden h-full flex flex-col bg-white/[0.02] backdrop-blur-md border border-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white/[0.04] hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                    
                    <div className="aspect-[16/10] bg-[#0a0a0a] overflow-hidden relative border-b border-white/10">
                      {imageUrl ? (
                        <img src={imageUrl} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a]">
                          <span className={`${jetBrainsMono.className} text-zinc-700 text-[10px] uppercase tracking-widest`}>Asset Missing</span>
                        </div>
                      )}
                      
                      {isVideo && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all duration-300">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center pl-0.5 shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-black text-white transition-all duration-300">
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 md:p-8 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <span className={`${jetBrainsMono.className} text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-white/10 text-zinc-200`}>
                          {item.category || (isVideo ? 'Video Log' : 'Field Report')}
                        </span>
                        <span className={`${jetBrainsMono.className} text-[9px] md:text-[10px] text-zinc-500`}>
                          {new Date(item.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <h3 className={`${spaceGrotesk.className} font-bold text-lg md:text-xl mb-3 md:mb-4 text-zinc-100 group-hover:text-white transition-colors duration-300 leading-snug line-clamp-2`}>
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-zinc-400 line-clamp-2 leading-relaxed mt-auto font-light">
                        {item.excerpt || item.description || "Classified intel transmission. Access the full report."}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SYNDICATE REACH / STATS */}
      <section className="relative z-20 py-20 md:py-32 scroll-reveal">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { end: 500, suffix: 'K+', label: 'Active Watchers', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
              { end: 20, suffix: 'K+', label: 'Encrypted Sources', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
              { end: 1.2, suffix: 'M', label: 'Monthly Readers', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
              { end: 42, suffix: '', label: 'Global Jurisdictions', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
            ].map((stat, i) => (
              
              <div key={i} className="relative w-full p-[1.5px] rounded-3xl group transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden shadow-lg">
                <div className="absolute inset-[-150%] z-0 opacity-30 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.7)_100%)] [animation:spin_5s_linear_infinite] transition-opacity duration-500"></div>
                
                <div className="relative h-full bg-black/60 backdrop-blur-xl p-8 md:p-10 rounded-[23px] border border-white/5 group-hover:border-transparent transition-all duration-500 z-10 flex flex-col items-center text-center">
                  <svg className="w-8 h-8 text-zinc-500 group-hover:text-white mb-6 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon} /></svg>
                  <div className={`${spaceGrotesk.className} text-4xl font-bold text-white mb-2 tracking-tight`}>
                    <StatCounter end={stat.end} suffix={stat.suffix} label="" />
                  </div>
                  <div className={`${jetBrainsMono.className} text-[10px] text-zinc-500 uppercase tracking-widest font-semibold`}>{stat.label}</div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION (Marquee) */}
      <section className="py-24 md:py-32 relative scroll-reveal overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10 mb-12 md:mb-16 text-center">
          <h2 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white tracking-tight`}>
            Declassified Feedback
          </h2>
        </div>
        
        <div className="relative w-full flex overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-12 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-12 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-marquee gap-4 md:gap-6 px-3 py-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="relative w-[280px] md:w-[420px] shrink-0 p-[1.5px] md:p-[2px] rounded-3xl group transition-all duration-500 ease-out hover:-translate-y-2 overflow-hidden shadow-lg">
                <div className="absolute inset-[-150%] z-0 opacity-80 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.4)_100%)] [animation:spin_4s_linear_infinite]"></div>
                
                <div className="relative h-full bg-[#050505] backdrop-blur-xl p-8 md:p-10 rounded-[22px] border border-white/5 transition-colors duration-500 group-hover:bg-[#111] z-10 flex flex-col">
                  <div className="text-zinc-700 group-hover:text-zinc-500 text-5xl md:text-6xl font-serif absolute -top-1 left-5 md:left-6 transition-colors duration-500">"</div>
                  
                  <p className="text-zinc-300 relative z-10 mb-8 md:mb-10 pt-4 leading-relaxed flex-grow whitespace-normal font-light text-xs md:text-sm">
                    {t.quote}
                  </p>
                  
                  <div className="flex items-center gap-3 md:gap-4 mt-auto border-t border-white/5 pt-5 md:pt-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center font-bold text-zinc-400 group-hover:border-white/30 transition-colors text-xs">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-zinc-200 group-hover:text-white transition-colors text-xs md:text-sm">{t.author}</div>
                      <div className={`${jetBrainsMono.className} text-[8px] md:text-[9px] text-zinc-500 uppercase tracking-widest mt-0.5 md:mt-1`}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SECURE DROP / WHISTLEBLOWER BANNER */}
      <section className="py-20 md:py-24 relative overflow-hidden">
        
        <div className="max-w-5xl mx-auto px-5 md:px-6 relative z-10">
          
          <div className="relative w-full p-[2px] rounded-[2rem] md:rounded-[2.5rem] group overflow-hidden shadow-2xl">
            <div className="absolute inset-[-200%] z-0 opacity-40 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,rgba(255,255,255,0.7)_100%)] [animation:spin_8s_linear_infinite] transition-opacity duration-700"></div>
            
            <div className="relative bg-[#050505] rounded-[30px] md:rounded-[38px] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
              
              <div className="text-center md:text-left z-10">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-5 md:mb-6 ${jetBrainsMono.className}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                  Encrypted Drop Channel
                </div>
                <h3 className={`${spaceGrotesk.className} text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 md:mb-4 tracking-tight`}>
                  Possess actionable intelligence?
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm md:text-base font-light max-w-xl leading-relaxed">
                  We protect our confidential sources with strict journalistic privilege and anonymous transmission protocols. Expose systemic corruption securely.
                </p>
              </div>
              
              <div className="z-10 shrink-0 mt-2 md:mt-0 w-full md:w-auto">
                <Link href="/contact" className="w-full md:w-auto px-8 md:px-10 py-4 rounded-full bg-white text-black font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-zinc-200 hover:scale-105 transition-all ease-out whitespace-nowrap shadow-[0_10px_30px_rgba(255,255,255,0.15)] block text-center">
                  Access Secure Drop
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 10. NEWSLETTER & WATERMARK */}
      <div className="relative z-20 pb-0">
         <Newsletter/>
      </div>
      <section className="relative w-full h-[18vh] md:h-[26vh] z-0 pointer-events-auto overflow-hidden flex items-end">
        <Watermark />
      </section>

    </main>
  );
}