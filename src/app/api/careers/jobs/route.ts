import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { role, type, location, daysActive } = await req.json();
  const id = crypto.randomUUID();

  await db.prepare(
    "INSERT INTO syndicate_jobs (id, role, type, location, expires_at) VALUES (?, ?, ?, ?, datetime('now', ?))"
  ).bind(id, role, type, location, `+${daysActive} days`).run();

  return NextResponse.json({ success: true });
}