"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavItem = {
  label: string
  icon: string
  href: string
}

const items: NavItem[] = [
  { label: 'Home', icon: 'ri-home-5-line', href: '/' },
  { label: 'Courses', icon: 'ri-book-open-line', href: '/courses' },
  { label: 'MCQ', icon: 'ri-file-list-3-line', href: '/mcq' },
  { label: 'Dashboard', icon: 'ri-user-line', href: '/dashboard' },
  { label: 'More', icon: 'ri-menu-3-line', href: '/more' }
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white">
      <div className="mx-auto flex max-w-[1280px] h-[64px] items-center justify-between px-4 sm:px-5 md:px-6 lg:px-8">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[0] flex-1 flex-col items-center justify-center gap-1 text-[11px] transition ${
                active ? 'text-primary' : 'text-textSecondary'
              }`}
            >
              <i className={`text-xl ${item.icon}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
