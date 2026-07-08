export const runtime = 'edge';

export default function ShareStoryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase">
            Share Your <span className="text-red-600">Story</span>
          </h1>
          <p className="text-xl text-gray-400">
            Have evidence? Witnessed something the world needs to see? Drop it here. 
            Your identity is safe with us.
          </p>
        </div>

        <div className="bg-[#111] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900"></div>

          <div className="flex items-center gap-2 mb-8 text-sm font-mono text-green-500 bg-green-500/10 w-max px-3 py-1 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Secure Transmission Protocol Enabled
          </div>

          {/* ADDED: encType="multipart/form-data" so the form can process physical files */}
          <form action="https://formspree.io/f/xykqawpo" method="POST" encType="multipart/form-data" className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                  Name / Alias (Optional)
                </label>
                <input 
                  type="text" 
                  name="alias"
                  placeholder="Anonymous" 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                  Secure Email (Optional)
                </label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="For follow-up questions..." 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                Subject line
              </label>
              <input 
                type="text" 
                name="subject"
                placeholder="What is this regarding?" 
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                The Truth
              </label>
              <textarea 
                name="story"
                rows={6} 
                placeholder="Explain what happened. Be as detailed as possible..." 
                required
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600 resize-none"
              ></textarea>
            </div>

            {/* RESTORED: Optional File Upload Simulation turned into a real, functioning input
            <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-red-500/50 transition-colors bg-[#0a0a0a] group">
             
              <input 
                type="file" 
                name="attachment" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <svg className="w-10 h-10 text-gray-500 mx-auto mb-4 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="text-gray-400 font-medium">Click or drag to upload evidence, documents, or raw footage. <span className="text-gray-500">(Optional)</span></p>
              <p className="text-xs text-gray-600 mt-2">Max file size depends on your email provider limits.</p>
            </div> */}

{/* PUBLICATION PERMISSION TOGGLE */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 mt-4">
              <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm border-b border-white/10 pb-2">Publication Rights</h4>
              
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-1">
                  <input type="checkbox" name="allow_publishing" value="yes" className="peer appearance-none w-5 h-5 border-2 border-gray-600 rounded bg-transparent checked:bg-red-600 checked:border-red-600 transition-all cursor-pointer" />
                  <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm group-hover:text-red-400 transition-colors">Yes, you may publish this story on the Reality Decoded Blogs.</p>
                  <p className="text-gray-500 text-xs mt-1">If you left your Name/Alias blank above, this will be published under "Anonymous Contributor".</p>
                </div>
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-red-600 text-white font-bold text-lg py-4 rounded-lg hover:bg-red-700 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] uppercase tracking-widest mt-4"
            >
              Submit Intelligence
            </button>
            
            <p className="text-center text-xs text-gray-600 mt-4">
              By submitting, you agree to our Terms of Service. Information submitted may be investigated and published by our team.
            </p>

          </form>
        </div>
      </div>
    </main>
  );
}