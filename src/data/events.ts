export interface Event {
  id: string
  title: string
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
    date: '2026-11-14',
    time: '7:00 PM',
    venue: 'BK Arena, Remera',
    city: 'Kigali',
    price: 10000,
    image: 'src/assets/10002.jpg',
    description: 'An unforgettable night of live music featuring top Rwandan and regional artists.',
    available: 60,
  },
  {
    id: 'evt_2',
    title: 'Intore Dance Performance',
    date: '2026-11-20',
    time: '6:00 PM',
    venue: 'Kigali Cultural Village, Kicukiro',
    city: 'Kigali',
    price: 5000,
    image: 'src/assets/10005.png',
    description: 'Traditional Rwandan Intore dance and drumming celebration of culture and heritage.',
    available: 120,
  },
  {
    id: 'evt_3',
    title: 'Rwanda Food Festival',
    date: '2026-11-28',
    time: '12:00 PM',
    venue: 'Amahoro Stadium Grounds, Remera',
    city: 'Kigali',
    price: 3000,
    image: 'src/assets/10003.jpg',
    description: 'Taste the best of Rwandan and East African cuisine in one vibrant food festival.',
    available: 200,
  },
  {
    id: 'evt_4',
    title: 'Kigali Creative Week',
    date: '2026-12-05',
    time: '10:00 AM',
    venue: 'Kigali Convention Centre, Kimihurura',
    city: 'Kigali',
    price: 7000,
    image: 'src/assets/10007.jpg',
    description: 'A showcase of contemporary Rwandan visual art and emerging creators.',
    available: 80,
  },
  {
    id: 'evt_5',
    title: 'Kigali Jazz Night',
    date: '2026-11-10',
    time: '8:00 PM',
    venue: 'Kigali Convention Centre',
    city: 'Kigali',
    price: 8000,
    image: 'src/assets/10009.jpg',
    description: 'An evening of smooth jazz featuring local and international artists.',
    available: 42,
  },
  {
    id: 'evt_6',
    title: 'Afrobeat Live',
    date: '2026-11-26',
    time: '9:00 PM',
    venue: 'Kigali Arena',
    city: 'Kigali',
    price: 12000,
    image: 'src/assets/10010.png',
    description: 'High-energy Afrobeat performance with top regional acts.',
    available: 55,
  },
  {
    id: 'evt_7',
    title: 'Kigali City Marathon',
    date: '2026-12-12',
    time: '6:00 AM',
    venue: 'Kigali City Center',
    city: 'Kigali',
    price: 15000,
    image: 'src/assets/10012.jpeg',
    description: 'Annual city marathon through the hills of Kigali. Open to all fitness levels.',
    available: 500,
  },
  {
    id: 'evt_8',
    title: 'Rwanda Business Summit',
    date: '2026-12-18',
    time: '9:00 AM',
    venue: 'Kigali Convention Centre',
    city: 'Kigali',
    price: 25000,
    image: 'src/assets/10011.jpg',
    description: 'Business leaders and entrepreneurs gather for the annual Rwanda Business Summit.',
    available: 150,
  },
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


export function filterFutureEvents(events: Event[]): Event[] {
  const now = new Date()
  return events.filter((e) => new Date(e.date) >= now)
}
