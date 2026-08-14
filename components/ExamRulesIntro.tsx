'use client'

import React, { useState } from 'react'
import { ExamInfo } from '@/types/exam'
import { toBanglaNum } from '@/utils/formatters'
import Button from '@/components/ui/Button'

type ExamRulesIntroProps = {
  examInfo: ExamInfo
  onStartExam: (candidateName: string) => void
}

export default function ExamRulesIntro({ examInfo, onStartExam }: ExamRulesIntroProps) {
  const [candidateName, setCandidateName] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const durationMinutes = examInfo.durationMinutes ?? 60
  const totalQuestions = examInfo.totalQuestions
  const cutMark = examInfo.cutMark ?? 49
  const negativeMarkPerWrong = examInfo.negativeMarkPerWrong ?? 0.5

  const handleStart = () => {
    if (!candidateName.trim()) {
      setShowAlert(true)
      return
    }
    setShowAlert(false)
    onStartExam(candidateName.trim())
  }

  const rules = [
    { icon: '📋', label: 'পরীক্ষার নাম', value: examInfo.examName },
    { icon: '📅', label: 'তারিখ', value: 'N/A' },
    { icon: '❓', label: 'মোট প্রশ্ন', value: `${toBanglaNum(totalQuestions)} টি` },
    { icon: '⏱️', label: 'সময়', value: `${toBanglaNum(durationMinutes)} মিনিট` },
    { icon: '🎯', label: 'কাট মার্ক', value: toBanglaNum(cutMark) },
    {
      icon: '⚠️',
      label: 'নেগেটিভ মার্কিং',
      value: `প্রতিটি ভুলের জন্য ${toBanglaNum(negativeMarkPerWrong)} নম্বর কাটা যাবে!`
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <section className="pt-6">
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg">
          <div className="px-5 py-6 sm:px-8 sm:py-8 text-center">
            <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              {examInfo.examName}
            </h1>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                {examInfo.examType}
              </span>
              {examInfo.category ? (
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  {examInfo.category}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">পরীক্ষার্থীর তথ্য</h2>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-700">পরীক্ষার্থীর নাম</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => {
                setCandidateName(e.target.value)
                if (showAlert) setShowAlert(false)
              }}
              placeholder="আপনার নাম লিখুন"
              autoComplete="off"
              inputMode="text"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
            />
            {showAlert && (
              <p className="mt-2 text-xs text-red-600">অনুগ্রহ করে আপনার নাম লিখুন।</p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">পরীক্ষার নিয়মাবলী</h2>
          <ul className="mt-4 space-y-3">
            {rules.map((rule) => (
              <li key={rule.label} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="text-base leading-none">{rule.icon}</span>
                <div>
                  <span className="font-medium text-slate-900">{rule.label}: </span>
                  <span>{rule.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="primary"
            className="w-full sm:w-auto px-8"
            onClick={handleStart}
            disabled={!candidateName.trim()}
          >
            🚀 পরীক্ষা শুরু করো
          </Button>
        </div>
      </section>
    </div>
  )
}
