import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import AskAI from '@/components/AskAI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
export const runtime = 'edge';

export const metadata = {
  title: 'Editorial Policy | Reality Decoded',
  description: 'The strict operational guidelines, fact-checking protocols, and ethical standards of the Reality Decoded syndicate.',
};

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-300 pt-32 pb-24 px-6 font-mono relative overflow-hidden">
      
      {/* Background Decorators */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold uppercase tracking-widest border border-purple-500/20 mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            Syndicate Directives
          </div>
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
            Editorial <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">Policy</span>
          </h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest font-bold">
            Core Principles of Intelligence Gathering
          </p>
        </div>
<AskAI />
        {/* Content Body */}
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl space-y-10 leading-relaxed text-sm md:text-base">
          
          <div className="p-6 bg-purple-900/10 border-l-4 border-purple-500 rounded-r-xl mb-10">
            <p className="text-purple-300 font-bold italic text-lg">
              "In an era dominated by algorithmic echo chambers and curated corporate narratives, maintaining absolute editorial independence is not just a preference; it is our primary weapon."
            </p>
          </div>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-purple-500">01.</span> Independence and Impartiality
            </h2>
            <p className="mb-4">
              Reality Decoded is fundamentally independent. We do not answer to corporate conglomerates, political entities, state-sponsored media arms, or algorithmic manipulation. Our investigations are driven entirely by curiosity, the pursuit of truth, and the necessity to decode complex global and technological systems.
            </p>
            <p>
              Our authors, operatives, and contributors are strictly prohibited from accepting financial compensation, gifts, or favors in exchange for favorable coverage. If a topic involves an entity with which we have a prior relationship, that relationship will be transparently disclosed at the beginning of the transmission. The truth cannot be bought, and our narratives cannot be leased.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-purple-500">02.</span> Rigorous Fact-Checking Protocols
            </h2>
            <p className="mb-4">
              Intelligence without verification is merely rumor. Before any file is declassified and moved to the Live Archives, it undergoes a stringent vetting process. Our operatives cross-reference raw data drops with multiple independent sources, technical documentation, public ledgers, and verified primary accounts.
            </p>
            <p className="mb-4">
              In technological and cybersecurity reporting, we prioritize whitepapers, open-source code repositories, and verifiable threat intelligence reports over press releases. While the velocity of breaking news sometimes requires immediate publication, we explicitly mark unverified, developing, or speculative intelligence as such. We do not conflate hypothesis with proven fact.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-purple-500">03.</span> Anonymous Sources & Whistleblowers
            </h2>
            <p className="mb-4">
              Reality Decoded heavily relies on the bravery of insiders, whistleblowers, and anonymous operatives to uncover narratives the public is meant to ignore. We offer a secure, encrypted Intel Queue for anonymous submissions.
            </p>
            <p>
              We grant anonymity to sources who risk career termination, legal retaliation, or physical harm by stepping forward. However, granting anonymity to a source does not exempt the intelligence from our verification protocols. We must independently corroborate the core claims of an anonymous source before publication. We vow to protect the identities of our confidential informants to the absolute limit of the law.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-purple-500">04.</span> Corrections and Database Updates
            </h2>
            <p className="mb-4">
              Despite our rigorous filters, error is a statistical inevitability in the rapidly evolving digital frontier. When a factual inaccuracy is identified within our mainframe, we do not quietly erase the mistake. We believe in complete operational transparency.
            </p>
            <p>
              Errors of fact will be corrected immediately, accompanied by an explicit "UPDATE" or "CORRECTION" log appended to the top or bottom of the file. This log will detail what the original error was, the new verified truth, and the exact timestamp of the modification. We view corrections not as failures, but as vital optimizations to our intelligence database.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-purple-500">05.</span> Distinguishing Editorial from Intel
            </h2>
            <p className="mb-4">
              Clarity of intent is paramount. Our network hosts both raw factual reporting ("Intel") and subjective analytical commentary ("Editorials"). 
            </p>
            <p>
              Articles that are inherently opinion-based, speculative, or reflective of an individual operative's worldview are distinctly categorized and tagged. We trust our audience's capacity for critical thought, and we ensure the structural divide between undeniable fact and subjective analysis remains clearly visible at all times.
            </p>
          </section>

          <section>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-4 flex items-center gap-3`}>
              <span className="text-purple-500">06.</span> User-Generated Comm-Links (Comments)
            </h2>
            <p>
              Reality Decoded encourages intense, intellectual debate within our public Comm-Links (comment sections). However, we maintain absolute jurisdiction over our digital territory. Comments containing hate speech, illegal material, explicit threats, targeted harassment, or automated spam (botnets) will be summarily purged from the database. We protect the operational integrity of our community.
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