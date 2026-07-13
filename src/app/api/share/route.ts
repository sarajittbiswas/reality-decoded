import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// 1. Tell TypeScript exactly what data to expect
interface SharePayload {
  alias?: string;
  email?: string;
  subject?: string;
  story: string;
  file_url?: string;
  isApplication?: boolean;
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as SharePayload;
    const { alias, email, subject, story, file_url, isApplication } = data;
    const db = (getRequestContext().env as any).reality_decoded_db;
    const newId = crypto.randomUUID();

    // 🚨 THE ROUTING GATEKEEPER
    // If it's an application, mark it 'pending' so it appears in HQ.
    // If it's just a general tip, mark it 'general' so it stays safely stored but out of HQ.
    const submissionStatus = isApplication === true ? 'pending' : 'general';

    // ALWAYS save every single piece of intel to the database with full data
    await db.prepare(
      'INSERT INTO intel_submissions (id, name, contact, story, status, subject, file_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      newId, 
      alias || 'Anonymous', 
      email || 'No Contact Provided', 
      story, 
      submissionStatus,
      subject || 'Untitled Transmission',
      file_url || null // Securely saves the ImgBB link for all types of drops
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
    
    // 🚨 REMOVED THE 'WHERE status = pending' CONSTRAINT
    // Now it safely captures the 7 most recent drops, regardless of their publication intent.
    const { results } = await db.prepare(
      "SELECT name, story FROM intel_submissions ORDER BY submitted_at DESC LIMIT 8"
    ).all();
    
    return NextResponse.json(results || [], { status: 200 });
  } catch (error) {
    return NextResponse.json([], { status: 200 }); 
  }
}