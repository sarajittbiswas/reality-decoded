import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: 'Email transmission empty.' }, { status: 400 });
    }

    // 1. Get Environment Variables
    const env = getRequestContext().env as any;

    // 2. SAFETY CHECK: If testing locally without DB bindings, don't crash.
    if (!env || !env.reality_decoded_db) {
      console.warn("SYSTEM WARNING: Local D1 Database binding missing. Email not saved to DB locally, but Formspree will still work.");
      return NextResponse.json({ success: true, warning: 'Local DB bypassed' });
    }

    // 3. Live/Bound Environment: Save to Database
    const db = env.reality_decoded_db;
    await db.prepare('INSERT OR IGNORE INTO subscribers (email) VALUES (?)')
      .bind(email)
      .run();

    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    // This will print the exact database error in your terminal if it fails
    console.error("Database connection error:", error.message);
    return NextResponse.json({ error: 'System error.' }, { status: 500 });
  }
}