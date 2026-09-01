import React, { useState } from 'react';
import { Activity, Code, Server, Check } from 'lucide-react';

const steps = [
  { text: "Validating GeoTIFF headers", icon: Server },
  { text: "Initializing Vision-Language Model", icon: Code },
  { text: "Executing Zero-Shot Segmentation", icon: Activity },
  { text: "Extracting polygon coordinates", icon: Code }
];

export default function AuditTrace() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-2 border-l border-white/10 pl-3 py-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-slate-500 hover:text-hud-teal transition-colors"
      >
        <span>{isOpen ? '[-]' : '[+]'}</span>
        <span>Execution Trace</span>
      </button>
      
      {isOpen && (
        <div className="mt-3 space-y-2.5">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-[10px] font-mono text-slate-400">
              <step.icon className="w-3.5 h-3.5 text-hud-teal/50 shrink-0" />
              <span className="uppercase">{step.text}</span>
              <Check className="w-3.5 h-3.5 text-hud-teal ml-auto" />
            </div>
          ))}
          <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>HASH: 0x9F4A...B2C</span>
            <span className="text-hud-teal">SECURE</span>
          </div>
        </div>
      )}
    </div>
  );
}
