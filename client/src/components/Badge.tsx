import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  const styles = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    info: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    success: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    warning: 'bg-amber-950 text-amber-300 border-amber-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};
