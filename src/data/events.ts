export type EventCategory =
  | 'Music'
  | 'Culture'
  | 'Food'
  | 'Art'
  | 'Sports'
  | 'Nightlife'
  | 'Business'

export interface Event {
  id: string
  title: string
  category: EventCategory
  date: string // ISO date string
  time: string
  venue: string
  city: string
  price: number
  image: string
  description: string
  available: number
}

export const EVENTS: Event[] = [
  {
    id: 'evt_1',
    title: 'Kigali Summer Concert',
    category: 'Music',
    date: '2026-11-14',
    time: '7:00 PM',
    venue: 'BK Arena, Remera',
    city: 'Kigali',
    price: 10000,
    image: 'https://images.unsplash.com/photo-1459749411477-6467e891e77e?q=80&w=1200&auto=format&fit=crop',
    description: 'An unforgettable night of live music featuring top Rwandan and regional artists.',
    available: 60,
  },
  {
    id: 'evt_2',
    title: 'Intore Dance Performance',
    category: 'Culture',
    date: '2026-11-20',
    time: '6:00 PM',
    venue: 'Kigali Cultural Village, Kicukiro',
    city: 'Kigali',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1533234638889-f53ab13625b6?q=80&w=1200&auto=format&fit=crop',
    description: 'Traditional Rwandan Intore dance and drumming celebration of culture and heritage.',
    available: 120,
  },
  {
    id: 'evt_3',
    title: 'Rwanda Food Festival',
    category: 'Food',
    date: '2026-11-28',
    time: '12:00 PM',
    venue: 'Amahoro Stadium Grounds, Remera',
    city: 'Kigali',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1543355517-2246352b9e3d?q=80&w=1200&auto=format&fit=crop',
    description: 'Taste the best of Rwandan and East African cuisine in one vibrant food festival.',
    available: 200,
  },
  {
    id: 'evt_4',
    title: 'Kigali Creative Week',
    category: 'Art',
    date: '2026-12-05',
    time: '10:00 AM',
    venue: 'Kigali Convention Centre, Kimihurura',
    city: 'Kigali',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1579783913442-b398e9a9f2a0?q=80&w=1200&auto=format&fit=crop',
    description: 'A showcase of contemporary Rwandan visual art and emerging creators.',
    available: 80,
  },
  {
    id: 'evt_5',
    title: 'Kigali Jazz Night',
    category: 'Music',
    date: '2026-11-10',
    time: '8:00 PM',
    venue: 'Kigali Convention Centre',
    city: 'Kigali',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1516422331826-1e28b27007df?q=80&w=1200&auto=format&fit=crop',
    description: 'An evening of smooth jazz featuring local and international artists.',
    available: 42,
  },
  {
    id: 'evt_6',
    title: 'Afrobeat Live',
    category: 'Nightlife',
    date: '2026-11-26',
    time: '9:00 PM',
    venue: 'Kigali Arena',
    city: 'Kigali',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1200&auto=format&fit=crop',
    description: 'High-energy Afrobeat performance with top regional acts.',
    available: 55,
  },
  {
    id: 'evt_7',
    title: 'Kigali City Marathon',
    category: 'Sports',
    date: '2026-12-12',
    time: '6:00 AM',
    venue: 'Kigali City Center',
    city: 'Kigali',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1526525100047-50616056092e?q=80&w=1200&auto=format&fit=crop',
    description: 'Annual city marathon through the hills of Kigali. Open to all fitness levels.',
    available: 500,
  },
  {
    id: 'evt_8',
    title: 'Rwanda Business Summit',
    category: 'Business',
    date: '2026-12-18',
    time: '9:00 AM',
    venue: 'Kigali Convention Centre',
    city: 'Kigali',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    description: 'Business leaders and entrepreneurs gather for the annual Rwanda Business Summit.',
    available: 150,
  },
]

export const CATEGORIES: EventCategory[] = [
  'Music',
  'Culture',
  'Food',
  'Art',
  'Sports',
  'Nightlife',
  'Business',
]

export const LOCATIONS = [
  'All Kigali',
  'Remera',
  'Kicukiro',
  'Kimihurura',
  'Nyarugenge',
  'Gasabo',
]

export const DATE_OPTIONS = [
  'Any date',
  'Today',
  'This weekend',
  'This week',
  'This month',
  'Pick a date range',
]

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Music: { bg: 'bg-[#FDE2F1]', text: 'text-brand-pink' },
  Culture: { bg: 'bg-[#E9D5FF]', text: 'text-[#7C4DDB]' },
  Food: { bg: 'bg-[#FFF7ED]', text: 'text-[#C2410C]' },
  Art: { bg: 'bg-[#E0E7FF]', text: 'text-[#4F46E5]' },
  Sports: { bg: 'bg-[#FEF3C7]', text: 'text-[#C2410C]' },
  Nightlife: { bg: 'bg-[#FCE7F3]', text: 'text-brand-pink' },
  Business: { bg: 'bg-[#E0E7FF]', text: 'text-[#4338ca]' },
}

export function categoryStyle(category: EventCategory) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['Music']
}

export function filterFutureEvents(events: Event[]): Event[] {
  const now = new Date()
  return events.filter((e) => new Date(e.date) >= now)
}
