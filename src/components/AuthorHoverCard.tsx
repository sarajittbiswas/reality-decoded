"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthorHoverCard({ agent, children }: { agent: any, children: React.ReactNode }) {
  const [localTime, setLocalTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!agent?.timezone) return;
    const updateTime = () => {
      try {
        const timeString = new Date().toLocaleTimeString('en-US', {
          timeZone: agent.timezone,
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        setLocalTime(`${timeString.toLowerCase()} (local time)`);
      } catch (e) {
        setLocalTime("");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [agent?.timezone]);

  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/author/${agent.id}`);
  };

  const preventParentLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 🚨 THE FIX: Safe external navigation that doesn't use <a> tags
  const openSocial = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!agent) {
    return <>{children}</>;
  }

  return (
    <div className="group/card relative inline-block" onClick={preventParentLink}>
      <div className="cursor-pointer">
        {children}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible transition-all duration-300 z-50">
        <div className="bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-5 transform scale-95 group-hover/card:scale-100 transition-transform duration-300 origin-bottom">
          
          <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
            <img 
              src={agent.avatar || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=100&auto=format&fit=crop'} 
              alt={agent.name} 
              className="w-12 h-12 rounded-full object-cover border border-white/10"
            />
            <div>
              <div className="text-white font-bold text-sm tracking-wide">{agent.name}</div>
              {agent.role && <div className="text-gray-400 text-xs mt-0.5">{agent.role}</div>}
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-gray-300 font-mono mb-5">
            {agent.location && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {agent.location}
              </div>
            )}
            {localTime && (
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {localTime}
              </div>
            )}
            
            <div className="flex flex-wrap gap-3 pt-2">
              {agent.github && (
                <div onClick={() => openSocial(`https://github.com/${agent.github}`)} className="text-gray-500 hover:text-white transition-colors cursor-pointer" title="GitHub">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </div>
              )}
              {agent.twitter && (
                <div onClick={() => openSocial(`https://twitter.com/${agent.twitter}`)} className="text-gray-500 hover:text-white transition-colors cursor-pointer" title="Twitter / X">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.25H5.078z"/></svg>
                </div>
              )}
              {agent.linkedin && (
                <div onClick={() => openSocial(`https://linkedin.com/in/${agent.linkedin}`)} className="text-gray-500 hover:text-white transition-colors cursor-pointer" title="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
              )}
              {agent.instagram && (
                <div onClick={() => openSocial(`https://instagram.com/${agent.instagram}`)} className="text-gray-500 hover:text-white transition-colors cursor-pointer" title="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
              )}
              {agent.facebook && (
                <div onClick={() => openSocial(`https://facebook.com/${agent.facebook}`)} className="text-gray-500 hover:text-white transition-colors cursor-pointer" title="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </div>
              )}
              {agent.reddit && (
                <div onClick={() => openSocial(`https://reddit.com/user/${agent.reddit}`)} className="text-gray-500 hover:text-white transition-colors cursor-pointer" title="Reddit">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                </div>
              )}
            </div>
          </div>

          <div 
            onClick={handleNavigation}
            className="block w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors text-center text-xs font-bold uppercase tracking-widest py-2.5 rounded-lg mt-2 cursor-pointer"
          >
            See more
          </div>
        </div>
      </div>
    </div>
  );
}