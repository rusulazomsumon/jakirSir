"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { popularCourses } from '@/data/courses'
import { CourseCard } from '@/components/ui'

export default function PopularCourses() {
  return (
    <section className="pt-6" id="popularCourses">
      <div className="mb-3 px-2 flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-textPrimary">জনপ্রিয় কোর্স</h2>
          <p className="text-sm text-textSecondary">Live Class, Recorded Video, MCQ & PDF</p>
        </div>
        <a href="#" className="text-sm font-semibold text-primary">সব দেখুন</a>
      </div>
      <Swiper modules={[Autoplay]} slidesPerView={1.25} spaceBetween={12} loop autoplay={{ delay: 3500, disableOnInteraction: false }} breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 16 }, 768: { slidesPerView: 3, spaceBetween: 16 }, 1024: { slidesPerView: 4, spaceBetween: 16 } }} className="px-2 pb-3">
        {popularCourses.map((course) => (
          <SwiperSlide key={course.id}>
            <CourseCard
              thumbnail={course.image}
              category={course.category}
              title={course.title}
              description={course.description}
              duration={course.duration}
              students={`${course.students} জন`}
              price={course.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
