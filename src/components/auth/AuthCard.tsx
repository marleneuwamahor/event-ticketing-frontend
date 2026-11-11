import * as React from 'react'

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  padded?: boolean
}

export function AuthCard({
  children,
  className = '',
  padded = true,
}: AuthCardProps) {
  return (
    <div
      className={[
        'rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md shadow-[var(--shadow-auth)]',
        padded ? 'p-8' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}

export interface AuthCardHeaderProps {
  title: string
  titleHighlight?: string
  subtitle: string
}

export function AuthCardHeader({ title, titleHighlight, subtitle }: AuthCardHeaderProps) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink mb-2">
        {title}{' '}
        {titleHighlight && (
          <span className="text-gradient">{titleHighlight}</span>
        )}
      </h1>
      <p className="text-sm text-slate-500 mb-6 md:mb-8">{subtitle}</p>
    </>
  )
}

export interface AuthCardFooterProps {
  text: string
  linkText: string
  linkHref: string
}

export function AuthCardFooter({ text, linkText, linkHref }: AuthCardFooterProps) {
  return (
    <p className="mt-8 text-center text-sm text-slate-500">
      {text}{' '}
      <a
        href={linkHref}
        className="font-semibold text-brand-pink hover:underline focus-ring"
      >
        {linkText}
      </a>
    </p>
  )
}
