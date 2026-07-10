import { notFound } from 'next/navigation';
import { Space_Grotesk } from 'next/font/google';
import Interactions from '@/components/Interactions';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export function generateStaticParams() {
  return [
    { slug: 'corporate-shell-games' },
    { slug: 'digital-breadcrumbs' },
    { slug: 'factory-conditions' },
    { slug: 'phantom-networks' },
    { slug: 'zero-day-economy' }
  ];
}

// 1. ADDED 'image' PROPERTY TO EVERY ARTICLE
const MOCK_ARTICLES: Record<string, { title: string; author: string; date: string; type: string; image: string; content: string[] }> = {
  'corporate-shell-games': {
    title: 'Corporate Shell Games: Tracing the Offshore Billions',
    author: 'Reality Decoded Team',
    date: 'July 8, 2026',
    type: 'Deep Dive',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop', // Financial/Data vibe
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
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop', // Matrix/Code vibe
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
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop', // Industrial/Tech vibe
    content: [
      'The following report was submitted via our secure transmission protocol and has been structurally verified by our team using logistical metadata.',
      '"I have worked on the main assembly floor for over three years. The public relations videos showing pristine, automated environments are entirely staged. Twenty-four hours before a state inspection, hazardous manufacturing biproducts are physically trucked to a secondary, unlisted storage warehouse facility miles away."',
      '"Those of us working the line are exposed to chemical signatures without standard protective gear. When we raised complaints internally, our credentials were flag-checked. I am sharing this because the public deserves to know the physical cost of the devices in their pockets."'
    ]
  },
  'phantom-networks': {
    title: 'Phantom Networks: The Invisible ISP in Your City',
    author: 'Cyber Intelligence Unit',
    date: 'July 9, 2026',
    type: 'Investigation',
    image: 'https://images.unsplash.com/photo-1614064010834-58e1c68b6b0b?q=80&w=1000&auto=format&fit=crop', // Dark City/Signal vibe
    content: [
      'Look at your phone right now. You assume it is connected to a legitimate cell tower. But over the last 72 hours, our field team detected over 40 unauthorized "Stingray" devices masking themselves as standard cell towers in major metropolitan areas.',
      'These devices force nearby phones to connect to them, allowing the operators to intercept metadata, location data, and unencrypted texts without a warrant.',
      'Who is operating them? We tracked the procurement records of the hardware components. The trail doesn’t lead to local law enforcement—it leads to private, unregulated intelligence brokers.'
    ]
  },
  'zero-day-economy': {
    title: 'The Zero-Day Economy: Who Profits from Insecurity',
    author: 'Reality Decoded Team',
    date: 'July 10, 2026',
    type: 'Deep Dive',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000&auto=format&fit=crop', // Hacker/Server vibe
    content: [
      'A "zero-day" is a software vulnerability that the creator doesn’t know about yet. This means there is zero days to fix it before it gets exploited.',
      'Traditionally, hackers sold these on the dark web. Today, the biggest buyers are legitimate corporations and government contractors, creating a multi-million dollar gray market.',
      'Our latest financial analysis reveals that the budget for acquiring these exploits has tripled in the last two years. We are breaking down the exact supply chain of a cyber weapon.'
    ]
  }
};

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = MOCK_ARTICLES[resolvedParams.slug];

  if (!article) {
    notFound();
  }

  const relatedSlugs = Object.keys(MOCK_ARTICLES)
    .filter(slug => slug !== resolvedParams.slug)
    .slice(0, 3);
  
  const relatedArticles = relatedSlugs.map(slug => ({
    slug,
    ...MOCK_ARTICLES[slug]
  }));

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[30%] bg-purple-900/10 blur-[120px] pointer-events-none z-0"></div>

      <article className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Document Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono font-bold px-3 py-1 rounded uppercase tracking-widest">
              {article.type}
            </span>
            <span className="text-xs text-gray-600 font-mono tracking-widest">ID: RD-{resolvedParams.slug.substring(0,6).toUpperCase()}</span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6`}>
            {article.title}
          </h1>
          
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 font-mono">
            <span className="text-purple-400">By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* 2. CINEMATIC HERO IMAGE */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 border border-white/5 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80"></div>
           <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10"></div>
           <img 
             src={article.image} 
             alt={article.title} 
             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
           />
        </div>

        {/* Document Body */}
        <div className="max-w-3xl mx-auto bg-[#111111]/50 backdrop-blur-sm border border-white/5 p-8 md:p-12 rounded-2xl shadow-xl">
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light mb-8">
            {article.content.map((paragraph, index) => (
              <p key={index} className="pl-4 border-l border-purple-500/30 hover:border-purple-400 transition-colors">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* THE INTERACTIONS COMPONENT */}
          <Interactions id={`blog-${resolvedParams.slug}`} title={article.title} />
        </div>

        {/* Footer Navigation */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 flex items-center justify-between mb-16">
          <a href="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors font-mono font-bold uppercase tracking-widest text-xs group">
            <span className="transform group-hover:-translate-x-1 transition-transform">&larr;</span> 
            Close File
          </a>
          <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">End of Transmission</span>
        </div>

        {/* RELATED INTEL BLOCK */}
        {relatedArticles.length > 0 && (
          <div className="border-t border-white/5 pt-12 relative z-10 max-w-4xl mx-auto">
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white uppercase mb-8 flex items-center gap-3`}>
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></span>
              Related Intelligence
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <a href={`/blogs/${related.slug}`} key={related.slug} className="group block h-full">
                  <div className="bg-[#111] border border-white/5 rounded-xl p-5 h-full flex flex-col hover:border-purple-500/50 hover:bg-[#161616] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-20"></div>
                    
                    {/* 3. RELATED ARTICLE THUMBNAIL */}
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4 border border-white/5 group-hover:border-purple-500/30 transition-colors bg-black">
                       <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10"></div>
                       <img 
                         src={related.image} 
                         alt={related.title} 
                         className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                       />
                    </div>

                    <span className="text-[10px] font-mono text-gray-500 group-hover:text-purple-400 uppercase tracking-widest mb-2 block transition-colors">
                      {related.type}
                    </span>
                    <h4 className={`${spaceGrotesk.className} font-bold text-gray-200 group-hover:text-white transition-colors line-clamp-2 text-sm md:text-base leading-snug mb-4`}>
                      {related.title}
                    </h4>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest group-hover:text-purple-400 transition-colors">
                      Decrypt <span className="ml-2 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </article>
    </main>
  );
}