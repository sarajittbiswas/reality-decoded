import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// GET: Fetch global likes, shares, views, and comments for a specific ID
export async function GET(request: Request) {
  const url = new URL(request.url);
  const contentId = url.searchParams.get('id');

  if (!contentId) return new Response('Missing ID', { status: 400 });

  const db = (getRequestContext().env as any).reality_decoded_db;

  try {
    // 🚨 UPGRADE: Fetch Views along with Likes/Shares
    const metricResult = await db.prepare('SELECT likes, shares, views FROM metrics WHERE content_id = ?').bind(contentId).first();
    
    // Fetch Comments
    const { results: comments } = await db.prepare('SELECT name, comment_text as text, created_at as date FROM comments WHERE content_id = ? ORDER BY created_at DESC').bind(contentId).all();

    return new Response(JSON.stringify({
      likes: metricResult?.likes || 0,
      shares: metricResult?.shares || 0,
      views: metricResult?.views || 0,
      comments: comments || []
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database read failed' }), { status: 500 });
  }
}

// POST: Handle new Views, Likes, Shares, and Comments
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { action, id, payload } = data;
    const db = (getRequestContext().env as any).reality_decoded_db;

    // 🚨 NEW: Handle View Counts
    if (action === 'VIEW') {
      await db.prepare(`
        INSERT INTO metrics (content_id, likes, shares, views) VALUES (?, 0, 0, 1)
        ON CONFLICT(content_id) DO UPDATE SET views = views + 1
      `).bind(id).run();
    }
    else if (action === 'LIKE' || action === 'UNLIKE') {
      const increment = action === 'LIKE' ? 1 : -1;
      await db.prepare(`
        INSERT INTO metrics (content_id, likes, shares, views) VALUES (?, ?, 0, 0)
        ON CONFLICT(content_id) DO UPDATE SET likes = MAX(0, likes + ?)
      `).bind(id, increment > 0 ? 1 : 0, increment).run();
    } 
    else if (action === 'SHARE') {
      await db.prepare(`
        INSERT INTO metrics (content_id, likes, shares, views) VALUES (?, 0, 1, 0)
        ON CONFLICT(content_id) DO UPDATE SET shares = shares + 1
      `).bind(id).run();
    } 
    else if (action === 'COMMENT') {
      await db.prepare(
        'INSERT INTO comments (content_id, name, comment_text) VALUES (?, ?, ?)'
      ).bind(id, payload.name, payload.text).run();
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database write failed' }), { status: 500 });
  }
}