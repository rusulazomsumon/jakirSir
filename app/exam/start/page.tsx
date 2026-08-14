'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ExamData } from '@/types/exam'
import { loadModelTestData } from '@/utils/jsonLoader'
import { loadTopicExamData } from '@/app/actions/topicLoader'
import ExamContainer from '@/components/ExamContainer'

export default function ExamStartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject') || 'bangla'
  const topic = searchParams.get('topic') || 'General'
  const [examData, setExamData] = useState<ExamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadExamData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        let data: ExamData
        if (topic && topic !== 'General') {
          data = await loadTopicExamData(subject, topic)
        } else {
          const fileName = 'combinedModelTest.json'
          data = await loadModelTestData(fileName)
        }

        if (isMounted) {
          setExamData(data)
          sessionStorage.setItem('currentExamData', JSON.stringify(data))
        }
      } catch (err) {
        if (isMounted) {
          setError('পরীক্ষার ডেটা লোড করতে ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।')
          console.error('Failed to load exam data:', err)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadExamData()

    return () => {
      isMounted = false
    }
  }, [subject, topic])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-slate-500">পরীক্ষার ডেটা লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  if (error || !examData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-red-600">{error || 'ডেটা পাওয়া যায়নি।'}</p>
          <button
            type="button"
            onClick={() => {
              router.push('/mock-test')
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }}
            className="mt-4 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            মক টেস্টে ফিরে যান
          </button>
        </div>
      </div>
    )
  }

  return <ExamContainer examData={examData} />
}
