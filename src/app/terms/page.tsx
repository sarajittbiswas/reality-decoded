import { Space_Grotesk } from 'next/font/google';
import AskAI from '@/components/AskAI';

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
<AskAI />
        {/* Document Body */}
        <div className="bg-[#111111]/50 backdrop-blur-xl border border-white/5 p-8 md:p-14 rounded-3xl shadow-2xl space-y-12 relative overflow-hidden group">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent z-20"></div>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>1. Acceptance of Operational Parameters</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              By accessing, browsing, or utilizing the Reality Decoded infrastructure (collectively, the "Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. This document constitutes a legally binding agreement between you ("User") and Reality Decoded ("Syndicate," "We," "Us," or "Our"). 
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              Your access to this Platform is expressly conditioned upon your acceptance of and compliance with these terms. If you do not agree with any provision contained within this agreement, you must immediately discontinue your use of the Platform and vacate our digital environment. Reality Decoded reserves the right to modify, amend, or alter these terms at its sole discretion, and your continued usage after such modifications serves as your explicit ratification of the revised agreement. We advise all users to periodically review these protocols to maintain operational awareness.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>2. Intellectual Property & Copyright Framework</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              All proprietary content, investigative reports, cinematic documentaries, digital artwork, software code, database schemas, and other assets hosted within this domain remain the exclusive intellectual property of Reality Decoded and its respective third-party licensors. All rights, title, and interest in and to the content provided on the Platform are and will remain the exclusive property of Reality Decoded.
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              You are granted a limited, revocable, non-exclusive, and non-transferable license to access the Platform solely for personal, non-commercial, and informational purposes. You are strictly prohibited from modifying, publishing, transmitting, participating in the transfer or sale of, creating derivative works from, or in any way exploiting, any of the platform's content—in whole or in part—without receiving explicit, prior written authorization from our editorial command. Systematic retrieval of data or other content from this site to create or compile, directly or indirectly, a collection, compilation, database, or directory without express written permission is strictly prohibited and constitutes a violation of our operational security and copyright.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>3. User Submissions & Whistleblower Protocol</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              Reality Decoded actively invites field reports, intelligence submissions, and anonymous whistleblower tips through our encrypted Secure Drop portal. By submitting information, you acknowledge that you are the original author or possess the legal right to disseminate said information. 
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              When you submit intel, you grant Reality Decoded a worldwide, perpetual, non-exclusive, royalty-free, sub-licensable license to utilize, reproduce, adapt, publish, translate, and distribute your submission across our entire network, including our archives and associated social channels. While we strive to preserve anonymity, you acknowledge that you are responsible for the veracity of the information submitted. We do not guarantee the publication of any user-submitted content. All submissions are reviewed against our internal verification standards before being elevated to public archives.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>4. Formal DMCA & Infringement Policy</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              We respect the intellectual property of others and expect our users to do the same. Reality Decoded maintains a strictly compliant stance regarding the Digital Millennium Copyright Act (DMCA). If you are a copyright owner or an authorized agent thereof, and you maintain a good-faith belief that content residing on or accessible through our network infringes upon your copyright, you may submit a formal notification to our designated agent.
            </p>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              To be effective, your DMCA notification must include: (i) A physical or electronic signature of the copyright owner or person authorized to act on behalf of the owner; (ii) Identification of the copyrighted work claimed to have been infringed; (iii) Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate the material (the URL); (iv) Information reasonably sufficient to permit us to contact you; (v) A statement that you have a good-faith belief that use of the material is not authorized; and (vi) A statement under penalty of perjury that the information in the notification is accurate.
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              Reality Decoded reserves the right to disable access to any material that we believe, in our sole discretion, is infringing, and to terminate the access of repeat infringers.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>5. Cookie Policy & Third-Party Advertisements</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              Our network utilizes cookies and similar tracking technologies to analyze site traffic, personalize content, and serve advertisements. Specifically, we partner with Google AdSense, which may utilize cookies (including the DART cookie) to deliver advertisements based on your prior interactions with Reality Decoded and other websites.
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              These cookies do not grant us access to your computer or any personal information other than what you choose to share. You have the ability to decline cookies by modifying your browser settings, though doing so may limit your ability to fully experience the interactive features of the Platform. By continuing to browse our network, you consent to our use of cookies as outlined in our Privacy Policy.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>6. Disclaimer of Liability & Warranty</h3>
            <p className="leading-relaxed text-gray-400 font-light mb-4">
              All content provided on Reality Decoded is offered on an "as-is" and "as-available" basis, without warranties of any kind, whether express or implied. While we employ vigorous fact-checking protocols, the Syndicate makes no warranties that the Platform will meet your requirements, be uninterrupted, timely, secure, or free from error. 
            </p>
            <p className="leading-relaxed text-gray-400 font-light">
              Reality Decoded, its founders, and its field operatives specifically disclaim any liability for any direct, indirect, special, consequential, or exemplary damages arising out of or in any way connected with your use of the Platform. This includes, but is not limited to, damages for loss of profits, data, use, or other intangible assets, even if Reality Decoded has been advised of the possibility of such damages. Your use of this Platform is entirely at your own risk.
            </p>
          </section>

          <section className="relative pl-6 border-l-2 border-purple-500/20 hover:border-purple-500 transition-colors duration-300">
            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500/50"></div>
            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-gray-200 mb-4 tracking-wide`}>7. Governing Law & Jurisdictional Authority</h3>
            <p className="leading-relaxed text-gray-400 font-light">
              These Terms of Service are governed by and construed in accordance with the internal laws of the jurisdiction in which Reality Decoded is headquartered, without giving effect to any choice or conflict of law provision. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts located within our base of operations. By using this site, you irrevocably consent to the personal jurisdiction and venue of these courts for any action related to this agreement.
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