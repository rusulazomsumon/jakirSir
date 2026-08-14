'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ExamData, Question } from '@/types/exam'
import { calculateResults, calculateSimulatedRank, ExamResult, SimulatedRank } from '@/utils/examEngine'
import { formatTime, toBanglaNum } from '@/utils/formatters'
import Button from '@/components/ui/Button'
import ExamHeader from '@/components/ExamHeader'
import Modal from '@/components/ui/Modal'

type Step = 'RULES_INTRO' | 'EXAM_RUNNING' | 'RESULT_ANALYTICS'

type ExamContainerProps = {
  examData: ExamData
}

export default function ExamContainer({ examData }: ExamContainerProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('RULES_INTRO')
  const [candidateName, setCandidateName] = useState('')
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const questions: Question[] = examData.questions
  const examInfo = examData.examInfo
  const durationMinutes = examInfo.durationMinutes ?? 60
  const totalSeconds = durationMinutes * 60

  const handleStartExam = () => {
    if (!candidateName.trim()) return
    setStep('EXAM_RUNNING')
    setElapsedSeconds(0)
    setUserAnswers({})
    setIsSubmitting(false)
    setShowConfirm(false)
  }

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }))
  }

  const handleSubmitExam = () => {
    setIsSubmitting(true)
    setStep('RESULT_ANALYTICS')
  }

  const handleBackToHome = () => {
    router.push('/')
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const result: ExamResult | null = useMemo(() => {
    if (step !== 'RESULT_ANALYTICS') return null
    return calculateResults(questions, userAnswers, examInfo, elapsedSeconds)
  }, [step, questions, userAnswers, examInfo, elapsedSeconds])

  const simulatedRank: SimulatedRank | null = useMemo(() => {
    if (!result) return null
    const totalMarks = Number(examInfo.totalMarks) || questions.length
    return calculateSimulatedRank(result.totalScore, totalMarks, examInfo.cutMark ?? 49)
  }, [result, examInfo, questions.length])

  const remainingSeconds = useMemo(() => {
    return Math.max(0, totalSeconds - elapsedSeconds)
  }, [elapsedSeconds, totalSeconds])

  const answeredCount = Object.keys(userAnswers).length

  const cutMark = examInfo.cutMark ?? 49
  const isPassed = result ? result.totalScore >= cutMark : false

  useEffect(() => {
    if (step !== 'EXAM_RUNNING') return
    const intervalId = window.setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= totalSeconds) {
          window.clearInterval(intervalId)
          return prev
        }
        return prev + 1
      })
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [step, totalSeconds])

  useEffect(() => {
    if (step === 'EXAM_RUNNING' && elapsedSeconds >= totalSeconds && !isSubmitting) {
      handleSubmitExam()
    }
  }, [step, elapsedSeconds, totalSeconds, isSubmitting])

  useEffect(() => {
    if (step === 'RESULT_ANALYTICS') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [step])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {step === 'RULES_INTRO' && (
        <section className="pt-6">
          <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{examInfo.examName}</h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              পরীক্ষার নিয়মাবলী পড়ে নিশ্চিত করুন এবং আপনার নাম লিখে পরীক্ষা শুরু করুন।
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900">পরীক্ষার নিয়মাবলী</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• মোট প্রশ্ন: {toBanglaNum(examInfo.totalQuestions)} টি</li>
              <li>• পূর্ণমান: {toBanglaNum(Number(examInfo.totalMarks) || examInfo.totalMarks)}</li>
              <li>• সময়সীমা: {toBanglaNum(durationMinutes)} মিনিট</li>
              <li>• পাস মার্ক: {toBanglaNum(examInfo.cutMark ?? 49)}</li>
              <li>• নেগেটিভ মার্ক: {toBanglaNum(examInfo.negativeMarkPerWrong ?? 0.5)} করে</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <label className="block text-sm font-medium text-slate-700">আপনার নাম লিখুন</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="নাম প্রবেশ করুন"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
            <Button
              variant="primary"
              className="mt-4 w-full sm:w-auto"
              onClick={handleStartExam}
              disabled={!candidateName.trim()}
            >
              পরীক্ষা শুরু করুন
            </Button>
          </div>
        </section>
      )}

      {step === 'EXAM_RUNNING' && (
        <>
          <ExamHeader remainingSeconds={remainingSeconds} onTimeUp={handleSubmitExam} />

          <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 pt-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur-md shadow-sm border border-[#EADBFF] rounded-2xl p-4 mb-4 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">বাকি সময়</p>
                  <p className="text-lg font-semibold text-slate-900">{formatTime(remainingSeconds)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">উত্তর প্রদান</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {toBanglaNum(answeredCount)} / {toBanglaNum(questions.length)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((question, idx) => {
                const selected = userAnswers[question.id]
                return (
                  <div key={question.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                        {toBanglaNum(idx + 1)}. {question.q}
                      </h3>
                      <span className="inline-flex w-fit rounded-full bg-purple-100 px-3 py-1 text-[11px] font-semibold text-purple-700">
                        {question.subject} • {question.topics}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3">
                      {question.options.map((option, optIdx) => {
                        const isSelected = selected === optIdx
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectAnswer(question.id, optIdx)}
                            className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 bg-white hover:border-blue-300'
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-slate-300 text-slate-500'
                              }`}
                            >
                              {isSelected ? '✓' : String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{option}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="w-full py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-2xl shadow-md text-base mt-6 mb-12 transition-all"
            >
              পরীক্ষা সাবমিট করুন
            </button>

            <Modal open={showConfirm} onClose={() => setShowConfirm(false)}>
              <div className="p-2">
                <h3 className="text-lg font-semibold text-slate-900">পরীক্ষা জমা দিন</h3>
                <p className="mt-2 text-sm text-slate-600">আপনি কি নিশ্চিত যে আপনি পরীক্ষা সাবমিট করতে চান?</p>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 rounded-2xl border border-slate-200 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    বাতিল
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirm(false)
                      handleSubmitExam()
                    }}
                    className="flex-1 rounded-2xl bg-[#2563EB] py-3 text-sm font-bold text-white transition hover:bg-[#1D4ED8]"
                  >
                    জমা দিন
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </>
      )}

      {step === 'RESULT_ANALYTICS' && result && simulatedRank && (
        <section className="pt-6">
          <div className="w-full border border-[#EADBFF] rounded-2xl overflow-hidden bg-white">
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">পরীক্ষার ফলাফল</h1>
                <p className="mt-1 text-sm text-slate-500">
                  {candidateName}, আপনার পরীক্ষার ফলাফল নিচে দেওয়া হলো।
                </p>
              </div>
              <span
                className={`shrink-0 px-4 py-1.5 rounded-full font-bold ${
                  isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {isPassed ? 'পাস' : 'অকৃতকার্য'}
              </span>
            </div>

            <div className="border-t border-[#EADBFF]">
              <div className="flex items-center justify-between px-5 py-3 sm:px-6 odd:bg-white even:bg-slate-50">
                <span className="text-sm text-slate-600">প্রাপ্ত নম্বর</span>
                <span className="text-sm font-semibold text-slate-900">{toBanglaNum(result.totalScore.toFixed(2))}</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3 sm:px-6 odd:bg-white even:bg-slate-50">
                <span className="text-sm text-slate-600">সঠিক উত্তর</span>
                <span className="text-sm font-semibold text-slate-900">{toBanglaNum(result.totalCorrect)}</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3 sm:px-6 odd:bg-white even:bg-slate-50">
                <span className="text-sm text-slate-600">ভুল উত্তর</span>
                <span className="text-sm font-semibold text-slate-900">{toBanglaNum(result.totalWrong)}</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3 sm:px-6 odd:bg-white even:bg-slate-50">
                <span className="text-sm text-slate-600">উত্তর দেওয়া হয়নি</span>
                <span className="text-sm font-semibold text-slate-900">{toBanglaNum(result.totalSkipped)}</span>
              </div>
              <div className="flex items-center justify-between px-5 py-3 sm:px-6 odd:bg-white even:bg-slate-50">
                <span className="text-sm text-slate-600">সঠিকতার হার (Accuracy)</span>
                <span className="text-sm font-semibold text-slate-900">{toBanglaNum(result.accuracy.toFixed(2))}%</span>
              </div>
            </div>

            <div className="border-t border-[#EADBFF] px-5 py-4 sm:px-6">
              <p className="text-sm font-semibold text-slate-900">
                আপনার র‍্যাঙ্ক হলো: {toBanglaNum(simulatedRank.rank)}/{toBanglaNum(simulatedRank.totalParticipants)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Top {simulatedRank.percentile.toFixed(1)}%</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">Answer Key</h3>
            <div className="mt-4 space-y-2">
              {questions.map((question, idx) => {
                const userAnswer = userAnswers[question.id]
                const isCorrect = userAnswer === question.ans
                const isSkipped = userAnswer === undefined
                return (
                  <div
                    key={question.id}
                    className={`rounded-xl border p-3 text-sm ${
                      isSkipped
                        ? 'border-slate-200 bg-slate-50'
                        : isCorrect
                        ? 'border-emerald-200 bg-emerald-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <p className="font-medium text-slate-900">
                      {toBanglaNum(idx + 1)}. {question.q}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Your answer: {isSkipped ? 'Skipped' : `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}`}
                    </p>
                    <p className="text-xs text-slate-600">
                      Correct: {String.fromCharCode(65 + question.ans)}. {question.options[question.ans]}
                    </p>
                    {question.explain && (
                      <div className="mt-3 p-3 bg-slate-50 border-l-4 border-[#2563EB] rounded-r-xl text-xs sm:text-sm text-slate-700 font-medium">
                        <span className="font-bold text-[#2563EB]">ব্যাখ্যা: </span>
                        {question.explain}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleBackToHome}
            className="w-full rounded-2xl bg-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#1D4ED8]"
          >
            হোমে ফিরে যান
          </button>
        </section>
      )}
    </div>
  )
}
