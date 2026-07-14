import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const siteUrl = 'https://realitydecoded.in';

  // 1. Fetch the 20 most recent LIVE articles
  const { results: articles } = await db.prepare(
    "SELECT title, slug, excerpt, created_at, author FROM articles WHERE status = 'published' ORDER BY created_at DESC LIMIT 20"
  ).all();

  // 2. Fetch the 20 most recent VIDEOS
  const { results: videos } = await db.prepare(
    "SELECT id, title, description, created_at FROM videos ORDER BY created_at DESC LIMIT 20"
  ).all();

  // 3. Normalize Articles
  const articleItems = articles.map((a: any) => ({
    title: a.title,
    url: `${siteUrl}/blogs/${a.slug}`,
    description: a.excerpt || 'Transmission from Reality Decoded.',
    timestamp: new Date(a.created_at).getTime(),
    pubDate: new Date(a.created_at).toUTCString()
  }));

  // 4. Normalize Videos (Adding [VIDEO] tag for LinkedIn)
  const videoItems = videos.map((v: any) => ({
    title: `[VIDEO] ${v.title}`,
    url: `${siteUrl}/watch/${v.id}`,
    description: v.description || 'Intercepted video intelligence.',
    timestamp: new Date(v.created_at).getTime(),
    pubDate: new Date(v.created_at).toUTCString()
  }));

  // 5. Merge, sort by newest, keep top 30
  const combinedFeed = [...articleItems, ...videoItems]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 30);

  // 6. Map into XML items
  const rssItems = combinedFeed.map((item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <guid>${item.url}</guid>
    </item>
  `).join('');

  // 7. Construct the master XML feed using your original branding
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Reality Decoded | Transmissions</title>
      <link>${siteUrl}</link>
      <description>Declassified field reports and intercepted video intelligence.</description>
      <language>en-us</language>
      ${rssItems}
    </channel>
  </rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}