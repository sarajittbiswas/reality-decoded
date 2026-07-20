"use client";
import { useState } from 'react';

export default function ExpandableBio({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!bio) return null;

  return (
    <div className="mt-4 mb-8 w-full border-t border-white/10 pt-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Bio</h3>
      <div className="relative">
        <p className={`text-sm text-gray-300 leading-relaxed font-mono transition-all duration-300 ${expanded ? '' : 'line-clamp-3'}`}>
          {bio}
        </p>
        {bio.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-purple-400 hover:text-purple-300 text-[10px] font-bold tracking-widest uppercase mt-3 transition-colors bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg flex items-center gap-2"
          >
            {expanded ? 'Collapse Bio' : 'Read Full Bio'}
          </button>
        )}
      </div>
    </div>
  );
}