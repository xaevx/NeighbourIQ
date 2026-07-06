import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Cpu, ArrowRight, Play, Shield, Brain, TrendingUp, Map,
  Bot, BarChart3, AlertCircle, Star, Sparkles, ChevronDown,
  Zap, Heart, Leaf, Car, Users, CheckCircle2,
} from 'lucide-react';

const floatingNodes = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 6 + 2,
  delay: Math.random() * 5,
  duration: Math.random() * 8 + 6,
}));

const dataStreams = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  startY: Math.random() * 100,
  endX: Math.random() * 100,
  endY: Math.random() * 100,
  delay: Math.random() * 3,
}));

const features = [
  { icon: Bot, label: 'AI Copilot', desc: 'Gemini-powered conversational intelligence', color: '#2563EB' },
  { icon: Map, label: 'Live Community Map', desc: 'Real-time interactive layer map', color: '#10B981' },
  { icon: TrendingUp, label: 'Predictive Intelligence', desc: 'Multi-domain AI forecasting', color: '#F59E0B' },
  { icon: AlertCircle, label: 'Issue Reporting', desc: 'AI-classified civic issue tracking', color: '#EF4444' },
  { icon: Star, label: 'Community Score', desc: 'Multi-dimensional wellness index', color: '#8B5CF6' },
  { icon: BarChart3, label: 'Analytics', desc: 'Beautiful data storytelling', color: '#EC4899' },
];

const stats = [
  { label: 'Data Sources', value: '47+', icon: Brain },
  { label: 'Citizens Served', value: '2.3M', icon: Users },
  { label: 'AI Predictions/Day', value: '18K', icon: Sparkles },
  { label: 'Issue Resolution Rate', value: '94%', icon: CheckCircle2 },
];

const AnimatedCounter: React.FC<{ value: string; delay?: number }> = ({ value, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000 + 800);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {value}
    </motion.span>
  );
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen animated-gradient-bg overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all"
        style={{
          background: scrolled ? 'rgba(9,9,11,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid #3F3F46' : 'none',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
            <Cpu size={18} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">NeighborIQ</div>
            <div className="text-xs text-muted">Decision Intelligence</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          {['Features', 'How it Works', 'Architecture', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-secondary text-sm px-4 py-2">Sign In</button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
            className="btn-primary text-sm px-4 py-2"
          >
            Launch Platform <ArrowRight size={14} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid */}
          <div className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />

          {/* Radial glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.6), transparent)' }} />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.6), transparent)' }} />
          <div className="absolute top-1/3 right-1/4 w-[200px] h-[200px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6), transparent)' }} />

          {/* Floating nodes */}
          {floatingNodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute rounded-full"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: node.size,
                height: node.size,
                background: node.id % 3 === 0 ? '#2563EB' : node.id % 3 === 1 ? '#10B981' : '#8B5CF6',
                opacity: 0.4,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                delay: node.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Data stream lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            {dataStreams.map((stream) => (
              <motion.line
                key={stream.id}
                x1={`${stream.startX}%`}
                y1={`${stream.startY}%`}
                x2={`${stream.endX}%`}
                y2={`${stream.endY}%`}
                stroke="#2563EB"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: stream.delay }}
              />
            ))}
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold"
              style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', color: '#60A5FA' }}>
              <Sparkles size={12} />
              Powered by Gemini · Vertex AI · Google Cloud
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              The Intelligence Layer{' '}
              <br />
              <span className="gradient-text">for Better Communities.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed mb-10">
              NeighborIQ transforms real-time community data into AI-powered recommendations that help citizens and decision makers make{' '}
              <span className="text-white font-medium">faster, safer, and smarter decisions.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(37,99,235,0.5)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/dashboard')}
                className="btn-primary text-base px-8 py-3.5 glow-blue"
              >
                <Zap size={18} /> Launch Platform
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setDemoPlaying(true)}
                className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(37,99,235,0.3)' }}>
                  <Play size={10} className="text-primary ml-0.5" />
                </div>
                Watch Demo
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-2xl text-center"
                    style={{ background: 'rgba(39,39,42,0.6)', backdropFilter: 'blur(16px)', border: '1px solid #3F3F46' }}
                  >
                    <Icon size={20} className="text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">
                      <AnimatedCounter value={stat.value} delay={i * 0.1} />
                    </div>
                    <div className="text-xs text-muted">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
          >
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Every decision,{' '}
              <span className="gradient-text">AI-powered.</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Twelve integrated modules working together to give your community a unified intelligence layer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="card p-6 cursor-pointer group relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at top left, ${feature.color}10, transparent)` }} />
                  <div className="relative">
                    <div className="p-3 rounded-xl w-fit mb-4" style={{ background: `${feature.color}15` }}>
                      <Icon size={22} style={{ color: feature.color }} />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2">{feature.label}</h3>
                    <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: feature.color }}>
                      Explore <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.4), transparent 70%)' }} />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Responsible AI at its core.
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Every AI decision shows you the why. Confidence scores, evidence, sources, and reasoning — always transparent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: 'What is happening?', icon: Brain, color: '#2563EB', desc: 'Real-time sensor data across 47 city systems' },
              { q: 'Why is it happening?', icon: Sparkles, color: '#10B981', desc: 'Causal AI explains root causes and correlations' },
              { q: 'What should I do?', icon: ArrowRight, color: '#8B5CF6', desc: 'Personalized action recommendations with confidence scores' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="card p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                    <Icon size={24} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{item.q}</h3>
                  <p className="text-muted text-sm">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card p-12 relative overflow-hidden"
            style={{ border: '1px solid rgba(37,99,235,0.3)' }}
          >
            <div className="absolute inset-0"
              style={{ background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.1), transparent)' }} />
            <div className="relative">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
                  <Cpu size={22} className="text-white" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to transform your community?
              </h2>
              <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
                Join cities and communities using NeighborIQ to make data-driven decisions that improve everyday life.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/dashboard')}
                className="btn-primary text-lg px-12 py-4"
                style={{ boxShadow: '0 0 40px rgba(37,99,235,0.4)' }}
              >
                <Zap size={20} /> Launch NeighborIQ Platform
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: '#27272A' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
              <Cpu size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">NeighborIQ</span>
            <span className="text-muted text-sm">— Decision Intelligence Platform</span>
          </div>
          <div className="text-sm text-muted">
            Built on Google Cloud · Powered by Gemini AI · © 2026 NeighborIQ
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <AnimatePresence>
        {demoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setDemoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-8 max-w-lg w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Bot size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Demo Coming Soon</h3>
              <p className="text-muted mb-6">Experience the full platform by launching NeighborIQ directly.</p>
              <button onClick={() => { setDemoPlaying(false); navigate('/dashboard'); }} className="btn-primary w-full justify-center">
                Launch Platform Instead <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

