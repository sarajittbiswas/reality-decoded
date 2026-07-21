import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import { Space_Grotesk, Inter } from 'next/font/google';
import AuthorHoverCard from '@/components/AuthorHoverCard';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 

const getFirstImage = (html: string) => {
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
};

export default async function PublicBlogFeed() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
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

  const getISTDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    return new Date(dateStr.replace(' ', 'T') + '+05:30');
  };

  const now = new Date();
  
  const articles = allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  );

  return (
    <main className={`min-h-screen bg-[#030303] text-zinc-300 pt-32 pb-20 px-6 relative overflow-hidden ${inter.className}`}>
      
      {/* Premium Ambient Background (No Grids) */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.12),transparent_70%)] pointer-events-none z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 text-center pb-12">
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight`}>
            Decoded Intel
          </h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase font-medium">
            Verified Field Reports & Investigations
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <div className="col-span-full border border-zinc-800 p-12 text-center rounded-2xl text-zinc-500 uppercase tracking-widest text-sm bg-zinc-900/20 backdrop-blur-xl">
              No public transmissions available at this time.
            </div>
          ) : (
            articles.map((article: any) => {
              const thumbnailUrl = getFirstImage(article.content);
              
              const agentObj = article.agent_id ? {
                id: article.agent_id, name: article.agent_name, avatar: article.agent_avatar, 
                role: article.agent_role, location: article.agent_location, timezone: article.agent_timezone, 
                github: article.agent_github, twitter: article.agent_twitter, linkedin: article.agent_linkedin, 
                instagram: article.agent_instagram, facebook: article.agent_facebook, reddit: article.agent_reddit
              } : null;

              return (
                <Link href={`/blogs/${article.slug}`} key={article.id} className="relative group block h-full hover:z-50">
                  
                  {/* 🚨 FIX: Removed overflow-hidden here so the hover card can escape the boundaries */}
                  <article className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-2xl hover:border-white/15 hover:bg-white/[0.04] transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col h-full">
                    
                    {/* Added overflow-hidden exclusively to the image container to keep top corners rounded */}
                    <div className="w-full h-52 relative overflow-hidden rounded-t-2xl bg-zinc-900 border-b border-white/5">
                      {thumbnailUrl ? (
                        <img 
                          src={thumbnailUrl} 
                          alt={article.title} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950">
                          <span className="text-zinc-600 font-medium tracking-widest uppercase text-xs">No Image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent pointer-events-none"></div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow rounded-b-2xl relative">
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-[10px] uppercase tracking-widest text-purple-300 font-semibold bg-purple-500/10 px-2.5 py-1 rounded-full">
                          {article.category || 'INTEL'}
                        </span>
                        <time className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">
                          {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                      </div>
                      
                      <h2 className={`${spaceGrotesk.className} text-xl font-bold text-zinc-100 group-hover:text-white mb-4 transition-colors leading-snug line-clamp-2`}>
                        {article.title}
                      </h2>
                      
                      <p className="text-sm text-zinc-400 line-clamp-3 mb-8 flex-grow leading-relaxed font-light">
                        {article.excerpt || "Access the full investigation report."}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5 relative z-20">
                        {agentObj ? (
                          <AuthorHoverCard agent={agentObj}>
                            <div className="flex items-center gap-3 group/authcard">
                              <img src={agentObj.avatar || '/default-cover.png'} className="w-6 h-6 rounded-full border border-white/10 group-hover/authcard:border-white/30 transition-colors object-cover" />
                              <span className="text-xs text-zinc-400 group-hover/authcard:text-zinc-200 font-medium transition-colors">
                                {agentObj.name}
                              </span>
                            </div>
                          </AuthorHoverCard>
                        ) : (
                          <span className="text-xs text-zinc-500 font-medium">By {article.author}</span>
                        )}
                        <div className="flex items-center text-xs font-medium text-zinc-500 group-hover:text-white transition-colors">
                          Read <span className="ml-1.5 group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                      </div>

                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}