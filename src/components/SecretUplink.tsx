'use client';
import { useEffect, useState } from 'react';

export default function SecretUplink() {
  const [keys, setKeys] = useState<string[]>([]);
  
  // Pull the secret key from .env, fallback to 'hrnode' if it fails to load
  const rawKey = process.env.NEXT_PUBLIC_HR_UPLINK_KEY || 'hrnode';
  const secretCode = rawKey.toLowerCase().split(''); 

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing inside an actual input, text area, or form
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      setKeys((prevKeys) => {
        // Keep track of the last X keys pressed (matching the length of our secret code)
        const newKeys = [...prevKeys, e.key.toLowerCase()].slice(-secretCode.length);
        
        // If the array of pressed keys matches our secret code, trigger the uplink!
        if (newKeys.join('') === secretCode.join('')) {
          
          // LAUNCH SECURE PORTAL IN A NEW TAB
          window.open('/hr-portal', '_blank');
          
          return []; // Reset keys after triggering
        }
        
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretCode]);

  return null; // Invisible component
}