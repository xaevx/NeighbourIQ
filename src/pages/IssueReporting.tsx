import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle, Upload, MapPin, Camera, Mic, CheckCircle2,
  Clock, User, Brain, Zap, FileText, AlertTriangle, ArrowRight,
} from 'lucide-react';
import { recentIssues } from '../data/mockData';
import { StatusBadge, PriorityBadge, ConfidenceBadge, AIThinking } from '../components/ui/Common';

const issueTypes = [
  { id: 'pothole', label: 'Pothole', icon: '🕳️', dept: 'Roads Dept' },
  { id: 'streetlight', label: 'Streetlight', icon: '💡', dept: 'Electrical' },
  { id: 'garbage', label: 'Garbage', icon: '🗑️', dept: 'Sanitation' },
  { id: 'water', label: 'Water Leak', icon: '💧', dept: 'Water Utility' },
  { id: 'accident', label: 'Accident', icon: '🚗', dept: 'Traffic Police' },
  { id: 'parking', label: 'Illegal Parking', icon: '🚫', dept: 'Traffic Police' },
  { id: 'noise', label: 'Noise', icon: '🔊', dept: 'City Council' },
  { id: 'tree', label: 'Fallen Tree', icon: '🌳', dept: 'Parks Dept' },
  { id: 'road', label: 'Road Damage', icon: '🛣️', dept: 'Roads Dept' },
];

interface AIAnalysis {
  classification: string;
  severity: string;
  confidence: number;
  department: string;
  estimatedCost: string;
  priority: string;
  duplicateCheck: string;
  workOrderId: string;
}

