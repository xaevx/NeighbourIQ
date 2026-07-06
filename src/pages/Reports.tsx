import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Plus, Calendar, TrendingUp, Filter } from 'lucide-react';
import { StatusBadge } from '../components/ui/Common';

const reports = [
  { id: 'RPT-001', title: 'Monthly Community Health Report – June 2026', type: 'Health', generated: 'Jul 1, 2026', status: 'completed', pages: 24 },
  { id: 'RPT-002', title: 'Traffic Analysis & Congestion Forecast Q2 2026', type: 'Traffic', generated: 'Jun 30, 2026', status: 'completed', pages: 18 },
  { id: 'RPT-003', title: 'Environmental Impact Assessment – June 2026', type: 'Environment', generated: 'Jun 29, 2026', status: 'completed', pages: 31 },
  { id: 'RPT-004', title: 'Infrastructure Maintenance Priority Report', type: 'Infrastructure', generated: 'Jun 28, 2026', status: 'completed', pages: 15 },
  { id: 'RPT-005', title: 'Citizen Satisfaction Survey Analysis – Q2 2026', type: 'Engagement', generated: 'Jun 25, 2026', status: 'completed', pages: 12 },
  { id: 'RPT-006', title: 'Emergency Response Capability Assessment', type: 'Emergency', generated: 'Pending', status: 'in_progress', pages: 0 },
];

const typeColors: Record<string, string> = {
  Health: '#EF4444',
  Traffic: '#F59E0B',
  Environment: '#10B981',
  Infrastructure: '#8B5CF6',
  Engagement: '#EC4899',
  Emergency: '#F97316',
};

export const Reports: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-white">AI-Generated Reports</h2>
        <p className="text-sm text-muted">Comprehensive community intelligence reports powered by AI</p>
      </div>
      <button className="btn-primary">
        <Plus size={14} /> Generate Report
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4">
      {reports.map((report, i) => (
        <motion.div
          key={report.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="card p-5 flex items-center gap-4"
        >
          <div className="p-3 rounded-xl flex-shrink-0" style={{ background: `${typeColors[report.type] || '#2563EB'}15` }}>
            <FileText size={20} style={{ color: typeColors[report.type] || '#2563EB' }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold" style={{ color: typeColors[report.type] }}>{report.type}</span>
              <span className="text-xs text-muted">{report.id}</span>
            </div>
            <h3 className="font-medium text-white text-sm mb-1 truncate">{report.title}</h3>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="flex items-center gap-1"><Calendar size={10} />{report.generated}</span>
              {report.pages > 0 && <span>{report.pages} pages</span>}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <StatusBadge status={report.status} />
            {report.status === 'completed' && (
              <div className="flex gap-1">
                <button className="p-2 rounded-lg hover:bg-card transition-colors">
                  <Eye size={14} className="text-muted" />
                </button>
                <button className="p-2 rounded-lg hover:bg-card transition-colors">
                  <Download size={14} className="text-muted" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

