// src/components/ArchiveBoard.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import AuthorHoverCard from '@/components/AuthorHoverCard';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export default function ArchiveBoard({ videos, blogs }: { videos: any[], blogs: any[] }) {
  const [activeTab, setActiveTab] = useState<'videos' | 'blogs'>('videos');

  const getYTImage = (url: string) => {
    if (!url || !url.includes('v=')) return '/yt_img.png';
    const id = url.split('v=')[1].split('&')[0];
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  };

  const currentData = activeTab === 'videos' ? videos : blogs;

  return (
    <div className="w-full relative z-10">
      
      {/* Sleek Metallic Toggle Switch */}
      <div className="flex justify-center mb-16">
        <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-full p-1.5 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] w-full max-w-md">
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 backdrop-blur-md rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20"
            style={{ transform: activeTab === 'videos' ? 'translateX(0)' : 'translateX(100%)' }}
          ></div>
          <button onClick={() => setActiveTab('videos')} className={`relative flex-1 py-3 text-xs md:text-sm font-semibold tracking-wider rounded-full transition-colors duration-300 z-10 ${activeTab === 'videos' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Video Database
          </button>
          <button onClick={() => setActiveTab('blogs')} className={`relative flex-1 py-3 text-xs md:text-sm font-semibold tracking-wider rounded-full transition-colors duration-300 z-10 ${activeTab === 'blogs' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
            Decrypted Files
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[50vh]">
        {currentData.map((item, i) => {
          const isVideo = activeTab === 'videos';
          const targetUrl = isVideo ? `/watch/${item.id}` : `/blogs/${item.id}`;
          const imageUrl = isVideo ? getYTImage(item.url) : item.image;

          return (
            <Link href={targetUrl} key={item.id} className="relative block group hover:z-50 animate-[fade-in-up_0.5s_ease-out_both]" style={{ animationDelay: `${i * 0.05}s` }}>
              
              {/* Premium Glass Card (overflow-visible to allow HoverCard to escape) */}
              <article className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[24px] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col h-full overflow-visible">
                
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-white/40 to-transparent transition-colors duration-500 z-20"></div>

                {/* Image Container (overflow-hidden explicitly placed here) */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-[23px] bg-zinc-900 border-b border-white/5">
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-80"></div>
                  
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-black text-white transition-all duration-300 shadow-lg">
                      {isVideo ? (
                        <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      )}
                    </div>
                  </div>
                  <img src={imageUrl} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                </div>

                <div className="p-6 flex-grow flex flex-col z-20 rounded-b-[23px] relative">
                  <span className={`${jetBrainsMono.className} text-[9px] font-bold uppercase tracking-widest mb-3 bg-white/10 text-zinc-200 border border-white/5 w-max px-2.5 py-1 rounded-sm`}>
                    {item.category || (isVideo ? 'Documentary' : 'Intel File')}
                  </span>
                  
                  <h3 className={`${spaceGrotesk.className} font-bold text-lg leading-snug mb-3 text-zinc-100 group-hover:text-white transition-colors line-clamp-2`}>
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-auto leading-relaxed mb-5 font-light">
                    {item.excerpt || item.description || "Classified intel transmission. Access the full report."}
                  </p>

                  {!isVideo && (
                    <div className="mt-auto border-t border-white/5 pt-4 flex items-center justify-between relative z-30">
                      {item.agent ? (
                        <AuthorHoverCard agent={item.agent}>
                          <div className="flex items-center gap-2.5 group/authboard">
                            <img src={item.agent.avatar || '/default-cover.png'} className="w-6 h-6 rounded-full border border-white/10 group-hover/authboard:border-white/30 transition-colors object-cover" />
                            <span className="text-xs text-zinc-400 group-hover/authboard:text-zinc-200 font-medium transition-colors">{item.agent.name.split(' ')[0]}</span>
                          </div>
                        </AuthorHoverCard>
                      ) : (
                        <span className="text-xs text-zinc-500 font-medium">By {item.author}</span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          );
        })}
      </div>
      
    </div>
  );
}