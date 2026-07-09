import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function TermsPage() {
  return (
    <main className="w-full bg-[#0a0a0a] text-white min-h-screen overflow-hidden relative pb-32">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-purple-900/10 blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 pt-40 relative z-10">
        
        {/* Document Header */}
        <div className="mb-12 border-b border-white/5 pb-10">
          <div className="flex items-center justify-between mb-8">
            <span className="inline-block bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono font-bold px-3 py-1 rounded uppercase tracking-widest">
              Legal Protocol
            </span>
            <span className="text-xs text-gray-600 font-mono tracking-widest">CLASSIFIED ID: RD-TERMS-2026</span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase`}>
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Service.</span>
          </h1>
          <p className="text-sm text-gray-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            Last Updated: July 2026
          </p>
        </div>

        {/* Document Body */}
        <div className="bg-[#111111]/50 backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-3xl shadow-2xl space-y-12 relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-20"></div>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>1. Acceptance of Terms</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              By accessing and using Reality Decoded (the "Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>2. Intellectual Property</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              All original content, documentaries, investigations, and assets produced by Reality Decoded are protected by copyright. You may not modify, publish, transmit, or participate in the transfer or sale of, create derivative works from, or in any way exploit, any of the content, in whole or in part, without explicit permission.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>3. User Submissions & Whistleblower Data</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              When submitting information via our Secure Drop portal, you retain all ownership rights to your original files. By explicitly granting "Publication Rights" during submission, you grant Reality Decoded a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your anonymous story across our platforms.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>4. Disclaimer of Liability</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              The investigative content provided on this Platform is for informational purposes only. While we rigorously verify our intelligence, Reality Decoded assumes no responsibility or liability for any errors or omissions in the content of this site.
            </p>
          </section>

        </div>

        {/* Document Footer */}
        <div className="mt-12 flex justify-end">
           <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">End of Document</span>
        </div>

      </div>
    </main>
  );
}