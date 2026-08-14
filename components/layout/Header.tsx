"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2.25c-5.384 0-9.75 4.365-9.75 9.75 0 1.741.466 3.447 1.353 4.958L2.25 22.5l5.147-1.353A9.706 9.706 0 0012 21.75c5.384 0 9.75-4.365 9.75-9.75S17.384 2.25 12 2.25z" />
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)

const menuLinks = [
  { href: '/all-courses', label: 'All Course' },
  { href: '/', label: 'Exam Routine' },
  { href: '/', label: 'Central Exam' },
  { href: '/topic-wise-exam', label: 'টপিক ভিত্তিক কুইজ' },
  { href: '/model-test', label: 'Model Test' },
  { href: '/', label: 'Resource' },
  { href: '/', label: 'চাকরি বার্তা' },
  { href: '/', label: 'ব্লগ' }
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openModal } = useSubjectSelection()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`w-full sticky top-0 z-40 h-[60px] bg-white/95 backdrop-blur-md border-b border-slate-100 transition-shadow relative ${
        scrolled ? 'shadow-card' : ''
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <MenuIcon />
          </button>
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <Image src="/images/jakirSirSmartEdulogo.png" alt="Jakir Sir Edu Logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="hidden text-lg font-semibold text-textPrimary sm:inline-block">Jakir Sir</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <BellIcon />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-bold text-white">
              3
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-sm bg-[#F5F2FE] backdrop-blur-md border-r border-white/20 z-50 h-screen overflow-y-auto shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8">
                    <Image src="/images/jakirSirSmartEdu.logo.png" alt="Jakir Sir" fill style={{ objectFit: 'contain' }} />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">Jakir Sir SMART Edu</span>
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-slate-600 hover:text-slate-900 hover:bg-[#EADBFF]"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <nav className="flex flex-col gap-1">
                  {menuLinks.map((item) => {
                    if (item.href === '/mcq') {
                      return (
                        <button
                          key={item.href}
                          onClick={() => { openModal(); setMobileMenuOpen(false) }}
                          className="block py-3 px-4 rounded-lg text-slate-800 hover:bg-[#EADBFF] transition-colors w-full text-left"
                        >
                          {item.label}
                        </button>
                      )
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-3 px-4 rounded-lg text-slate-800 hover:bg-[#EADBFF] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>

                <div className="mt-6">
                  <Link
                    href="/login"
                    className="flex items-center justify-center rounded-full bg-[#8A2BE2] py-3.5 text-center text-sm font-semibold text-white shadow-lg hover:bg-[#7C3AED]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login / Sign Up
                  </Link>

                  <div className="flex flex-row justify-center gap-3 mt-3">
                    <a href="https://www.facebook.com/jakiredubd" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-700 hover:text-slate-900 hover:bg-[#EADBFF]">
                      <FacebookIcon />
                    </a>
                    <a href="https://youtube.com/@jakirsirofficial-u9z?si=Lg706tgopmZLR2Ix" target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-700 hover:text-slate-900 hover:bg-[#EADBFF]">
                      <YouTubeIcon />
                    </a>
                    <a href="https://www.instagram.com/jakir.rana17?igsh=aDdhMnQ1dnVhcjZt" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-700 hover:text-slate-900 hover:bg-[#EADBFF]">
                      <InstagramIcon />
                    </a>
                    <a href="https://www.tiktok.com/@user2049903761903?_r=1&_t=ZS-98qz7LQAcdN" target="_blank" rel="noreferrer" aria-label="TikTok" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-700 hover:text-slate-900 hover:bg-[#EADBFF]">
                      <TikTokIcon />
                    </a>
                    <a href="https://wa.me/8801521496532" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-slate-700 hover:text-slate-900 hover:bg-[#EADBFF]">
                      <WhatsAppIcon />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
