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
    
    // 🚨 FIX: Added 'excerpt' to the SELECT statement!
    const article = await db.prepare("SELECT title, category, content, excerpt FROM articles WHERE slug = ?").bind(resolvedParams.slug).first();
    
    if (!article) return { title: 'Not Found | Reality Decoded' };

    const baseUrl = 'https://realitydecoded.in';
    const cleanDescription = (article.content as string).replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';
    
    // 🚨 FIX: Your perfectly clean fallback logic
    const finalDescription = (article.excerpt as string) || cleanDescription;

    const extractedImg = getFirstImage(article.content as string);
    
    let imageUrl = extractedImg || `${baseUrl}/default-cover.png`;
    
    if (extractedImg && !extractedImg.startsWith('http')) {
      imageUrl = `${baseUrl}${extractedImg.startsWith('/') ? '' : '/'}${extractedImg}`;
    }

    return {
      title: `${article.title} | Reality Decoded`,
      description: finalDescription,
      openGraph: {
        title: article.title as string,
        description: finalDescription,
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
        description: finalDescription,
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

      <article className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- SYSTEM BREADCRUMBS --- */}
        <nav className={`flex flex-wrap items-center justify-center md:justify-start gap-2 text-[10px] uppercase tracking-widest ${jetBrainsMono.className} text-zinc-600 mb-10 border-b border-white/5 pb-4 px-2`}>
          <Link href="/" className="hover:text-zinc-300 transition-colors">Mainframe</Link>
          <span className="text-white/10">/</span>
          <Link href="/blogs" className="hover:text-zinc-300 transition-colors">Archives</Link>
          <span className="text-white/10">/</span>
          <Link href={`/archives/${encodeURIComponent(article.category?.toLowerCase() || 'intel')}`} className="hover:text-zinc-300 transition-colors">
            {article.category || 'INTEL'}
          </Link>
          <span className="text-white/10">/</span>
          <span className="text-zinc-300 truncate max-w-[150px] md:max-w-xs font-bold" title={article.title as string}>
            FILE: RD-{slug.substring(0,6).toUpperCase()}
          </span>
        </nav>

        {/* --- HERO HEADER --- */}
        <div className="mb-12 text-center max-w-3xl mx-auto px-2">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`${jetBrainsMono.className} inline-flex items-center gap-2 bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              {article.category || 'Investigation'}
            </span>
            <span className={`${jetBrainsMono.className} text-[10px] text-zinc-600 tracking-widest uppercase`}>
              ID: RD-{slug.substring(0,6).toUpperCase()}
            </span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
            {article.title}
          </h1>
          
          <div className={`${jetBrainsMono.className} flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest`}>
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
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-[24px] overflow-hidden mb-12 border border-white/5 lg:border-white/10 shadow-lg lg:shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group p-[1px] md:p-[2px]">
           <div className="absolute inset-0 bg-white/5 z-0"></div>
           <div className="relative w-full h-full rounded-[15px] md:rounded-[22px] overflow-hidden bg-[#0a0a0a]">
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-90 pointer-events-none"></div>
             <img 
               src={heroImage} 
               alt={article.title as string} 
               className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100" 
             />
           </div>
        </div>

        {/* --- MAIN CONTENT & PROSE --- */}
        {/* 🚀 CLEANED: Removed all background boxes, glass effects, borders, and animations. Just plain text container. */}
        <div className="max-w-[700px] mx-auto relative group/prose">
          
          <div className="relative z-10 py-6 md:py-10">
            
            <div 
              className="syndicate-prose mb-16"
              dangerouslySetInnerHTML={{ __html: article.content as string }} 
            />

            <div className="border-t border-white/10 pt-10 mb-12">
              <div className={`${jetBrainsMono.className} flex items-center gap-2 text-zinc-500 mb-5 uppercase tracking-widest text-[10px] font-bold`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
                Down the Rabbit Hole
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {tags.map((tag: string, i: number) => (
                  <Link key={i} href={`/archives/${encodeURIComponent(tag)}?from=${slug}`} className={`${jetBrainsMono.className} text-[10px] uppercase tracking-widest text-zinc-400 border border-white/10 bg-white/5 px-3 md:px-4 py-2 rounded-md hover:border-white/30 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer shadow-sm`}>
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
            
            <Interactions id={`blog-${slug}`} title={article.title as string} />
          </div>
        </div>

        {/* --- CLOSE FILE FOOTER --- */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 mb-20 border-t border-white/5 text-center md:text-left px-2">
          <Link href="/blogs" className={`${jetBrainsMono.className} inline-flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px] group`}>
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
            Close File
          </Link>
          <span className={`${jetBrainsMono.className} text-[9px] text-zinc-600 uppercase tracking-widest`}>End of Transmission</span>
        </div>

        {/* --- RELATED INTELLIGENCE --- */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-white/5 pt-16 relative z-10 max-w-4xl mx-auto px-2">
            <h3 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white mb-10 flex items-center gap-3`}>
              <span className="w-2.5 h-2.5 bg-zinc-300 rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.8)]"></span>
              Related Intelligence
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                    
                    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 pointer-events-none">
                      <div className="absolute inset-[-150%] z-0 opacity-40 group-hover:opacity-90 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.5)_100%)] animate-[spin_6s_linear_infinite] transition-opacity duration-500"></div>
                      <div className="absolute inset-[1.5px] bg-[#050505] rounded-[14.5px] z-10"></div>
                      <div className="absolute inset-[1.5px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 group-hover:border-transparent rounded-[14.5px] z-10 transition-colors duration-500"></div>
                    </div>

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
          color: #a1a1aa; 
          font-size: 16px; 
          line-height: 1.7;
          font-family: ${inter.style.fontFamily}, sans-serif;
        }

        @media (min-width: 768px) {
          .syndicate-prose {
            font-size: 18px;
            line-height: 1.8;
            color: #d4d4d8; 
          }
        }
        
        .syndicate-prose h1, 
        .syndicate-prose h2, 
        .syndicate-prose h3,
        .syndicate-prose h4,
        .syndicate-prose h5,
        .syndicate-prose h6 {
          font-family: ${spaceGrotesk.style.fontFamily}, sans-serif;
          font-weight: 800;
          line-height: 1.3;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          letter-spacing: -0.02em;
          color: #ffffff;
        }
        
        .syndicate-prose h1 { font-size: 2rem; }
        @media (min-width: 768px) { .syndicate-prose h1 { font-size: 2.25rem; } }

        .syndicate-prose h2 { font-size: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; }
        @media (min-width: 768px) { .syndicate-prose h2 { font-size: 1.875rem; } }

        .syndicate-prose h3 { font-size: 1.25rem; }
        @media (min-width: 768px) { .syndicate-prose h3 { font-size: 1.5rem; } }
        
        /* 🚀 STRICT RESET: Ensures regular paragraphs NEVER get borders or left lines */
        .syndicate-prose p { 
          margin-bottom: 1.25em; 
          font-weight: 300;
          border: none !important;
          border-left: none !important;
          background: transparent !important;
          padding: 0 !important;
        }
        
        .syndicate-prose strong, 
        .syndicate-prose b { 
          font-weight: 700; 
        }
        
        .syndicate-prose em, 
        .syndicate-prose i { 
          font-style: italic; 
        }

        .syndicate-prose u {
          text-decoration: underline;
        }
        
        .syndicate-prose ul { 
          list-style-type: disc; 
          padding-left: 1.5rem; 
          margin-bottom: 1.5em; 
        }
        
        .syndicate-prose ol { 
          list-style-type: decimal; 
          padding-left: 1.5rem; 
          margin-bottom: 1.5em; 
        }

        .syndicate-prose li {
          margin-bottom: 0.5em;
        }
        
        /* 🚀 STRICT BLOCKQUOTE ONLY: Applies line exclusively to true HTML blockquotes */
        article .syndicate-prose blockquote { 
          border-top: none !important;
          border-right: none !important;
          border-bottom: none !important;
          border-left: 4px solid #a855f7 !important; 
          background: rgba(255, 255, 255, 0.03) !important; 
          padding: 0.75rem 1.25rem !important; 
          margin: 1.5em 0 !important; 
          font-style: italic !important; 
          color: #d4d4d8 !important;
          border-radius: 0 0.5rem 0.5rem 0 !important;
        }
        
        .syndicate-prose a { 
          text-decoration: underline; 
          text-decoration-color: rgba(255,255,255,0.3);
          text-underline-offset: 4px; 
          transition: all 0.2s ease;
        }

        .syndicate-prose a:hover {
          text-decoration-color: #ffffff;
        }
        
        .syndicate-prose img, .syndicate-prose iframe { 
          max-width: 100%; 
          border-radius: 0.5rem; 
          margin: 2rem 0; 
        }
        @media (min-width: 1024px) {
          .syndicate-prose img, .syndicate-prose iframe {
            border-radius: 1rem;
            margin: 2.5rem 0;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          }
        }
      `}} />
    </main>
  );
}