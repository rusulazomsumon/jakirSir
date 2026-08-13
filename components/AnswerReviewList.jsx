'use client'

import React from 'react'
import { Question } from '@/types/exam'

type AnswerReviewListProps = {
  questions: Question[]
  userAnswers: Record<number, number>
}

export default function AnswerReviewList({ questions, userAnswers }: AnswerReviewListProps) {
  return (
    <div id="answer-review" className="mt-6 space-y-4">
      {questions.map((question, idx) => {
        const userAnswerIndex = userAnswers[question.id]
        const isCorrect = userAnswerIndex === question.ans
        const isSkipped = userAnswerIndex === undefined
        const safeOptions = question.options ?? []
        const correctOption = safeOptions[question.ans]
        const userOption = userAnswerIndex !== undefined ? safeOptions[userAnswerIndex] : undefined

        return (
          <div key={question.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              প্রশ্ন {idx + 1}: {question.q}
            </h3>

            <div className="mt-4 space-y-2">
              {safeOptions.length > 0 ? (
                safeOptions.map((option, optionIdx) => {
                  const isSelected = userAnswerIndex === optionIdx
                  const isCorrectOption = optionIdx === question.ans

                  let borderClass = 'border-slate-200 bg-white'
                  if (isCorrectOption) {
                    borderClass = 'border-emerald-500 bg-emerald-50'
                  } else if (isSelected && !isCorrectOption) {
                    borderClass = 'border-red-400 bg-red-50'
                  }

                  return (
                    <div
                      key={optionIdx}
                      className={`rounded-xl border px-4 py-2.5 text-sm ${borderClass}`}
                    >
                      <span className="font-semibold">{String.fromCharCode(65 + optionIdx)}.</span> {option}
                      {isCorrectOption && <span className="ml-2 text-xs text-emerald-700">✓ Correct</span>}
                      {isSelected && !isCorrectOption && <span className="ml-2 text-xs text-red-600">✕ Selected</span>}
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-slate-400">এই প্রশ্নের কোনো অপশন পাওয়া যায়নি।</p>
              )}
            </div>

            <div className="mt-4 space-y-1">
              {isSkipped ? (
                <p className="text-sm text-red-600">✕ Your Ans: Skipped</p>
              ) : userOption ? (
                <p className={`text-sm ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                  {isCorrect ? '✓' : '✕'} Your Ans: {userOption}
                </p>
              ) : null}

              {!isCorrect && correctOption && (
                <p className="text-sm text-emerald-700">
                  ✓ Correct Ans: {correctOption}
                </p>
              )}
            </div>

            {question.explain && (
              <div className="mt-4 rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Explain</p>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{question.explain}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
