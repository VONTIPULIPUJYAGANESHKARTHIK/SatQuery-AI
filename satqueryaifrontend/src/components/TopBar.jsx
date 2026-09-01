import React, { useState, useEffect } from 'react';
import { Crosshair, Shield, Activity, Clock } from 'lucide-react';

export default function TopBar() {
  const [time, setTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toUTCString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-12 bg-panel/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-6 select-none shadow-2xl">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Shield className="w-5 h-5 text-hud-teal" />
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-[0.2em] text-text-main uppercase">SatQuery AI</span>
          <span className="text-[9px] font-mono tracking-widest text-hud-teal/70 uppercase">Global Spatial Intelligence</span>
        </div>
      </div>

      {/* Center HUD Info */}
      <div className="hidden md:flex items-center gap-8 font-mono text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <Crosshair className="w-3.5 h-3.5 text-hud-amber" />
          <span>LAT: <span className="text-text-main">37.7749° N</span></span>
          <span className="mx-2 text-white/10">|</span>
          <span>LNG: <span className="text-text-main">122.4194° W</span></span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{time}</span>
        </div>
      </div>

      {/* System Status */}
      <div className="flex items-center gap-2 bg-hud-teal/10 px-3 py-1.5 rounded border border-hud-teal/20">
        <Activity className="w-3.5 h-3.5 text-hud-teal animate-pulse" />
        <span className="text-[10px] font-mono text-hud-teal uppercase tracking-wider">Neural Backend Online</span>
      </div>
    </div>
  );
}
