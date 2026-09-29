import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string | React.ReactNode;
  icon: LucideIcon;
  tone?: 'forest' | 'harvest' | 'sprout' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  sub,
  icon: Icon,
  tone = 'forest'
}) => {
  const iconTones = {
    forest: 'bg-forest-100 text-forest-700',
    harvest: 'bg-harvest-100 text-harvest-700',
    sprout: 'bg-sprout-100 text-sprout-700',
    neutral: 'bg-forest-50 text-forest-600',
  }[tone];

  return (
    <div className="card p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink/50 truncate pr-2">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconTones}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-display font-extrabold text-forest-900 num">
          {value}
        </p>
        {sub && (
          <p className="text-xs text-ink/50 mt-1 truncate">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
};
