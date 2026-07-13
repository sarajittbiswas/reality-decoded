"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ArchiveBoard({ videos, blogs }: { videos: any[], blogs: any[] }) {
  const [activeTab, setActiveTab] = useState<'videos' | 'blogs'>('videos');

  // Helper to extract YouTube Thumbnail
  const getYTImage = (url: string) => {
    if (!url || !url.includes('v=')) return '/yt_img.png';
    const id = url.split('v=')[1].split('&')[0];
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  const currentData = activeTab === 'videos' ? videos : blogs;

  return (
    <div className="w-full relative z-10">
      
      {/* 1. THE FUTURISTIC TOGGLE SWITCH */}
      <div className="flex justify-center mb-16">
        <div className="relative flex items-center bg-[#050505] border border-white/10 rounded-full p-1.5 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] w-full max-w-md">
          
          {/* The Glowing Sliding Pill */}
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-purple-600 to-purple-800 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_0_20px_rgba(168,85,247,0.6)]"
            style={{ transform: activeTab === 'videos' ? 'translateX(0)' : 'translateX(100%)' }}
          ></div>

          {/* Video Button */}
          <button 
            onClick={() => setActiveTab('videos')}
            className={`relative flex-1 py-3 text-xs md:text-sm font-mono font-bold uppercase tracking-widest rounded-full transition-colors duration-300 z-10 ${activeTab === 'videos' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Video Database
          </button>

          {/* Blog Button */}
          <button 
            onClick={() => setActiveTab('blogs')}
            className={`relative flex-1 py-3 text-xs md:text-sm font-mono font-bold uppercase tracking-widest rounded-full transition-colors duration-300 z-10 ${activeTab === 'blogs' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Decrypted Files
          </button>
        </div>
      </div>

      {/* 2. THE DYNAMIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[50vh]">
        {currentData.map((item, i) => {
          const isVideo = activeTab === 'videos';
          const targetUrl = isVideo ? `/watch/${item.id}` : `/blogs/${item.id}`;
          const imageUrl = isVideo ? getYTImage(item.url) : item.image;

          return (
            <Link href={targetUrl} key={item.id} className="block group animate-[fade-in-up_0.5s_ease-out_both]" style={{ animationDelay: `${i * 0.05}s` }}>
              <article className="relative bg-[#111111]/80 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/50 hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)] h-full flex flex-col">
                
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-20"></div>

                <div className="relative aspect-video w-full overflow-hidden bg-black">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-60"></div>
                  
                  {/* Hover Icon (Play for Video, File for Blog) */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <div className="w-14 h-14 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 transition-transform duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                      {isVideo ? (
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      )}
                    </div>
                  </div>
                  
                  <img src={imageUrl} alt={item.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                </div>

                <div className="p-5 flex-grow flex flex-col z-20 bg-[#111]/90">
                  <span className={`text-[10px] font-mono uppercase tracking-widest mb-2 border w-max px-2 py-0.5 rounded ${isVideo ? 'text-purple-400 border-purple-500/20 bg-purple-500/10' : 'text-red-400 border-red-500/20 bg-red-500/10'}`}>
                    {item.category || (isVideo ? 'Documentary' : 'Intel File')}
                  </span>
                  <h3 className={`${spaceGrotesk.className} font-bold text-lg leading-tight mb-2 text-gray-200 group-hover:text-white transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mt-auto leading-relaxed">
                    {item.excerpt || item.description || "Classified intel transmission. Access the full report."}
                    </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
      
    </div>
  );
}