export interface Question {
  id: number
  subject: string
  topics: string
  q: string
  options: string[]
  ans: number
  explain: string
  source: string[]
}

export interface ExamInfo {
  examName: string
  examType: string
  totalMarks: number | string
  totalQuestions: number
  category?: string
  durationMinutes?: number
  cutMark?: number
  negativeMarkPerWrong?: number
}

export interface ExamData {
  examInfo: ExamInfo
  questions: Question[]
}

export interface UserExamSession {
  candidateName: string
  answers: Record<number, number>
  timeSpentSeconds: number
}
