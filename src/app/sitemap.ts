import { MetadataRoute } from 'next';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// 🚨 Force Next.js to NEVER cache this file and always fetch live DB data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://realitydecoded.in';

  // 1. Define your core static pages
  const staticRoutes = [
    '',
    '/videos',
    '/blogs',
    '/team',
    '/contact',
    '/press',
    '/careers',
    '/archives',
    '/about',
    '/share',
    '/author'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Define Legal/Compliance pages with lower priority
  const legalRoutes = [
    '/privacy',
    '/terms',
    '/disclaimer',
    '/editorial-policy',
    '/legal',
    '/methodology',
    '/feed'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // 3. Fetch all classified videos
    const { results: videos } = await db.prepare(
      'SELECT id, created_at FROM videos ORDER BY created_at DESC'
    ).all();

    const dynamicVideoRoutes = videos.map((video: any) => ({
      url: `${baseUrl}/watch/${video.id}`,
      lastModified: video.created_at ? new Date(video.created_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // 4. Fetch all published articles
    const { results: articles } = await db.prepare(
      "SELECT slug, updated_at, created_at FROM articles WHERE status = 'published' ORDER BY created_at DESC"
    ).all();

    const dynamicArticleRoutes = articles.map((article: any) => ({
      url: `${baseUrl}/blogs/${article.slug}`,
      lastModified: article.updated_at ? new Date(article.updated_at) : (article.created_at ? new Date(article.created_at) : new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7, 
    }));

    // 5. Fetch all Active Jobs (Updated Path)
    const { results: jobs } = await db.prepare(
      "SELECT id, created_at FROM syndicate_jobs WHERE is_active = 1 AND is_deleted = 0 AND expires_at > datetime('now')"
    ).all();

    const dynamicJobRoutes = jobs.map((job: any) => ({
      url: `${baseUrl}/careers/apply/${job.id}`,
      lastModified: job.created_at ? new Date(job.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // 6. Fetch all Author Profiles
    const { results: agents } = await db.prepare(
      "SELECT id FROM syndicate_agents"
    ).all();

    const dynamicAuthorRoutes = agents.map((agent: any) => ({
      url: `${baseUrl}/author/${agent.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // 7. Fetch and Process Tags for Archives
    const { results: tagsData } = await db.prepare(
      "SELECT tags FROM articles WHERE status = 'published' AND tags IS NOT NULL"
    ).all();

    const uniqueTags = new Set<string>();
    tagsData.forEach((row: any) => {
      if (row.tags) {
        // Split comma-separated tags, trim whitespace, and add to the Set to ensure uniqueness
        row.tags.split(',').forEach((tag: string) => {
          const trimmedTag = tag.trim();
          if (trimmedTag) {
            uniqueTags.add(trimmedTag);
          }
        });
      }
    });

    const dynamicArchiveRoutes = Array.from(uniqueTags).map((tag: string) => ({
      // encodeURIComponent safely handles spaces (converts to %20) and special characters
      url: `${baseUrl}/archives/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // 8. Merge and return the complete sitemap 
    return [
      ...staticRoutes, 
      ...legalRoutes, 
      ...dynamicVideoRoutes, 
      ...dynamicArticleRoutes,
      ...dynamicJobRoutes,
      ...dynamicAuthorRoutes,
      ...dynamicArchiveRoutes
    ];
    
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [...staticRoutes, ...legalRoutes];
  }
}