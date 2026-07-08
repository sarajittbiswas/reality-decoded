import { notFound } from 'next/navigation';

// This tells Next.js to pre-build these exact 3 articles as tiny, static files
export function generateStaticParams() {
  return [
    { slug: 'corporate-shell-games' },
    { slug: 'digital-breadcrumbs' },
    { slug: 'factory-conditions' }
  ];
}

// Updated Mock database to match our new, highly-accurate article links
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
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <article className="max-w-3xl mx-auto px-6">
        
        <div className="mb-8 border-b border-white/10 pb-6">
          <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest mb-4">
            {article.type}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 font-mono">
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light">
          {article.content.map((paragraph, index) => (
            <p key={index} className="first-letter:text-5xl first-letter:font-bold first-letter:text-red-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1 border-l border-transparent pl-0">
              {index === 0 ? paragraph : paragraph.replace(/^"/, '')}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <a href="/blogs" className="inline-flex items-center gap-2 text-red-500 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
            &larr; Back to Field Reports
          </a>
        </div>

      </article>
    </main>
  );
}