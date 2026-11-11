import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  padded?: boolean
}

export function Card({
  children,
  className = '',
  padded = true,
}: CardProps) {
  return (
    <div
      className={[
        'rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md',
        padded ? 'p-6' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
