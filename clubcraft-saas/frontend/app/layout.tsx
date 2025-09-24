import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'ClubCraft SaaS',
  description: 'Operate modern investment clubs with a glassmorphic control center.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {children}
        </div>
      </body>
    </html>
  );
}
