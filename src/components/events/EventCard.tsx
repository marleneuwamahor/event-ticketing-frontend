import { NavLink } from 'react-router-dom'
import { Calendar, MapPin, Heart } from 'lucide-react'
import { type Event } from '@/data/events'
import { formatDateGB, formatPricePlain } from '@/lib/format'
import { Button } from '@/components/ui/Button'

interface EventCardProps {
  event: Event
  isLiked?: boolean
  onLikeToggle?: (eventId: string) => void
  onViewToggle?: (eventId: string) => void
  onBuyToggle?: (eventId: string) => void
}

export function EventCard({ event, isLiked = false, onLikeToggle, onViewToggle, onBuyToggle }: EventCardProps) {
  const price = event.price === 0 ? 'Free' : `${formatPricePlain(event.price)} RWF`
  const isSoldOut = event.available <= 0

  // Default no-op handlers if not provided
  const handleViewToggle = onViewToggle || (() => {})
  const handleBuyToggle = onBuyToggle || (() => {})

  return (
    <NavLink
      to={`/events/${event.id}`}
      className="block"
    >
      <article
        className={[
          'group rounded-3xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur-md shadow-sm',
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
          {isSoldOut && (
            <div
              className="absolute top-3 left-3 bg-brand-pink/90 text-white text-xs font-semibold rounded px-2 py-0.5"
            >
              Sold out
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-ink font-bold text-lg leading-tight truncate mb-3">
            {event.title}
          </h3>

          <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{formatDateGB(event.date)}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>

          {/* Price & Status row */}
          <div className="flex items-center gap-2 justify-between pt-4 border-t border-white/10">
            <span className={[
              'text-ink',
              'font-bold',
              'text-sm',
              isSoldOut ? 'text-brand-pink/80 line-through' : 'text-ink',
            ].join(' ')}>
              {price}
            </span>

            {/* Like button */}
            {onLikeToggle && (
              <Button
                variant="outline"
                size="sm"
                className={[
                  'text-brand-pink border-brand-pink',
                  'hover:bg-brand-pink/5',
                  'shadow-none',
                  'hover:shadow-none',
                  isLiked ? 'text-brand-pink/80' : '',
                ].join(' ')}
                onClick={() => onLikeToggle(event.id)}
                aria-label={`Like ${event.title}`}
              >
                <Heart className={['w-3 h-3', isLiked ? 'text-brand-pink' : 'text-slate-400'].join(' ')} />
                {isLiked ? 'Liked' : 'Like'}
              </Button>
            )}
            {/* View button - always visible */}
            <Button
              variant="outline"
              size="sm"
              className={['text-brand-pink', 'hover:bg-brand-pink/5', 'shadow-none', 'hover:shadow-none', 'flex-1'].join(' ')}
              onClick={() => handleViewToggle(event.id)}
              aria-label={`View ${event.title}`}
            >
              View
            </Button>

            {/* Buy Ticket button - always visible, disabled when sold out */ }
            <Button
              variant="primary"
              size="sm"
              className={['bg-brand-pink', 'text-white', 'hover:bg-brand-pink/90', 'flex-1'].join(' ')}
              onClick={() => handleBuyToggle(event.id)}
              aria-label={`Buy ticket for ${event.title}`}
              disabled={isSoldOut}
            >
              Buy Ticket
            </Button>
          </div>
        </div>
      </article>
    </NavLink>
  )
}
