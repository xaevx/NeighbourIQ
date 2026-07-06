import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Shield, Car, Leaf, Activity, Building2, Zap, Users,
  TrendingUp, TrendingDown, Info, X, CloudRain, Bus, Trash2,
  Wind, Stethoscope, Music, Sparkles, AlertTriangle, CheckCircle2,
  ArrowRight, RefreshCw,
} from 'lucide-react';
import { kpiCards, dailyBriefItems } from '../data/mockData';
import { CountUp, ConfidenceBadge, PriorityBadge } from '../components/ui/Common';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Heart, Shield, Car, Leaf, Activity, Building2, Zap, Users,
  CloudRain, Bus, Trash2, Wind, Stethoscope, Music,
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const KPICard: React.FC<{ card: typeof kpiCards[0]; index: number }> = ({ card, index }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[card.icon] || Heart;
  const isPositive = card.trend === 'up';

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.01 }}
      className="card p-5 cursor-pointer relative overflow-hidden"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Gradient background accent */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-5"
        style={{ background: card.color, filter: 'blur(24px)', transform: 'translate(25%, -25%)' }} />

      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl" style={{ background: `${card.color}20` }}>
          <Icon size={20} style={{ color: card.color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-secondary' : 'text-danger'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{card.change}%
        </div>
      </div>

      <div className="mb-1">
        <CountUp
          end={card.value}
          suffix={card.unit}
          className="text-3xl font-bold text-white"
          duration={1.5}
        />
      </div>

      <div className="text-sm font-medium text-white mb-1">{card.label}</div>
      <div className="text-xs text-muted">{card.description}</div>

      {/* Score bar */}
      <div className="mt-4 relative">
        <div className="w-full h-1.5 rounded-full" style={{ background: '#3F3F46' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${card.value}%` }}
            transition={{ delay: index * 0.08 + 0.4, duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${card.color}80, ${card.color})` }}
          />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t overflow-hidden"
            style={{ borderColor: '#3F3F46' }}
          >
            <p className="text-xs text-muted">
              Score trends compared to last week. Click to view detailed analytics.
            </p>
            <button className="mt-2 text-xs font-medium flex items-center gap-1" style={{ color: card.color }}>
              View Details <ArrowRight size={10} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const DailyBriefItem: React.FC<{ item: typeof dailyBriefItems[0]; index: number; onDismiss: (id: number) => void }> = ({
  item, index, onDismiss
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const Icon = iconMap[item.icon] || Info;

  const priorityColors: Record<string, string> = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
    info: '#2563EB',
  };
  const color = priorityColors[item.priority] || '#2563EB';

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, height: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group"
    >
      <div
        className="flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all hover:bg-card"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="p-2 rounded-lg flex-shrink-0 mt-0.5" style={{ background: `${color}15` }}>
          <Icon size={14} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white leading-snug">{item.text}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <PriorityBadge priority={item.priority} />
            <ConfidenceBadge score={item.confidence} size="sm" />
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDismiss(item.id); }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all hover:bg-card flex-shrink-0"
          style={{ color: '#71717A' }}
        >
          <X size={12} />
        </button>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-10 px-3.5 pb-3 overflow-hidden"
          >
            <div className="p-3 rounded-xl space-y-2 text-xs" style={{ background: '#18181B', border: '1px solid #3F3F46' }}>
              <div className="flex gap-2">
                <span className="text-muted font-medium">Reason:</span>
                <span className="text-white">{item.reason}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-muted font-medium">Source:</span>
                <span style={{ color }}>{item.source}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Dashboard: React.FC = () => {
  const [briefItems, setBriefItems] = useState(dailyBriefItems);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [refreshing, setRefreshing] = useState(false);

  const handleDismiss = (id: number) => {
    setBriefItems(prev => prev.filter(item => item.id !== id));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdated('Just now');
      setBriefItems(dailyBriefItems);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Smart Daily Brief */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 relative overflow-hidden"
      >
        {/* Ambient gradient */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(37,99,235,0.15), transparent 60%)' }} />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-warning" />
                <span className="text-xs font-semibold text-warning uppercase tracking-wider">Smart Daily Brief</span>
              </div>
              <h2 className="text-2xl font-bold text-white">Good Morning, Alex. ☀️</h2>
              <p className="text-sm text-muted mt-1">
                Here's what the AI has prepared for you — {briefItems.length} insights from {' '}
                <span className="text-white font-medium">47 live data sources</span>.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg transition-colors hover:bg-card flex-shrink-0"
              style={{ color: '#71717A' }}
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>

          <div className="space-y-1">
            <AnimatePresence>
              {briefItems.map((item, idx) => (
                <DailyBriefItem key={item.id} item={item} index={idx} onDismiss={handleDismiss} />
              ))}
            </AnimatePresence>
            {briefItems.length === 0 && (
              <div className="flex items-center gap-2 py-4 text-muted text-sm">
                <CheckCircle2 size={16} className="text-secondary" />
                All briefings reviewed. Great start to the day!
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">Community Intelligence Overview</h2>
            <p className="text-sm text-muted">Real-time scores updated every 15 minutes</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Live · Updated {lastUpdated}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, index) => (
            <KPICard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom Row: Quick Actions + Alert Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-warning" />
            <h3 className="font-semibold text-white">Active Alerts</h3>
            <span className="ml-auto badge badge-danger">3 Critical</span>
          </div>
          <div className="space-y-3">
            {[
              { msg: 'Flash flood watch — River Valley area', color: '#EF4444', time: '10 min ago' },
              { msg: 'Power grid at 94% capacity — demand surge', color: '#F59E0B', time: '32 min ago' },
              { msg: 'Hospital ER approaching capacity limit', color: '#F59E0B', time: '1h ago' },
              { msg: 'Air quality improving — AQI now 72', color: '#10B981', time: '2h ago' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#18181B' }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: alert.color }} />
                <span className="text-sm text-white flex-1">{alert.msg}</span>
                <span className="text-xs text-muted flex-shrink-0">{alert.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-primary" />
            <h3 className="font-semibold text-white">AI Model Performance</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Prediction Accuracy', value: 94, color: '#10B981' },
              { label: 'RAG Response Quality', value: 91, color: '#2563EB' },
              { label: 'Issue Classification', value: 97, color: '#8B5CF6' },
              { label: 'Routing Efficiency', value: 88, color: '#F59E0B' },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted">{metric.label}</span>
                  <span className="font-semibold text-white">{metric.value}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#3F3F46' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${metric.color}80, ${metric.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: '#18181B', border: '1px solid #3F3F46' }}>
            <span className="text-muted">Models trained on </span>
            <span className="text-white font-medium">2.3M data points</span>
            <span className="text-muted"> · Last updated 15 minutes ago</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

