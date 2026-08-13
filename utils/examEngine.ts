import { Question, ExamInfo } from '../types/exam'

export interface ExamResult {
  totalScore: number
  totalCorrect: number
  totalWrong: number
  totalSkipped: number
  accuracy: number
  isPassed: boolean
  timeSpentSeconds: number
}

export interface SimulatedRank {
  rank: number
  totalParticipants: number
  percentile: number
}

export function calculateResults(
  questions: Question[],
  userAnswers: Record<number, number>,
  config: ExamInfo,
  timeSpentSeconds: number = 0
): ExamResult {
  const totalQuestions = questions.length
  let totalCorrect = 0
  let totalWrong = 0
  let totalSkipped = 0

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index]
    if (userAnswer === undefined || userAnswer === null) {
      totalSkipped++
    } else if (userAnswer === question.ans) {
      totalCorrect++
    } else {
      totalWrong++
    }
  })

  const negativeMark = config.negativeMarkPerWrong ?? 0.5
  const totalScore = totalCorrect - totalWrong * negativeMark
  const accuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0
  const cutMark = config.cutMark ?? 49
  const isPassed = totalScore >= cutMark

  return {
    totalScore,
    totalCorrect,
    totalWrong,
    totalSkipped,
    accuracy,
    isPassed,
    timeSpentSeconds
  }
}

function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1
  const ax = Math.abs(x)
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const t = 1.0 / (1.0 + p * ax)
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax)
  return sign * y
}

function normalCDF(x: number): number {
  return 0.5 * (1.0 + erf(x / Math.sqrt(2.0)))
}

export function calculateSimulatedRank(
  score: number,
  totalMarks: number,
  cutMark: number,
  baseParticipants: number = 2000
): SimulatedRank {
  const totalParticipants = baseParticipants + Math.floor(Math.random() * 50)

  const range = totalMarks - cutMark
  const stdDev = Math.max(range / 3, 1)
  const mean = cutMark - 0.524 * stdDev

  const z = (score - mean) / stdDev
  const percentile = normalCDF(z) * 100
  const rank = Math.max(1, Math.round(totalParticipants * (1 - percentile / 100)))

  return {
    rank: Math.min(rank, totalParticipants),
    totalParticipants,
    percentile: Math.max(0, Math.min(100, percentile))
  }
}
