import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, Car, Heart, Leaf,
  Zap, FileText, Target, RefreshCw, Download,
} from 'lucide-react';
import { trafficData, aqiData, communityReportsTrend } from '../data/mockData';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 rounded-xl text-xs" style={{ background: '#27272A', border: '1px solid #3F3F46' }}>
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color || entry.fill }} />
          <span className="text-muted capitalize">{entry.name}:</span>
          <span className="font-medium text-white">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const issueTypeData = [
  { name: 'Potholes', value: 34, color: '#F59E0B' },
  { name: 'Streetlights', value: 22, color: '#2563EB' },
  { name: 'Garbage', value: 19, color: '#10B981' },
  { name: 'Water Leaks', value: 12, color: '#0EA5E9' },
  { name: 'Other', value: 13, color: '#52525B' },
];

const healthcareData = [
  { month: 'Jan', visits: 1240, capacity: 1500 },
  { month: 'Feb', visits: 1100, capacity: 1500 },
  { month: 'Mar', visits: 1380, capacity: 1500 },
  { month: 'Apr', visits: 1290, capacity: 1500 },
  { month: 'May', visits: 1450, capacity: 1500 },
  { month: 'Jun', visits: 1320, capacity: 1500 },
  { month: 'Jul', visits: 1490, capacity: 1500 },
];

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon: React.FC<{ size?: number; className?: string }>;
  children: React.ReactNode;
  delay?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="card p-5"
  >
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-primary" />
        <div>
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-muted">{subtitle}</p>}
        </div>
      </div>
      <button className="p-1.5 rounded-lg hover:bg-card transition-colors">
        <Download size={14} className="text-muted" />
      </button>
    </div>
    {children}
  </motion.div>
);

export const Analytics: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Reports This Month', value: '267', change: '+12%', color: '#2563EB', icon: FileText },
          { label: 'Avg Response Time', value: '4.2h', change: '-18%', color: '#10B981', icon: Target },
          { label: 'Citizen Engagement', value: '8,432', change: '+24%', color: '#8B5CF6', icon: Users },
          { label: 'Forecast Accuracy', value: '94.1%', change: '+2.3%', color: '#F59E0B', icon: TrendingUp },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg" style={{ background: `${stat.color}15` }}>
                  <Icon size={14} style={{ color: stat.color }} />
                </div>
                <span className="text-xs font-semibold text-secondary">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-muted">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Traffic Trends */}
      <ChartCard
        title="Traffic Congestion Trends"
        subtitle="Today's 24-hour congestion index"
        icon={Car}
        delay={0.1}
      >
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="time" stroke="#52525B" tick={{ fontSize: 9, fill: '#71717A' }} />
              <YAxis stroke="#52525B" tick={{ fontSize: 9, fill: '#71717A' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="congestion"
                name="Congestion %"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#trafficGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Row: AQI + Issue Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Air Quality Index (AQI)"
          subtitle="7-day trend by day"
          icon={Leaf}
          delay={0.15}
        >
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aqiData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
                <XAxis dataKey="day" stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
                <YAxis stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="aqi" name="AQI" radius={[4, 4, 0, 0]}>
                  {aqiData.map((entry) => (
                    <Cell
                      key={entry.day}
                      fill={entry.aqi < 50 ? '#10B981' : entry.aqi < 100 ? '#F59E0B' : '#EF4444'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Community Reports by Type"
          subtitle="Breakdown of reported issues"
          icon={FileText}
          delay={0.2}
        >
          <div className="flex items-center gap-4">
            <div className="h-48 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issueTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {issueTypeData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    contentStyle={{ background: '#27272A', border: '1px solid #3F3F46', borderRadius: 12, fontSize: 11 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 flex-shrink-0">
              {issueTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-muted">{item.name}</span>
                  <span className="text-xs font-semibold text-white ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Community Reports Trend */}
      <ChartCard
        title="Community Reports vs Resolved"
        subtitle="Monthly comparison"
        icon={BarChart3}
        delay={0.25}
      >
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={communityReportsTrend} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="month" stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <YAxis stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 11, color: '#71717A', paddingTop: 8 }}
                iconType="circle"
                iconSize={8}
              />
              <Bar dataKey="total" name="Total Reports" fill="#2563EB" radius={[3, 3, 0, 0]} opacity={0.7} />
              <Bar dataKey="resolved" name="Resolved" fill="#10B981" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Healthcare */}
      <ChartCard
        title="Healthcare System Usage"
        subtitle="Monthly visits vs capacity"
        icon={Heart}
        delay={0.3}
      >
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthcareData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />
              <XAxis dataKey="month" stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <YAxis stroke="#52525B" tick={{ fontSize: 10, fill: '#71717A' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="visits"
                name="Visits"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: '#EF4444', r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="capacity"
                name="Capacity"
                stroke="#3F3F46"
                strokeWidth={1.5}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

