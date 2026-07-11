import { getRequestContext } from '@cloudflare/next-on-pages';
import { notFound } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import Interactions from '@/components/Interactions';
import ScrollProgress from '@/components/ScrollProgress';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

// Helper: Extract the first image from the HTML for thumbnails and hero banners
const getFirstImage = (html: string) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

// Helper: Calculate an estimated reading time based on word count
const calculateReadingTime = (text: string) => {
  if (!text) return "1 MIN READ";
  const words = text.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} MIN READ`;
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // 1. Fetch the main article
  const article = await db.prepare(
    "SELECT * FROM articles WHERE slug = ? AND status = 'published'"
  ).bind(slug).first();

  if (!article) {
    notFound();
  }

  // 2. Fetch 3 related articles (excluding the current one)
  const { results: relatedArticles } = await db.prepare(
    "SELECT * FROM articles WHERE slug != ? AND status = 'published' ORDER BY created_at DESC LIMIT 3"
  ).bind(slug).all();

  // Extract Hero Image or use a cinematic fallback
  const heroImage = getFirstImage(article.content) || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop';
  const readTime = calculateReadingTime(article.content);
  
  // Generate a few dynamic tags based on the category
  const tags = [article.category || 'INTEL', 'DECLASSIFIED', 'SYNDICATE OP'];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative font-mono">
      
      {/* GLOWING PROGRESS BAR */}
      <ScrollProgress />

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[30%] bg-purple-900/10 blur-[120px] pointer-events-none z-0"></div>

      <article className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Document Header */}
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
          
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 font-mono uppercase tracking-widest">
            <span className="text-purple-400 font-bold">By {article.author}</span>
            <span>•</span>
            <span>{new Date(article.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              {readTime}
            </span>
          </div>
        </div>

        {/* CINEMATIC HERO IMAGE */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-white/5 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80"></div>
           <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10"></div>
           <img 
             src={heroImage} 
             alt={article.title} 
             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
           />
        </div>

        {/* Document Body */}
        <div className="max-w-3xl mx-auto bg-[#111111]/50 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-2xl shadow-xl">
          
          {/* TipTap HTML Injection */}
          <div 
            className="syndicate-prose mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />

          {/* DOWN THE RABBIT HOLE (TAGS) */}
          <div className="border-t border-white/10 pt-8 mb-12">
            <div className="flex items-center gap-2 text-gray-500 mb-4 uppercase tracking-widest text-xs font-bold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
              Down the Rabbit Hole
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <span key={i} className="text-[10px] uppercase tracking-widest text-gray-400 border border-white/10 bg-white/5 px-3 py-1.5 rounded hover:border-purple-500/50 hover:text-purple-400 transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* THE INTERACTIONS COMPONENT */}
          <Interactions id={`blog-${slug}`} title={article.title} />
        </div>

        {/* Footer Navigation */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 flex items-center justify-between mb-16 border-t border-white/5">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors font-bold uppercase tracking-widest text-xs group">
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
            Close File
          </Link>
          <span className="text-[10px] text-gray-600 uppercase tracking-widest">End of Transmission</span>
        </div>

        {/* RELATED INTEL BLOCK */}
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
                    <div className="bg-[#111] border border-white/5 rounded-xl p-5 h-full flex flex-col hover:border-purple-500/50 hover:bg-[#161616] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-20"></div>
                      
                      {/* RELATED THUMBNAIL */}
                      <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 border border-white/5 group-hover:border-purple-500/30 transition-colors bg-black">
                         <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10"></div>
                         <img 
                           src={relatedThumb} 
                           alt={related.title} 
                           className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                         />
                      </div>

                      <span className="text-[10px] font-mono text-gray-500 group-hover:text-purple-400 uppercase tracking-widest mb-2 block transition-colors">
                        {related.category || 'INTEL'}
                      </span>
                      <h4 className={`${spaceGrotesk.className} font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-2 text-sm md:text-base leading-snug mb-4`}>
                        {related.title}
                      </h4>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                        Decrypt <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </article>

      
    </main>
  );
}