"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SecretEntrance() {
  const pathname = usePathname();
  const secretCode = process.env.NEXT_PUBLIC_GHOST_PROTOCOL; 

  useEffect(() => {
    // 🚨 DISABLE IF INSIDE HQ
    // This stops the code from running if you are already in the HQ terminal
    if (pathname.startsWith('/hq')) return;
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
        window.open('/hq', '_blank', 'noopener,noreferrer');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretCode, pathname]); // Added pathname as a dependency

  return null; 
}