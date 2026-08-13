'use client'

import { useEffect, useMemo, useState } from 'react'
import { ExamData, Question } from '@/types/exam'
import { calculateResults, calculateSimulatedRank, ExamResult, SimulatedRank } from '@/utils/examEngine'
import { formatTime, toBanglaNum } from '@/utils/formatters'
import Button from '@/components/ui/Button'

type Step = 'RULES_INTRO' | 'EXAM_RUNNING' | 'RESULT_ANALYTICS'

type ExamContainerProps = {
  examData: ExamData
}

export default function ExamContainer({ examData }: ExamContainerProps) {
  const [step, setStep] = useState<Step>('RULES_INTRO')
  const [candidateName, setCandidateName] = useState('')
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({})
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const questions: Question[] = examData.questions
  const examInfo = examData.examInfo
  const durationMinutes = examInfo.durationMinutes ?? 60
  const totalSeconds = durationMinutes * 60

  const handleStartExam = () => {
    if (!candidateName.trim()) return
    setStep('EXAM_RUNNING')
    setElapsedSeconds(0)
    setUserAnswers({})
    setCurrentQuestionIndex(0)
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

  const currentQuestion: Question | undefined = questions[currentQuestionIndex]

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
              <li>• ভুল অনুযায়ী কাট: {toBanglaNum(examInfo.negativeMarkPerWrong ?? 0.5)} করে</li>
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

      {step === 'EXAM_RUNNING' && currentQuestion && (
        <section className="pt-6">
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div>
              <p className="text-xs text-slate-500">বাকি সময়</p>
              <p className="text-lg font-semibold text-slate-900">{formatTime(remainingSeconds)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">প্রশ্ন</p>
              <p className="text-lg font-semibold text-slate-900">
                {toBanglaNum(currentQuestionIndex + 1)} / {toBanglaNum(questions.length)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-xs font-medium text-slate-500">
              {currentQuestion.subject} • {currentQuestion.topics}
            </p>
            <h3 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
              {currentQuestion.q}
            </h3>

            <div className="mt-4 grid gap-3">
              {currentQuestion.options.map((option, idx) => {
                const selected = userAnswers[currentQuestion.id] === idx
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(currentQuestion.id, idx)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="primary"
                  className="w-full sm:w-auto"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full sm:w-auto"
                  onClick={handleSubmitExam}
                >
                  Submit Exam
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {step === 'RESULT_ANALYTICS' && result && simulatedRank && (
        <section className="pt-6">
          <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Result</h1>
            <p className="mt-2 text-sm text-slate-500">
              {candidateName}, আপনার পরীক্ষার ফলাফল নিচে দেওয়া হলো।
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Score</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{result.totalScore.toFixed(2)}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Correct</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{toBanglaNum(result.totalCorrect)}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Wrong</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{toBanglaNum(result.totalWrong)}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Skipped</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{toBanglaNum(result.totalSkipped)}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Accuracy</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{result.accuracy.toFixed(2)}%</p>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-xs text-slate-500">Rank</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                #{toBanglaNum(simulatedRank.rank)} / {toBanglaNum(simulatedRank.totalParticipants)}
              </p>
              <p className="mt-1 text-xs text-slate-500">Top {simulatedRank.percentile.toFixed(1)}%</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">Answer Key</h3>
            <div className="mt-4 space-y-2">
              {questions.map((question, idx) => {
                const userAnswer = userAnswers[idx]
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
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
