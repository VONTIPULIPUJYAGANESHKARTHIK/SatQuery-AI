import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';

const steps = [
  "Header Validated",
  "GeoTIFF Processed (Bands 1-8)",
  "ChangeFormer Architecture Loaded",
  "Attention Masks Generated",
  "SHA-256 Logged to Audit Trail"
];

export default function AuditTrace() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-primary/80 border border-slate-700/50 rounded-md overflow-hidden text-xs">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-1.5 bg-panel/50 hover:bg-panel transition-colors text-slate-300"
      >
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono">Agentic Orchestration Trace</span>
        </div>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      </button>
      
      {isOpen && (
        <div className="p-3 font-mono text-slate-400 space-y-1.5 bg-black/20">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
              <span>{step}</span>
            </div>
          ))}
          <div className="flex items-start gap-2 text-slate-500 mt-2 pt-2 border-t border-slate-800/50">
            <span className="text-accent/50">{'>'}</span>
            <span>Trace completed. End of execution.</span>
          </div>
        </div>
      )}
    </div>
  );
}
