import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  type?: 'email' | 'password' | 'text'
}

export function Input({
  label,
  error,
  type = 'text',
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className={['space-y-2', className].filter(Boolean).join(' ')}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-ink block"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={[
          'w-full h-12 rounded-full px-5 bg-input-bg text-ink placeholder:text-slate-500 focus-ring',
          'transition-all duration-150 ease-out',
          'focus:bg-white focus:ring-2 focus:ring-brand-pink',
          error ? 'ring-2 ring-red-500' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error && (
        <p className="text-[11px] text-red-500 font-medium">{error}</p>
      )}
    </div>
  )
}
