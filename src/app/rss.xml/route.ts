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

  // 3. Normalize Articles into standard feed items
  const articleItems = articles.map((a: any) => ({
    title: a.title,
    url: `${siteUrl}/blogs/${a.slug}`,
    description: a.excerpt || 'Text Transmission from Reality Decoded.',
    author: a.author || 'Reality Decoded Syndicate',
    timestamp: new Date(a.created_at).getTime(),
    pubDate: new Date(a.created_at).toUTCString()
  }));

  // 4. Normalize Videos into standard feed items
  const videoItems = videos.map((v: any) => ({
    title: `[VIDEO] ${v.title}`, // Added [VIDEO] tag so LinkedIn followers know what it is
    url: `${siteUrl}/watch/${v.id}`,
    description: v.description || 'Video Broadcast from Reality Decoded.',
    author: 'Reality Decoded Syndicate', // Videos don't have authors in your schema, so we default it
    timestamp: new Date(v.created_at).getTime(),
    pubDate: new Date(v.created_at).toUTCString()
  }));

  // 5. Merge both lists, sort them by newest first, and keep the top 30 overall
  const combinedFeed = [...articleItems, ...videoItems]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 30);

  // 6. Map the sorted list into XML items
  const rssItems = combinedFeed.map((item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      <author><![CDATA[${item.author}]]></author>
    </item>
  `).join('');

  // 7. Construct the master RSS XML feed
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Reality Decoded Broadcasts</title>
      <link>${siteUrl}</link>
      <description>We don't just report. We decode. Access our latest investigative transmissions and video broadcasts.</description>
      <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${rssItems}
    </channel>
  </rss>`;

  // 8. Return the response
  return new Response(feed, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}