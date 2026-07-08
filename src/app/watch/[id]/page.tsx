import { getRequestContext } from '@cloudflare/next-on-pages';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

// We updated the params type to reflect that it is a Promise in modern Next.js
export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // 1. Await the URL parameters to securely grab the ID
  const resolvedParams = await params;
  const videoId = resolvedParams.id;

  // 2. Pass the securely grabbed ID into the database
  const { results } = await db.prepare('SELECT * FROM videos WHERE id = ?').bind(videoId).all();
  const video = results[0] as any;

  if (!video) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* The Cinematic Video Player */}
        <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.1)] border border-white/10 mb-8 relative">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0&modestbranding=1`} 
            title={video.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>

        {/* Video Intelligence */}
        <div className="border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
              {video.category || 'Investigation'}
            </span>
            <span className="text-gray-500 font-mono text-sm">
              {video.created_at ? new Date(video.created_at).toLocaleDateString() : 'Classified Date'}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {video.title}
          </h1>
          
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl whitespace-pre-wrap">
            {video.description}
          </p>
        </div>

        {/* Back Button */}
        <a href="/videos" className="inline-flex items-center gap-2 text-red-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
          &larr; Back to Archives
        </a>

      </div>
    </main>
  );
}