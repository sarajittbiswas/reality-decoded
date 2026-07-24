"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// ---------------------------------------------------------
// 1. 15 NON-TECHNICAL, HILARIOUS, SARCASTIC JOKES
// ---------------------------------------------------------
const JOKES_DB = [
  // --- ALIEN THEME ---
  {
    text: "You scrolled so far you left Earth. Say hi to the aliens for us while we try to find this page.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6" viewBox="0 0 100 100">
        <g className="animate-float">
          <ellipse cx="50" cy="40" rx="30" ry="10" fill="currentColor" opacity="0.8" />
          <path d="M 30 35 C 30 15, 70 15, 70 35" fill="none" stroke="currentColor" strokeWidth="3" />
          <circle cx="50" cy="25" r="5" fill="#a855f7" className="animate-pulse" />
        </g>
        <polygon points="40,45 60,45 80,90 20,90" fill="url(#beam-gradient)" opacity="0.3" className="animate-pulse" />
        <defs><linearGradient id="beam-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="transparent" /></linearGradient></defs>
      </svg>
    )
  },
  {
    text: "This page was abducted by UFOs. We've received the ransom note, but honestly, we're not paying it.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-wiggle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M 50 20 C 20 20, 10 50, 25 75 C 35 90, 65 90, 75 75 C 90 50, 80 20, 50 20 Z" />
        <ellipse cx="35" cy="50" rx="8" ry="12" fill="#000" stroke="none" transform="rotate(-20 35 50)" />
        <ellipse cx="65" cy="50" rx="8" ry="12" fill="#000" stroke="none" transform="rotate(20 65 50)" />
        <line x1="45" y1="80" x2="55" y2="80" />
      </svg>
    )
  },
  {
    text: "We accidentally beamed this link to Mars. It should be back in a few lightyears. Check back then.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M 50 90 L 50 40 M 30 90 L 50 40 M 70 90 L 50 40" />
        <path d="M 20 40 C 40 20, 60 20, 80 40" className="animate-radar" />
        <circle cx="50" cy="40" r="4" fill="currentColor" />
      </svg>
    )
  },
  {
    text: "This URL definitely exists... in a parallel universe. Unfortunately, you are stuck in this one.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="50" cy="50" r="10" />
        <circle cx="50" cy="50" r="20" strokeDasharray="5,5" />
        <circle cx="50" cy="50" r="30" strokeDasharray="10,10" />
        <circle cx="50" cy="50" r="40" strokeDasharray="20,20" />
      </svg>
    )
  },

  // --- SERVER / BROKEN THEME ---
  {
    text: "Our server literally tripped and dropped your page. It's a mess everywhere down here.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="20" y="20" width="60" height="60" rx="4" />
        <line x1="20" y1="40" x2="80" y2="40" />
        <line x1="20" y1="60" x2="80" y2="60" />
        <path d="M 40 40 L 45 30 L 55 50 L 60 40" className="animate-pulse" stroke="#ef4444" strokeWidth="4" />
        <circle cx="30" cy="30" r="2" fill="currentColor" />
        <circle cx="30" cy="50" r="2" fill="currentColor" />
        <circle cx="30" cy="70" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    text: "We'd love to show you this content, but the intern spilled hot coffee on the main router.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="25" y="45" width="50" height="40" rx="4" />
        <path d="M 40 45 V 35 C 40 25, 60 25, 60 35 V 45" />
        <circle cx="50" cy="60" r="4" />
        <line x1="50" y1="64" x2="50" y2="72" />
      </svg>
    )
  },
  {
    text: "This link is currently more broken than a fast-food ice cream machine. Give it a minute.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M 20 80 L 80 80 M 50 80 L 50 20 M 30 20 L 70 20" />
        <path d="M 40 50 C 45 40, 55 60, 60 50" stroke="#ef4444" strokeWidth="4" className="animate-glitch" />
      </svg>
    )
  },
  {
    text: "The page caught a cold and called in sick today. Please try again when it's feeling better.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-wiggle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="50" cy="50" r="30" />
        <path d="M 50 30 L 50 70 M 40 40 H 60 M 40 60 H 60" stroke="#22c55e" />
      </svg>
    )
  },

  // --- MATRIX / SIMULATION THEME ---
  {
    text: "You broke the simulation. Please freeze exactly where you are while we come wipe your memory.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M 10 50 Q 50 10 90 50 Q 50 90 10 50" />
        <circle cx="50" cy="50" r="15" className="animate-spin-slow" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="5" fill="#a855f7" />
      </svg>
    )
  },
  {
    text: "The matrix completely forgot to render this page. Try closing your eyes and opening them again.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-glitch" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="20" y="20" width="60" height="60" />
        <text x="30" y="55" fontSize="24" fontFamily="monospace" fill="currentColor" stroke="none">404</text>
        <line x1="10" y1="40" x2="90" y2="40" stroke="#a855f7" className="animate-scan" />
      </svg>
    )
  },
  {
    text: "You found a giant hole in reality. Please ignore the developers sweating profusely behind the curtain.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-pulse" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="30" y="20" width="40" height="60" rx="5" />
        <rect x="35" y="25" width="30" height="15" fill="#ef4444" stroke="none" />
        <line x1="40" y1="80" x2="40" y2="90" />
        <line x1="50" y1="80" x2="50" y2="90" />
        <line x1="60" y1="80" x2="60" y2="90" />
      </svg>
    )
  },
  {
    text: "Oops. You just walked right into the internet's broom closet. It's dark in here.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <rect x="10" y="10" width="80" height="80" />
        <line x1="10" y1="10" x2="40" y2="40" />
        <line x1="90" y1="10" x2="60" y2="40" />
        <line x1="10" y1="90" x2="40" y2="60" />
        <line x1="90" y1="90" x2="60" y2="60" />
        <rect x="40" y="40" width="20" height="20" className="animate-spin-slow" />
      </svg>
    )
  },

  // --- SARCASTIC THEME ---
  {
    text: "We looked everywhere. Under the digital couch, in the cloud, behind the firewall. It's just gone.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-radar" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="45" cy="45" r="20" />
        <line x1="60" y1="60" x2="80" y2="80" strokeWidth="5" />
      </svg>
    )
  },
  {
    text: "You clicked a link that literally doesn't exist. We are judging you silently, but with utmost respect.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-wiggle" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M 20 50 C 35 20, 65 20, 80 50 C 65 80, 35 80, 20 50 Z" strokeDasharray="10 5" />
        <line x1="20" y1="20" x2="80" y2="80" stroke="#ef4444" />
      </svg>
    )
  },
  {
    text: "This page completely ghosted us. It read your request, left us on 'read', and vanished into thin air.",
    icon: (
      <svg className="w-20 h-20 text-zinc-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mb-6 animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="50" cy="50" r="40" />
        <line x1="35" y1="40" x2="45" y2="40" />
        <line x1="55" y1="40" x2="65" y2="40" />
        <line x1="40" y1="65" x2="60" y2="65" />
      </svg>
    )
  }
];

