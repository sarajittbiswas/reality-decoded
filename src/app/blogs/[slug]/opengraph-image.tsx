import { ImageResponse } from 'next/og';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; // 🚨 THE FIX: Busts the Next.js cache so the metadata image generates live

export const alt = 'Reality Decoded Transmission';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// In Next.js 15, dynamic parameters must be awaited
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const db = (getRequestContext().env as any).reality_decoded_db;
  const article = await db.prepare("SELECT title FROM articles WHERE slug = ?").bind(slug).first();
  const title = article ? (article as any).title : 'Encrypted Transmission';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#050505', // Deep space dark mode
          padding: '80px',
          borderTop: '16px solid #8b5cf6', // Neon purple accent
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '40px' }}>
          <div style={{ color: '#ef4444', fontSize: 24, letterSpacing: '0.2em', fontFamily: 'monospace' }}>
            [SYS_LOG: DECLASSIFIED]
          </div>
          <div style={{ color: '#6b7280', fontSize: 24, fontFamily: 'monospace' }}>
            NODE: RD-HQ
          </div>
        </div>
        
        <div style={{ fontSize: 72, fontFamily: 'sans-serif', fontWeight: 'bold', color: 'white', lineHeight: 1.2, marginBottom: '40px', maxWidth: '900px' }}>
          {title}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'white', marginRight: 20 }} />
          <div style={{ fontSize: 32, color: 'white', fontWeight: 'bold', letterSpacing: '-0.05em' }}>
            Reality Decoded
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}