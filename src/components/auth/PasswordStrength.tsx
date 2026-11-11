

interface PasswordStrengthProps {
  password: string
}

const STRENGTH_COLORS = ['#EF4444', '#F59E0B', '#84CC16', '#22C55E']
const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong']

export function PasswordStrength({ password }: PasswordStrengthProps) {
  let score = 0
  if (password?.length >= 8) score++
  if (password && /[A-Za-z]/.test(password)) score++
  if (password && /[0-9]/.test(password)) score++
  if (password && /[^A-Za-z0-9]/.test(password)) score++

  return (
    <div className="mt-1">
      <div className="h-[4px] w-full rounded-full overflow-hidden border border-slate-200 flex">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-full rounded-full transition-colors duration-150"
            style={{ backgroundColor: i < score ? STRENGTH_COLORS[i] : 'bg-slate-200' }}
          />
        ))}
      </div>
      <p
        className="text-[10px] font-semibold mt-1"
        style={{
          color:
            !password || password.length === 0
              ? 'transparent'
              : score <= 1
                ? '#EF4444'
                : score <= 2
                  ? '#F59E0B'
                  : score <= 3
                    ? '#84CC16'
                    : '#22C55E',
        }}
      >
        {!password || password.length === 0 ? '' : STRENGTH_LABELS[Math.max(score - 1, 0)]}
      </p>
    </div>
  )
}
