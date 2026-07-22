'use client';
import { useState, useEffect } from 'react';
import { Space_Grotesk } from 'next/font/google';
import { useParams } from 'next/navigation';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function ApplyPage() {
  const { id } = useParams();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingId, setTrackingId] = useState('');
  
  const [job, setJob] = useState<any>(null);
  const [applicantCount, setApplicantCount] = useState(0);

  useEffect(() => {
    fetch('/api/hr/manage').then(res => res.json()).then(data => {
      const foundJob = data.jobs.find((j: any) => j.id === id);
      const count = data.applications.filter((a: any) => a.job_id === id).length;
      setJob(foundJob);
      setApplicantCount(count);
    });
    fetch('/api/hr/manage', { method: 'POST', body: JSON.stringify({ action: 'track', page_type: 'job_apply', job_id: id }) });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload.jobId = id as string;

    const res = await fetch('/api/careers/apply', { method: 'POST', body: JSON.stringify(payload) });
    const data = await res.json();
    
    if (data.success) {
      setTrackingId(data.trackingId);
      setStatus('success');
    } else {
      setErrorMessage(data.error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="w-full bg-[#050505] text-zinc-300 min-h-screen flex items-center justify-center p-6 pt-24 relative overflow-hidden">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
        <div className="relative z-10 bg-[#0a0a0a] p-10 md:p-14 rounded-[2.5rem] border border-emerald-500/30 text-center max-w-lg shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
          <h1 className={`${spaceGrotesk.className} text-3xl font-bold mb-4 text-white uppercase tracking-tight`}>Application Submitted</h1>
          <p className="text-zinc-400 mb-8 text-sm font-light leading-relaxed">Thank you for applying. A confirmation email has been sent. Save this ID to track your status.</p>
          <div className="bg-black border border-white/10 p-6 rounded-xl font-mono text-xl text-emerald-400 tracking-widest">{trackingId}</div>
        </div>
      </main>
    );
  }

  if (!job) return <div className="min-h-screen bg-[#050505] pt-32 text-center text-zinc-400 text-xs uppercase tracking-widest">Loading Requirements...</div>;

  const isFull = job.max_applications && applicantCount >= job.max_applications;

  return (
    <main className={`w-full bg-[#050505] text-zinc-300 min-h-screen pt-32 pb-24 px-6 relative overflow-hidden ${spaceGrotesk.className}`}>
      
      {/* Background Grid Elements */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.25] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        
        {/* LEFT: JOB DESCRIPTION */}
        <div>
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Recruitment Node
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">{job.role}</h1>
            
            {/* Vector SVGs over levels */}
            <div className="flex flex-wrap gap-3 text-xs font-medium">
              
              {/* Type / Level */}
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-300 px-3.5 py-1.5 rounded-lg">
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.25A2.5 2.5 0 0118.5 15h-13A2.5 2.5 0 013 12.5V6A2.5 2.5 0 015.5 3.5h13A2.5 2.5 0 0121 6v6.5zM12 11h.01M16 11h.01M8 11h.01" /></svg>
                {job.type}
              </span>

              {/* Location */}
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-300 px-3.5 py-1.5 rounded-lg">
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {job.location}
              </span>

              {/* Pay Range (INR) */}
              {job.pay_range && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-lg font-semibold">
                  <span>₹</span>
                  {job.pay_range} LPA
                </span>
              )}

              {/* 🚀 FIXED: Total Applicants Count Display (e.g. 2 / 20 Applicants) */}
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-zinc-300 px-3.5 py-1.5 rounded-lg">
                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <strong className="text-white">{applicantCount}</strong> {job.max_applications ? `/ ${job.max_applications}` : ''} Applicants
              </span>

            </div>
          </div>
          
          <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-sm">
            <div>
              <h3 className="text-white font-bold text-base mb-2 uppercase tracking-wider">About the Role</h3>
              <p className="whitespace-pre-wrap">{job.description}</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-2 uppercase tracking-wider">Eligibility & Requirements</h3>
              <p className="whitespace-pre-wrap">{job.eligibility}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: PROFESSIONAL APPLICATION FORM WITH BEAM GLOW */}
        <div className="relative group rounded-3xl overflow-hidden">
          {/* Spinning Conic Gradient Beam */}
          <div className="absolute inset-[-150%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(255,255,255,0.4)_100%)] animate-[spin_5s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          
          {/* Solid Mask Container */}
          <div className="absolute inset-[1px] bg-[#0a0a0a] rounded-[23px] z-10"></div>

          {/* Form Content */}
          <div className="relative p-8 md:p-10 z-20">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Submit Application</h2>
            
            {status === 'error' && (
              <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-xs font-mono border border-red-500/20">{errorMessage}</div>
            )}

            {isFull ? (
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-8 rounded-2xl text-center">
                <h3 className="text-yellow-500 font-bold text-lg mb-2 uppercase">Capacity Reached</h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">We have received the maximum number of applications for this node. The recruitment window is currently closed.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Full Name *</label>
                    <input name="name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-zinc-400 transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Email Address *</label>
                    <input type="email" name="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-zinc-400 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Highest Qualification *</label>
                    <select name="qualification" required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-zinc-400 transition-all">
                      <option value="">Select...</option>
                      <option value="High School">High School</option>
                      <option value="Bachelors">Bachelor's Degree</option>
                      <option value="Masters">Master's Degree</option>
                      <option value="PhD">PhD / Doctorate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Years of Experience *</label>
                    <select name="age" required className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-zinc-400 transition-all">
                      <option value="">Select...</option>
                      <option value="0-2">0 - 2 Years</option>
                      <option value="3-5">3 - 5 Years</option>
                      <option value="5-10">5 - 10 Years</option>
                      <option value="10+">10+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Work Availability</label>
                    <select name="flexible_hours" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-zinc-400 transition-all">
                      <option value="Standard">Standard Hours</option>
                      <option value="Flexible">Flexible / Asynchronous</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Gender (Optional)</label>
                    <select name="gender" className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-xs text-zinc-300 focus:outline-none focus:border-zinc-400 transition-all">
                      <option value="">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 mb-2 uppercase tracking-widest">Portfolio Link (Optional)</label>
                  <input type="url" name="portfolio" placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-zinc-400 transition-all placeholder:text-zinc-600" />
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" name="consent" required className="mt-0.5 accent-white" />
                    <span className="text-[11px] text-zinc-400 font-light leading-relaxed">I consent to Reality Decoded processing my personal data for recruitment purposes. *</span>
                  </label>
                </div>

                {/* Glowing Submit Button */}
                <button type="submit" disabled={status === 'submitting'} className="relative group/btn w-full h-[52px] rounded-xl overflow-hidden p-[1.5px] disabled:opacity-50 mt-4">
                  <div className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#e4e4e7_0%,#e4e4e7_75%,#71717a_100%)] animate-[spin_2.5s_linear_infinite] z-0"></div>
                  <div className="relative w-full h-full bg-white text-black font-bold uppercase tracking-widest text-xs rounded-[10.5px] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    {status === 'submitting' ? 'Transmitting Application...' : 'Apply for this Job'}
                  </div>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}