interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <div className="glass-panel h-full border border-white/10 p-6">
      <p className="text-lg text-white/90">“{quote}”</p>
      <div className="mt-6">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="text-xs text-white/60">{role}</p>
      </div>
    </div>
  );
}
