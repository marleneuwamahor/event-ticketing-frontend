import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Ticket } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/layout/Logo'

const NAV_LINKS = [
  { to: '/', label: 'Discover' },
  { to: '/events', label: 'Events' },
  { to: '/organizers', label: 'For Organizers' },
]

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isLoggedIn = !!user

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMobileOpen(false)
  }

  const navClass = (to: string) => {
    const isActive = location.pathname === to
    return `rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
      isActive ? 'bg-brand-pink/10 text-brand-pink' : 'text-slate-500 hover:bg-brand-pink/5'
    }`
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/60">
      <div className="mx-auto max-w-6xl w-full px-4">
        <div className="flex items-center justify-between h-16">
          <Logo size="md"/>

          <nav className="hidden md:flex items-center gap-1">
            <div className="flex items-center gap-0.5 rounded-full bg-brand-pink/5 px-0.5">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className={navClass(link.to)} onClick={() => navigate(link.to)}>{link.label}</Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <LoggedInMenu logout={handleLogout} />
            ) : (
              <LoggedOutMenu />
            )}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 focus-ring"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && <MobileDrawer isLoggedIn={isLoggedIn} onLogout={handleLogout} setMobileOpen={setMobileOpen} />}
    </header>
  )
}

function LoggedInMenu({ logout }: { logout: () => void }) {
  return (
    <>
      <Link
        to="/tickets"
        className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border border-brand-pink text-brand-pink text-sm font-semibold hover:bg-brand-pink/5 transition-colors focus-ring"
      >
        <Ticket className="w-4 h-4" />
        <span className="font-semibold">My tickets</span>
      </Link>
      <button
        onClick={logout}
        className="text-sm font-semibold text-slate-600 hover:text-brand-pink transition-colors focus-ring"
      >
        Log out
      </button>
    </>
  )
}

function LoggedOutMenu() {
  return (
    <>
      <Link
        to="/login"
        className="hidden sm:inline-block text-sm font-semibold text-ink hover:text-brand-pink transition-colors focus-ring"
      >
        Log in
      </Link>
      <Button variant="primary" size="sm" className="flex items-center" asChild>
        <a href="/signup">Sign up</a>
      </Button>
    </>
  )
}

function MobileDrawer({
  isLoggedIn,
  onLogout,
  setMobileOpen,
}: {
  isLoggedIn: boolean
  onLogout: () => void
  setMobileOpen: (open: boolean) => void
}) {
  return (
    <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md" onClick={() => setMobileOpen(false)}>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 focus-ring"
        >
          <X className="w-5 h-5 text-ink" />
        </button>
      </div>
      <div className="mt-16 px-6 space-y-6">
        <nav className="space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-slate-50 focus-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {isLoggedIn ? (
          <>
            <Link
              to="/tickets"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold text-ink hover:bg-slate-50 focus-ring"
            >
              My tickets
            </Link>
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-ink hover:bg-slate-50 focus-ring"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold text-ink hover:bg-slate-50 focus-ring"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left px-4 py-3 rounded-full text-sm font-semibold text-white bg-brand-pink-hot hover:bg-brand-pink focus:ring shadow-(--shadow-brand)]"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}




