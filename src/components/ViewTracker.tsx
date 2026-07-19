'use client';

import { useEffect, useRef } from 'react';

export default function ViewTracker({ slug }: { slug: string }) {
  const hasFired = useRef(false);

  useEffect(() => {
    // Prevents double-counting in Next.js Strict Mode
    if (hasFired.current) return;
    hasFired.current = true;

    fetch('/api/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'VIEW', id: `blog-${slug}` })
    }).catch(() => {});
  }, [slug]);

  return null;
}