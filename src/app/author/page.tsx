import AuthorsClient from './AuthorsClient';
import { getRequestContext } from '@cloudflare/next-on-pages'; // Ensure you have this configured for D1

export const metadata = {
  title: 'Humans behind Reality Decoded',
  description: 'The operatives decoding artificial narratives.',
};

export default async function AuthorsPage() {
  // 🚀 FETCH DYNAMICALLY FROM YOUR CLOUDFLARE D1 DATABASE
  // This queries your actual production database every time the page loads
  const db = getRequestContext().env.DB;
  const { results: dbAgents } = await db.prepare('SELECT id, name, avatar, location FROM syndicate_agents').all();

  // Map database results to the format the Client UI expects
  const formattedAuthors = (dbAgents as any[]).map((agent) => ({
    slug: agent.id, 
    name: agent.name || "Unknown Agent",
    location: agent.location || "Classified",
    // Fallback image logic if avatar is missing/null in DB
    image: agent.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name || 'OP')}&background=111111&color=ffffff&size=256`
  }));

  return <AuthorsClient initialAuthors={formattedAuthors} />;
}