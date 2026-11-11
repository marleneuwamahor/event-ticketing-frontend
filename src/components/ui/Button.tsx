import * as React from 'react'

type Variant = 'primary' | 'dark' | 'outline'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-brand-pink text-white font-semibold rounded-full shadow-[var(--shadow-brand)] btn-transition hover:bg-[#D63D78] active:scale-95 disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none focus-ring',
  dark:
    'bg-ink text-white font-semibold text-[13px] rounded-full px-4 py-1.5 btn-transition hover:bg-[#141926] active:scale-95 focus-ring',
  outline:
    'bg-transparent text-brand-pink border border-brand-pink font-semibold rounded-full px-8 py-2.5 btn-transition hover:bg-brand-pink/5 active:scale-95 focus-ring',
}

const baseSizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-8 text-base',
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  asChild = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const classes = [
    variantStyles[variant],
    baseSizes[size],
    className,
  ].filter(Boolean).join(' ')

  const commonProps: Record<string, any> = {
    className: classes,
    disabled: disabled || isLoading,
    ...(isLoading ? { 'aria-busy': true } : {}),
  }

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement
    return React.cloneElement(child, {
      ...commonProps,
      ...props,
      className: [classes, (child.props as any).className, className]
        .filter(Boolean)
        .join(' '),
    } as any)
  }

  return (
    <button type="button" {...commonProps} {...props}>
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

