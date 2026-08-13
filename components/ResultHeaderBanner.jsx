'use client'

import React from 'react'
import { ExamInfo, ExamResult } from '@/types/exam'
import { formatTime, toBanglaNum } from '@/utils/formatters'

type ResultHeaderBannerProps = {
  examResult: ExamResult
  examInfo: ExamInfo
  totalQuestions: number
  totalMarks: number
}

export default function ResultHeaderBanner({ examResult, examInfo, totalQuestions, totalMarks }: ResultHeaderBannerProps) {
  const { totalScore, totalCorrect, totalWrong, totalSkipped, timeSpentSeconds } = examResult
  const cutMark = examInfo.cutMark ?? 49
  const isPassed = totalScore >= cutMark

  const now = new Date()
  const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`
  const hours = now.getHours()
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  const formattedTime = `${displayHours}:${minutes} ${ampm}`

  const correctPercent = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(0) : 0
  const wrongPercent = totalQuestions > 0 ? ((totalWrong / totalQuestions) * 100).toFixed(0) : 0

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl px-5 py-4 text-center font-semibold text-white shadow-sm ${
        isPassed ? 'bg-emerald-600' : 'bg-red-600'
      }`}>
        {isPassed ? '🎉 অভিনন্দন! আপনি উর্ত্তীর্ণ হয়েছেন' : '⚡ অল্পের জন্য মিস! আবার চেষ্টা করুন'}
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Category</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{examInfo.examType} / General</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Date & Time</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">
                {toBanglaNum(formattedDate)} | {toBanglaNum(formattedTime)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Your Score</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {totalScore.toFixed(2)} / {toBanglaNum(totalMarks)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Correct Answers</p>
              <p className="mt-1 text-sm font-semibold text-emerald-600">
                {toBanglaNum(totalCorrect)} ({toBanglaNum(correctPercent)}%)
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Wrong Answers</p>
              <p className="mt-1 text-sm font-semibold text-red-600">
                {toBanglaNum(totalWrong)} ({toBanglaNum(wrongPercent)}%)
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Skipped Questions</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{toBanglaNum(totalSkipped)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Cut Mark</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{toBanglaNum(cutMark)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Time Expended</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{formatTime(timeSpentSeconds)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
