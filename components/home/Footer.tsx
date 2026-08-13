'use client'

import Link from 'next/link'
import React, { useState } from 'react'

const quickLinks = [
  { label: 'আমাদের সম্পর্কে', href: '/about' },
  { label: 'চলমান কোর্সসমূহ', href: '/courses' },
  { label: 'পরীক্ষা রুটিন', href: '/routine' },
  { label: 'মডেল টেস্ট', href: '/model-test' },
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

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-[#F9F8FE] pt-12 pb-6 px-4">
      <div className="max-w-[1280px] mx-auto">
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
              {services.map((service) => (
                <li key={service} className="text-sm text-slate-600">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 mb-3">যোগাযোগ ও সোশ্যাল মিডিয়া</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Phone: +880 1700-000000</li>
              <li>Email: support@jakirsir.com</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#EADBFF] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-500">© 2026 Jakir Sir SMART Edu. All rights reserved.</p>
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
