import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, TopBar } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { AICopilot } from './pages/AICopilot';
import { CommunityMap } from './pages/CommunityMap';
import { Predictions } from './pages/Predictions';
import { Reports } from './pages/Reports';
import { Analytics } from './pages/Analytics';
import { IssueReporting } from './pages/IssueReporting';
import { CommunityScore } from './pages/CommunityScore';
import { Notifications } from './pages/Notifications';
import { AdminPortal } from './pages/AdminPortal';
import { SettingsPage } from './pages/Settings';

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'AI-powered community overview · Updated 2 min ago' },
  '/map': { title: 'Community Map', subtitle: 'Interactive live map with 9 data layers' },
  '/copilot': { title: 'AI Copilot', subtitle: 'Conversational intelligence powered by Gemini' },
  '/predictions': { title: 'Predictions', subtitle: 'Multi-domain AI forecasting · 94% accuracy' },
  '/reports': { title: 'Reports', subtitle: 'AI-generated community intelligence reports' },
  '/analytics': { title: 'Analytics', subtitle: 'Community data insights and trends' },
  '/issues': { title: 'Issue Reporting', subtitle: 'AI-classified civic issue management' },
  '/score': { title: 'Community Score', subtitle: 'Multi-dimensional community wellness index' },
  '/notifications': { title: 'Notifications', subtitle: 'Real-time alerts and intelligent updates' },
  '/admin': { title: 'Admin Portal', subtitle: 'Municipal command center · Administrator access' },
  '/settings': { title: 'Settings', subtitle: 'Platform preferences and account management' },
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const meta = pageMeta[location.pathname] || { title: 'NeighborIQ', subtitle: '' };

  return (
    <div className="flex min-h-screen" style={{ background: '#09090B' }}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <TopBar
        sidebarCollapsed={sidebarCollapsed}
        title={meta.title}
        subtitle={meta.subtitle}
      />

      <motion.main
        animate={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="flex-1 pt-20 p-6 min-h-screen"
        style={{ minWidth: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Routes location={location}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/map" element={<CommunityMap />} />
              <Route path="/copilot" element={<AICopilot />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/issues" element={<IssueReporting />} />
              <Route path="/score" element={<CommunityScore />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}

export default App;

