import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { toast } from 'sonner'
import { Logo } from '@/components/layout/Logo'

const CURRENT_YEAR = new Date().getFullYear()

const SOCIALS = [
  { icon: FaFacebook, label: 'Facebook' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaXTwitter, label: 'Twitter' },
  { icon: FaYoutube, label: 'YouTube' },
]

const COLUMN_LINKS: Record<string, string[]> = {
  EXPLORE: ['Discover', 'Events', 'Venues'],
  ORGANIZERS: ['Create event', 'Pricing', 'Scanner app', 'Resources'],
  COMPANY: ['About us', 'Careers', 'Press', 'Contact'],
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribeError, setSubscribeError] = useState<string | null>(null)
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribeError(null)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeError('Please enter a valid email address.')
      return
    }
    setIsSubscribing(true)
    toast.success("You're subscribed!")
    setEmail('')
    setSubscribeError(null)
    setIsSubscribing(false)
  }

  return (
    <footer>
      <div className="bg-surface-dark w-full p-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr_1.3fr] gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <Logo size='lg' className=''/>
            </div>
            <p className="text-slate-400 text-sm leading-1.7 max-w-75 mb-8">
              The official hub for concerts, culture, food and unforgettable
              experiences across Rwanda.
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-full bg-card-dark border border-white/10 flex items-center justify-center text-slate-300 hover:border-brand-pink hover:text-brand-pink transition-all focus-ring"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {Object.entries(COLUMN_LINKS).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-[11px] font-bold text-white uppercase tracking-widest mb-8">
                  {title}
                </h3>
                <ul className="space-y-5">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        to={link.toLowerCase().replace(/\s+/g, '-')}
                        className="text-sm text-slate-400 hover:text-brand-pink transition-colors focus-ring"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-1">
            <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.1em] mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Get the week's best events in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full h-12 rounded-xl bg-card-dark border border-white/10 px-4 text-sm text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-brand-pink focus:border-transparent outline-none"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="h-12 rounded-xl bg-brand-pink text-white font-bold text-sm px-4 shadow-lg hover:bg-brand-pink-hot active:scale-95 focus:ring-2 focus:ring-white focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeError && (
              <p className="mt-3 text-[11px] text-red-400">{subscribeError}</p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-white/8 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-[13px] text-slate-500">
            © {CURRENT_YEAR} KeVENTS Kigali. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[13px]">
            <Link
              to="/privacy"
              className="text-slate-500 hover:text-white transition-colors focus-ring"
            >
              Privacy
            </Link>
            <span className="text-slate-600 mx-1.5">·</span>
            <Link
              to="/terms"
              className="text-slate-500 hover:text-white transition-colors focus-ring"
            >
              Terms
            </Link>
            <span className="text-slate-600 mx-1.5">·</span>
            <Link
              to="/cookies"
              className="text-slate-500 hover:text-white transition-colors focus-ring"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
