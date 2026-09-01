import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, ChevronRight } from 'lucide-react';
import AuditTrace from './AuditTrace';

const initialMessages = [
  { role: 'system', content: 'SYSTEM READY. NEURAL ORCHESTRATOR ONLINE.' },
  { role: 'user', content: 'Detect cargo ships near the harbor layout in the latest imagery.' },
  { role: 'ai', content: 'ANALYSIS COMPLETE. 14 ANOMALIES DETECTED. VECTOR MASKS APPLIED.', isAnalyzing: false },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsAnalyzing(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'PROCESSING VECTOR DATA...', isAnalyzing: true }
      ]);
      
      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'ai',
            content: 'TASK COMPLETED. 3 TARGETS IDENTIFIED. RETAINING MASKS IN MEMORY.',
            isAnalyzing: false,
            hasAudit: true
          };
          return newMessages;
        });
        setIsAnalyzing(false);
      }, 2500);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border border-white/10 relative">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 font-mono text-xs">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            {msg.role === 'system' ? (
              <div className="flex items-center gap-2 text-hud-teal/60">
                <span>[SYS]</span>
                <span>{msg.content}</span>
              </div>
            ) : msg.role === 'user' ? (
              <div className="flex items-start gap-2 text-slate-300">
                <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="uppercase">{msg.content}</span>
              </div>
            ) : (
              <div className="pl-6 flex flex-col gap-2">
                <div className={`flex items-start gap-2 ${msg.isAnalyzing ? 'text-hud-amber animate-pulse' : 'text-hud-teal'}`}>
                  <span>{'>'}</span>
                  <span className="uppercase tracking-wide">{msg.content}</span>
                </div>
                {msg.hasAudit && <AuditTrace />}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 bg-transparent border border-white/20 px-3 py-2 focus-within:border-hud-teal focus-within:bg-hud-teal/5 transition-all">
          <Terminal className="w-4 h-4 text-hud-teal" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="AWAITING COMMAND..."
            className="w-full bg-transparent border-none outline-none font-mono text-xs text-text-main placeholder-slate-600 uppercase"
          />
        </div>
        <button
          type="submit"
          disabled={isAnalyzing}
          className="bg-hud-teal/20 border border-hud-teal text-hud-teal p-2.5 hover:bg-hud-teal hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-hud-teal/20 disabled:hover:text-hud-teal"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
