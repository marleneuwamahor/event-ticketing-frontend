import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, ArrowLeft, Loader2, RotateCw } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { AuthCard, AuthCardHeader } from '@/components/auth/AuthCard'
import { otpSchema } from '@/lib/validation'
import { toast } from 'sonner'

type OtpForm = z.infer<typeof otpSchema>

export default function VerifyOtp() {
  const { verifyOtp, resendOtp, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [formError, setFormError] = useState<string | null>(null)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [resendLoading, setResendLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' },
  })

  const onSubmit = async (data: OtpForm) => {
    setFormError(null)
    try {
      await verifyOtp(email, data.code)
      navigate('/events', { replace: true })
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Verification failed. Please try again.')
    }
  }

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (resendCountdown > 0 || resendLoading) return
    setResendLoading(true)
    setFormError(null)
    try {
      await resendOtp(email)
      setResendCountdown(30)
      toast.success('Code resent')
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Failed to resend code. Please try again.')
    } finally {
      setResendLoading(false)
    }
  }

  useEffect(() => {
    if (resendCountdown > 0 && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setResendCountdown((c) => (c <= 1 ? 0 : c - 1))
      }, 1000)
    }
    if (resendCountdown === 0 && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [resendCountdown])

  return (
    <div className="bg-gradient-page relative">
      <Link
        to="/login"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-slate-500 hover:text-brand-pink focus-ring"
      >
        <ArrowLeft className="w-4 h-4" /> Back to sign in
      </Link>
      <AuthCard padded={false} className="max-w-[448px] w-full mx-auto mt-10 md:mt-20 shadow-[var(--shadow-auth)]">
        <div className="p-6 md:p-8">
          <AuthCardHeader
            title="Verify"
            titleHighlight="email"
            subtitle={
              email
                ? `Enter the 6-digit code sent to ${email}.`
                : 'Enter the 6-digit code sent to your email.'
            }
          />

          {formError && (
            <div className="mb-6 rounded-xl bg-rose-50 p-3 border border-rose-100">
              <p className="text-sm text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {formError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink">Verification code</label>
              <input
                {...register('code')}
                type="text"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="123456"
                className={`w-full h-12 rounded-full px-5 text-ink text-center placeholder:text-slate-400 focus-ring transition-all duration-150 ${
                  errors.code || formError ? 'ring-2 ring-red-500' : ''
                } focus:bg-white focus:ring-2 focus:ring-brand-pink bg-input-bg`}
              />
              {errors.code && (
                <p className="text-[11px] text-red-500 font-medium">{errors.code.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={authLoading}
              disabled={authLoading}
              className="w-full shadow-[var(--shadow-brand)]"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mb-6">
            Didn't receive a code?{' '}
            {resendCountdown > 0 ? (
              <span className="text-brand-pink font-semibold cursor-not-allowed">
                Resend in {resendCountdown}s
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-brand-pink font-semibold hover:underline focus-ring disabled:opacity-50"
              >
                {resendLoading ? (
                  <RotateCw className="w-3 h-3 mr-1 inline animate-spin" />
                ) : (
                  'Resend code'
                )}
              </button>
            )}
          </p>

          <p className="mt-6 text-center text-sm text-slate-500">
            Remember your code?{' '}
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