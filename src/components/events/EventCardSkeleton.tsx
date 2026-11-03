export function EventCardSkeleton() {
  return (
    <article className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-md overflow-hidden shadow-[var(--shadow-auth)] animate-pulse">
      <div className="h-48 bg-card-dark" />
      <div className="px-5 pt-4">
        <div className="h-3 bg-card-dark rounded w-1/3 mb-3" />
        <div className="h-4 bg-card-dark rounded w-3/4 mb-2" />
        <div className="flex items-center gap-2 h-5">
          <div className="h-4 bg-card-dark rounded w-1/3" />
          <div className="h-4 bg-card-dark rounded w-2/3" />
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="h-8 bg-card-dark rounded w-full mt-4" />
        <div className="h-8 bg-card-dark rounded w-1/2 mt-2" />
      </div>
    </article>
  )
}
