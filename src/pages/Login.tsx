import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { AuthCard, AuthCardHeader, AuthCardFooter } from '@/components/auth/AuthCard'
import { PasswordInput } from '@/components/auth/PasswordInput'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8 characters'),
})
type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const { login, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/events'

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setFormError(null)
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      navigate(redirectTo, { replace: true })
    } catch {
      setFormError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-page relative">
      <AuthCard padded={false} className="max-w-[448px] w-full mx-auto mt-4 shadow-[var(--shadow-auth)]">
        <div className="p-8">
          <AuthCardHeader
            title="Welcome"
            titleHighlight="back"
            subtitle="Log in to see your tickets and events."
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

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label="Password"
                  error={errors.password?.message}
                  placeholder="Your password"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm text-brand-pink font-medium hover:underline focus-ring"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading || authLoading}
              disabled={isLoading || authLoading}
              className="w-full shadow-[var(--shadow-brand)]"
            >
              {isLoading || authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2" />
                  Signing in...
                </>
              ) : (
                'Log in'
              )}
            </Button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-slate-400">
              <span className="px-2 bg-white">or</span>
            </div>
            <Button
              variant="outline"
              size="md"
              className="w-full mt-4 border-brand-pink/30 hover:bg-brand-pink/5 text-brand-pink font-semibold"
              disabled
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Continue with Google
            </Button>
          </div>

          <AuthCardFooter
            text="New to PassPulse?"
            linkText="Sign up"
            linkHref="/signup"
          />
        </div>
      </AuthCard>

      <div className="mb-20" />
    </div>
  )
}
