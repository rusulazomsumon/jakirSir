"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearch } from '@/components/context/SearchContext'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { query, setQuery } = useSearch()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <button aria-label="menu" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-textPrimary">☰</button>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/images/coursePic/logo.png" alt="logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="hidden sm:inline-block font-semibold text-textPrimary">Jakir Sir</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <input aria-label="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, PDFs..." className="rounded-xl border border-border px-3 py-2 w-[220px] text-sm" />
          </div>
          <button aria-label="notifications" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-lg text-textPrimary">
            🔔
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">3</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3 }} className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-primary text-white flex items-center justify-center">J</div>
              <div>
                <div className="font-semibold text-textPrimary">Jakir Sir</div>
                <div className="text-xs text-textSecondary">SMART Edu</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-xl">✕</button>
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="py-2">Home</Link>
            <Link href="/courses" className="py-2">Courses</Link>
            <Link href="/mcq" className="py-2">MCQ</Link>
            <Link href="/dashboard" className="py-2">Dashboard</Link>
            <Link href="/more" className="py-2">More</Link>
          </nav>
        </motion.aside>
      )}
    </header>
  )
}
