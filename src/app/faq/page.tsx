'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

// ==========================================
// THE 50+ DATABASE OF SYNDICATE FAQS
// ==========================================
const faqDatabase = [
  // CORE LORE & SYNDICATE (1-10)
  { q: "What is Reality Decoded?", a: "We are an independent intelligence collective dedicated to uncovering the truth beneath the algorithmic, digital, and societal narratives shaping our world. We don't just report the news; we decode the reality." },
  { q: "Who are the Syndicate Operatives?", a: "Our authors are researchers, developers, journalists, and truth-seekers. We refer to them as 'Operatives' because they operate on the frontlines of the digital frontier." },
  { q: "Is Reality Decoded affiliated with any government?", a: "No. We are entirely independent, self-funded, and strictly non-partisan. We answer to no state actor, corporate board, or algorithmic overlord." },
  { q: "What is 'The Mainframe'?", a: "The Mainframe is our internal designation for the digital infrastructure that hosts Reality Decoded. It represents our secured servers and the front-end architecture you are interacting with right now." },
  { q: "How is Reality Decoded funded?", a: "Currently, we operate through community support, independent grants, and secure, untraceable backing from entities that value absolute truth over commercial narratives." },
  { q: "Why use aliases instead of real names?", a: "Many of our operatives report on high-risk topics involving cyber warfare, state surveillance, and corporate espionage. Aliases protect their physical and digital identities." },
  { q: "Can I join the Syndicate?", a: "Membership is earned, not given. The best way to get noticed by our admin team is to consistently submit high-tier, verifiable intel through our secure channels." },
  { q: "What is your stance on artificial intelligence?", a: "AI is a tool—and a weapon. We utilize localized, sandboxed AI for data sorting and analysis, but every piece of published intel is written, verified, and signed by a human operative." },
  { q: "Do you have a physical headquarters?", a: "Our architecture is decentralized. Our operatives are distributed globally. A centralized physical location represents a single point of failure." },
  { q: "What happens if the Mainframe is compromised?", a: "We have redundant fail-safes, offshore data backups, and dead-man switches. If this domain falls, a mirror will activate on the dark web within 60 seconds." },
  // SUBMITTING INTEL (11-20)
  { q: "How can I submit 'Intel'?", a: "Click the 'Ask a Question' button below, or use the 'SUBMIT INTEL' button located in the primary mainframe navigation for full article pitches." },
  { q: "Is my submission anonymous?", a: "Yes. Unless you explicitly provide an email or handle for follow-up, all submissions are stripped of metadata and treated as anonymous signals." },
  { q: "Do you pay for intel?", a: "We compensate operatives for published, deeply researched articles. We do not pay for tips or raw unverified data drops." },
  { q: "What kind of stories are you looking for?", a: "We seek investigations into surveillance capitalism, dead internet theory, zero-day exploits, biometric tracking, and systemic manipulation." },
  { q: "How secure is your submission portal?", a: "Our portal uses end-to-end encryption. However, for maximum operational security, we recommend submitting highly sensitive data via our encrypted PGP channels using a Tor browser." },
  { q: "Will you publish classified government documents?", a: "We evaluate all data based on public interest and verifiable truth. We do not indiscriminately dump data; we analyze and decode it." },
  { q: "How long does it take to review a submission?", a: "Our editorial protocols require 72 hours for standard review, and up to two weeks for deep-dive verification of complex technical claims." },
  { q: "Can I retract a submission?", a: "Once data enters the Mainframe, it is cryptographically hashed. We can halt publication, but removing the raw data from our archives requires an admin override." },
  { q: "Do you accept op-eds?", a: "Only if they are heavily grounded in technical reality, data analysis, or firsthand investigative experience. We deal in facts, not feelings." },
  { q: "What format should my intel be in?", a: "Plain text is preferred. For evidence, we accept PDF, CSV, and standard image formats. Strip all EXIF data before uploading." },
  // PRIVACY & SECURITY (21-30)
  { q: "How is my privacy handled here?", a: "We deploy minimal tracking protocols. We monitor anonymous view counts to gauge intel resonance. See our Cookie Policy for the full protocol." },
  { q: "Do you use third-party analytics?", a: "We do not use Google Analytics or invasive behavioral trackers. We use self-hosted, privacy-respecting telemetry." },
  { q: "What is your data retention policy?", a: "Connection logs are purged every 7 days. Encrypted communications are stored offline on air-gapped drives." },
  { q: "Are you tracking my IP address?", a: "Our edge network masks IP addresses before they hit our database. We only record regional data (e.g., Country/City) for broad threat-analysis." },
  { q: "Why do you use Cloudflare?", a: "Cloudflare provides our edge routing and DDoS mitigation. We require this shield to prevent targeted botnet attacks from taking our intel offline." },
  { q: "Is this site vulnerable to XSS?", a: "Our Next.js architecture automatically sanitizes inputs, and we utilize strict Content Security Policies (CSP) to neutralize cross-site scripting vectors." },
  { q: "How do you handle data breaches?", a: "If our outermost layers are breached, our zero-trust architecture ensures that lateral movement is impossible. User data is simply not stored here." },
  { q: "Can I browse Reality Decoded via Tor?", a: "Yes, our Mainframe is fully optimized to render without JavaScript if necessary, allowing for seamless deep-web navigation." },
  { q: "What is your policy on law enforcement requests?", a: "We cannot hand over what we do not have. Our zero-log policy ensures we have no user behavioral data to surrender." },
  { q: "Do you use cookies?", a: "Only strictly necessary local storage items for UI state (like dark mode or pagination) and anonymous view tracking." },
  // TECHNICAL SYSTEMS (31-40)
  { q: "What stack powers the Mainframe?", a: "We utilize React, Next.js (Edge Runtime), Tailwind CSS for styling, and Cloudflare D1 for our distributed SQL database." },
  { q: "Why use an Edge Database?", a: "It allows our intel to be replicated across hundreds of global nodes instantly, bypassing regional censorship and ensuring sub-50ms load times." },
  { q: "Is the site open source?", a: "Certain operational modules will be open-sourced in the future. The core Mainframe architecture remains proprietary for security." },
  { q: "Do you use WebSockets?", a: "No. We rely on stateless HTTP requests to minimize server load and prevent persistent connection tracking." },
  { q: "How does the view tracker work without cookies?", a: "It utilizes a heavily hashed combination of user-agent and daily rotation keys to prevent duplicate counting without storing identifiable markers." },
  { q: "Why is the UI so dark?", a: "It reduces eye strain for operatives analyzing data for extended periods, and it conserves energy on OLED displays." },
  { q: "Does the site work on mobile?", a: "Yes. The Mainframe UI is fully responsive, though deep-dive data analysis is best viewed on desktop environments." },
  { q: "What font does the site use?", a: "We utilize Inter for readability, Space Grotesk for headers, and JetBrains Mono for system-level data readouts." },
  { q: "Can I scrape the site?", a: "Standard crawling is permitted per our robots.txt. Aggressive scraping that triggers our rate limits will result in a permanent IP ban." },
  { q: "Do you have an RSS feed?", a: "Yes. Our XML transmission feed is available at /feed.xml for operatives who prefer RSS aggregation." },
  // INVESTIGATIONS & METHODOLOGY (41-50)
  { q: "How do you verify your sources?", a: "Through cross-referencing, metadata analysis, cryptographic signature verification, and multi-source corroboration." },
  { q: "Have you ever been hacked?", a: "We face daily botnet and brute-force attempts. To date, the core database has never been compromised." },
  { q: "What is the 'Dead Internet' theory?", a: "The concept that a majority of web traffic and content is now generated by AI and bots, drowning out genuine human interaction." },
  { q: "Do you cover cryptocurrency?", a: "Only when it intersects with privacy, systemic fraud, surveillance tracking, or state-sponsored illicit funding." },
  { q: "What is a zero-day exploit?", a: "A software vulnerability unknown to the vendor. It is 'zero-day' because the creator has zero days to fix it before it can be exploited." },
  { q: "Why focus on biometrics?", a: "Biometric data (facial recognition, DNA, fingerprints) is the ultimate breach of privacy because, unlike a password, it cannot be changed once compromised." },
  { q: "Do you believe in conspiracy theories?", a: "We believe in follow-the-money investigative journalism. We do not deal in unsubstantiated paranoia; we deal in documented reality." },
  { q: "What is surveillance capitalism?", a: "An economic system centered around the commodification of personal data, primarily for targeted advertising and behavioral modification." },
  { q: "Can a VPN truly protect me?", a: "A VPN shifts trust from your ISP to the VPN provider. It masks your IP but does not protect against browser fingerprinting or behavioral profiling." },
  { q: "How do I secure my devices?", a: "Use hardware keys, open-source operating systems, end-to-end encrypted messaging (like Signal), and practice extreme digital hygiene." },
  // MISCELLANEOUS (51-55)
  { q: "Why is the logo a red eye?", a: "It symbolizes both the surveillance state that watches us, and our collective mission to keep our eyes open to the truth." },
  { q: "Can I translate your articles?", a: "Yes. Reality Decoded operates under a Creative Commons attribution license for non-commercial translation." },
  { q: "Do you have a newsletter?", a: "We periodically transmit high-level summaries to operatives who opt-in. Check the footer to subscribe." },
  { q: "What is 'System Directives'?", a: "It is our categorization for internal rules, FAQs, policies, and operational guides." },
  { q: "How can I support Reality Decoded?", a: "Share our intel, secure your own data, and refuse to blindly accept the narratives fed to you by algorithms." }
];

