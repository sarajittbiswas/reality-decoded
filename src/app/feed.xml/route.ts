import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    
    const { results: articles } = await db.prepare(
  "SELECT title, slug, excerpt, created_at FROM articles WHERE status = 'published' ORDER BY created_at DESC LIMIT 20"
).all();

    const baseUrl = 'https://realitydecoded.in';

    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Reality Decoded | Transmissions</title>
        <link>${baseUrl}</link>
        <description>Declassified field reports and intercepted video intelligence.</description>
        <language>en-us</language>`;

    articles.forEach((article: any) => {
      xml += `
        <item>
  <title><![CDATA[${article.title}]]></title>
  <link>${baseUrl}/blogs/${article.slug}</link>
  <description><![CDATA[${article.excerpt || 'Classified intel transmission. Access the full report on the secure grid.'}]]></description>
  <pubDate>${article.created_at ? new Date(article.created_at).toUTCString() : new Date().toUTCString()}</pubDate>
  <guid>${baseUrl}/blogs/${article.slug}</guid>
</item>`;
    });

    xml += `
      </channel>
    </rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate', // Re-enabled caching for speed
      },
    });

  } catch (error: any) {
    return new NextResponse(`[SYS_LOG FAILURE]: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}