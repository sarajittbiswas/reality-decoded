import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

export default async function TagArchivePage({ params }: { params: { tag: string } }) {
  // 🚨 CLEAN: Remove underscore (if mistakenly added), trim, and decode URL
  const decodedTag = decodeURIComponent(params.tag).replace(/^_/, '').trim();
  
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // 🚨 QUERY: We force the comma padding so 'news' matches 'intel,news,ufo' perfectly
  const { results: articles } = await db.prepare(
    `SELECT * FROM articles 
     WHERE status = 'published' 
     AND (',' || COALESCE(tags, '') || ',') LIKE ? 
     ORDER BY created_at DESC`
  ).bind(`%,${decodedTag},%`).all();

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
            articles.map((article: any) => (
              <Link href={`/blogs/${article.slug}`} key={article.id} className="group block bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400">{article.category}</span>
                    <span className="text-xs text-gray-500">{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                  <h2 className={`${spaceGrotesk.className} text-xl font-bold text-gray-200 mb-3 group-hover:text-white transition-colors`}>
                    {article.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(article.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean).map((t: string, i: number) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest border border-white/10 px-2 py-1 rounded text-gray-400 group-hover:border-purple-500/30 group-hover:text-purple-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}