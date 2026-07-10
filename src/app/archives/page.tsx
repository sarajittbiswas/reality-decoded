import { getRequestContext } from '@cloudflare/next-on-pages';
import { Space_Grotesk } from 'next/font/google';
import ArchiveBoard from '@/components/ArchiveBoard';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

// We pull all the blogs here so we can pass them to the interactive board
const MOCK_BLOGS_ARCHIVE = [
  { id: 'phantom-networks', title: 'Phantom Networks: The Invisible ISP in Your City', description: 'Our field team detected over 40 unauthorized Stingray devices masking themselves as standard cell towers in major metropolitan areas.', category: 'Investigation', image: 'https://images.unsplash.com/photo-1614064010834-58e1c68b6b0b?q=80&w=1000&auto=format&fit=crop' },
  { id: 'corporate-shell-games', title: 'Corporate Shell Games: Tracing the Offshore Billions', description: 'We recently acquired 4,000 pages of leaked customs manifests. This report breaks down exactly how modern tech giants are routing hardware through neutral ports.', category: 'Deep Dive', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop' },
  { id: 'zero-day-economy', title: 'The Zero-Day Economy: Who Profits from Insecurity', description: 'Traditionally, hackers sold these on the dark web. Today, the biggest buyers are legitimate corporations and government contractors.', category: 'Deep Dive', image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000&auto=format&fit=crop' },
  { id: 'digital-breadcrumbs', title: 'Following the Digital Breadcrumbs', description: 'Open-source intelligence is the backbone of Reality Decoded. By cross-referencing public flight logs with corporate tax filings...', category: 'Analysis', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop' },
  { id: 'factory-conditions', title: 'Public Drop: The Factory Conditions They Aren’t Reporting', description: 'The following report was submitted via our secure transmission protocol and has been structurally verified by our team using logistical metadata.', category: 'Public Drop', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop' }
];

export default async function ArchivesPage() {
  // Pull all videos from the D1 Database
  const db = (getRequestContext().env as any).reality_decoded_db;
  const { results: videos } = await db.prepare('SELECT * FROM videos ORDER BY created_at DESC').all();

  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative pb-32">
      
      {/* Global CSS for the fading animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[40%] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-[40%] h-[50%] bg-red-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center flex flex-col items-center animate-[fade-in-up_0.8s_ease-out_forwards]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20 mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Syndicate Master Database
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-4 uppercase`}>
            Decoded <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-red-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">Archives.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Access our complete unedited video logs and highly classified written field reports. Toggle databases below.
          </p>
        </div>

        {/* 3. INJECT THE CLIENT-SIDE BOARD */}
        <ArchiveBoard videos={videos} blogs={MOCK_BLOGS_ARCHIVE} />

      </div>
    </main>
  );
}