import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(startValue + (end - startValue) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

interface ConfidenceBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score, size = 'md' }) => {
  const color = score >= 85 ? '#10B981' : score >= 70 ? '#F59E0B' : '#EF4444';
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : size === 'lg' ? 'text-sm px-3 py-1' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${sizeClasses}`}
      style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
      {score}% confidence
    </span>
  );
};

interface PriorityBadgeProps {
  priority: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config: Record<string, { label: string; className: string }> = {
    critical: { label: 'Critical', className: 'badge badge-danger' },
    high: { label: 'High', className: 'badge badge-danger' },
    medium: { label: 'Medium', className: 'badge badge-warning' },
    low: { label: 'Low', className: 'badge badge-primary' },
    info: { label: 'Info', className: 'badge badge-success' },
  };
  const c = config[priority] || config.info;
  return <span className={c.className}>{c.label}</span>;
};

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'badge badge-warning' },
    assigned: { label: 'Assigned', className: 'badge badge-primary' },
    in_progress: { label: 'In Progress', className: 'badge badge-primary' },
    resolved: { label: 'Resolved', className: 'badge badge-success' },
    completed: { label: 'Completed', className: 'badge badge-success' },
    cancelled: { label: 'Cancelled', className: 'badge badge-danger' },
  };
  const c = config[status] || config.pending;
  return <span className={c.className}>{c.label}</span>;
};

interface AIThinkingProps {
  text?: string;
}

export const AIThinking: React.FC<AIThinkingProps> = ({ text = 'AI is analyzing...' }) => (
  <div className="flex items-center gap-3 text-muted">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
    <span className="text-sm">{text}</span>
  </div>
);

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', lines = 1 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className={`shimmer rounded-lg h-4 ${className}`} />
    ))}
  </div>
);

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  animate?: boolean;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  color = '#2563EB',
  showLabel = false,
  animate: shouldAnimate = true,
  height = 6,
}) => {
  const [width, setWidth] = useState(0);
  const percentage = (value / max) * 100;

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => setWidth(percentage), 200);
      return () => clearTimeout(timer);
    } else {
      setWidth(percentage);
    }
  }, [percentage, shouldAnimate]);

  return (
    <div className="relative w-full" style={{ height }}>
      <div className="absolute inset-0 rounded-full" style={{ background: `${color}20` }} />
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
      />
      {showLabel && (
        <span className="absolute right-0 -top-6 text-xs text-muted">{value}%</span>
      )}
    </div>
  );
};
