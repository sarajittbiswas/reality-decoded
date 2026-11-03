'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function HighServerLoadPage() {
  // --- STATE MANAGEMENT ---
  const [countdown, setCountdown] = useState(10);
  const [isRetrying, setIsRetrying] = useState(false);
  const [autoRetry, setAutoRetry] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  
  // Real-time telemetry simulation values
  const [cpuLoad, setCpuLoad] = useState(98.4);
  const [latency, setLatency] = useState(482);
  const [queueCount, setQueueCount] = useState(14820);
  const [activeOperatives, setActiveOperatives] = useState(89201);
  
  // Diagnostic Terminal Logs
  const [logs, setLogs] = useState([
    { id: 1, type: 'CRITICAL', text: 'ERR_D1_EDGE_SATURATION: Cloudflare node overload in AP-SOUTH-1' },
    { id: 2, type: 'WARN', text: 'TRAFFIC_SURGE: +420% unexpected requests on /blogs endpoint' },
    { id: 3, type: 'INFO', text: 'LOAD_BALANCER: Rerouting non-essential telemetry traffic...' },
    { id: 4, type: 'INFO', text: 'DEFENSE_PROTOCOL: DDoS rate-limiting applied across 14 edge regions' },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // --- CANVAS PARTICLE BACKGROUND ENGINE ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2, // slight upward drift
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render dark red nodes & connections
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- TELEMETRY FLUCTUATION LOOP ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => parseFloat((97.5 + Math.random() * 2.3).toFixed(1)));
      setLatency(prev => Math.floor(450 + Math.random() * 70));
      setQueueCount(prev => prev + Math.floor((Math.random() - 0.45) * 120));
      setActiveOperatives(prev => prev + Math.floor((Math.random() - 0.4) * 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- RECONNECT COUNTDOWN TIMER ---
  useEffect(() => {
    if (!autoRetry || isRetrying) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          triggerReconnect();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRetry, isRetrying]);

  // --- AUTO SCROLL TERMINAL ---
  useEffect(() => {
    if (terminalOpen && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, terminalOpen]);

  // --- TRIGGER RECONNECT ACTION WITH REAL PAGE REFRESH ---
  const triggerReconnect = () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);

    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    setLogs(prev => [
      ...prev,
      { id: Date.now(), type: 'SYS', text: `[${timestamp}] RECONNECT_INITIATED: Ping sweep to edge server...` }
    ]);

    // Give 1.2s for the "Connecting..." UI indicator before initiating real page reload
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }, 1200);
  };

  const handleManualPing = () => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [
      ...prev,
      { id: Date.now(), type: 'SYS', text: `[${timestamp}] DIAGNOSTIC_PING: Round-trip delay = ${latency}ms (SATURATED)` }
    ]);
  };

  // SVG Progress Ring calculations
  const strokeDashoffset = 283 - (283 * countdown) / 10;

  return (
    <div className="relative min-h-screen bg-[#030303] text-zinc-100 font-sans overflow-hidden flex flex-col justify-between selection:bg-red-500 selection:text-white">
      {/* Background Interactive Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Cyber Grid & Red Glow Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0"></div>
      <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.12),transparent_70%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 inset-x-0 h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.06),transparent_70%)] pointer-events-none z-0"></div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-60"></div>

      {/* --- HEADER NAVBAR --- */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-red-900/20">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded border border-red-500/40 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute"></span>
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-100 block">
              Reality Decoded
            </span>
            <span className="font-mono text-[9px] text-red-500/80 uppercase tracking-widest block">
              Mainframe Defense Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-red-950/30 border border-red-900/30 rounded text-red-400 font-mono text-[10px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            HTTP 500: OVERLOAD
          </div>
        </div>
      </header>

      {/* --- MAIN CENTRAL CONTENT --- */}
      <main className="relative z-20 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col items-center text-center my-auto">
        
        {/* Pulsing Central Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs tracking-widest uppercase mb-8 shadow-[0_0_25px_rgba(239,68,68,0.2)] animate-pulse">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          CRITICAL TRAFFIC SURGE DETECTED
        </div>

        {/* Title */}
        <h1 className="font-mono text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight drop-shadow-[0_0_35px_rgba(239,68,68,0.3)]">
          HIGH SERVER LOAD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
            RE-CONNECTING...
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-light">
          An unprecedented influx of traffic has saturated our core processing nodes. 
          The Mainframe is auto-balancing traffic queues to restore signal integrity.
        </p>

        {/* --- REAL-TIME TELEMETRY GAUGES --- */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 font-mono">
          <div className="bg-[#080808]/80 border border-red-900/30 rounded-xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-lg">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">CPU Utilization</span>
            <span className="text-2xl font-bold text-red-500 tracking-tight">{cpuLoad}%</span>
            <div className="w-full bg-red-950/40 h-1.5 rounded-full mt-2 overflow-hidden border border-red-900/20">
              <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${cpuLoad}%` }}></div>
            </div>
          </div>

          <div className="bg-[#080808]/80 border border-red-900/30 rounded-xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-lg">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Edge Latency</span>
            <span className="text-2xl font-bold text-rose-400 tracking-tight">{latency} <span className="text-xs text-zinc-500">ms</span></span>
            <span className="text-[9px] text-red-400/80 mt-1 uppercase tracking-wider">▲ HIGH DELAY</span>
          </div>

          <div className="bg-[#080808]/80 border border-red-900/30 rounded-xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-lg">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Queue Depth</span>
            <span className="text-2xl font-bold text-zinc-100 tracking-tight">{queueCount.toLocaleString()}</span>
            <span className="text-[9px] text-zinc-500 mt-1 uppercase tracking-wider">REQUESTS WAITING</span>
          </div>

          <div className="bg-[#080808]/80 border border-red-900/30 rounded-xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-lg">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Active Operatives</span>
            <span className="text-2xl font-bold text-zinc-100 tracking-tight">{activeOperatives.toLocaleString()}</span>
            <span className="text-[9px] text-emerald-400/80 mt-1 uppercase tracking-wider">● LIVE SIGNAL</span>
          </div>
        </div>

        {/* --- INTERACTIVE ACTION & COUNTDOWN BOX --- */}
        <div className="w-full bg-[#09090b]/90 border border-red-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(239,68,68,0.1)] flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Circular Countdown Ring */}
          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="stroke-red-950/60" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  className="stroke-red-500 transition-all duration-1000 ease-linear" 
                  strokeWidth="6" 
                  strokeDasharray="283"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent" 
                />
              </svg>
              <span className="absolute font-mono text-xl font-bold text-white">
                {isRetrying ? '...' : countdown}
              </span>
            </div>

            <div className="text-left">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-1">
                {isRetrying ? 'Establishing Protocol Handshake...' : 'Auto-reconnect Sequence'}
              </span>
              <span className="font-mono text-xs text-red-400 font-bold block">
                {isRetrying ? 'VERIFYING EDGE NODES' : `RETRY ATTEMPT #${retryCount + 1} IN ${countdown}s`}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={triggerReconnect}
              disabled={isRetrying}
              className="flex-1 sm:flex-initial font-mono font-bold text-xs uppercase tracking-widest px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] transition-all transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {isRetrying ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75"></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                  </svg>
                  Force Re-connect
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- DIAGNOSTIC TERMINAL TOGGLE --- */}
        <div className="w-full">
          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto py-2 cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform duration-300 ${terminalOpen ? 'rotate-180' : ''}`}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            {terminalOpen ? 'Hide System Diagnostics' : 'View Live Diagnostic Terminal'}
          </button>

          {terminalOpen && (
            <div className="mt-4 w-full bg-[#050505] border border-zinc-800 rounded-xl p-4 font-mono text-left shadow-2xl transition-all">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Terminal Console :: RD-NODE-DIAG-01
                </span>
                <button 
                  onClick={handleManualPing}
                  className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded border border-zinc-700 transition-colors cursor-pointer"
                >
                  [Run Ping Test]
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 text-xs font-mono">
                {logs.map(log => (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className={`font-bold shrink-0 text-[10px] px-1.5 py-0.5 rounded ${
                      log.type === 'CRITICAL' ? 'bg-red-950 text-red-400 border border-red-800/50' :
                      log.type === 'WARN' ? 'bg-amber-950 text-amber-400 border border-amber-800/50' :
                      log.type === 'SYS' ? 'bg-purple-950 text-purple-400 border border-purple-800/50' :
                      'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-zinc-300 font-mono text-[11px] break-all">{log.text}</span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          )}
        </div>

      </main>

      {/* --- FOOTER STATUS LINKS --- */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 border-t border-red-900/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <a 
            href="/blogs" 
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            &larr; Back to Mainframe
          </a>
          <span>/</span>
          <a 
            href="/faq" 
            className="hover:text-white transition-colors"
          >
            System Protocols
          </a>
        </div>

        <div className="text-[10px] text-zinc-600 uppercase tracking-widest">
          Reality Decoded Network Telemetry &copy; {new Date().getFullYear()} // Node Status: Saturated
        </div>
      </footer>
    </div>
  );
}