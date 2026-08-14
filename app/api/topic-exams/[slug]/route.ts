import { NextResponse } from 'next/server'
import { getTopicExamBySlug } from '@/lib/getTopicExams'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const exam = getTopicExamBySlug(params.slug)
  if (!exam) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(exam)
}
