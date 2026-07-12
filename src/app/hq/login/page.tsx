"use client";

import { useState } from 'react';
import { Space_Grotesk } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Fingerprint, Lock, ArrowRight, Loader2 } from 'lucide-react';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export default function SyndicateLogin() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isChecking, setIsChecking] = useState(false);
  
  // Track specific error states
  const [errorCode, setErrorCode] = useState<'' | 'invalid_id' | 'invalid_password' | 'invalid_pin' | 'error'>('');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  // 🚨 Handle Step 1 Verification
  const handleStepOne = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setErrorCode('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 1, username, password })
      });
      const data = await res.json();

      if (data.success) {
        // ID & Pass verified, proceed to PIN
        setStep(2);
      } else {
        // Set the specific error (e.g., 'invalid_id' or 'invalid_password')
        setErrorCode(data.error); 
      }
    } catch (error) {
      setErrorCode('error');
    } finally {
      setIsChecking(false);
    }
  };

  // 🚨 Handle Final PIN Verification
  const handleFinalAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setErrorCode('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 2, username, password, pin })
      });
      const data = await res.json();

      if (data.success) {
        router.push('/hq');
        router.refresh();
      } else {
        setErrorCode(data.error); // e.g., 'invalid_pin'
        setPin(''); // Clear the pin so they can try again
      }
    } catch (error) {
      setErrorCode('error');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative font-mono overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-900/10 blur-[150px] pointer-events-none rounded-full"></div>

      <div className="w-full max-w-md relative z-10">
        
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-[#111] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative">
            {step === 1 ? <ShieldAlert className="text-purple-400" size={32} /> : <Fingerprint className="text-purple-400 animate-pulse" size={32} />}
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-[#050505]"></div>
          </div>
          <h1 className={`${spaceGrotesk.className} text-3xl font-bold text-white tracking-widest uppercase`}>
            Restricted Access
          </h1>
          <p className="text-gray-500 text-xs tracking-widest mt-2 uppercase">Syndicate Command Center</p>
        </div>

        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          
          <div className={`absolute top-0 inset-x-0 h-1 transition-colors duration-500 ${errorCode ? 'bg-red-500 shadow-[0_0_15px_red]' : isChecking ? 'bg-purple-500 shadow-[0_0_15px_purple] animate-pulse' : 'bg-white/10'}`}></div>

          {step === 1 ? (
            <form onSubmit={handleStepOne} className="flex flex-col gap-5 animate-in slide-in-from-right-8 duration-500">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Operator ID</label>
                <input 
                  type="text" 
                  required 
                  autoFocus
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setErrorCode(''); }}
                  // 🚨 Specific Error Outline
                  className={`w-full bg-[#111] border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm font-mono
                    ${errorCode === 'invalid_id' ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50'}`}
                  placeholder="Enter clearance ID..."
                />
                {errorCode === 'invalid_id' && <span className="text-red-400 text-[10px] uppercase tracking-widest mt-1">Error: Clearance ID not found.</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Passkey</label>
                <div className="relative">
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrorCode(''); }}
                    // 🚨 Specific Error Outline
                    className={`w-full bg-[#111] border rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all text-sm tracking-widest font-mono
                      ${errorCode === 'invalid_password' ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/10 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50'}`}
                    placeholder="••••••••••••"
                  />
                  <Lock className={`absolute right-3 top-3.5 ${errorCode === 'invalid_password' ? 'text-red-500' : 'text-gray-600'}`} size={16} />
                </div>
                {errorCode === 'invalid_password' && <span className="text-red-400 text-[10px] uppercase tracking-widest mt-1">Error: Passkey mismatch.</span>}
              </div>

              <button type="submit" disabled={isChecking} className="mt-2 w-full bg-white hover:bg-gray-200 text-black font-bold uppercase tracking-widest text-xs py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50">
                {isChecking ? <Loader2 size={16} className="animate-spin text-black" /> : <><ArrowRight size={16} /> Initialize Uplink</>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleFinalAuth} className="flex flex-col gap-6 animate-in slide-in-from-right-8 duration-500 text-center">
              <div>
                <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest mb-1">Secondary Authentication</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Enter 4-Digit Authorization Code</p>
              </div>

              <input 
                type="password"
                maxLength={4}
                required
                autoFocus
                value={pin}
                onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setErrorCode(''); }}
                className={`w-full bg-[#111] border rounded-lg px-4 py-4 text-center tracking-[1em] text-2xl focus:outline-none transition-all font-mono
                  ${errorCode === 'invalid_pin' ? 'border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)] focus:border-red-500' : 'border-white/10 text-white focus:border-purple-500/50'}`} 
                placeholder="••••"
              />

              {errorCode === 'invalid_pin' && (
                <p className="text-[10px] text-red-400 uppercase tracking-widest animate-pulse">Error: Invalid Authorization Code.</p>
              )}

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => { setStep(1); setErrorCode(''); }} disabled={isChecking} className="w-1/3 bg-transparent border border-white/10 hover:bg-white/5 text-gray-400 font-bold uppercase tracking-widest text-[10px] py-4 rounded-lg transition-all">
                  Back
                </button>
                <button type="submit" disabled={isChecking || pin.length < 4} className="w-2/3 bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-widest text-[10px] py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-50">
                  {isChecking ? <Loader2 size={16} className="animate-spin" /> : 'Verify & Enter'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}