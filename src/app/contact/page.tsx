export const runtime = 'edge';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
            Get In <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-400">
            For press inquiries, partnerships, or general questions.
            <br/>(To submit sensitive intelligence, please use our <a href="/share" className="text-red-500 underline hover:text-white transition-colors">Secure Drop portal</a>).
          </p>
        </div>

        <div className="bg-[#111] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-600 via-white to-gray-600"></div>

          {/* Recycle your Formspree URL here! */}
          <form action="https://formspree.io/f/xykqawpo" method="POST" className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Name</label>
                <input type="text" name="name" required className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                <input type="email" name="email" required className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Message</label>
              <textarea name="message" rows={5} required className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-all resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-white text-black font-extrabold text-lg py-4 rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest mt-4">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}