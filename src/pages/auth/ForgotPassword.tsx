import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

import { AuthCard, AuthCardHeader } from '@/components/auth/AuthCard'
import { forgotPasswordSchema } from '@/lib/validation'

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordForm) => {
    setEmail(data.email)
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setIsLoading(false)
  }

  if (sent) {
    return (
      <div className="bg-gradient-page relative">
        <Link to="/login" className="absolute top-6 left-6 flex items-center gap-2 text-sm text-slate-500 hover:text-brand-pink focus-ring">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <AuthCard padded={false} className="max-w-[448px] w-full mx-auto mt-10 md:mt-20 shadow-[var(--shadow-auth)]">
          <div className="p-6 md:p-8 text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-pink/10 text-brand-pink mx-auto mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink mb-2">Check your inbox</h1>
            <p className="text-sm text-slate-500 mb-8">
              We sent a 6-digit reset code to <span className="font-semibold text-ink">{email}</span>. Enter it below to set a new password.
            </p>
            <Button variant="primary" size="lg" className="w-full" onClick={() => navigate('/verify-otp')} disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 mr-2" /> : 'Continue to verification'}
            </Button>
            <p className="mt-6 text-sm text-slate-500">
              Remember your password?{' '}
              <Link to="/login" className="font-semibold text-brand-pink hover:underline focus-ring">
                Sign in
              </Link>
            </p>
          </div>
        </AuthCard>
        <div className="mb-20" />
      </div>
    )
  }

  return (
    <div className="bg-gradient-page relative">
      <AuthCard padded={false} className="max-w-[448px] w-full mx-auto mt-10 md:mt-20 shadow-[var(--shadow-auth)]">
        <div className="p-6 md:p-8">
          <AuthCardHeader
            title="Forgot"
            titleHighlight="password"
            subtitle="Enter your email and we'll send a reset code to your inbox."
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-ink">Email</label>
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`w-full h-12 rounded-full px-5 text-ink placeholder:text-slate-400 focus-ring transition-all duration-150 ${
                  errors.email ? 'ring-2 ring-red-500' : ''
                } focus:bg-white focus:ring-2 focus:ring-brand-pink bg-input-bg`}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
              className="w-full shadow-[var(--shadow-brand)]"
            >
              {isLoading ? <Loader2 className="w-4 h-4 mr-2" /> : 'Send reset code'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Remember your password?{' '}
            <Link to="/login" className="font-semibold text-brand-pink hover:underline focus-ring">
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>

      <div className="mb-20" />
    </div>
  )
}
