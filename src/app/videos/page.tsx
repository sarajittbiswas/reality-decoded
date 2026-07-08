import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default async function VideosPage() {
  // Pull all videos from the database
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { results } = await db.prepare('SELECT * FROM videos').all();

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
            THE <span className="text-red-600">ARCHIVES</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Our complete collection of unedited reality, authentic stories, and investigations. 
          </p>
        </div>

        {/* Full Database Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((video: any) => (
            <a href={`/watch/${video.id}`} key={video.id} className="block group">
              <article className="rounded-xl overflow-hidden bg-[#141414] border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)] h-full flex flex-col">
                
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-900 overflow-hidden relative">
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center pl-1 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-2">{video.category || 'Documentary'}</span>
                  <h3 className="font-bold text-lg leading-tight mb-2 text-white group-hover:text-red-500 transition-colors">{video.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mt-auto">{video.description}</p>
                </div>

              </article>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}