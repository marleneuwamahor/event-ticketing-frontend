import { Button } from '@/components/ui/Button'
import { Search, Calendar, MapPin } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="relative -mt-8 bg-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-2 rounded-3xl md:rounded-full bg-surface-dark border border-white/10 p-3 md:p-2.5 shadow-2xl">
          {/* Search field */}
          <div className="flex flex-1 gap-2 items-center ml-5">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="search-events"
              className="bg-transparent outline-none text-md text-white placeholder-slate-400 w-full aria-label='Search events'"
              placeholder="Search events, artists or venues..."
            />
          </div>

          {/* Dividers between sections (hidden on mobile) */}
      
          <div className="md:block w-px h-10 bg-white/10"></div>
          <div className="md:hidden border-t border-white/10 h-px"></div>
          
          {/* Location block */}
          <button
            type="button"
            className="flex items-center gap-2 hover:bg-white/5 rounded-xl px-4 py-2 focus:ring focus-ring"
          >
            <MapPin className="w-5 h-5 text-brand-pink" />
            <span className="text-[15px] text-slate-400">Location:</span>
            <span className="text-sm font-semibold text-white">Kigali, Rwanda</span>
          </button>

          {/* Date block */}
          <div className="md:block w-px h-10 bg-white/10"></div>
          <div className="md:hidden border-t border-white/10 h-px"></div>
          <button
            type="button"
            className="flex items-center gap-2 hover:bg-white/5 rounded-xl px-4 py-2 focus:ring focus-ring"
          >
            <Calendar className="w-5 h-5 text-brand-pink" />
            <span className="text-[15px] text-slate-400">Date:</span>
            <span className="text-sm font-semibold text-white">Any date</span>
          </button>

          {/* Search button (far right) */}
          <Button variant="primary" size="lg" className="flex items-center shrink-0 whitespace-nowrap">
            <Search className="mr-2 w-4 h-4" /> Search Events
          </Button>
        </div>
      </div>
    </div>
  )
}