import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  // 1. Security Check: Prevent unauthorized users from triggering your API quota
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized override.' }, { status: 401 });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    
    if (!apiKey || !channelId) {
      return NextResponse.json({ error: 'API credentials missing from environment.' }, { status: 500 });
    }

    // 2. Fetch the latest 10 videos from your specific YouTube channel
    const ytResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10&type=video`
    );
    
    const data = await ytResponse.json();

    if (!data.items) {
       return NextResponse.json({ error: 'YouTube API failed to return data.', details: data }, { status: 500 });
    }

    const db = (getRequestContext().env as any).reality_decoded_db;
    let addedCount = 0;

    // 3. Process and inject into Cloudflare D1 Database
    for (const item of data.items) {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      // Truncate description slightly just in case it's massive
      const description = item.snippet.description.substring(0, 500); 
      const publishedAt = item.snippet.publishedAt; 
      
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      const id = `yt_${videoId}`; // Unique ID format to prevent clashes

      // INSERT OR IGNORE safely skips the video if the ID already exists in the table
      const info = await db.prepare(
        `INSERT OR IGNORE INTO videos (id, title, url, description, category, created_at) 
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(id, title, url, description, 'Transmission', publishedAt).run();

      // Cloudflare D1 returns meta.changes > 0 if a new row was actually added
      if (info.meta && info.meta.changes > 0) {
        addedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sync complete. ${addedCount} new transmissions intercepted and logged.` 
    });

  } catch (error: any) {
    console.error("Sync Engine Error:", error.message);
    return NextResponse.json({ error: 'System failure during synchronization.' }, { status: 500 });
  }
}