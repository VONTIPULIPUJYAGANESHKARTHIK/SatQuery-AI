import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, Copy, Map } from 'lucide-react';

const tabs = ['Single Image', 'Bi-Temporal', 'Optical + SAR'];

export default function UploadZone() {
  const [activeTab, setActiveTab] = useState('Single Image');

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <div className="flex bg-slate-800/50 p-1 rounded-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs py-1.5 rounded transition-colors ${
              activeTab === tab
                ? 'bg-panel text-accent font-medium shadow-sm'
                : 'text-slate-400 hover:text-text-main'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Drag & Drop Area */}
      <div className="border-2 border-dashed border-slate-700 hover:border-accent transition-colors rounded-lg p-6 flex flex-col items-center justify-center text-center bg-slate-900/30 cursor-pointer group">
        <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-accent mb-2 transition-colors" />
        <p className="text-sm font-medium text-slate-300">
          Drag & Drop GeoTIFFs here
        </p>
        <p className="text-xs text-slate-500 mt-1">or click to browse local files</p>
      </div>
    </div>
  );
}
