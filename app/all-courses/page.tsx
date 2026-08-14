'use client'

import React, { useState } from 'react'
import CourseCard from '@/components/course/CourseCard'

const filterTabs = [
  { id: 'all', label: 'সকল' },
  { id: 'running', label: 'চলমান ব্যাচ' },
  { id: 'recorded', label: 'রেকর্ডেড ব্যাচ' },
  { id: 'special', label: 'স্পেশাল কোর্স' },
]

const demoCourses = [
  {
    id: 1,
    title: 'সমাজসেবা ও স্বাস্থ্যকর্মী কম্বাইন্ড ব্যাচ',
    badge: 'COMBINED',
    price: '৳১৪৯৯',
    duration: '3 Months+',
    enrolledCount: 4180,
    bannerBg: 'bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]',
    category: 'running',
  },
  {
    id: 2,
    title: 'বিসিএস স্পেশাল ব্যাচ',
    badge: 'SPECIAL',
    price: '৳৯৯৯',
    duration: '2-3 Months',
    enrolledCount: 3240,
    bannerBg: 'bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]',
    category: 'special',
  },
  {
    id: 3,
    title: 'ব্যাংক জবস কম্বাইন্ড কোর্স',
    badge: 'LIVE',
    price: '৳২৪৯৯',
    duration: '4 Months+',
    enrolledCount: 5120,
    bannerBg: 'bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]',
    category: 'running',
  },
  {
    id: 4,
    title: 'প্রাইমারী শিক্ষক নিয়োগ স্পেশাল ব্যাচ',
    badge: 'SPECIAL',
    price: '৳১,২৯৯',
    duration: '2 Months',
    enrolledCount: 1890,
    bannerBg: 'bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]',
    category: 'special',
  },
  {
    id: 5,
    title: 'বিসিএস প্রিলিমinaire রেকর্ডেড কোর্স',
    badge: 'RECORDED',
    price: '৳১,৫০০',
    duration: '6 Months',
    enrolledCount: 2750,
    bannerBg: 'bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]',
    category: 'recorded',
  },
  {
    id: 6,
    title: 'এনটিআরসিএ প্রিলিমinaire লাইভ ব্যাচ',
    badge: 'LIVE',
    price: '৳৯৯৯',
    duration: '3 Months',
    enrolledCount: 4100,
    bannerBg: 'bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]',
    category: 'running',
  },
]

export default function AllCoursesPage() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredCourses = React.useMemo(() => {
    if (activeTab === 'all') return demoCourses
    return demoCourses.filter((course) => course.category === activeTab)
  }, [activeTab])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="pt-6">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">সকল কোর্স</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            আপনার পছন্দমতো কোর্সে ভর্তি হয়ে প্রস্তুতি শুরু করুন
          </p>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#800000] text-white hover:bg-red-800'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#800000] hover:text-[#800000]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">কোন কোর্স পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                badge={course.badge}
                price={course.price}
                duration={course.duration}
                enrolledCount={course.enrolledCount}
                bannerBg={course.bannerBg}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
