import { getRequestContext } from '@cloudflare/next-on-pages';
import { notFound } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import Interactions from '@/components/Interactions';
import { Metadata } from 'next';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

// Safe ID extractor
function getSafeYouTubeId(url: string | null | undefined) {
  if (!url) return null;
  return url.includes('v=') ? url.split('v=')[1].split('&')[0] : null;
}

// ---------------------------------------------------------
// 1. DYNAMIC METADATA, CANONICALS & OPEN GRAPH
// ---------------------------------------------------------
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const videoId = resolvedParams.id;
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const { results } = await db.prepare('SELECT * FROM videos WHERE id = ?').bind(videoId).all();
  const video = results[0] as any;

  if (!video) return { title: 'Transmission Lost' };

  const ytId = getSafeYouTubeId(video.url);
  const ogImage = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '/yt_img.png';
  
  // Truncate description for SEO limits (160 chars)
  const cleanDescription = video.description ? video.description.substring(0, 160) + '...' : 'Classified investigation.';

  return {
    title: video.title,
    description: cleanDescription,
    alternates: {
      canonical: `/watch/${videoId}`, // Dynamic Canonical URL
    },
    openGraph: {
      title: video.title,
      description: cleanDescription,
      url: `https://realitydecoded.in/watch/${videoId}`,
      type: 'video.other',
      images: [{ url: ogImage, width: 1280, height: 720, alt: video.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: video.title,
      description: cleanDescription,
      images: [ogImage],
    },
  };
}

// ---------------------------------------------------------
// COMPONENT RENDER
// ---------------------------------------------------------
export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const resolvedParams = await params;
  const videoId = resolvedParams.id;

  const { results } = await db.prepare('SELECT * FROM videos WHERE id = ?').bind(videoId).all();
  const video = results[0] as any;

  if (!video) {
    notFound();
  }

  const ytId = getSafeYouTubeId(video.url);
  const ogImage = ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : 'https://realitydecoded.in/yt_img.png';

  // 2. STRUCTURED DATA (JSON-LD FOR GOOGLE SEARCH)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": [ogImage],
    "uploadDate": video.created_at || new Date().toISOString(),
    "embedUrl": ytId ? `https://www.youtube.com/embed/${ytId}` : "",
    "publisher": {
      "@type": "Organization",
      "name": "Reality Decoded",
      "logo": {
        "@type": "ImageObject",
        "url": "https://realitydecoded.in/yt_img.png"
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative overflow-hidden">
      
      {/* INJECT STRUCTURED DATA INVISIBLE TO USERS, VISIBLE TO GOOGLE */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-purple-500/20 mb-8 relative group">
          {ytId ? (
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`} 
              title={video.title} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full z-10"
            ></iframe>
          ) : (
             <div className="flex items-center justify-center h-full text-gray-500">Video Unavailable</div>
          )}
        </div>

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

          <Interactions id={`video-${video.id}`} title={video.title} />
        </div>

        <a href="/videos" className="inline-flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors font-mono font-bold uppercase tracking-widest text-sm group">
          <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
          Back to Archives
        </a>
      </div>
    </main>
  );
}