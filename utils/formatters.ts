const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

export function toBanglaNum(num: number | string): string {
  const str = typeof num === 'number' ? String(num) : num
  return str.replace(/\d/g, (digit) => BANGLA_DIGITS[Number(digit)] ?? digit)
}

export function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(safeSeconds / 60)
  const secs = safeSeconds % 60
  const banglaMinutes = toBanglaNum(minutes)
  const banglaSeconds = toBanglaNum(secs)
  return `${banglaMinutes}:${banglaSeconds}`
}
