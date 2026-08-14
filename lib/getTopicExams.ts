import fs from 'fs'
import path from 'path'

const TOPIC_EXAM_DIR = path.join(process.cwd(), 'data', 'topicExam')

const SUBJECT_MAP: Record<string, string> = {
  Bangla: 'বাংলা',
  English: 'English',
  GK: 'সাধারণ জ্ঞান',
  Math: 'গণিত',
}

export interface TopicExamMeta {
  slug: string
  filename: string
  subject: string
  examInfo: {
    examName: string
    examType: string
    totalMarks: number | string
    totalQuestions: number
    durationMinutes?: number
    cutMark?: number
    negativeMarkPerWrong?: number
  }
  filePath: string
}

export interface TopicExamWithQuestions extends TopicExamMeta {
  questions: Array<{
    id: number
    subject: string
    topics: string
    q: string
    options: string[]
    ans: number
    explain: string
    source: string[]
  }>
}

function getSubjectFromFolder(folderName: string): string {
  return SUBJECT_MAP[folderName] || folderName
}

export function getTopicExams(): TopicExamMeta[] {
  if (!fs.existsSync(TOPIC_EXAM_DIR)) {
    return []
  }

  const folders = fs.readdirSync(TOPIC_EXAM_DIR, { withFileTypes: true })
  const results: TopicExamMeta[] = []

  for (const folder of folders) {
    if (!folder.isDirectory()) continue
    if (!(folder.name in SUBJECT_MAP)) continue

    const folderPath = path.join(TOPIC_EXAM_DIR, folder.name)
    const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.json'))

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const data = JSON.parse(fileContent) as { examInfo: Record<string, unknown> }

      const examInfoRaw = data.examInfo || {}

      const examInfo: TopicExamMeta['examInfo'] = {
        examName: String(examInfoRaw.examName ?? ''),
        examType: String(examInfoRaw.examType ?? 'preliminary'),
        totalMarks:
          typeof examInfoRaw.totalMarks === 'number'
            ? examInfoRaw.totalMarks
            : typeof examInfoRaw.totalMarks === 'string'
              ? Number(examInfoRaw.totalMarks)
              : 0,
        totalQuestions: Number(examInfoRaw.totalQuestions ?? 0),
        durationMinutes:
          typeof examInfoRaw.durationMinutes === 'number'
            ? examInfoRaw.durationMinutes
            : undefined,
        cutMark:
          typeof examInfoRaw.cutMark === 'number'
            ? examInfoRaw.cutMark
            : undefined,
        negativeMarkPerWrong:
          typeof examInfoRaw.negativeMarkPerWrong === 'number'
            ? examInfoRaw.negativeMarkPerWrong
            : undefined,
      }

      const slug = file.replace(/\.json$/, '')

      results.push({
        slug,
        filename: file,
        subject: getSubjectFromFolder(folder.name),
        examInfo,
        filePath,
      })
    }
  }

  return results
}

export function getTopicExamBySlug(slug: string): TopicExamWithQuestions | null {
  if (!fs.existsSync(TOPIC_EXAM_DIR)) {
    return null
  }

  const folders = fs.readdirSync(TOPIC_EXAM_DIR, { withFileTypes: true })

  for (const folder of folders) {
    if (!folder.isDirectory()) continue
    if (!(folder.name in SUBJECT_MAP)) continue

    const folderPath = path.join(TOPIC_EXAM_DIR, folder.name)
    const files = fs.readdirSync(folderPath).filter((f) => {
      const base = f.replace(/\.json$/, '')
      return base === slug
    })

    if (files.length === 0) continue

    const file = files[0]
    const filePath = path.join(folderPath, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent) as {
      examInfo: Record<string, unknown>
      questions: unknown[]
    }

    const examInfoRaw = data.examInfo || {}

    const examInfo: TopicExamMeta['examInfo'] = {
      examName: String(examInfoRaw.examName ?? ''),
      examType: String(examInfoRaw.examType ?? 'preliminary'),
      totalMarks:
        typeof examInfoRaw.totalMarks === 'number'
          ? examInfoRaw.totalMarks
          : typeof examInfoRaw.totalMarks === 'string'
            ? Number(examInfoRaw.totalMarks)
            : 0,
      totalQuestions: Number(examInfoRaw.totalQuestions ?? 0),
      durationMinutes:
        typeof examInfoRaw.durationMinutes === 'number'
          ? examInfoRaw.durationMinutes
          : undefined,
      cutMark:
        typeof examInfoRaw.cutMark === 'number'
          ? examInfoRaw.cutMark
          : undefined,
      negativeMarkPerWrong:
        typeof examInfoRaw.negativeMarkPerWrong === 'number'
          ? examInfoRaw.negativeMarkPerWrong
          : undefined,
    }

    const questions = (data.questions || []).map((q) => ({
      id: Number((q as Record<string, unknown>).id ?? 0),
      subject: String((q as Record<string, unknown>).subject ?? ''),
      topics: String((q as Record<string, unknown>).topics ?? ''),
      q: String((q as Record<string, unknown>).q ?? ''),
      options: Array.isArray((q as Record<string, unknown>).options)
        ? ((q as Record<string, unknown>).options as string[])
        : [],
      ans: Number((q as Record<string, unknown>).ans ?? 0),
      explain: String((q as Record<string, unknown>).explain ?? ''),
      source: Array.isArray((q as Record<string, unknown>).source)
        ? ((q as Record<string, unknown>).source as string[])
        : [],
    }))

    return {
      slug,
      filename: file,
      subject: getSubjectFromFolder(folder.name),
      examInfo,
      filePath,
      questions,
    }
  }

  return null
}
