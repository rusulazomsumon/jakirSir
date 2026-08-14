import fs from 'fs/promises'
import path from 'path'

export interface RawQuestion {
  id: number
  topicsId?: number
  q: string
  options: string[]
  ans: number
  explain?: string
  source?: string[]
}

export interface NormalizedQuestion {
  id: number
  q: string
  options: string[]
  ans: string
  topicsId?: number
  explain?: string
  source?: string[]
}

const DATA_ROOT = path.join(process.cwd(), 'data', 't20')

export function normalizeQuestion(raw: RawQuestion): NormalizedQuestion {
  return {
    id: raw.id,
    q: raw.q,
    options: raw.options,
    ans: raw.options[raw.ans] ?? '',
    topicsId: raw.topicsId,
    explain: raw.explain,
    source: raw.source
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

async function tryReadJsonFile(filePath: string): Promise<RawQuestion[]> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const data = JSON.parse(content)
    if (!Array.isArray(data)) return []
    return data.filter((item): item is RawQuestion =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.q === 'string' &&
      Array.isArray(item.options) &&
      item.options.length > 0 &&
      typeof item.ans === 'number' &&
      item.ans >= 0 &&
      item.ans < item.options.length
    )
  } catch {
    return []
  }
}

async function getAllJsonFiles(dir: string): Promise<string[]> {
  const results: string[] = []
  async function walk(currentDir: string) {
    let entries
    try {
      entries = await fs.readdir(currentDir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        results.push(fullPath)
      }
    }
  }
  await walk(dir)
  return results
}

async function resolvePrimaryPath(
  subjectDir: string,
  subTopicSlug?: string
): Promise<string | undefined> {
  if (!subTopicSlug) {
    const defaultPath = path.join(subjectDir, `${path.basename(subjectDir)}.json`)
    const stat = await fs.stat(defaultPath).catch(() => null)
    return stat?.isFile() ? defaultPath : undefined
  }

  const directPath = path.join(subjectDir, `${subTopicSlug}.json`)
  const directStat = await fs.stat(directPath).catch(() => null)
  if (directStat?.isFile()) {
    return directPath
  }

  const dirPath = path.join(subjectDir, subTopicSlug)
  const dirStat = await fs.stat(dirPath).catch(() => null)
  if (dirStat?.isDirectory()) {
    const files = await fs.readdir(dirPath)
    const jsonFile = files.find((f) => f.endsWith('.json'))
    if (jsonFile) {
      return path.join(dirPath, jsonFile)
    }
  }

  return undefined
}

export async function getQuestionsByTopic(
  subjectSlug: string,
  subTopicSlug?: string
): Promise<NormalizedQuestion[]> {
  const subjectDir = path.join(DATA_ROOT, subjectSlug)
  const primaryPath = await resolvePrimaryPath(subjectDir, subTopicSlug)

  let questions: NormalizedQuestion[] = []
  if (primaryPath) {
    const raw = await tryReadJsonFile(primaryPath)
    questions = raw.map(normalizeQuestion)
  }

  if (questions.length < 20) {
    const siblings = await getAllJsonFiles(subjectDir)
    for (const sibling of siblings) {
      if (sibling === primaryPath) continue
      const raw = await tryReadJsonFile(sibling)
      questions.push(...raw.map(normalizeQuestion))
      if (questions.length >= 20) break
    }
  }

  const shuffled = shuffleArray(questions)
  return shuffled.slice(0, 20)
}
