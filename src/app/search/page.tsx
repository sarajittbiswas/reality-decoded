import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// 1. THE STATIC INDEX: This allows users to search for non-database pages!
const STATIC_PAGES = [
  { id: 'about', title: 'About Us', description: 'Learn about our mission to uncover the truth and unedited reality.', type: 'page', url: '/about' },
  { id: 'terms', title: 'Terms of Service', description: 'Legal terms, conditions, and user agreements for Reality Decoded.', type: 'page', url: '/terms' },
  { id: 'privacy', title: 'Privacy Policy', description: 'How we handle your data, security, and privacy.', type: 'page', url: '/privacy' },
  { id: 'share', title: 'Share Your Story', description: 'Submit your authentic stories and tips to our investigators.', type: 'page', url: '/share' },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';
  let combinedResults: any[] = [];

  if (query.trim()) {
    // 2. KEYWORD SPLITTING: Break "fast fashion" into ["fast", "fashion"]
    let searchWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 1);
    if (searchWords.length === 0) searchWords = [query.toLowerCase()]; // Fallback for 1-letter searches

    const db = (getRequestContext().env as any).reality_decoded_db;

    // 3. BUILD DYNAMIC SQL: Create a search condition for EACH word
    const sqlConditions = searchWords.map(() => '(title LIKE ? OR description LIKE ?)').join(' OR ');
    // Every word needs two bindings (one for title, one for description)
    const sqlBindings = searchWords.flatMap(kw => [`%${kw}%`, `%${kw}%`]);

    // --- SEARCH SOURCE A: VIDEOS ---
    try {
      const videoStmt = await db
        .prepare(`SELECT id, title, description, 'video' as type, '/watch/' || id as url FROM videos WHERE ${sqlConditions}`)
        .bind(...sqlBindings)
        .all();
      combinedResults = [...combinedResults, ...videoStmt.results];
    } catch (e) {
      console.error("Video search failed", e);
    }

    // --- SEARCH SOURCE B: BLOGS (Ready for when you build it!) ---
    /* try {
      // Notice it searches 'content' instead of description
      const blogConditions = searchWords.map(() => '(title LIKE ? OR content LIKE ?)').join(' OR ');
      const blogStmt = await db
        .prepare(`SELECT id, title, content as description, 'blog' as type, '/blogs/' || id as url FROM blogs WHERE ${blogConditions}`)
        .bind(...sqlBindings)
        .all();
      combinedResults = [...combinedResults, ...blogStmt.results];
    } catch (e) {} 
    */

    // --- SEARCH SOURCE C: STATIC PAGES ---
    const matchingPages = STATIC_PAGES.filter(page => {
      return searchWords.some(kw => 
        page.title.toLowerCase().includes(kw) || 
        page.description.toLowerCase().includes(kw)
      );
    });
    
    combinedResults = [...combinedResults, ...matchingPages];
  }

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Search Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Global Search
          </h1>
          {query ? (
            <p className="text-xl text-gray-400">
              Found {combinedResults.length} results for <span className="text-red-500 font-bold">"{query}"</span>
            </p>
          ) : (
            <p className="text-xl text-gray-400">Enter keywords to search videos, blogs, and pages.</p>
          )}
        </div>

        {/* Results List */}
        {combinedResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {combinedResults.map((result: any, index: number) => (
              <Link href={result.url} key={`${result.id}-${index}`} className="block group">
                <article className="p-6 rounded-xl bg-[#141414] border border-white/5 transition-all duration-300 group-hover:bg-[#1a1a1a] group-hover:border-red-500/30 flex items-start gap-4">
                  
                  {/* Dynamic Icon based on content type */}
                  <div className="mt-1 shrink-0">
                    {result.type === 'video' && (
                      <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    )}
                    {result.type === 'page' && (
                      <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                    )}
                    {result.type === 'blog' && (
                      <div className="w-10 h-10 rounded-full bg-green-600/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"></path></svg>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{result.type}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:text-red-500 transition-colors">{result.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{result.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          query && (
            <div className="text-center py-20 bg-[#141414] rounded-2xl border border-white/5">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
              <p className="text-gray-400">We couldn't find anything matching "{query}".</p>
            </div>
          )
        )}
      </div>
    </main>
  );
}