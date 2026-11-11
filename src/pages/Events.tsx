import { useState, useMemo } from 'react'
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw, Loader2, Ticket } from 'lucide-react'
import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'
import { EVENTS, filterFutureEvents } from '@/data/events'
import { EventCard } from '@/components/events/EventCard'
import { EventSearchBar } from '@/components/events/EventSearchBar'
import { EventFilters } from '@/components/events/EventFilters'
import { Logo } from '@/components/layout/Logo'
import { Header } from '@/components/layout/Header'

const PAGE_SIZE = 8

export default function Events() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [prevFilterKey, setPrevFilterKey] = useState('')
  const [error, setError] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const query = (searchParams.get('q') || '').toLowerCase()
  const dateFilter = searchParams.get('date') || 'Any date'
  const locationFilter = searchParams.get('location') || 'All Kigali'

  const filterKey = `${query}|${dateFilter}|${locationFilter}`
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey)
    setPage(1)
  }

  const filteredEvents = useMemo(() => {
    return filterFutureEvents(EVENTS).filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(query) ||
        e.venue.toLowerCase().includes(query) ||
        e.city.toLowerCase().includes(query) ||
        e.description.toLowerCase().includes(query)
      return matchesSearch
    })
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE))
  const displayedEvents = useMemo(() => {
    return filteredEvents.slice(0, page * PAGE_SIZE)
  }, [filteredEvents, page])

  const loadMore = async () => {
    if (page >= totalPages || isLoadingMore) return
    setIsLoadingMore(true)
    await new Promise((r) => setTimeout(r, 500))
    setPage((p) => p + 1)
    setIsLoadingMore(false)
  }

  const hasMore = page < totalPages

  if (error) {
    return (
      <div className="bg-gradient-page relative min-h-screen flex flex-col items-center justify-center">
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
    <div className="bg-gradient-page relative min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl w-full px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-ink mb-2 md:text-6xl">
            All <GradientText>Events</GradientText>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl">
            Everything happening in Kigali, in one place.
          </p>
        </div>

        <div className="mt-8 flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-8 ">
          <EventSearchBar />
          <EventFilters />
        </div>

        {displayedEvents.length === 0 ? (
          <div className="pt-20 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-pink/10 text-brand-pink mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-ink mb-2">No events match your search</h3>
            <p className="text-slate-500 mb-6">Try adjusting your filters or keywords.</p>
            {(dateFilter !== 'Any date' || locationFilter !== 'All Kigali') && (
              <Button variant="outline" size="sm" onClick={() => {
                const params = new URLSearchParams(location.search)
                ;['date', 'location', 'q'].forEach((k) => params.delete(k))
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