// ---------------------------------------------------------
// 2. THE SVG GRID MAP (5x5 Font Coordinates)
// ---------------------------------------------------------
const CHAR_MAP: Record<string, string[]> = {
  '4': ["#...#", "#...#", "#####", "....#", "....#"],
  '0': [".###.", "#...#", "#...#", "#...#", ".###."],
  'R': ["####.", "#...#", "####.", "#..#.", "#...#"],
  'E': ["#####", "#....", "####.", "#....", "#####"],
  'A': [".###.", "#...#", "#####", "#...#", "#...#"],
  'L': ["#....", "#....", "#....", "#....", "#####"],
  'I': ["#####", "..#..", "..#..", "..#..", "#####"],
  'T': ["#####", "..#..", "..#..", "..#..", "..#.."],
  'Y': ["#...#", ".#.#.", "..#..", "..#..", "..#.."],
  'D': ["####.", "#...#", "#...#", "#...#", "####."],
  'C': [".###.", "#...#", "#....", "#...#", ".###."],
  'O': [".###.", "#...#", "#...#", "#...#", ".###."]
};

const buildCoordinates = () => {
  const coords: { x: number, y: number }[] = [];
  const addWord = (word: string, startX: number, startY: number) => {
    let currX = startX;
    for (const char of word) {
      const pattern = CHAR_MAP[char];
      if (pattern) {
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 5; c++) {
            if (pattern[r][c] === '#') {
              coords.push({ x: currX + c, y: startY + r });
            }
          }
        }
      }
      currX += 6; 
    }
  };
  addWord("404", 12, 0);
  addWord("REALITY", 0, 7);
  addWord("DECODED", 0, 14);
  return coords;
};

