'use client'

import { useEffect } from 'react'
import { Toaster, toast } from 'sonner'

type ToastProviderProps = {
  children: React.ReactNode
}

export default function ToastProvider({ children }: ToastProviderProps) {
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail as { type?: string; message?: string }
      if (!detail || !detail.message) return

      const { type = 'info', message } = detail
      switch (type) {
        case 'success':
          toast.success(message)
          break
        case 'error':
          toast.error(message)
          break
        case 'warning':
          toast.warning(message)
          break
        default:
          toast(message)
      }
    }

    window.addEventListener('sonner-toast', handler)
    return () => window.removeEventListener('sonner-toast', handler)
  }, [])

  return (
    <>
      {children}
      <Toaster position="bottom-center" />
    </>
  )
}
