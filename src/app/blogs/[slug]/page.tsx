import { notFound } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import Interactions from '@/components/Interactions'; // <-- INJECTED HERE

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export function generateStaticParams() {
  return [
    { slug: 'corporate-shell-games' },
    { slug: 'digital-breadcrumbs' },
    { slug: 'factory-conditions' }
  ];
}

const MOCK_ARTICLES: Record<string, { title: string; author: string; date: string; type: string; content: string[] }> = {
  'corporate-shell-games': {
    title: 'Corporate Shell Games: Tracing the Offshore Billions',
    author: 'Reality Decoded Team',
    date: 'July 8, 2026',
    type: 'Deep Dive',
    content: [
      'We recently acquired 4,000 pages of leaked customs manifests. While videos are great for summaries, the devil is in the written details. This report breaks down exactly how modern tech giants are routing hardware through neutral ports.',
      'During our investigation, we tracked three distinct shell networks routing server hardware. The shipping manifests—which we have verified via open-source customs databases—show a 40% discrepancy in declared weight versus physical terminal receipts.',
      'What does this mean? It implies a massive, parallel infrastructure being spun up completely off the public record. Below are the translated log files from the Shenzhen terminal...'
    ]
  },
  'digital-breadcrumbs': {
    title: 'Following the Digital Breadcrumbs: A Method to the Madness',
    author: 'Lead Investigator',
    date: 'July 2, 2026',
    type: 'Analysis',
    content: [
      'We often get asked how we find the documents featured in our videos. The truth is, almost everything is hiding in plain sight if you know which databases to query.',
      'Open-source intelligence (OSINT) is the backbone of Reality Decoded. By cross-referencing public flight logs with corporate tax filings in Delaware, we can map out executive movements before a merger is ever announced.',
      'In this guide, we are sharing three publicly accessible tools you can use right now to start verifying corporate claims on your own.'
    ]
  },
  'factory-conditions': {
    title: 'Public Drop: The Factory Conditions They Aren’t Reporting',
    author: 'Anonymous Contributor',
    date: 'July 8, 2026',
    type: 'Public Drop',
    content: [
      'The following report was submitted via our secure transmission protocol and has been structurally verified by our team using logistical metadata.',
      '"I have worked on the main assembly floor for over three years. The public relations videos showing pristine, automated environments are entirely staged. Twenty-four hours before a state inspection, hazardous manufacturing biproducts are physically trucked to a secondary, unlisted storage warehouse facility miles away."',
      '"Those of us working the line are exposed to chemical signatures without standard protective gear. When we raised complaints internally, our credentials were flag-checked. I am sharing this because the public deserves to know the physical cost of the devices in their pockets."'
    ]
  }
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = MOCK_ARTICLES[resolvedParams.slug];

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[30%] bg-purple-900/10 blur-[120px] pointer-events-none z-0"></div>

      <article className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Document Header */}
        <div className="mb-10 border-b border-white/5 pb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono font-bold px-3 py-1 rounded uppercase tracking-widest">
              {article.type}
            </span>
            <span className="text-xs text-gray-600 font-mono tracking-widest">CLASSIFIED ID: RD-{resolvedParams.slug.substring(0,6).toUpperCase()}</span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6`}>
            {article.title}
          </h1>
          
          <div className="flex items-center gap-3 text-sm text-gray-500 font-mono">
            <span className="text-purple-400">By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* Document Body */}
        <div className="bg-[#111111]/50 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light mb-8">
            {article.content.map((paragraph, index) => (
              <p key={index} className="pl-4 border-l border-purple-500/30 hover:border-purple-400 transition-colors">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* THE INTERACTIONS COMPONENT APPEARS HERE */}
          <Interactions id={`blog-${resolvedParams.slug}`} title={article.title} />

        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 flex items-center justify-between">
          <a href="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors font-mono font-bold uppercase tracking-widest text-xs group">
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
            Close File
          </a>
          <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">End of Transmission</span>
        </div>

      </article>
    </main>
  );
}