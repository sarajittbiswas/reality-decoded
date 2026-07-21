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

// 🚨 FIX: Type searchParams as a Promise for Next.js 15+ compatibility
export default async function PublicBlogFeed(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // 🚨 FIX: Await the searchParams before using them
  const searchParams = await props.searchParams;

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
  
  // 1. Filter out scheduled future posts
  const validArticles = allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  );

  // 2. Extract unique categories dynamically from the DB results
  const uniqueCategories = Array.from(
    new Set(validArticles.map((a: any) => a.category).filter(Boolean))
  ).sort();

  // 3. Filter articles based on the awaited category
  const currentCategory = searchParams.category || 'All';
  const displayedArticles = validArticles.filter((a: any) => 
    currentCategory === 'All' ? true : a.category === currentCategory
  );

  return (
    <main className={`min-h-screen bg-[#050505] text-zinc-300 pt-32 pb-24 px-6 relative overflow-hidden ${inter.className}`}>
      
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Header (Left Aligned matching screenshot) */}
        <header className="mb-10 pt-4">
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight`}>
            Decoded Intel
          </h1>
          <p className="text-zinc-500 text-sm md:text-base font-light tracking-wide max-w-2xl">
            Verified field reports, investigations, and classified operations logs.
          </p>
        </header>

        {/* Dynamic Category Pill Navigation */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-4 border-b border-white/5">
          <Link 
            href="/blogs"
            className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${
              currentCategory === 'All' 
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                : 'bg-white/[0.03] text-zinc-400 border border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            All
          </Link>
          
          {uniqueCategories.map((cat: any) => (
            <Link 
              key={cat}
              href={`/blogs?category=${encodeURIComponent(cat)}`}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${
                currentCategory === cat 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                  : 'bg-white/[0.03] text-zinc-400 border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.length === 0 ? (
            <div className="col-span-full border border-white/10 p-16 text-center rounded-[2rem] text-zinc-500 font-medium tracking-widest text-sm bg-white/[0.02] backdrop-blur-xl flex flex-col items-center">
               <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              NO TRANSMISSIONS FOUND FOR THIS SECTOR.
            </div>
          ) : (
            displayedArticles.map((article: any) => {
              const thumbnailUrl = getFirstImage(article.content);
              
              const agentObj = article.agent_id ? {
                id: article.agent_id, name: article.agent_name, avatar: article.agent_avatar, 
                role: article.agent_role, location: article.agent_location, timezone: article.agent_timezone, 
                github: article.agent_github, twitter: article.agent_twitter, linkedin: article.agent_linkedin, 
                instagram: article.agent_instagram, facebook: article.agent_facebook, reddit: article.agent_reddit
              } : null;

              return (
                <Link href={`/blogs/${article.slug}`} key={article.id} className="relative group block h-full hover:z-50">
                  
                  <article className="bg-[#0a0a0a] backdrop-blur-2xl border border-white/5 rounded-3xl hover:border-white/20 hover:bg-[#111] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col h-full overflow-visible">
                    
                    <div className="w-full h-56 relative overflow-hidden rounded-t-[23px] bg-zinc-900 border-b border-white/5">
                      {thumbnailUrl ? (
                        <img 
                          src={thumbnailUrl} 
                          alt={article.title} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#111]">
                          <span className="text-zinc-700 font-medium tracking-widest uppercase text-xs">Asset Redacted</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none opacity-90"></div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow rounded-b-[23px] relative">
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-[9px] uppercase tracking-widest text-zinc-300 font-bold bg-white/10 px-3 py-1.5 rounded-sm">
                          {article.category || 'INTEL'}
                        </span>
                        <time className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
                          {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </time>
                      </div>
                      
                      <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 group-hover:text-white mb-4 transition-colors leading-snug line-clamp-2`}>
                        {article.title}
                      </h2>
                      
                      <p className="text-sm text-zinc-400 line-clamp-3 mb-8 flex-grow leading-relaxed font-light">
                        {article.excerpt || "Access the full investigation report."}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5 relative z-20">
                        {agentObj ? (
                          <AuthorHoverCard agent={agentObj}>
                            <div className="flex items-center gap-3 group/authcard">
                              <img src={agentObj.avatar || '/default-cover.png'} className="w-7 h-7 rounded-full border border-white/10 group-hover/authcard:border-white/30 transition-colors object-cover" />
                              <span className="text-xs text-zinc-400 group-hover/authcard:text-zinc-200 font-medium transition-colors">
                                {agentObj.name}
                              </span>
                            </div>
                          </AuthorHoverCard>
                        ) : (
                          <span className="text-xs text-zinc-500 font-medium">By {article.author}</span>
                        )}
                        <div className="flex items-center text-xs font-semibold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-widest">
                          Read <span className="ml-1.5 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
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