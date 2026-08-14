'use server'

import { getQuestionsByTopic, NormalizedQuestion } from '@/utils/questionLoader'
import { ExamData, Question } from '@/types/exam'

export async function loadTopicExamData(subjectSlug: string, subTopicSlug: string): Promise<ExamData> {
  const normalized = await getQuestionsByTopic(subjectSlug, subTopicSlug)

  const questions: Question[] = normalized.map((q: NormalizedQuestion) => {
    const ansIndex = q.options.indexOf(q.ans)
    return {
      id: q.id,
      subject: subjectSlug,
      topics: subTopicSlug,
      q: q.q,
      options: q.options,
      ans: ansIndex >= 0 ? ansIndex : 0,
      explain: q.explain ?? '',
      source: q.source ?? []
    }
  })

  return {
    examInfo: {
      examName: subTopicSlug,
      examType: 'topic',
      totalMarks: questions.length,
      totalQuestions: questions.length,
      durationMinutes: 20,
      cutMark: Math.ceil(questions.length * 0.6),
      negativeMarkPerWrong: 0.5,
      category: 'topic'
    },
    questions
  }
}
