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
          <Link 
  href="/" 
  className="
    group relative px-2 py-1 text-sm font-bold text-gray-300 
    transition-all duration-300 ease-out 
    hover:text-purple-400 hover:scale-105 
    hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
  "
>
  Home
  {/* The glowing underline that slides out from the center on hover */}
  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_12px_rgba(168,85,247,0.9)]"></span>
</Link>
          <Link 
  href="/videos" 
  className="
    group relative px-2 py-1 text-sm font-bold text-gray-300 
    transition-all duration-300 ease-out 
    hover:text-purple-400 hover:scale-105 
    hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
  "
>
  Videos
  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_12px_rgba(168,85,247,0.9)]"></span>
</Link>
          <Link 
  href="/articles" 
  className="
    group relative px-2 py-1 text-sm font-bold text-gray-300 
    transition-all duration-300 ease-out 
    hover:text-purple-400 hover:scale-105 
    hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
  "
>
  Articles
  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_12px_rgba(168,85,247,0.9)]"></span>
</Link>

<Link 
  href="/contact" 
  className="
    group relative px-2 py-1 text-sm font-bold text-gray-300 
    transition-all duration-300 ease-out 
    hover:text-purple-400 hover:scale-105 
    hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]
  "
>
  Contact Us
  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center shadow-[0_0_12px_rgba(168,85,247,0.9)]"></span>
</Link>

          {/* Hover Expandable Search Form (Upgraded to Cyberpunk Purple) */}
<form onSubmit={handleSearch} className="group flex items-center bg-transparent hover:bg-[#111111]/80 hover:backdrop-blur-md rounded-full transition-all duration-500 border border-transparent hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] overflow-hidden">
  <input 
    type="text" 
    placeholder="Search..." 
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-0 bg-transparent text-white placeholder-gray-500 caret-purple-500 focus:outline-none transition-all duration-500 group-hover:w-40 group-hover:pl-4 py-2 text-sm"
  />
  <button type="submit" className="p-2.5 text-gray-300 hover:text-purple-400 transition-all duration-300 ease-out cursor-pointer shrink-0 hover:scale-110 active:scale-95">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
  </button>
</form>

         {/* Big CTA Button */}
          <Link 
  href="/share" 
  className="
    group relative inline-flex items-center justify-center
    px-6 py-2.5 rounded-full font-bold text-sm tracking-wide
    bg-white text-red-600
    transition-all duration-300 ease-out
    hover:bg-black hover:text-red-500 hover:scale-105
    hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
    active:scale-95
    border border-transparent hover:border-purple-500/50
  "
>
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