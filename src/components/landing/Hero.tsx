import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { Search } from 'lucide-react'
export function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-heropage overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex flex-col gap-4"> 
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-ink leading-tight mb-4 md:mb-6">
              <GradientText>Find your</GradientText> next event
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-none md:max-w-xl">
              Explore concerts, comedy, sports, and cultural events happening across Kigali. Buy tickets
              and discover experiences you'll never forget.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 mb-0">
              <Button variant="primary" size="lg" className='flex items-center'>
                <Search className="mr-2 w-5 h-5"/> Search Events
              </Button>
              <Button variant="outline" size="lg">Browse All Events</Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center min-h-[260px] md:min-h-auto">
            <img
              src="/src/assets/10004.jpg"
              alt="Kigali events venue - concerts, comedy, sports, and cultural events"
              className="rounded-2xl overflow-hidden shadow-lg w-full h-[260px] md:h-[420px] object-cover max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}