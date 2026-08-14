export type MiniQuizQuestion = {
  id: string | number
  question: string
  options: string[]
  answer: number
  explain?: string
}

import banglaQuestions from '@/data/t20_aggregate/bangla.json'
import englishQuestions from '@/data/t20_aggregate/english.json'
import gkQuestions from '@/data/t20_aggregate/gk.json'

function normalizeAggregated(raw: any, fallbackId: string | number): MiniQuizQuestion {
  return {
    id: raw.id ?? fallbackId,
    question: typeof raw.q === 'string' ? raw.q : typeof raw.question === 'string' ? raw.question : '',
    options: Array.isArray(raw.options) ? raw.options : [],
    answer: typeof raw.ans === 'number' ? raw.ans : typeof raw.answer === 'number' ? raw.answer : -1,
    explain: typeof raw.explain === 'string' ? raw.explain : undefined,
  }
}

const SUBJECT_DATA: Record<string, MiniQuizQuestion[]> = {
  bangla: banglaQuestions.map((q: any, idx: number) => normalizeAggregated(q, idx)),
  english: englishQuestions.map((q: any, idx: number) => normalizeAggregated(q, idx)),
  gk: gkQuestions.map((q: any, idx: number) => normalizeAggregated(q, idx)),
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export async function loadQuestionsForSubject(subject: string): Promise<MiniQuizQuestion[]> {
  const all = SUBJECT_DATA[subject]
  if (!all || !all.length) return []
  const shuffled = shuffleArray([...all])
  return shuffled.slice(0, 20)
}

export function getQuestionCountForSubject(subject: string): number {
  const all = SUBJECT_DATA[subject]
  return all ? 20 : 0
}
