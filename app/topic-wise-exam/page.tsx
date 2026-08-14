'use client'

import React, { useState, useEffect } from 'react'
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

export default function TopicWiseExamPage() {
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

  const filteredExams = activeTab === 'all'
    ? exams
    : exams.filter((exam) => exam.filePath.includes(`topicExam/${activeTab}/`))

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-slate-500">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="pt-6">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">টপিক ভিত্তিক পরীক্ষা</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
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

        {filteredExams.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">কোন পরীক্ষা পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.slug}
                className="flex flex-col rounded-2xl p-5 border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-slate-900 leading-snug">
                    {exam.examInfo.examName}
                  </h3>
                  <span className="inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700">
                    {exam.subject}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500">Questions</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{exam.examInfo.totalQuestions}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500">Full Marks</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{exam.examInfo.totalMarks}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500">Time Limit</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{exam.examInfo.durationMinutes} mins</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-500">Pass Mark</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{exam.examInfo.cutMark ?? 'N/A'}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600">
                    Not Started
                  </span>
                  <button
                    onClick={() => handleStartExam(exam.slug)}
                    disabled={startingSlug === exam.slug}
                    className="h-11 px-5 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {startingSlug === exam.slug ? 'Loading...' : 'পরীক্ষা দিন'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