const WorkflowStep: React.FC<{ step: number; label: string; status: 'done' | 'active' | 'pending' }> = ({
  step, label, status
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all`}
        style={{
          background: status === 'done' ? '#10B981' : status === 'active' ? '#2563EB' : '#3F3F46',
          color: 'white',
        }}
      >
        {status === 'done' ? <CheckCircle2 size={14} /> : step}
      </div>
      <span className={`text-sm ${status === 'pending' ? 'text-muted' : 'text-white'}`}>{label}</span>
    </div>
  );
};

export const IssueReporting: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [description, setDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleAnalyze = async () => {
    if (!selectedType || !description) return;
    setAnalyzing(true);
    setWorkflowStep(1);

    await new Promise(r => setTimeout(r, 800));
    setWorkflowStep(2);
    await new Promise(r => setTimeout(r, 600));
    setWorkflowStep(3);
    await new Promise(r => setTimeout(r, 700));
    setWorkflowStep(4);
    await new Promise(r => setTimeout(r, 500));

    const type = issueTypes.find(t => t.id === selectedType);
    setAiAnalysis({
      classification: type?.label || selectedType,
      severity: 'Medium',
      confidence: 94,
      department: type?.dept || 'City Council',
      estimatedCost: '$2,400 – $3,800',
      priority: 'medium',
      duplicateCheck: 'No duplicates found in 500m radius',
      workOrderId: `INC-${Math.floor(2800 + Math.random() * 100)}`,
    });

    setAnalyzing(false);
    setWorkflowStep(5);
  };

  const handleSubmit = async () => {
    setWorkflowStep(6);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setWorkflowStep(7);
  };

  const handleReset = () => {
    setSelectedType('');
    setDescription('');
    setAiAnalysis(null);
    setSubmitted(false);
    setWorkflowStep(0);
    setUploadedFiles([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Report Form */}
      <div className="lg:col-span-2 space-y-5">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Issue Type Selection */}
              <div className="card p-5">
                <h3 className="font-semibold text-white mb-4">What issue are you reporting?</h3>
                <div className="grid grid-cols-3 gap-2">
                  {issueTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                      style={{
                        background: selectedType === type.id ? 'rgba(37,99,235,0.15)' : '#18181B',
                        border: `1px solid ${selectedType === type.id ? 'rgba(37,99,235,0.4)' : '#3F3F46'}`,
                        color: selectedType === type.id ? '#60A5FA' : '#A1A1AA',
                      }}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="card p-5">
                <h3 className="font-semibold text-white mb-3">Describe the issue</h3>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you see, when it started, and any relevant details..."
                  className="input resize-none text-sm"
                  rows={4}
                />

                {/* Location */}
                <div className="mt-3 relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    placeholder="Location (auto-detected or enter manually)"
                    className="input pl-9"
                    defaultValue="42 Oak Street, Near Public Library"
                  />
                </div>
              </div>

              {/* File Upload */}
              <div className="card p-5">
                <h3 className="font-semibold text-white mb-3">Add Evidence (optional)</h3>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${dragOver ? 'border-primary bg-primary/5' : 'border-border'}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const files = Array.from(e.dataTransfer.files).map(f => f.name);
                    setUploadedFiles(prev => [...prev, ...files]);
                  }}
                >
                  <div className="flex justify-center gap-4 mb-3">
                    <Camera size={24} className="text-muted" />
                    <Upload size={24} className="text-muted" />
                    <Mic size={24} className="text-muted" />
                  </div>
                  <p className="text-sm text-muted">Drop images, videos, or voice notes here</p>
                  <p className="text-xs text-muted mt-1">or</p>
                  <button className="mt-2 text-xs font-medium text-primary hover:text-primary-light">
                    Browse files
                  </button>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {uploadedFiles.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-secondary">
                          <CheckCircle2 size={12} />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted mt-2">
                  <Brain size={10} className="inline mr-1" />
                  AI will analyze images to classify severity and estimate repair cost
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={!selectedType || !description || analyzing}
                  className="btn-primary flex-1 justify-center disabled:opacity-50"
                >
                  {analyzing ? (
                    <><Brain size={16} className="animate-pulse" /> Analyzing...</>
                  ) : (
                    <><Brain size={16} /> Analyze with AI</>
                  )}
                </button>
              </div>

              {/* AI Analysis Result */}
              <AnimatePresence>
                {analyzing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="card p-5"
                  >
                    <AIThinking text="Classifying issue, checking duplicates, estimating severity..." />
                  </motion.div>
                )}

                {aiAnalysis && !analyzing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-5"
                    style={{ border: '1px solid rgba(16,185,129,0.3)' }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 size={16} className="text-secondary" />
                      <span className="font-semibold text-white">AI Analysis Complete</span>
                      <ConfidenceBadge score={aiAnalysis.confidence} size="sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: 'Classification', value: aiAnalysis.classification, color: '#60A5FA' },
                        { label: 'Severity', value: aiAnalysis.severity, color: '#F59E0B' },
                        { label: 'Assigned To', value: aiAnalysis.department, color: '#34D399' },
                        { label: 'Est. Repair Cost', value: aiAnalysis.estimatedCost, color: '#A78BFA' },
                        { label: 'Duplicate Check', value: aiAnalysis.duplicateCheck, color: '#6EE7B7' },
                        { label: 'Work Order ID', value: aiAnalysis.workOrderId, color: '#93C5FD' },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-xl" style={{ background: '#18181B' }}>
                          <div className="text-xs text-muted mb-1">{item.label}</div>
                          <div className="text-sm font-medium" style={{ color: item.color }}>{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="btn-primary w-full justify-center"
                    >
                      <Zap size={16} /> Submit & Create Work Order
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 text-center"
              style={{ border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Issue Reported Successfully!</h3>
              <p className="text-muted mb-2">Work Order ID: <span className="text-white font-semibold">{aiAnalysis?.workOrderId}</span></p>
              <p className="text-sm text-muted mb-6">
                The Roads Department has been notified. You'll receive SMS and email updates on progress.
              </p>
              <button onClick={handleReset} className="btn-secondary">
                Report Another Issue
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Panel */}
      <div className="space-y-5">
        {/* Workflow Automation */}
        <div className="card p-5">
          <h3 className="font-semibold text-white mb-4">AI Workflow Automation</h3>
          <div className="space-y-3">
            {[
              { step: 1, label: 'Citizen submits report' },
              { step: 2, label: 'AI classifies issue' },
              { step: 3, label: 'Duplicate detection' },
              { step: 4, label: 'Severity estimation' },
              { step: 5, label: 'Department assigned' },
              { step: 6, label: 'Work order created' },
              { step: 7, label: 'Citizen notified ✓' },
            ].map(({ step, label }) => (
              <WorkflowStep
                key={step}
                step={step}
                label={label}
                status={workflowStep >= step ? (workflowStep === step ? 'active' : 'done') : 'pending'}
              />
            ))}
          </div>
        </div>

        {/* Recent Issues */}
        <div className="card p-5">
          <h3 className="font-semibold text-white mb-4">Recent Community Reports</h3>
          <div className="space-y-3">
            {recentIssues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-xl space-y-2"
                style={{ background: '#18181B', border: '1px solid #3F3F46' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted">{issue.id}</span>
                  <StatusBadge status={issue.status} />
                </div>
                <div className="text-sm font-medium text-white">{issue.type}</div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <MapPin size={10} />
                  {issue.location}
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{issue.reportedAt}</span>
                  <ConfidenceBadge score={issue.confidence} size="sm" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

