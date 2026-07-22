import { Inter, Space_Grotesk } from 'next/font/google';
import Navbar from '@/components/Navbar';
import SecretEntrance from '@/components/SecretEntrance';
import SecretUplink from '@/components/SecretUplink';
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
      'application/rss+xml': 'https://realitydecoded.in/feed.xml',
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
<footer className="relative bg-[#030303] pt-24 pb-8 overflow-hidden border-t border-purple-500/30 font-sans selection:bg-purple-500/30">
  
  {/* 🚀 HIGH-END ANIMATED BACKGROUND FX */}
  
  {/* 1. Base Subtle Dot Matrix */}
  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>
  
  {/* 2. Live Radar Sonar Sweep */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_70%,rgba(168,85,247,0.15)_100%)] rounded-full [animation:spin_10s_linear_infinite] z-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_60%)] pointer-events-none"></div>

  {/* 3. Horizontal Holographic Scanline */}
  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_15px_#a855f7] z-0 [animation:scan-line_6s_linear_infinite] pointer-events-none"></div>

  {/* 4. Ambient Top Edge Light Bar */}
  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/80 to-transparent shadow-[0_0_25px_rgba(168,85,247,0.7)] z-10"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
    
    {/* COLUMN 1 (Col-Span-4): System Node (Brand & Contact) */}
    <div className="lg:col-span-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full border border-red-500/30 bg-red-500/10">
          <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
        </div>
        <h4 className="text-white font-extrabold text-xl uppercase tracking-widest text-shadow-sm">Reality Decoded</h4>
      </div>
      
      <p className="text-gray-400 text-sm font-light leading-relaxed pr-4">
        Uncovering the truth, one story at a time. The transmission never stops.
      </p>
      
      <div className="space-y-5 pt-5 border-t border-white/10 relative">
        <div className="absolute top-0 left-0 w-8 h-[1px] bg-purple-500"></div>

        {/* Email */}
        <a href="mailto:info@realitydecoded.in" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
            <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider mb-0.5">Secure Mail</span>
            <span className="text-sm font-mono tracking-wide">info@realitydecoded.in</span>
          </div>
        </a>
        
        {/* Phone */}
        <a href="tel:+919547000000" className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
            <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider mb-0.5">Encrypted Line</span>
            <span className="text-sm font-mono tracking-wide">+91 9547 000 000</span>
          </div>
        </a>
        
        {/* Address */}
        <a href="https://maps.google.com/?q=Malda,West+Bengal,IN+732101" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-gray-400 hover:text-white transition-colors group">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all mt-1">
            <svg className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider mb-1">HQ Origin</span>
            <span className="text-sm font-mono tracking-wide leading-relaxed">Malda, West Bengal<br />IN 732101</span>
            <span className="text-[10px] text-purple-500/70 font-mono mt-1 group-hover:text-purple-400 transition-colors">LOC: 25.0108° N, 88.1411° E</span>
          </div>
        </a>

      </div>
    </div>

    {/* COLUMN 2 & 3 (Col-Span-4): Company & Community Directory */}
    <div className="lg:col-span-4 grid grid-cols-2 gap-8">
        
        {/* Sub-Column: Company */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="text-purple-500 font-mono text-lg leading-none">/</span> <span className="mt-0.5">Company</span>
          </h4>
          <ul className="space-y-3.5">
            {[
              { name: 'About Us', link: '/about' },
              { name: 'Contact Us', link: '/contact' },
              { name: 'Field Reports', link: '/blogs' },
              { name: 'Video Intel', link: '/videos' },
              { name: 'Master Archives', link: '/archives' },
              { name: 'Threat Matrix Monitor', link: '/monitor' },
              { name: 'Public API & Data Feeds', link: '/feed' },
            ].map((item) => (
              <li key={item.name}>
                <a href={item.link} className="text-gray-400 hover:text-white flex items-center gap-3 group transition-all text-sm">
                  <span className="text-purple-500 font-mono opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">/</span>
                  <span className="group-hover:translate-x-1 group-hover:text-purple-300 transition-all duration-300">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sub-Column: Community */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="text-purple-500 font-mono text-lg leading-none">/</span> <span className="mt-0.5">Community</span>
          </h4>
          <ul className="space-y-3.5">
            {[
              { name: 'Authors', link: '/author' },
              { name: 'Careers', link: '/careers' },
              { name: 'Our Team', link: '/team' },
              { name: 'Community Hub', link: '/share' }
            ].map((item) => (
              <li key={item.name}>
                <a href={item.link} className="text-gray-400 hover:text-white flex items-center gap-3 group transition-all text-sm">
                  <span className="text-purple-500 font-mono opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">/</span>
                  <span className="group-hover:translate-x-1 group-hover:text-purple-300 transition-all duration-300">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

    </div>

    {/* COLUMN 4 (Col-Span-2): Legal Directory */}
    <div className="lg:col-span-2">
      <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm flex items-center gap-2">
        <span className="text-purple-500 font-mono text-lg leading-none">/</span> <span className="mt-0.5">Protocols</span>
      </h4>
      <ul className="space-y-3.5">
        {[
          { name: 'Terms of Service', link: '/terms' },
          { name: 'Privacy Policy', link: '/privacy' },
          { name: 'Disclaimer', link: '/disclaimer' },
          { name: 'Editorial Policy', link: '/editorial-policy' },
          { name: 'Whistleblower Privilege', link: '/legal' },
          { name: 'Investigative Methodology', link: '/methodology' },
        ].map((item) => (
          <li key={item.name}>
            <a href={item.link} className="text-gray-400 hover:text-white flex items-center gap-3 group transition-all text-sm">
              <span className="text-purple-500 font-mono opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">/</span>
              <span className="group-hover:translate-x-1 group-hover:text-purple-300 transition-all duration-300">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* COLUMN 5 (Col-Span-2): Ops & Network */}
    <div className="lg:col-span-2 flex flex-col justify-between h-full">
      
      {/* Continuous Glowing Wave Border Terminal Box */}
      <div className="relative rounded-xl overflow-hidden p-[1px] mb-8 group z-10 shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all duration-500">
        
        {/* The Animated Border Layer (Spinning Conic Gradient) */}
        <div className="absolute inset-[-150%] [animation:spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#a855f7_100%)] z-0 opacity-70 group-hover:opacity-100 transition-opacity"></div>
        
        {/* The Inner Box */}
        <div className="relative bg-[#050505]/95 backdrop-blur-xl rounded-xl p-5 z-10 h-full w-full flex flex-col justify-center">
          <h5 className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]"></span>
            Terminal Access
          </h5>
          <a href="/press" className="relative flex items-center justify-center gap-2 w-full bg-purple-600/10 border border-purple-500/20 text-purple-300 rounded-lg py-3.5 px-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:text-white hover:bg-purple-600/30 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <span className="text-sm">⚡</span> Media & Press
          </a>
        </div>
      </div>

      {/* Social Network */}
      <div>
        <h4 className="text-[10px] text-gray-600 font-mono uppercase tracking-widest mb-4">Signal Broadcast</h4>
        <div className="flex flex-wrap gap-2.5">
          {/* Instagram */}
          <a href="https://instagram.com/therealitydecoded" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent hover:shadow-[0_0_15px_rgba(221,42,123,0.4)] hover:-translate-y-1 transition-all duration-300">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" clipRule="evenodd"/></svg>
          </a>
          
          {/* YouTube */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg>
          </a>
          
          {/* Facebook */}
          <a href="https://facebook.com/therealitydecoded" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_0_15px_rgba(24,119,242,0.4)] hover:-translate-y-1 transition-all duration-300">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
          </a>

          {/* LinkedIn */}
          <a href="https://linkedin.com/company/realitydecoded" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] hover:-translate-y-1 transition-all duration-300">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"/></svg>
          </a>
          
          {/* X (Twitter) */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group hover:bg-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300">
            <svg className="w-3.5 h-3.5 fill-gray-400 group-hover:fill-black transition-colors" viewBox="0 0 24 24"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/></svg>
          </a>

          {/* Telegram */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-white/10 flex items-center justify-center group hover:bg-[#26A5E4] hover:border-[#26A5E4] hover:shadow-[0_0_15px_rgba(38,165,228,0.4)] hover:-translate-y-1 transition-all duration-300">
            <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
          </a>
        </div>
      </div>

    </div>

  </div>

  {/* Bottom Bar: Copyright & Status Readouts */}
  <div className="max-w-7xl mx-auto px-6 border-t border-white/10 pt-6 pb-2 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
    <div className="text-[11px] text-gray-500 font-mono tracking-widest text-center md:text-left uppercase">
      &copy; {new Date().getFullYear()} Reality Decoded. All rights reserved.
    </div>
    
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
      <div className="flex items-center gap-2">
        <a 
    href="/feed.xml" 
    target="_blank" 
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 mt-1"
  >
    <svg className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
    <span>RSS Feed</span>
  </a>
      </div>
      <span className="hidden md:inline text-gray-800">|</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">SYS.UPTIME:</span>
        <span className="text-purple-400 font-bold">99.9%</span>
      </div>
      <span className="hidden md:inline text-gray-800">|</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-600">PROTOCOL:</span>
        <span className="text-gray-400">OMEGA-7</span>
      </div>
      <span className="hidden md:inline text-gray-800">|</span>
      <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
        <span className="text-green-400">Encrypted</span>
      </div>
    </div>
  </div>
  
  {/* CSS Keyframes for Scanline and Radar */}
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes scan-line {
      0% { transform: translateY(0%); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(800px); opacity: 0; }
    }
  `}} />
</footer>

        <SecretUplink />

      </body>
    </html>
  );
}