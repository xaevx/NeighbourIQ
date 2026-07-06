import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map, Layers, Search, ZoomIn, ZoomOut, Navigation, AlertTriangle,
  Maximize2, ChevronDown, Info, Car, Heart, Shield, Zap,
  Bus, Droplets, Trash2, Construction, Flame,
} from 'lucide-react';

import { mapLayers } from '../data/mockData';

const incidentMarkers = [
  { id: 1, x: 35, y: 28, type: 'accident', label: 'Traffic Accident', color: '#F59E0B', severity: 'high' },
  { id: 2, x: 60, y: 45, type: 'hospital', label: 'City General Hospital', color: '#EF4444', severity: 'info' },
  { id: 3, x: 25, y: 62, type: 'construction', label: 'Road Construction', color: '#D97706', severity: 'medium' },
  { id: 4, x: 72, y: 30, type: 'police', label: 'Police Station', color: '#2563EB', severity: 'info' },
  { id: 5, x: 48, y: 68, type: 'flood', label: 'Flood Risk Zone A', color: '#0EA5E9', severity: 'critical' },
  { id: 6, x: 18, y: 40, type: 'power', label: 'Power Outage Area', color: '#8B5CF6', severity: 'high' },
  { id: 7, x: 80, y: 55, type: 'report', label: 'Pothole Reported', color: '#EC4899', severity: 'medium' },
  { id: 8, x: 55, y: 20, type: 'bus', label: 'Bus Terminal', color: '#10B981', severity: 'info' },
  { id: 9, x: 42, y: 35, type: 'fire', label: 'Fire Station #3', color: '#F97316', severity: 'info' },
];

const layerIconMap: Record<string, React.FC<{ size?: number }>> = {
  traffic: Car,
  hospitals: Heart,
  police: Shield,
  fire: Flame,
  construction: Construction,
  flood: Droplets,
  power: Zap,
  transport: Bus,
  reports: AlertTriangle,
};

interface MapLayerToggleProps {
  layer: typeof mapLayers[0];
  onToggle: (id: string) => void;
}

