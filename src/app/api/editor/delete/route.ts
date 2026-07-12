import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

export async function DELETE(request: Request) {
  try {
    const db = (getRequestContext().env as any).reality_decoded_db;
    
    // Extract ID instead of slug
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing transmission ID' }, { status: 400 });
    }

    // Execute absolute purge targeting the ID column
    await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}