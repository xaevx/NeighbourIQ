import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Users, BarChart3, FileText, CheckCircle2,
  Clock, AlertTriangle, Search, Filter, Download, Eye,
  Edit, Trash2, Plus, RefreshCw,
} from 'lucide-react';
import { adminWorkOrders } from '../data/mockData';
import { StatusBadge, PriorityBadge } from '../components/ui/Common';
import { CountUp } from '../components/ui/Common';

const adminStats = [
  { label: 'Open Work Orders', value: 47, color: '#F59E0B', icon: Clock },
  { label: 'Resolved Today', value: 12, color: '#10B981', icon: CheckCircle2 },
  { label: 'Active Departments', value: 8, color: '#2563EB', icon: Users },
  { label: 'Critical Alerts', value: 3, color: '#EF4444', icon: AlertTriangle },
];

export const AdminPortal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = adminWorkOrders.filter(order => {
    const matchSearch = order.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(37,99,235,0.3), transparent)' }} />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(37,99,235,0.2)' }}>
              <ShieldCheck size={22} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Portal</h2>
              <p className="text-sm text-muted">Municipal Command Center · City Administrator Access</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary text-sm">
              <Download size={14} /> Export Report
            </button>
            <button className="btn-primary text-sm">
              <Plus size={14} /> New Work Order
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl" style={{ background: `${stat.color}15` }}>
                  <Icon size={16} style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                <CountUp end={stat.value} duration={1.2} />
              </div>
              <div className="text-xs text-muted">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Work Orders Table */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Work Order Management</h3>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-9 text-sm"
                style={{ width: 200, padding: '8px 8px 8px 32px' }}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input text-sm"
              style={{ width: 140, padding: '8px 12px' }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button className="p-2 rounded-lg hover:bg-card transition-colors">
              <RefreshCw size={14} className="text-muted" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #3F3F46' }}>
                {['Work Order', 'Issue', 'Location', 'Department', 'Priority', 'Status', 'Created', 'ETA', 'Actions'].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold text-muted pr-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                  style={{ borderBottom: '1px solid #27272A' }}
                >
                  <td className="py-3.5 pr-4 text-sm font-semibold text-primary">{order.id}</td>
                  <td className="py-3.5 pr-4 text-sm text-white whitespace-nowrap">{order.issue}</td>
                  <td className="py-3.5 pr-4 text-xs text-muted">{order.location}</td>
                  <td className="py-3.5 pr-4 text-xs text-muted whitespace-nowrap">{order.dept}</td>
                  <td className="py-3.5 pr-4"><PriorityBadge priority={order.priority} /></td>
                  <td className="py-3.5 pr-4"><StatusBadge status={order.status} /></td>
                  <td className="py-3.5 pr-4 text-xs text-muted">{order.created}</td>
                  <td className="py-3.5 pr-4 text-xs text-muted">{order.eta}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-card transition-colors">
                        <Eye size={13} className="text-muted hover:text-white" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-card transition-colors">
                        <Edit size={13} className="text-muted hover:text-primary" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-card transition-colors">
                        <Trash2 size={13} className="text-muted hover:text-danger" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="py-12 text-center text-muted text-sm">
              No work orders match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* Department Performance */}
      <div className="card p-5">
        <h3 className="font-semibold text-white mb-4">Department Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { dept: 'Roads Dept', resolved: 89, pending: 11, color: '#F59E0B' },
            { dept: 'Electrical', resolved: 94, pending: 6, color: '#8B5CF6' },
            { dept: 'Sanitation', resolved: 78, pending: 22, color: '#10B981' },
            { dept: 'Water Utility', resolved: 96, pending: 4, color: '#0EA5E9' },
          ].map((dept) => (
            <div
              key={dept.dept}
              className="p-4 rounded-xl"
              style={{ background: '#18181B', border: '1px solid #3F3F46' }}
            >
              <div className="font-medium text-white text-sm mb-3">{dept.dept}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: dept.color }}>{dept.resolved}%</div>
              <div className="text-xs text-muted mb-3">Resolution rate</div>
              <div className="w-full h-1.5 rounded-full" style={{ background: '#3F3F46' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.resolved}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: dept.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

