import React from 'react';
import { motion } from 'framer-motion';
import {
  Star, TrendingUp, TrendingDown, Award, Shield, Heart,
  Leaf, Car, Zap, GraduationCap, AlertTriangle, Users, Target,
} from 'lucide-react';
import { communityScores, radarData } from '../data/mockData';
import { CountUp, ProgressBar } from '../components/ui/Common';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Legend,
} from 'recharts';

const trendData = [
  { month: 'Jan', score: 74, city_avg: 68 },
  { month: 'Feb', score: 76, city_avg: 69 },
  { month: 'Mar', score: 75, city_avg: 70 },
  { month: 'Apr', score: 78, city_avg: 71 },
  { month: 'May', score: 80, city_avg: 71 },
  { month: 'Jun', score: 79, city_avg: 72 },
  { month: 'Jul', score: 82, city_avg: 72 },
];

const categoryConfig = [
  { key: 'safety', label: 'Safety', icon: Shield, color: '#2563EB' },
  { key: 'healthcare', label: 'Healthcare', icon: Heart, color: '#EF4444' },
  { key: 'environment', label: 'Environment', icon: Leaf, color: '#10B981' },
  { key: 'transportation', label: 'Transportation', icon: Car, color: '#F59E0B' },
  { key: 'utilities', label: 'Utilities', icon: Zap, color: '#8B5CF6' },
  { key: 'education', label: 'Education', icon: GraduationCap, color: '#06B6D4' },
  { key: 'accessibility', label: 'Accessibility', icon: Users, color: '#EC4899' },
  { key: 'emergency', label: 'Emergency Prep', icon: AlertTriangle, color: '#F97316' },
  { key: 'satisfaction', label: 'Satisfaction', icon: Star, color: '#FBBF24' },
];

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
  const angle = (score / 100) * 180 - 90;
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 120 }}>
      <svg width="200" height="120" viewBox="0 0 200 120">
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#27272A"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* Score arc */}
        <motion.path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 251.3} 251.3`}
          initial={{ strokeDasharray: '0 251.3' }}
          animate={{ strokeDasharray: `${(score / 100) * 251.3} 251.3` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}80)` }}
        />
        {/* Needle */}
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="30"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: -90 }}
          animate={{ rotate: angle }}
          style={{ transformOrigin: '100px 100px' }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <circle cx="100" cy="100" r="6" fill={color} />

        {/* Labels */}
        <text x="10" y="115" fill="#71717A" fontSize="10">0</text>
        <text x="92" y="22" fill="#71717A" fontSize="10">50</text>
        <text x="182" y="115" fill="#71717A" fontSize="10">100</text>
      </svg>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <CountUp end={score} className="text-4xl font-bold" style={{ color } as any} />
        <div className="text-xs text-muted">Community IQ</div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 rounded-xl text-xs" style={{ background: '#27272A', border: '1px solid #3F3F46' }}>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted">{entry.name}:</span>
          <span className="font-medium text-white">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const CommunityScore: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'radial-gradient(circle at center, rgba(16,185,129,0.3), transparent)' }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} className="text-warning" />
              <span className="text-xs font-semibold text-warning uppercase tracking-wider">Overall Community IQ Score</span>
            </div>
            <ScoreGauge score={communityScores.overall} />
            <div className="mt-4 flex items-center justify-center gap-2">
              <TrendingUp size={14} className="text-secondary" />
              <span className="text-sm text-secondary font-semibold">+3.2 points this month</span>
            </div>
            <p className="text-xs text-muted mt-2">
              Your community ranks <span className="text-white font-semibold">#4 of 28</span> districts city-wide
            </p>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-5 lg:col-span-2"
        >
          <h3 className="font-semibold text-white mb-4">Multi-Dimension Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#3F3F46" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717A', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#52525B', fontSize: 9 }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#2563EB"
                  fill="#2563EB"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Category Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-5"
      >
        <h3 className="font-semibold text-white mb-5">Category Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryConfig.map((cat, i) => {
            const score = communityScores[cat.key as keyof typeof communityScores] as number;
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="p-4 rounded-xl"
                style={{ background: '#18181B', border: '1px solid #3F3F46' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg" style={{ background: `${cat.color}20` }}>
                      <Icon size={13} style={{ color: cat.color }} />
                    </div>
                    <span className="text-sm font-medium text-white">{cat.label}</span>
                  </div>
                  <span className="text-lg font-bold" style={{ color: cat.color }}>
                    <CountUp end={score} duration={1.2} />
                  </span>
                </div>
                <ProgressBar value={score} color={cat.color} />
                <div className="flex items-center gap-1 mt-2 text-xs text-muted">
                  <TrendingUp size={10} className="text-secondary" />
                  +1.5% vs last month
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-5"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Score Trend vs City Average</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-primary rounded" />
              <span className="text-muted">Your District</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded" style={{ background: '#52525B' }} />
              <span className="text-muted">City Average</span>
            </div>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="month" stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <YAxis domain={[60, 90]} stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="score"
                name="Your District"
                stroke="#2563EB"
                strokeWidth={2.5}
                dot={{ fill: '#2563EB', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="city_avg"
                name="City Average"
                stroke="#52525B"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

