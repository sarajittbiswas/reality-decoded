'use client';
import React, { useState, useEffect } from 'react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function HRDashboard() {
  const [authStage, setAuthStage] = useState<'login' | 'otp' | 'authenticated'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({ jobs: [], applications: [], analytics: [] });
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  
  const [modal, setModal] = useState({ show: false, title: '', desc: '', action: () => {} });

  const [appFilter, setAppFilter] = useState<'All' | 'Latest' | 'In Review' | 'Selected' | 'Rejected'>('All');
  const [appJobFilter, setAppJobFilter] = useState<string>('All Jobs');
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [jobTab, setJobTab] = useState<'Active' | 'Expired' | 'Hidden' | 'Deleted'>('Active');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      setActiveTab(hash);
    };
    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const changeTab = (tab: string) => {
    window.history.pushState(null, '', `#${tab}`);
    setActiveTab(tab);
    if (tab !== 'editJob') setEditingJob(null);
  };

  useEffect(() => {
    fetch('/api/hr/auth')
      .then((res) => {
        if (res.ok) {
          setAuthStage('authenticated');
          fetchData();
        }
      })
      .catch(() => console.log('No active session'));
  }, []);

  const fetchData = async () => {
    const res = await fetch('/api/hr/manage');
    const json = await res.json();
    setData(json);
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 4000);
  };

  const confirmAction = (title: string, desc: string, action: () => void) => {
    setModal({ show: true, title, desc, action: () => { action(); setModal({ ...modal, show: false }); } });
  };

  // --- AUTH HANDLERS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    const res = await fetch('/api/hr/auth', { method: 'POST', body: JSON.stringify({ action: 'login', email, password }) });
    setIsSending(false);
    if (res.ok) setAuthStage('otp');
    else showToast('Invalid Credentials', 'error');
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/hr/auth', { method: 'POST', body: JSON.stringify({ action: 'verify', email, otp }) });
    if (res.ok) {
      setAuthStage('authenticated');
      fetchData();
      showToast('Authentication Successful');
    } else showToast('Invalid OTP', 'error');
  };

  // --- JOB MANAGEMENT ---
  const handlePostJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    await fetch('/api/hr/manage', {
      method: 'POST',
      body: JSON.stringify({
        action: 'post_job',
        role: formData.get('role'),
        type: formData.get('type'),
        location: formData.get('location'),
        daysActive: formData.get('daysActive'),
        description: formData.get('description'),
        eligibility: formData.get('eligibility'),
        payRange: formData.get('payRange'),
        maxApplications: formData.get('maxApplications')
      })
    });
    showToast('Job Deployed Successfully');
    form.reset();
    setJobTab('Active');
    changeTab('manageJobs');
    fetchData();
  };

  const handleLogout = async () => {
    await fetch('/api/hr/auth', { 
      method: 'POST', 
      body: JSON.stringify({ action: 'logout' }) 
    });
    setAuthStage('login');
    setEmail('');
    setPassword('');
    setOtp('');
    window.location.hash = ''; 
    showToast('Secure Session Terminated');
  };

  const handleEditJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await fetch('/api/hr/manage', {
      method: 'PATCH',
      body: JSON.stringify({
        action: 'edit_job',
        jobId: editingJob.id,
        role: formData.get('role'),
        type: formData.get('type'),
        location: formData.get('location'),
        description: formData.get('description'),
        eligibility: formData.get('eligibility'),
        payRange: formData.get('payRange'),
        maxApplications: formData.get('maxApplications'),
        daysActive: formData.get('daysActive')
      })
    });
    showToast('Job Updates Saved & Reactivated');
    setEditingJob(null);
    changeTab('manageJobs');
    fetchData();
  };

  const handleToggleJob = async (jobId: string, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await fetch('/api/hr/manage', { method: 'PATCH', body: JSON.stringify({ action: 'toggle_job', jobId, isActive: newStatus }) });
    showToast(newStatus === 1 ? 'Job Reactivated & Visible' : 'Job Hidden from Public');
    fetchData();
  };

  const handleDeleteJob = async (jobId: string) => {
    confirmAction('Archive Terminal', 'Are you sure you want to delete this job? It will be moved to the archives.', async () => {
      await fetch(`/api/hr/manage?id=${jobId}&type=job`, { method: 'DELETE' });
      showToast('Job Moved to Archives');
      fetchData();
    });
  };

  const handleRestoreJob = async (jobId: string) => {
    await fetch('/api/hr/manage', { method: 'PATCH', body: JSON.stringify({ action: 'restore_job', jobId }) });
    showToast('Job Restored');
    fetchData();
  };

  // --- APPLICATIONS ---
  const updateStatus = async (trackingId: string, newStatus: string) => {
    await fetch('/api/hr/manage', { method: 'PATCH', body: JSON.stringify({ action: 'update_status', trackingId, newStatus }) });
    showToast('Status Updated & Applicant Emailed');
    fetchData();
  };

  const deleteApplication = async (trackingId: string) => {
    confirmAction('Purge Intel', 'Permanently delete this application? This cannot be undone.', async () => {
      await fetch(`/api/hr/manage?id=${trackingId}&type=application`, { method: 'DELETE' });
      showToast('Application Purged');
      fetchData();
    });
  };

  const blockApplicant = async (emailToBlock: string) => {
    confirmAction('Blacklist Entity', `Block ${emailToBlock} from all future applications?`, async () => {
      await fetch('/api/hr/manage', { method: 'POST', body: JSON.stringify({ action: 'block', email: emailToBlock }) });
      showToast('Target Blacklisted');
      fetchData();
    });
  };

  if (authStage === 'login' || authStage === 'otp') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-24 relative px-4">
        <form onSubmit={authStage === 'login' ? handleLogin : handleOtp} className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col gap-5 w-full max-w-md shadow-2xl">
          <div className="text-center mb-2">
            <h1 className={`${spaceGrotesk.className} text-2xl text-white font-bold`}>HR Secure Access</h1>
            <p className="text-gray-500 text-sm mt-1">Reality Decoded Internal</p>
          </div>
          {authStage === 'login' ? (
            <>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Agent Email" required className="w-full bg-black border border-white/20 p-3 rounded-lg text-white focus:border-purple-500 outline-none" />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="w-full bg-black border border-white/20 p-3 pr-12 rounded-lg text-white focus:border-purple-500 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400"><span className="text-xs font-bold">{showPassword ? 'HIDE' : 'SHOW'}</span></button>
              </div>
              <button disabled={isSending} type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-bold hover:bg-purple-500 transition-colors disabled:opacity-50">{isSending ? 'Authenticating...' : 'Request Access'}</button>
            </>
          ) : (
            <>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-Digit Code" required className="w-full bg-black border border-white/20 p-3 rounded-lg text-white text-center tracking-widest text-xl focus:border-purple-500 outline-none" />
              <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg font-bold hover:bg-purple-500 transition-colors">Verify & Login</button>
            </>
          )}
        </form>
      </div>
    );
  }

  // --- DATA CALCULATIONS ---
  const careerViews = data.analytics?.filter((a: any) => a.page_type === 'career_home').reduce((acc: number, curr: any) => acc + curr.views, 0) || 0;
  const applyViews = data.analytics?.filter((a: any) => a.page_type === 'job_apply').reduce((acc: number, curr: any) => acc + curr.views, 0) || 0;
  const totalViews = (careerViews + applyViews) || 1; 
  const careerPct = Math.round((careerViews / totalViews) * 100);

  const activeJobs = data.jobs?.filter((j: any) => j.is_deleted === 0 && new Date(j.expires_at) > new Date() && (j.is_active === 1 || j.is_active === null)) || [];

  let filteredApps = data.applications || [];
  if (appFilter === 'Latest') filteredApps = (data.applications || []).slice(0, 10);
  else if (appFilter !== 'All') filteredApps = (data.applications || []).filter((a: any) => a.status === appFilter.toLowerCase().replace(' ', '_'));
  
  if (appJobFilter !== 'All Jobs') filteredApps = filteredApps.filter((a: any) => a.job_title === appJobFilter);

  const uniqueJobsList = (data.jobs || []).filter((j: any) => j.is_deleted === 0).map((j: any) => j.role);

  return (
    // FIX: Main layout is now flex-col on mobile, flex-row on desktop
    <div className="min-h-screen bg-[#0f111a] text-gray-200 flex flex-col md:flex-row pt-20 relative overflow-hidden"> 
      
      {/* CUSTOM CONFIRMATION MODAL */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161925] border border-white/10 p-6 md:p-8 rounded-2xl max-w-md w-full shadow-2xl transform scale-100 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{modal.title}</h3>
            <p className="text-sm md:text-base text-gray-400 mb-8">{modal.desc}</p>
            <div className="flex justify-end gap-3 md:gap-4">
              <button onClick={() => setModal({ ...modal, show: false })} className="px-4 py-2 md:px-5 md:py-2 rounded-lg font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={modal.action} className="px-4 py-2 md:px-5 md:py-2 rounded-lg font-bold bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-colors border border-red-500/30">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {toast.show && (
        <div className={`fixed bottom-10 right-4 md:right-10 px-6 py-4 rounded-xl font-bold shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 border backdrop-blur-md animate-bounce ${toast.type === 'success' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
          {toast.msg}
        </div>
      )}

      {/* FIX: Sidebar adapts to a top scrolling nav bar on mobile */}
      <div className="w-full md:w-64 bg-[#161925] border-b md:border-b-0 md:border-r border-white/5 p-4 md:p-6 flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-y-auto shrink-0 md:h-[calc(100vh-80px)] z-10 [scrollbar-width:none]">
        <h2 className={`${spaceGrotesk.className} text-xl font-bold text-white mb-6 hidden md:block`}>HR<span className="text-purple-500">Portal</span></h2>
        <button onClick={() => changeTab('dashboard')} className={`whitespace-nowrap text-sm md:text-base text-left px-4 py-2 md:p-3 rounded-lg font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>Overview</button>
        <button onClick={() => changeTab('applications')} className={`whitespace-nowrap text-sm md:text-base text-left px-4 py-2 md:p-3 rounded-lg font-medium transition-colors ${activeTab === 'applications' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>Applicant Tracking</button>
        <button onClick={() => changeTab('manageJobs')} className={`whitespace-nowrap text-sm md:text-base text-left px-4 py-2 md:p-3 rounded-lg font-medium transition-colors ${activeTab === 'manageJobs' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>Manage Jobs</button>
        <button onClick={() => changeTab('postJob')} className={`whitespace-nowrap text-sm md:text-base text-left px-4 py-2 md:p-3 rounded-lg font-medium transition-colors ${activeTab === 'postJob' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}>Deploy New Job</button>
        <div className="md:mt-auto flex items-center md:items-start whitespace-nowrap px-4 py-2 md:px-0 md:py-0 md:pt-6 border-l md:border-l-0 md:border-t border-white/5 text-sm text-gray-500 hover:text-red-400 cursor-pointer font-medium transition-colors" onClick={handleLogout}>End Secure Session</div>
      </div>

      <div className="flex-1 p-4 md:p-10 h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] overflow-y-auto w-full">
        
        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="max-w-6xl mx-auto pb-10">
            <h1 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8`}>Command Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
              <div onClick={() => { changeTab('applications'); setAppFilter('All'); }} className="bg-[#161925] p-5 md:p-6 rounded-2xl border border-white/5 cursor-pointer hover:border-purple-500/50 hover:bg-[#1a1e2d] transition-all group">
                <h3 className="text-gray-400 group-hover:text-purple-300 font-medium text-sm md:text-base">Total Applications</h3>
                <p className="text-3xl md:text-4xl font-bold text-white mt-2 md:mt-3">{(data.applications || []).length}</p>
              </div>
              <div onClick={() => changeTab('manageJobs')} className="bg-[#161925] p-5 md:p-6 rounded-2xl border border-white/5 cursor-pointer hover:border-purple-500/50 hover:bg-[#1a1e2d] transition-all group">
                <h3 className="text-gray-400 group-hover:text-purple-300 font-medium text-sm md:text-base">Active Jobs</h3>
                <p className="text-3xl md:text-4xl font-bold text-white mt-2 md:mt-3">{activeJobs.length}</p>
              </div>
              <div onClick={() => { changeTab('applications'); setAppFilter('In Review'); }} className="bg-[#161925] p-5 md:p-6 rounded-2xl border border-white/5 cursor-pointer hover:border-yellow-500/50 hover:bg-[#1a1e2d] transition-all group">
                <h3 className="text-gray-400 group-hover:text-yellow-300 font-medium text-sm md:text-base">Pending Reviews</h3>
                <p className="text-3xl md:text-4xl font-bold text-yellow-500 mt-2 md:mt-3">{(data.applications || []).filter((a: any) => a.status === 'submitted').length}</p>
              </div>
              <div onClick={() => { changeTab('applications'); setAppFilter('Rejected'); }} className="bg-[#161925] p-5 md:p-6 rounded-2xl border border-white/5 cursor-pointer hover:border-red-500/50 hover:bg-[#1a1e2d] transition-all group">
                <h3 className="text-gray-400 group-hover:text-red-300 font-medium text-sm md:text-base">Rejected / Blocked</h3>
                <p className="text-3xl md:text-4xl font-bold text-red-500 mt-2 md:mt-3">{(data.applications || []).filter((a: any) => a.status === 'rejected').length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="col-span-1 lg:col-span-2 bg-[#161925] p-6 md:p-8 rounded-2xl border border-white/5">
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 md:mb-8">Network Traffic Analysis</h3>
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <div className="flex justify-between text-xs md:text-sm font-medium mb-3"><span className="text-purple-400">Career Landing Page Views</span><span className="text-white">{careerViews}</span></div>
                    <div className="w-full bg-black h-3 rounded-full overflow-hidden"><div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.min((careerViews / 2000) * 100, 100)}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs md:text-sm font-medium mb-3"><span className="text-blue-400">Job Detail / Apply Page Views</span><span className="text-white">{applyViews}</span></div>
                    <div className="w-full bg-black h-3 rounded-full overflow-hidden"><div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min((applyViews / 2000) * 100, 100)}%` }}></div></div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 bg-[#161925] p-6 md:p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-white mb-6 w-full text-left">Traffic Split</h3>
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-lg" style={{ background: `conic-gradient(#a855f7 ${careerPct}%, #3b82f6 ${careerPct}% 100%)` }}>
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-[#161925] rounded-full flex flex-col items-center justify-center">
                    <span className="text-xl md:text-2xl font-bold text-white">{totalViews}</span>
                    <span className="text-[10px] md:text-xs text-gray-500">Total Views</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-8 text-xs font-medium">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span>Landing</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span>Apply</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATIONS TRACKING */}
        {activeTab === 'applications' && (
          <div className="max-w-7xl mx-auto pb-10">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 md:mb-8">
              {/* FIX: Filter groups now scroll horizontally on mobile */}
              <div className="flex overflow-x-auto gap-2 bg-[#161925] p-2 rounded-xl border border-white/5 w-full md:w-auto [scrollbar-width:none]">
                {['All', 'Latest', 'In Review', 'Selected', 'Rejected'].map(filter => (
                  <button key={filter} onClick={() => setAppFilter(filter as any)} className={`whitespace-nowrap px-4 py-2 md:px-6 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${appFilter === filter ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    {filter}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 md:gap-3 bg-[#161925] p-2 rounded-xl border border-white/5 w-full md:w-auto">
                <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase ml-2 whitespace-nowrap">Shortlist By Job:</span>
                <select 
                  value={appJobFilter} 
                  onChange={(e) => setAppJobFilter(e.target.value)} 
                  className="bg-black border border-white/10 rounded-lg px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-white font-medium outline-none cursor-pointer w-full md:w-auto"
                >
                  <option value="All Jobs">All Jobs</option>
                  {uniqueJobsList.map((j: any) => <option key={j} value={j}>{j}</option>)}
                </select>
              </div>
            </div>

            {/* FIX: Table wrapper added to prevent squeezing/overflow */}
            <div className="bg-[#161925] rounded-2xl border border-white/5 overflow-x-auto shadow-2xl">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-[#11131c] text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                  <tr><th className="p-4 md:p-5 font-semibold">Applicant Profile</th><th className="p-4 md:p-5 font-semibold">Target Role</th><th className="p-4 md:p-5 font-semibold">Current Status</th><th className="p-4 md:p-5 font-semibold text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm md:text-base">
                  {filteredApps.length === 0 && (<tr><td colSpan={4} className="p-10 text-center text-gray-500 text-sm">No records found for this filter.</td></tr>)}
                  {filteredApps.map((app: any) => (
                    <React.Fragment key={app.tracking_id}>
                      <tr className="hover:bg-[#1a1e2d] transition-colors group">
                        <td className="p-4 md:p-5">
                          <div className="font-bold text-white">{app.applicant_name}</div>
                          <div className="text-xs text-gray-500 font-mono mt-1">{app.email}</div>
                        </td>
                        <td className="p-4 md:p-5 font-medium text-gray-300">{app.job_title}</td>
                        <td className="p-4 md:p-5">
                          <select 
                            className={`bg-black border rounded-lg px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-bold outline-none cursor-pointer appearance-none ${app.status === 'submitted' ? 'border-yellow-500/30 text-yellow-500' : app.status === 'in_review' ? 'border-blue-500/30 text-blue-500' : app.status === 'selected' ? 'border-green-500/30 text-green-500' : 'border-red-500/30 text-red-500'}`}
                            value={app.status} onChange={(e) => updateStatus(app.tracking_id, e.target.value)}
                          >
                            <option value="submitted">SUBMITTED</option><option value="in_review">IN REVIEW</option><option value="selected">APPROVED</option><option value="rejected">REJECTED</option>
                          </select>
                        </td>
                        <td className="p-4 md:p-5 flex items-center justify-end gap-3 md:gap-4">
                          {app.status === 'selected' && (<a href={`mailto:${app.email}?subject=Interview Invitation: ${app.job_title}`} className="bg-green-600/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-md text-[10px] md:text-xs font-bold hover:bg-green-600 hover:text-white transition-all shadow-[0_0_15px_rgba(34,197,94,0.1)]">Prepare Interview</a>)}
                          <button onClick={() => setExpandedApp(expandedApp === app.tracking_id ? null : app.tracking_id)} className="text-purple-400 text-xs md:text-sm font-semibold hover:text-white transition-colors">{expandedApp === app.tracking_id ? 'Close Data' : 'View Data'}</button>
                        </td>
                      </tr>
                      {expandedApp === app.tracking_id && (
                        <tr className="bg-[#11131c]">
                          <td colSpan={4} className="p-4 md:p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-l-2 border-purple-500 pl-4 md:pl-6">
                              <div><span className="block text-[10px] md:text-xs text-gray-500 uppercase mb-1">Tracking ID</span><span className="text-xs md:text-sm font-mono text-white">{app.tracking_id}</span></div>
                              <div><span className="block text-[10px] md:text-xs text-gray-500 uppercase mb-1">Portfolio</span>{app.portfolio_link ? <a href={app.portfolio_link} target="_blank" className="text-xs md:text-sm text-blue-400 hover:underline">Launch Link ↗</a> : <span className="text-xs md:text-sm text-gray-600">N/A</span>}</div>
                              <div><span className="block text-[10px] md:text-xs text-gray-500 uppercase mb-1">Qualification</span><span className="text-xs md:text-sm text-white">{app.qualification || 'N/A'}</span></div>
                              <div><span className="block text-[10px] md:text-xs text-gray-500 uppercase mb-1">Experience</span><span className="text-xs md:text-sm text-white">{app.age || 'N/A'}</span></div>
                              <div><span className="block text-[10px] md:text-xs text-gray-500 uppercase mb-1">Availability</span><span className="text-xs md:text-sm text-white">{app.flexible_hours || 'N/A'}</span></div>
                              <div><span className="block text-[10px] md:text-xs text-gray-500 uppercase mb-1">Gender</span><span className="text-xs md:text-sm text-white">{app.gender || 'N/A'}</span></div>
                              <div><span className="block text-[10px] md:text-xs text-gray-500 uppercase mb-1">Data Consent</span><span className="text-xs md:text-sm text-green-400">Verified ✓</span></div>
                              
                              <div className="col-span-full flex justify-end gap-3 md:gap-4 mt-2 md:mt-4 pt-4 border-t border-white/5">
                                <button onClick={() => deleteApplication(app.tracking_id)} className="text-red-400 text-[10px] md:text-xs font-bold hover:underline">Delete Application</button>
                                <button onClick={() => blockApplicant(app.email)} className="text-orange-500 text-[10px] md:text-xs font-bold hover:underline">Blacklist Candidate</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MANAGE JOBS */}
        {activeTab === 'manageJobs' && (
          <div className="max-w-6xl mx-auto pb-10">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
               <h1 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white`}>Job Terminals Hub</h1>
               <div className="flex bg-[#161925] p-1 rounded-lg border border-white/5 w-full md:w-auto overflow-x-auto [scrollbar-width:none]">
                 {['Active', 'Expired', 'Hidden', 'Deleted'].map(tab => (
                   <button key={tab} onClick={() => setJobTab(tab as any)} className={`whitespace-nowrap px-3 py-1.5 md:px-4 md:py-1.5 rounded-md text-xs md:text-sm font-bold transition-all ${jobTab === tab ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-white'}`}>
                     {tab}
                   </button>
                 ))}
               </div>
             </div>

             <div className="bg-[#161925] rounded-2xl border border-white/5 overflow-x-auto shadow-2xl">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-[#11131c] text-gray-400 text-xs md:text-sm uppercase tracking-wider">
                  <tr><th className="p-4 md:p-5 font-semibold">Role Identity</th><th className="p-4 md:p-5 font-semibold">Stats</th><th className="p-4 md:p-5 font-semibold">Status</th><th className="p-4 md:p-5 font-semibold text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm md:text-base">
                  {(data.jobs || []).length === 0 && (<tr><td colSpan={4} className="p-10 text-center text-gray-500 text-sm">No jobs exist in the database.</td></tr>)}
                  {(data.jobs || []).filter((j: any) => {
                    const isExpired = new Date(j.expires_at) < new Date();
                    const isHidden = j.is_active === 0;
                    if (jobTab === 'Deleted') return j.is_deleted === 1;
                    if (j.is_deleted === 1) return false; 
                    if (jobTab === 'Expired') return isExpired;
                    if (jobTab === 'Hidden') return isHidden && !isExpired;
                    return !isExpired && !isHidden;
                  }).map((job: any) => {
                    const applicantCount = (data.applications || []).filter((a: any) => a.job_id === job.id).length;
                    
                    return (
                      <tr key={job.id} className="hover:bg-[#1a1e2d] transition-colors">
                        <td className="p-4 md:p-5">
                          <div className="font-bold text-white">{job.role}</div>
                          <div className="text-[10px] md:text-xs text-gray-500 mt-1">{job.type} • {job.location}</div>
                        </td>
                        <td className="p-4 md:p-5">
                          <span className="bg-purple-600/20 text-purple-400 border border-purple-500/30 px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap">
                            {applicantCount} {job.max_applications ? `/ ${job.max_applications}` : ''} Apps
                          </span>
                        </td>
                        <td className="p-4 md:p-5">
                          {job.is_deleted === 1 ? <span className="text-red-400 text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> ARCHIVED</span> :
                           new Date(job.expires_at) < new Date() ? <span className="text-orange-400 text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span> EXPIRED</span> :
                           job.is_active === 0 ? <span className="text-gray-400 text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-2"><span className="w-2 h-2 rounded-full bg-gray-500"></span> HIDDEN</span> :
                           <span className="text-green-400 text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ACTIVE</span>}
                        </td>
                        <td className="p-4 md:p-5 flex items-center justify-end gap-3 md:gap-4">
                          {job.is_deleted === 1 ? (
                            <button onClick={() => handleRestoreJob(job.id)} className="text-green-400 text-[10px] md:text-xs font-bold hover:underline">Restore</button>
                          ) : (
                            <>
                              <button onClick={() => handleToggleJob(job.id, job.is_active === null ? 1 : job.is_active)} className="text-gray-400 text-[10px] md:text-xs font-bold hover:text-white">{job.is_active === 0 ? 'Unhide' : 'Hide'}</button>
                              <button onClick={() => { setEditingJob(job); changeTab('editJob'); }} className="text-blue-400 text-[10px] md:text-xs font-bold hover:underline">Edit</button>
                              <button onClick={() => handleDeleteJob(job.id)} className="text-red-500 text-[10px] md:text-xs font-bold hover:underline">Archive</button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* POST NEW JOB - FULL FIELDS */}
        {activeTab === 'postJob' && (
          <div className="max-w-3xl mx-auto pb-10">
            <div className="bg-[#161925] p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
              <h3 className={`${spaceGrotesk.className} text-2xl md:text-3xl font-bold text-white mb-2`}>Deploy New Terminal</h3>
              <p className="text-gray-400 mb-6 md:mb-8 text-xs md:text-sm">Create a new recruitment node on the public network.</p>
              
              <form onSubmit={handlePostJob} className="flex flex-col gap-4 md:gap-5">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Role Title</label>
                  <input name="role" placeholder="e.g. Senior Cinematographer" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none" />
                </div>
                {/* FIX: Form fields scale to 1 column on mobile, 2 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Employment Type</label>
                    <input name="type" placeholder="e.g. Full-Time" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
                    <input name="location" placeholder="e.g. Remote" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Compensation Range</label>
                    <input name="payRange" placeholder="e.g. $80k - $120k USD" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Max Applicants Cap (Optional)</label>
                    <input name="maxApplications" type="number" placeholder="Leave blank for infinite" className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Role Description</label>
                  <textarea name="description" placeholder="Detail the core responsibilities..." required rows={4} className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Eligibility & Requirements</label>
                  <textarea name="eligibility" placeholder="Required skills and clearances..." required rows={3} className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Node Lifespan (Days)</label>
                  <input name="daysActive" type="number" defaultValue="30" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-purple-500 outline-none" />
                </div>
                <button type="submit" className="w-full bg-purple-600 text-white p-3 md:p-4 rounded-xl font-bold hover:bg-purple-500 transition-all mt-2 md:mt-4 uppercase text-xs md:text-sm">Deploy Job Listing</button>
              </form>
            </div>
          </div>
        )}

        {/* EDIT EXISTING JOB - FULL FIELDS */}
        {activeTab === 'editJob' && (
          <div className="max-w-3xl mx-auto pb-10">
            {editingJob ? (
              <div className="bg-[#161925] p-6 md:p-10 rounded-3xl border border-blue-500/30 shadow-2xl relative">
                <button onClick={() => changeTab('manageJobs')} className="absolute top-4 right-4 md:top-8 md:right-8 text-xs md:text-sm font-bold text-gray-500 hover:text-white">Cancel Edit ✕</button>
                <h3 className={`${spaceGrotesk.className} text-xl md:text-3xl font-bold text-white mb-2`}>Edit Terminal Data</h3>
                <p className="text-gray-400 mb-6 md:mb-8 text-xs md:text-sm">Modifying parameters for: <strong className="text-blue-400">{editingJob.role}</strong></p>
                
                <form onSubmit={handleEditJob} className="flex flex-col gap-4 md:gap-5">
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Role Title</label>
                    <input name="role" defaultValue={editingJob.role} placeholder="e.g. Senior Cinematographer" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Employment Type</label>
                      <input name="type" defaultValue={editingJob.type} placeholder="e.g. Full-Time" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Location</label>
                      <input name="location" defaultValue={editingJob.location} placeholder="e.g. Remote" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Compensation Range</label>
                      <input name="payRange" defaultValue={editingJob.pay_range} placeholder="e.g. $80k - $120k USD" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Max Applicants Cap (Optional)</label>
                      <input name="maxApplications" type="number" defaultValue={editingJob.max_applications} placeholder="Leave blank for infinite" className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Role Description</label>
                    <textarea name="description" defaultValue={editingJob.description} placeholder="Detail the core responsibilities..." required rows={4} className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Eligibility & Requirements</label>
                    <textarea name="eligibility" defaultValue={editingJob.eligibility} placeholder="Required skills and clearances..." required rows={3} className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-xs font-bold text-gray-500 uppercase mb-2">Add Days to Lifespan (Restores Expired Jobs)</label>
                    <input name="daysActive" type="number" defaultValue="30" required className="w-full bg-black border border-white/10 rounded-xl p-3 md:p-4 text-sm text-white focus:border-blue-500 outline-none" />
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white p-3 md:p-4 rounded-xl font-bold hover:bg-blue-500 transition-all mt-2 md:mt-4 text-xs md:text-sm uppercase">Save Changes</button>
                </form>
              </div>
            ) : (
              <div className="text-center p-10 md:p-20 bg-[#161925] border border-white/5 rounded-2xl">
                <p className="text-gray-400 mb-4 text-sm">No job selected for editing.</p>
                <button onClick={() => changeTab('manageJobs')} className="bg-purple-600 text-white px-4 md:px-6 py-2 rounded-lg font-bold text-sm md:text-base">Return to Manage Jobs</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}