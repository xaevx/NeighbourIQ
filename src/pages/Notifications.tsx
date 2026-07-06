import React from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Info, CheckCircle2, Zap, Droplets, Car, Heart, CloudRain, Users } from 'lucide-react';
import { notifications } from '../data/mockData';
import { PriorityBadge } from '../components/ui/Common';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle2,
  error: AlertTriangle,
};

const colorMap: Record<string, string> = {
  warning: '#F59E0B',
  info: '#2563EB',
  success: '#10B981',
  error: '#EF4444',
};

export const Notifications: React.FC = () => {
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Notification Center</h2>
          <p className="text-sm text-muted">{unread} unread notifications</p>
        </div>
        <button className="btn-secondary text-sm">Mark all read</button>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const Icon = iconMap[notification.type] || Info;
          const color = colorMap[notification.type] || '#2563EB';

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="card p-4 cursor-pointer"
              style={{
                borderColor: !notification.read ? `${color}30` : '#3F3F46',
                background: !notification.read ? `${color}05` : '#27272A',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-xl flex-shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white text-sm">{notification.title}</span>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      )}
                    </div>
                    <PriorityBadge priority={notification.priority} />
                  </div>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{notification.message}</p>
                  <p className="text-xs text-muted mt-2">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Notification Preferences */}
      <div className="card p-5">
        <h3 className="font-semibold text-white mb-4">Alert Preferences</h3>
        <div className="space-y-3">
          {[
            { label: 'Emergency Alerts', icon: AlertTriangle, color: '#EF4444', enabled: true },
            { label: 'Weather Warnings', icon: CloudRain, color: '#0EA5E9', enabled: true },
            { label: 'Power Outages', icon: Zap, color: '#8B5CF6', enabled: true },
            { label: 'Traffic Incidents', icon: Car, color: '#F59E0B', enabled: true },
            { label: 'Healthcare Notices', icon: Heart, color: '#EF4444', enabled: false },
            { label: 'Community Events', icon: Users, color: '#10B981', enabled: false },
          ].map((pref, i) => {
            const Icon = pref.icon;
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: '#18181B' }}>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg" style={{ background: `${pref.color}15` }}>
                    <Icon size={14} style={{ color: pref.color }} />
                  </div>
                  <span className="text-sm text-white">{pref.label}</span>
                </div>
                <div
                  className="w-10 h-5 rounded-full relative cursor-pointer transition-all"
                  style={{ background: pref.enabled ? '#2563EB' : '#3F3F46' }}
                >
                  <motion.div
                    animate={{ x: pref.enabled ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

