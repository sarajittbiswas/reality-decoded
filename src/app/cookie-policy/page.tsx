import { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import AskAI from '@/components/AskAI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cookie Policy | Reality Decoded',
  description: 'Information regarding tracking protocols, cookies, and privacy measures deployed by Reality Decoded.',
};

export default function CookiePolicyPage() {
  const lastUpdated = "July 25, 2026";

  return (
    <main className={`min-h-screen bg-[#000000] pt-32 pb-32 relative overflow-hidden ${inter.className}`}>
      
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.05),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-[700px] mx-auto px-6 relative z-10">
        
        {/* Terminal / Radar Header */}
        <div className="mb-20">
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-white/10">
            <div className="relative group">
              <div className="absolute inset-0 bg-sky-500/20 rounded-xl blur-xl group-hover:bg-sky-500/40 transition-all duration-700"></div>
              <div className="relative w-14 h-14 bg-[#111] border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400 absolute z-10">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {/* Radar Sweep Animation */}
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,rgba(56,189,248,0.4)_100%)] animate-[spin_3s_linear_infinite] opacity-50"></div>
              </div>
            </div>

            <div className="text-right">
              <div className={`${jetBrainsMono.className} text-sky-400 text-[10px] uppercase tracking-widest font-bold mb-1 flex items-center justify-end gap-2`}>
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse"></span>
                Connection Secure
              </div>
              <div className={`${jetBrainsMono.className} text-zinc-500 text-[10px] uppercase tracking-widest`}>
                File Ref: CP-2026-X7
              </div>
            </div>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4`}>
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">Policy</span>
          </h1>
          <p className={`${jetBrainsMono.className} text-zinc-500 text-[11px] uppercase tracking-widest border border-white/10 bg-white/5 w-max px-3 py-1.5 rounded-sm`}>
            Last Updated: {lastUpdated}
          </p>
        </div>
<AskAI />
        {/* Top-Tier Prose Content */}
        <div className="syndicate-prose relative">
          
          {/* Subtle side accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent -ml-6 md:-ml-10 hidden sm:block"></div>

          <p className="text-xl text-zinc-300 leading-relaxed mb-12">
            This Protocol outlines how Reality Decoded ("we", "us", or "our") deploys digital markers, cookies, and tracking technologies across our mainframe. By initiating a connection with our network, you acknowledge the operations detailed below.
          </p>

          <h2>1. System Definitions</h2>
          <p>
            Cookies are microscopic data payloads injected into your local hardware when you interface with a node. They serve as memory modules, allowing the mainframe to verify credentials, maintain active sessions, and monitor engagement telemetry.
          </p>

          <h2>2. Tracking Deployments</h2>
          <p>
            Unlike mass surveillance entities and data brokers, Reality Decoded operates with extreme data minimalism. We do not aggregate your data for resale. Our operational cookies are restricted to:
          </p>
          <ul>
            <li><strong>Telemetry Modules:</strong> We monitor unique page executions to generate viewership statistics for our intel reports. This data is strictly anonymized and mathematically unlinked from your personal identity.</li>
            <li><strong>State Verification:</strong> If you interact with our network (e.g., executing a "Like" command on an article), a localized token is generated to prevent redundant loops and preserve the integrity of our syndicate metrics.</li>
          </ul>

          <h2>3. Third-Party Injections</h2>
          <p>
            Certain intelligence reports may require embedding external media (video feeds, data visualizers). These external nodes may deploy independent tracking protocols outside of our jurisdiction. We advise operatives to review the privacy protocols of these foreign entities.
          </p>

          <blockquote className="my-10 border-l-2 border-sky-500 bg-sky-500/5 p-6 rounded-r-xl">
            <strong>Security Note:</strong> You retain full administrative privileges over your local machine. You can configure your browser firewall to reject or purge these digital payloads at any time.
          </blockquote>

          <h2>4. Countermeasures & Control</h2>
          <p>
            You can modify your browser settings to reject cookies. However, be advised that initiating these countermeasures may result in the degradation of interactive modules on our network, rendering specific engagement tools inoperable.
          </p>

          <h2>5. Protocol Updates</h2>
          <p>
            As the digital threat landscape shifts, our protocols will adapt. We may patch this Cookie Policy periodically to maintain compliance with global data privacy directives. Significant protocol modifications will be broadcast via our standard comms channels.
          </p>

          <h2>6. Establish Communication</h2>
          <p>
            If you require higher clearance or clarification regarding our data handling procedures, initiate a ping to our admin team via the <Link href="/contact" className="text-white hover:text-sky-400">secure contact portal</Link>.
          </p>
        </div>
      </div>

      {/* Upgraded Prose Styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .syndicate-prose { color: #a1a1aa; font-size: 16px; line-height: 1.8; font-family: ${inter.style.fontFamily}, sans-serif; font-weight: 300; }
        @media (min-width: 768px) { .syndicate-prose { font-size: 17px; } }
        
        .syndicate-prose h2 { 
          font-family: ${spaceGrotesk.style.fontFamily}, sans-serif; 
          font-weight: 800; 
          margin-top: 2.5em; 
          margin-bottom: 1em; 
          letter-spacing: -0.02em; 
          color: #ffffff; 
          font-size: 1.5rem; 
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .syndicate-prose h2::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;
          background-color: rgba(255,255,255,0.2);
          border-radius: 50%;
        }
        
        .syndicate-prose p { margin-bottom: 1.5em; }
        .syndicate-prose strong { font-weight: 700; color: #ededed; }
        
        .syndicate-prose ul { 
          margin-bottom: 2em; 
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          padding: 1.5rem 1.5rem 1.5rem 2.5rem;
        }
        .syndicate-prose li { margin-bottom: 1em; list-style-type: square; color: #52525b; }
        .syndicate-prose li::marker { color: #38bdf8; }
        .syndicate-prose li:last-child { margin-bottom: 0; }
        
        .syndicate-prose a { 
          text-decoration: none;
          color: #e4e4e7;
          border-bottom: 1px dashed rgba(255,255,255,0.4);
          padding-bottom: 2px;
          transition: all 0.2s ease; 
        }
        .syndicate-prose a:hover { 
          color: #ffffff; 
          border-bottom: 1px solid #38bdf8;
          text-shadow: 0 0 10px rgba(56,189,248,0.5);
        }
      `}} />
    </main>
  );
}