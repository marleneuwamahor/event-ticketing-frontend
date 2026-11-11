import * as React from 'react'

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function GradientText({
  children,
  className = '',
  ...props
}: GradientTextProps) {
  return (
    <span
      className={['text-gradient', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
