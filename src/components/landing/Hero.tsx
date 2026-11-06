import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { Search } from 'lucide-react'
export function Hero() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-heropage">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 items-center">
          <div> 
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink leading-tight mb-6">
              <GradientText>Find your</GradientText> next event
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl">
              Explore concerts, comedy, sports, and cultural events happening across Kigali. Buy tickets
              and discover experiences you'll never forget.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="primary" size="lg" className='flex items-center'>
                <Search className="mr-2 w-5 h-5"/> Search Events
              </Button>
              <Button variant="outline" size="lg">Browse All Events</Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <img
              src="/src/assets/10004.jpg"
              alt="Kigali events venue - concerts, comedy, sports, and cultural events"
              className="rounded-2xl overflow-hidden shadow-lg w-full h-64 md:h-100 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}