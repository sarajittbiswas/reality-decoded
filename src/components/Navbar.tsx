import { getRequestContext } from '@cloudflare/next-on-pages';
import NavbarClient from './NavbarClient';

const getISTDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  return new Date(dateStr.replace(' ', 'T') + '+05:30');
};

const getFirstImage = (html: string) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const getYTImage = (url: string) => {
  if (!url || !url.includes('v=')) return '/yt_img.png';
  const id = url.split('v=')[1].split('&')[0];
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

export default async function Navbar() {
  let db;
  try {
    db = (getRequestContext().env as any)?.reality_decoded_db;
  } catch (e) {
    return <NavbarClient data={{}} />;
  }

  if (!db) return <NavbarClient data={{}} />;

  try {
    const { results: videos } = await db.prepare('SELECT * FROM videos ORDER BY created_at DESC LIMIT 2').all();
    const formattedVideos = (videos || []).map((v: any) => ({ ...v, image: getYTImage(v.url) }));

    const { results: articles } = await db.prepare("SELECT * FROM articles WHERE status IN ('published', 'scheduled') ORDER BY created_at DESC").all();
    const now = new Date();
    const validArticles = (articles || []).filter((a: any) => 
      a.status === 'published' || 
      (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
    );
    
    const formattedArticles = validArticles.slice(0, 2).map((a: any) => ({ ...a, image: getFirstImage(a.content) }));

    const { results: jobs } = await db.prepare("SELECT * FROM syndicate_jobs WHERE expires_at > datetime('now') AND (is_active = 1 OR is_active IS NULL) ORDER BY created_at DESC LIMIT 2").all();

    const { results: topAuthors } = await db.prepare(`
      SELECT sa.*, COUNT(a.id) as article_count
      FROM syndicate_agents sa
      JOIN articles a ON sa.id = a.agent_id
      GROUP BY sa.id
      ORDER BY article_count DESC
      LIMIT 2
    `).all();

    const navData = {
      videos: formattedVideos,
      articles: formattedArticles,
      jobs: jobs || [],
      authors: topAuthors || []
    };

    return <NavbarClient data={navData} />;
  } catch (err) {
    console.error("Navbar DB fetch error:", err);
    return <NavbarClient data={{}} />;
  }
}