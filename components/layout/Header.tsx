"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 h-[60px] bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-card' : ''}`}> 
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-[78px] w-[78px] overflow-hidden rounded-[16px] bg-slate-100">
              <Image src="/images/jakirSirSmartEdu.logo.png" alt="Jakir Sir" fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="hidden text-lg font-semibold text-textPrimary sm:inline-block">Jakir Sir</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" aria-label="Search" className="grid h-11 w-11 place-items-center rounded-[16px] bg-slate-100 text-2xl text-textPrimary transition hover:shadow-hover">
            <i className="ri-search-line"></i>
          </button>
          <button type="button" aria-label="Notifications" className="relative grid h-11 w-11 place-items-center rounded-[16px] bg-slate-100 text-2xl text-textPrimary transition hover:shadow-hover">
            <i className="ri-notification-3-line"></i>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-bold text-white">3</span>
          </button>
        </div>
      </div>
    </header>
  )
}
