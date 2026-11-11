import { RefreshCcw, Sparkles } from 'lucide-react'
import { EventCard } from '@/components/events/EventCard'
import { type Event } from '@/data/events'
import { EVENTS } from '@/data/events'
import { Button } from '@/components/ui/Button'


export function FeaturedEvents() {
  const events: Event[] = EVENTS.slice(0, 4)

  return (
    <section className="py-24 md:py-32 bg-surface-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="space-y-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Sparkles className="w-5 h-5 text-brand-pink mb-4" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                AI Assistant
              </h2>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
              Tell me what you're looking for and I'll find the best events for you.
            </p>
            <div className="relative w-full max-w-md mx-auto">
              <Sparkles
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              />
              <input
                type="text"
                className="w-full h-12 pl-12 pr-4 rounded-full bg-card-dark border border-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-colors"
                placeholder="What kind of event are you looking for?"
                aria-label="Describe the event you're looking for"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-10">
              Featured Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event) => (
                <EventCard event={event} key={event.id} />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
               Nothing fits your vibe?
            </p>
            <p className="text-slate-600 text-lg mb-6">
              We're constantly adding new events. Check back soon or explore other categories.
            </p>
            <Button variant="outline" size="lg" className='flex items-center mx-auto' onClick={() => window.location.href = '/events'}>
              <RefreshCcw className="mr-2 w-4 h-4" /> Browse All Events
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}
