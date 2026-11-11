import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { EVENTS } from '@/data/events'
import { formatPricePlain, formatDateGB } from '@/lib/format'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
  Ticket,
  Calendar,
  MapPin,
  ShieldCheck,
  Zap,
  Share2,
} from 'lucide-react'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const event = EVENTS.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="bg-gradient-page relative min-h-[100vh] flex items-center justify-center px-4">
        <div className="text-center rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md p-10 shadow-[var(--shadow-auth)] max-w-md w-full">
          <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-brand-pink/10 text-brand-pink flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-ink mb-2">Event not found</h1>
          <p className="text-slate-500 text-sm mb-6">
            This event may have ended or the link is incorrect.
          </p>
          <Button variant="outline" asChild>
            <NavLink to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to events
            </NavLink>
          </Button>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: event.title, url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast('Link copied to clipboard')
      }
    } catch {
      /* user cancelled share */
    }
  }

  return (
    <div className="bg-gradient-page relative min-h-[100vh] overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/events')}
            className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-pink transition-colors focus-ring rounded-lg px-2 py-1 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to events
          </button>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600 capitalize">
                  {user.role}
                </span>
                <Button asChild variant="primary" size="sm" className="shadow-[var(--shadow-brand)]">
                  <NavLink to="/tickets">My tickets</NavLink>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl w-full px-4 sm:px-6 py-8 md:py-12">
        {/* Hero image */}
        <div className="relative h-72 md:h-[420px] rounded-3xl overflow-hidden shadow-[var(--shadow-auth)]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <button
            onClick={handleShare}
            aria-label="Share event"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur text-slate-700 hover:text-brand-pink hover:bg-white flex items-center justify-center shadow-md transition-colors focus-ring"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-semibold text-brand-pink mb-4">
              <Calendar className="w-3.5 h-3.5" />
              {formatDateGB(event.date)}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: details */}
          <article className="lg:col-span-2 rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-pink/10 text-brand-pink flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-ink">{formatDateGB(event.date)}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-pink/10 text-brand-pink flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
                    Venue
                  </p>
                  <p className="text-sm font-semibold text-ink">{event.venue}</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-ink mb-3">About this event</h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              {event.description}
            </p>
          </article>

          {/* Right: booking card */}
          <aside className="lg:sticky lg:top-24 rounded-3xl border border-white/60 bg-white/90 backdrop-blur-md p-6 md:p-8 shadow-[var(--shadow-auth)]">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Ticket price
            </p>
            <p className="text-4xl font-extrabold text-ink tracking-tight mb-6">
              {formatPricePlain(event.price)}
              <span className="ml-1.5 text-base font-semibold text-slate-400">RWF</span>
            </p>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-[var(--shadow-brand)] hover:-translate-y-0.5 transition-transform"
              onClick={() => toast('Ticket purchase flow would start here')}
            >
              <Ticket className="w-4 h-4 mr-2" />
              Buy Ticket
            </Button>

            <ul className="mt-6 space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-brand-pink shrink-0" />
                Instant ticket delivery
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-brand-pink shrink-0" />
                Secure checkout
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </div>
  )
}