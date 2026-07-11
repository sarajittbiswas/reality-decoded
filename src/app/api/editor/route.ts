import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

// Cloudflare loves this here, and Next.js won't crash because it's an API route!
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const author = "Syndicate Agent";

    if (data.id) {
      // Update existing draft
      await db.prepare(
        "UPDATE articles SET title = ?, category = ?, content = ?, status = ? WHERE id = ?"
      ).bind(data.title, data.category, data.content, data.status, data.id).run();
      
      return NextResponse.json({ success: true, id: data.id });
    } else {
      // Insert new draft
      const newId = crypto.randomUUID();
      await db.prepare(
        "INSERT INTO articles (id, title, slug, category, content, author, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
      ).bind(newId, data.title, slug, data.category, data.content, author, data.status).run();
      
      return NextResponse.json({ success: true, id: newId });
    }
  } catch (error: any) {
    console.error("API DB Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Add this below your existing POST function in src/app/api/editor/route.ts

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: "No ID provided" }, { status: 400 });
    }

    const db = (getRequestContext().env as any).reality_decoded_db;
    const article = await db.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();

    if (!article) {
      return NextResponse.json({ success: false, error: "Draft not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("API Fetch Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}