// ---------------------------------------------------------
// 3. HEX COLOR CONVERTER
// ---------------------------------------------------------
const getHexCode = (hue: number, isWhite: boolean) => {
  if (isWhite) return "#FFFFFF";
  const h = hue;
  const s = 80;
  const l = 60;
  
  const lDec = l / 100;
  const a = (s * Math.min(lDec, 1 - lDec)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lDec - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

// ---------------------------------------------------------
// 4. MAIN PAGE
// ---------------------------------------------------------
export default function NotFound() {
  const [hue, setHue] = useState(0); 
  const [jokeIndex, setJokeIndex] = useState<number | null>(null);

  // FIX: Force document title aggressively to prevent Next.js layout overwrite
  useEffect(() => {
    document.title = "404 - Reality Not Found | Reality Decoded";
    // Failsafe timeout in case layout applies metadata asynchronously during hydration
    const timeout = setTimeout(() => {
      document.title = "404 - Reality Not Found | Reality Decoded";
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Initialize Joke (No Repeats Logic)
  useEffect(() => {
    let seen = JSON.parse(sessionStorage.getItem('seen404Jokes') || '[]');
    if (seen.length >= JOKES_DB.length) {
      seen = []; 
    }
    const unseenIndices = JOKES_DB.map((_, i) => i).filter(i => !seen.includes(i));
    const randomIdx = unseenIndices[Math.floor(Math.random() * unseenIndices.length)];
    
    setJokeIndex(randomIdx);
    sessionStorage.setItem('seen404Jokes', JSON.stringify([...seen, randomIdx]));
  }, []);

  // Generate the miniature SVGs once
  const svgBlocks = useMemo(() => {
    const coords = buildCoordinates();
    return coords.map((c, i) => ({
      id: i,
      x: c.x,
      y: c.y,
      baseUiType: Math.floor(Math.random() * 8), 
      hueOffset: Math.floor(Math.random() * 40) - 20,
      lightness: Math.floor(Math.random() * 30) + 40,
    }));
  }, []);

  if (jokeIndex === null) {
    return (
      <main className={`min-h-screen bg-[#050505] ${inter.className}`}>
        <title>404 - Reality Not Found | Reality Decoded</title>
      </main>
    );
  }

  const joke = JOKES_DB[jokeIndex];
  const isWhite = hue === 0;
  const sliderColor = isWhite ? "#ffffff" : `hsl(${hue}, 90%, 60%)`;
  const currentHex = getHexCode(hue, isWhite);

  return (
    <main className={`min-h-screen bg-[#050505] text-zinc-300 flex flex-col items-center justify-center relative overflow-x-hidden ${inter.className}`}>
      
      {/* PERFECT SEO METADATA */}
      <title>404 - Reality Not Found | Reality Decoded</title>

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3] pointer-events-none z-0"></div>

      {/* Global CSS for Cartoons & Slider */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        @keyframes wiggle { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        
        @keyframes radar { 0% { opacity: 1; transform: scale(0.8); } 100% { opacity: 0; transform: scale(1.5); } }
        .animate-radar { animation: radar 2s infinite; transform-origin: center; }
        
        @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
        .animate-glitch { animation: glitch 0.5s infinite; }
        
        @keyframes scan { 0% { transform: translateY(-10px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(30px); opacity: 0; } }
        .animate-scan { animation: scan 2s linear infinite; }
        
        .animate-spin-slow { animation: spin 8s linear infinite; }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: #fff;
          border: 4px solid #000;
          cursor: pointer;
          box-shadow: 0 0 20px ${sliderColor};
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:active {
          transform: scale(1.15);
        }
      `}} />

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center pt-24 pb-12">
        
        {/* HEADER BADGE */}
        <div className={`${jetBrainsMono.className} inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-12 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Decoded Archives // Error 404
        </div>

        {/* ---------------------------------------------------------
            DYNAMIC CARTOON ICON & JOKE (MOVED TO TOP)
        --------------------------------------------------------- */}
        <div className="text-center flex flex-col items-center mb-16 px-4">
          {joke.icon}
          <h2 className={`${spaceGrotesk.className} text-2xl md:text-4xl text-white font-bold mb-4 tracking-tight`}>
            Whoops, that page is gone.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl leading-relaxed">
            {joke.text}
          </p>
        </div>

        {/* ---------------------------------------------------------
            THE "404 REALITY DECODED" MINIATURE SVG ENGINE
        --------------------------------------------------------- */}
        <div className="w-full max-w-4xl mb-12 px-2">
          <svg viewBox="0 0 984 456" className="w-full h-auto drop-shadow-2xl overflow-visible">
            <g>
              {svgBlocks.map((b) => {
                const cellSize = 24;
                const gap = 2;
                const actualSize = cellSize - gap;
                const posX = b.x * cellSize;
                const posY = b.y * cellSize;
                
                const activeUiType = (b.baseUiType + (isWhite ? 0 : Math.floor(hue / 30))) % 8;

                const baseColor = isWhite ? `hsl(0, 0%, ${b.lightness + 20}%)` : `hsl(${hue + b.hueOffset}, 80%, ${b.lightness}%)`;
                const darkAccent = isWhite ? `hsl(0, 0%, ${b.lightness - 10}%)` : `hsl(${hue + b.hueOffset}, 80%, ${b.lightness - 25}%)`;
                const lightAccent = isWhite ? `hsl(0, 0%, 100%)` : `hsl(${hue + b.hueOffset}, 80%, ${b.lightness + 25}%)`;

                return (
                  <g key={b.id} transform={`translate(${posX}, ${posY})`}>
                    
                    <rect width={actualSize} height={actualSize} rx="2" fill={baseColor} />

                    {activeUiType === 0 && (
                      <g>
                        <circle cx="16" cy="6" r="3" fill={lightAccent} />
                        <polygon points="0,22 8,12 14,18 22,10 22,22" fill={darkAccent} />
                      </g>
                    )}

                    {activeUiType === 1 && (
                      <g>
                        <rect width="22" height="5" fill={darkAccent} rx="2" />
                        <circle cx="3" cy="2.5" r="1" fill={lightAccent} />
                        <circle cx="6" cy="2.5" r="1" fill={lightAccent} />
                        <rect x="2" y="8" width="12" height="2" fill={darkAccent} />
                        <rect x="2" y="12" width="16" height="2" fill={darkAccent} />
                      </g>
                    )}

                    {activeUiType === 2 && (
                      <g>
                        <rect x="3" y="12" width="4" height="8" fill={lightAccent} />
                        <rect x="9" y="8" width="4" height="12" fill={darkAccent} />
                        <rect x="15" y="4" width="4" height="16" fill={lightAccent} />
                      </g>
                    )}

                    {activeUiType === 3 && (
                      <g>
                        <circle cx="11" cy="8" r="4" fill={darkAccent} />
                        <rect x="4" y="14" width="14" height="2" rx="1" fill={lightAccent} />
                        <rect x="7" y="18" width="8" height="2" rx="1" fill={darkAccent} />
                      </g>
                    )}

                    {activeUiType === 4 && (
                      <g>
                        <text x="2" y="7" fontSize="6" fill={darkAccent} fontFamily="monospace" fontWeight="bold">&gt;_</text>
                        <rect x="2" y="10" width="10" height="2" fill={lightAccent} />
                        <rect x="2" y="14" width="16" height="2" fill={darkAccent} />
                        <rect x="2" y="18" width="8" height="2" fill={lightAccent} />
                      </g>
                    )}

                    {activeUiType === 5 && (
                      <g>
                        <polygon points="8,6 16,11 8,16" fill={darkAccent} />
                        <rect x="2" y="19" width="18" height="1.5" fill={darkAccent} />
                        <circle cx="6" cy="19.75" r="1.5" fill={lightAccent} />
                      </g>
                    )}

                    {activeUiType === 6 && (
                      <g>
                        <rect x="4" y="4" width="14" height="2" fill={darkAccent} />
                        <rect x="4" y="8" width="10" height="2" fill={lightAccent} />
                        <rect x="4" y="12" width="12" height="2" fill={darkAccent} />
                        <rect x="4" y="16" width="8" height="2" fill={lightAccent} />
                      </g>
                    )}

                    {activeUiType === 7 && (
                      <g>
                        <path d="M 3 6 L 9 6 L 11 9 L 19 9 L 19 18 L 3 18 Z" fill={darkAccent} />
                      </g>
                    )}

                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ---------------------------------------------------------
            THE CLEAN, DRIBBBLE-STYLE COLOR SLIDER (WITH HEX CODES)
        --------------------------------------------------------- */}
        <div className="w-full max-w-lg mx-auto mb-16 px-4">
          <div className={`${jetBrainsMono.className} text-[10px] md:text-xs uppercase tracking-widest font-bold mb-5 flex justify-between w-full items-end`}>
            <span className="text-zinc-500">Alter Spectrum</span>
            <span style={{ color: sliderColor }} className="text-lg md:text-xl drop-shadow-md">
              {currentHex}
            </span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full h-3 rounded-full outline-none appearance-none cursor-pointer border border-white/20 shadow-inner"
            style={{
              background: `linear-gradient(to right, 
                #ffffff 0%, 
                hsl(15, 100%, 50%) 10%, 
                hsl(60, 100%, 50%) 25%, 
                hsl(120, 100%, 50%) 40%, 
                hsl(180, 100%, 50%) 55%, 
                hsl(240, 100%, 50%) 70%, 
                hsl(300, 100%, 50%) 85%, 
                hsl(360, 100%, 50%) 100%)`
            }}
          />
        </div>

        {/* ---------------------------------------------------------
            ACTION BUTTONS
        --------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6">
          <button 
            onClick={() => window.location.reload()}
            className={`${jetBrainsMono.className} w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest bg-white text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
          >
            Reboot Simulation
          </button>
          <Link 
            href="/archives" 
            className={`${jetBrainsMono.className} w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest bg-[#0a0a0a] text-zinc-400 border border-white/10 transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-white/20`}
          >
            View Archives
          </Link>
        </div>

      </div>
    </main>
  );
}