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
    payload.jobId = id;

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
      <main className="w-full bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center p-6 pt-24">
        <div className="bg-[#111111]/80 p-12 rounded-[2.5rem] border border-green-500/30 text-center max-w-lg shadow-[0_0_50px_rgba(34,197,94,0.1)]">
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
          <h1 className={`${spaceGrotesk.className} text-3xl font-bold mb-4`}>Application Submitted</h1>
          <p className="text-gray-400 mb-8">Thank you for applying. A confirmation email has been sent. Save this ID to track your status.</p>
          <div className="bg-black border border-white/10 p-6 rounded-xl font-mono text-2xl text-purple-400 tracking-widest">{trackingId}</div>
        </div>
      </main>
    );
  }

  if (!job) return <div className="min-h-screen bg-[#0a0a0a] pt-32 text-center text-white">Loading Requirements...</div>;

  const isFull = job.max_applications && applicantCount >= job.max_applications;

  return (
    <main className="w-full bg-[#0f111a] text-gray-200 min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT: JOB DESCRIPTION */}
        <div>
          <div className="mb-8 border-b border-white/10 pb-6">
            <h1 className={`${spaceGrotesk.className} text-4xl font-bold text-white mb-4`}>{job.role}</h1>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded">{job.type}</span>
              <span className="bg-white/5 border border-white/10 px-3 py-1 rounded">{job.location}</span>
              {job.pay_range && <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded">{job.pay_range}</span>}
              <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded">
                {applicantCount} {job.max_applications ? `/ ${job.max_applications}` : ''} Applicants
              </span>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-bold text-white mb-3">About the Role</h3>
            <p className="text-gray-400 mb-8 whitespace-pre-wrap leading-relaxed">{job.description}</p>
            <h3 className="text-xl font-bold text-white mb-3">Eligibility & Requirements</h3>
            <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">{job.eligibility}</p>
          </div>
        </div>

        {/* RIGHT: PROFESSIONAL APPLICATION FORM */}
        <div className="bg-[#161925] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl">
          <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-white mb-6`}>Submit Application</h2>
          
          {status === 'error' && (
            <div className="bg-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-sm font-medium border border-red-500/30">{errorMessage}</div>
          )}

          {isFull ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-8 rounded-xl text-center">
              <h3 className="text-yellow-500 font-bold text-xl mb-2">Capacity Reached</h3>
              <p className="text-gray-400 text-sm">We have received the maximum number of applications for this node. The recruitment window is currently closed.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form Fields... */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Full Name *</label>
                  <input name="name" required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none text-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Email Address *</label>
                  <input type="email" name="email" required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Highest Qualification *</label>
                  <select name="qualification" required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 text-white"><option value="">Select...</option><option value="High School">High School</option><option value="Bachelors">Bachelor's Degree</option><option value="Masters">Master's Degree</option><option value="PhD">PhD / Doctorate</option></select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Years of Experience *</label>
                  <select name="age" required className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 text-white"><option value="">Select...</option><option value="0-2">0 - 2 Years</option><option value="3-5">3 - 5 Years</option><option value="5-10">5 - 10 Years</option><option value="10+">10+ Years</option></select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Work Availability</label>
                  <select name="flexible_hours" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 text-white"><option value="Standard">Standard Hours</option><option value="Flexible">Flexible / Asynchronous</option></select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Gender (Optional)</label>
                  <select name="gender" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 text-white"><option value="">Prefer not to say</option><option value="Male">Male</option><option value="Female">Female</option><option value="Non-binary">Non-binary</option></select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Portfolio Link (Optional)</label>
                <input type="url" name="portfolio" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-purple-500 outline-none text-white" />
              </div>

              <div className="pt-4 border-t border-white/10">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="consent" required className="mt-1" />
                  <span className="text-xs text-gray-400 leading-relaxed">I consent to Reality Decoded processing my personal data for recruitment purposes. *</span>
                </label>
              </div>

              <button disabled={status === 'submitting'} type="submit" className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-500 transition-all text-sm disabled:opacity-50 mt-4 shadow-lg shadow-purple-500/20">
                {status === 'submitting' ? 'Processing...' : 'Apply for this Job'}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}