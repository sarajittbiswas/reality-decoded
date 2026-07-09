import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function PrivacyPage() {
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
            <span className="text-xs text-gray-600 font-mono tracking-widest">CLASSIFIED ID: RD-PRIV-2026</span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase`}>
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Policy.</span>
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
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>1. Our Commitment to Privacy</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              At Reality Decoded, truth is our currency, but security is our foundation. This Privacy Policy explains how we collect, use, and protect your information when you visit our website, consume our content, or submit intelligence through our Secure Drop portal.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>2. Information We Collect</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              <strong className="text-purple-300 font-mono text-sm uppercase tracking-wider block mb-1">A. Passive Information</strong> 
              Like most digital platforms, we collect non-personally identifying information that web browsers and servers typically make available, such as browser type, language preference, and the date/time of each visitor request. We use this exclusively to understand how visitors use our website.
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              <strong className="text-purple-300 font-mono text-sm uppercase tracking-wider block mb-1">B. Submitted Information</strong> 
              If you use our Contact form or Secure Drop portal, we collect the exact information you choose to provide. 
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>3. Whistleblower & Source Protection</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              When utilizing our Secure Drop portal to share stories or upload files, you have the right to remain entirely anonymous. We do not log IP addresses on the Secure Drop submission endpoint. Any files or communications sent to us are treated with the highest degree of confidentiality and journalistic privilege. If you choose not to provide an alias or email, we will have no way to trace the submission back to you.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>4. Data Sharing and Disclosure</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              We do not sell, rent, or trade your personal information to third parties. We will only disclose information if absolutely required to do so by a binding legal subpoena, and even then, we will aggressively fight to protect the identities of our confidential sources to the maximum extent permitted by law.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>5. Contact Us</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              If you have any questions about this Privacy Policy or our security protocols, please reach out via our general <a href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-500/30 underline-offset-4">Contact page</a> or email us directly at <a href="mailto:admin@realitydecoded.in" className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-500/30 underline-offset-4">admin@realitydecoded.in</a>.
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