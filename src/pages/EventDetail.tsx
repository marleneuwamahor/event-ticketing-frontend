import { useParams } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { EVENTS } from '@/data/events'
import { formatPricePlain, formatDateGB } from '@/lib/format'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Ticket, Calendar, MapPin } from 'lucide-react'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const event = EVENTS.find((e) => e.id === id)

  if (!event) {
    return (
      <div className="bg-gradient-page relative min-h-[100vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink mb-2">Event not found</h1>
          <Button variant="outline" asChild onClick={() => navigate('/events')}>
            <NavLink to="/events">Back to events</NavLink>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-page relative min-h-[100vh]">
      <nav className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-7xl w-full px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/events')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-pink focus-ring"
          >
            <ArrowLeft className="w-4 h-4" /> Back to events
          </button>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="primary" size="sm" className="shadow-[var(--shadow-brand)]">
                  <NavLink to="/tickets">My tickets</NavLink>
                </Button>
                <span className="text-sm text-slate-500">{user.role}</span>
              </>
            ) : null}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl w-full px-4 py-10">
        <article className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md overflow-hidden shadow-[var(--shadow-auth)]">
          <div className="relative h-64">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <span className="absolute left-4 top-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter bg-[#FDE2F1] text-brand-pink">
              {event.category}
            </span>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-tighter">
                {formatDateGB(event.date)}
              </span>
              <span className="text-lg font-bold text-ink">
                {formatPricePlain(event.price)} RWF
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink mb-4">{event.title}</h1>
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
              <MapPin className="w-4 h-4" />
              <span>{event.venue}</span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-8">
              {event.description}
            </p>
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-[var(--shadow-brand)]"
              onClick={() => toast('Ticket purchase flow would start here')}
            >
              <Ticket className="w-4 h-4 mr-2" />
              Buy Ticket
            </Button>
          </div>
        </article>
      </main>
    </div>
  )
}
