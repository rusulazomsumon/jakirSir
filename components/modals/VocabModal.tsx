'use client'

import { useMemo, useState } from 'react'
import Modal from '@/components/ui/Modal'
import { useQuiz, QuizQuestion } from '@/hooks/useQuiz'

const vocabQuestions: QuizQuestion[] = [
  { question: 'What is the synonym of "Abundant"?', options: ['Scarce', 'Plentiful', 'Empty', 'Rare'], answer: 1 },
  { question: 'Choose the correct spelling:', options: ['Recieve', 'Receive', 'Receeve', 'Reciive'], answer: 1 },
  { question: 'Antonym of "Brave"?', options: ['Courageous', 'Bold', 'Cowardly', 'Heroic'], answer: 2 },
  { question: 'She ____ to school every day.', options: ['go', 'goes', 'going', 'gone'], answer: 1 },
  { question: 'The opposite of "Ancient" is:', options: ['Old', 'Modern', 'Aged', 'Antique'], answer: 1 },
  { question: 'Choose the correct meaning of "Innovative".', options: ['Traditional', 'Creative', 'Lazy', 'Quiet'], answer: 1 },
  { question: 'Which word is an antonym of "Scarce"?', options: ['Plentiful', 'Rare', 'Empty', 'Weak'], answer: 0 },
  { question: 'Select the correct plural: "Child".', options: ['Childs', 'Children', 'Childes', 'Childrens'], answer: 1 },
  { question: 'Choose the correct form: "He ____ the book yesterday."', options: ['read', 'reads', 'red', 'reading'], answer: 0 },
  { question: 'Find the synonym of "Generous".', options: ['Selfish', 'Kind', 'Harsh', 'Quiet'], answer: 1 },
]

export default function VocabModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const quiz = useQuiz(vocabQuestions)

  const score = useMemo(
    () => vocabQuestions.reduce((sum, question, idx) => sum + (quiz.answers[idx] === question.answer ? 1 : 0), 0),
    [quiz.answers]
  )

  const badge = useMemo(() => {
    if (score >= 9) return { label: 'Outstanding', classes: 'bg-emerald-600 text-white' }
    if (score >= 7) return { label: 'Great', classes: 'bg-blue-600 text-white' }
    if (score >= 5) return { label: 'Good Effort', classes: 'bg-amber-500 text-slate-900' }
    return { label: 'Keep Practicing', classes: 'bg-rose-600 text-white' }
  }, [score])

  const handleClose = () => {
    quiz.reset()
    setStep(1)
    onClose()
  }

  const handleStart = () => {
    quiz.reset()
    setStep(2)
  }

  const handleSubmit = () => {
    quiz.submit()
    setStep(3)
  }

  const handleRetry = () => {
    quiz.reset()
    setStep(1)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="space-y-5 p-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Vocabulary Quiz</h3>
            <p className="text-sm text-slate-500">১০ টি প্রশ্নের সাথে দ্রুত Vocabulary পরীক্ষা করুন।</p>
          </div>
          <button className="text-sm text-slate-500" onClick={handleClose}>
            Close
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-center">
            <p className="text-sm text-slate-500">শুরু করতে, নিচের বাটনে ক্লিক করুন এবং ১০ টি প্রশ্নের কুইজ শুরু করুন।</p>
            <div className="space-y-3">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">📝</div>
              <p className="text-base font-semibold text-slate-900">Vocabulary Challenge</p>
              <button onClick={handleStart} className="mt-4 inline-flex w-full items-center justify-center rounded-[16px] bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>প্রশ্ন {quiz.current + 1} / {quiz.questions.length}</span>
                <span>{quiz.progressPercentage}%</span>
              </div>
              <h4 className="mt-3 text-base font-semibold text-slate-900">{quiz.questions[quiz.current]?.question}</h4>
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
                    <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={quiz.prev} disabled={quiz.current === 0} className="inline-flex h-11 w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white text-sm text-slate-700 disabled:opacity-50">
                Prev
              </button>
              <button onClick={quiz.next} disabled={quiz.current === quiz.questions.length - 1} className="inline-flex h-11 w-full items-center justify-center rounded-[16px] border border-slate-200 bg-white text-sm text-slate-700 disabled:opacity-50">
                Next
              </button>
              <button onClick={handleSubmit} className="inline-flex h-11 w-full items-center justify-center rounded-[16px] bg-blue-600 text-sm font-semibold text-white">
                Submit
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">✅</div>
            <h4 className="text-xl font-semibold text-slate-900">Quiz Complete</h4>
            <p className="text-sm text-slate-500">You scored {score} out of {quiz.questions.length}</p>
            <div className={`mx-auto inline-flex rounded-full px-4 py-2 text-sm font-semibold ${badge.classes}`}>
              {badge.label}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[16px] border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Correct</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{score}</p>
              </div>
              <div className="rounded-[16px] border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Wrong</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{quiz.questions.length - score}</p>
              </div>
              <div className="rounded-[16px] border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Accuracy</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{Math.round((score / quiz.questions.length) * 100)}%</p>
              </div>
            </div>
            <button onClick={handleRetry} className="mt-4 inline-flex w-full items-center justify-center rounded-[16px] bg-blue-600 px-4 py-3 text-sm font-semibold text-white">
              Try Again
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}
 