export default function DynamicFAQPage() {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Mainframe CAPTCHA State
  const [captchaNum1, setCaptchaNum1] = useState(0);
  const [captchaNum2, setCaptchaNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState('');
  
  // Math for Pagination
  const totalItems = faqDatabase.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = faqDatabase.slice(startIndex, endIndex);

  // Generate CAPTCHA on modal open
  useEffect(() => {
    if (isModalOpen) {
      setCaptchaNum1(Math.floor(Math.random() * 10) + 1);
      setCaptchaNum2(Math.floor(Math.random() * 10) + 1);
      setCaptchaInput('');
      setFormState('idle');
    }
  }, [isModalOpen]);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when changing rows
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate CAPTCHA
    if (parseInt(captchaInput) !== captchaNum1 + captchaNum2) {
      setFormState('error');
      return;
    }

    setFormState('submitting');
    
    // Simulate API Call to database
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <main className={`min-h-screen bg-[#000000] pt-32 pb-32 relative overflow-hidden ${inter.className}`}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        details > summary { list-style: none; }
        details::-webkit-details-marker { display: none; }
        details[open] summary ~ * { animation: sweep .4s ease-out forwards; }
        @keyframes sweep { 0% { opacity: 0; transform: translateY(-10px); } 100% { opacity: 1; transform: translateY(0); } }
        /* Custom scrollbar for dropdown */
        select option { background-color: #111; color: #fff; }
      `}} />

      {/* Advanced Animated Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="relative mb-8 group cursor-default">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/30 transition-all duration-700"></div>
            <div className="relative w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-purple-500/50 transition-colors duration-500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-300 group-hover:text-purple-400 transition-colors duration-500">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
          </div>
          
          <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]`}>
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">Questions</span>
          </h1>
          <p className="text-[#888888] text-[16px] md:text-[18px] leading-relaxed max-w-xl mx-auto">
            Database querying active. {totalItems} declassified records found.
          </p>
        </div>

        {/* CONTROLS ROW: Ask Question & Rows Per Page */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`${jetBrainsMono.className} flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[12px] uppercase tracking-widest px-5 py-2.5 rounded-md transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Submit Inquiry
          </button>

          <div className={`${jetBrainsMono.className} flex items-center gap-3 text-[11px] text-zinc-400 uppercase tracking-widest`}>
            <label htmlFor="rows" className="hidden sm:block">Rows per page:</label>
            <select 
              id="rows" 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
              className="bg-[#111] border border-white/10 text-white px-3 py-1.5 rounded-md outline-none focus:border-purple-500 transition-colors cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="space-y-4 mb-10">
          {currentFaqs.map((faq, index) => (
            <details 
              key={`${currentPage}-${index}`} 
              className="group bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
            >
              <summary className="flex items-center justify-between cursor-pointer p-6 md:p-8 select-none">
                <div className="flex items-center gap-4 pr-4">
                  <div className="hidden sm:flex shrink-0 w-8 h-8 bg-white/5 border border-white/10 rounded-full items-center justify-center text-zinc-600 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-colors duration-300">
                    <span className={`${jetBrainsMono.className} text-[10px] font-bold`}>
                      {startIndex + index + 1}
                    </span>
                  </div>
                  <h3 className={`${spaceGrotesk.className} font-bold text-lg md:text-xl text-[#ededed] group-hover:text-white transition-colors`}>
                    {faq.q}
                  </h3>
                </div>
                
                <div className="relative flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-zinc-400 group-hover:bg-white/10 transition-colors">
                  <svg className="absolute w-4 h-4 transition-transform duration-500 ease-in-out group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </summary>
              
              <div className="px-6 md:px-8 pb-8 pt-2">
                <div className="pl-0 sm:pl-12 text-[#888888] text-[15px] md:text-[16px] leading-relaxed border-t border-white/5 pt-6 group-open:border-white/10 transition-colors">
                  {faq.a}
                </div>
              </div>
            </details>
          ))}
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6">
            <span className={`${jetBrainsMono.className} text-[11px] text-zinc-500 uppercase tracking-widest mb-4 sm:mb-0`}>
              Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
            </span>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                &larr;
              </button>
              
              <div className={`${jetBrainsMono.className} flex items-center gap-1`}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border text-[12px] transition-colors ${
                      currentPage === page 
                        ? 'bg-white text-black border-white font-bold' 
                        : 'border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-md border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SUBMISSION MODAL (Glassmorphism Overlay) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {formState === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-2`}>Transmission Sent</h3>
                <p className="text-zinc-400">Our operatives will review your inquiry shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-2`}>Submit Inquiry</h3>
                  <p className="text-zinc-500 text-sm">Inquiries are logged anonymously unless contact details are provided in the payload.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`${jetBrainsMono.className} block text-[10px] text-zinc-400 uppercase tracking-widest mb-2`}>Alias (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Enter designation"
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className={`${jetBrainsMono.className} block text-[10px] text-zinc-400 uppercase tracking-widest mb-2`}>Inquiry Payload <span className="text-red-500">*</span></label>
                    <textarea 
                      required
                      placeholder="State your question..."
                      rows={4}
                      className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 outline-none focus:border-purple-500 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* MAINFRAME CAPTCHA */}
                  <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                    <label className={`${jetBrainsMono.className} block text-[10px] text-purple-400 uppercase tracking-widest mb-3 flex items-center gap-2`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Mainframe Verification
                    </label>
                    <div className="flex items-center gap-4">
                      <div className={`${jetBrainsMono.className} text-white font-bold text-lg bg-black px-4 py-2 rounded-md border border-white/10 select-none`}>
                        {captchaNum1} + {captchaNum2} =
                      </div>
                      <input 
                        type="number" 
                        required
                        value={captchaInput}
                        onChange={(e) => {
                          setCaptchaInput(e.target.value);
                          if (formState === 'error') setFormState('idle');
                        }}
                        placeholder="?"
                        className="w-20 bg-black border border-white/10 rounded-md px-4 py-2 text-white font-bold outline-none focus:border-purple-500 transition-colors text-center"
                      />
                    </div>
                    {formState === 'error' && (
                      <p className="text-red-400 text-xs mt-2 font-mono">Invalid verification checksum. Try again.</p>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className={`${jetBrainsMono.className} w-full flex justify-center items-center h-12 bg-white text-black font-bold text-[12px] uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-6`}
                >
                  {formState === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-black" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75"></path></svg>
                      Encrypting...
                    </span>
                  ) : (
                    'Transmit Inquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </main>
  );
}