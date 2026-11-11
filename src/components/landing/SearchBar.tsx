import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Search, Calendar, MapPin } from 'lucide-react'

export function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="relative -mt-8 md:-mt-12 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 rounded-3xl md:rounded-full bg-surface-dark border border-white/10 p-4 md:p-3 shadow-2xl">
          {/* Search field */}
          <div className="flex flex-1 gap-2 items-center md:ml-0 ml-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="search-events"
              className="bg-transparent outline-none text-base sm:text-md text-white placeholder-slate-400 w-full aria-label='Search events'"
              placeholder="Search events, artists or venues..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Dividers between sections */}
      
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          <div className="md:flex border-t border-white/10 h-px w-full md:w-px"></div>
          
          {/* Location block */}
          <button
            type="button"
            className="flex items-center gap-2 hover:bg-white/5 rounded-xl px-3 sm:px-4 py-2 focus:ring focus-ring whitespace-nowrap"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink" />
            <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">Kigali, Rwanda</span>
          </button>

          {/* Date block */}
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          <div className="md:flex border-t border-white/10 h-px w-full md:w-px"></div>
          <button
            type="button"
            className="flex items-center gap-2 hover:bg-white/5 rounded-xl px-3 sm:px-4 py-2 focus:ring focus-ring whitespace-nowrap"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-pink" />
            <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">Any date</span>
          </button>

          {/* Search button (far right) */}
          <Button variant="primary" size="sm" className="flex items-center shrink-0 whitespace-nowrap px-4 sm:px-6">
            <Search className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Search
          </Button>
        </div>
      </div>
    </div>
  )
}