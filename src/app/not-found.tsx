"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

// Array of sarcastic, Syndicate-themed error messages
const SARCASTIC_QUOTES = [
  "Congratulations. You've successfully decoded a reality that doesn't exist.",
  "Error 404: The truth you are looking for has been heavily redacted.",
  "You've wandered off the grid. The Syndicate has no jurisdiction here.",
  "Simulation boundary reached. Please return to the designated narrative.",
  "This sector of reality is currently undergoing maintenance."
];

export default function NotFound() {
  const [hue, setHue] = useState(160); // Starts at Emerald Green
  const [quote, setQuote] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Pick a random quote on mount
  useEffect(() => {
    setQuote(SARCASTIC_QUOTES[Math.floor(Math.random() * SARCASTIC_QUOTES.length)]);
  }, []);

  // 3D Tilt Effect on Desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Generate 450 random SVG particles mathematically
  const particles = useMemo(() => {
    return Array.from({ length: 450 }).map((_, i) => {
      const type = ['rect', 'circle', 'triangle'][Math.floor(Math.random() * 3)];
      const x = Math.random() * 1200; // viewBox width
      const y = Math.random() * 250;  // viewBox height
      const size = Math.random() * 25 + 5;
      const hueOffset = Math.random() * 60 - 30; // Subtle color variance per shape
      const animDuration = Math.random() * 4 + 2; 
      const animDelay = Math.random() * -5;
      
      return { id: i, type, x, y, size, hueOffset, animDuration, animDelay };
    });
  }, []);

  return (
    <main 
      className={`min-h-screen bg-[#020202] text-zinc-300 flex flex-col items-center justify-center relative overflow-hidden ${spaceGrotesk.className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* DEEP SPACE BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* CSS ANIMATIONS FOR PARTICLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-spin {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-15px) rotate(180deg) scale(1.2); }
          100% { transform: translateY(0) rotate(360deg) scale(1); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 0 20px hsl(${hue}, 100%, 50%);
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:active {
          transform: scale(1.2);
        }
      `}} />

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col items-center">
        
        {/* TOP BADGE */}
        <div className={`${jetBrainsMono.className} inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-10 animate-pulse`}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          Critical System Failure // 404
        </div>

        {/* 3D INTERACTIVE SVG TEXT ENGINE */}
        <div 
          ref={containerRef}
          className="w-full relative preserve-3d transition-transform duration-200 ease-out mb-16"
          style={{ 
            perspective: '1200px',
            transform: `rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)`
          }}
        >
          {/* Glowing backdrop shadow reacting to the slider */}
          <div 
            className="absolute inset-0 blur-[100px] opacity-30 transition-colors duration-300"
            style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
          ></div>

          {/* The Actual SVG Masking Magic */}
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 1200 250" 
            className="w-full h-auto drop-shadow-2xl overflow-visible"
          >
            <defs>
              <clipPath id="text-mask">
                <text 
                  x="50%" 
                  y="50%" 
                  dominantBaseline="middle" 
                  textAnchor="middle" 
                  fontSize="120" 
                  fontWeight="900" 
                  fontFamily="'Space Grotesk', sans-serif" 
                  letterSpacing="4"
                  className="uppercase"
                >
                  REALITY DECODED
                </text>
              </clipPath>
            </defs>

            {/* Render hundreds of shapes masked perfectly into the text */}
            <g clipPath="url(#text-mask)">
              <rect width="100%" height="100%" fill="#111" /> {/* Dark Base */}
              
              {particles.map((p) => {
                const shapeColor = `hsl(${(hue + p.hueOffset) % 360}, 90%, 60%)`;
                
                const style = {
                  animation: `float-spin ${p.animDuration}s linear infinite, pulse-glow 3s ease-in-out infinite`,
                  animationDelay: `${p.animDelay}s`,
                  transformOrigin: `${p.x + p.size/2}px ${p.y + p.size/2}px`
                };

                if (p.type === 'circle') {
                  return <circle key={p.id} cx={p.x} cy={p.y} r={p.size / 2} fill={shapeColor} style={style} opacity={0.8} />;
                }
                if (p.type === 'rect') {
                  return <rect key={p.id} x={p.x} y={p.y} width={p.size} height={p.size} fill={shapeColor} style={style} opacity={0.8} rx="4" />;
                }
                // Triangle
                return (
                  <polygon 
                    key={p.id} 
                    points={`${p.x},${p.y} ${p.x + p.size},${p.y + p.size} ${p.x - p.size},${p.y + p.size}`} 
                    fill={shapeColor} 
                    style={style} 
                    opacity={0.8} 
                  />
                );
              })}
            </g>
            
            {/* Very faint wireframe outline of the text for structure */}
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle" 
              fontSize="120" 
              fontWeight="900" 
              fontFamily="'Space Grotesk', sans-serif" 
              letterSpacing="4"
              fill="none"
              stroke={`hsl(${hue}, 30%, 30%)`}
              strokeWidth="2"
              className="uppercase opacity-30 pointer-events-none"
            >
              REALITY DECODED
            </text>
          </svg>
        </div>

        {/* THE COLOR SHIFTING GAME / SLIDER */}
        <div className="w-full max-w-md mx-auto mb-16 flex flex-col items-center bg-[#0a0a0a]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/5 shadow-2xl">
          <div className={`${jetBrainsMono.className} text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-6 flex justify-between w-full`}>
            <span>Alter Reality Spectrum</span>
            <span style={{ color: `hsl(${hue}, 100%, 60%)` }}>HZ-{Math.floor(hue)}</span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full h-2 rounded-full outline-none appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, 
                hsl(0, 100%, 50%), hsl(60, 100%, 50%), 
                hsl(120, 100%, 50%), hsl(180, 100%, 50%), 
                hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))`
            }}
          />
          <p className="text-zinc-600 text-xs mt-6 font-light">Swipe to recalibrate the visual engine.</p>
        </div>

        {/* SARCASTIC QUOTE & ACTIONS */}
        <div className="text-center mt-4">
          <p className="text-zinc-400 text-lg md:text-xl font-light mb-10 max-w-2xl leading-relaxed">
            {quote}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/" 
              className={`${jetBrainsMono.className} group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest bg-white text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]`}
            >
              Reboot Simulation
            </Link>
            <Link 
              href="/archives" 
              className={`${jetBrainsMono.className} inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest bg-transparent text-zinc-400 border border-zinc-700 transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-zinc-500`}
            >
              View Archives
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
