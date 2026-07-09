import { getRequestContext } from '@cloudflare/next-on-pages';
import { notFound } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import Interactions from '@/components/Interactions'; // <-- INJECTED HERE

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge';

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const resolvedParams = await params;
  const videoId = resolvedParams.id;

  const { results } = await db.prepare('SELECT * FROM videos WHERE id = ?').bind(videoId).all();
  const video = results[0] as any;

  if (!video) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative overflow-hidden">
      {/* Deep Glow Behind Player */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* The Cinematic Video Player */}
        <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-purple-500/20 mb-8 relative group">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0&modestbranding=1`} 
            title={video.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full z-10"
          ></iframe>
        </div>

        {/* Video Intelligence */}
        <div className="bg-[#111111]/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-widest">
              {video.category || 'Investigation'}
            </span>
            <span className="text-gray-500 font-mono text-sm flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              {video.created_at ? new Date(video.created_at).toLocaleDateString() : 'Classified Date'}
            </span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight`}>
            {video.title}
          </h1>
          
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl whitespace-pre-wrap font-light">
            {video.description}
          </p>

          {/* THE INTERACTIONS COMPONENT APPEARS HERE */}
          <Interactions id={`video-${video.id}`} title={video.title} />
          
        </div>

        {/* Back Button */}
        <a href="/videos" className="inline-flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors font-mono font-bold uppercase tracking-widest text-sm group">
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
          Back to Archives
        </a>

      </div>
    </main>
  );
}