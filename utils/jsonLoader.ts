import { ExamData } from '@/types/exam'

const MODEL_TEST_FILES: Record<string, () => Promise<{ default: ExamData }>> = {
  'combinedModelTest.json': () => import('@/data/questionBank/DSS/combinedModelTest.json'),
  'dss2016QuestionBank.json': () => import('@/data/questionBank/DSS/dss2016QuestionBank.json'),
  'dss2022QuestionBank.json': () => import('@/data/questionBank/DSS/dss2022QuestionBank.json'),
  'dssDemo1QuestionBank.json': () => import('@/data/questionBank/DSS/dssDemo1QuestionBank.json')
}

const DEFAULT_EXAM_INFO: Partial<ExamData['examInfo']> = {
  durationMinutes: 60,
  cutMark: 49,
  negativeMarkPerWrong: 0.5
}

export async function loadModelTestData(fileName: string): Promise<ExamData> {
  const loader = MODEL_TEST_FILES[fileName]

  if (!loader) {
    throw new Error(`Unknown model test file: ${fileName}`)
  }

  const module = await loader()
  const data = module.default as ExamData

  const normalizedExamInfo = {
    ...DEFAULT_EXAM_INFO,
    ...data.examInfo,
    category: data.examInfo.category ?? 'general',
    durationMinutes: data.examInfo.durationMinutes ?? DEFAULT_EXAM_INFO.durationMinutes,
    cutMark: data.examInfo.cutMark ?? DEFAULT_EXAM_INFO.cutMark,
    negativeMarkPerWrong: data.examInfo.negativeMarkPerWrong ?? DEFAULT_EXAM_INFO.negativeMarkPerWrong
  }

  return {
    examInfo: normalizedExamInfo,
    questions: data.questions
  }
}

export function getAvailableModelTestFiles(): string[] {
  return Object.keys(MODEL_TEST_FILES)
}
