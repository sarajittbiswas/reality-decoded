// src/components/Watermark.tsx
"use client";
import { useState, useRef, MouseEvent } from 'react';

export default function Watermark() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Softened the core of the gradient (5% instead of 15%) for a smoother fade
  const maskString = `radial-gradient(circle 90px at ${position.x}px ${position.y}px, black 5%, transparent 100%)`;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex justify-center items-end cursor-crosshair overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 1. Resting State (Dark Stealth Grey) */}
      <h1 className="absolute font-sans text-[13.8vw] font-bold tracking-tight leading-none text-[#111111] whitespace-nowrap select-none bottom-0 translate-y-[22%] w-full text-center flex justify-center">
        Reality Decoded
      </h1>

      {/* 2. Hover Reveal State (Changed to #a1a1aa for a darker, moody metallic glow) */}
      <h1 
        className="absolute font-sans text-[13.8vw] font-bold tracking-tight leading-none text-[#a1a1aa] whitespace-nowrap select-none bottom-0 translate-y-[22%] w-full text-center flex justify-center pointer-events-none"
        style={{
          WebkitMaskImage: maskString,
          maskImage: maskString,
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.2s ease-out'
        }}
      >
        Reality Decoded
      </h1>
    </div>
  );
}