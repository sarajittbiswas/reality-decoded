import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import ArchiveBoard from '@/components/ArchiveBoard';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

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

// 🚨 TIMEZONE FIX: Force Cloudflare to read the date string as IST (+05:30)
const getISTDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  return new Date(dateStr.replace(' ', 'T') + '+05:30');
};

export default async function ArchivesPage() {
  const db = (getRequestContext().env as any).reality_decoded_db;

  // 1. Fetch Videos
  const { results: videos } = await db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();

  // 2. Fetch ALL agent profile columns to pass into the Board component
  const { results: allArticles } = await db.prepare(`
    SELECT articles.*, 
           sa.id as agent_id, sa.name as agent_name, sa.avatar as agent_avatar, 
           sa.role as agent_role, sa.location as agent_location, sa.timezone as agent_timezone, 
           sa.website as agent_website, sa.github as agent_github, sa.twitter as agent_twitter, 
           sa.linkedin as agent_linkedin, sa.instagram as agent_instagram, sa.facebook as agent_facebook, sa.reddit as agent_reddit
    FROM articles 
    LEFT JOIN syndicate_agents sa ON articles.agent_id = sa.id
    WHERE status IN ('published', 'scheduled') 
    ORDER BY created_at DESC
  `).all();

  // Filter using JavaScript IST Time
  const now = new Date();
  const articles = allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  );

  // 3. Transform Articles to match the ArchiveBoard data structure WITH agent objects
  const liveBlogs = articles.map((article: any) => ({
    id: article.slug, 
    title: article.title,
    description: stripHtml(article.excerpt || "Classified intel transmission. Access the full report."),
    category: article.category || 'INTEL',
    image: getFirstImage(article.content) || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    author: article.author,
    agent: article.agent_id ? {
      id: article.agent_id, name: article.agent_name, avatar: article.agent_avatar, 
      role: article.agent_role, location: article.agent_location, timezone: article.agent_timezone, 
      github: article.agent_github, twitter: article.agent_twitter, linkedin: article.agent_linkedin, 
      instagram: article.agent_instagram, facebook: article.agent_facebook, reddit: article.agent_reddit
    } : null
  }));

  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen overflow-hidden relative pb-32 ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS (Unified seamless texture) */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center animate-[fade-in-up_0.8s_ease-out_forwards]">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            </span>
            Syndicate Master Database
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-5 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 drop-shadow-sm`}>
            Decoded Archives.
          </h1>
          <p className="text-sm md:text-base text-zinc-500 max-w-2xl font-light">
            Access our complete unedited video logs and highly classified written field reports. Toggle databases below.
          </p>
        </div>

        {/* Passing the live DB data */}
        <ArchiveBoard videos={videos} blogs={liveBlogs} />

      </div>
    </main>
  );
}