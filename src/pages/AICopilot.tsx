import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, Paperclip, Sparkles, Bot, User, ThumbsUp, ThumbsDown,
  Copy, RefreshCw, ChevronDown, AlertCircle, CheckCircle2, Info,
  Lightbulb, Database, Brain,
} from 'lucide-react';
import { aiCopilotResponses } from '../data/mockData';
import { ConfidenceBadge, AIThinking } from '../components/ui/Common';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  response?: typeof aiCopilotResponses.default;
  thinking?: boolean;
}

const suggestedQueries = [
  { text: 'Is it safe to travel tonight?', key: 'safety' },
  { text: 'Which hospital is least crowded?', key: 'hospital' },
  { text: 'Will flooding affect my area?', key: 'flood' },
  { text: 'Explain why traffic is worse today', key: 'traffic' },
  { text: 'How can I reduce electricity costs?', key: 'default' },
  { text: 'Summarize today\'s important updates', key: 'default' },
];

const getResponseKey = (text: string): keyof typeof aiCopilotResponses => {
  const lower = text.toLowerCase();
  if (lower.includes('traffic') || lower.includes('congestion') || lower.includes('route')) return 'traffic';
  if (lower.includes('hospital') || lower.includes('clinic') || lower.includes('doctor')) return 'hospital';
  if (lower.includes('safe') || lower.includes('crime') || lower.includes('night')) return 'safety';
  if (lower.includes('flood') || lower.includes('water') || lower.includes('rain')) return 'flood';
  return 'default';
};

const ResponseCard: React.FC<{ response: typeof aiCopilotResponses.default; text: string }> = ({ response, text }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="p-4 rounded-xl" style={{ background: '#18181B', border: '1px solid #3F3F46' }}>
        <div className="flex items-start gap-2 mb-2">
          <Brain size={14} className="text-primary flex-shrink-0 mt-0.5" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Summary</span>
        </div>
        <p className="text-sm text-white leading-relaxed">{response.summary}</p>
      </div>

      {/* Confidence */}
      <div className="flex items-center justify-between">
        <ConfidenceBadge score={response.confidence} size="md" />
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg transition-colors hover:bg-card text-muted hover:text-white"
          >
            {copied ? <CheckCircle2 size={14} className="text-secondary" /> : <Copy size={14} />}
          </button>
          <button className="p-1.5 rounded-lg transition-colors hover:bg-card text-muted hover:text-white">
            <ThumbsUp size={14} />
          </button>
          <button className="p-1.5 rounded-lg transition-colors hover:bg-card text-muted hover:text-white">
            <ThumbsDown size={14} />
          </button>
        </div>
      </div>

      {/* Expandable Reasoning */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs font-medium transition-colors"
        style={{ color: '#71717A' }}
      >
        <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        {expanded ? 'Hide' : 'Show'} reasoning, evidence & sources
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 overflow-hidden"
          >
            {/* Reasoning */}
            <div className="p-3 rounded-xl" style={{ background: '#18181B', border: '1px solid #3F3F46' }}>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={12} className="text-warning" />
                <span className="text-xs font-semibold text-warning uppercase tracking-wider">Reasoning</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{response.reasoning}</p>
            </div>

            {/* Evidence */}
            <div className="p-3 rounded-xl" style={{ background: '#18181B', border: '1px solid #3F3F46' }}>
              <div className="flex items-center gap-2 mb-2">
                <Database size={12} className="text-secondary" />
                <span className="text-xs font-semibold text-secondary uppercase tracking-wider">Evidence</span>
              </div>
              <ul className="space-y-1">
                {response.evidence.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted">
                    <CheckCircle2 size={10} className="text-secondary flex-shrink-0 mt-0.5" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sources */}
            <div className="flex flex-wrap gap-2">
              {response.sources.map((source, i) => (
                <span key={i} className="badge badge-primary">{source}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="p-3 rounded-xl" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={12} className="text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Recommended Actions</span>
              </div>
              <ul className="space-y-1">
                {response.actions.map((action, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white">
                    <span className="w-4 h-4 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AICopilot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hello Alex! I'm your NeighborIQ AI Copilot, powered by Gemini. I have access to real-time data from 47 community data sources. How can I help you make a better decision today?",
      timestamp: new Date(),
      response: aiCopilotResponses.default,
    },
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1800 + Math.random() * 800));

    const key = getResponseKey(query);
    const response = aiCopilotResponses[key] || aiCopilotResponses.default;

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: response.summary,
      timestamp: new Date(),
      response,
    };

    setIsThinking(false);
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ height: 'calc(100vh - 130px)' }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
            <Bot size={22} className="text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-secondary border-2"
            style={{ borderColor: '#09090B' }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">AI Community Copilot</h2>
          <p className="text-sm text-muted">Powered by Gemini · RAG-enabled · 47 live data sources</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="badge badge-success">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Online
          </div>
          <button className="p-2 rounded-lg hover:bg-card transition-colors">
            <RefreshCw size={16} className="text-muted" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
                  <Sparkles size={14} className="text-white" />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                {message.role === 'user' ? (
                  <div className="px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                    {message.text}
                  </div>
                ) : (
                  <div className="w-full space-y-3">
                    {message.response && (
                      <ResponseCard response={message.response} text={message.text} />
                    )}
                  </div>
                )}
                <span className="text-xs text-muted px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg, #52525B, #3F3F46)', color: 'white' }}>
                  A
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* AI Thinking */}
        <AnimatePresence>
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="card px-4 py-3">
                <AIThinking text="Analyzing community data and generating response..." />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Queries */}
      {messages.length <= 1 && (
        <div className="mt-4">
          <p className="text-xs text-muted mb-3 font-medium">SUGGESTED QUERIES</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q.text)}
                className="text-xs px-3 py-2 rounded-xl transition-all hover:border-primary hover:text-white"
                style={{
                  background: '#27272A',
                  border: '1px solid #3F3F46',
                  color: '#A1A1AA',
                }}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="mt-4 relative">
        <div className="flex items-center gap-3 p-3 rounded-2xl"
          style={{ background: '#27272A', border: '1px solid #3F3F46' }}>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-xl transition-all flex-shrink-0 ${isRecording ? 'bg-danger/20 text-danger' : 'hover:bg-card text-muted hover:text-white'}`}
          >
            <Mic size={18} className={isRecording ? 'animate-pulse' : ''} />
          </button>
          <button className="p-2 rounded-xl hover:bg-card transition-colors flex-shrink-0 text-muted hover:text-white">
            <Paperclip size={18} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your community..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-muted"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={!input.trim() || isThinking}
            className="p-2 rounded-xl flex-shrink-0 transition-all disabled:opacity-40"
            style={{
              background: input.trim() ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : '#3F3F46',
            }}
          >
            <Send size={16} className="text-white" />
          </motion.button>
        </div>
        <p className="text-xs text-muted text-center mt-2">
          AI responses include confidence scores and source citations. This is not professional advice.
        </p>
      </div>
    </div>
  );
};

