import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import PurgeButton from '@/components/PurgeButton';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge'; 

async function approveIntelToEditor(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const intel = await db.prepare("SELECT * FROM intel_submissions WHERE id = ?").bind(id).first();
  if (intel) {
    const newId = crypto.randomUUID();
    
    // 1. Use the real subject, fallback to a name
    const finalTitle = intel.subject || `Intel from ${intel.name || 'Anonymous'}`;
    
    // 2. Generate a clean slug from the REAL title
    const slug = finalTitle.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    // 3. Insert using the real data
    await db.prepare(
      "INSERT INTO articles (id, title, slug, category, tags, content, author, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      newId, 
      finalTitle, 
      slug, 
      'INTEL', 
      '', 
      `<p>${intel.story}</p>`, 
      intel.name || 'Anonymous', 
      'draft'
    ).run();
    
    await db.prepare("UPDATE intel_submissions SET status = 'processed' WHERE id = ?").bind(id).run();
  }
  
  revalidatePath('/hq');
}

// 🚨 NEW SERVER ACTION: Publish a draft live to the /blogs page!
async function publishArticleLive(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  await db.prepare(
    "UPDATE articles SET status = 'published', updated_at = CURRENT_TIMESTAMP WHERE id = ?"
  ).bind(id).run();
  
  revalidatePath('/hq');
}

// Server Action: Delete spam intel
async function purgeIntel(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  await db.prepare("DELETE FROM intel_submissions WHERE id = ?").bind(id).run();
  revalidatePath('/hq');
}

export default async function CommandCenterHQ() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const { results: allArticles } = await db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all();
  
  // 🚨 BUG FIX: Include both 'draft' AND 'pending' so articles from the editor don't fall into the black hole!
  const drafts = allArticles.filter((a: any) => a.status === 'draft' || a.status === 'pending');
  const liveArticles = allArticles.filter((a: any) => a.status === 'published');

  const { results: pendingIntel } = await db.prepare("SELECT * FROM intel_submissions WHERE status = 'pending' ORDER BY submitted_at DESC").all();

  return (
    <main className="w-full bg-[#050505] text-white min-h-screen relative pt-24 pb-32 font-mono">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2 text-red-500 text-xs tracking-widest uppercase font-bold">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Restricted Access
            </div>
            <h1 className={`${spaceGrotesk.className} text-4xl font-bold tracking-tight text-white`}>
              Command Center
            </h1>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <p className="text-gray-500 text-xs uppercase tracking-widest">System Status: <span className="text-green-400 font-bold">Online</span></p>
            <Link href="/hq/write" className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-4 py-2 rounded transition-colors font-bold shadow-[0_0_10px_purple]">
              + New Transmission
            </Link>
          </div>
        </div>

        {/* SERVER DRAFTS SECTION (Now with Publish Buttons) */}
        <section className="mb-12">
          <h2 className={`${spaceGrotesk.className} text-xl font-bold mb-4 flex items-center gap-3 text-purple-400`}>
            Server Drafts
            <span className="bg-purple-500/20 border border-purple-500/50 text-purple-300 text-xs px-2 py-0.5 rounded-full">{drafts.length}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {drafts.length === 0 && <p className="text-gray-600 text-sm">No drafts in memory.</p>}
            {drafts.map((draft: any) => (
              <div key={draft.id} className="bg-[#0a0a0a] border border-white/10 p-4 rounded-xl flex flex-col justify-between group hover:border-purple-500/50 transition-colors">
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-200 truncate">{draft.title}</h3>
                  <p className="text-[10px] text-gray-500 uppercase mt-1">{new Date(draft.created_at).toLocaleDateString()}</p>
                </div>
                
                {/* 🚨 NEW: Action Buttons Row */}
                <div className="flex items-center gap-2">
                  <Link 
                    href={`/hq/write?id=${draft.id}`} 
                    className="flex-1 text-center text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-500/30 transition-colors"
                  >
                    Edit
                  </Link>
                  <form action={publishArticleLive} className="flex-1">
                    <input type="hidden" name="id" value={draft.id} />
                    <button type="submit" className="w-full text-[10px] font-bold tracking-widest uppercase text-green-400 bg-green-500/10 hover:bg-green-500/20 px-3 py-2 rounded-lg border border-green-500/30 transition-colors">
                      Publish
                    </button>
                  </form>
                  <PurgeButton id={draft.id} />
                </div>

              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* COLUMN 1: PENDING INTEL */}
          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-6 flex items-center gap-3 text-white`}>
              Pending Intel Queue
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{pendingIntel.length}</span>
            </h2>
            
            <div className="flex flex-col gap-4">
              {pendingIntel.length === 0 ? (
                <div className="border border-dashed border-white/10 p-8 rounded-xl text-center text-gray-500">
                  No new transmissions awaiting review.
                </div>
              ) : (
                pendingIntel.map((intel: any) => (
                  <div key={intel.id} className="bg-[#111] border border-blue-500/30 p-5 rounded-xl hover:bg-[#161616] transition-colors group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_blue]"></div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-blue-400 font-bold uppercase">Public Submission</span>
                      <span className="text-[10px] text-gray-500">{new Date(intel.submitted_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className={`${spaceGrotesk.className} text-lg font-bold text-gray-200 mb-1 group-hover:text-white`}>
                      Source: {intel.name || 'Anonymous'}
                    </h3>
                    <p className="text-xs text-gray-400 mb-4 font-mono">{intel.contact}</p>
                    
                    <div className="bg-black border border-white/5 p-4 rounded-lg mb-6 max-h-64 overflow-y-auto mt-2 whitespace-pre-wrap text-sm text-gray-300 font-sans">
                      {intel.story}
                    </div>

                    <div className="flex items-center gap-3">
                      <form action={approveIntelToEditor}>
                        <input type="hidden" name="id" value={intel.id} />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                          Convert to Draft & Edit
                        </button>
                      </form>
                      <form action={purgeIntel}>
                        <input type="hidden" name="id" value={intel.id} />
                        <button type="submit" className="bg-transparent border border-white/10 hover:border-red-500/50 hover:text-red-400 text-gray-400 text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                          Purge File
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* COLUMN 2: PUBLISHED ARCHIVES */}
          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-6 flex items-center gap-3 text-gray-400`}>
              Live Archives
              <span className="bg-white/10 text-gray-400 text-xs px-2 py-0.5 rounded-full">{liveArticles.length}</span>
            </h2>
            
            <div className="flex flex-col gap-3">
              {liveArticles.length === 0 ? (
                <div className="border border-dashed border-white/5 p-8 rounded-xl text-center text-gray-600">
                  No articles currently published.
                </div>
              ) : (
                liveArticles.map((article: any) => (
                  <div key={article.id} className="bg-transparent border border-white/5 p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div>
                      <h3 className="text-sm font-bold text-gray-300 mb-1">{article.title}</h3>
                      <p className="text-[10px] text-gray-600 uppercase tracking-widest">/{article.slug}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Link href={`/hq/write?id=${article.id}`} className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 px-2 py-1 rounded bg-[#111]">
                        Edit Log
                      </Link>
                      <PurgeButton id={article.id} />
                      <Link href={`/blogs/${article.slug}`} target="_blank" className="text-purple-400 hover:text-purple-300 text-xs font-bold">
                        View Live &rarr;
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}