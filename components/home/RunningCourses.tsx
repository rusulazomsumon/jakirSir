"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { useSearch } from '@/components/context/SearchContext'
import { runningCourses } from '@/data/courses'
import { CourseCard } from '@/components/ui'
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
        <Link href="/courses" className="text-sm font-semibold text-primary">সব দেখুন</Link>
      </div>
      <Swiper modules={[Autoplay]} slidesPerView="auto" spaceBetween={16} className="px-2 pb-3">
        {filtered.map((course) => (
          <SwiperSlide key={course.id} style={{ width: 300 }}>
            <CourseCard
              thumbnail={course.image}
              category={course.category}
              title={course.title}
              description={course.description}
              duration={course.duration}
              students={`${course.students} জন`}
              price={course.price}
              badge={course.badge}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
