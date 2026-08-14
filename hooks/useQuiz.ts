'use client'

import { useEffect, useMemo, useState } from 'react'

export type QuizQuestion = {
  id?: string | number
  question: string
  options: string[]
  answer: number
  explain?: string
}

export type UseQuizReturn = {
  questions: QuizQuestion[]
  current: number
  answers: (number | null)[]
  timer: number
  submitted: boolean
  score: number
  progressPercentage: number
  next: () => void
  prev: () => void
  selectAnswer: (optionIndex: number, questionIndex?: number) => void
  submit: () => void
  reset: () => void
  toBanglaNumber: (value: number) => string
}

export function useQuiz(questions: QuizQuestion[] = []): UseQuizReturn {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null))
  const [timer, setTimer] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setCurrent(0)
    setAnswers(questions.map(() => null))
    setTimer(0)
    setSubmitted(false)
  }, [questions])

  useEffect(() => {
    if (submitted || questions.length === 0) return undefined

    const intervalId = window.setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [submitted, questions.length])

  const score = useMemo(() => {
    return questions.reduce((total, question, index) => {
      return total + (answers[index] === question.answer ? 1 : 0)
    }, 0)
  }, [answers, questions])

  const progressPercentage = useMemo(() => {
    if (questions.length === 0) return 0
    return Math.round(((current + 1) / questions.length) * 100)
  }, [current, questions.length])

  const toBanglaNumber = (value: number) => {
    const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return String(value)
      .split('')
      .map((digit) => (bn[Number(digit)] ?? digit))
      .join('')
  }

  const next = () => setCurrent((prev) => Math.min(prev + 1, questions.length - 1))
  const prev = () => setCurrent((prev) => Math.max(prev - 1, 0))

  const selectAnswer = (optionIndex: number, questionIndex?: number) => {
    setAnswers((prev) => {
      const nextAnswers = [...prev]
      const idx = questionIndex ?? current
      nextAnswers[idx] = optionIndex
      return nextAnswers
    })
  }

  const submit = () => setSubmitted(true)

  const reset = () => {
    setCurrent(0)
    setAnswers(questions.map(() => null))
    setTimer(0)
    setSubmitted(false)
  }

  return {
    questions,
    current,
    answers,
    timer,
    submitted,
    score,
    progressPercentage,
    next,
    prev,
    selectAnswer,
    submit,
    reset,
    toBanglaNumber,
  }
}
