import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon, User, Bell, Shield, Globe, Cpu, Moon,
  Smartphone, Key, Database, Save, ChevronRight,
} from 'lucide-react';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'ai', label: 'AI Preferences', icon: Cpu },
  { id: 'data', label: 'Data & Storage', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Moon },
];

interface ToggleRowProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ label, description, enabled, onToggle }) => (
  <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #3F3F46' }}>
    <div>
      <div className="text-sm font-medium text-white">{label}</div>
      {description && <div className="text-xs text-muted mt-0.5">{description}</div>}
    </div>
    <div
      onClick={onToggle}
      className="w-10 h-5 rounded-full relative cursor-pointer transition-all flex-shrink-0"
      style={{ background: enabled ? '#2563EB' : '#3F3F46' }}
    >
      <motion.div
        animate={{ x: enabled ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
      />
    </div>
  </div>
);

export const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    emergencyAlerts: true,
    locationSharing: true,
    dataCollection: true,
    aiPersonalization: true,
    twoFactor: false,
    darkMode: true,
    compactView: false,
    autoRefresh: true,
    highContrast: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex gap-6" style={{ height: 'calc(100vh - 130px)' }}>
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0">
        <div className="card p-3">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all text-left mb-1"
                style={{
                  background: activeSection === s.id ? 'rgba(37,99,235,0.15)' : 'transparent',
                  color: activeSection === s.id ? '#60A5FA' : '#A1A1AA',
                }}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 space-y-6"
        >
          {activeSection === 'profile' && (
            <>
              <h3 className="font-semibold text-white">Profile Settings</h3>
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#18181B' }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #10B981)', color: 'white' }}>
                  A
                </div>
                <div>
                  <div className="font-semibold text-white">Alex Chen</div>
                  <div className="text-sm text-muted">City Administrator · District 4</div>
                  <button className="text-xs text-primary mt-1 hover:underline">Change avatar</button>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Full Name', value: 'Alex Chen' },
                  { label: 'Email', value: 'alex.chen@citygovernment.gov' },
                  { label: 'Phone', value: '+1 (555) 234-5678' },
                  { label: 'Department', value: 'City Administration' },
                  { label: 'Role', value: 'City Administrator' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-medium text-muted mb-1">{field.label}</label>
                    <input className="input text-sm" defaultValue={field.value} />
                  </div>
                ))}
              </div>
              <button className="btn-primary">
                <Save size={14} /> Save Changes
              </button>
            </>
          )}

          {activeSection === 'notifications' && (
            <>
              <h3 className="font-semibold text-white">Notification Preferences</h3>
              <ToggleRow label="Push Notifications" description="Receive real-time alerts on your device" enabled={settings.pushNotifications} onToggle={() => toggle('pushNotifications')} />
              <ToggleRow label="Email Alerts" description="Daily digest and critical alerts via email" enabled={settings.emailAlerts} onToggle={() => toggle('emailAlerts')} />
              <ToggleRow label="SMS Alerts" description="Emergency alerts via text message" enabled={settings.smsAlerts} onToggle={() => toggle('smsAlerts')} />
              <ToggleRow label="Emergency Alerts" description="Always receive critical emergency notifications" enabled={settings.emergencyAlerts} onToggle={() => toggle('emergencyAlerts')} />
            </>
          )}

          {activeSection === 'privacy' && (
            <>
              <h3 className="font-semibold text-white">Privacy & Security</h3>
              <ToggleRow label="Location Sharing" description="Allow AI to use your location for personalized insights" enabled={settings.locationSharing} onToggle={() => toggle('locationSharing')} />
              <ToggleRow label="Data Collection" description="Help improve AI models with anonymized usage data" enabled={settings.dataCollection} onToggle={() => toggle('dataCollection')} />
              <ToggleRow label="Two-Factor Authentication" description="Add extra security to your account" enabled={settings.twoFactor} onToggle={() => toggle('twoFactor')} />
              <div className="mt-4">
                <button className="flex items-center gap-2 text-sm font-medium text-danger hover:underline">
                  <Key size={14} /> Change Password
                </button>
              </div>
            </>
          )}

          {activeSection === 'ai' && (
            <>
              <h3 className="font-semibold text-white">AI Preferences</h3>
              <ToggleRow label="AI Personalization" description="Allow AI to learn from your preferences" enabled={settings.aiPersonalization} onToggle={() => toggle('aiPersonalization')} />
              <ToggleRow label="Auto Refresh" description="Automatically refresh AI insights every 15 minutes" enabled={settings.autoRefresh} onToggle={() => toggle('autoRefresh')} />
              <div className="mt-4 p-4 rounded-xl" style={{ background: '#18181B' }}>
                <div className="text-sm font-medium text-white mb-1">AI Model</div>
                <div className="text-xs text-muted mb-3">Select which Gemini model to use for analysis</div>
                <select className="input text-sm">
                  <option>Gemini 1.5 Pro (Recommended)</option>
                  <option>Gemini 1.5 Flash (Fast)</option>
                  <option>Gemini Ultra (Experimental)</option>
                </select>
              </div>
            </>
          )}

          {activeSection === 'appearance' && (
            <>
              <h3 className="font-semibold text-white">Appearance</h3>
              <ToggleRow label="Dark Mode" description="Always-on dark theme for better night readability" enabled={settings.darkMode} onToggle={() => toggle('darkMode')} />
              <ToggleRow label="Compact View" description="Reduce spacing for more information density" enabled={settings.compactView} onToggle={() => toggle('compactView')} />
              <ToggleRow label="High Contrast" description="Increase contrast for accessibility" enabled={settings.highContrast} onToggle={() => toggle('highContrast')} />
            </>
          )}

          {activeSection === 'data' && (
            <>
              <h3 className="font-semibold text-white">Data & Storage</h3>
              <div className="p-4 rounded-xl" style={{ background: '#18181B' }}>
                <div className="text-sm font-medium text-white mb-1">Data Retention</div>
                <div className="text-xs text-muted mb-3">How long to store your community data</div>
                <select className="input text-sm">
                  <option>30 days</option>
                  <option>90 days</option>
                  <option>1 year</option>
                  <option>Forever</option>
                </select>
              </div>
              <div className="p-4 rounded-xl space-y-2" style={{ background: '#18181B' }}>
                <div className="text-sm font-medium text-white">Storage Usage</div>
                <div className="flex justify-between text-xs text-muted mb-2">
                  <span>2.4 GB used</span>
                  <span>10 GB limit</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: '#3F3F46' }}>
                  <div className="h-full rounded-full w-1/4 bg-primary" />
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

