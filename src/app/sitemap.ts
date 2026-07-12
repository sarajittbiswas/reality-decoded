import { MetadataRoute } from 'next';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://realitydecoded.in';

  // 1. Define your core static pages (PRESERVED)
  const staticRoutes = [
    '',
    '/videos',
    '/articles',
    '/team',
    '/contact',
    '/press'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // 2. Fetch all classified videos (PRESERVED)
    const { results: videos } = await db.prepare(
      'SELECT id, created_at FROM videos ORDER BY created_at DESC'
    ).all();

    const dynamicVideoRoutes = videos.map((video: any) => ({
      url: `${baseUrl}/watch/${video.id}`,
      lastModified: video.created_at ? new Date(video.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // 3. Fetch all published articles (NEW)
    const { results: articles } = await db.prepare(
      "SELECT slug, updated_at, created_at FROM articles WHERE status = 'published' ORDER BY created_at DESC"
    ).all();

    const dynamicArticleRoutes = articles.map((article: any) => ({
      url: `${baseUrl}/blogs/${article.slug}`,
      // Fallback to created_at or current date if updated_at is null
      lastModified: article.updated_at ? new Date(article.updated_at) : (article.created_at ? new Date(article.created_at) : new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7, // Slightly higher priority than videos for text indexing
    }));

    // 4. Merge and return the complete sitemap
    return [...staticRoutes, ...dynamicVideoRoutes, ...dynamicArticleRoutes];
    
  } catch (error) {
    console.error("Sitemap generation error:", error);
    // Graceful fallback to static routes if the database connection fails
    return staticRoutes;
  }
}