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

  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id]
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

export function calculateSimulatedRank(
  score: number,
  totalMarks: number,
  cutMark: number,
  baseParticipants: number = 2000
): SimulatedRank {
  const totalParticipants = baseParticipants + Math.floor(Math.random() * 50)
  const safeTotalMarks = totalMarks > 0 ? totalMarks : 100
  const cutRatio = cutMark / safeTotalMarks

  // Logistic mapping: candidate's score ratio -> percentile.
  // Centered slightly below the cutMark ratio so a score equal to the cut mark
  // lands near the ~70th percentile. Bounded so it never collapses to a
  // degenerate 0.0% / rank === totalParticipants result.
  const k = 10
  const center = cutRatio - 0.0847
  const ratio = Math.max(0, Math.min(1, score / safeTotalMarks))
  const percentile = 100 / (1 + Math.exp(-k * (ratio - center)))

  const clampedPercentile = Math.max(1, Math.min(99, percentile))
  const rank = Math.max(
    1,
    Math.min(
      totalParticipants - 1,
      Math.round(totalParticipants * (1 - clampedPercentile / 100))
    )
  )

  return {
    rank,
    totalParticipants,
    percentile: clampedPercentile
  }
}
