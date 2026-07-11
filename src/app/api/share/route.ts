import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server'; // We will use NextResponse for cleaner headers

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { alias, email, subject, story } = data;

    const db = (getRequestContext().env as any).reality_decoded_db;
    const newId = crypto.randomUUID();
    
    const fullStory = subject ? `[SUBJECT: ${subject}]\n\n${story}` : story;
    
    await db.prepare(
      'INSERT INTO intel_submissions (id, name, contact, story, status) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      newId, 
      alias || 'Anonymous', 
      email || 'No Contact Provided', 
      fullStory, 
      'pending'
    ).run();

    // Using NextResponse ensures the headers are perfectly formatted for your frontend to read
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("DB Submission Error:", error);
    return NextResponse.json({ success: false, error: 'Database insertion failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    const { results } = await db.prepare(
      "SELECT name, story FROM intel_submissions WHERE status = 'pending' ORDER BY submitted_at DESC LIMIT 7"
    ).all();
    
    const mappedResults = results.map((row: any) => ({
      name: row.name,
      subject: row.story.substring(0, 40) + '...' 
    }));

    return NextResponse.json(mappedResults, { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 200 }); 
  }
}