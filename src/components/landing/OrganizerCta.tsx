import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'
import { Users } from 'lucide-react'

export function OrganizerCta() {
  return (
    <section className="py-8 px-4 sm:px-6 md:py-12 lg:px-8 bg-white">
      <div className="rounded-3xl bg-gradient-organizerpage max-w-7xl mx-auto flex flex-col md:flex-row py-6 md:p-8 gap-6 md:gap-12 items-center justify-between">
        <div className="rounded-2xl w-full md:w-96 h-44 md:h-64 shrink-0 object-cover overflow-hidden">
            <img
            src="/src/assets/10008.jpeg"
            alt="Create and manage events"
            className="w-full h-full object-cover"
            />
        </div>

        <div className='space-y-4 text-center md:text-left'>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-ink">
              <GradientText>Make your own event</GradientText>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-none mx-auto md:mx-0">
              Bring your ideas to life. Create an event, reach your audience, and manage ticketing in one place.
            </p>
            <Button variant="primary" size="lg" className='flex items-center justify-center md:justify-start mx-auto md:mx-0' onClick={() => window.location.href = '/signup?role=organizer'}>
              <Users className="mr-2 w-5 h-5" /> Start Organizing
            </Button>
        </div>
      </div>
    </section>
  )
}