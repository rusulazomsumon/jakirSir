"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '@/components/ui/Modal'
import { loadQuestionsForSubject } from '@/utils/miniQuizBank'
import { useQuiz } from '@/hooks/useQuiz'

type MiniQuizProps = {
  subject: string
  onClose: () => void
}

const SUBJECT_NAMES: Record<string, string> = {
  bangla: 'বাংলা',
  english: 'ইংরেজি',
  math: 'গণিত',
  gk: 'সাধারণ জ্ঞান',
}

const TOTAL_SECONDS = 15 * 60
const PASS_PERCENT = 70

export default function MiniQuiz({ subject, onClose }: MiniQuizProps) {
  const [questions, setQuestions] = useState<ReturnType<typeof useQuiz>['questions']>([])
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string | number, number>>({})
  const quiz = useQuiz(questions)

  const timeLeft = TOTAL_SECONDS - quiz.timer
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const answeredCount = useMemo(
    () => Object.keys(selectedAnswers).length,
    [selectedAnswers]
  )

  const skippedCount = useMemo(
    () => Math.max(0, questions.length - answeredCount),
    [questions.length, answeredCount]
  )

  const scorePercent = useMemo(() => {
    if (!quiz.questions.length) return 0
    return Math.round((quiz.score / quiz.questions.length) * 100)
  }, [quiz.score, quiz.questions.length])

  const passed = scorePercent >= PASS_PERCENT

  const idToIndex = useMemo(() => {
    const map = new Map<string | number, number>()
    questions.forEach((q, idx) => map.set(q.id ?? idx, idx))
    return map
  }, [questions])

  const handleSelect = useCallback((qid: string | number, optionIndex: number) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev }
      next[qid] = optionIndex
      return next
    })
    const idx = idToIndex.get(qid)
    if (idx !== undefined) {
      quiz.selectAnswer(optionIndex, idx)
    }
  }, [idToIndex, quiz.selectAnswer])

  const openConfirm = useCallback(() => {
    setConfirmOpen(true)
  }, [])

  const handleConfirmSubmit = useCallback(() => {
    setConfirmOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    quiz.submit()
    setSubmitted(true)
  }, [quiz.submit])

  const handleRetry = useCallback(() => {
    setSubmitted(false)
    setSelectedAnswers({})
    quiz.reset()
  }, [quiz.reset])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setSubmitted(false)
    setSelectedAnswers({})
    loadQuestionsForSubject(subject)
      .then((qs) => {
        if (!cancelled) {
          setQuestions(qs)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [subject])

  useEffect(() => {
    if (submitted || questions.length === 0) return undefined
    if (timeLeft <= 0) {
      handleConfirmSubmit()
    }
  }, [timeLeft, submitted, questions.length, handleConfirmSubmit])

  const toBangla = (n: number) => {
    const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return String(n).split('').map((d) => bn[Number(d)] ?? d).join('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="p-4 border-b bg-white shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-textPrimary">
                {SUBJECT_NAMES[subject] || subject} — মিনি কুইজ
              </h3>
              <p className="text-xs text-textSecondary">১৫ মিনিট | নেগেটিভ মার্ক: ০% | পাস মার্ক: ৭০%</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {!submitted && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-textSecondary">বাকি সময়</span>
                <span className={`font-mono text-lg font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-textPrimary'}`}>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
              </div>
              <div className="text-sm text-textSecondary">
                উত্তর প্রদান: <span className="font-semibold text-textPrimary">{answeredCount} / {quiz.questions.length}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="py-12 text-center text-textSecondary">
              প্রশ্ন লোড হচ্ছে...
            </div>
          )}

          {!loading && questions.length === 0 && (
            <div className="py-12 text-center text-textSecondary">
              এই বিষয়ে কোনো প্রশ্ন পাওয়া যায়নি।
            </div>
          )}

          {!loading && questions.length > 0 && !submitted && (
            <div className="space-y-4">
              {questions.map((q, idx) => {
                const selected = selectedAnswers[q.id ?? idx]
                const categoryLabel = SUBJECT_NAMES[subject] || subject
                return (
                  <div key={q.id ?? idx} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-textPrimary">
                        {toBangla(idx + 1)}.
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-textSecondary font-medium">
                        {categoryLabel} • {q.options.length} অপশন
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-textPrimary leading-relaxed mb-4">
                      {q.question}
                    </h4>
                    <div className="grid gap-3">
                      {q.options.map((option, optionIdx) => {
                        const isSelected = selected === optionIdx
                        return (
                          <button
                            key={optionIdx}
                            onClick={() => handleSelect(q.id ?? idx, optionIdx)}
                            className={`w-full text-left min-h-[52px] rounded-2xl px-4 py-3 border transition ${
                              isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'
                            }`}
                          >
                            <span className="text-sm font-semibold text-textPrimary">
                              {String.fromCharCode(65 + optionIdx)}.
                            </span>{' '}
                            <span className="text-sm text-textPrimary">{option}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

              <button
                onClick={openConfirm}
                className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-[#2563EB] text-white text-sm font-semibold shadow-lg hover:bg-[#1D4ED8] transition-colors"
              >
                পরীক্ষা সাবমিট করুন
              </button>
            </div>
          )}

          {!loading && submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="text-center">
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {passed ? '✓' : '✗'}
                </div>
                <h4 className="mt-4 text-xl font-semibold text-textPrimary">
                  অভিনন্দন, <span className="font-bold text-[#2563EB]">শিক্ষার্থী</span>!
                </h4>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {passed ? 'পাস' : 'অকৃতকার্য'}
                  </span>
                  <span className="text-sm text-textSecondary">{SUBJECT_NAMES[subject] || subject} — {toBangla(quiz.questions.length)} টি প্রশ্ন</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-textSecondary">প্রাপ্ত নম্বর</td>
                      <td className="px-4 py-3 text-right font-semibold text-textPrimary">{toBangla(quiz.score)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-textSecondary">সঠিক উত্তর</td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">{toBangla(quiz.score)}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-textSecondary">ভুল উত্তর</td>
                      <td className="px-4 py-3 text-right font-semibold text-red-600">{toBangla(quiz.questions.length - quiz.score - skippedCount)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-textSecondary">উত্তর দেওয়া হয়নি</td>
                      <td className="px-4 py-3 text-right font-semibold text-orange-600">{toBangla(skippedCount)}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-4 py-3 text-textSecondary">সঠিকতার হার</td>
                      <td className="px-4 py-3 text-right font-semibold text-textPrimary">{toBangla(scorePercent)}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className={`rounded-2xl border p-4 text-center text-sm ${passed ? 'border-green-100 bg-green-50 text-green-700' : 'border-red-100 bg-red-50 text-red-700'}`}>
                {passed
                  ? 'অভিনন্দন! আপনি পাস করেছেন।'
                  : 'দুঃখিত, আপনাকে আরও অনুশীলন করতে হবে। পাস করার জন্য ৭০% নিচে নয়।'}
              </div>

              <div>
                <h3 className="text-base font-semibold text-textPrimary mb-3">ব্যাখ্যাসহ সঠিক উত্তর</h3>
                <div className="space-y-4">
                  {questions.map((q, idx) => {
                    const userAnswerIndex = selectedAnswers[q.id ?? idx]
                    const isCorrect = userAnswerIndex === q.answer
                    const isSkipped = userAnswerIndex === undefined || userAnswerIndex === null
                    return (
                      <div key={q.id ?? idx} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-textPrimary">
                            {toBangla(idx + 1)}.
                          </span>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isSkipped ? 'bg-orange-100 text-orange-700' : isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {isSkipped ? 'উত্তর দেওয়া হয়নি' : isCorrect ? 'সঠিক' : 'ভুল'}
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-textPrimary leading-relaxed mb-3">
                          {q.question}
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <span className="font-semibold text-green-700 mt-0.5">সঠিক উত্তর:</span>
                            <span className="text-textPrimary">{String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}</span>
                          </div>
                          {!isSkipped && (
                            <div className="flex items-start gap-2 text-sm">
                              <span className={`font-semibold mt-0.5 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>আপনার উত্তর:</span>
                              <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{String.fromCharCode(65 + userAnswerIndex)}. {q.options[userAnswerIndex]}</span>
                            </div>
                          )}
                        </div>
                        {q.explain && (
                          <div className="mt-3 p-3 bg-slate-50 border-l-4 border-[#2563EB] rounded-r-xl text-xs sm:text-sm text-slate-700 font-medium">
                            <span className="font-bold text-[#2563EB]">ব্যাখ্যা: </span>
                            {q.explain}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-border bg-white text-sm font-medium text-textSecondary"
                >
                  Close
                </button>
                <button
                  onClick={handleRetry}
                  className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-4 text-sm font-semibold text-white"
                >
                  Retry
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-textPrimary mb-2">সাবমিশন কনফার্ম</h3>
          <p className="text-sm text-textSecondary mb-5">
            আপনি কি নিশ্চিত যে পরীক্ষা জমা দিতে চান?
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setConfirmOpen(false)}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-border bg-white text-sm font-medium text-textSecondary"
            >
              বাতিল
            </button>
            <button
              onClick={handleConfirmSubmit}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#2563EB] text-sm font-semibold text-white"
            >
              হ্যাঁ, সাবমিট করুন
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
