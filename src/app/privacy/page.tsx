import { Space_Grotesk } from 'next/font/google';
import AskAI from '@/components/AskAI';
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
<AskAI />
        {/* Document Body */}
        <div className="bg-[#111111]/50 backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-3xl shadow-2xl space-y-12 relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-20"></div>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>1. Our Commitment to Data Integrity</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              At Reality Decoded, truth is our currency, but security is our foundation. This Privacy Policy is a formal disclosure of how we manage, store, and protect your digital footprint within our mainframe. When you access our investigative archive, you are engaging with a network that prioritizes data sovereignty and operational security. This policy covers all data interactions, whether you are a passive observer or an active whistleblower.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>2. Information Collection Protocols</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-6">
              <strong>Passive Telemetry:</strong> Like all sophisticated digital architectures, our servers automatically capture non-personally identifying information. This typically includes browser configurations, language preferences, referring nodes, the date/time of your request, and the specific architecture of the device you are using to access our network. We process this strictly to optimize our delivery systems and ensure compatibility across all digital platforms.
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              <strong>User-Provided Intel:</strong> If you voluntarily provide information via our contact forms, newsletter subscription, or secure submission channels, we retain only the data you explicitly provide. This information is treated as a classified asset.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>3. Cookie & AdSense Disclosure</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              To sustain the high-fidelity production of our investigations, we utilize third-party advertising services, including Google AdSense. These vendors serve advertisements based on your activity, both on Reality Decoded and across the wider internet. 
            </p>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              Specifically, Google uses the DART cookie to serve ads based on user interest data. Users have the right to opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" className="text-purple-400 hover:text-purple-300 underline">Google ad and content network privacy policy</a>. Our reliance on these cookies is purely for operational sustainability, and we do not influence the specific ad content served to you by these third parties.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>4. Whistleblower Protection</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              We operate a Secure Drop facility for field operatives. Submissions made through these encrypted pipelines do not log originating IP addresses. We guarantee that such communications are treated with the highest level of journalistic privilege. We will not compromise the identity of our confidential sources. We are committed to the protection of our intelligence assets at all costs.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>5. Data Disclosure</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              Reality Decoded maintains a "zero-trade" policy regarding your data. We do not sell, rent, or distribute personal information to third-party data brokers. Disclosure of information will only occur if we are served with a valid, legally binding court order or subpoena. In such instances, we retain the right to challenge such requests to the maximum extent of the law to safeguard the interests of our users and contributors.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">

<div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>

<h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>6. Contact Us</h3>

<p className="leading-relaxed text-gray-400 font-light">

If you have any questions about this Privacy Policy or our security protocols, please reach out via our general <a href="/contact" className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-500/30 underline-offset-4">Contact page</a> or email us directly at <a href="mailto:admin@realitydecoded.in" className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-500/30 underline-offset-4">admin@realitydecoded.in</a>.

</p>

</section>

        </div>
        
        <div className="mt-12 flex justify-end">
           <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">End of Document</span>
        </div>
      </div>
    </main>
  );
}