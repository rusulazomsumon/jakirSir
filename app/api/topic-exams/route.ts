import { NextResponse } from 'next/server'
import { getTopicExams } from '@/lib/getTopicExams'

export async function GET() {
  const exams = getTopicExams()
  return NextResponse.json(exams)
}
