import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import AskAI from '@/components/AskAI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const runtime = 'edge';

export const metadata = {
  title: 'Disclaimer | Reality Decoded',
  description: 'Official legal disclaimer and operational liability limitations for the Reality Decoded network.',
};

export default function DisclaimerPage() {
  return (
    <main className={`min-h-screen bg-[#030303] text-zinc-300 pt-32 pb-24 px-6 relative overflow-hidden ${inter.className}`}>
      
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(153,27,27,0.06),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center border-b border-white/5 pb-12 mt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-zinc-300 text-[10px] font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full shadow-[0_0_8px_rgba(212,212,216,0.8)] animate-pulse"></span>
            Legal Protocols
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight`}>
            Disclaimer
          </h1>
          <p className="text-zinc-500 text-sm font-medium flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse"></span>
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        
        <AskAI />
        
        {/* Content Body */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-16 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] space-y-12">
          
          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              1. General Information & Nature of Intel
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              The transmissions, articles, audiovisual broadcasts, data drops, and all other informational materials (collectively referred to as "Content") provided on the Reality Decoded network are intended exclusively for general informational, educational, and journalistic purposes. Reality Decoded operates as an independent intelligence syndicate dedicated to analyzing cybernetics, societal structures, global narratives, and technological advancements. 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              While our operatives, agents, and editorial team strive to ensure the highest fidelity of the intelligence we publish, the digital and geopolitical landscapes are inherently volatile. Information evolves rapidly. Therefore, we make no express or implied representations, warranties, or guarantees regarding the absolute accuracy, completeness, validity, reliability, or current relevance of the Content. Any reliance you place on such information is strictly at your own operational risk.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              2. Professional Advice Exemption
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Reality Decoded is an investigative platform. The Content provided herein does not constitute, and should never be construed as, professional advice. This includes, but is not limited to, legal, financial, medical, cybersecurity, psychological, or operational advice. 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Our investigations into cybersecurity vulnerabilities, financial systems, or legal frameworks are strictly for educational awareness. You must not use the information on this network to circumvent security protocols, make high-risk financial investments, or navigate legal disputes without consulting certified, licensed professionals in those specific jurisdictions. Reality Decoded and its affiliated operatives disclaim any and all liability for actions taken or not taken based on the contents of this site.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              3. External Nodes & Third-Party Surveillance
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              During the course of our investigations, Reality Decoded frequently intercepts and links to external websites, third-party nodes, and decentralized archives that are completely outside of our jurisdiction and control. These hyperlinked external destinations are provided solely for reference, source citation, and your convenience in verifying our intelligence.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              We do not monitor, endorse, warrant, or guarantee the privacy protocols, security measures, or factual accuracy of any third-party websites. Accessing external links from our network means you are leaving our secure mainframe. We will not be a party to or in any way be responsible for monitoring any transaction or data exchange between you and third-party providers. Proceed into external sectors with standard cybersecurity precautions.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              4. Fair Use & Copyright Framework
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Reality Decoded actively engages in independent journalism, commentary, criticism, and research. In doing so, we may utilize copyrighted material under the "Fair Use" doctrine as outlined in Section 107 of the United States Copyright Act (and equivalent international statutes). 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Any utilization of third-party intellectual property—including imagery, audio, code snippets, or textual quotes—is done with transformative intent to educate, critique, or expose underlying narratives. If you are the rightful owner of any material featured within our archives and believe its use exceeds the boundaries of Fair Use, you may initiate a secure communication via our Contact portal for immediate review and potential redaction.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              5. Limitation of Liability
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Under no circumstances shall Reality Decoded, its founders, its field operatives, its syndicate members, or its affiliates be held liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages. This includes, without limitation, lost profit, lost revenue, loss of data, loss of privacy, or other damages arising from your use of the network.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              We assume no liability for any errors, omissions, or obscurities in the Content, nor for any hardware or software damage, malware infections, or data breaches that may occur while you are accessing our mainframe or downloading any decrypted files. The truth is a complex and sometimes hazardous terrain; navigate it responsibly.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              6. Protocol Modifications
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Reality Decoded reserves the absolute right to amend, alter, modify, or completely rewrite these legal protocols and disclaimers at any given time, without prior warning or direct notification to the user base. It is your sole responsibility to periodically review this document. Continued engagement with our network following any modifications strictly implies your explicit consent to the updated terms.
            </p>
          </section>

        </div>

        <div className="mt-12 flex justify-center pb-10">
           <Link href="/" className="text-xs font-medium text-zinc-500 hover:text-white border border-white/5 hover:border-white/20 bg-white/[0.02] px-6 py-3 rounded-lg transition-all flex items-center gap-2">
             <span className="transform -translate-x-1">&larr;</span> Return to Home
           </Link>
        </div>

      </div>
    </main>
  );
}