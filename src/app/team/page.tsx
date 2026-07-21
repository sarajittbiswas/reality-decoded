import Link from 'next/link';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const teamMembers = [
  {
    name: "Alex Vance",
    role: "Lead Investigator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    bio: "Former cybersecurity analyst dedicated to tracking digital footprints and uncovering hidden tech narratives.",
    twitter: "#",
    linkedin: "#"
  },
  {
    name: "Sarah Chen",
    role: "Head of Production",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    bio: "Award-winning documentary filmmaker ensuring every investigation is presented with cinematic clarity.",
    twitter: "#",
    linkedin: "#"
  },
  {
    name: "Marcus Thorne",
    role: "Data Journalist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    bio: "Specializes in scraping, analyzing, and deciphering massive datasets to find the stories they don't want told.",
    twitter: "#",
    linkedin: "#"
  },
  {
    name: "Elena Rostova",
    role: "Legal Researcher",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    bio: "Navigates complex corporate law and FOIA requests to bring hard evidence to the forefront.",
    twitter: "#",
    linkedin: "#"
  }
];

export default function TeamPage() {
  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen relative overflow-hidden ${inter.className}`}>
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .scroll-reveal {
          animation: fade-in-up 1s ease-out both;
          animation-timeline: view();
          animation-range: entry 5% cover 20%;
        }
        .load-reveal {
          animation: fade-in-up 1s ease-out forwards;
        }
        @supports not (animation-timeline: view()) {
          .scroll-reveal {
            animation: fade-in-up 1s ease-out forwards;
          }
        }
      `}</style>

      {/* HEADER SECTION */}
      <section className="relative w-full pt-40 pb-20 px-6 load-reveal flex flex-col items-center text-center">
        <div className="relative z-10 max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-6 ${jetBrainsMono.className}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
            The Syndicate
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white`}>
            Meet The <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 drop-shadow-sm">
              Truth Seekers
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 font-light max-w-2xl mx-auto mb-10">
            We are a decentralized team of journalists, analysts, and producers dedicated to decoding reality and bringing authentic stories to the surface.
          </p>
          
          {/* CROSS-LINK WITH FAST BEAM GLOW */}
          <div className="relative group inline-block mt-4">
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-shadow duration-500 pointer-events-none">
              
              {/* 🚨 BULLETPROOF FIX: Native Tailwind animate-spin with overridden duration */}
              <div className="absolute inset-[-200%] z-0 opacity-60 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_70%,rgba(255,255,255,0.8)_100%)] animate-spin [animation-duration:4s] transition-opacity duration-500"></div>
              
              <div className="absolute inset-[1.5px] bg-[#050505] rounded-full z-10"></div>
              <div className="absolute inset-[1.5px] bg-white/[0.02] backdrop-blur-md rounded-full z-10"></div>
            </div>
            
            <Link href="/author" className={`${jetBrainsMono.className} relative z-20 flex items-center justify-center gap-3 px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors`}>
              <span>View Content Writers Team</span>
              <span className="text-sm leading-none group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

        </div>
      </section>

      {/* TEAM GRID SECTION (Upgraded Beam Glow Architecture) */}
      <section className="relative max-w-7xl mx-auto px-6 pb-40 z-10 scroll-reveal">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {teamMembers.map((member, index) => (
            
            <article key={index} className="relative group block h-full flex flex-col hover:z-50 hover:-translate-y-2 transition-transform duration-500">
              
              {/* BACKGROUND BEAM LAYER */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] transition-shadow duration-500 pointer-events-none">
                
                {/* 🚨 BULLETPROOF FIX: Native Tailwind animate-spin with overridden duration */}
                <div className="absolute inset-[-150%] z-0 opacity-60 group-hover:opacity-100 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.7)_100%)] animate-spin [animation-duration:6s] transition-opacity duration-500"></div>
                
                {/* The Solid Obsidian Core */}
                <div className="absolute inset-[1.5px] bg-[#050505] rounded-[30.5px] z-10"></div>
                {/* The Frosted Glass Overlay */}
                <div className="absolute inset-[1.5px] bg-white/[0.02] border border-white/5 group-hover:border-transparent rounded-[30.5px] z-10 transition-colors duration-500"></div>
              </div>

              {/* FOREGROUND CONTENT LAYER */}
              <div className="relative flex flex-col flex-grow h-full z-20 p-[1.5px]">
                <div className="absolute inset-x-8 top-[3px] h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-white/40 to-transparent transition-colors duration-500 z-30"></div>
                
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0a0a0a] rounded-t-[29px] border-b border-white/5">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                </div>
                
                <div className="px-8 pb-8 pt-6 flex flex-col flex-grow relative z-10 bg-[#050505] rounded-b-[29px]">
                  <h3 className={`${spaceGrotesk.className} font-bold text-2xl text-zinc-100 group-hover:text-white transition-colors duration-300 mb-2`}>
                    {member.name}
                  </h3>
                  
                  <span className={`${jetBrainsMono.className} text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4`}>
                    {member.role}
                  </span>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light flex-grow">
                    {member.bio}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto pt-5 border-t border-white/5">
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white hover:scale-110 transition-all duration-300">
                      <span className="sr-only">Twitter</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white hover:scale-110 transition-all duration-300">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

            </article>
          ))}
          
        </div>
      </section>
    </main>
  );
}