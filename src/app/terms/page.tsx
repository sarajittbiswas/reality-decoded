import { Space_Grotesk, Inter } from 'next/font/google';
import AskAI from '@/components/AskAI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function TermsPage() {
  return (
    <main className={`w-full bg-[#030303] text-zinc-300 min-h-screen overflow-hidden relative pb-32 ${inter.className}`}>
      
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.08),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 pt-40 relative z-10">
        
        <div className="mb-14 border-b border-white/5 pb-12">
          <div className="flex items-center justify-between mb-8">
            <span className="inline-flex items-center gap-2 bg-white/5 text-zinc-300 text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full shadow-[0_0_8px_rgba(212,212,216,0.8)] animate-pulse"></span>
              Legal Protocol
            </span>
            <span className="text-xs text-zinc-600 font-medium tracking-widest">REF: RD-TERMS-2026</span>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-5`}>
            Terms of Service
          </h1>
          <p className="text-sm text-zinc-500 font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse"></span>
            Effective Date: July 2026
          </p>
        </div>
        
        <AskAI />
        
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-8 md:p-16 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.5)] space-y-12">
          
          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>1. Acceptance of Operational Parameters</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              By accessing, browsing, or utilizing the Reality Decoded infrastructure (collectively, the "Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. This document constitutes a legally binding agreement between you ("User") and Reality Decoded ("Syndicate," "We," "Us," or "Our"). 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Your access to this Platform is expressly conditioned upon your acceptance of and compliance with these terms. If you do not agree with any provision contained within this agreement, you must immediately discontinue your use of the Platform and vacate our digital environment. Reality Decoded reserves the right to modify, amend, or alter these terms at its sole discretion.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>2. Intellectual Property & Copyright Framework</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              All proprietary content, investigative reports, cinematic documentaries, digital artwork, software code, database schemas, and other assets hosted within this domain remain the exclusive intellectual property of Reality Decoded and its respective third-party licensors. All rights, title, and interest in and to the content provided on the Platform are and will remain the exclusive property of Reality Decoded.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              You are granted a limited, revocable, non-exclusive, and non-transferable license to access the Platform solely for personal, non-commercial, and informational purposes. You are strictly prohibited from modifying, publishing, transmitting, participating in the transfer or sale of, creating derivative works from, or in any way exploiting, any of the platform's content in whole or in part without receiving explicit, prior written authorization from our editorial command. Systematic retrieval of data or other content from this site to create or compile, directly or indirectly, a collection, compilation, database, or directory without express written permission is strictly prohibited and constitutes a violation of our operational security and copyright.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>3. User Submissions & Whistleblower Protocol</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Reality Decoded actively invites field reports, intelligence submissions, and anonymous whistleblower tips through our encrypted Secure Drop portal. By submitting information, you acknowledge that you are the original author or possess the legal right to disseminate said information. 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              When you submit intel, you grant Reality Decoded a worldwide, perpetual, non-exclusive license to utilize, reproduce, adapt, publish, and distribute your submission across our network. We do not guarantee the publication of any user-submitted content. All submissions are reviewed against our internal verification standards before being elevated to public archives.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>4. Formal DMCA & Infringement Policy</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              We respect the intellectual property of others and expect our users to do the same. Reality Decoded maintains a strictly compliant stance regarding the Digital Millennium Copyright Act (DMCA). If you believe that content residing on our network infringes upon your copyright, you may submit a formal notification to our designated agent.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              To be effective, your DMCA notification must include: (i) A physical or electronic signature of the copyright owner or person authorized to act on behalf of the owner; (ii) Identification of the copyrighted work claimed to have been infringed; (iii) Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate the material (the URL); (iv) Information reasonably sufficient to permit us to contact you; (v) A statement that you have a good-faith belief that use of the material is not authorized; and (vi) A statement under penalty of perjury that the information in the notification is accurate.

Reality Decoded reserves the right to disable access to any material that we believe, in our sole discretion, is infringing, and to terminate the access of repeat infringers.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>5. Cookie Policy & Third-Party Advertisements</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              Our network utilizes cookies and similar tracking technologies to analyze site traffic, personalize content, and serve advertisements. Specifically, we partner with Google AdSense, which may utilize cookies to deliver advertisements based on your prior interactions with Reality Decoded and other websites.
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              These cookies do not grant us access to your computer or any personal information other than what you choose to share. By continuing to browse our network, you consent to our use of cookies as outlined in our Privacy Policy.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>6. Disclaimer of Liability & Warranty</h3>
            <p className="leading-relaxed text-zinc-400 font-light mb-4 text-[15px]">
              All content provided on Reality Decoded is offered on an "as-is" and "as-available" basis, without warranties of any kind, whether express or implied. While we employ vigorous fact-checking protocols, the Syndicate makes no warranties that the Platform will meet your requirements, be uninterrupted, timely, secure, or free from error. 
            </p>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              Reality Decoded specifically disclaims any liability for any direct, indirect, special, consequential, or exemplary damages arising out of or in any way connected with your use of the Platform. Your use of this Platform is entirely at your own risk.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-white/5 hover:border-zinc-400 transition-colors duration-300 group/section">
            <div className="absolute -left-[5px] top-2.5 w-2 h-2 rounded-full bg-zinc-500 group-hover/section:bg-zinc-300 shadow-[0_0_8px_rgba(161,161,170,0.5)] group-hover/section:shadow-[0_0_12px_rgba(255,255,255,0.8)] animate-pulse transition-all"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-zinc-100 mb-4`}>7. Governing Law & Jurisdictional Authority</h3>
            <p className="leading-relaxed text-zinc-400 font-light text-[15px]">
              These Terms of Service are governed by and construed in accordance with the internal laws of the jurisdiction in which Reality Decoded is headquartered, without giving effect to any choice or conflict of law provision. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts located within our base of operations. By using this site, you irrevocably consent to the personal jurisdiction and venue of these courts for any action related to this agreement.
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