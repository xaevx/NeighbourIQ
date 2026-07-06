import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, Bot, TrendingUp, FileText, BarChart3,
  AlertCircle, Star, Bell, Settings, ShieldCheck, Menu, X,
  ChevronRight, Cpu, Users, LogOut, HelpCircle,
} from 'lucide-react';
import { notifications } from '../../data/mockData';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', group: 'main' },
  { path: '/map', icon: Map, label: 'Community Map', group: 'main' },
  { path: '/copilot', icon: Bot, label: 'AI Copilot', group: 'main', badge: 'AI' },
  { path: '/predictions', icon: TrendingUp, label: 'Predictions', group: 'main' },
  { path: '/reports', icon: FileText, label: 'Reports', group: 'main' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics', group: 'insights' },
  { path: '/issues', icon: AlertCircle, label: 'Issue Reporting', group: 'insights' },
  { path: '/score', icon: Star, label: 'Community Score', group: 'insights' },
  { path: '/notifications', icon: Bell, label: 'Notifications', group: 'system', badge: `${notifications.filter(n => !n.read).length}` },
  { path: '/admin', icon: ShieldCheck, label: 'Admin Portal', group: 'system' },
  { path: '/settings', icon: Settings, label: 'Settings', group: 'system' },
];

const groups = [
  { id: 'main', label: 'Platform' },
  { id: 'insights', label: 'Intelligence' },
  { id: 'system', label: 'System' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col"
      style={{ background: '#18181B', borderRight: '1px solid #3F3F46' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: '#3F3F46' }}>
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)' }}>
            <Cpu size={18} className="text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary border-2"
            style={{ borderColor: '#18181B' }} />
        </div>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="min-w-0"
            >
              <div className="font-bold text-white text-sm leading-tight">NeighborIQ</div>
              <div className="text-xs" style={{ color: '#71717A' }}>Decision Intelligence</div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-lg transition-colors hover:bg-card"
          style={{ color: '#71717A' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 no-scrollbar">
        {groups.map((group) => {
          const groupItems = navItems.filter(item => item.group === group.id);
          return (
            <div key={group.id} className="mb-2">
              {!collapsed && (
                <div className="px-4 py-2">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#52525B' }}>
                    {group.label}
                  </span>
                </div>
              )}
              {groupItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all duration-200 group"
                    style={{
                      background: isActive ? 'rgba(37,99,235,0.15)' : 'transparent',
                      color: isActive ? '#60A5FA' : '#A1A1AA',
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}
                      />
                    )}
                    <Icon size={18} className="flex-shrink-0 relative z-10" />
                    <AnimatePresence mode="wait">
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm font-medium flex-1 relative z-10 whitespace-nowrap"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {item.badge && !collapsed && (
                      <span className="relative z-10 text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: item.badge === 'AI' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                          color: item.badge === 'AI' ? '#34D399' : '#F87171',
                          border: `1px solid ${item.badge === 'AI' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                        }}>
                        {item.badge}
                      </span>
                    )}
                    {item.badge && collapsed && parseInt(item.badge) > 0 && item.badge !== 'AI' && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-danger text-white text-xs flex items-center justify-center font-bold">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t" style={{ borderColor: '#3F3F46' }}>
        <div className="flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors hover:bg-card">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)', color: 'white' }}>
            A
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="text-sm font-semibold text-white truncate">Alex Chen</div>
                <div className="text-xs truncate" style={{ color: '#71717A' }}>City Administrator</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
};

interface TopBarProps {
  sidebarCollapsed: boolean;
  title: string;
  subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ sidebarCollapsed, title, subtitle }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.header
      animate={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 right-0 z-30 flex items-center gap-4 px-6 py-4"
      style={{
        background: 'rgba(9,9,11,0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #3F3F46',
        left: sidebarCollapsed ? 72 : 256,
      }}
    >
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-white truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted truncate">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: '#27272A', border: '1px solid #3F3F46' }}>
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-muted">Live</span>
        </div>

        <button className="relative p-2 rounded-lg transition-colors hover:bg-card">
          <Bell size={18} className="text-muted" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-danger text-white text-xs flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        <button className="p-2 rounded-lg transition-colors hover:bg-card">
          <HelpCircle size={18} className="text-muted" />
        </button>

        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)', color: 'white' }}>
          A
        </div>
      </div>
    </motion.header>
  );
};
