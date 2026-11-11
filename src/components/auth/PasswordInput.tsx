import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label?: string
  error?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function PasswordInput({
  label,
  error,
  value,
  onChange,
  placeholder,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-ink block">{label}</label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="new-password"
          className={`w-full h-12 rounded-full px-5 text-ink placeholder:text-slate-400 pr-12 focus-ring transition-all duration-150 ${
            error ? 'ring-2 ring-red-500' : ''
          } focus:bg-white focus:ring-2 focus:ring-brand-pink bg-input-bg`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink transition-colors focus-ring"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-[11px] text-red-500 font-medium">{error}</p>
      )}
    </div>
  )
}
