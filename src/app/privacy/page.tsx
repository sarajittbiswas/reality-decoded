export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-sm text-gray-500 font-mono">Last Updated: July 2026</p>
        </div>

        <div className="prose prose-invert prose-red max-w-none text-gray-300 space-y-8">
          
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">1. Our Commitment to Privacy</h3>
            <p className="leading-relaxed text-sm">
              At Reality Decoded, truth is our currency, but security is our foundation. This Privacy Policy explains how we collect, use, and protect your information when you visit our website, consume our content, or submit intelligence through our Secure Drop portal.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h3>
            <p className="leading-relaxed text-sm mb-3">
              <strong>A. Passive Information:</strong> Like most digital platforms, we collect non-personally identifying information that web browsers and servers typically make available, such as browser type, language preference, and the date/time of each visitor request. We use this exclusively to understand how visitors use our website.
            </p>
            <p className="leading-relaxed text-sm">
              <strong>B. Submitted Information:</strong> If you use our Contact form or Secure Drop portal, we collect the exact information you choose to provide. 
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">3. Whistleblower & Source Protection</h3>
            <p className="leading-relaxed text-sm">
              When utilizing our Secure Drop portal to share stories or upload files, you have the right to remain entirely anonymous. We do not log IP addresses on the Secure Drop submission endpoint. Any files or communications sent to us are treated with the highest degree of confidentiality and journalistic privilege. If you choose not to provide an alias or email, we will have no way to trace the submission back to you.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h3>
            <p className="leading-relaxed text-sm">
              We do not sell, rent, or trade your personal information to third parties. We will only disclose information if absolutely required to do so by a binding legal subpoena, and even then, we will aggressively fight to protect the identities of our confidential sources to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">5. Contact Us</h3>
            <p className="leading-relaxed text-sm">
              If you have any questions about this Privacy Policy or our security protocols, please reach out via our general <a href="/contact" className="text-red-500 hover:text-white transition-colors underline">Contact page</a> or email us directly at admin@realitydecoded.in.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}