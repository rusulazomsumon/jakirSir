'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadModelTestData } from '@/utils/jsonLoader'
import Button from '@/components/ui/Button'
import QuickTools from '@/components/home/QuickTools'

type ExamStatus = 'not-started' | 'in-progress' | 'completed'

interface ModelTestMeta {
  id: string
  title: string
  categories: string[]
  totalQuestions: number
  totalMarks: number
  timeLimit: number
  passMark: number
  status: ExamStatus
  filename: string
}

const tabs = [
  { key: 'all', label: 'সব' },
  { key: 'bank', label: 'ব্যাংক' },
  { key: 'social-worker', label: 'সমাজকর্মী' },
  { key: 'ntrca', label: 'NTRCA / প্রাইমারি' },
  { key: 'bcs', label: 'BCS' },
  { key: 'grade-12-20', label: '১২-২০ তম গ্রেড' }
]

const sortOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'marks', label: 'Full Marks' }
]

const statusConfig: Record<ExamStatus, { label: string; className: string }> = {
  'not-started': { label: 'Not Started', className: 'bg-slate-100 text-slate-600' },
  'in-progress': { label: 'In Progress', className: 'bg-amber-100 text-amber-700' },
  'completed': { label: 'Completed', className: 'bg-emerald-100 text-emerald-700' }
}

const categoryBadgeColors: Record<string, string> = {
  'social-worker': 'bg-purple-100 text-purple-700',
  'bank': 'bg-blue-100 text-blue-700',
  'bcs': 'bg-indigo-100 text-indigo-700',
  'ntrca': 'bg-emerald-100 text-emerald-700',
  'grade-12-20': 'bg-orange-100 text-orange-700',
  'combined': 'bg-teal-100 text-teal-700'
}

const modelTests: ModelTestMeta[] = [
  {
    id: 'dss-2016',
    title: 'DSS 2016 Question Bank',
    categories: ['social-worker'],
    totalQuestions: 70,
    totalMarks: 70,
    timeLimit: 60,
    passMark: 50,
    status: 'not-started',
    filename: 'dss2016QuestionBank.json'
  },
  {
    id: 'dss-2022',
    title: 'DSS 2022 Question Bank',
    categories: ['social-worker'],
    totalQuestions: 70,
    totalMarks: 70,
    timeLimit: 60,
    passMark: 50,
    status: 'not-started',
    filename: 'dss2022QuestionBank.json'
  },
  {
    id: 'dss-demo-1',
    title: 'DSS Demo Model Test 1',
    categories: ['ntrca', 'social-worker'],
    totalQuestions: 70,
    totalMarks: 70,
    timeLimit: 45,
    passMark: 40,
    status: 'completed',
    filename: 'dssDemo1QuestionBank.json'
  },
  {
    id: 'combined-model-test',
    title: 'Combined Model Test',
    categories: ['combined', 'social-worker', 'bcs'],
    totalQuestions: 70,
    totalMarks: 70,
    timeLimit: 90,
    passMark: 50,
    status: 'in-progress',
    filename: 'combinedModelTest.json'
  }
]

export default function ModelTestPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [loadingFilename, setLoadingFilename] = useState<string | null>(null)

  const filteredTests = React.useMemo(() => {
    let tests = [...modelTests]

    if (activeTab !== 'all') {
      tests = tests.filter((test) => test.categories.includes(activeTab))
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      tests = tests.filter(
        (test) =>
          test.title.toLowerCase().includes(query) ||
          test.categories.some((cat) => cat.toLowerCase().includes(query))
      )
    }

    switch (sortBy) {
      case 'popular':
        tests.sort((a, b) => b.totalQuestions - a.totalQuestions)
        break
      case 'marks':
        tests.sort((a, b) => b.totalMarks - a.totalMarks)
        break
      case 'latest':
      default:
        tests.sort((a, b) => a.id.localeCompare(b.id))
        break
    }

    return tests
  }, [activeTab, searchQuery, sortBy])

  const handleStartExam = async (filename: string) => {
    setLoadingFilename(filename)
    try {
      const examData = await loadModelTestData(filename)
      sessionStorage.setItem('currentExamData', JSON.stringify(examData))
      router.push(`/exam/${encodeURIComponent(filename)}`)
    } catch (error) {
      console.error('Failed to load exam data:', error)
      alert('পরীক্ষার ডেটা লোড করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।')
    } finally {
      setLoadingFilename(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="pt-6">
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Model Test</h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            মডেল টেস্টে অংশগ্রহণ করুন এবং আপনার প্রস্তুতি যাচাই করুন। নিচের কার্ডগুলোতে ক্লিক করুন বা পরীক্ষা শুরু করুন বাটনে ট্যাপ করুন।
          </p>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white font-medium px-4 py-2 rounded-xl'
                    : 'bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl'
                }
              >
                {tab.label}
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
              placeholder="মডেল টেস্ট খুঁজুন..."
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

        {filteredTests.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">কোন মডেল টেস্ট পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredTests.map((test) => {
              const status = statusConfig[test.status]
              const primaryCategory = test.categories[0]
              const badgeColor = categoryBadgeColors[primaryCategory] || 'bg-slate-100 text-slate-600'
              const categoryLabel = tabs.find((t) => t.key === primaryCategory)?.label || primaryCategory

              return (
                <div
                  key={test.id}
                  className="flex flex-col rounded-2xl p-5 border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-slate-900">{test.title}</h3>
                    <span
                      className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
                    >
                      {categoryLabel}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-xs text-slate-500">Questions</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{test.totalQuestions}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-xs text-slate-500">Full Marks</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{test.totalMarks}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-xs text-slate-500">Time Limit</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{test.timeLimit} mins</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-xs text-slate-500">Pass Mark</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{test.passMark}%</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                    <Button
                      variant="primary"
                      className="h-11 px-5 text-xs sm:text-sm"
                      onClick={() => handleStartExam(test.filename)}
                      disabled={loadingFilename === test.filename}
                    >
                      {loadingFilename === test.filename ? 'Loading...' : 'Start Exam'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <QuickTools />
    </div>
  )
}
