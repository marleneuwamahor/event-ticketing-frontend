export function TrustedBy() {
  const partners = ['RwandAir', 'Visit Rwanda', 'BK Arena', 'MTN', 'Kigali Arena', 'Inzora']

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center mb-4">
          <span className="text-brand-pink text-xs font-semibold tracking-[0.12em] uppercase">TRUSTED BY</span>
        </div>
        <p className="text-slate-500 text-center mb-8 text-[15px]">
          Partnering with leading organizations across Rwanda
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-slate-400 font-bold text-[22px] tracking-tight hover:text-slate-600 transition-colors"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}