import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';
import ArchiveBoard from '@/components/ArchiveBoard';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

// Utility: Strip HTML for description preview
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
};

// Utility: Get first image from HTML
const getFirstImage = (html: string) => {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

export default async function ArchivesPage() {
  const db = (getRequestContext().env as any).reality_decoded_db;

  // 1. Fetch Videos
  const { results: videos } = await db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();

  // 2. Fetch Live Articles
  const { results: articles } = await db.prepare(
    "SELECT * FROM articles WHERE status = 'published' ORDER BY created_at DESC"
  ).all();

  // 3. Transform Articles to match the ArchiveBoard data structure
  const liveBlogs = articles.map((article: any) => ({
    id: article.slug, // Using slug as ID so the Link works correctly
    title: article.title,
    description: stripHtml(article.content),
    category: article.category || 'INTEL',
    image: getFirstImage(article.content) || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop' // Fallback image
  }));

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative pb-32">
      
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[40%] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-[40%] h-[50%] bg-red-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        <div className="mb-12 text-center flex flex-col items-center animate-[fade-in-up_0.8s_ease-out_forwards]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Syndicate Master Database
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-4 uppercase`}>
            Decoded <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Archives.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Access our complete unedited video logs and highly classified written field reports. Toggle databases below.
          </p>
        </div>

        {/* Passing the live DB data (videos & liveBlogs) instead of mock data */}
        <ArchiveBoard videos={videos} blogs={liveBlogs} />

      </div>
    </main>
  );
}