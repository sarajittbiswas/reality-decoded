"use client";

import { useState, useEffect, useRef } from 'react';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// Data shape expected from the Server mapping
type Author = {
  slug: string;
  name: string;
  location: string;
  image: string;
};

export default function AuthorsClient({ initialAuthors }: { initialAuthors: Author[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time filtering logic
  const filteredAuthors = initialAuthors.filter(author => {
    const query = searchQuery.toLowerCase();
    const matchesName = author.name.toLowerCase().includes(query);
    const matchesLocation = author.location.toLowerCase().includes(query);
    return matchesName || matchesLocation;
  });

  return (
    <main className="w-full bg-[#000000] text-white min-h-screen overflow-hidden pt-32 pb-32">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-medium text-white tracking-tight mb-6 leading-tight`}>
            Humans<br />behind Reality Decoded
          </h1>
          <p className="text-[#888888] text-base md:text-lg mb-8 max-w-xl mx-auto font-light">
            We're a team of <strong className="text-white font-medium">{initialAuthors.length} operatives</strong> who believe in decoding artificial narratives and finding the signal in the noise.
          </p>
{/* CROSS-LINK TO TEAM */}
<Link href="/team" className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-10">
  <span>View Leadership Team</span>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
</Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/careers" 
              className="flex items-center justify-center gap-2 bg-[#111111] border border-white/10 text-white text-[14px] font-medium px-5 py-2.5 rounded-full hover:bg-[#1a1a1a] hover:border-white/20 transition-all duration-300 w-full sm:w-auto"
            >
              Add yourself to the list
              <svg className="w-3.5 h-3.5 text-[#888]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <div className="relative group w-full sm:w-64">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] group-focus-within:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border border-white/10 text-[#ededed] text-[14px] pl-10 pr-14 py-2.5 rounded-full outline-none focus:border-white/30 transition-all duration-300 w-full placeholder:text-[#666]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#111] border border-white/5 rounded px-1.5 py-0.5 text-[10px] text-[#666] font-mono pointer-events-none">
                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
                K
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-4xl mx-auto mt-24 min-h-[400px]">
          {filteredAuthors.length > 0 ? (
            filteredAuthors.map((author) => (
              <Link 
                key={author.slug} 
                href={`/author/${author.slug}`}
                className="flex flex-col items-center group cursor-pointer w-28 md:w-32"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-5 bg-[#111] border border-transparent group-hover:border-white/10 transition-all duration-300">
                  <img 
                    src={author.image} 
                    alt={author.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-[#ededed] font-medium text-[15px] mb-1 group-hover:text-white transition-colors text-center">
                  {author.name}
                </h3>
                <p className="text-[#888888] text-[13px] text-center">
                  {author.location}
                </p>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center w-full mt-10">
              <div className="w-16 h-16 rounded-full bg-[#111] border border-white/5 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 14v.01M10 10a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h3 className="text-[#ededed] font-medium text-[15px] mb-1">No operatives found</h3>
              <p className="text-[#888888] text-[13px]">We couldn't find anyone matching "{searchQuery}".</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}