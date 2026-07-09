import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Connect to your Cloudflare D1 Database
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // Insert the transmission
    await db.prepare(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
    ).bind(name, email, subject, message).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database insertion failed' }), { status: 500 });
  }
}