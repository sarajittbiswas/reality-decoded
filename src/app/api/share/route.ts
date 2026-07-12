import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { alias, email, subject, story } = data;
    const db = (getRequestContext().env as any).reality_decoded_db;
    const newId = crypto.randomUUID();

    // Now we save the SUBJECT to the database!
    await db.prepare(
      'INSERT INTO intel_submissions (id, name, contact, story, status, subject) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(
      newId, 
      alias || 'Anonymous', 
      email || 'No Contact Provided', 
      story, 
      'pending',
      subject || 'Untitled Transmission' // Saving the real title
    ).run();

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("Submission Error:", error);
    return NextResponse.json({ success: false, error: 'Database failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    const { results } = await db.prepare(
      "SELECT name, story FROM intel_submissions WHERE status = 'pending' ORDER BY submitted_at DESC LIMIT 7"
    ).all();
    
    // Safety: ensure we always return an array, even if empty
    return NextResponse.json(results || [], { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 200 }); 
  }
}