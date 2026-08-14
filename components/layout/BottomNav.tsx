"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useSubjectSelection } from '@/components/quiz/SubjectSelectionContext'

type NavItem = {
  label: string
  icon: React.ReactNode
  href: string
}

const ShopIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className="w-5 h-5"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.25 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zm7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5z" 
    />
  </svg>
)

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A9 9 0 006 18c1.052 0 2.062-.18 3-.512m12-6.042A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A9 9 0 0118 18c-1.052 0-2.062-.18-3-.512" />
  </svg>
)

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
)

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25h15.002c.966 0 1.75-.784 1.75-1.75v-7.498a1.75 1.75 0 00-1.75-1.75H4.501a1.75 1.75 0 00-1.75 1.75v7.498c0 .966.784 1.75 1.75 1.75z" />
  </svg>
)

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const items: NavItem[] = [
  { label: 'MCQ', icon: <GridIcon />, href: '/topic-wise-exam' },
  { label: 'Courses', icon: <BookOpenIcon />, href: '/all-courses' },
  { label: 'Shop', icon: <ShopIcon />, href: '/' },
  { label: 'Dashboard', icon: <UserIcon />, href: '/' },
  { label: 'More', icon: <MenuIcon />, href: '/' }
]

export default function BottomNav() {
  const pathname = usePathname()
  const { openModal } = useSubjectSelection()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white">
      <div className="mx-auto flex max-w-[1280px] h-[64px] items-center justify-between px-4 sm:px-5 md:px-6 lg:px-8">
        {items.map((item) => {
          const active = pathname === item.href
          if (item.href === '/mcq') {
            return (
              <button
                key={item.href}
                onClick={openModal}
                className={`flex min-w-[0] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
                  active ? 'text-[#7C3AED]' : 'text-textSecondary'
                }`}
              >
                <span className="mb-0.5">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            )
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[0] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
                active ? 'text-[#7C3AED]' : 'text-textSecondary'
              }`}
            >
              <span className="mb-0.5">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
