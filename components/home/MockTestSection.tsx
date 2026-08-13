'use client'

import { useMemo, useState } from 'react'
import { useQuiz, QuizQuestion } from '@/hooks/useQuiz'
import { liveMcqData } from '@/data/liveMcqData'
import Button from '@/components/ui/Button'

const flattenQuestions = (): QuizQuestion[] => {
  return Object.values(liveMcqData).flatMap((subject) =>
    Object.values(subject.topics).flatMap((topic) => topic)
  )
}

const getRandomQuestions = (all: QuizQuestion[], count = 10) => {
  const shuffled = [...all].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export default function MockTestSection() {
  const [name, setName] = useState('')
  const [started, setStarted] = useState(false)
  const allQuestions = useMemo(() => flattenQuestions(), [])
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const quiz = useQuiz(quizQuestions)

  const startQuiz = () => {
    const selection = getRandomQuestions(allQuestions, 10)
    setQuizQuestions(selection)
    setStarted(true)
  }

  const scorePercent = useMemo(() => {
    if (!quiz.questions.length) return 0
    return Math.round((quiz.score / quiz.questions.length) * 100)
  }, [quiz.score, quiz.questions.length])

  const performanceBadge = useMemo(() => {
    if (scorePercent >= 90) return { label: 'Excellent', className: 'bg-emerald-100 text-emerald-700' }
    if (scorePercent >= 70) return { label: 'Great', className: 'bg-blue-100 text-blue-700' }
    if (scorePercent >= 50) return { label: 'Good', className: 'bg-amber-100 text-amber-700' }
    return { label: 'Keep Practicing', className: 'bg-rose-100 text-rose-700' }
  }, [scorePercent])

  return (
    <section className="pt-6" id="mockTestSection">
      <div className="rounded-[20px] border border-border bg-white p-5 shadow-card">
        {!started ? (
          <div className="space-y-4">
            <div>
               <h3 className="text-[22px] font-semibold">Mock Test Preparation</h3>
              <p className="mt-2 text-sm text-textSecondary">আপনার নাম লিখুন এবং ১০ টি প্রশ্নের র‍্যান্ডম কুইজ শুরু করুন।</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="rounded-[16px] border border-border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <Button
                variant="primary"
                className="w-full sm:w-auto"
                onClick={startQuiz}
                disabled={!name.trim()}
              >
                Start Quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex flex-col gap-3 rounded-[20px] border border-border bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-textSecondary">Name</p>
                <p className="font-semibold">{name}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-[16px] bg-white p-3 text-center shadow-sm">
                  <p className="text-xs text-textSecondary">Progress</p>
                  <p className="mt-1 font-semibold">{quiz.current + 1}/{quiz.questions.length}</p>
                </div>
                <div className="rounded-[16px] bg-white p-3 text-center shadow-sm">
                  <p className="text-xs text-textSecondary">Score</p>
                  <p className="mt-1 font-semibold">{quiz.score}</p>
                </div>
                <div className="rounded-[16px] bg-white p-3 text-center shadow-sm">
                  <p className="text-xs text-textSecondary">Time</p>
                  <p className="mt-1 font-semibold">{Math.floor(quiz.timer / 60).toString().padStart(2, '0')}:{(quiz.timer % 60).toString().padStart(2, '0')}</p>
                </div>
              </div>
            </div>

            {quiz.questions.length > 0 && !quiz.submitted ? (
              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-sm text-textSecondary">প্রশ্ন {quiz.current + 1} / {quiz.questions.length}</div>
                  <h4 className="text-lg font-semibold text-textPrimary">{quiz.questions[quiz.current].question}</h4>
                </div>
                <div className="grid gap-3">
                  {quiz.questions[quiz.current].options.map((option, idx) => {
                    const selected = quiz.answers[quiz.current] === idx
                    return (
                       <button
                         key={option}
                         onClick={() => quiz.selectAnswer(idx)}
                         className={`w-full min-h-[48px] rounded-[16px] border px-4 py-3 text-left transition ${selected ? 'border-primary bg-primary/10' : 'border-border bg-white'}`}
                       >
                        <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
                      </button>
                    )
                  })}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="secondary" className="w-full sm:w-auto" onClick={quiz.prev} disabled={quiz.current === 0}>
                    Prev
                  </Button>
                  <Button variant="secondary" className="w-full sm:w-auto" onClick={quiz.next} disabled={quiz.current === quiz.questions.length - 1}>
                    Next
                  </Button>
                  <div className="sm:flex-1" />
                  <Button variant="primary" className="w-full sm:w-auto" onClick={quiz.submit}>
                    Submit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-[20px] border border-border bg-white p-5 text-center">
                <div className="text-4xl">🎉</div>
                <h4 className="mt-3 text-xl font-semibold">Result</h4>
                <p className="mt-2 text-sm text-textSecondary">You scored {quiz.score} out of {quiz.questions.length}</p>
                <p className="mt-1 text-sm text-textSecondary">{scorePercent}%</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[16px] border border-border p-4">
                    <p className="text-xs text-textSecondary">Correct</p>
                    <p className="mt-2 text-lg font-semibold">{quiz.score}</p>
                  </div>
                  <div className="rounded-[16px] border border-border p-4">
                    <p className="text-xs text-textSecondary">Wrong</p>
                    <p className="mt-2 text-lg font-semibold">{quiz.questions.length - quiz.score}</p>
                  </div>
                  <div className="rounded-[16px] border border-border p-4">
                    <p className="text-xs text-textSecondary">Accuracy</p>
                    <p className="mt-2 text-lg font-semibold">{scorePercent}%</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className={`mx-auto inline-flex rounded-full px-4 py-2 font-semibold ${performanceBadge.className}`}>
                    {performanceBadge.label}
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      setStarted(false)
                      setQuizQuestions([])
                      quiz.reset()
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
