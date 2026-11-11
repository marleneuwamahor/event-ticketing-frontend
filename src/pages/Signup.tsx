import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { AuthCard, AuthCardHeader, AuthCardFooter } from '@/components/auth/AuthCard'
import { PasswordInput } from '@/components/auth/PasswordInput'
import { PasswordStrength } from '@/components/auth/PasswordStrength'
import { signupSchema } from '@/lib/validation'
import { toast } from 'sonner'

type SignupForm = z.infer<typeof signupSchema>

export default function Signup() {
  const { signup, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupForm) => {
    setFormError(null)
    setIsLoading(true)
    try {
      const nameParts = data.fullName.split(' ')
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ') || undefined
      await signup(firstName, lastName, data.email, data.password)
      toast.success('Account created. Please check your email and verify your account.')
      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`, { replace: true })
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Signup failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-page relative">
      <AuthCard padded={false} className="max-w-md w-full mx-auto mt-6 md:mt-4 shadow-(--shadow-auth)]">
        <div className="p-6 md:p-8">
          <AuthCardHeader
            title="Join"
            titleHighlight="Us"
            subtitle="Create your KeVENTS Kigali account."
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
              <label className="text-sm font-semibold text-ink">Full name</label>
              <input
                {...register('fullName')}
                type="text"
                autoComplete="name"
                placeholder="Aline Uwase"
                className={`w-full h-12 rounded-full px-5 text-ink placeholder:text-slate-400 focus-ring transition-all duration-150 ${
                  errors.fullName ? 'ring-2 ring-red-500' : ''
                } focus:bg-white focus:ring-2 focus:ring-brand-pink bg-input-bg`}
              />
              {errors.fullName && (
                <p className="text-[11px] text-red-500 font-medium">{errors.fullName.message}</p>
              )}
            </div>

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

            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink">Password</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <PasswordInput
                      placeholder="At least 6 characters"
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                    <PasswordStrength password={field.value} />
                  </>
                )}
              />
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Controller
                name="terms"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="mt-1 rounded-full border-slate-300 text-brand-pink focus:ring-brand-pink focus:ring-2"
                  />
                )}
              />
              <div className="text-sm leading-6 text-slate-600">
                I agree to the{' '}
                <a href="#" className="text-brand-pink font-semibold hover:underline focus-ring">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-brand-pink font-semibold hover:underline focus-ring">
                  Privacy Policy
                </a>
              </div>
              {errors.terms && (
                <p className="text-[11px] text-red-500 font-medium ml-5 mt-0.5">
                  {errors.terms.message}
                </p>
              )}
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
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <AuthCardFooter
            text="Already have an account?"
            linkText="Log in"
            linkHref="/login"
          />
        </div>
      </AuthCard>

      <div className="mb-20" />
    </div>
  )
}
