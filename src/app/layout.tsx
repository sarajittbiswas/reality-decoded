import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import SecretEntrance from '@/components/SecretEntrance';
import type { Metadata } from 'next';
import './globals.css';

// Configure the fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const runtime = 'edge';
export const metadata: Metadata = {
  // metadataBase is required for Next.js to auto-generate correct Canonical URLs
  metadataBase: new URL('https://realitydecoded.in'),
  
  title: {
    default: 'Reality Decoded | Uncover the Truth',
    template: '%s | Reality Decoded', // If a page sets a title of "Videos", it becomes "Videos | Reality Decoded"
  },
  description: 'An independent intelligence syndicate delivering high-fidelity, cinematic investigations into technology, society, and hidden systems.',
  
  // Favicon & Apple Touch Icon (for iOS devices)
  icons: {
    icon: '/icon.png', //favicon for browsers
    apple: '/final_01.png', // Fallback for Apple devices
  },

  alternates: {
    types: {
      'application/rss+xml': 'https://realitydecoded.in/rss.xml',
    },
    canonical: '/', // Sets the default canonical URL to your root domain
  },
  
  openGraph: {
    title: 'Reality Decoded | Intelligence Syndicate',
    description: 'We don\'t just report. We decode. Access our latest investigative transmissions.',
    url: 'https://realitydecoded.in',
    siteName: 'Reality Decoded',
    images: [
      {
        url: '/default-cover.png', // Your fallback global OG Image
        width: 1200,
        height: 630,
        alt: 'Reality Decoded Broadcast Network',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Reality Decoded',
    description: 'Independent investigations and unedited reality.',
    images: ['/default-cover.png'], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#FFFFFF] text-white font-sans antialiased flex flex-col min-h-screen">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Reality Decoded",
      "url": "https://realitydecoded.in",
      "logo": "https://realitydecoded.in/final_no_bg.png", // Ensure this URL is live
      "sameAs": [
        "https://www.linkedin.com/company/realitydecoded",
        "https://www.instagram.com/therealitydecoded" 
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9547000000",
        "contactType": "customer service"
      }
    }),
  }}
/>
        <SecretEntrance />
        {/* TOP NAVIGATION BAR */}
        <Navbar />

        {/* MAIN PAGE CONTENT INJECTED HERE */}
        <div className="flex-grow">
          {children}
        </div>

        {/* SECURE TERMINAL FOOTER */}
        <footer className="relative bg-[#0a0a0a] pt-20 pb-10 overflow-hidden border-t border-white/5">
          
          {/* Ambient Top Edge Glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[150px] bg-purple-900/10 blur-[100px] pointer-events-none z-0"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* COLUMN 1: System Node (Brand & Contact) */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
                </span>
                <h4 className="text-white font-extrabold text-xl uppercase tracking-widest">Reality Decoded</h4>
              </div>
              
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                Uncovering the truth, one story at a time. The transmission never stops.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-white/5">
                
                {/* Email */}
                <a href="mailto:info@realitydecoded.in" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-mono tracking-wide">info@realitydecoded.in</span>
                </a>
                
                {/* Phone */}
                <a href="tel:+919547000000" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="text-sm font-mono tracking-wide">+91 9547 000 000</span>
                </a>
                
                {/* Address */}
                <a href="https://maps.google.com/?q=Malda,West+Bengal,IN+732101" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors group items-start">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-mono tracking-wide leading-relaxed">Malda<br />West Bengal, IN 732101</span>
                </a>

              </div>
            </div>

            {/* COLUMN 2: Company Directory */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="text-purple-500">/</span> Company
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'About Us', link: '/about' },
                  { name: 'Contact Us', link: '/contact' },
                  { name: 'Our Team', link: '/team' },
                  { name: 'Blog / Field Reports', link: '/blogs' },
                  { name: 'Brands/Press Connect', link: '/press' }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.link} className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors text-sm">
                      <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 font-mono font-bold">&gt;</span>
                      <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: Legal Directory */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="text-purple-500">/</span> Legal
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Careers', link: '/careers' },
                  { name: 'Terms of Service', link: '/terms' },
                  { name: 'Privacy Policy', link: '/privacy' }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.link} className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors text-sm">
                      <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 font-mono font-bold">&gt;</span>
                      <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 4: Social Network */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="text-purple-500">/</span> Network
              </h4>
              <div className="flex flex-wrap gap-3">
                
                {/* Instagram */}
                <a href="https://instagram.com/therealitydecoded" target="_blank"
rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center group hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent hover:shadow-[0_0_15px_rgba(221,42,123,0.4)] transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" clipRule="evenodd"/></svg>
                </a>
                
                {/* YouTube */}
                <a href="#" target="_blank"
rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center group hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg>
                </a>
                
                {/* Facebook */}
                <a href="https://facebook.com/therealitydecoded" target="_blank"
rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center group hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] transition-all duration-300">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
                </a>

                {/* LinkedIn */}
                <a href="https://linkedin.com/company/realitydecoded" target="_blank"
rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center group hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] transition-all duration-300">
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
                </a>
                
                {/* X (Twitter) */}
                <a href="#" target="_blank"
rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center group hover:bg-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300">
                  <svg className="w-4 h-4 fill-gray-400 group-hover:fill-black transition-colors" viewBox="0 0 24 24"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/></svg>
                </a>
                
              </div>
              <br></br>
{/* COLUMN 4: Social Network */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
               
              </h4>
              
              <br></br>
              {/* NEW: Glowing/Animated Press CTA Button */}
              <a 
                href="/press" 
                className="flex items-center justify-center gap-2 w-full bg-purple-600/10 border border-purple-500/30 text-purple-400 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-widest transition-all duration-500 hover:text-white hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-xs">⚡</span> Media & Press Access
              </a>
            </div>


            </div>

          </div>

          {/* Bottom Bar: Copyright & Status */}
          <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-600 font-mono uppercase tracking-widest text-center md:text-left">
              &copy; 2026 Reality Decoded. All rights reserved.
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
              Encrypted Connection Active
            </div>
          </div>
          
        </footer>

      </body>
    </html>
  );
}