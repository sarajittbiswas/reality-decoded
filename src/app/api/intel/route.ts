import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string || 'Untitled';
    const author = formData.get('author') as string || 'Anonymous';
    const description = formData.get('description') as string || 'No description provided.';
    const content = formData.get('content') as string || '';
    
    // Define the missing variables
    const category = 'Public Drop';
    const image = 'https://images.unsplash.com/photo-1614064010834-58e1c68b6b0b?q=80&w=1000&auto=format&fit=crop';
    
    const context = getRequestContext();
    const db = context.env.reality_decoded_db;

    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const randomString = Math.random().toString(36).substring(2, 7);
    const slug = `${baseSlug}-${randomString}`;
    const id = `article_${Date.now()}_${randomString}`;

    await db.prepare(
      `INSERT INTO articles (id, slug, title, author, description, content, category, image, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`
    ).bind(id, slug, title, author, description, content, category, image).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Intel Error:", error);
    return NextResponse.json({ success: false, error: "Database rejected transmission." }, { status: 500 });
  }
}