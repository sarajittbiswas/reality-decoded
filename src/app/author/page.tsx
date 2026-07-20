import AuthorsClient from './AuthorsClient';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const metadata = {
  title: 'Humans behind Reality Decoded',
  description: 'The operatives decoding artificial narratives.',
};

export default async function AuthorsPage() {
  const context = getRequestContext();
  
  // FIXED: Changed .DB to .reality_decoded_db to match your Cloudflare binding
  const db = context.env.reality_decoded_db;

  if (!db) {
    throw new Error("Database binding 'reality_decoded_db' not found. Check Cloudflare Dashboard bindings.");
  }

  // Fetch the data
  const { results: dbAgents } = await db.prepare('SELECT id, name, avatar, location FROM syndicate_agents').all();

  // Map data
  const formattedAuthors = (dbAgents as any[]).map((agent) => ({
    slug: agent.id, 
    name: agent.name || "Unknown Agent",
    location: agent.location || "Classified",
    image: agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name || 'OP')}&background=111111&color=ffffff&size=256`
  }));

  return <AuthorsClient initialAuthors={formattedAuthors} />;
}