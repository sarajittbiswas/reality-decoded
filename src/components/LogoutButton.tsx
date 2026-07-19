"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Power, AlertTriangle, Check, X, Loader2 } from 'lucide-react';

export default function LogoutButton() {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // UPGRADED: Pointing to the main auth route and sending the logout action
      await fetch('/api/auth', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' })
      });
      
      // UPGRADED: Using window.location forces a hard reset of the browser cache and Next.js router
      window.location.href = '/hq/login';
    } catch (e) {
      console.error('Failed to disconnect:', e);
      setIsLoggingOut(false);
      setIsConfirming(false);
    }
  };

  // WARNING STATE (User clicked once)
  if (isConfirming) {
    return (
      <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/50 text-red-500 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-widest animate-in fade-in slide-in-from-right-4 duration-300">
        <AlertTriangle size={14} className="animate-pulse" />
        <span>INITIATE LOCKDOWN?</span>
        
        <div className="flex items-center gap-1 ml-2 border-l border-red-500/30 pl-2">
          {isLoggingOut ? (
            <Loader2 size={14} className="animate-spin text-red-500 mx-2" />
          ) : (
            <>
              {/* Confirm Button */}
              <button onClick={handleLogout} className="hover:bg-red-500 hover:text-white p-1 rounded transition-colors text-red-400">
                <Check size={16} />
              </button>
              {/* Cancel Button */}
              <button onClick={() => setIsConfirming(false)} className="hover:bg-gray-800 hover:text-gray-300 p-1 rounded transition-colors text-gray-500">
                <X size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // DEFAULT STATE
  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="flex items-center gap-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-widest transition-all"
    >
      <Power size={14} />
      <span>Disconnect</span>
    </button>
  );
}