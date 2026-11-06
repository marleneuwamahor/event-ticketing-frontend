import { Hero } from '@/components/landing/Hero'
import { SearchBar } from '@/components/landing/SearchBar'
import { FeaturedEvents } from '@/components/landing/FeaturedEvents'
import { OrganizerCta } from '@/components/landing/OrganizerCta'
import { TrustedBy } from '@/components/landing/TrustedBy'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <div className="relative z-10 -mt-8 bg-transparent">
        <SearchBar />
      </div>
      <FeaturedEvents />
      <OrganizerCta />
      <TrustedBy />
    </div>
  )
}