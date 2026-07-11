import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const author = "Syndicate Agent"; // Later we will tie this to the multi-author login!

    if (data.id) {
      // 🚨 UPDATE EXISTING ARTICLE (Now includes tags and updated_at)
      
      // If the frontend explicitly passed isUpdate, we log the updated_at timestamp.
      // Otherwise, we just update the content (like a silent draft save).
      if (data.isUpdate) {
        await db.prepare(
          "UPDATE articles SET title = ?, category = ?, tags = ?, content = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        ).bind(data.title, data.category, data.tags || "", data.content, data.status, data.id).run();
      } else {
        await db.prepare(
          "UPDATE articles SET title = ?, category = ?, tags = ?, content = ?, status = ? WHERE id = ?"
        ).bind(data.title, data.category, data.tags || "", data.content, data.status, data.id).run();
      }
      
      return NextResponse.json({ success: true, id: data.id });
    } else {
      // 🚨 INSERT NEW ARTICLE (Now includes tags)
      const newId = crypto.randomUUID();
      await db.prepare(
        "INSERT INTO articles (id, title, slug, category, tags, content, author, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      ).bind(newId, data.title, slug, data.category, data.tags || "", data.content, author, data.status).run();
      
      return NextResponse.json({ success: true, id: newId });
    }
  } catch (error: any) {
    console.error("API DB Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

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