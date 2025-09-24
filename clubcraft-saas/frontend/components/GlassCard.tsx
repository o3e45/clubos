import { ReactNode } from 'react';
import { cn } from '../lib/cn';

interface GlassCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function GlassCard({ title, description, children, className }: GlassCardProps) {
  return (
    <div className={cn('glass-panel border border-white/10 p-6 backdrop-blur-lg', className)}>
      {(title || description) && (
        <div className="mb-4 space-y-1">
          {title ? <h3 className="text-lg font-semibold text-white/90">{title}</h3> : null}
          {description ? <p className="text-sm text-white/60">{description}</p> : null}
        </div>
      )}
      {children}
    </div>
  );
}
