'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Topic {
  name: string
  topics: string[]
}

interface SubjectData {
  title: string
  categories: Topic[]
}

const subjectTopicsData: Record<string, SubjectData> = {
  bangla: {
    title: 'বাংলা',
    categories: [
      {
        name: 'বাংলা সাহিত্য',
        topics: [
          'বাংলা সংবাদপত্র',
          'বাংলা সাহিত্যের শাখা',
          'বাংলা সাহিত্যিক ও সাহিত্যকর্ম',
          'বাংলায় বিদেশী সাহিত্যিক ও সাহিত্যকর্ম',
          'ভাষা আন্দোলনভিত্তিক সাহিত্য',
          'মুক্তিযুদ্ধভিত্তিক বাংলা সাহিত্য',
          'বাংলায় উল্লেখযোগ্য গ্রন্থ ও চরিত্র',
          'সাহিত্যিকদের উপাধি ও ছদ্মনাম',
          'বাংলা সাহিত্যের প্রথম'
        ]
      },
      {
        name: 'বাংলা ভাষা (ব্যাকরণ)',
        topics: [
          'ব্যাকরণ কাঠামো',
          'ধ্বনিমূল (Phonology)',
          'শব্দতত্ত্ব বা রূপতত্ত্ব (Morphology)',
          'বাক্যতত্ত্ব বা পদক্রম (Syntax)',
          'অর্থতত্ত্ব (Semantics)',
          'ছন্দ ও অলংকার',
          'নির্মিতি',
          'সারাংশ ও সারমর্ম'
        ]
      }
    ]
  }
}

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
)

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25h15.75a.75.75 0 00.75-.75V18a5.25 5.25 0 00-10.5 0v1.5a.75.75 0 00.75.75H4.501a.75.75 0 01-.75-.75v-1.5a2.25 2.25 0 012.25-2.25h.001a2.25 2.25 0 012.25 2.25v1.5a.75.75 0 01-.75.75z" />
  </svg>
)

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

export default function MockTestSubjectPage({ params }: { params: { subject: string } }) {
  const subjectKey = params.subject
  const subjectData = subjectTopicsData[subjectKey] || subjectTopicsData['bangla']
  const router = useRouter()
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({ 0: true })

  const toggleCategory = (index: number) => {
    setOpenCategories((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const handleTopicClick = (topicName: string) => {
    router.push(`/exam/start?subject=${encodeURIComponent(subjectKey)}&topic=${encodeURIComponent(topicName)}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <section className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <Link href="/mock-test" className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
              <BackIcon />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Practice / {subjectData.title}
            </h1>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                <SearchIcon />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                <ProfileIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {subjectData.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-[#1E1E22] border border-[#2D2D32] rounded-2xl mb-3 overflow-hidden">
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-white font-bold text-sm">{category.name}</span>
                <span className="text-slate-400">
                  {openCategories[categoryIndex] ? <ChevronDown /> : <ChevronRight />}
                </span>
              </button>

              {openCategories[categoryIndex] && (
                <div className="px-3 pb-3">
                  {category.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      onClick={() => handleTopicClick(topic)}
                      className="bg-[#25252A] p-3.5 rounded-xl flex items-center justify-between cursor-pointer hover:bg-[#2D2D34] transition-all my-1.5"
                    >
                      <span className="text-white text-sm font-medium">{topic}</span>
                      <span className="text-slate-400 w-4 h-4 shrink-0">
                        <ChevronRight />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
