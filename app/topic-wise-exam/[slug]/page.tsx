import { notFound } from 'next/navigation'
import { getTopicExamBySlug } from '@/lib/getTopicExams'
import ExamContainer from '@/components/ExamContainer'

interface PageProps {
  params: { slug: string }
}

export default function TopicExamRunnerPage({ params }: PageProps) {
  const exam = getTopicExamBySlug(params.slug)

  if (!exam) {
    notFound()
  }

  const examData = {
    examInfo: exam.examInfo,
    questions: exam.questions,
  }

  return <ExamContainer examData={examData} />
}
