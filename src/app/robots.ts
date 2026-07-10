import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent bots from indexing internal API routes or secure portals
      disallow: ['/api/', '/private/'], 
    },
    // Points the web crawlers to your dynamic sitemap
    sitemap: 'https://realitydecoded.in/sitemap.xml',
  };
}