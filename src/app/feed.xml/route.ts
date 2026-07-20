import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; // 🚀 Forces real-time generation

export async function GET() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const siteUrl = 'https://realitydecoded.in';

  // 1. Fetch data
  const { results: articles } = await db.prepare(
    "SELECT title, slug, excerpt, created_at, author FROM articles WHERE status = 'published' ORDER BY created_at DESC LIMIT 20"
  ).all();

  const { results: videos } = await db.prepare(
    "SELECT id, title, description, created_at FROM videos ORDER BY created_at DESC LIMIT 20"
  ).all();

  // 2. Normalize
  const articleItems = articles.map((a: any) => ({
    title: a.title,
    url: `${siteUrl}/blogs/${a.slug}`,
    description: a.excerpt || 'Transmission from Reality Decoded.',
    timestamp: new Date(a.created_at).getTime(),
    pubDate: new Date(a.created_at).toUTCString()
  }));

  const videoItems = videos.map((v: any) => ({
    title: `[VIDEO] ${v.title}`,
    url: `${siteUrl}/watch/${v.id}`,
    description: v.description || 'Intercepted video intelligence.',
    timestamp: new Date(v.created_at).getTime(),
    pubDate: new Date(v.created_at).toUTCString()
  }));

  // 3. Combine
  const combinedFeed = [...articleItems, ...videoItems]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 30);

  // 4. Map XML
  const rssItems = combinedFeed.map((item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid>${item.url}</guid>
    </item>
  `).join('');

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Reality Decoded | Transmissions</title>
      <link>${siteUrl}</link>
      <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
      <description>Declassified field reports and intercepted video intelligence.</description>
      <language>en-us</language>
      ${rssItems}
    </channel>
  </rss>`;

  // 5. FIXED HEADERS: No-cache ensures LinkedIn always gets the freshest data
  return new Response(feed, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
}