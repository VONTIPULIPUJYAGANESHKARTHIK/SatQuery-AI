import React from 'react';
import UploadZone from './UploadZone';
import ChatInterface from './ChatInterface';

export default function Sidebar() {
  return (
    <aside className="w-[400px] h-full bg-panel/70 backdrop-blur-2xl border border-white/10 rounded-md shadow-2xl flex flex-col overflow-hidden">
      {/* Scanner Decoration Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-hud-teal to-transparent opacity-50" />

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
        {/* Module Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-mono text-xs text-hud-teal uppercase tracking-widest">Input Vector</span>
          <span className="font-mono text-[10px] text-slate-500">SYS.IN.01</span>
        </div>
        
        <UploadZone />
        
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mt-2">
          <span className="font-mono text-xs text-hud-teal uppercase tracking-widest">Neural Command</span>
          <span className="font-mono text-[10px] text-slate-500">SYS.CMD.02</span>
        </div>

        <div className="flex-1 min-h-0">
          <ChatInterface />
        </div>
      </div>
    </aside>
  );
}
