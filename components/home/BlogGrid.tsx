'use client';

import React, { useState } from 'react'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  category: string
  readTime: string
  link: string
}

const tabs = [
  { key: 'all', label: 'সব' },
  { key: 'bank', label: 'ব্যাংক' },
  { key: 'somajkormi', label: 'সমাজকর্মী' },
  { key: 'ntrca', label: 'NTRCA / প্রাইমারি' },
  { key: 'circular', label: 'সার্কুলার' }
]

const posts: Post[] = [
  {
    id: 'somajseba-prep',
    title: 'ইউনিয়ন সমাজকর্মী নিয়োগ পরীক্ষার প্রস্তুতি: সিলেবাস ও গাইডলাইন',
    category: 'somajkormi',
    readTime: '৩ মিনিট পড়া • ১২ আগস্ট',
    link: '/blog/somajseba-preparation'
  },
  {
    id: 'bank-start',
    title: 'ব্যাংক জব প্রস্তুতি যেভাবে শুরু করবেন: এক্সপার্ট গাইডলাইন',
    category: 'bank',
    readTime: '৪ মিনিট পড়া • ১০ আগস্ট',
    link: '/blog/bank-job-start-guide'
  },
  {
    id: 'bank-full',
    title: 'ব্যাংক জব প্রস্তুতি — প্রিলি, লিখিত ও ভাইভার পূর্ণাঙ্গ গাইড',
    category: 'bank',
    readTime: '৫ মিনিট পড়া • ০৮ আগস্ট',
    link: '/blog/bank-job-full-guide'
  },
  {
    id: 'ntrca-guide',
    title: 'প্রাইমারি ও শিক্ষক নিবন্ধন (NTRCA) সেরা প্রস্তুতি কৌশল',
    category: 'ntrca',
    readTime: '৪ মিনিট পড়া • ০৫ আগস্ট',
    link: '/blog/primary-ntrca-guide'
  },
  {
    id: 'circular',
    title: 'All Jobs Circular | চলমান সকল সরকারি ও বেসরকারি নিয়োগ বিজ্ঞপ্তি',
    category: 'circular',
    readTime: '২ মিনিট পড়া • আজকের আপডেট',
    link: '/blog/all-job-circulars'
  }
]

const categoryLabels: Record<string, string> = {
  bank: 'ব্যাংক',
  somajkormi: 'সমাজকর্মী',
  ntrca: 'NTRCA',
  circular: 'সার্কুলার'
}

export default function BlogGrid() {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all' ? posts : posts.filter((p) => p.category === activeTab)

  return (
    <section className="pt-6 px-2">
      <h2 className="text-[22px] font-bold text-textPrimary">ব্লগ ও পরামর্শ</h2>

      <div className="mt-3 flex overflow-x-auto no-scrollbar gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'bg-[#F5F2FE] text-[#7C3AED] hover:bg-[#EADBFF]'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="border border-[#EADBFF] bg-white rounded-2xl p-4 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="bg-[#F5F2FE] text-[#7C3AED] text-xs px-2.5 py-1 rounded-md font-medium">
                {categoryLabels[post.category] || post.category}
              </span>
            </div>

            <Link href={post.link} className="mt-3 block">
              <h3 className="text-slate-800 text-sm sm:text-base font-semibold line-clamp-2">{post.title}</h3>
            </Link>

            <div className="mt-3 flex items-center justify-between text-xs text-textSecondary">
              <span>{post.readTime}</span>
              <Link href={post.link} className="text-[#7C3AED] font-medium hover:underline">
                পড়ুন →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
