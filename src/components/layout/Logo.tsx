import logoImg from '@/assets/KeVENTS.png'

interface LogoProps {
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const iconSizes: Record<'xs'|'sm' | 'md' | 'lg', string> = {
  xs: 'h-7 w-auto',
  sm: 'h-8 w-auto',
  md: 'h-10 w-auto',
  lg: 'h-14 w-auto',
}

export function Logo({ className, size = 'xs'}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ''}`}>
      <img
        src={logoImg}
        alt="KeVENTS logo"
        className={`${iconSizes[size]} object-contain filter invert(1) hue-rotate(180deg)`}
      />
    </div>
  )
}
