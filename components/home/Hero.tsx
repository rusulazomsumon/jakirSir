"use client"

import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'
import { useSubjectSelection } from '@/components/quiz/SubjectSelectionContext'

const slides = [
  { id: 1, img: '/images/slider/somajseba199.png', href: '/all-courses' },
  { id: 2, img: '/images/slider/combinedBank.png', href: '/all-courses' }
]

const quickActions = [
  { label: 'লাইভ MCQ', href: '/live-mcq', live: true },
  { label: 'সকল কোর্স', href: '/all-courses' },
  { label: 'মডেল টেস্ট', href: '/model-test' },
  { label: 'টপিক ভিত্তিক কুইজ', href: '/topic-wise-exam' }
]

export default function Hero() {
  const { openModal } = useSubjectSelection()

  return (
    <section className="pt-4">
      <div className="overflow-hidden rounded-[24px] shadow-floating">
        <Swiper modules={[Autoplay]} slidesPerView={1} loop autoplay={{ delay: 4000 }} className="h-auto">
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <Link href={s.href} className="block">
                <div className="relative w-full aspect-[2/1]">
                  <Image src={s.img} alt="Banner" fill sizes="100vw" className="object-cover rounded-2xl" priority />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-2 p-3 sm:p-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:flex md:flex-row md:justify-between md:items-center">
            {quickActions.map((item) => (
              item.href === '/live-mcq' ? (
                <button
                  key={item.label}
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 bg-[#F5F2FE] hover:bg-[#7C3AED] hover:text-white text-[#7C3AED] font-medium py-2 px-3 rounded-xl border border-[#EADBFF] transition-all text-xs sm:text-sm"
                >
                  {item.live && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>}
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center justify-center gap-2 bg-[#F5F2FE] hover:bg-[#7C3AED] hover:text-white text-[#7C3AED] font-medium py-2 px-3 rounded-xl border border-[#EADBFF] transition-all text-xs sm:text-sm"
                >
                  {item.live && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>}
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
