import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const runtime = 'edge';

// 1. Safe ID Extractor to prevent crashes (Untouched)
function getSafeYouTubeId(url: string | null | undefined) {
  if (!url) return null;
  return url.includes('v=') ? url.split('v=')[1].split('&')[0] : null;
}

export default async function VideosPage() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { results } = await db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();

  return (
    <main className={`min-h-screen bg-[#030303] text-zinc-300 pt-32 pb-24 px-6 relative overflow-hidden ${inter.className}`}>
      
      {/* SCROLL & FLOAT ANIMATIONS */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .load-reveal {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      {/* Premium Soft Ambient Background (Matching Blog & Legal Pages) */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.12),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 text-center pb-12 load-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 text-zinc-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300"></span>
            </span>
            Video Logs Active
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5 uppercase`}>
            Decoded Transmissions
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto font-light">
            Our complete collection of unedited reality, authentic stories, and visual investigations. 
          </p>
        </div>

        {/* Full Database Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((video: any, i: number) => {
            // 2. EXTRACT THE ID FOR EACH VIDEO IN THE LOOP (Untouched)
            const ytId = getSafeYouTubeId(video.url);
            
            return (
              <a href={`/watch/${video.id}`} key={video.id} className="block group load-reveal" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
                
                {/* Frosted Glass Card Design */}
                <article className="relative bg-white/[0.02] backdrop-blur-2xl rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] h-full flex flex-col">
                  
                  {/* Thumbnail Area */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-all duration-500">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black text-white transition-all duration-300 shadow-lg">
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    
                    {/* 3. DYNAMIC THUMBNAIL LOGIC (Untouched) */}
                    {ytId ? (
                      <img 
                        src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                        alt={video.title} 
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-600 font-medium text-xs uppercase tracking-wider">No Preview</div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-grow flex flex-col z-20">
                    <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider mb-2.5 bg-purple-500/10 w-max px-2.5 py-1 rounded-full">
                      {video.category || 'Documentary'}
                    </span>
                    <h3 className={`${spaceGrotesk.className} font-bold text-lg leading-snug mb-3 text-zinc-100 group-hover:text-white transition-colors line-clamp-2`}>
                      {video.title}
                    </h3>
                    <p className="text-sm text-zinc-400 line-clamp-2 mt-auto leading-relaxed font-light">{video.description}</p>
                  </div>
                </article>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}