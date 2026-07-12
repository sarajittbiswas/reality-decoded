import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    // Fetch all tags from published/draft articles
    const { results } = await db.prepare("SELECT tags FROM articles WHERE tags IS NOT NULL AND tags != ''").all();
    
    // Extract unique tags
    const allTags = new Set<string>();
    results.forEach((row: any) => {
      row.tags.split(',').forEach((t: string) => {
        const trimmed = t.trim();
        if (trimmed) allTags.add(trimmed);
      });
    });

    return NextResponse.json(Array.from(allTags));
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}