"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

// ---------------------------------------------------------
// 1. HILARIOUS SYNDICATE ERROR JOKES
// ---------------------------------------------------------
const QUOTES = [
  // ALIEN / SPACE
  { type: 'alien', text: "You've wandered off the grid. This page is currently orbiting Kepler-452b." },
  { type: 'alien', text: "Error 404: The Zeta Reticulans abducted this report. We are negotiating its release." },
  { type: 'alien', text: "Transmission intercepted by Martian outposts. Please try a more terrestrial link." },
  { type: 'alien', text: "This URL exists in a parallel universe. Unfortunately, you are stuck in this one." },
  
  // CORRUPTION / SERVER
  { type: 'server', text: "Systemic corruption doesn't just ruin infrastructure, it ruined this server too." },
  { type: 'server', text: "A shadow lobbyist bribed our database to hide this page. We're as annoyed as you are." },
  { type: 'server', text: "Our servers tripped over a classified wire. This URL has been permanently redacted." },
  { type: 'server', text: "The oligarchy bought this link and privatized the content. You can't afford to see it." },
  
  // MATRIX / SIMULATION
  { type: 'matrix', text: "Simulation boundary reached. The alien developers forgot to render this sector." },
  { type: 'matrix', text: "Congratulations, you found a glitch in the matrix. Please stand by for a memory wipe." },
  { type: 'matrix', text: "Reality engine failed to load. We are out of RAM and existential dread." },
  { type: 'matrix', text: "You've clipped through the backrooms of the internet. Don't look behind you." },
  
  // SARCASTIC
  { type: 'sarcastic', text: "We searched everywhere. Under the couch, in the cloud, behind the firewall. It's gone." },
  { type: 'sarcastic', text: "This link is exactly as broken as the modern political system." },
  { type: 'sarcastic', text: "You clicked a link that doesn't exist. We judge you silently, but respectfully." }
];

// ---------------------------------------------------------
// 2. THE SVG UI GRID BLUEPRINT
// ---------------------------------------------------------
// This ASCII map is precisely parsed to build the text out of UI blocks.
const GRID_PATTERN = `
      #   #  ###  #   #
      #   # #   # #   #
      #   # #   # #   #
      ##### #   # #####
          # #   #     #
          #  ###      #

### ####  ##  #   ### ### # #
# # #    #  # #    #   #  # #
##  ###  #### #    #   #   # 
# # #    #  # #    #   #   # 
# # #### #  # #### ###  #   #

### ####  ##   ##  ### #### ###
# # #    #  # #  # # # #    # #
# # ###  #    #  # # # ###  # #
# # #    #  # #  # # # #    # #
### ####  ##   ##  ### #### ###
`;

// ---------------------------------------------------------
// 3. DYNAMIC CARTOON ICONS
// ---------------------------------------------------------
const JokeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'alien':
      // UFO Abduction
      return (
        <svg className="w-16 h-16 text-zinc-400 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      );
    case 'server':
      // Broken Server Rack
      return (
        <svg className="w-16 h-16 text-zinc-400 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01M12 16v-4m0 0l-2-2m2 2l2-2" />
        </svg>
      );
    case 'matrix':
      // Glitch / Eye
      return (
        <svg className="w-16 h-16 text-zinc-400 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
        </svg>
      );
    default:
      // Sarcastic Search
      return (
        <svg className="w-16 h-16 text-zinc-400 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM9.5 9.5l5 5m0-5l-5 5" />
        </svg>
      );
  }
};