const MapLayerToggle: React.FC<MapLayerToggleProps> = ({ layer, onToggle }) => {
  const Icon = layerIconMap[layer.id] || Layers;
  return (
    <button
      onClick={() => onToggle(layer.id)}
      className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl transition-all text-left"
      style={{
        background: layer.active ? `${layer.color}15` : 'transparent',
        border: `1px solid ${layer.active ? `${layer.color}40` : 'transparent'}`,
      }}
    >
      <Icon size={14} style={{ color: layer.active ? layer.color : '#71717A' }} />
      <span className="text-xs flex-1" style={{ color: layer.active ? 'white' : '#71717A' }}>
        {layer.label}
      </span>
      <div
        className="w-8 h-4 rounded-full transition-all relative flex-shrink-0"
        style={{ background: layer.active ? layer.color : '#3F3F46' }}
      >
        <motion.div
          animate={{ x: layer.active ? 16 : 2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-0.5 w-3 h-3 rounded-full bg-white"
        />
      </div>
    </button>
  );
};

export const CommunityMap: React.FC = () => {
  const [layers, setLayers] = useState(mapLayers);
  const [selectedMarker, setSelectedMarker] = useState<typeof incidentMarkers[0] | null>(null);
  const [mapStyle, setMapStyle] = useState<'dark' | 'satellite' | 'heatmap'>('dark');
  const [zoom, setZoom] = useState(14);

  const toggleLayer = (id: string) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const activeLayerCount = layers.filter(l => l.active).length;

  const visibleMarkers = incidentMarkers.filter(m => {
    const layerMap: Record<string, string> = {
      accident: 'traffic',
      hospital: 'hospitals',
      police: 'police',
      fire: 'fire',
      construction: 'construction',
      flood: 'flood',
      power: 'power',
      bus: 'transport',
      report: 'reports',
    };
    const layerId = layerMap[m.type];
    return layers.find(l => l.id === layerId)?.active ?? true;
  });

  return (
    <div className="flex gap-6 h-full" style={{ height: 'calc(100vh - 130px)' }}>
      {/* Left Panel: Controls */}
      <div className="w-72 flex flex-col gap-4 flex-shrink-0">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search location..."
            className="input pl-9"
          />
        </div>

        {/* Map Style */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Map Style</h3>
          <div className="grid grid-cols-3 gap-2">
            {['dark', 'satellite', 'heatmap'].map((style) => (
              <button
                key={style}
                onClick={() => setMapStyle(style as typeof mapStyle)}
                className="py-2 rounded-lg text-xs font-medium capitalize transition-all"
                style={{
                  background: mapStyle === style ? 'rgba(37,99,235,0.2)' : '#18181B',
                  color: mapStyle === style ? '#60A5FA' : '#71717A',
                  border: `1px solid ${mapStyle === style ? 'rgba(37,99,235,0.4)' : '#3F3F46'}`,
                }}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Layers */}
        <div className="card p-4 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Map Layers</h3>
            <span className="badge badge-primary">{activeLayerCount} active</span>
          </div>
          <div className="space-y-1">
            {layers.map((layer) => (
              <MapLayerToggle key={layer.id} layer={layer} onToggle={toggleLayer} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Incident Legend</h3>
          <div className="space-y-2">
            {[
              { label: 'Critical', color: '#EF4444' },
              { label: 'High Priority', color: '#F59E0B' },
              { label: 'Medium', color: '#D97706' },
              { label: 'Info', color: '#2563EB' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-xs text-muted">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative rounded-2xl overflow-hidden" style={{ background: '#18181B', border: '1px solid #3F3F46' }}>
        {/* Map Background SVG */}
        <div className="absolute inset-0">
          {/* Grid/City Map Simulation */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#09090B" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="#111113" />
            <rect width="100" height="100" fill="url(#cityGlow)" />

            {/* City grid streets */}
            {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(v => (
              <React.Fragment key={v}>
                <line x1={v} y1="0" x2={v} y2="100" stroke="#27272A" strokeWidth="0.3" />
                <line x1="0" y1={v} x2="100" y2={v} stroke="#27272A" strokeWidth="0.3" />
              </React.Fragment>
            ))}

            {/* Major roads */}
            <line x1="0" y1="40" x2="100" y2="40" stroke="#3F3F46" strokeWidth="0.8" />
            <line x1="0" y1="65" x2="100" y2="65" stroke="#3F3F46" strokeWidth="0.8" />
            <line x1="30" y1="0" x2="30" y2="100" stroke="#3F3F46" strokeWidth="0.8" />
            <line x1="65" y1="0" x2="65" y2="100" stroke="#3F3F46" strokeWidth="0.8" />

            {/* Highways */}
            <path d="M0,48 Q50,45 100,52" stroke="#52525B" strokeWidth="1.5" fill="none" />
            <path d="M20,0 Q45,50 35,100" stroke="#52525B" strokeWidth="1.5" fill="none" />

            {/* City blocks */}
            {[
              { x: 32, y: 15, w: 12, h: 8 },
              { x: 47, y: 18, w: 16, h: 12 },
              { x: 15, y: 25, w: 10, h: 10 },
              { x: 68, y: 20, w: 14, h: 10 },
              { x: 35, y: 45, w: 8, h: 12 },
              { x: 55, y: 50, w: 8, h: 8 },
              { x: 70, y: 45, w: 10, h: 15 },
              { x: 20, y: 70, w: 12, h: 10 },
              { x: 40, y: 72, w: 14, h: 10 },
              { x: 60, y: 72, w: 12, h: 8 },
            ].map((block, i) => (
              <rect
                key={i}
                x={block.x}
                y={block.y}
                width={block.w}
                height={block.h}
                fill="#1E1E22"
                rx="0.5"
              />
            ))}

            {/* Water body */}
            <path d="M75,60 Q85,62 90,70 Q82,75 78,70 Q72,65 75,60Z" fill="#0C2A4A" opacity="0.8" />

            {/* Park */}
            <ellipse cx="48" cy="55" rx="6" ry="4" fill="#0D2B1B" opacity="0.8" />
          </svg>

          {/* Animated scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Heatmap overlay when active */}
        {mapStyle === 'heatmap' && (
          <div className="absolute inset-0 pointer-events-none">
            {[
              { x: '35%', y: '30%', color: '#EF4444' },
              { x: '60%', y: '50%', color: '#F59E0B' },
              { x: '20%', y: '65%', color: '#EF4444' },
              { x: '75%', y: '35%', color: '#10B981' },
            ].map((spot, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-30"
                style={{
                  left: spot.x, top: spot.y,
                  width: 120, height: 120,
                  background: `radial-gradient(circle, ${spot.color}, transparent)`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        )}

        {/* Incident Markers */}
        {visibleMarkers.map((marker) => (
          <motion.button
            key={marker.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            onClick={() => setSelectedMarker(selectedMarker?.id === marker.id ? null : marker)}
            className="absolute"
            style={{
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              <div
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 relative"
                style={{
                  background: `${marker.color}30`,
                  borderColor: marker.color,
                  boxShadow: `0 0 12px ${marker.color}60`,
                }}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: marker.color }} />
              </div>
              {marker.severity === 'critical' && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: `${marker.color}30`, border: `1px solid ${marker.color}` }}
                />
              )}
            </div>
          </motion.button>
        ))}

        {/* Selected Marker Popup */}
        <AnimatePresence>
          {selectedMarker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute z-20 w-64 p-4 rounded-xl"
              style={{
                left: `${Math.min(Math.max(selectedMarker.x, 20), 70)}%`,
                top: `${Math.min(selectedMarker.y + 8, 70)}%`,
                background: '#27272A',
                border: `1px solid ${selectedMarker.color}40`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.6)`,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: selectedMarker.color }} />
                  <span className="text-sm font-semibold text-white">{selectedMarker.label}</span>
                </div>
                <button onClick={() => setSelectedMarker(null)} className="text-muted hover:text-white">
                  ×
                </button>
              </div>
              <div className="text-xs text-muted mb-3">
                Severity: <span className="capitalize font-medium" style={{ color: selectedMarker.color }}>
                  {selectedMarker.severity}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 btn-primary text-xs py-1.5">Navigate</button>
                <button className="flex-1 btn-secondary text-xs py-1.5">Details</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {[
            { icon: ZoomIn, action: () => setZoom(z => Math.min(z + 1, 20)) },
            { icon: ZoomOut, action: () => setZoom(z => Math.max(z - 1, 1)) },
            { icon: Navigation, action: () => {} },
            { icon: Maximize2, action: () => {} },
          ].map(({ icon: Icon, action }, i) => (
            <button
              key={i}
              onClick={action}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: '#27272A', border: '1px solid #3F3F46', color: '#A1A1AA' }}
            >
              <Icon size={15} />
            </button>
          ))}
        </div>

        {/* Bottom Stats Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: 'rgba(9,9,11,0.9)', backdropFilter: 'blur(16px)', border: '1px solid #3F3F46' }}>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>{visibleMarkers.length} incidents visible</span>
            <span className="w-px h-4 bg-border" />
            <span>Zoom: {zoom}x</span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Live updates on
            </span>
          </div>
          <div className="text-xs text-muted">NeighborIQ Map Engine v2.4</div>
        </div>
      </div>
    </div>
  );
};

