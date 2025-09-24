import { ReactNode } from 'react';
import { cn } from '../lib/cn';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta?: ReactNode;
  highlighted?: boolean;
}

export function PricingCard({ name, price, description, features, cta, highlighted }: PricingCardProps) {
  return (
    <div
      className={cn(
        'glass-panel flex flex-col gap-6 border border-white/15 p-8 transition-transform hover:-translate-y-1',
        highlighted && 'border-white/40 bg-white/15 shadow-2xl'
      )}
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-white">{name}</h3>
        <p className="text-sm text-white/70">{description}</p>
      </div>
      <div>
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="ml-1 text-sm text-white/60">/month</span>
      </div>
      <ul className="space-y-2 text-sm text-white/75">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {cta}
    </div>
  );
}
