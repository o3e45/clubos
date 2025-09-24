import Link from 'next/link';
import { GlassCard } from '../../components/GlassCard';

const cards = [
  {
    title: 'Clubs Overview',
    description: 'Track capital calls, votes, and compliance tasks across all clubs.',
    link: '#',
    stats: ['Active clubs: 5', 'Pending votes: 3', 'NAV change: +4.2%']
  },
  {
    title: 'Real Estate Portfolio',
    description: 'Monitor occupancy, rent rolls, and renovation progress in real time.',
    link: '#',
    stats: ['Assets: 12', 'Occupancy: 96%', 'Pipeline deals: 4']
  },
  {
    title: 'Proposals & Campaigns',
    description: 'Launch investor proposals with integrated Google & Meta Ads intelligence.',
    link: '#',
    stats: ['Live proposals: 2', 'CTR (Ads): 3.8%', 'Crunchbase matches: 18']
  }
];

export default function DashboardPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-bold text-white">ClubCraft Control Center</h1>
          <p className="mt-2 text-sm text-white/70">
            A snapshot of your clubs, property portfolio, and acquisition funnels.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
        >
          Back to marketing site
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((card) => (
          <GlassCard key={card.title} title={card.title} description={card.description}>
            <ul className="space-y-2 text-sm text-white/70">
              {card.stats.map((stat) => (
                <li key={stat} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  <span>{stat}</span>
                </li>
              ))}
            </ul>
            <Link href={card.link} className="mt-6 inline-flex text-sm text-white/80 hover:text-white">
              View details →
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
