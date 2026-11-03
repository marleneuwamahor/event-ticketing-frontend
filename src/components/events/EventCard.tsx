import { NavLink } from 'react-router-dom'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import { type Event } from '@/data/events'
import { formatDateGB, formatPricePlain } from '@/lib/format'
import { categoryStyle } from '@/data/events'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const { bg, text } = categoryStyle(event.category)
  const price = event.price === 0 ? 'Free' : `${formatPricePlain(event.price)} RWF`

  return (
    <NavLink
      to={`/events/${event.id}`}
      className="block"
    >
      <article
        className={[
          'rounded-3xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur-md shadow-sm',
          'transition-all duration-300 ease-out',
          'hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(232,76,136,0.45)]',
          'focus-ring focus:outline-none',
        ].join(' ')}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <span
            className={`absolute left-3 top-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tighter ${bg} ${text}`}
          >
            {event.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-white font-bold text-lg leading-tight truncate">{event.title}</h3>
          <div className="flex items-center gap-2 text-slate-400 text-sm mt-3">
            <Calendar className="w-3_5 h-3_5 shrink-0" />
            <span className="truncate">{formatDateGB(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
            <MapPin className="w-3_5 h-3_5 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center justify-between mt-5">
            <span className="text-white font-bold text-sm">{price}</span>
            <button
              className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-white text-[12px] font-semibold hover:bg-[#141926] transition-colors focus-ring"
              aria-label={`View ${event.title}`}
            >
              View Event
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </article>
    </NavLink>
  )
}
