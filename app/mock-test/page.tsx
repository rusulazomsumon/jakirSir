'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const mockTopics = [
  { id: 'bangla', title: 'বাংলা', count: '24219 MCQ' },
  { id: 'english', title: 'English', count: '28293 MCQ' },
  { id: 'math', title: 'গণিত', count: '24043 MCQ' },
  { id: 'gk', title: 'সাধারণ জ্ঞান', count: '29714 MCQ' },
  { id: 'ict', title: 'কম্পিউটার ও তথ্য প্রযুক্তি (Computer & ICT)', count: '3981 MCQ' },
  { id: 'science', title: 'সাধারণ বিজ্ঞান', count: '6052 MCQ' },
  { id: 'mental-ability', title: 'মানসিক দক্ষতা', count: '759 MCQ' },
  { id: 'ethics', title: 'নৈতিকতা, মূল্যবোধ ও সুশাসন', count: '148 MCQ' },
  { id: 'geography', title: 'ভূগোল', count: '232 MCQ' },
  { id: 'bd-affairs', title: 'বাংলাদেশ বিষয়াবলী', count: '0 MCQ' },
  { id: 'zoology', title: 'প্রাণিবিদ্যা', count: '2 MCQ' },
  { id: 'int-affairs', title: 'আন্তর্জাতিক বিষয়াবলী', count: '0 MCQ' },
  { id: 'bangla-2nd', title: 'বাংলা ২য় পত্র', count: '0 MCQ' },
  { id: 'analytical', title: 'Analytical Question', count: '273 MCQ' },
  { id: 'daily-science', title: 'দৈনন্দিন বিজ্ঞান', count: '0 MCQ' },
]

const tabs = [
  { key: 'fast', label: 'Fast Practice' },
  { key: 'mock', label: 'Mock Test' },
]

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

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
)

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.25h15.75a.75.75 0 00.75-.75V18a5.25 5.25 0 00-10.5 0v1.5a.75.75 0 00.75.75H4.501a.75.75 0 01-.75-.75v-1.5a2.25 2.25 0 012.25-2.25h.001a2.25 2.25 0 012.25 2.25v1.5a.75.75 0 01-.75.75z" />
  </svg>
)

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
)

export default function MockTestPage() {
  const [activeTab, setActiveTab] = useState('mock')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      <section className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
              <BackIcon />
            </button>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Practice</h1>
            <div className="flex items-center gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                <SearchIcon />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                <BellIcon />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">
                <ProfileIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#800000] text-white hover:bg-red-800'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#800000] hover:text-[#800000]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[#9CA3AF] font-medium text-sm my-3">Select Topics for Test</p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto p-4">
          {mockTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/mock-test/${topic.id}`}
              className="bg-[#1E1E22] border border-[#2D2D32] hover:border-emerald-500 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-all shadow-sm"
            >
              <div className="flex items-center flex-1 min-w-0 pr-2">
                <div className="w-3 h-5 bg-emerald-500 rounded-sm shrink-0 mr-2.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm leading-snug break-words whitespace-normal">
                    {topic.title}
                  </h3>
                  <span className="text-slate-400 text-xs mt-1 block">{topic.count}</span>
                </div>
              </div>
              <span className="text-slate-400 w-4 h-4 shrink-0">
                <ChevronRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
