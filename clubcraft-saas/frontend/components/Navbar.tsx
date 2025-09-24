import Link from 'next/link';
import { cn } from '../lib/cn';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-gradient">
          ClubCraft
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-white/70 sm:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-white/70 hover:text-white">
            Dashboard
          </Link>
          <Link
            href="#cta"
            className={cn(
              'inline-flex items-center rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 shadow-glass transition hover:bg-white'
            )}
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
