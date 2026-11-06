import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import { Ticket, AlertCircle, RefreshCw, Loader2 } from 'lucide-react'
import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'
import { EVENTS, CATEGORIES, filterFutureEvents, type Event } from '@/data/events'
import { EventCard } from '@/components/events/EventCard'
import { EventCardSkeleton } from '@/components/events/EventCardSkeleton'
import { EventSearchBar } from '@/components/events/EventSearchBar'
import { EventFilters } from '@/components/events/EventFilters'

const PAGE_SIZE = 8

export default function Events() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [error, setError] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const query = (searchParams.get('q') || '').toLowerCase()
  const category = searchParams.get('category') || 'All'
  const dateFilter = searchParams.get('date') || 'Any date'
  const locationFilter = searchParams.get('location') || 'All Kigali'

  const filteredEvents = useMemo(() => {
    return filterFutureEvents(EVENTS).filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query) ||
        e.city.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query)
      const matchesCat = category === 'All' || e.category === category
      // Date/Location filters are URL-synced; apply category only here for demo,
      // keeping date/location as UI state (mock backend).
      return matchesSearch && matchesCat
    })
  }, [query, category])

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE))
  const displayedEvents = useMemo(() => {
    return filteredEvents.slice(0, page * PAGE_SIZE)
  }, [filteredEvents, page])

  useEffect(() => {
    setPage(1)
  }, [query, category, dateFilter, locationFilter])

  // Simulate initial load to demonstrate skeletons
  useEffect(() => {
    const id = setTimeout(() => setInitialLoading(false), 700)
    return () => clearTimeout(id)
  }, [])

  const loadMore = async () => {
    if (page >= totalPages || isLoadingMore) return
    setIsLoadingMore(true)
    await new Promise((r) => setTimeout(r, 500))
    setPage((p) => p + 1)
    setIsLoadingMore(false)
  }

  const hasMore = page < totalPages

  if (initialLoading) {
    return (
      <div className="bg-gradient-page relative min-h-[100vh]">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
          <div className="mx-auto max-w-7xl w-full px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-pink">
                <svg className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-ink">PassPulse</span>
                <span className="text-xs text-slate-500">Kigali</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="primary" size="sm" className="hidden md:block shadow-[var(--shadow-brand)]">
                <NavLink to="/tickets">My tickets</NavLink>
              </Button>
              <div className="relative inline-block">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-sm font-semibold text-ink hover:bg-slate-50 focus:ring transition-colors">
                  Attendee
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl w-full px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-page relative min-h-[100vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-brand-pink mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-ink mb-2">Something went wrong</h2>
          <p className="text-slate-500 mb-6">We couldn't load the events right now.</p>
          <Button
            variant="outline"
            onClick={() => {
              setError(false)
              window.location.reload()
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-page relative min-h-[100vh]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto max-w-7xl w-full px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-pink">
              <svg className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-ink">PassPulse</span>
              <span className="text-xs text-slate-500">Kigali</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="primary" size="sm" className="hidden md:block shadow-[var(--shadow-brand)]">
              <NavLink to="/tickets">My tickets</NavLink>
            </Button>
            <div className="relative inline-block">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-sm font-semibold text-ink hover:bg-slate-50 focus:ring transition-colors">
                Attendee
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl w-full px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-ink mb-2 md:text-6xl">
            All <GradientText>Events</GradientText>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl">
            Everything happening in Kigali, in one place.
          </p>
        </div>

        <EventSearchBar />
        <EventFilters />

        {displayedEvents.length === 0 ? (
          <div className="pt-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-pink/10 text-brand-pink mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">No events match your search</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters or keywords.</p>
            {(category !== 'All' || dateFilter !== 'Any date' || locationFilter !== 'All Kigali') && (
              <Button variant="outline" size="sm" onClick={() => {
                const params = new URLSearchParams(location.search)
                ;['category', 'date', 'location', 'q'].forEach((k) => params.delete(k))
                navigate(`?${params.toString()}`, { replace: true })
                setPage(1)
              }} className="text-brand-pink border-brand-pink hover:bg-brand-pink/5">
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-12 mb-16 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  isLoading={isLoadingMore}
                  disabled={isLoadingMore || !hasMore}
                  onClick={loadMore}
                  className="text-brand-pink border-brand-pink hover:bg-brand-pink/5 shadow-none hover:shadow-none"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading…
                    </>
                  ) : (
                    'Load more'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
