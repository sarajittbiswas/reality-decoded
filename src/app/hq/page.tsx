import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import PurgeButton from '@/components/PurgeButton';
import LogoutButton from '@/components/LogoutButton';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge'; 

// --- SERVER ACTIONS ---

async function approveIntelToEditor(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const intel = await db.prepare("SELECT * FROM intel_submissions WHERE id = ?").bind(id).first();
  if (intel) {
    const newId = crypto.randomUUID();
    const finalTitle = intel.subject || `Intel from ${intel.name || 'Anonymous'}`;
    const slug = finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    await db.prepare(
      "INSERT INTO articles (id, title, slug, category, tags, content, author, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      newId, finalTitle, slug, 'INTEL', '', `<p>${intel.story}</p>`, intel.name || 'Anonymous', 'draft'
    ).run();
    
    await db.prepare("UPDATE intel_submissions SET status = 'processed' WHERE id = ?").bind(id).run();
  }
  revalidatePath('/hq');
}

async function publishArticleLive(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  await db.prepare("UPDATE articles SET status = 'published', updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(id).run();
  revalidatePath('/hq');
}

async function scheduleArticle(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const rawDate = formData.get('scheduled_for') as string;
  
  // FIX: Convert HTML datetime-local (2026-07-20T14:30) to SQLite standard (2026-07-20 14:30:00)
  const formattedDate = rawDate.replace('T', ' ') + ':00';
  
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  await db.prepare("UPDATE articles SET status = 'scheduled', scheduled_for = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(formattedDate, id).run();
  revalidatePath('/hq');
}

async function purgeIntel(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  await db.prepare("DELETE FROM intel_submissions WHERE id = ?").bind(id).run();
  revalidatePath('/hq');
}

async function deleteCommentAction(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  const { getRequestContext } = await import('@cloudflare/next-on-pages');
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  await db.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();
  revalidatePath('/hq');
}

// --- MAIN DASHBOARD COMPONENT ---

// UPGRADE: Next.js 15 requires searchParams to be a Promise!
export default async function CommandCenterHQ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // Await the promise to resolve the Next.js 15 terminal error
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams?.tab || 'overview';
  
  // IDENTITY PROTOCOL
  const cookieStore = await cookies();
  const operatorId = cookieStore.get('hq_operator_id')?.value;
  let agentProfile = null;
  if (operatorId) {
    agentProfile = await db.prepare('SELECT name, avatar FROM syndicate_agents WHERE id = ?').bind(operatorId).first();
  }
  const firstName = agentProfile?.name ? agentProfile.name.split(' ')[0] : (operatorId || 'Agent');
  const avatarUrl = agentProfile?.avatar || null;

  // DATA AGGREGATION
  const { results: allArticles } = await db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all();
  const { results: pendingIntel } = await db.prepare("SELECT * FROM intel_submissions WHERE status = 'pending' ORDER BY submitted_at DESC").all();
  const { results: metrics } = await db.prepare("SELECT * FROM metrics").all();
  const { results: comments } = await db.prepare("SELECT * FROM comments ORDER BY created_at DESC").all();
  const { results: subscribers } = await db.prepare("SELECT * FROM subscribers").all();

  // UPGRADE: Dynamic Time-Based Logic
  // If a scheduled article's time has passed, treat it as LIVE automatically!
  const now = new Date();
  
  const drafts = allArticles.filter((a: any) => a.status === 'draft' || a.status === 'pending');
  const liveArticles = allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && new Date(a.scheduled_for) <= now)
  );
  const scheduled = allArticles.filter((a: any) => 
    a.status === 'scheduled' && new Date(a.scheduled_for) > now
  );

  // FIX: Robust Metrics Matching Engine
  const getArticleStats = (slug: string) => {
    const stat = metrics.find((m: any) => 
      m.content_id === slug || 
      m.content_id === `blog-${slug}`
    );
    const articleComments = comments.filter((c: any) => 
      c.content_id === slug || 
      c.content_id === `blog-${slug}`
    );
    
    return {
      views: Number(stat?.views || 0),
      likes: Number(stat?.likes || 0),
      shares: Number(stat?.shares || 0),
      comments: articleComments.length
    };
  };

  let totalViews = 0;
  let totalInteractions = 0;
  const totalSubscribers = subscribers.length;

  const chartedArticles = liveArticles.map((a: any) => {
    const stats = getArticleStats(a.slug);
    totalViews += stats.views;
    totalInteractions += (stats.likes + stats.shares + stats.comments);
    return { ...a, stats };
  }).sort((a, b) => b.stats.views - a.stats.views);

  const maxViews = chartedArticles.length > 0 ? Math.max(...chartedArticles.map(a => a.stats.views)) || 1 : 1;

  return (
    // UPGRADE: HR Dash Style Flex Layout (Sidebar on Desktop, Top Bar on Mobile)
    <div className="min-h-screen bg-[#0f111a] text-gray-200 flex flex-col md:flex-row pt-20 relative w-full overflow-hidden font-mono"> 
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* --- RESPONSIVE SIDEBAR --- */}
      <div className="w-full md:w-64 bg-[#161925] border-b md:border-b-0 md:border-r border-white/5 p-4 md:p-6 flex flex-row md:flex-col gap-2 md:gap-3 md:h-[calc(100vh-80px)] overflow-x-auto md:overflow-y-auto shrink-0 z-10 scrollbar-hide">
        <h2 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-6 hidden md:block flex items-center gap-2`}>
          Command<span className="text-purple-500">HQ</span>
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-2"></span>
        </h2>
        
        <Link href="?tab=overview" className={`whitespace-nowrap text-sm md:text-base text-left px-4 py-2 md:p-3 rounded-lg font-bold tracking-widest uppercase transition-all ${activeTab === 'overview' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>Overview</Link>
        <Link href="?tab=content" className={`whitespace-nowrap text-sm md:text-base text-left px-4 py-2 md:p-3 rounded-lg font-bold tracking-widest uppercase transition-all ${activeTab === 'content' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>Content Hub</Link>
        
        <Link href="?tab=intel" className={`whitespace-nowrap text-sm md:text-base flex items-center justify-between px-4 py-2 md:p-3 rounded-lg font-bold tracking-widest uppercase transition-all ${activeTab === 'intel' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>
          Intel Queue {pendingIntel.length > 0 && <span className="bg-white text-blue-600 px-2 py-0.5 rounded-md text-[10px]">{pendingIntel.length}</span>}
        </Link>
        
        <Link href="?tab=comments" className={`whitespace-nowrap text-sm md:text-base flex items-center justify-between px-4 py-2 md:p-3 rounded-lg font-bold tracking-widest uppercase transition-all ${activeTab === 'comments' ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>
          Comm-Links {comments.length > 0 && <span className="bg-white text-green-600 px-2 py-0.5 rounded-md text-[10px]">{comments.length}</span>}
        </Link>

        <div className="md:mt-auto pt-2 md:pt-6 md:border-t border-white/5 w-full">
          <div className="flex items-center gap-3 bg-black/50 border border-white/5 p-3 rounded-xl mb-4 hidden md:flex">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full border border-purple-500/50 object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 text-xs font-bold">{firstName.charAt(0).toUpperCase()}</div>
            )}
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Operator</p>
              <p className="text-xs text-white font-bold uppercase">{firstName}</p>
            </div>
          </div>
          <LogoutButton/>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 p-4 md:p-10 h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] overflow-y-auto w-full relative z-10">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white uppercase tracking-wider`}>
            {activeTab === 'overview' && 'Network Overview'}
            {activeTab === 'content' && 'Content Pipeline'}
            {activeTab === 'intel' && 'Intel Queue'}
            {activeTab === 'comments' && 'Public Comm-Links'}
          </h1>
          {activeTab !== 'overview' && (
            <Link href="/hq/write" className="bg-purple-600 hover:bg-purple-500 text-white text-[10px] md:text-xs px-4 py-2 md:py-3 rounded-lg md:rounded-xl transition-all font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] uppercase tracking-widest whitespace-nowrap">
              + New Deploy
            </Link>
          )}
        </div>

        {/* --- TAB 1: OVERVIEW & ANALYTICS (HR DASH STYLE) --- */}
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#161925] border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-purple-500/50 transition-all">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 relative z-10 group-hover:text-purple-300 transition-colors">Total Network Views</span>
                <span className="text-4xl font-bold text-white relative z-10">{totalViews.toLocaleString()}</span>
              </div>
              <div className="bg-[#161925] border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 relative z-10 group-hover:text-blue-300 transition-colors">Total Engagements</span>
                <span className="text-4xl font-bold text-blue-400 relative z-10">{totalInteractions.toLocaleString()}</span>
              </div>
              <div className="bg-[#161925] border border-white/5 p-6 rounded-2xl flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-green-500/50 transition-all">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4 relative z-10 group-hover:text-green-300 transition-colors">Active Subscribers</span>
                <span className="text-4xl font-bold text-green-400 relative z-10">{totalSubscribers.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Visual Graph: Traffic Velocity */}
              <div className="col-span-1 lg:col-span-2 bg-[#161925] border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  Traffic Velocity
                </h3>
                
                <div className="flex flex-col gap-8">
                  {chartedArticles.length === 0 && <p className="text-gray-600 text-sm">No traffic data established.</p>}
                  {chartedArticles.slice(0, 4).map((article: any) => {
                    const widthPct = Math.max((article.stats.views / maxViews) * 100, 2); 
                    return (
                      <div key={article.id} className="w-full group">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-xs md:text-sm font-bold text-gray-300 truncate pr-4 group-hover:text-white transition-colors">{article.title}</span>
                          <span className="text-[10px] md:text-xs font-mono text-purple-400 font-bold">{article.stats.views.toLocaleString()} Views</span>
                        </div>
                        <div className="w-full bg-black h-2.5 rounded-full overflow-hidden border border-white/5">
                          <div className="h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${widthPct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              <div className="col-span-1 bg-[#161925] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                <div className="p-6 border-b border-white/5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    Engagement Metrics
                  </h3>
                </div>
                <div className="overflow-y-auto flex-1 p-4 space-y-4">
                  {chartedArticles.length === 0 && <p className="text-gray-600 text-xs text-center mt-10">Awaiting data.</p>}
                  {chartedArticles.map((article: any) => (
                    <div key={article.id} className="bg-black/50 p-4 rounded-xl border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 truncate">/{article.slug}</div>
                      <div className="grid grid-cols-3 gap-2 text-center divide-x divide-white/10">
                        <div>
                          <div className="text-lg font-bold text-purple-400">{article.stats.likes}</div>
                          <div className="text-[8px] text-gray-600 uppercase font-bold tracking-widest mt-1">Likes</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-blue-400">{article.stats.shares}</div>
                          <div className="text-[8px] text-gray-600 uppercase font-bold tracking-widest mt-1">Shares</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-400">{article.stats.comments}</div>
                          <div className="text-[8px] text-gray-600 uppercase font-bold tracking-widest mt-1">Cmnts</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: CONTENT HUB (CMS & SCHEDULING) --- */}
        {activeTab === 'content' && (
          <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
            
            {/* SERVER DRAFTS & SCHEDULING */}
            <section>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3 text-white uppercase tracking-widest border-b border-white/10 pb-4">
                Server Drafts <span className="bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded-full">{drafts.length}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drafts.length === 0 && <p className="text-gray-600 text-sm p-6 border border-dashed border-white/10 rounded-2xl">No drafts in memory.</p>}
                {drafts.map((draft: any) => (
                  <div key={draft.id} className="bg-[#161925] border border-white/5 p-6 rounded-2xl flex flex-col justify-between group hover:border-purple-500/30 transition-all shadow-xl">
                    <div className="mb-6">
                      <h3 className="text-base font-bold text-gray-200 line-clamp-2 leading-tight group-hover:text-white transition-colors">{draft.title}</h3>
                      <p className="text-[10px] text-gray-500 uppercase mt-3 tracking-widest font-bold">Created: {new Date(draft.created_at).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-2 w-full">
                        <Link href={`/hq/write?id=${draft.id}`} className="flex-1 text-center text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-3 rounded-xl border border-purple-500/30 transition-colors">Edit File</Link>
                        <form action={publishArticleLive} className="flex-1">
                          <input type="hidden" name="id" value={draft.id} />
                          <button type="submit" className="w-full text-[10px] font-bold tracking-widest uppercase text-green-400 bg-green-500/10 hover:bg-green-500/20 px-3 py-3 rounded-xl border border-green-500/30 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.1)]">Force Live</button>
                        </form>
                      </div>
                      
                      <form action={scheduleArticle} className="flex gap-2 w-full bg-black/50 p-2 rounded-xl border border-white/5">
                        <input type="hidden" name="id" value={draft.id} />
                        <input type="datetime-local" name="scheduled_for" required className="flex-1 bg-transparent px-2 text-[10px] text-gray-300 outline-none uppercase font-bold tracking-widest [color-scheme:dark]" />
                        <button type="submit" className="text-[10px] font-bold tracking-widest uppercase text-yellow-400 hover:text-yellow-300 px-3 py-2 rounded-lg transition-colors shrink-0 border border-yellow-500/30 bg-yellow-500/10 hover:bg-yellow-500/20">Schedule</button>
                      </form>
                      
                      <div className="mt-1"><PurgeButton id={draft.id} /></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SCHEDULED DEPLOYMENTS */}
            {scheduled.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-3 text-white uppercase tracking-widest border-b border-white/10 pb-4">
                  Scheduled Deployments <span className="bg-yellow-600 text-white text-[10px] px-2 py-0.5 rounded-full">{scheduled.length}</span>
                </h2>
                <div className="flex flex-col gap-4">
                  {scheduled.map((article: any) => (
                    <div key={article.id} className="bg-[#161925] border border-yellow-500/20 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden shadow-xl">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 shadow-[0_0_15px_yellow]"></div>
                      <div className="pl-4">
                        <h3 className="text-sm font-bold text-gray-200">{article.title}</h3>
                        <p className="text-[10px] text-yellow-500 uppercase tracking-widest mt-2 font-bold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                          Deploying: {new Date(article.scheduled_for).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <form action={publishArticleLive}>
                          <input type="hidden" name="id" value={article.id} />
                          <button type="submit" className="text-[10px] text-green-400 hover:bg-green-500/10 border border-transparent hover:border-green-500/30 px-3 py-2 rounded-lg font-bold uppercase tracking-widest transition-colors">Launch Now</button>
                        </form>
                        <Link href={`/hq/write?id=${article.id}`} className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 px-4 py-2 rounded-lg bg-black hover:bg-white/5 transition-colors">Edit</Link>
                        <PurgeButton id={article.id} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* LIVE ARCHIVES */}
            <section>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3 text-white uppercase tracking-widest border-b border-white/10 pb-4">
                Live Archives <span className="bg-gray-600 text-white text-[10px] px-2 py-0.5 rounded-full">{liveArticles.length}</span>
              </h2>
              <div className="bg-[#161925] border border-white/5 rounded-2xl overflow-x-auto shadow-2xl">
                <table className="w-full text-left whitespace-nowrap min-w-[800px]">
                  <thead className="bg-[#11131c] text-gray-400 text-[10px] uppercase tracking-widest">
                    <tr>
                      <th className="p-5 font-semibold">Transmission Identity</th>
                      <th className="p-5 font-semibold">Author</th>
                      <th className="p-5 font-semibold">Deployed</th>
                      <th className="p-5 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {liveArticles.length === 0 && <tr><td colSpan={4} className="p-10 text-center text-gray-600 text-xs">No articles currently published.</td></tr>}
                    {liveArticles.map((article: any) => (
                      <tr key={article.id} className="hover:bg-[#1a1e2d] transition-colors group">
                        <td className="p-5">
                          <div className="text-sm font-bold text-gray-300 mb-1 truncate max-w-[300px] group-hover:text-white transition-colors">{article.title}</div>
                          <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">/{article.slug}</div>
                        </td>
                        <td className="p-5 text-xs text-gray-400">{article.author}</td>
                        <td className="p-5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">{new Date(article.updated_at).toLocaleDateString()}</td>
                        <td className="p-5 flex items-center justify-end gap-3">
                          <Link href={`/hq/write?id=${article.id}`} className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 px-3 py-1.5 rounded-lg bg-black hover:bg-white/10 transition-colors">Edit</Link>
                          <PurgeButton id={article.id} />
                          <Link href={`/blogs/${article.slug}`} target="_blank" className="text-purple-400 hover:text-purple-300 text-[10px] font-bold uppercase tracking-widest ml-2 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-lg">View Live ↗</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* --- TAB 3: COMMENTS MANAGEMENT --- */}
        {activeTab === 'comments' && (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="bg-[#161925] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
              {comments.length === 0 ? (
                <div className="p-16 text-center text-gray-600 font-bold uppercase tracking-widest text-xs border border-dashed border-white/5 m-4 rounded-xl">No public comm-links logged.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-[#11131c] text-gray-400 text-[10px] uppercase tracking-widest">
                      <tr>
                        <th className="p-5 font-semibold">User Identity</th>
                        <th className="p-5 font-semibold">Comment Payload</th>
                        <th className="p-5 font-semibold">Target Node</th>
                        <th className="p-5 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {comments.map((c: any) => (
                        <tr key={c.id} className="hover:bg-[#1a1e2d] transition-colors group">
                          <td className="p-5">
                            <div className="text-xs font-bold text-gray-300 group-hover:text-white">{c.name || 'Anonymous'}</div>
                            <div className="text-[10px] text-gray-600 mt-1 uppercase font-bold tracking-widest">{new Date(c.created_at).toLocaleString()}</div>
                          </td>
                          <td className="p-5 text-xs text-gray-400 whitespace-pre-wrap max-w-xs">{c.comment_text}</td>
                          <td className="p-5 text-[10px] text-purple-400 font-bold tracking-widest uppercase max-w-[150px] truncate">
                            /{c.content_id?.replace('blog-', '') || 'Unknown'}
                          </td>
                          <td className="p-5 text-right">
                            <form action={deleteCommentAction}>
                              <input type="hidden" name="id" value={c.id} />
                              <button type="submit" className="text-[10px] font-bold tracking-widest uppercase text-red-500/50 group-hover:text-red-400 hover:underline transition-colors bg-red-500/5 px-3 py-1.5 rounded-lg border border-transparent group-hover:border-red-500/20">
                                Purge Log
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 4: INTEL QUEUE --- */}
        {activeTab === 'intel' && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col gap-6">
              {pendingIntel.length === 0 ? (
                <div className="bg-[#161925] border border-dashed border-white/5 p-16 rounded-2xl text-center text-gray-500 flex flex-col items-center justify-center font-bold uppercase tracking-widest text-xs shadow-2xl">
                  <svg className="w-8 h-8 mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                  No new transmissions awaiting review.
                </div>
              ) : (
                pendingIntel.map((intel: any) => (
                  <div key={intel.id} className="bg-[#161925] border border-blue-500/20 p-6 md:p-8 rounded-2xl hover:border-blue-500/40 transition-all group relative overflow-hidden shadow-2xl">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 shadow-[0_0_15px_blue]"></div>
                    <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-4">
                      <div>
                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_blue]"></span>
                          Public Drop Detected
                        </span>
                        <h3 className={`${spaceGrotesk.className} text-xl md:text-2xl font-bold text-white mb-1`}>Source: {intel.name || 'Anonymous'}</h3>
                        <p className="text-[10px] md:text-xs text-blue-400/60 font-mono tracking-wide">{intel.contact}</p>
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest border border-white/5 px-3 py-1.5 rounded-lg bg-black">
                        {new Date(intel.submitted_at).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="bg-black/50 border border-white/5 p-6 rounded-xl mb-8 max-h-80 overflow-y-auto whitespace-pre-wrap text-xs md:text-sm text-gray-300 font-mono leading-relaxed shadow-inner">
                      {intel.story}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-6">
                      <form action={approveIntelToEditor}>
                        <input type="hidden" name="id" value={intel.id} />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] tracking-widest uppercase font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)]">Convert to Draft</button>
                      </form>
                      <form action={purgeIntel}>
                        <input type="hidden" name="id" value={intel.id} />
                        <button type="submit" className="bg-transparent border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 text-gray-400 text-[10px] tracking-widest uppercase font-bold px-6 py-3 rounded-xl transition-colors">Purge Data</button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}