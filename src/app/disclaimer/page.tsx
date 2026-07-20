import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import AskAI from '@/components/AskAI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

export const metadata = {
  title: 'Disclaimer | Reality Decoded',
  description: 'Official legal disclaimer and operational liability limitations for the Reality Decoded network.',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 pt-32 pb-24 px-6 font-mono relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest border border-red-500/20 mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Legal Protocols
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
            Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-600">Disclaimer</span>
          </h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
<AskAI />
        {/* Content Body */}
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl space-y-10 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-red-500">01.</span> General Information & Nature of Intel
            </h2>
            <p className="mb-4">
              The transmissions, articles, audiovisual broadcasts, data drops, and all other informational materials (collectively referred to as "Content") provided on the Reality Decoded network are intended exclusively for general informational, educational, and journalistic purposes. Reality Decoded operates as an independent intelligence syndicate dedicated to analyzing cybernetics, societal structures, global narratives, and technological advancements. 
            </p>
            <p>
              While our operatives, agents, and editorial team strive to ensure the highest fidelity of the intelligence we publish, the digital and geopolitical landscapes are inherently volatile. Information evolves rapidly. Therefore, we make no express or implied representations, warranties, or guarantees regarding the absolute accuracy, completeness, validity, reliability, or current relevance of the Content. Any reliance you place on such information is strictly at your own operational risk.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-red-500">02.</span> Professional Advice Exemption
            </h2>
            <p className="mb-4">
              Reality Decoded is an investigative platform. The Content provided herein does not constitute, and should never be construed as, professional advice. This includes, but is not limited to, legal, financial, medical, cybersecurity, psychological, or operational advice. 
            </p>
            <p className="mb-4">
              Our investigations into cybersecurity vulnerabilities, financial systems, or legal frameworks are strictly for educational awareness. You must not use the information on this network to circumvent security protocols, make high-risk financial investments, or navigate legal disputes without consulting certified, licensed professionals in those specific jurisdictions. Reality Decoded and its affiliated operatives disclaim any and all liability for actions taken or not taken based on the contents of this site.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-red-500">03.</span> External Nodes & Third-Party Surveillance
            </h2>
            <p className="mb-4">
              During the course of our investigations, Reality Decoded frequently intercepts and links to external websites, third-party nodes, and decentralized archives that are completely outside of our jurisdiction and control. These hyperlinked external destinations are provided solely for reference, source citation, and your convenience in verifying our intelligence.
            </p>
            <p>
              We do not monitor, endorse, warrant, or guarantee the privacy protocols, security measures, or factual accuracy of any third-party websites. Accessing external links from our network means you are leaving our secure mainframe. We will not be a party to or in any way be responsible for monitoring any transaction or data exchange between you and third-party providers. Proceed into external sectors with standard cybersecurity precautions.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-red-500">04.</span> Fair Use & Copyright Framework
            </h2>
            <p className="mb-4">
              Reality Decoded actively engages in independent journalism, commentary, criticism, and research. In doing so, we may utilize copyrighted material under the "Fair Use" doctrine as outlined in Section 107 of the United States Copyright Act (and equivalent international statutes). 
            </p>
            <p>
              Any utilization of third-party intellectual property—including imagery, audio, code snippets, or textual quotes—is done with transformative intent to educate, critique, or expose underlying narratives. If you are the rightful owner of any material featured within our archives and believe its use exceeds the boundaries of Fair Use, you may initiate a secure communication via our Contact portal for immediate review and potential redaction.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-red-500">05.</span> Limitation of Liability
            </h2>
            <p className="mb-4">
              Under no circumstances shall Reality Decoded, its founders, its field operatives, its syndicate members, or its affiliates be held liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages. This includes, without limitation, lost profit, lost revenue, loss of data, loss of privacy, or other damages arising from your use of the network.
            </p>
            <p>
              We assume no liability for any errors, omissions, or obscurities in the Content, nor for any hardware or software damage, malware infections, or data breaches that may occur while you are accessing our mainframe or downloading any decrypted files. The truth is a complex and sometimes hazardous terrain; navigate it responsibly.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-red-500">06.</span> Protocol Modifications
            </h2>
            <p>
              Reality Decoded reserves the absolute right to amend, alter, modify, or completely rewrite these legal protocols and disclaimers at any given time, without prior warning or direct notification to the user base. It is your sole responsibility to periodically review this document. Continued engagement with our network following any modifications strictly implies your explicit consent to the updated terms.
            </p>
          </section>

        </div>

        <div className="mt-12 flex justify-center pb-10">
           <Link href="/" className="text-xs uppercase tracking-widest text-gray-500 hover:text-white border border-white/10 bg-black/50 px-6 py-3 rounded-lg transition-colors font-bold flex items-center gap-2">
             <span className="transform -translate-x-1">&larr;</span> Return to Mainframe
           </Link>
        </div>

      </div>
    </main>
  );
}