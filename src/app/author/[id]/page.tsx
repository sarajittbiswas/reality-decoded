import { getRequestContext } from '@cloudflare/next-on-pages';
import Link from 'next/link';
import { Metadata } from 'next';
import { D1Database } from '@cloudflare/workers-types';
import ExpandableBio from '@/components/ExpandableBio';

export const runtime = 'edge';

// ==========================================
// UTILITIES
// ==========================================
const getFirstImage = (html: string) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const getISTDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  return new Date(dateStr.replace(' ', 'T') + '+05:30');
};

const getLocalTime = (timezone: string) => {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toLowerCase() + ' (local time)';
  } catch (e) {
    return null;
  }
};

// ==========================================
// DATA FETCHERS
// ==========================================
async function getAgent(decodedIdentifier: string, db: D1Database) {
  return await db.prepare(
    `SELECT * FROM syndicate_agents WHERE id = ? OR name = ?`
  ).bind(decodedIdentifier, decodedIdentifier).first();
}

async function getLiveArticles(decodedIdentifier: string, db: D1Database) {
  const { results: allArticles } = await db.prepare(
    `SELECT * FROM articles 
     WHERE status IN ('published', 'scheduled') 
     AND (agent_id = ? OR author = ?)
     ORDER BY created_at DESC`
  ).bind(decodedIdentifier, decodedIdentifier).all();

  const now = new Date();
  return allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  );
}

// ==========================================
// METADATA GENERATOR (Title & SEO)
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const decodedIdentifier = decodeURIComponent(id);
  const db = (getRequestContext().env as any).reality_decoded_db;
  const agent = await getAgent(decodedIdentifier, db);
  const authorName = agent?.name || decodedIdentifier;

  return {
    title: `${authorName} | Reality Decoded Operative`,
  };
}

// ==========================================
// MAIN AUTHOR COMPONENT
// ==========================================
export default async function AuthorProfilePage(props: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
   
  const activeTab = (searchParams?.tab as string)?.toLowerCase() || 'all';
  const decodedIdentifier = decodeURIComponent(id);
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const agent = await getAgent(decodedIdentifier, db);
  const liveArticles = await getLiveArticles(decodedIdentifier, db);

  const authorName = agent?.name || decodedIdentifier;
  const authorAvatar = agent?.avatar || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=100&auto=format&fit=crop';
  const localTime = agent?.timezone ? getLocalTime(agent.timezone as string) : null;

  const rawCategories = liveArticles.map((a: any) => {
    return (a.category && a.category.trim() !== '') ? a.category : 'Uncategorised';
  });
  
  const categoryMap = new Map();
  rawCategories.forEach((cat: string) => {
    const lower = cat.toLowerCase();
    if (!categoryMap.has(lower)) {
      categoryMap.set(lower, cat); 
    }
  });
  const uniqueCategories = Array.from(categoryMap.values()) as string[];

  const displayedArticles = liveArticles.filter((a: any) => {
    if (activeTab === 'all') return true;
    const articleCategory = ((a.category && a.category.trim() !== '') ? a.category : 'Uncategorised').toLowerCase();
    return articleCategory === activeTab;
  });

  return (
    <main className="w-full bg-[#000000] text-white min-h-screen pt-32 pb-32 overflow-x-hidden">
      
      {/* 🚨 FIX 1: Removed CSS Grid. Replaced with Flexbox (flex-row on desktop, flex-col on mobile). */}
      <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
        
        {/* 🚨 FIX 2: Fixed 300px width on desktop. h-max ensures it doesn't stretch and sticky works cleanly. */}
        <aside className="flex flex-col lg:w-[300px] shrink-0 h-max lg:sticky top-32 w-full">
          <Link href="/author" className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-2 mb-8 font-mono">
             &lt; All Humans
          </Link>

          <img 
            src={authorAvatar as string} 
            alt={authorName as string} 
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mb-6 hover:grayscale transition-all duration-500 border border-white/10 shadow-lg" 
          />
          
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">{authorName}</h1>
          <p className="text-gray-400 text-sm mb-4">{agent?.role || 'Syndicate Operative'}</p>

          <div className="space-y-3 text-xs sm:text-sm text-gray-400 font-mono w-full mt-2">
            {agent?.location && (
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {agent.location}
              </div>
            )}
            {localTime && (
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {localTime}
              </div>
            )}
            {agent?.website && (
              <a href={`https://${agent.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors truncate">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                {agent.website}
              </a>
            )}
            {agent?.github && (
              <a href={`https://github.com/${agent.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                {agent.github}
              </a>
            )}
            {agent?.twitter && (
              <a href={`https://twitter.com/${agent.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.25H5.078z"/></svg>
                {agent.twitter}
              </a>
            )}
            {agent?.linkedin && (
              <a href={`https://linkedin.com/in/${agent.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                {agent.linkedin}
              </a>
            )}
            {agent?.instagram && (
              <a href={`https://instagram.com/${agent.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                {agent.instagram}
              </a>
            )}
            {agent?.reddit && (
              <a href={`https://reddit.com/user/${agent.reddit}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors truncate">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                {agent.reddit}
              </a>
            )}
          </div>

          <div className="mt-6 w-full">
            {agent?.bio && (
              <ExpandableBio bio={agent.bio as string} />
            )}
          </div>
        </aside>

        {/* 🚨 FIX 3: Flex-1 takes over the right side. min-h-[100vh] acts as a physical barrier preventing the container height from violently collapsing. */}
        <section className="flex-1 lg:border-l lg:border-white/10 lg:pl-16 lg:ml-16 w-full max-w-full min-h-[100vh]">
          
          <div className="tabs-nav flex gap-2 mb-10 border-b border-white/5 pb-4 overflow-x-auto scrollbar-hide hide-scroll-bar">
            {/* NEXT.JS LINK WITH SCROLL={FALSE} */}
            <Link 
              href={`/author/${id}?tab=all`}
              scroll={false} 
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-colors border ${activeTab === 'all' ? 'bg-white text-black border-white' : 'border-white/10 text-gray-400 hover:text-white'}`}
            >
              All Posts
            </Link>
            
            {uniqueCategories.map((category) => {
              const tabValue = category.toLowerCase();
              return (
                <Link 
                  key={tabValue}
                  href={`/author/${id}?tab=${encodeURIComponent(tabValue)}`} 
                  scroll={false}
                  className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap capitalize transition-colors border ${activeTab === tabValue ? 'bg-white text-black border-white' : 'border-white/10 text-gray-400 hover:text-white'}`}
                >
                  {category}
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-10 sm:gap-y-12">
            {displayedArticles.length === 0 ? (
              <p className="text-gray-500 font-mono text-sm col-span-2">No transmissions logged.</p>
            ) : (
              displayedArticles.map((article: any) => {
                const imgUrl = getFirstImage(article.content) || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop';
                const articleCat = ((article.category && article.category.trim() !== '') ? article.category : 'Uncategorised');
                
                return (
                  <Link 
                    href={`/blogs/${article.slug}`} 
                    key={article.id} 
                    className="group block"
                  >
                    <div className="w-full aspect-[16/10] bg-[#111] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 border border-white/5 group-hover:border-white/20 transition-all shadow-lg">
                       <img src={imgUrl} alt={article.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-200 group-hover:text-white transition-colors mb-2 leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <div className="text-gray-500 text-xs sm:text-sm font-mono flex items-center justify-between mt-3">
                      <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-purple-400 border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 rounded">
                        {articleCat}
                      </span>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </section>
        
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </main>
  );
}