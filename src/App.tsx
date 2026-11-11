import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Toaster } from 'sonner'
import 'sonner/dist/styles.css'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Landing from '@/pages/Landing'
import Discover from '@/pages/Discover'
import EventDetail from '@/pages/EventDetail'
import Events from '@/pages/Events'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import VerifyOtp from '@/pages/VerifyOtp'
import ResetPassword from '@/pages/auth/ResetPassword'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  return user ? children : <Navigate to="/login" replace={true} />
}

function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  if (isLoading) return children  // Show the page during loading instead of nothing
  return user ? <Navigate to="/events" replace={true} /> : children
}

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<DefaultLayout><Landing /></DefaultLayout>} />
          <Route path="/discover" element={<DefaultLayout><Discover /></DefaultLayout>} />
          <Route
            path="/login"
            element={<GuestOnly><DefaultLayout><Login /></DefaultLayout></GuestOnly>}
          />
          <Route
            path="/signup"
            element={<GuestOnly><DefaultLayout><Signup /></DefaultLayout></GuestOnly>}
          />
          <Route
            path="/forgot-password"
            element={<DefaultLayout><ForgotPassword /></DefaultLayout>}
          />
          <Route
            path="/verify-otp"
            element={<DefaultLayout><VerifyOtp /></DefaultLayout>}
          />
          <Route
            path="/reset-password"
            element={<DefaultLayout><ResetPassword /></DefaultLayout>}
          />
          <Route
            path="/events"
            element={
              <div className="min-h-[100vh] flex flex-col">
                <main className="flex-grow"><Events /></main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/events/:id"
            element={<RequireAuth><DefaultLayout><EventDetail /></DefaultLayout></RequireAuth>}
          />
          <Route
            path="/tickets"
            element={<RequireAuth><DefaultLayout><div className="p-8 text-center">My tickets coming soon</div></DefaultLayout></RequireAuth>}
          />
          <Route
            path="/organizers"
            element={<DefaultLayout><div className="p-8 text-center">For Organizers</div></DefaultLayout>}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
