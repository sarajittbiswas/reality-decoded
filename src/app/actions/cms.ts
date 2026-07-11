'use server'

import { getRequestContext } from '@cloudflare/next-on-pages';
import { revalidatePath } from 'next/cache';

export async function publishArticle(formData: FormData) {
  const id = formData.get('id') as string;
  const db = (getRequestContext().env as any).reality_decoded_db;

  try {
    // Only the logic here
    await db.prepare("UPDATE articles SET status = 'published' WHERE id = ?").bind(id).run();
    revalidatePath('/hq');
    revalidatePath('/'); 
    return { success: true };
  } catch (error) {
    console.error("Publish Error:", error);
    return { success: false };
  }
}

export async function purgeArticle(formData: FormData) {
  const id = formData.get('id') as string;
  const db = (getRequestContext().env as any).reality_decoded_db;

  try {
    // Only the logic here
    await db.prepare("DELETE FROM articles WHERE id = ?").bind(id).run();
    revalidatePath('/hq');
    return { success: true };
  } catch (error) {
    console.error("Purge Error:", error);
    return { success: false };
  }
}