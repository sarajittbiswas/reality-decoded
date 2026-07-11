'use client';

import { useEffect, useState, useRef } from 'react';

export default function StatCounter({ end, suffix, label }: { end: number, suffix: string, label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        let start = 0;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            clearInterval(timer);
            setCount(end);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref}>
      <h3 className="font-space-grotesk text-4xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-400 transition-all duration-300">
        {count}{suffix}
      </h3>
      <p className="text-xs font-mono tracking-widest text-gray-500 uppercase mt-2 group-hover:text-gray-400 transition-colors">
        {label}
      </p>
    </div>
  );
}