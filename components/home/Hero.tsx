"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Image from 'next/image'

const slides = [
  { id: 1, title: 'আজই প্রস্তুতি শুরু করুন', img: '/images/SomajSebhaBanner.jpg' },
  { id: 2, title: 'লাইভ ক্লাস ও recorded ভিডিও', img: '/images/BannerSomajShebaCourse.jpeg' }
]

export default function Hero() {
  return (
    <section className="pt-4">
      <div className="overflow-hidden rounded-[24px] shadow-floating">
        <Swiper modules={[Autoplay]} slidesPerView={1} loop autoplay={{ delay: 4000 }} className="min-h-[280px]">
          {slides.map((s) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-[30vh] sm:h-[42vh]">
                <Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover' }} priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h2 className="text-2xl font-bold sm:text-3xl">{s.title}</h2>
                  <p className="mt-2 text-sm sm:text-base">Live Class • Recorded Video • MCQ • PDF</p>
                  <button className="mt-4 inline-flex h-[52px] items-center justify-center rounded-[16px] bg-accent px-5 text-sm font-bold text-textPrimary shadow-card">এখনই ভর্তি হন</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
