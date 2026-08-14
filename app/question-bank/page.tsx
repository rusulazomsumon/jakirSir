'use client'

import React, { useState } from 'react'

const questionBankCategories = [
  { id: 'all', name: 'সকল' },
  { id: 'bcs', name: 'BCS' },
  { id: 'primary', name: 'Primary' },
  { id: 'ntrca', name: 'NTRCA' },
  { id: 'grade-11-20', name: '11-20 Grade' },
  { id: 'bank', name: 'Bank' },
  { id: 'non-cadre', name: 'Non-Cadre' },
]

const questionBankItems = [
  {
    id: 1,
    title: 'বাংলাদেশ পরমাণু শক্তি কমিশন নিয়োগ পরীক্ষা-২০২৬ | BAEC MCQ Question Solution-2026',
    category: '11-20 Grade',
    author: 'MD MAHFUZAR RAHMAN TAREK',
    date: '12 August 2026',
    views: 103,
    pdfUrl: '#',
  },
  {
    id: 2,
    title: '৪৪তম বিসিএস প্রিলিমিনারি পরীক্ষা প্রশ্ন সমাধান | 44th BCS Preliminary Solution',
    category: 'BCS',
    author: 'Jakir Sir SMART Edu',
    date: '10 July 2026',
    views: 1420,
    pdfUrl: '#',
  },
  {
    id: 3,
    title: 'প্রাথমিক সহকারী শিক্ষক নিয়োগ পরীক্ষা ২০২৬ (১ম ধাপ)',
    category: 'Primary',
    author: 'Jakir Sir SMART Edu',
    date: '05 June 2026',
    views: 890,
    pdfUrl: '#',
  },
  {
    id: 4,
    title: '১৮তম শিক্ষক নিবন্ধন (NTRCA) প্রিলিমিনারি প্রশ্ন ব্যাংক',
    category: 'NTRCA',
    author: 'Jakir Sir SMART Edu',
    date: '20 May 2026',
    views: 650,
    pdfUrl: '#',
  },
]

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
]

export default function QuestionBankPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  const filteredItems = React.useMemo(() => {
    let items = [...questionBankItems]

    if (activeTab !== 'all') {
      items = items.filter((item) => item.category === activeTab)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
    }

    switch (sortBy) {
      case 'popular':
        items.sort((a, b) => b.views - a.views)
        break
      case 'latest':
      default:
        items.sort((a, b) => b.id - a.id)
        break
    }

    return items
  }, [activeTab, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="pt-6">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">প্রশ্নব্যাংক</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            বিগত বছরের প্রশ্ন সমাধান
          </p>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {questionBankCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#800000] text-white hover:bg-red-800'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#800000] hover:text-[#800000]'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রশ্ন ব্যাংক খুঁজুন..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 sm:w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">কোন প্রশ্ন ব্যাংক পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="relative h-32 bg-[#800000] flex items-center justify-center px-4">
                  <p className="text-white text-center text-sm font-semibold leading-snug">
                    অথেনটিক রেফারেন্স এবং ব্যাখ্যাসহ PDF FILE DOWNLOAD
                  </p>
                  <span className="absolute top-0 right-0 bg-[#800000] text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-col p-5">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.25h15.75a.75.75 0 0 0 .75-.75V18a5.25 5.25 0 0 0-10.5 0v1.5a.75.75 0 0 0 .75.75H4.501a.75.75 0 0 1-.75-.75v-1.5a2.25 2.25 0 0 1 2.25-2.25h.001a2.25 2.25 0 0 1 2.25 2.25v1.5a.75.75 0 0 1-.75.75Z"
                        />
                      </svg>
                      {item.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      {item.views}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">PDF Available</span>
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      View PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
