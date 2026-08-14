"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useSearch } from '@/components/context/SearchContext'
import { runningCourses } from '@/data/courses'
import CourseCard from '@/components/course/CourseCard'
import Link from 'next/link'

export default function RunningCourses() {
  const { query } = useSearch()

  const filtered = runningCourses.filter((course) =>
    course.title.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="pt-6">
      <div className="mb-3 flex items-center justify-between px-2">
        <div>
          <h2 className="text-[22px] font-bold text-textPrimary">🔥 চলমান ব্যাচ</h2>
          <p className="text-sm text-textSecondary">লাইভ ক্লাস ও দ্রুত ভর্তি</p>
        </div>
         <Link href="/all-courses" className="text-sm font-semibold text-primary">সব দেখুন</Link>
      </div>
      <Swiper modules={[Autoplay]} slidesPerView={1.25} spaceBetween={12} loop autoplay={{ delay: 3500, disableOnInteraction: false }} breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 16 }, 768: { slidesPerView: 3, spaceBetween: 16 }, 1024: { slidesPerView: 4, spaceBetween: 16 } }} className="px-2 pb-3">
        {filtered.map((course) => (
          <SwiperSlide key={course.id}>
          <CourseCard
            id={course.id}
            title={course.title}
            badge={course.badge}
            price={course.price}
            duration={course.duration}
            enrolledCount={course.students}
          />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
