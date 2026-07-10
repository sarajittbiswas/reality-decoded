import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

// HELPER: Parses YouTube's weird time format (PT1M30S) into raw seconds
function getSeconds(duration: string) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  return (hours * 3600) + (minutes * 60) + seconds;
}

export async function GET(request: Request) {
  // 1. Security Check
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.SYNC_SECRET) {
    return NextResponse.json({ error: 'Unauthorized override.' }, { status: 401 });
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    
    if (!apiKey || !channelId) {
      return NextResponse.json({ error: 'API credentials missing.' }, { status: 500 });
    }

    // 2. The Hack: Swap 'UC' for 'UU' to get the channel's master Uploads Playlist
    const uploadsPlaylistId = channelId.replace(/^UC/, 'UU');

    let allVideos: any[] = [];
    let nextPageToken = '';
    
    // 3. FETCH LIFETIME HISTORY (Loops up to 3 times to grab 150 videos)
    // If you have more than 150 videos, just change the '3' below to '10'
    for (let i = 0; i < 3; i++) {
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
      
      const playlistRes = await fetch(playlistUrl);
      const playlistData = await playlistRes.json();
      
      if (playlistData.items) {
        allVideos = [...allVideos, ...playlistData.items];
      }
      
      if (playlistData.nextPageToken) {
        nextPageToken = playlistData.nextPageToken;
      } else {
        break; // Reached the end of the channel history
      }
    }

    if (allVideos.length === 0) {
       return NextResponse.json({ error: 'No videos found on this channel.' }, { status: 404 });
    }

    // 4. FILTER OUT SHORTS
    const videoIds = allVideos.map((v) => v.snippet.resourceId.videoId);
    let validLongVideos: any[] = [];
    const chunkSize = 50; // YouTube only allows checking 50 videos at a time

    // We check the exact duration of every video fetched
    for (let i = 0; i < videoIds.length; i += chunkSize) {
       const chunkIds = videoIds.slice(i, i + chunkSize).join(',');
       const durationRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${chunkIds}&key=${apiKey}`);
       const durationData = await durationRes.json();
       
       if (durationData.items) {
          for (const item of durationData.items) {
             const durationSecs = getSeconds(item.contentDetails.duration);
             
             // Strict rule: Must be longer than 60 seconds to pass
             if (durationSecs > 60) {
                const snippetData = allVideos.find(v => v.snippet.resourceId.videoId === item.id);
                if (snippetData) {
                   validLongVideos.push({
                      id: item.id,
                      title: snippetData.snippet.title,
                      description: snippetData.snippet.description.substring(0, 500),
                      publishedAt: snippetData.snippet.publishedAt
                   });
                }
             }
          }
       }
    }

    // 5. INJECT INTO DATABASE
    const db = (getRequestContext().env as any).reality_decoded_db;
    let addedCount = 0;

    for (const video of validLongVideos) {
      const url = `https://www.youtube.com/watch?v=${video.id}`;
      const dbId = `yt_${video.id}`;

      // INSERT OR IGNORE safely skips videos we already downloaded previously
      const info = await db.prepare(
        `INSERT OR IGNORE INTO videos (id, title, url, description, category, created_at) VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(dbId, video.title, url, video.description, 'Transmission', video.publishedAt).run();

      if (info.meta && info.meta.changes > 0) {
        addedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Lifetime sync complete. Scanned ${allVideos.length} total uploads. Added ${addedCount} new full-length transmissions (Shorts ignored).` 
    });

  } catch (error: any) {
    console.error("Sync Engine Error:", error.message);
    return NextResponse.json({ error: 'System failure during synchronization.' }, { status: 500 });
  }
}