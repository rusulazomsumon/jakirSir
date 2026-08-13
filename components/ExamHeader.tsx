'use client'

import React, { useEffect, useRef } from 'react'
import { toBanglaNum } from '@/utils/formatters'

type ExamHeaderProps = {
  remainingSeconds: number
  onTimeUp: () => void
}

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function ExamHeader({ remainingSeconds, onTimeUp }: ExamHeaderProps) {
  const onTimeUpRef = useRef(onTimeUp)
  onTimeUpRef.current = onTimeUp

  useEffect(() => {
    if (remainingSeconds <= 0) {
      onTimeUpRef.current()
    }
  }, [remainingSeconds])

  const hours = Math.floor(Math.max(0, remainingSeconds) / 3600)
  const minutes = Math.floor((Math.max(0, remainingSeconds) % 3600) / 60)
  const seconds = Math.max(0, remainingSeconds) % 60

  const banglaHours = toBanglaNum(String(hours).padStart(2, '0'))
  const banglaMinutes = toBanglaNum(String(minutes).padStart(2, '0'))
  const banglaSeconds = toBanglaNum(String(seconds).padStart(2, '0'))

  const formattedTime = `${banglaHours}:${banglaMinutes}:${banglaSeconds}`

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <MenuIcon />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-bold">
              BC
            </div>
            <span className="text-base font-bold text-slate-900">BCSpark</span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-red-700">
          <ClockIcon />
          <span className="text-sm font-semibold tabular-nums">{formattedTime}</span>
        </div>
      </div>
    </header>
  )
}
