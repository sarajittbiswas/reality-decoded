import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Reality Decoded | Uncover the Truth',
  description: 'Unedited reality, authentic stories, and investigations that matter.',
  icons: {
    icon: '/final_no_bg.png', // Change this to your actual logo file name!
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FFFFFF] text-white font-sans antialiased flex flex-col min-h-screen">
        
        {/* TOP NAVIGATION BAR */}
        <nav className="fixed w-full z-50 bg-[]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            
            {/* Logo */}
            <a href="/" className="text-2xl font-extrabold tracking-tighter flex items-center gap-1">
              <img src="/final_no_bg.png" alt="Reality Decoded Logo" className="w-13 h-13 object-contain" />
         <span className="text-white">realitydecoded</span>
            </a>

            {/* Links */}
            <div className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-300">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/videos" className="hover:text-white transition-colors">Videos</a>
              <a href="/blogs" className="hover:text-white transition-colors">Blogs</a>
              
              {/* Big CTA Button */}
              <a href="/share" className="bg-white text-red-600 px-6 py-2.5 rounded-full font-bold hover:bg-black transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                Share Your Story
              </a>
            </div>
          </div>
        </nav>

        {/* MAIN PAGE CONTENT INJECTED HERE */}
        <div className="flex-grow">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-black pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-sm text-gray-400">
            <div>
              {/* Footer Logo */}
              {/* <img 
                src="/final_no_bg.png" 
                alt="Reality Decoded Icon" 
                className="block mx-auto w-10 h-10 object-contain mb-4 grayscale hover:grayscale-0 transition-all duration-300" 
              /> */}
              
              <h4 className="text-white font-bold text-lg mb-4">Reality Decoded</h4>
              <p className="mb-6">Uncovering the truth, one story at a time.</p>
              
              {/* Contact Information List */}
              <div className="space-y-4 text-gray-400 text-sm">
                
                {/* Email */}
                <div className="flex items-center gap-3 hover:text-red-500 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@realitydecoded.in" className="hover:text-red-500 transition-colors">
                    info@realitydecoded.in
                  </a>
                </div>
                
                {/* Phone */}
                <div className="flex items-center gap-3 hover:text-red-500 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+919547000000" className="hover:text-red-500 transition-colors">
                    +91 9547000000
                  </a>
                </div>
                
                {/* Address */}
                <div className="flex items-start gap-3 hover:text-red-500 transition-colors cursor-pointer group">
                  <svg className="w-5 h-5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a href="https://maps.google.com/?q=Malda,West+Bengal,IN+732101" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                    Malda<br />West Bengal, IN 732101
                  </a>
                </div>

              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Pages</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-red-500">About Us</a></li>
                <li><a href="/contact" className="hover:text-red-500">Contact</a></li>
                <li><a href="/blogs" className="hover:text-red-500">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
				<li><a href="/careers" className="hover:text-red-500">Careers</a></li>
                <li><a href="/terms" className="hover:text-red-500">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-red-500">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <div className="flex gap-4">
                {/* Instagram */}
                <a href="https://instagram.com/therealitydecoded" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" clipRule="evenodd"/></svg></a>
				{/* YouTube */}
                <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/></svg></a>
				{/* Facebook */}
<a href="https://facebook.com/therealitydecoded" className="hover:text-white transition-colors">
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
</a>

{/* LinkedIn */}
<a href="https://linkedin.com/company/realitydecoded" className="hover:text-white transition-colors">
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
</a>
				{/* Twitter / X */}
                <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/></svg></a>
                
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-600 pb-4">
            &copy; 2026 Reality Decoded. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}