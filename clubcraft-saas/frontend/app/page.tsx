import { Navbar } from '../components/Navbar';
import { PricingCard } from '../components/PricingCard';
import { TestimonialCard } from '../components/TestimonialCard';
import Link from 'next/link';

const features = [
  {
    title: 'Unified Club OS',
    description: 'Consolidate member records, votes, and communications with enterprise-grade security.'
  },
  {
    title: 'Real Estate Intelligence',
    description: 'Overlay market feeds from Polygon.io with your proprietary underwriting templates.'
  },
  {
    title: 'Automated Proposals',
    description: 'Launch investor-ready proposals with integrated Crunchbase and Ads campaign insights.'
  }
];

const pricing = [
  {
    name: 'Starter',
    price: '$149',
    description: 'Launch your first investment club with core workflows.',
    features: ['Up to 2 clubs', 'Member CRM', 'Financial reporting dashboards', 'Email support']
  },
  {
    name: 'Growth',
    price: '$349',
    description: 'Scale deal flow with automation and insights.',
    features: ['Unlimited clubs', 'Deal pipeline automation', 'Ad campaign snapshots', 'Priority support'],
    highlighted: true
  },
  {
    name: 'Pro',
    price: '$599',
    description: 'Enterprise governance for multi-asset teams.',
    features: ['Advanced RBAC', 'Custom data residency', 'Dedicated success manager', 'Premium integrations']
  }
];

const testimonials = [
  {
    quote: 'ClubCraft has replaced three tools and cut our reporting time in half.',
    name: 'Jordan Wells',
    role: 'Managing Partner, Summit Clubs'
  },
  {
    quote: 'Our investor proposals now include live market data and marketing signals in minutes.',
    name: 'Priya Shah',
    role: 'Founder, VentureHouse'
  },
  {
    quote: 'The glass dashboard makes it effortless to understand cash positions across properties.',
    name: 'Miles Carter',
    role: 'Treasurer, Skylight Collective'
  }
];

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(81,107,255,0.3),_transparent_55%)]" />
      <Navbar />
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-6 pb-24 pt-20 text-center">
        <div className="glass-panel max-w-3xl border border-white/10 px-10 py-12">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
            Operate smarter clubs
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-tight text-gradient">
            Orchestrate every investment club in one glass dashboard
          </h1>
          <p className="mt-6 text-lg text-white/75">
            ClubCraft combines governance, finance intelligence, and acquisition marketing into a single SaaS
            platform so your team can deploy capital with clarity.
          </p>
          <div id="cta" className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full bg-white/90 px-8 py-3 text-sm font-semibold text-slate-900 shadow-glass transition hover:bg-white"
            >
              Start Free Trial
            </Link>
            <Link href="#pricing" className="text-sm text-white/70 hover:text-white">
              View pricing
            </Link>
          </div>
        </div>
        <div id="features" className="grid w-full gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="glass-panel border border-white/10 p-6 text-left">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="bg-slate-950/40 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">Pricing</h2>
            <p className="mt-2 text-white/70">Choose a subscription that scales with your collective.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {pricing.map((tier) => (
              <PricingCard
                key={tier.name}
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                highlighted={tier.highlighted}
                cta={
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Choose {tier.name}
                  </Link>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">Loved by modern club operators</h2>
            <p className="mt-2 text-white/70">Thousands of members trust ClubCraft to handle governance, reporting, and growth.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
