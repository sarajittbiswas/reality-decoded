import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge';

// 1. ADDED: Safe ID Extractor to prevent crashes
function getSafeYouTubeId(url: string | null | undefined) {
  if (!url) return null;
  return url.includes('v=') ? url.split('v=')[1].split('&')[0] : null;
}

export default async function VideosPage() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { results } = await db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative pb-32">
      
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

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[40%] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-[40%] h-[50%] bg-red-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left load-reveal" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Video Logs Active
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 break-words px-2 uppercase`}>
            Decoded <br className="block md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Transmissions.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Our complete collection of unedited reality, authentic stories, and visual investigations. 
          </p>
        </div>

        {/* Full Database Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((video: any, i: number) => {
            // 2. EXTRACT THE ID FOR EACH VIDEO IN THE LOOP
            const ytId = getSafeYouTubeId(video.url);
            
            return (
              <a href={`/watch/${video.id}`} key={video.id} className="block group load-reveal" style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}>
                <article className="relative bg-[#111111]/80 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)] h-full flex flex-col">
                  
                  {/* Top Glass Edge */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-20"></div>

                  {/* Thumbnail Area */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500">
                      <div className="w-14 h-14 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 transition-transform duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    
                    {/* 3. DYNAMIC THUMBNAIL LOGIC */}
                    {ytId ? (
                      <img 
                        src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
                        alt={video.title} 
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">No Preview</div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-grow flex flex-col z-20 bg-[#111]/90">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-2 border border-purple-500/20 bg-purple-500/10 w-max px-2 py-0.5 rounded">
                      {video.category || 'Documentary'}
                    </span>
                    <h3 className={`${spaceGrotesk.className} font-bold text-lg leading-tight mb-2 text-gray-200 group-hover:text-white transition-colors`}>
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-auto leading-relaxed">{video.description}</p>
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