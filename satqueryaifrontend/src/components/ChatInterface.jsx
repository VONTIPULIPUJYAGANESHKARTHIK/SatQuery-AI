import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal } from 'lucide-react';
import AuditTrace from './AuditTrace';

const initialMessages = [
  { role: 'system', content: 'Agentic Backend initialized. Ready for multimodal analysis.' },
  { role: 'user', content: 'Detect cargo ships near the harbor layout in the latest image.' },
  { role: 'ai', content: 'Analyzing... Found 14 potential cargo ships in the designated harbor area. Applying segmentation masks.', isAnalyzing: false },
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

    // Mock analysis delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Processing query with ChangeFormer architecture...', isAnalyzing: true }
      ]);
      
      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'ai',
            content: 'Analysis complete. Displaying bounding boxes and segmentation masks for the identified regions.',
            isAnalyzing: false,
            hasAudit: true
          };
          return newMessages;
        });
        setIsAnalyzing(false);
      }, 2000);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden border border-slate-800 rounded-lg bg-slate-900/40 backdrop-blur-sm">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {msg.role === 'system' ? (
              <div className="w-full text-center mb-2">
                <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                  {msg.content}
                </span>
              </div>
            ) : (
              <div className="max-w-[85%]">
                <div
                  className={`px-4 py-2.5 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-panel border border-slate-700 text-text-main rounded-br-none'
                      : 'bg-primary border border-accent/30 text-slate-200 rounded-bl-none'
                  } ${msg.isAnalyzing ? 'animate-pulse border-accent shadow-[0_0_10px_rgba(6,182,212,0.2)]' : ''}`}
                >
                  {msg.content}
                </div>
                {msg.hasAudit && (
                  <div className="mt-2">
                    <AuditTrace />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 bg-panel/80 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g., Detect cargo ships near the harbor layout..."
          className="flex-1 bg-primary border border-slate-700 rounded-md px-3 py-2 text-sm text-text-main placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        />
        <button
          type="submit"
          disabled={isAnalyzing}
          className="bg-accent/20 text-accent border border-accent hover:bg-accent hover:text-primary p-2 rounded-md transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {isAnalyzing && (
            <div className="absolute inset-0 bg-white/20 animate-[pulse_1s_ease-in-out_infinite]" />
          )}
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
