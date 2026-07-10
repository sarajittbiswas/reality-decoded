import { MetadataRoute } from 'next';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://realitydecoded.in';

  // 1. Define your core static pages
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
    priority: route === '' ? 1.0 : 0.8, // Home page gets highest priority
  }));

  // 2. Dynamically fetch all classified videos from your database
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // We only need the ID and date to build the URL, no need to fetch heavy descriptions
    const { results } = await db.prepare('SELECT id, created_at FROM videos ORDER BY created_at DESC').all();

    const dynamicVideoRoutes = results.map((video: any) => ({
      url: `${baseUrl}/watch/${video.id}`,
      lastModified: video.created_at ? new Date(video.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // 3. Merge and return the complete sitemap
    return [...staticRoutes, ...dynamicVideoRoutes];
    
  } catch (error) {
    console.error("Sitemap generation error:", error);
    // If the database connection fails during a build, gracefully return just the static routes
    return staticRoutes;
  }
}