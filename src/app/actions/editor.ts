// File: src/app/actions/editor.ts
'use server'


import { getRequestContext } from '@cloudflare/next-on-pages';
import { revalidatePath } from 'next/cache';

export async function saveToDatabase(data: { id?: string, title: string, category: string, content: string, status: 'draft' | 'pending' }) {
  const db = (getRequestContext().env as any).reality_decoded_db;
  
  // Auto-generate a clean URL slug from the title
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const author = "Syndicate Agent"; // We will make this dynamic when we build multi-user auth

  try {
    if (data.id) {
      // If we already saved it once, UPDATE the existing row
      await db.prepare(
        "UPDATE articles SET title = ?, category = ?, content = ?, status = ? WHERE id = ?"
      ).bind(data.title, data.category, data.content, data.status, data.id).run();
      
      return { success: true, id: data.id };
    } else {
      // If this is a brand new draft, INSERT a new row
      const newId = crypto.randomUUID(); // Generate a unique ID
      await db.prepare(
        "INSERT INTO articles (id, title, slug, category, content, author, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
      ).bind(newId, data.title, slug, data.category, data.content, author, data.status).run();
      
      revalidatePath('/hq');
      return { success: true, id: newId };
    }
  } catch (error) {
    console.error("Database Write Error:", error);
    return { success: false, error: "Database rejected the transmission." };
  }
}