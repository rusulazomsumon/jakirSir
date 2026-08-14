"use client"

import React from 'react'

type NavItem = {
  label: string
  icon: React.ReactNode
  href?: string
}

const items: NavItem[] = [
  { label: 'Home', icon: '🏠', href: '/' },
  { label: 'Courses', icon: '📚', href: '/all-courses' },
  { label: 'MCQ', icon: '✦', href: '/mcq' },
  { label: 'Dashboard', icon: '👤', href: '/dashboard' },
  { label: 'More', icon: '⋯', href: '/more' }
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border h-[72px]">
      <div className="max-w-[1280px] mx-auto h-full px-4 flex items-center justify-between">
        {items.map((it) => (
          <a key={it.label} href={it.href} className="flex flex-col items-center justify-center text-xs text-textSecondary w-[20%]">
            <div className="text-xl mb-1">{it.icon}</div>
            <span className="text-[11px]">{it.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
