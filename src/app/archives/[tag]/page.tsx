import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import AuthorHoverCard from '@/components/AuthorHoverCard';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

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
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden pt-40 pb-32 ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/5 pb-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-300 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            </span>
            Archive Database Query
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-extrabold tracking-tight mb-4 uppercase text-white`}>
            Tag: <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">{decodedTag}</span>
          </h1>
          <p className="text-zinc-500 font-light tracking-wide">
            Found {articles.length} declassified {articles.length === 1 ? 'file' : 'files'} matching this parameter.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length === 0 ? (
            <div className="col-span-full border border-white/10 p-16 text-center rounded-[2rem] text-zinc-500 font-medium tracking-widest text-sm bg-white/[0.02] backdrop-blur-xl flex flex-col items-center">
              <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              NO TRANSMISSIONS FOUND FOR THIS PARAMETER.
            </div>
          ) : (
            articles.map((article: any) => {
              
              const agentObj = article.agent_id ? {
                id: article.agent_id, name: article.agent_name, avatar: article.agent_avatar, 
                role: article.agent_role, location: article.agent_location, timezone: article.agent_timezone, 
                github: article.agent_github, twitter: article.agent_twitter, linkedin: article.agent_linkedin, 
                instagram: article.agent_instagram, facebook: article.agent_facebook, reddit: article.agent_reddit
              } : null;

              return (
                <Link href={`/blogs/${article.slug}`} key={article.id} className="relative group block h-full flex flex-col hover:z-50 hover:-translate-y-1 transition-transform duration-500">
                  
                  {/* LAYER 1: BACKGROUND BEAM (Optimized for performance) */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 pointer-events-none">
                    
                    {/* 🚨 FIX: Added transform-gpu and will-change-transform for hardware acceleration */}
                    <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] [animation:spin_6s_linear_infinite] transition-opacity duration-500 transform-gpu will-change-transform"></div>
                    
                    {/* 🚨 FIX: Removed the expensive backdrop-blur-2xl filter from the solid layer */}
                    <div className="absolute inset-[1.5px] bg-[#050505] rounded-[22.5px] z-10"></div>
                    <div className="absolute inset-[1.5px] bg-white/[0.02] border border-white/5 group-hover:border-transparent rounded-[22.5px] z-10 transition-colors duration-500"></div>
                  </div>

                  {/* LAYER 2: FOREGROUND CONTENT (overflow-visible) */}
                  <div className="relative p-8 flex flex-col h-full z-20">
                    
                    <div className="absolute inset-x-8 top-[1.5px] h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-white/40 to-transparent transition-colors duration-500"></div>
                    
                    <div className="flex items-center justify-between mb-5">
                      <span className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest text-zinc-200 font-bold bg-white/10 px-3 py-1.5 rounded-sm`}>
                        {article.category || 'INTEL'}
                      </span>
                      <span className={`${jetBrainsMono.className} text-[10px] text-zinc-500 uppercase tracking-widest font-medium`}>
                        {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h2 className={`${spaceGrotesk.className} text-xl font-bold text-zinc-100 mb-4 group-hover:text-white transition-colors flex-grow leading-snug`}>
                      {article.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mt-2 mb-6">
                      {(article.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean).map((t: string, i: number) => (
                        <span key={i} className={`${jetBrainsMono.className} text-[9px] uppercase tracking-widest border border-white/5 bg-white/[0.02] px-2.5 py-1 rounded-sm text-zinc-500 group-hover:border-white/10 group-hover:text-zinc-300 transition-colors`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-5 relative z-30">
                      {agentObj ? (
                        <AuthorHoverCard agent={agentObj}>
                          <div className="flex items-center gap-3 group/authcard">
                            <img src={agentObj.avatar || '/default-cover.png'} className="w-6 h-6 rounded-full border border-white/10 group-hover/authcard:border-white/30 transition-colors object-cover" />
                            <span className="text-xs text-zinc-400 group-hover/authcard:text-zinc-200 font-medium transition-colors">
                              {agentObj.name.split(' ')[0]}
                            </span>
                          </div>
                        </AuthorHoverCard>
                      ) : (
                        <span className="text-xs text-zinc-500 font-medium">By {article.author}</span>
                      )}
                      <span className="text-xs font-semibold text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">
                        Read <span className="ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
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