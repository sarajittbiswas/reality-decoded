import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';
import AuthorHoverCard from '@/components/AuthorHoverCard';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

const getISTDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  return new Date(dateStr.replace(' ', 'T') + '+05:30');
};

export default async function TagArchivePage({ params }: { params: Promise<{ tag: string }> }) {
   const { tag } = await params;
   const decodedTag = decodeURIComponent(tag).replace(/^_/, '').trim();
   const db = (getRequestContext().env as any).reality_decoded_db;
  
  const searchQuery = decodedTag.toLowerCase();
  const likeQuery = `%,${searchQuery},%`;

  const { results: allArticles } = await db.prepare(
    `SELECT articles.*, 
           sa.id as agent_id, sa.name as agent_name, sa.avatar as agent_avatar, 
           sa.role as agent_role, sa.location as agent_location, sa.timezone as agent_timezone, 
           sa.website as agent_website, sa.github as agent_github, sa.twitter as agent_twitter, 
           sa.linkedin as agent_linkedin, sa.instagram as agent_instagram, sa.facebook as agent_facebook, sa.reddit as agent_reddit
     FROM articles 
     LEFT JOIN syndicate_agents sa ON articles.agent_id = sa.id
     WHERE status IN ('published', 'scheduled') 
     AND (
       LOWER(category) = ? 
       OR LOWER(',' || COALESCE(tags, '') || ',') LIKE ?
     )
     ORDER BY created_at DESC`
  ).bind(searchQuery, likeQuery).all();

  const now = new Date();
  const articles = allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  );

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 mb-4">
            Archive Database Query
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-extrabold tracking-tight mb-4 uppercase`}>
            Tag: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">{decodedTag}</span>
          </h1>
          <p className="text-gray-400">Found {articles.length} declassified files matching this parameter.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length === 0 ? (
            <p className="text-gray-500 col-span-full">No transmissions found for this parameter.</p>
          ) : (
            articles.map((article: any) => {
              
              const agentObj = article.agent_id ? {
                id: article.agent_id, name: article.agent_name, avatar: article.agent_avatar, 
                role: article.agent_role, location: article.agent_location, timezone: article.agent_timezone, 
                github: article.agent_github, twitter: article.agent_twitter, linkedin: article.agent_linkedin, 
                instagram: article.agent_instagram, facebook: article.agent_facebook, reddit: article.agent_reddit
              } : null;

              return (
                <Link href={`/blogs/${article.slug}`} key={article.id} className="relative group block bg-[#111] border border-white/5 rounded-2xl hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col hover:z-50">
                  
                  <div className="p-6 flex flex-col h-full rounded-2xl bg-[#111] group-hover:bg-[#151515] transition-colors">
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-purple-400">{article.category}</span>
                      <span className="text-xs text-gray-500">{new Date(article.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <h2 className={`${spaceGrotesk.className} text-xl font-bold text-gray-200 mb-3 group-hover:text-white transition-colors flex-grow`}>
                      {article.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {(article.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean).map((t: string, i: number) => (
                        <span key={i} className="text-[10px] uppercase tracking-widest border border-white/10 px-2 py-1 rounded text-gray-400 group-hover:border-purple-500/30 group-hover:text-purple-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
                      {agentObj ? (
                        /* 🚨 THE FIX: Wrapper DIV removed here! */
                        <AuthorHoverCard agent={agentObj}>
                          <div className="flex items-center gap-2 group/authcard">
                            <img src={agentObj.avatar || '/default-cover.png'} className="w-5 h-5 rounded-full border border-purple-500/30 group-hover/authcard:border-purple-400 transition-colors" />
                            <span className="text-[10px] text-gray-400 group-hover/authcard:text-white uppercase tracking-widest font-bold transition-colors">
                              {agentObj.name.split(' ')[0]}
                            </span>
                          </div>
                        </AuthorHoverCard>
                      ) : (
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">By {article.author}</span>
                      )}
                      <span className="text-[10px] font-bold text-gray-500 group-hover:text-purple-400 transition-colors uppercase tracking-widest">
                        &rarr;
                      </span>
                    </div>

                  </div>
                </Link>
              );
            })
          )}
        </div>
        
      </div>
    </main>
  );
}