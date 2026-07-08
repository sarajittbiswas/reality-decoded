"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Sends the user to the search page with their query
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false); // Closes the mobile menu if they searched from their phone
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-/20 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold tracking-tighter flex items-center gap-1">
          <img src="/final_no_bg.png" alt="Reality Decoded Logo" className="w-13 h-13 object-contain" />
          <span className="text-white">realitydecoded</span>
        </Link>

        {/* Desktop Links + Search */}
        <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/videos" className="hover:text-white transition-colors">Videos</Link>
          <Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link>

          {/* Hover Expandable Search Form (NOW CONNECTED!) */}
          <form onSubmit={handleSearch} className="group flex items-center bg-transparent hover:bg-black/50 rounded-full transition-all duration-500 border border-transparent hover:border-white/20 overflow-hidden">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-0 bg-transparent text-white placeholder-gray-400 focus:outline-none transition-all duration-500 group-hover:w-40 group-hover:pl-4 py-2 text-sm"
            />
            <button type="submit" className="p-2.5 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>

          {/* Big CTA Button */}
          <Link href="/share" className="bg-white text-red-600 px-6 py-2.5 rounded-full font-bold hover:bg-black transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]">
            Share Your Story
          </Link>


        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 space-y-5 shadow-2xl">
          
          {/* Mobile Search Form (NOW CONNECTED!) */}
          <form onSubmit={handleSearch} className="flex items-center bg-[#1a1a1a] rounded-full border border-white/10 px-4 py-2">
            <input 
              type="text" 
              placeholder="Search cases..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent w-full text-white focus:outline-none text-sm" 
            />
            <button type="submit" className="text-gray-400 hover:text-white shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>

          <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-300 hover:text-white">Home</Link>
          <Link href="/videos" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-300 hover:text-white">Videos</Link>
          <Link href="/blogs" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-300 hover:text-white">Blogs</Link>
          <Link href="/share" onClick={() => setIsOpen(false)} className="block w-full text-center bg-white text-red-600 px-6 py-3 rounded-full font-bold hover:bg-gray-200 mt-4">Share Your Story</Link>
        </div>
      )}
    </nav>
  );
}