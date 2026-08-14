'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface TopicExam {
  slug: string
  filename: string
  subject: string
  examInfo: {
    examName: string
    examType: string
    totalMarks: number | string
    totalQuestions: number
    durationMinutes?: number
    cutMark?: number
    negativeMarkPerWrong?: number
  }
  filePath: string
}

const TABS = [
  { key: 'all', label: 'সব' },
  { key: 'Bangla', label: 'বাংলা' },
  { key: 'English', label: 'English' },
  { key: 'Math', label: 'গণিত' },
  { key: 'GK', label: 'সাধারণ জ্ঞান' },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function TopicExamSection() {
  const [exams, setExams] = useState<TopicExam[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [startingSlug, setStartingSlug] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch('/api/topic-exams')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setExams(data)
      } catch (error) {
        console.error('Failed to load topic exams:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchExams()
  }, [])

  const displayedExams = useMemo(() => {
    if (activeTab === 'all') {
      return shuffleArray(exams).slice(0, 3)
    }
    return exams
      .filter((exam) => exam.filePath.includes(`topicExam/${activeTab}/`))
      .slice(0, 3)
  }, [activeTab, exams])

  const handleStartExam = async (slug: string) => {
    setStartingSlug(slug)
    try {
      const res = await fetch(`/api/topic-exams/${slug}`)
      if (!res.ok) throw new Error('Failed to load exam')
      const examData = await res.json()
      sessionStorage.setItem('currentExamData', JSON.stringify(examData))
      router.push(`/exam/${encodeURIComponent(slug)}`)
    } catch (error) {
      console.error('Failed to start exam:', error)
      alert('পরীক্ষার ডেটা লোড করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।')
    } finally {
      setStartingSlug(null)
    }
  }

  if (loading) {
    return (
      <section className="pt-6">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="animate-pulse space-y-3">
            <div className="h-6 w-40 bg-slate-200 rounded" />
            <div className="h-4 w-64 bg-slate-200 rounded" />
            <div className="h-20 bg-slate-200 rounded-xl" />
            <div className="h-20 bg-slate-200 rounded-xl" />
            <div className="h-20 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-6">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">টপিক ভিত্তিক পরীক্ষা</h2>
          <p className="mt-1 text-xs text-slate-500">
            বিষয়ভিত্তিক পরীক্ষায় অংশগ্রহণ করুন এবং আপনার প্রস্তুতি যাচাই করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`text-xs sm:text-sm font-semibold py-1.5 px-2.5 rounded-lg transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {displayedExams.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <p className="text-xs text-slate-500">কোন পরীক্ষা পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayedExams.map((exam) => (
              <div
                key={exam.slug}
                className="flex items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all"
              >
                <div className="flex-1 pr-1">
                  <span className="inline-block px-2 py-0.5 mb-1 text-[10px] font-medium text-blue-600 bg-blue-50 rounded-md">
                    {exam.subject}
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug line-clamp-2">
                    {exam.examInfo.examName}
                  </h4>
                </div>
                <button
                  onClick={() => handleStartExam(exam.slug)}
                  disabled={startingSlug === exam.slug}
                  className="shrink-0 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {startingSlug === exam.slug ? '...' : 'পরীক্ষা দিন'}
                </button>
              </div>
            ))}
          </div>
        )}

        <Link href="/topic-wise-exam" className="mt-4 block">
          <button
            type="button"
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-blue-600 font-semibold text-sm rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2"
          >
            সকল পরীক্ষা দেখুন
            <span aria-hidden="true">&rarr;</span>
          </button>
        </Link>
      </div>
    </section>
  )
}
