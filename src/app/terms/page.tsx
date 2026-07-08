export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <p className="text-sm text-gray-500 font-mono">Last Updated: July 2026</p>
        </div>

        <div className="prose prose-invert prose-red max-w-none text-gray-300 space-y-8">
          
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h3>
            <p className="leading-relaxed text-sm">
              By accessing and using Reality Decoded (the "Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h3>
            <p className="leading-relaxed text-sm">
              All original content, documentaries, investigations, and assets produced by Reality Decoded are protected by copyright. You may not modify, publish, transmit, or participate in the transfer or sale of, create derivative works from, or in any way exploit, any of the content, in whole or in part, without explicit permission.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">3. User Submissions & Whistleblower Data</h3>
            <p className="leading-relaxed text-sm">
              When submitting information via our Secure Drop portal, you retain all ownership rights to your original files. By explicitly granting "Publication Rights" during submission, you grant Reality Decoded a worldwide, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your anonymous story across our platforms.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-white mb-4">4. Disclaimer of Liability</h3>
            <p className="leading-relaxed text-sm">
              The investigative content provided on this Platform is for informational purposes only. While we rigorously verify our intelligence, Reality Decoded assumes no responsibility or liability for any errors or omissions in the content of this site.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}