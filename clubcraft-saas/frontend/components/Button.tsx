import { ComponentProps } from 'react';
import { cn } from '../lib/cn';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        variant === 'primary'
          ? 'bg-white/90 text-slate-900 shadow-glass hover:bg-white'
          : 'border border-white/30 bg-white/10 text-white hover:bg-white/20',
        className
      )}
      {...props}
    />
  );
}
