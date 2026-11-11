import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

import { AuthCard, AuthCardHeader } from '@/components/auth/AuthCard'
import { resetPasswordSchema } from '@/lib/validation'
import { toast } from 'sonner'

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>

export default function ResetPassword() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (_data: ResetPasswordForm) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success('Password reset successfully')
    setIsLoading(false)
    navigate('/login')
  }

  return (
    <div className="bg-gradient-page relative">
      <Link to="/login" className="absolute top-6 left-6 flex items-center gap-2 text-sm text-slate-500 hover:text-brand-pink focus-ring">
        <ArrowLeft className="w-4 h-4" /> Back to sign in
      </Link>
      <AuthCard padded={false} className="max-w-[448px] w-full mx-auto mt-10 md:mt-20 shadow-[var(--shadow-auth)]">
        <div className="p-6 md:p-8">
          <AuthCardHeader
            title="Reset"
            titleHighlight="password"
            subtitle="Set a new password for your account."
          />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink">New password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className={`w-full h-12 rounded-full px-5 text-ink placeholder:text-slate-400 pr-12 focus-ring transition-all duration-150 ${
                    errors.password ? 'ring-2 ring-red-500' : ''
                  } focus:bg-white focus:ring-2 focus:ring-brand-pink bg-input-bg`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink transition-colors focus-ring"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 12l-3.59 3.59m0 0A9.953 9.953 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.025 10.025 0 014.132-5.411z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 12l-3.59 3.59m0 0A9.953 9.953 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.025 10.025 0 014.132-5.411z" /></svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink">Confirm password</label>
              <input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Confirm your password"
                className={`w-full h-12 rounded-full px-5 text-ink placeholder:text-slate-400 focus-ring transition-all duration-150 ${
                  errors.confirmPassword ? 'ring-2 ring-red-500' : ''
                } focus:bg-white focus:ring-2 focus:ring-brand-pink bg-input-bg`}
              />
              {errors.confirmPassword && (
                <p className="text-[11px] text-red-500 font-medium">{errors.confirmPassword.message}</p>
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
              {isLoading ? <Loader2 className="w-4 h-4 mr-2" /> : 'Reset password'}
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
