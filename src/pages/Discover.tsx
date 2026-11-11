import { Link } from 'react-router-dom'
import {
  Ticket,
  ArrowRight,
  Calendar,
  MapPin,
  Sparkles,
  Music,
  Briefcase,
  Palette,
  PartyPopper,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/layout/Logo'
import { EventCard } from '@/components/events/EventCard'
import { EVENTS } from '@/data/events'

const FEATURED_COUNT = 3

const CATEGORIES = [
  { label: 'Concerts', icon: Music },
  { label: 'Festivals', icon: PartyPopper },
  { label: 'Business', icon: Briefcase },
  { label: 'Culture', icon: Palette },
]

const PERKS = [
  {
    icon: Zap,
    title: 'Instant tickets',
    text: 'Book in seconds and get your ticket straight to your phone.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & trusted',
    text: 'Every event is verified, and every payment is protected.',
  },
  {
    icon: MapPin,
    title: 'All across Kigali',
    text: 'From Kimihurura to Nyamirambo, find what is happening near you.',
  },
]

export default function Discover() {
  const featuredEvents = EVENTS.slice(0, FEATURED_COUNT)

  return (
    <div className="bg-gradient-page relative min-h-[100vh] flex flex-col overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/60 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 focus-ring rounded-lg">
            <Logo size="md" variant="default" />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/events"
              className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-ink transition-colors px-3 py-2 focus-ring rounded-lg"
            >
              Events
            </Link>
            <Link
              to="/events"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-pink text-brand-pink text-sm font-semibold hover:bg-brand-pink hover:text-white transition-all duration-200 focus-ring"
            >
              <Ticket className="w-4 h-4" />
              <span>My tickets</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative px-4 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        {/* Decorative glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[720px] max-w-full rounded-full bg-brand-pink/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-40 -left-24 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-24 -right-24 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-brand-pink/20 text-brand-pink text-xs font-semibold mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Discover the best of Kigali
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-ink mb-6 md:text-7xl leading-[1.05]">
            Experience <GradientText>Kigali's Finest Events</GradientText>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            From concerts and festivals to business summits and cultural experiences —
            find and book the events that matter to you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              asChild
              className="shadow-[var(--shadow-brand)] hover:-translate-y-0.5 transition-transform"
            >
              <Link to="/events">
                Browse All Events <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-white/70 backdrop-blur">
              <Link to="/events">
                <Calendar className="mr-2 w-4 h-4" /> View Calendar
              </Link>
            </Button>
          </div>

          {/* Category chips */}
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 text-sm font-medium text-slate-700 shadow-sm hover:border-brand-pink hover:text-brand-pink hover:-translate-y-0.5 transition-all focus-ring"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Featured Events */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-brand-pink text-sm font-semibold uppercase tracking-wider mb-2">
                Don't miss out
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-ink mb-2 tracking-tight">
                Featured Events
              </h2>
              <p className="text-slate-500">This week in Kigali</p>
            </div>
            <Button
              variant="outline"
              asChild
              className="self-start sm:self-auto text-brand-pink border-brand-pink hover:bg-brand-pink/5 group"
            >
              <Link to="/events">
                See all
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredEvents.map((event) => (
              <div
                key={event.id}
                className="transition-transform duration-300 hover:-translate-y-1"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/80 backdrop-blur border border-white/70 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-pink/10 text-brand-pink flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-1">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-4 py-24 bg-surface-dark overflow-hidden mt-auto">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-72 w-[600px] max-w-full rounded-full bg-brand-pink/30 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Ready to explore?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
            Join thousands discovering amazing events across Kigali.
          </p>
          <Button
            variant="primary"
            size="lg"
            asChild
            className="shadow-[var(--shadow-brand)] hover:-translate-y-0.5 transition-transform"
          >
            <Link to="/events">
              Start browsing events <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}