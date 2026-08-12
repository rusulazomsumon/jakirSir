'use client'

import { useMemo, useState } from 'react'
import Modal from '@/components/ui/Modal'
import { useQuiz } from '@/hooks/useQuiz'
import { liveMcqData } from '@/data/liveMcqData'

const subjectIcons: Record<string, string> = {
  bangla: 'ri-book-open-line',
  english: 'ri-english-input',
  math: 'ri-calculator-line',
  gk: 'ri-earth-line',
  computer: 'ri-computer-line',
  bank: 'ri-bank-line',
}

const subjects = Object.keys(liveMcqData)

const banglaFeedback = (scorePercent: number) => {
  if (scorePercent >= 90) return 'অসাধারণ! আপনি সত্যিকারের প্রস্তুত।'
  if (scorePercent >= 70) return 'খুব ভালো! একটু বেশি অনুশীলন করলে আরও ভালো হবে।'
  if (scorePercent >= 50) return 'ভালো হয়েছে, কিন্তু আরও অনুশীলন দরকার।'
  return 'দুঃখিত, আরও অধ্যবসায়ের প্রয়োজন।'
}

export default function LiveMcqModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [subjectKey, setSubjectKey] = useState<string | null>(null)
  const [topicKey, setTopicKey] = useState<string | null>(null)
  const [questions, setQuestions] = useState(liveMcqData.bangla.topics['সমাস'])
  const [quizSeed, setQuizSeed] = useState(0)

  const quiz = useQuiz(questions)

  const topicNames = useMemo(() => {
    if (!subjectKey) return []
    return Object.keys(liveMcqData[subjectKey].topics)
  }, [subjectKey])

  const selectedSubject = subjectKey ? liveMcqData[subjectKey] : null

  const startQuiz = () => {
    if (!subjectKey || !topicKey) return
    setQuestions(liveMcqData[subjectKey].topics[topicKey])
    setQuizSeed((prev) => prev + 1)
    setStep(3)
  }

  const resetFlow = () => {
    setStep(1)
    setSubjectKey(null)
    setTopicKey(null)
    setQuestions(liveMcqData.bangla.topics['সমাস'])
    setQuizSeed((prev) => prev + 1)
    quiz.reset()
  }

  const scorePercent = useMemo(() => {
    if (!quiz.questions.length) return 0
    return Math.round((quiz.score / quiz.questions.length) * 100)
  }, [quiz.score, quiz.questions.length])

  return (
    <Modal open={open} onClose={() => { onClose(); resetFlow() }}>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Live MCQ পরীক্ষা</h3>
            <p className="text-sm text-slate-500">৪ ধাপে প্রশ্নের উত্তর দিন এবং ফলাফল দেখুন</p>
          </div>
          <button className="text-sm text-slate-500" onClick={() => { onClose(); resetFlow() }}>
            Close
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500">একটি বিষয় নির্বাচন করুন</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {subjects.map((key) => {
                const subject = liveMcqData[key]
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSubjectKey(key)
                      setTopicKey(null)
                      setStep(2)
                    }}
                    className="rounded-[20px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-600"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                        <i className={`${subjectIcons[key] ?? 'ri-folder-3-line'} text-2xl`} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">বিষয়</p>
                        <h4 className="mt-1 text-base font-semibold text-slate-900">{subject.name}</h4>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === 2 && selectedSubject && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">বিষয়: {selectedSubject.name}</p>
                <h4 className="text-lg font-semibold text-slate-900">টপিক নির্বাচন করুন</h4>
              </div>
              <button className="text-sm text-blue-600" onClick={() => setStep(1)}>
                বদলান
              </button>
            </div>
            <div className="grid gap-3">
              {topicNames.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setTopicKey(topic)}
                  className={`w-full rounded-[18px] border px-4 py-4 text-left transition ${topicKey === topic ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-500'}`}
                >
                  <span className="text-sm font-semibold text-slate-900">{topic}</span>
                  <p className="mt-1 text-xs text-slate-500">{liveMcqData[subjectKey!].topics[topic].length} টি প্রশ্ন</p>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setStep(1)} className="inline-flex h-11 items-center justify-center rounded-[16px] border border-slate-200 px-4 text-sm text-slate-700">
                Back
              </button>
              <button
                disabled={!topicKey}
                onClick={startQuiz}
                className="inline-flex h-11 items-center justify-center rounded-[16px] bg-blue-600 px-4 text-sm font-semibold text-white disabled:opacity-50"
              >
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div key={quizSeed} className="space-y-4">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Timer</span>
                <span>{Math.floor(quiz.timer / 60).toString().padStart(2, '0')}:{(quiz.timer % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${quiz.progressPercentage}%` }} />
              </div>
            </div>
            <div className="space-y-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">প্রশ্ন {quiz.current + 1} / {quiz.questions.length}</p>
                  <h4 className="mt-2 text-base font-semibold text-slate-900">{quiz.questions[quiz.current]?.question}</h4>
                </div>
                <div className="text-sm font-semibold text-blue-600">{quiz.progressPercentage}%</div>
              </div>
              <div className="grid gap-3">
                {quiz.questions[quiz.current]?.options.map((option, index) => {
                  const selected = quiz.answers[quiz.current] === index
                  return (
                    <button
                      key={option}
                      onClick={() => quiz.selectAnswer(index)}
                      className={`w-full rounded-[18px] border px-4 py-4 text-left transition ${selected ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-600'}`}
                    >
                      <span className="text-sm font-semibold text-slate-900">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                disabled={quiz.current === 0}
                onClick={quiz.prev}
                className="inline-flex h-11 w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white text-sm text-slate-700 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                disabled={quiz.current === quiz.questions.length - 1}
                onClick={quiz.next}
                className="inline-flex h-11 w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white text-sm text-slate-700 disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => {
                  quiz.submit()
                  setStep(4)
                }}
                className="inline-flex h-11 w-full items-center justify-center rounded-[16px] bg-blue-600 text-sm font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">✓</div>
              <h4 className="mt-4 text-xl font-semibold text-slate-900">আপনার ফলাফল</h4>
              <p className="mt-2 text-sm text-slate-500">{selectedSubject?.name} - {topicKey}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[16px] border border-slate-200 p-4 text-center">
                <p className="text-xs text-slate-500">Score</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{quiz.score}</p>
              </div>
              <div className="rounded-[16px] border border-slate-200 p-4 text-center">
                <p className="text-xs text-slate-500">Total</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{quiz.questions.length}</p>
              </div>
              <div className="rounded-[16px] border border-slate-200 p-4 text-center">
                <p className="text-xs text-slate-500">Percent</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{scorePercent}%</p>
              </div>
            </div>
            <div className="rounded-[20px] border border-blue-100 bg-blue-50 p-4 text-center text-sm text-blue-700">
              {banglaFeedback(scorePercent)}
            </div>
            <button
              onClick={() => {
                resetFlow()
                setStep(1)
              }}
              className="inline-flex h-11 w-full items-center justify-center rounded-[16px] bg-blue-600 text-sm font-semibold text-white"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
