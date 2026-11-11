import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'

export function EventSearchBar() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  const debouncedSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(location.search)
      if (value) {
        params.set('q', value)
      } else {
        params.delete('q')
      }
      navigate(`?${params.toString()}`, { replace: true })
    },
    [location.search, navigate]
  )

  useEffect(() => {
    const id = setTimeout(() => debouncedSearch(query), 300)
    return () => clearTimeout(id)
  }, [query, debouncedSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(location.search)
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    navigate(`?${params.toString()}`, { replace: true })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-7xl w-full"
    >
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events, artists, venues…"
          className="w-full h-14 pl-11 pr-14 rounded-full bg-ink border border-transparent text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none transition-all"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-14 rounded-full px-6 bg-brand-pink text-white font-semibold text-sm shadow-[var(--shadow-brand)] hover:bg-[#D63D78] transition-colors focus:ring-2 focus:ring-white focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  )
}
