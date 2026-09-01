import React from 'react';
import { Activity } from 'lucide-react';
import UploadZone from './UploadZone';
import ChatInterface from './ChatInterface';

export default function Sidebar() {
  return (
    <aside className="w-[35%] min-w-[320px] max-w-[450px] h-full bg-panel border-r border-slate-800 flex flex-col shadow-2xl z-10">
      {/* Header */}
      <header className="p-4 border-b border-slate-800 flex items-center justify-between bg-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Activity className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-text-main">SatQuery AI</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">Vision-Language Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-accent/5 px-2 py-1 rounded-full border border-accent/20">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-accent">Backend: Online</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
        <UploadZone />
        
        <div className="flex-1 min-h-0">
          <ChatInterface />
        </div>
      </div>
    </aside>
  );
}
