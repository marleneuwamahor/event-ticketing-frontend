export function formatPriceRWF(amount: number): string {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPricePlain(amount: number): string {
  return new Intl.NumberFormat('en-RW').format(amount)
}

export function formatDateGB(dateString: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function isPastEvent(dateString: string): boolean {
  return new Date(dateString) < new Date()
}
