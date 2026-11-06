import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'
import { Users } from 'lucide-react'

export function OrganizerCta() {
  return (
    <section className="py-8 px-16 md:py-12 md:px-8 bg-white">
      <div className="rounded-3xl bg-gradient-organizerpage max-w-7xl mx-auto flex py-6 md:p-12 gap-6 md:gap-12 flex-col md:flex-row items-center justify-between">
        <div className="rounded-2xl w-full md:w-96 h-44 md:h-64 shrink-0 object-cover overflow-hidden">
            <img
            src="/src/assets/10008.jpeg"
            alt="Create and manage events"
            className="w-full h-full object-cover"
            />
        </div>

        <div className='space-y-4'>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-ink">
              <GradientText>Make your own event</GradientText>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-none">
              Bring your ideas to life. Create an event, reach your audience, and manage ticketing in one place.
            </p>
            <Button variant="primary" size="lg" className='flex items-center' onClick={() => window.location.href = '/signup?role=organizer'}>
              <Users className="mr-2 w-5 h-5" /> Start Organizing
            </Button>
        </div>
      </div>
    </section>
  )
}