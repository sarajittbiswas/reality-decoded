import Link from 'next/link';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function NotFound() {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center relative overflow-hidden flex-col px-6">
      
      {/* Glitch & Float Animations */}
      <style>{`
        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 #ef4444, -0.05em -0.025em 0 #7e22ce, -0.025em 0.05em 0 #0a0a0a; }
          14% { text-shadow: 0.05em 0 0 #ef4444, -0.05em -0.025em 0 #7e22ce, -0.025em 0.05em 0 #0a0a0a; }
          15% { text-shadow: -0.05em -0.025em 0 #ef4444, 0.025em 0.025em 0 #7e22ce, -0.05em -0.05em 0 #0a0a0a; }
          49% { text-shadow: -0.05em -0.025em 0 #ef4444, 0.025em 0.025em 0 #7e22ce, -0.05em -0.05em 0 #0a0a0a; }
          50% { text-shadow: 0.025em 0.05em 0 #ef4444, 0.05em 0 0 #7e22ce, 0 -0.05em 0 #0a0a0a; }
          99% { text-shadow: 0.025em 0.05em 0 #ef4444, 0.05em 0 0 #7e22ce, 0 -0.05em 0 #0a0a0a; }
          100% { text-shadow: -0.025em 0 0 #ef4444, -0.025em -0.025em 0 #7e22ce, -0.025em -0.05em 0 #0a0a0a; }
        }
        .glitch-text {
          animation: glitch 1s linear infinite;
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .scanline-effect {
          animation: scanline 8s linear infinite;
        }
      `}</style>

      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-red-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/4 right-1/4 w-[30%] h-[30%] bg-purple-900/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* CRT Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden opacity-10">
        <div className="w-full h-32 bg-gradient-to-b from-transparent via-white to-transparent scanline-effect opacity-20"></div>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        
        {/* Glowing Status Pill */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-xs font-mono font-bold uppercase tracking-widest border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Signal Lost
        </div>

        {/* 404 Glitch Heading */}
        <h1 className={`${spaceGrotesk.className} text-7xl md:text-9xl font-black text-white tracking-tighter mb-2 glitch-text`}>
          404
        </h1>
        
        <h2 className={`${spaceGrotesk.className} text-2xl md:text-4xl font-bold uppercase text-gray-300 mb-8 tracking-widest`}>
          Transmission <span className="text-red-500">Classified</span>
        </h2>

        {/* Terminal Log Box */}
        <div className="w-full max-w-md bg-[#050505] border border-red-500/20 rounded-xl p-6 text-left mb-10 shadow-[0_0_30px_rgba(239,68,68,0.05)] relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
          
          <div className="font-mono text-xs md:text-sm tracking-wider leading-relaxed">
            <p className="text-gray-500 mb-2">SYSTEM_LOGS // REALITY_DECODED</p>
            <p className="text-red-400 mb-1">&gt; ERROR_CODE: 404_NOT_FOUND</p>
            <p className="text-gray-400 mb-1">&gt; TARGET_PATH: <span className="animate-pulse">_UNKNOWN_</span></p>
            <p className="text-gray-400 mb-4">&gt; STATUS: The requested intelligence has been deleted, moved, or restricted by higher authorities.</p>
            <p className="text-purple-400 animate-[pulse_2s_ease-in-out_infinite]">&gt; Awaiting manual override...</p>
          </div>
        </div>

        {/* Back to Home CTA */}
        <Link 
          href="/" 
          className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest bg-white text-black transition-all duration-300 hover:bg-purple-500 hover:text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] active:scale-95 border border-transparent hover:border-purple-400"
        >
          Re-establish Connection
          <svg className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </Link>

      </div>
    </main>
  );
}