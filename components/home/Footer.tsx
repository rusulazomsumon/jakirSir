'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { useSubjectSelection } from '@/components/quiz/SubjectSelectionContext'

const quickLinks = [
  { label: 'আমাদের সম্পর্কে', href: '/about' },
  { label: 'চলমান কোর্সসমূহ', href: '/all-courses' },
  { label: 'পরীক্ষা রুটিন', href: '/routine' },
  { label: 'মডেল টেস্ট', href: '/model-test' },
  { label: 'টপিক ভিত্তিক কুইজ', href: '/topic-wise-exam' },
  { label: 'ব্লগ ও পরামর্শ', href: '/blog' },
  { label: 'যোগাযোগের ঠিকানা', href: '/contact' }
]

const services = [
  'লাইভ ব্যাচ',
  'অনলাইন পরীক্ষা (Live MCQ)',
  'প্রশ্নব্যাংক (Question Bank)',
  'রিভিশন বুক ও রিসোর্স',
  'জব সার্কুলার'
]

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 2.25c-5.384 0-9.75 4.365-9.75 9.75 0 1.741.466 3.447 1.353 4.958L2.25 22.5l5.147-1.353A9.706 9.706 0 0012 21.75c5.384 0 9.75-4.365 9.75-9.75S17.384 2.25 12 2.25z" />
  </svg>
)

export default function Footer() {
  const [email, setEmail] = useState('')
  const { openModal } = useSubjectSelection()

  return (
    <footer className="w-full bg-[#F5F2FE] border-t border-[#EADBFF] mt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Jakir Sir SMART Edu</h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              বাংলাদেশের সেরা জব প্রিপারেশন ও অনলাইন লার্নিং প্ল্যাটফর্ম। বিসিএস, ব্যাংক, শিক্ষক নিবন্ধন ও প্রাইমারি পরীক্ষার প্রস্তুতি নিন অভিজ্ঞ মেন্টরদের সাথে।
            </p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
                setEmail('')
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                className="flex-1 rounded-xl border border-[#EADBFF] bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#7C3AED]"
              />
              <button
                type="submit"
                className="bg-[#7C3AED] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#6D28D9] transition-colors"
              >
                সাবস্ক্রাইব
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 mb-3">গুরুত্বপূর্ণ পেজসমূহ</h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-slate-600 hover:text-[#7C3AED] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 mb-3">আমাদের সেবাসমূহ</h4>
            <ul className="space-y-2">
              {services.map((service) => {
                if (service === 'অনলাইন পরীক্ষা (Live MCQ)') {
                  return (
                    <li key={service}>
                      <button onClick={openModal} className="text-sm text-slate-600 hover:text-[#7C3AED] transition-colors">
                        {service}
                      </button>
                    </li>
                  )
                }
                if (service === 'প্রশ্নব্যাংক (Question Bank)') {
                  return (
                    <li key={service}>
                      <Link href="/question-bank" className="text-sm text-slate-600 hover:text-[#7C3AED] transition-colors">
                        {service}
                      </Link>
                    </li>
                  )
                }
                return (
                  <li key={service}>
                    <span className="text-sm text-slate-600">{service}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 mb-3">যোগাযোগ ও সোশ্যাল মিডিয়া</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Phone / WhatsApp: 01521-496532</li>
              <li>Email: support@jakirsir.com</li>
              <li>Location: মাদারীপুর, বাংলাদেশ</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="https://www.facebook.com/jakiredubd" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://youtube.com/@jakirsirofficial-u9z?si=Lg706tgopmZLR2Ix" target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <YouTubeIcon />
              </a>
              <a href="https://www.instagram.com/jakir.rana17?igsh=aDdhMnQ1dnVhcjZt" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.tiktok.com/@user2049903761903?_r=1&_t=ZS-98qz7LQAcdN" target="_blank" rel="noreferrer" aria-label="TikTok" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <TikTokIcon />
              </a>
              <a href="https://wa.me/8801521496532" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#EADBFF] pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-500">
              © 2026 JakirEdu. All rights reserved. | Developed by{' '}
              <a
                href="https://web.facebook.com/sumonagrotech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium text-[#7C3AED]"
              >
                Rousul Azom Sumon
              </a>{' '}
              (01882834071)
            </p>
            <div className="flex gap-4 text-xs text-slate-500">
              <Link href="/privacy" className="hover:text-[#7C3AED]">প্রাইভেসি পলিসি</Link>
              <Link href="/terms" className="hover:text-[#7C3AED]">টার্মস ও কন্ডিশন</Link>
              <Link href="/refund" className="hover:text-[#7C3AED]">রিফান্ড পলিসি</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
