import { useState, useCallback } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Tag, Calendar, MapPin, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  CATEGORIES,
  DATE_OPTIONS,
  LOCATIONS,
} from '@/data/events'

interface FilterOption {
  label: string
  value: string
}

interface PillDropdownProps {
  label: string
  icon: React.ElementType
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
  paramKey: string
  searchParams: URLSearchParams
}

function PillDropdown({
  label,
  icon: Icon,
  value,
  options,
  onChange,
  paramKey,
  searchParams,
}: PillDropdownProps) {
  const [open, setOpen] = useState(false)
  const selectedLabel = options.find((o) => o.value === value)?.label || value
  const hasSelection = value !== 'All' && value !== 'Any date'

  return (
    <div className="relative inline-block w-full" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((p) => !p)}
        className={[
          'w-full flex items-center justify-between gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150',
          'border bg-white text-ink',
          hasSelection ? 'border-brand-pink text-brand-pink' : 'border-slate-200 text-slate-600 hover:border-slate-300',
          'focus-ring',
        ].join(' ')}
      >
        <div className="flex items-center gap-2 w-full">
          <Icon className="w-4 h-4 shrink-0" />
          <span className={hasSelection ? 'text-brand-pink' : 'text-slate-600'}>
            {hasSelection ? selectedLabel : label}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div
          className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg py-2"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((o) => {
            const active = o.value === value
            return (
              <button
                key={o.value}
                onClick={() => {
                  onChange(o.value)
                  setOpen(false)
                }}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-[#FDE2F1] text-brand-pink font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {o.label}
                {active && (
                  <svg className="ml-auto w-3 h-3 text-brand-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function EventFilters() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [date, setDate] = useState(searchParams.get('date') || 'Any date')
  const [loc, setLoc] = useState(searchParams.get('location') || 'All Kigali')

  const syncURL = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(location.search)
      if (value === 'All' || value === 'Any date' || value === 'All Kigali') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      navigate(`?${params.toString()}`, { replace: true })
    },
    [location.search, navigate]
  )

  const anyActive =
    category !== 'All' || date !== 'Any date' || loc !== 'All Kigali'

  const categoryOptions: FilterOption[] = CATEGORIES.map((c) => ({ label: c, value: c }))
  const dateOptions: FilterOption[] = DATE_OPTIONS.map((d) => ({ label: d, value: d }))
  const locationOptions: FilterOption[] = LOCATIONS.map((l) => ({ label: l, value: l }))

  const clearFilters = () => {
    const params = new URLSearchParams(location.search)
    ;['category', 'date', 'location'].forEach((k) => params.delete(k))
    navigate(`?${params.toString()}`, { replace: true })
    setCategory('All')
    setDate('Any date')
    setLoc('All Kigali')
  }

  return (
    <div className="max-w-7xl w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <PillDropdown
          label="Category"
          icon={Tag}
          value={category}
          options={[{ label: 'All', value: 'All' }, ...categoryOptions]}
          onChange={(v) => {
            setCategory(v)
            syncURL('category', v)
          }}
          paramKey="category"
          searchParams={searchParams}
        />
        <PillDropdown
          label="Date"
          icon={Calendar}
          value={date}
          options={[{ label: 'Any date', value: 'Any date' }, ...dateOptions]}
          onChange={(v) => {
            setDate(v)
            syncURL('date', v)
          }}
          paramKey="date"
          searchParams={searchParams}
        />
        <PillDropdown
          label="Location"
          icon={MapPin}
          value={loc}
          options={[{ label: 'All Kigali', value: 'All Kigali' }, ...locationOptions]}
          onChange={(v) => {
            setLoc(v)
            syncURL('location', v)
          }}
          paramKey="location"
          searchParams={searchParams}
        />
      </div>
      {anyActive && (
        <div className="max-w-7xl w-full mt-3">
          <Button variant="outline" size="sm" onClick={clearFilters} className="text-brand-pink border-brand-pink hover:bg-brand-pink/5">
            <X className="w-3 h-3 mr-1.5" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