// ---------------------------------------------------------
// 4. MAIN 404 EXPERIENCE
// ---------------------------------------------------------
export default function NotFound() {
  const [hue, setHue] = useState(140); // Default to a Syndicate Green
  const [joke, setJoke] = useState(QUOTES[0]);

  // Select a random joke on client mount
  useEffect(() => {
    setJoke(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  // Parse the ASCII grid into an array of SVG coordinates and UI properties
  const svgBlocks = useMemo(() => {
    const blocks: any[] = [];
    const lines = GRID_PATTERN.split('\n').filter(line => line.length > 0);
    
    lines.forEach((line, y) => {
      for (let x = 0; x < line.length; x++) {
        if (line[x] === '#') {
          blocks.push({
            id: `${x}-${y}`,
            x,
            y,
            uiType: Math.floor(Math.random() * 4) + 1, // 4 different mini UI designs
            hueOffset: Math.floor(Math.random() * 40) - 20, // Color texture variance
            lightness: Math.floor(Math.random() * 30) + 40, // 40% to 70% brightness
          });
        }
      }
    });
    return blocks;
  }, []);

  return (
    <main className={`min-h-screen bg-[#050505] text-zinc-300 flex flex-col items-center justify-center relative overflow-x-hidden ${inter.className}`}>
      
      {/* Background Deep Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center pt-24 pb-12">
        
        {/* HEADER BADGE */}
        <div className={`${jetBrainsMono.className} inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-12 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          Decoded Archives // Error 404
        </div>

        {/* ---------------------------------------------------------
            THE "404 REALITY DECODED" SVG ENGINE
        --------------------------------------------------------- */}
        {/* The viewBox is 29 columns wide by 18 rows high. 
            Multiplying by 20px cell size = 580x360. 
            This ensures it perfectly scales on mobile without breaking. */}
        <div className="w-full max-w-2xl mb-16 px-2">
          <svg viewBox="0 0 580 360" className="w-full h-auto drop-shadow-2xl overflow-visible">
            
            <g>
              {svgBlocks.map((b) => {
                const cellSize = 20;
                const gap = 2;
                const size = cellSize - gap;
                const posX = b.x * cellSize;
                const posY = b.y * cellSize;
                
                // Dynamic colors bound to the interactive slider
                const baseColor = `hsl(${hue + b.hueOffset}, 80%, ${b.lightness}%)`;
                const darkAccent = `hsl(${hue + b.hueOffset}, 80%, ${b.lightness - 20}%)`;
                const lightAccent = `hsl(${hue + b.hueOffset}, 80%, ${b.lightness + 25}%)`;

                return (
                  <g key={b.id} transform={`translate(${posX}, ${posY})`} className="transition-all duration-300 ease-out">
                    
                    {/* The Base Card Block */}
                    <rect 
                      width={size} 
                      height={size} 
                      rx="3" 
                      fill={baseColor} 
                      className="transition-colors duration-300 ease-out"
                    />

                    {/* MINI UI TYPE 1: Bar Graph */}
                    {b.uiType === 1 && (
                      <g>
                        <rect x={size*0.2} y={size*0.4} width={size*0.15} height={size*0.4} rx="1" fill={darkAccent} />
                        <rect x={size*0.45} y={size*0.2} width={size*0.15} height={size*0.6} rx="1" fill={darkAccent} />
                        <rect x={size*0.7} y={size*0.6} width={size*0.15} height={size*0.2} rx="1" fill={lightAccent} />
                      </g>
                    )}

                    {/* MINI UI TYPE 2: User Profile Card */}
                    {b.uiType === 2 && (
                      <g>
                        <circle cx={size*0.3} cy={size*0.3} r={size*0.15} fill={darkAccent} />
                        <rect x={size*0.15} y={size*0.6} width={size*0.6} height={size*0.1} rx="1" fill={lightAccent} />
                        <rect x={size*0.15} y={size*0.75} width={size*0.4} height={size*0.1} rx="1" fill={darkAccent} />
                      </g>
                    )}

                    {/* MINI UI TYPE 3: Browser Window */}
                    {b.uiType === 3 && (
                      <g>
                        <rect x={size*0.1} y={size*0.1} width={size*0.8} height={size*0.25} rx="1" fill={darkAccent} />
                        <circle cx={size*0.25} cy={size*0.65} r={size*0.1} fill={lightAccent} />
                        <circle cx={size*0.5} cy={size*0.65} r={size*0.1} fill={lightAccent} />
                        <circle cx={size*0.75} cy={size*0.65} r={size*0.1} fill={lightAccent} />
                      </g>
                    )}

                    {/* MINI UI TYPE 4: Notification Image */}
                    {b.uiType === 4 && (
                      <g>
                        <rect x={size*0.15} y={size*0.15} width={size*0.7} height={size*0.4} rx="1" fill={darkAccent} />
                        <circle cx={size*0.8} cy={size*0.2} r={size*0.08} fill={lightAccent} />
                        <rect x={size*0.15} y={size*0.7} width={size*0.7} height={size*0.1} rx="0.5" fill={darkAccent} />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ---------------------------------------------------------
            THE COLOR SLIDER (Smooth & Device Optimized)
        --------------------------------------------------------- */}
        <div className="w-full max-w-md mx-auto mb-16 flex flex-col items-center bg-[#0a0a0a]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <div className={`${jetBrainsMono.className} text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-6 flex justify-between w-full`}>
            <span>Alter Spectrum</span>
            <span style={{ color: `hsl(${hue}, 90%, 60%)` }} className="transition-colors duration-300">
              HZ-{Math.floor(hue)}
            </span>
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
          
          <style dangerouslySetInnerHTML={{ __html: `
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
              transform: scale(1.15);
            }
          `}} />
          
          <p className="text-zinc-500 text-xs mt-6 font-light">Slide to recalibrate the visual engine.</p>
        </div>

        {/* ---------------------------------------------------------
            DYNAMIC CARTOON ICON & JOKE
        --------------------------------------------------------- */}
        <div className="text-center flex flex-col items-center mb-16 px-4">
          <JokeIcon type={joke.type} />
          
          <h2 className="text-xl md:text-2xl text-white font-bold mb-3 tracking-tight">
            Whoops, that page is gone.
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl leading-relaxed">
            {joke.text}
          </p>
        </div>

        {/* ---------------------------------------------------------
            ACTION BUTTONS
        --------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6">
          <Link 
            href="/" 
            className={`${jetBrainsMono.className} w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest bg-white text-black transition-all duration-300 hover:bg-zinc-200 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
          >
            Reboot Simulation
          </Link>
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
