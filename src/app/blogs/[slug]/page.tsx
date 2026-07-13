import { getRequestContext } from '@cloudflare/next-on-pages';
import { notFound } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import Interactions from '@/components/Interactions';
import ScrollProgress from '@/components/ScrollProgress';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

// Helper: Extract the first image from the HTML content body
const getFirstImage = (html: string) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

// Helper: Calculate reading time
const calculateReadingTime = (text: string) => {
  if (!text) return "1 MIN READ";
  const words = text.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} MIN READ`;
};

// 🚨 AUTOMATED DYNAMIC SEO METADATA GENERATOR (Next.js 15 Promise Params Compatible)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // Fetches title, category, and raw content containing your images
    const article = await db.prepare("SELECT title, category, content FROM articles WHERE slug = ?").bind(resolvedParams.slug).first();
    
    if (!article) return { title: 'Not Found | Reality Decoded' };

    const baseUrl = 'https://realitydecoded.in';
    const cleanDescription = (article.content as string).replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

    // ⚡ AUTO-EXTRACT IMAGE FROM CONTENT BODY
    const extractedImg = getFirstImage(article.content as string);
    
    // Resolve absolute paths: If it's a raw link (e.g. Unsplash), use it directly. Otherwise, patch it with your domain.
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

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // 1. Fetch the main article with agent credentials
  const article = await db.prepare(`
    SELECT articles.*, syndicate_agents.name as agent_name, syndicate_agents.avatar as agent_avatar
    FROM articles 
    LEFT JOIN syndicate_agents ON articles.agent_id = syndicate_agents.id
    WHERE slug = ? AND status = 'published'
  `).bind(slug).first();

  if (!article) notFound();

  // Determine if it's a clean team post or a user submission
  const isTeamArticle = article.author === 'Syndicate Admin';

  // 2. Fetch 3 related articles (excluding current article)
  const { results: relatedArticles } = await db.prepare(
    "SELECT * FROM articles WHERE slug != ? AND status = 'published' ORDER BY created_at DESC LIMIT 3"
  ).bind(slug).all();

  const heroImage = getFirstImage(article.content) || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop';
  const readTime = calculateReadingTime(article.content);
  
  // Dynamic tags split safely
  const tags = article.tags && article.tags.trim() !== "" 
    ? article.tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
    : [article.category || 'INTEL'];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative font-mono">
      <ScrollProgress />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[30%] bg-purple-900/10 blur-[120px] pointer-events-none z-0"></div>

      <article className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest shadow-[0_0_10px_rgba(168,85,247,0.2)]">
              {article.category || 'Investigation'}
            </span>
            <span className="text-xs text-gray-600 tracking-widest">ID: RD-{slug.substring(0,6).toUpperCase()}</span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 font-mono uppercase tracking-widest">
            {article.agent_name ? (
              <div className="flex items-center gap-2">
                <img src={article.agent_avatar} alt="Agent Avatar" className="w-6 h-6 rounded-full border border-purple-500/50 shadow-[0_0_10px_purple]" />
                <span className="text-purple-400 font-bold">
                  {isTeamArticle 
                    ? `By Syndicate Agent, ${article.agent_name}` 
                    : `By ${article.author} • Modified by ${article.agent_name}`}
                </span>
              </div>
            ) : (
              <span className="text-purple-400 font-bold">By {article.author}</span>
            )}

            <span>•</span>
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {readTime}
            </span>
          </div>
        </div>

        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-white/5 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80"></div>
           <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10"></div>
           <img 
             src={heroImage} 
             alt={article.title} 
             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
           />
        </div>

        <div className="max-w-3xl mx-auto bg-[#111111]/50 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-2xl shadow-xl">
          <div 
            className="syndicate-prose mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          <div className="border-t border-white/10 pt-8 mb-12">
            <div className="flex items-center gap-2 text-gray-500 mb-4 uppercase tracking-widest text-xs font-bold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
              Down the Rabbit Hole
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag: string, i: number) => (
                <Link key={i} href={`/archives/${tag}`} className="text-[10px] uppercase tracking-widest text-gray-400 border border-white/10 bg-white/5 px-3 py-1.5 rounded hover:border-purple-500/50 hover:text-purple-400 transition-colors cursor-pointer">
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          
          <Interactions id={`blog-${slug}`} title={article.title} />
        </div>

        <div className="max-w-3xl mx-auto mt-12 pt-8 flex items-center justify-between mb-16 border-t border-white/5">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors font-bold uppercase tracking-widest text-xs group">
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
            Close File
          </Link>
          <span className="text-[10px] text-gray-600 uppercase tracking-widest">End of Transmission</span>
        </div>

        {/* RELATED INTELLIGENCE SECTION */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-white/5 pt-12 relative z-10 max-w-4xl mx-auto">
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white uppercase mb-8 flex items-center gap-3`}>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></span>
              Related Intelligence
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related: any) => {
                const relatedThumb = getFirstImage(related.content) || 'https://images.unsplash.com/photo-1614064010834-58e1c68b6b0b?q=80&w=1000&auto=format&fit=crop';
                return (
                  <Link href={`/blogs/${related.slug}`} key={related.slug} className="group block h-full">
                    <div className="bg-[#111] border border-white/5 rounded-xl p-5 h-full flex flex-col hover:border-purple-500/50 hover:bg-[#161616] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)]">
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 border border-white/5 bg-black">
                         <img src={relatedThumb} alt={related.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2 block">{related.category || 'INTEL'}</span>
                      <h4 className={`${spaceGrotesk.className} font-bold text-gray-200 group-hover:text-white line-clamp-2 text-sm md:text-base leading-snug mb-4`}>
                        {related.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </article>

      {/* SERVER COMPONENT CSS INJECTION */}
      <style dangerouslySetInnerHTML={{ __html: `
        .syndicate-prose {
          color: #e5e7eb;
          font-size: 1.125rem;
          line-height: 1.75;
        }
        .syndicate-prose h1, .syndicate-prose h2, .syndicate-prose h3 {
          color: #ffffff;
          font-weight: 700;
          line-height: 1.3;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .syndicate-prose h1 { font-size: 2.25rem; }
        .syndicate-prose h2 { font-size: 1.875rem; }
        .syndicate-prose h3 { font-size: 1.5rem; }
        .syndicate-prose p { margin-bottom: 1.5em; }
        .syndicate-prose strong, .syndicate-prose b { 
          font-weight: bold !important; 
          color: #ffffff !important; 
        }
        .syndicate-prose em, .syndicate-prose i { 
          font-style: italic !important; 
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
        .syndicate-prose blockquote {
          border-left: 4px solid #a855f7;
          padding: 0.5rem 0 0.5rem 1.25rem;
          margin: 1.5em 0;
          font-style: italic;
          background: rgba(168,85,247,0.05);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .syndicate-prose a { 
          color: #c084fc; 
          text-decoration: underline; 
          text-underline-offset: 4px;
        }
        .syndicate-prose img { 
          width: 100%; 
          border-radius: 0.75rem; 
          margin: 2rem 0; 
          border: 1px solid rgba(255,255,255,0.1); 
        }
        .syndicate-prose iframe { 
          width: 100%; 
          aspect-ratio: 16/9; 
          border-radius: 0.75rem; 
          margin: 2rem 0; 
          border: 1px solid rgba(255,255,255,0.1); 
        }
      `}} />
    </main>
  );
}