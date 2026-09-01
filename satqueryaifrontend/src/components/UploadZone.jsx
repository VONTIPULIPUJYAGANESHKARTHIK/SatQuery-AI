import React, { useState } from 'react';
import { UploadCloud, FileSymlink, Satellite } from 'lucide-react';

const tabs = ['Single Imagery', 'Bi-Temporal', 'SAR Fusion'];

export default function UploadZone() {
  const [activeTab, setActiveTab] = useState('Single Imagery');

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-[10px] font-mono uppercase tracking-wider py-2 transition-all border-b-2 ${
              activeTab === tab
                ? 'border-hud-teal text-hud-teal bg-hud-teal/10'
                : 'border-white/10 text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Drag & Drop Area */}
      <div className="relative border border-dashed border-white/20 hover:border-hud-teal/50 transition-colors bg-black/40 group flex flex-col items-center justify-center p-8 cursor-pointer mt-2">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 group-hover:border-hud-teal transition-colors" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40 group-hover:border-hud-teal transition-colors" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40 group-hover:border-hud-teal transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 group-hover:border-hud-teal transition-colors" />

        <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-hud-teal/10 flex items-center justify-center mb-4 transition-colors">
          <Satellite className="w-6 h-6 text-slate-500 group-hover:text-hud-teal transition-colors" />
        </div>
        
        <p className="font-mono text-xs text-slate-300 uppercase tracking-widest text-center">
          Initialize Data Ingestion
        </p>
        <p className="font-mono text-[9px] text-slate-500 mt-2 uppercase tracking-widest flex items-center gap-1">
          <FileSymlink className="w-3 h-3" />
          Awaiting GeoTIFF payloads
        </p>
      </div>
    </div>
  );
}
