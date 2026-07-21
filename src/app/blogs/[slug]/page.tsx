import { getRequestContext } from '@cloudflare/next-on-pages';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import Interactions from '@/components/Interactions';
import ScrollProgress from '@/components/ScrollProgress';
import ViewTracker from '@/components/ViewTracker';
import AuthorHoverCard from '@/components/AuthorHoverCard';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const getFirstImage = (html: string) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const calculateReadingTime = (text: string) => {
  if (!text) return "1 MIN READ";
  const words = text.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} MIN READ`;
};

// ==========================================
// SEO & METADATA GENERATOR
// ==========================================

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    const article = await db.prepare("SELECT title, category, content FROM articles WHERE slug = ?").bind(resolvedParams.slug).first();
    
    if (!article) return { title: 'Not Found | Reality Decoded' };

    const baseUrl = 'https://realitydecoded.in';
    const cleanDescription = (article.content as string).replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

    const extractedImg = getFirstImage(article.content as string);
    
    let imageUrl = extractedImg || `${baseUrl}/default-cover.png`;
    
    if (extractedImg && !extractedImg.startsWith('http')) {
      imageUrl = `${baseUrl}${extractedImg.startsWith('/') ? '' : '/'}${extractedImg}`;
    }

    return {
      title: `${article.title} | Reality Decoded`,
      description: cleanDescription,
      openGraph: {
        title: article.title as string,
        description: cleanDescription,
        url: `${baseUrl}/blogs/${resolvedParams.slug}`,
        siteName: 'Reality Decoded',
        type: 'article',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title as string,
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title as string,
        description: cleanDescription,
        images: [imageUrl],
      }
    };
  } catch (error) {
    return { title: 'Transmission | Reality Decoded' };
  }
}

// ==========================================
// MAIN DETAIL COMPONENT
// ==========================================

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const article = await db.prepare(`
    SELECT articles.*, 
           sa.id as agent_id, sa.name as agent_name, sa.avatar as agent_avatar, 
           sa.role as agent_role, sa.location as agent_location, sa.timezone as agent_timezone, 
           sa.website as agent_website, sa.github as agent_github, sa.twitter as agent_twitter, 
           sa.linkedin as agent_linkedin, sa.instagram as agent_instagram, sa.facebook as agent_facebook, sa.reddit as agent_reddit
    FROM articles 
    LEFT JOIN syndicate_agents sa ON articles.agent_id = sa.id
    WHERE slug = ? AND status IN ('published', 'scheduled')
  `).bind(slug).first();

  if (!article) notFound();

  const getISTDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return new Date();
    return new Date(dateStr.replace(' ', 'T') + '+05:30');
  };

  const now = new Date();
  const isLive = article.status === 'published' || (article.status === 'scheduled' && getISTDate(article.scheduled_for as string) <= now);
  
  if (!isLive) notFound();

  const mainAgentObj = article.agent_id ? {
    id: article.agent_id,
    name: article.agent_name,
    avatar: article.agent_avatar,
    role: article.agent_role,
    location: article.agent_location,
    timezone: article.agent_timezone,
    github: article.agent_github,
    twitter: article.agent_twitter,
    linkedin: article.agent_linkedin,
    instagram: article.agent_instagram,
    facebook: article.agent_facebook,
    reddit: article.agent_reddit
  } : null;

  const { results: allRelated } = await db.prepare(`
    SELECT articles.*, 
           sa.id as agent_id, sa.name as agent_name, sa.avatar as agent_avatar, 
           sa.role as agent_role, sa.location as agent_location, sa.timezone as agent_timezone, 
           sa.website as agent_website, sa.github as agent_github, sa.twitter as agent_twitter, 
           sa.linkedin as agent_linkedin, sa.instagram as agent_instagram, sa.facebook as agent_facebook, sa.reddit as agent_reddit
    FROM articles 
    LEFT JOIN syndicate_agents sa ON articles.agent_id = sa.id
    WHERE slug != ? AND status IN ('published', 'scheduled') 
    ORDER BY created_at DESC
  `).bind(slug).all();

  const relatedArticles = allRelated.filter((a: any) => 
    a.status === 'published' || (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  ).slice(0, 3);

  const heroImage = getFirstImage(article.content) || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop';
  const readTime = calculateReadingTime(article.content);
  
  const tags = article.tags && article.tags.trim() !== "" 
    ? article.tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
    : [article.category || 'INTEL'];

  return (
    <main className={`min-h-screen bg-[#050505] pt-32 pb-24 relative overflow-hidden ${inter.className}`}>
      
      <ViewTracker slug={slug} />
      <ScrollProgress />

      {/* Global Seamless Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <article className="max-w-4xl mx-auto px-5 md:px-6 relative z-10">
        
        {/* --- SYSTEM BREADCRUMBS --- */}
        <nav className={`flex flex-wrap items-center justify-center md:justify-start gap-2 text-[10px] uppercase tracking-widest ${jetBrainsMono.className} text-zinc-600 mb-10 border-b border-white/5 pb-4`}>
          <Link href="/" className="hover:text-zinc-300 transition-colors">Mainframe</Link>
          <span className="text-white/10">/</span>
          <Link href="/blogs" className="hover:text-zinc-300 transition-colors">Archives</Link>
          <span className="text-white/10">/</span>
          <Link href={`/archives/${article.category?.toLowerCase() || 'intel'}`} className="hover:text-zinc-300 transition-colors">
            {article.category || 'INTEL'}
          </Link>
          <span className="text-white/10">/</span>
          <span className="text-zinc-300 truncate max-w-[200px] md:max-w-xs font-bold" title={article.title as string}>
            FILE: RD-{slug.substring(0,6).toUpperCase()}
          </span>
        </nav>

        {/* --- HERO HEADER --- */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`${jetBrainsMono.className} inline-flex items-center gap-2 bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              {article.category || 'Investigation'}
            </span>
            <span className={`${jetBrainsMono.className} text-[10px] text-zinc-600 tracking-widest uppercase`}>
              ID: RD-{slug.substring(0,6).toUpperCase()}
            </span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 tracking-tight leading-[1.1] mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
            {article.title}
          </h1>
          
          <div className={`${jetBrainsMono.className} flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest`}>
            
            {/* UPDATED AUTHOR LOGIC */}
            {mainAgentObj ? (
              <AuthorHoverCard agent={mainAgentObj}>
                <Link href={`/author/${mainAgentObj.id}`} className="flex items-center gap-2 group/author hover:opacity-80 transition-all py-1">
                  <img src={mainAgentObj.avatar} alt={mainAgentObj.name} className="w-6 h-6 rounded-full border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover/author:border-white/50 transition-colors object-cover" />
                  <span className="text-zinc-200 font-bold group-hover/author:text-white transition-colors">
                    By {mainAgentObj.name}
                  </span>
                </Link>
              </AuthorHoverCard>
            ) : (
              <Link href={`/author/${encodeURIComponent(article.author as string)}`} className="text-zinc-200 font-bold hover:text-white transition-colors">
                By {article.author}
              </Link>
            )}

            <span className="text-white/20">•</span>
            <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-bold text-zinc-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {readTime}
            </span>
          </div>
        </div>

        {/* --- HERO IMAGE --- */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] overflow-hidden mb-16 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group p-[2px]">
           <div className="absolute inset-0 bg-white/5 z-0"></div>
           <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0a0a0a]">
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-90 pointer-events-none"></div>
             <img 
               src={heroImage} 
               alt={article.title as string} 
               className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100" 
             />
           </div>
        </div>

        {/* --- MAIN CONTENT & PROSE --- */}
        <div className="max-w-3xl mx-auto bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-14 rounded-[2rem] shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
          
          <div 
            className="syndicate-prose mb-16"
            dangerouslySetInnerHTML={{ __html: article.content as string }} 
          />

          <div className="border-t border-white/10 pt-10 mb-12">
            <div className={`${jetBrainsMono.className} flex items-center gap-2 text-zinc-500 mb-5 uppercase tracking-widest text-[10px] font-bold`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
              Down the Rabbit Hole
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag: string, i: number) => (
                <Link key={i} href={`/archives/${tag}`} className={`${jetBrainsMono.className} text-[10px] uppercase tracking-widest text-zinc-400 border border-white/10 bg-white/5 px-4 py-2 rounded-md hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer shadow-sm`}>
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          
          <Interactions id={`blog-${slug}`} title={article.title as string} />
        </div>

        {/* --- CLOSE FILE FOOTER --- */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 flex items-center justify-between mb-20 border-t border-white/5">
          <Link href="/blogs" className={`${jetBrainsMono.className} inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px] group`}>
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
            Close File
          </Link>
          <span className={`${jetBrainsMono.className} text-[9px] text-zinc-600 uppercase tracking-widest`}>End of Transmission</span>
        </div>

        {/* --- RELATED INTELLIGENCE (Upgraded with Beam Glow) --- */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-white/5 pt-16 relative z-10 max-w-4xl mx-auto">
            <h3 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-3`}>
              <span className="w-2.5 h-2.5 bg-zinc-300 rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.8)]"></span>
              Related Intelligence
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related: any) => {
                const relatedThumb = getFirstImage(related.content) || 'https://images.unsplash.com/photo-1614064010834-58e1c68b6b0b?q=80&w=1000&auto=format&fit=crop';
                
                const relAgentObj = related.agent_id ? {
                  id: related.agent_id, name: related.agent_name, avatar: related.agent_avatar, 
                  role: related.agent_role, location: related.agent_location, timezone: related.agent_timezone, 
                  github: related.agent_github, twitter: related.agent_twitter, linkedin: related.agent_linkedin, 
                  instagram: related.agent_instagram, facebook: related.agent_facebook, reddit: related.agent_reddit
                } : null;

                return (
                  <Link href={`/blogs/${related.slug}`} key={related.slug} className="group block h-full relative flex flex-col hover:z-50 hover:-translate-y-1 transition-transform duration-500">
                    
                    {/* Background Beam Glow Layer */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 pointer-events-none">
                      <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] [animation:spin_6s_linear_infinite] transition-opacity duration-500"></div>
                      <div className="absolute inset-[1.5px] bg-[#050505] rounded-[14.5px] z-10"></div>
                      <div className="absolute inset-[1.5px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 group-hover:border-transparent rounded-[14.5px] z-10 transition-colors duration-500"></div>
                    </div>

                    {/* Foreground Content Layer (overflow-visible) */}
                    <div className="relative p-5 flex flex-col h-full z-20">
                      
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-5 border border-white/5 bg-black">
                         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-50"></div>
                         <img src={relatedThumb} alt={related.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                      </div>
                      
                      <span className={`${jetBrainsMono.className} text-[9px] font-bold text-zinc-300 uppercase tracking-widest mb-2.5 block bg-white/10 w-max px-2 py-1 rounded-sm border border-white/5`}>
                        {related.category || 'INTEL'}
                      </span>
                      
                      <h4 className={`${spaceGrotesk.className} font-bold text-zinc-200 group-hover:text-white line-clamp-2 text-sm md:text-base leading-snug mb-5 flex-grow`}>
                        {related.title}
                      </h4>

                      <div className="mt-auto border-t border-white/5 pt-4 flex items-center justify-between relative z-30">
                        {relAgentObj ? (
                          <AuthorHoverCard agent={relAgentObj}>
                            <div className="flex items-center gap-2 group/relauth">
                              <img src={relAgentObj.avatar || '/default-cover.png'} className="w-5 h-5 rounded-full border border-white/10 group-hover/relauth:border-white/30 transition-colors object-cover" />
                              <span className="text-[10px] text-zinc-400 group-hover/relauth:text-white uppercase tracking-widest font-bold transition-colors">{relAgentObj.name.split(' ')[0]}</span>
                            </div>
                          </AuthorHoverCard>
                        ) : (
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">By {related.author}</span>
                        )}
                        <span className="text-[10px] font-bold text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>

      {/* --- UPGRADED PROSE STYLING --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .syndicate-prose {
          color: #d4d4d8; /* zinc-300 */
          font-size: 1.125rem;
          line-height: 1.8;
          font-family: ${inter.style.fontFamily}, sans-serif;
        }
        
        .syndicate-prose h1, 
        .syndicate-prose h2, 
        .syndicate-prose h3,
        .syndicate-prose h4 {
          font-family: ${spaceGrotesk.style.fontFamily}, sans-serif;
          color: #ffffff;
          font-weight: 800;
          line-height: 1.3;
          margin-top: 2em;
          margin-bottom: 0.75em;
          letter-spacing: -0.02em;
        }
        
        .syndicate-prose h1 { font-size: 2.25rem; }
        .syndicate-prose h2 { font-size: 1.875rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .syndicate-prose h3 { font-size: 1.5rem; }
        
        .syndicate-prose p { 
          margin-bottom: 1.5em; 
          font-weight: 300;
        }
        
        .syndicate-prose strong, 
        .syndicate-prose b { 
          font-weight: 600 !important; 
          color: #f4f4f5 !important; /* zinc-100 */
        }
        
        .syndicate-prose em, 
        .syndicate-prose i { 
          font-style: italic !important; 
          color: #a1a1aa; /* zinc-400 */
        }
        
        .syndicate-prose ul { 
          list-style-type: disc !important; 
          padding-left: 1.5rem !important; 
          margin-bottom: 1.5em; 
        }
        
        .syndicate-prose ol { 
          list-style-type: decimal !important; 
          padding-left: 1.5rem !important; 
          margin-bottom: 1.5em; 
        }

        .syndicate-prose li {
          margin-bottom: 0.5em;
        }
        
        .syndicate-prose blockquote { 
          border-left: 2px solid #d4d4d8; 
          padding: 1rem 1.5rem; 
          margin: 2em 0; 
          font-style: italic; 
          background: rgba(255,255,255,0.02); 
          border-radius: 0 0.75rem 0.75rem 0;
          color: #a1a1aa;
        }
        
        .syndicate-prose a { 
          color: #f4f4f5; 
          text-decoration: underline; 
          text-decoration-color: rgba(255,255,255,0.2);
          text-underline-offset: 4px; 
          transition: all 0.2s ease;
        }

        .syndicate-prose a:hover {
          text-decoration-color: #ffffff;
        }
        
        .syndicate-prose img { 
          width: 100%; 
          border-radius: 1rem; 
          margin: 2.5rem 0; 
          border: 1px solid rgba(255,255,255,0.1); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        
        .syndicate-prose iframe { 
          width: 100%; 
          aspect-ratio: 16/9; 
          border-radius: 1rem; 
          margin: 2.5rem 0; 
          border: 1px solid rgba(255,255,255,0.1); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
      `}} />
    </main>
  );
}