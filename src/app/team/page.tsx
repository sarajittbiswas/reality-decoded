import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

// Initialize the premium font
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// 1. YOUR TEAM DATA
// Update this array with your actual team members, their roles, and image URLs.
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
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      
      {/* Scroll Animation Styles (Same as homepage for consistency) */}
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
        
        {/* Ambient Purple Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-64 bg-purple-900/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="mb-4 inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-bold uppercase tracking-widest border border-purple-500/20">
            The Syndicate
          </span>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white`}>
            Meet The <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              Truth Seekers
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
            We are a decentralized team of journalists, analysts, and producers dedicated to decoding reality and bringing authentic stories to the surface.
          </p>
        </div>
      </section>

      {/* TEAM GRID SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pb-40 z-10 scroll-reveal">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {teamMembers.map((member, index) => (
            <article 
              key={index} 
              className="
                group relative flex flex-col rounded-3xl overflow-hidden
                bg-[#111111]/80 backdrop-blur-xl 
                border border-white/5 
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:bg-[#161616]/90 hover:border-purple-500/50
                shadow-[0_5px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(168,85,247,0.2)]
              "
            >
              {/* Top Glass Edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 group-hover:via-purple-500/50 to-transparent transition-colors duration-500 z-20"></div>
              
              {/* Image Container: Grayscale by default, full color on hover */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#1a1a1a] border-b border-white/5">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {/* Subtle gradient overlay to blend image into the card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 to-transparent"></div>
              </div>
              
              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow relative z-10 -mt-8">
                <h3 className={`${spaceGrotesk.className} font-bold text-2xl text-white group-hover:text-purple-300 transition-colors duration-300 mb-1`}>
                  {member.name}
                </h3>
                
                <span className="text-sm font-bold uppercase tracking-wider text-red-500 mb-4">
                  {member.role}
                </span>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {member.bio}
                </p>
                
                {/* Social Icons (Twitter & LinkedIn) */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:scale-110 transition-all duration-300">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:scale-110 transition-all duration-300">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
          
        </div>
      </section>
    </main>
  );
}