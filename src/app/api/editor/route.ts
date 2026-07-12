import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const db = (getRequestContext().env as any).reality_decoded_db;

    if (id) {
      const article = await db.prepare("SELECT * FROM articles WHERE id = ?").bind(id).first();
      return NextResponse.json({ success: true, article });
    }
    return NextResponse.json({ success: false, error: 'No ID provided' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id, title, category, tags, content, status } = await request.json();
    const db = (getRequestContext().env as any).reality_decoded_db;

    if (id) {
      // 🚨 UPDATE EXISTING POST (Now includes tags)
      await db.prepare(
        "UPDATE articles SET title = ?, category = ?, tags = ?, content = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).bind(title, category || 'INTEL', tags || '', content, status, id).run();
      
      return NextResponse.json({ success: true, id });
    } else {
      // 🚨 CREATE NEW POST (Now includes tags)
      const newId = crypto.randomUUID();
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      await db.prepare(
        "INSERT INTO articles (id, slug, title, category, tags, content, status, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(newId, slug, title, category || 'INTEL', tags || '', content, status, 'Syndicate Admin').run();

      return NextResponse.json({ success: true, id: newId });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}