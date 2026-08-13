'use client'

import React from 'react'
import { Question } from '@/types/exam'

type QuestionCardProps = {
  question: Question
  selectedOptionIndex: number | undefined
  onSelectOption: (questionId: number, optionIndex: number) => void
}

export default function QuestionCard({ question, selectedOptionIndex, onSelectOption }: QuestionCardProps) {
  const safeOptions = question.options ?? []

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
        Q{question.id}: {question.q}
      </h3>

      {question.source && question.source.length > 0 && (
        <p className="mt-2 text-xs text-slate-400">Source: {question.source.join(', ')}</p>
      )}

      {safeOptions.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {safeOptions.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectOption(question.id, idx)}
                className={`w-full rounded-full border px-4 py-3 text-left text-sm transition break-words ${
                  isSelected ? 'border-indigo-500 bg-indigo-50 text-indigo-900' : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                <span className="font-semibold">{String.fromCharCode(65 + idx)}.</span> {option}
              </button>
            )
          })}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400">No options available for this question.</p>
      )}
    </div>
  )
}
