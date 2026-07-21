import { Space_Grotesk, Inter } from 'next/font/google';
import AskAI from '@/components/AskAI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] }); 

export default function PrivacyPage() {
  return (
    <main className={`w-full bg-[#030303] text-zinc-300 min-h-screen overflow-hidden relative pb-32 ${inter.className}`}>
      
      {/* Premium Soft Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.08),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 pt-40 relative z-10">
        
        {/* Document Header */}
        <div className="mb-14 border-b border-white/5 pb-12">
          <div className="flex items-center justify-between mb-8">
            <span className="inline-flex items-center gap-2 bg-white/5 text-zinc-300 text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
              {/* Pulsing Status Dot */}
              <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full shadow-[0_0_8px_rgba(212,212,216,0.8)] animate-pulse"></span>
              Legal Protocol
            </span>
            <span className="text-xs text-zinc-600 font-medium tracking-widest">REF: RD-PRIV-2026</span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5`}>
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-500 font-medium flex items-center gap-2">
            {/* Pulsing Date Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse"></span>
            Effective Date: July 2026
          </p>
        </div>
        
        <AskAI />
        
        {/* Document Body */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-16 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] space-y-12">
          
          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            {/* Pulsing Section Node */}
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>1. Our Commitment to Data Integrity</h3>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              At Reality Decoded, truth is our currency, but security is our foundation. This Privacy Policy is a formal disclosure of how we manage, store, and protect your digital footprint within our mainframe. When you access our investigative archive, you are engaging with a network that prioritizes data sovereignty and operational security. This policy covers all data interactions, whether you are a passive observer or an active whistleblower.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>2. Information Collection Protocols</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-6 text-[15px]">
              <strong className="text-zinc-200 font-semibold">Passive Telemetry:</strong> Like all sophisticated digital architectures, our servers automatically capture non-personally identifying information. This typically includes browser configurations, language preferences, referring nodes, the date/time of your request, and the specific architecture of the device you are using to access our network. We process this strictly to optimize our delivery systems and ensure compatibility across all digital platforms.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              <strong className="text-zinc-200 font-semibold">User-Provided Intel:</strong> If you voluntarily provide information via our contact forms, newsletter subscription, or secure submission channels, we retain only the data you explicitly provide. This information is treated as a classified asset.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>3. Cookie & AdSense Disclosure</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              To sustain the high-fidelity production of our investigations, we utilize third-party advertising services, including Google AdSense. These vendors serve advertisements based on your activity, both on Reality Decoded and across the wider internet. 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Specifically, Google uses the DART cookie to serve ads based on user interest data. Users have the right to opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" className="text-white hover:text-zinc-300 underline decoration-white/30 transition-colors">Google ad and content network privacy policy</a>. Our reliance on these cookies is purely for operational sustainability.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>4. Whistleblower Protection</h3>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              We operate a Secure Drop facility for field operatives. Submissions made through these encrypted pipelines do not log originating IP addresses. We guarantee that such communications are treated with the highest level of journalistic privilege. We will not compromise the identity of our confidential sources. We are committed to the protection of our intelligence assets at all costs.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>5. Data Disclosure</h3>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Reality Decoded maintains a "zero-trade" policy regarding your data. We do not sell, rent, or distribute personal information to third-party data brokers. Disclosure of information will only occur if we are served with a valid, legally binding court order or subpoena. In such instances, we retain the right to challenge such requests to the maximum extent of the law to safeguard the interests of our users and contributors.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>6. Contact Us</h3>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              If you have any questions about this Privacy Policy or our security protocols, please reach out via our general <a href="/contact" className="text-white hover:text-zinc-300 transition-colors underline decoration-white/30">Contact page</a> or email us directly at <a href="mailto:admin@realitydecoded.in" className="text-white hover:text-zinc-300 transition-colors underline decoration-white/30">admin@realitydecoded.in</a>.
            </p>
          </section>
        </div>
        
        <div className="mt-10 flex justify-end">
           <span className="text-[11px] text-zinc-600 font-medium uppercase tracking-widest">End of Document</span>
        </div>
      </div>
    </main>
  );
}