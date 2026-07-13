"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SecretEntrance() {
  const router = useRouter();
  
  // 🚨 Strictly pulls from the .env file. No hardcoded fallback.
  // Note: ensure your .env value is purely lowercase.
  const secretCode = process.env.NEXT_PUBLIC_GHOST_PROTOCOL; 

  useEffect(() => {
    // 🚨 If the environment variable is missing, the listener aborts entirely.
    // The backdoor remains completely shut.
    if (!secretCode) return;

    let buffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable
      ) {
        return;
      }

      buffer += e.key.toLowerCase();
      
      if (buffer.length > secretCode.length) {
        buffer = buffer.slice(-secretCode.length);
      }

      if (buffer === secretCode) {
        buffer = ''; 
        router.push('/hq');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, secretCode]);

  return null; 
}