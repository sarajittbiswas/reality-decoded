// src/components/InvestigationsTicker.tsx
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

const tickerItems = [
  "SYSTEMIC CORRUPTION LEAKS",
  "POLITICAL BACKROOM DEALS",
  "CORPORATE OLIGARCHY EXPOSED",
  "WHISTLEBLOWER TRANSMISSIONS",
  "POWER & MANIPULATION UNMASKED",
  "INSTITUTIONAL DECEPTION",
  "UNEDITED SOCIAL REALITY"
];

export default function InvestigationsTicker() {
  return (
    // Removed background color and border-y to make it seamless
    <section className="relative w-full py-10 overflow-hidden">
      
      <style>{`
        @keyframes investigative-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-investigative-marquee {
          animation: investigative-marquee 40s linear infinite;
        }
        .animate-investigative-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Fade edges updated to match new global background */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Track */}
      <div className="flex w-max animate-investigative-marquee items-center gap-6">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <div 
            key={i} 
            className="relative group px-5 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(255,255,255,0.06)] cursor-default"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 group-hover:via-white/60 to-transparent transition-colors duration-300"></div>

            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-zinc-200 shadow-[0_0_8px_rgba(255,255,255,0.4)] animate-pulse transition-colors"></span>
              <span className={`${spaceGrotesk.className} text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors`}>
                {item}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}