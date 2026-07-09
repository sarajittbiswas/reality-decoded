import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

// Save the text snippet to the Database
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { alias, email, subject, story } = data;

    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // Insert into DB
    await db.prepare(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)'
    ).bind(alias || 'Anonymous', email || '', subject, story).run();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database insertion failed' }), { status: 500 });
  }
}

// Fetch the 6 latest drops for the animated sidebar
export async function GET() {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // Pull the latest 6 submissions
    const { results } = await db.prepare(
      'SELECT name, subject FROM messages ORDER BY created_at DESC LIMIT 6'
    ).all();
    
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify([]), { status: 200 }); 
  }
}