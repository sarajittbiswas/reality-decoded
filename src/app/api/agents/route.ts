import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    const { results } = await db.prepare("SELECT * FROM syndicate_agents ORDER BY name ASC").all();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}