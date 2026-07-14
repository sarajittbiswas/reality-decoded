import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
  const db = (getRequestContext().env as any).reality_decoded_db;

  // 1. Fetch the 20 most recent LIVE articles
  const { results: articles } = await db.prepare(
    "SELECT title, slug, excerpt, created_at, author FROM articles WHERE status = 'published' ORDER BY created_at DESC LIMIT 20"
  ).all();

  const siteUrl = 'https://realitydecoded.in';

  // 2. Map the database results into standard XML <item> blocks
  const rssItems = articles.map((article: any) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${siteUrl}/blogs/${article.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blogs/${article.slug}</guid>
      <description><![CDATA[${article.excerpt || 'Transmission from Reality Decoded.'}]]></description>
      <pubDate>${new Date(article.created_at).toUTCString()}</pubDate>
      <author><![CDATA[${article.author || 'Reality Decoded Syndicate'}]]></author>
    </item>
  `).join('');

  // 3. Construct the master RSS XML feed
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Reality Decoded Broadcasts</title>
      <link>${siteUrl}</link>
      <description>We don't just report. We decode. Access our latest investigative transmissions.</description>
      <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${rssItems}
    </channel>
  </rss>`;

  // 4. Return the response with the strict XML content type
  return new Response(feed, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      // Caches the RSS feed for 1 hour to save database reads, then revalidates
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}