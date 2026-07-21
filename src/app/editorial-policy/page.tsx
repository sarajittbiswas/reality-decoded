import { Space_Grotesk, Inter } from 'next/font/google';
import Link from 'next/link';
import AskAI from '@/components/AskAI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const runtime = 'edge';

export const metadata = {
  title: 'Editorial Policy | Reality Decoded',
  description: 'The strict operational guidelines, fact-checking protocols, and ethical standards of the Reality Decoded syndicate.',
};

export default function EditorialPolicyPage() {
  return (
    <main className={`min-h-screen bg-[#030303] text-zinc-300 pt-32 pb-24 px-6 relative overflow-hidden ${inter.className}`}>
      
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center border-b border-white/5 pb-12 mt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-zinc-300 text-[10px] font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full shadow-[0_0_8px_rgba(212,212,216,0.8)] animate-pulse"></span>
            Syndicate Directives
          </div>
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-extrabold text-white mb-5 tracking-tight`}>
            Editorial Policy
          </h1>
          <p className="text-zinc-500 text-sm font-medium flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse"></span>
            Core Principles of Intelligence Gathering
          </p>
        </div>
        
        <AskAI />
        
        {/* Content Body */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-16 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] space-y-12">
          
          <div className="p-8 bg-zinc-900/30 border-l-2 border-zinc-400 rounded-r-2xl mb-12">
            <p className="text-zinc-300 font-medium italic text-[17px] leading-relaxed">
              "In an era dominated by algorithmic echo chambers and curated corporate narratives, maintaining absolute editorial independence is not just a preference; it is our primary weapon."
            </p>
          </div>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              1. Independence and Impartiality
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Reality Decoded is fundamentally independent. We do not answer to corporate conglomerates, political entities, state-sponsored media arms, or algorithmic manipulation. Our investigations are driven entirely by curiosity, the pursuit of truth, and the necessity to decode complex global and technological systems.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Our authors, operatives, and contributors are strictly prohibited from accepting financial compensation, gifts, or favors in exchange for favorable coverage. If a topic involves an entity with which we have a prior relationship, that relationship will be transparently disclosed at the beginning of the transmission. The truth cannot be bought, and our narratives cannot be leased.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              2. Rigorous Fact-Checking Protocols
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Intelligence without verification is merely rumor. Before any file is declassified and moved to the Live Archives, it undergoes a stringent vetting process. Our operatives cross-reference raw data drops with multiple independent sources, technical documentation, public ledgers, and verified primary accounts.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              In technological and cybersecurity reporting, we prioritize whitepapers, open-source code repositories, and verifiable threat intelligence reports over press releases. While the velocity of breaking news sometimes requires immediate publication, we explicitly mark unverified, developing, or speculative intelligence as such. We do not conflate hypothesis with proven fact.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              3. Anonymous Sources & Whistleblowers
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Reality Decoded heavily relies on the bravery of insiders, whistleblowers, and anonymous operatives to uncover narratives the public is meant to ignore. We offer a secure, encrypted Intel Queue for anonymous submissions.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              We grant anonymity to sources who risk career termination, legal retaliation, or physical harm by stepping forward. However, granting anonymity to a source does not exempt the intelligence from our verification protocols. We must independently corroborate the core claims of an anonymous source before publication. We vow to protect the identities of our confidential informants to the absolute limit of the law.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              4. Corrections and Database Updates
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Despite our rigorous filters, error is a statistical inevitability in the rapidly evolving digital frontier. When a factual inaccuracy is identified within our mainframe, we do not quietly erase the mistake. We believe in complete operational transparency.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Errors of fact will be corrected immediately, accompanied by an explicit "UPDATE" or "CORRECTION" log appended to the top or bottom of the file. This log will detail what the original error was, the new verified truth, and the exact timestamp of the modification. We view corrections not as failures, but as vital optimizations to our intelligence database.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              5. Distinguishing Editorial from Intel
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Clarity of intent is paramount. Our network hosts both raw factual reporting ("Intel") and subjective analytical commentary ("Editorials"). 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Articles that are inherently opinion-based, speculative, or reflective of an individual operative's worldview are distinctly categorized and tagged. We trust our audience's capacity for critical thought, and we ensure the structural divide between undeniable fact and subjective analysis remains clearly visible at all times.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>
              6. User-Generated Comm-Links (Comments)
            </h2>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Reality Decoded encourages intense, intellectual debate within our public Comm-Links (comment sections). However, we maintain absolute jurisdiction over our digital territory. Comments containing hate speech, illegal material, explicit threats, targeted harassment, or automated spam (botnets) will be summarily purged from the database. We protect the operational integrity of our community.
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