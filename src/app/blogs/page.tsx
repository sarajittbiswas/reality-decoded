import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';
import AuthorHoverCard from '@/components/AuthorHoverCard';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; // 🚨 THE FIX: Busts the Next.js cache so the time check is always live

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
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 font-mono relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 text-center border-b border-white/10 pb-12">
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
            Decoded Intel
          </h1>
          <p className="text-purple-400 text-sm tracking-widest uppercase font-bold shadow-purple-500/50">
            [ Verified Field Reports & Syndicate Transmissions ]
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <div className="col-span-full border border-dashed border-white/10 p-12 text-center rounded-xl text-gray-500 uppercase tracking-widest text-sm">
              No declassified transmissions available at this time.
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
                  
                  <article className="bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-[#111] transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 flex flex-col h-full">
                    
                    <div className="w-full h-48 relative overflow-hidden rounded-t-2xl bg-black/50 border-b border-white/5">
                      {thumbnailUrl ? (
                        <img 
                          src={thumbnailUrl} 
                          alt={article.title} 
                          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-black">
                          <span className="text-purple-500/30 font-bold tracking-widest uppercase text-xs">No Image Data</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow rounded-b-2xl bg-[#0a0a0a]/80 group-hover:bg-[#111] transition-colors">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-2 py-1 rounded shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                          {article.category || 'INTEL'}
                        </span>
                        <time className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                          {new Date(article.created_at).toLocaleDateString()}
                        </time>
                      </div>
                      
                      <h2 className={`${spaceGrotesk.className} text-xl font-bold text-gray-200 group-hover:text-white mb-3 transition-colors line-clamp-2`}>
                        {article.title}
                      </h2>
                      
                      <p className="text-xs text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {article.excerpt || "Classified intel transmission. Access the full report."}
                      </p>

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
                        <div className="flex items-center text-[10px] font-bold text-gray-500 group-hover:text-purple-400 transition-colors uppercase tracking-widest">
                          Decrypt <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
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