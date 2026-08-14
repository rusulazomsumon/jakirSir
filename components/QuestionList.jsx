'use client'

import React from 'react'
import { Question } from '@/types/exam'
import QuestionCard from '@/components/QuestionCard'
import Button from '@/components/ui/Button'

type QuestionListProps = {
  questions: Question[]
  userAnswers: Record<number, number>
  onSelectOption: (questionId: number, optionIndex: number) => void
  onSubmitExam: () => void
}

export default function QuestionList({ questions, userAnswers, onSelectOption, onSubmitExam }: QuestionListProps) {
  if (!questions.length) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">এই বিষয়ে কোনো প্রশ্ন পাওয়া যায়নি।</p>
      </div>
    )
  }

  const handleSubmit = () => {
    const answeredCount = Object.keys(userAnswers).filter(
      (key) => userAnswers[Number(key)] !== undefined
    ).length

    if (answeredCount === 0) {
      const confirmSubmit = window.confirm('আপনি কোনো প্রশ্নের উত্তর দেননি। আপনি কি নিশ্চিতভাবে পরীক্ষা জমা দিতে চান?')
      if (!confirmSubmit) return
    }

    onSubmitExam()
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          selectedOptionIndex={userAnswers[question.id]}
          onSelectOption={onSelectOption}
        />
      ))}

      <div className="pt-4 pb-8">
        <Button variant="primary" className="w-full" onClick={handleSubmit}>
          জমা দিন
        </Button>
      </div>
    </div>
  )
}
