import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, AlertTriangle, Info, ChevronRight, Brain,
  Clock, Target, Lightbulb, Car, Heart, Droplets, CloudRain,
  Zap, Wind, Trash2, Volume2, Flame,
} from 'lucide-react';
import { predictions } from '../data/mockData';
import { ConfidenceBadge } from '../components/ui/Common';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from 'recharts';

const forecastData = [
  { hour: '6AM', traffic: 20, hospital: 40, flood: 5, power: 55 },
  { hour: '7AM', traffic: 60, hospital: 55, flood: 5, power: 65 },
  { hour: '8AM', traffic: 90, hospital: 70, flood: 8, power: 80 },
  { hour: '9AM', traffic: 75, hospital: 65, flood: 10, power: 75 },
  { hour: '10AM', traffic: 45, hospital: 58, flood: 12, power: 68 },
  { hour: '12PM', traffic: 55, hospital: 60, flood: 15, power: 72 },
  { hour: '2PM', traffic: 42, hospital: 55, flood: 18, power: 85 },
  { hour: '4PM', traffic: 78, hospital: 72, flood: 22, power: 92 },
  { hour: '5PM', traffic: 95, hospital: 85, flood: 28, power: 98 },
  { hour: '6PM', traffic: 88, hospital: 80, flood: 32, power: 90 },
  { hour: '8PM', traffic: 60, hospital: 70, flood: 35, power: 78 },
  { hour: '10PM', traffic: 30, hospital: 55, flood: 38, power: 65 },
];

const PredictionCard: React.FC<{ prediction: typeof predictions[0]; index: number }> = ({
  prediction, index
}) => {
  const [expanded, setExpanded] = useState(index === 0);

  const impactColor = {
    Critical: '#EF4444',
    High: '#F59E0B',
    Medium: '#F59E0B',
    Low: '#10B981',
  }[prediction.impact] || '#2563EB';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card overflow-hidden"
    >
      <div
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-primary text-xs">{prediction.category}</span>
              <span
                className="badge text-xs"
                style={{
                  background: `${impactColor}15`,
                  color: impactColor,
                  border: `1px solid ${impactColor}30`,
                }}
              >
                {prediction.impact} Impact
              </span>
            </div>
            <h3 className="font-semibold text-white mb-1">{prediction.title}</h3>
            <p className="text-sm text-muted">{prediction.description}</p>
          </div>
          <ChevronRight
            size={18}
            className={`text-muted flex-shrink-0 transition-transform mt-1 ${expanded ? 'rotate-90' : ''}`}
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <ConfidenceBadge score={prediction.confidence} />
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Clock size={12} />
            {prediction.timeline}
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 border-t" style={{ borderColor: '#3F3F46' }}>
          <div className="pt-4 space-y-4">
            {/* AI Explanation */}
            <div className="p-3.5 rounded-xl" style={{ background: '#18181B', border: '1px solid #3F3F46' }}>
              <div className="flex items-center gap-2 mb-2">
                <Brain size={13} className="text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">AI Explanation</span>
              </div>
              <p className="text-sm text-muted leading-relaxed">{prediction.explanation}</p>
            </div>

            {/* Recommended Actions */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={13} className="text-warning" />
                <span className="text-xs font-semibold text-warning uppercase tracking-wider">Recommended Actions</span>
              </div>
              <ul className="space-y-2">
                {prediction.actions.map((action, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: `${prediction.color}20`, color: prediction.color }}
                    >
                      {i + 1}
                    </span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>

            {/* Confidence bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted">Prediction Confidence</span>
                <span className="font-semibold text-white">{prediction.confidence}%</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: '#3F3F46' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.confidence}%` }}
                  transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${prediction.color}80, ${prediction.color})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 rounded-xl text-xs" style={{ background: '#27272A', border: '1px solid #3F3F46' }}>
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted capitalize">{entry.name}:</span>
          <span className="font-medium text-white">{entry.value}%</span>
        </div>
      ))}
    </div>
  );
};

export const Predictions: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<string[]>(['traffic', 'hospital', 'flood']);

  const metrics = [
    { key: 'traffic', label: 'Traffic', color: '#F59E0B' },
    { key: 'hospital', label: 'Hospital', color: '#EF4444' },
    { key: 'flood', label: 'Flood Risk', color: '#0EA5E9' },
    { key: 'power', label: 'Power Demand', color: '#8B5CF6' },
  ];

  const toggleMetric = (key: string) => {
    setActiveMetric(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(37,99,235,0.2), transparent)' }} />
        <div className="relative flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Brain size={18} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Predictive Intelligence Engine</span>
            </div>
            <h2 className="text-xl font-bold text-white">24-Hour Community Forecast</h2>
            <p className="text-sm text-muted mt-1">
              AI models trained on 5 years of community data · Updated every 30 minutes
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="badge badge-success">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Multi-Domain Forecast</h3>
          <div className="flex gap-2">
            {metrics.map((m) => (
              <button
                key={m.key}
                onClick={() => toggleMetric(m.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: activeMetric.includes(m.key) ? `${m.color}20` : '#18181B',
                  color: activeMetric.includes(m.key) ? m.color : '#71717A',
                  border: `1px solid ${activeMetric.includes(m.key) ? `${m.color}40` : '#3F3F46'}`,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecastData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                {metrics.map((m) => (
                  <linearGradient key={m.key} id={`gradient-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={m.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="hour" stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <YAxis stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <Tooltip content={<CustomTooltip />} />
              {metrics.map((m) =>
                activeMetric.includes(m.key) && (
                  <Area
                    key={m.key}
                    type="monotone"
                    dataKey={m.key}
                    name={m.label}
                    stroke={m.color}
                    strokeWidth={2}
                    fill={`url(#gradient-${m.key})`}
                  />
                )
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prediction Cards */}
      <div>
        <h3 className="font-semibold text-white mb-4">Active Predictions</h3>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <PredictionCard key={prediction.id} prediction={prediction} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

