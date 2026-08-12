"use client"

import React, { useEffect, useState } from 'react'

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-[90px] right-4 z-50 flex flex-col items-end gap-3">
      <a
        href="https://wa.me/8801234567890"
        target="_blank"
        rel="noreferrer"
        className="group inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-floating transition-transform hover:-translate-y-1"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute inset-0 animate-pulse rounded-full bg-[#25D366]/30" />
        <i className="ri-whatsapp-line text-2xl relative z-10" />
      </a>

      {visible && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-textPrimary shadow-floating transition hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-2xl" />
        </button>
      )}
    </div>
  )
}
