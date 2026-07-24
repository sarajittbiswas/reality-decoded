import { getRequestContext } from '@cloudflare/next-on-pages';
import { Metadata } from 'next';
import { D1Database } from '@cloudflare/workers-types';
import AuthorProfileClient from './AuthorProfileClient';

export const runtime = 'edge';

// ==========================================
// UTILITIES
// ==========================================
const getISTDate = (dateStr: string) => {
  if (!dateStr) return new Date();
  return new Date(dateStr.replace(' ', 'T') + '+05:30');
};

const getLocalTime = (timezone: string) => {
  try {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toLowerCase() + ' (local time)';
  } catch (e) {
    return null;
  }
};

// ==========================================
// DATA FETCHERS
// ==========================================
async function getAgent(decodedIdentifier: string, db: D1Database) {
  return await db.prepare(
    `SELECT * FROM syndicate_agents WHERE id = ? OR name = ?`
  ).bind(decodedIdentifier, decodedIdentifier).first();
}

async function getLiveArticles(decodedIdentifier: string, db: D1Database) {
  const { results: allArticles } = await db.prepare(
    `SELECT * FROM articles 
     WHERE status IN ('published', 'scheduled') 
     AND (agent_id = ? OR author = ?)
     ORDER BY created_at DESC`
  ).bind(decodedIdentifier, decodedIdentifier).all();

  const now = new Date();
  return allArticles.filter((a: any) => 
    a.status === 'published' || 
    (a.status === 'scheduled' && getISTDate(a.scheduled_for) <= now)
  );
}

// ==========================================
// METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const decodedIdentifier = decodeURIComponent(id);
  const db = (getRequestContext().env as any).reality_decoded_db;
  const agent = await getAgent(decodedIdentifier, db);
  const authorName = agent?.name || decodedIdentifier;

  return {
    title: `${authorName} | Reality Decoded Operative`,
  };
}

// ==========================================
// MAIN SERVER COMPONENT
// ==========================================
export default async function AuthorProfilePage(props: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const initialTab = (searchParams?.tab as string)?.toLowerCase() || 'all';
  
  const decodedIdentifier = decodeURIComponent(id);
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  const agent = await getAgent(decodedIdentifier, db);
  const liveArticles = await getLiveArticles(decodedIdentifier, db);

  const authorName = agent?.name || decodedIdentifier;
  const authorAvatar = agent?.avatar || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=100&auto=format&fit=crop';
  const localTime = agent?.timezone ? getLocalTime(agent.timezone as string) : null;

  // DYNAMICALLY EXTRACT CATEGORIES
  const rawCategories = liveArticles.map((a: any) => {
    return (a.category && a.category.trim() !== '') ? a.category : 'Uncategorised';
  });
  
  const categoryMap = new Map();
  rawCategories.forEach((cat: string) => {
    const lower = cat.toLowerCase();
    if (!categoryMap.has(lower)) {
      categoryMap.set(lower, cat); 
    }
  });
  const uniqueCategories = Array.from(categoryMap.values()) as string[];

  // Render the renamed Client Component
  return (
    <AuthorProfileClient 
      agent={agent}
      liveArticles={liveArticles}
      uniqueCategories={uniqueCategories}
      authorName={authorName}
      authorAvatar={authorAvatar}
      localTime={localTime}
      initialTab={initialTab}
    />
  );
}