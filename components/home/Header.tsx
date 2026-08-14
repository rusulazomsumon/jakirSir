"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useSubjectSelection } from '@/components/quiz/SubjectSelectionContext'

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function Header() {
  const [open, setOpen] = useState(false)
  const { openModal } = useSubjectSelection()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <button aria-label="menu" onClick={() => setOpen(true)} className="flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
            <MenuIcon />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="/images/coursePic/logo.png" alt="logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="hidden sm:inline-block font-semibold text-textPrimary">Jakir Sir</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button aria-label="notifications" className="relative flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
            <BellIcon />
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
            <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="py-2">Home</Link>
            <Link href="/courses" className="py-2">Courses</Link>
            <button onClick={() => { openModal(); setOpen(false) }} className="py-2 text-left w-full">MCQ</button>
            <Link href="/dashboard" className="py-2">Dashboard</Link>
            <Link href="/more" className="py-2">More</Link>
          </nav>
        </motion.aside>
      )}
    </header>
  )
}
