'use client'

import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Question } from '@/types/exam'
import { toBanglaNum } from '@/utils/formatters'

type SubjectFilterAccordionProps = {
  questions: Question[]
  activeSubject: string | null
  onSubjectChange: (subject: string | null) => void
}

export default function SubjectFilterAccordion({ questions, activeSubject, onSubjectChange }: SubjectFilterAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    questions.forEach((question) => {
      const subject = question.subject
      counts[subject] = (counts[subject] || 0) + 1
    })
    return counts
  }, [questions])

  const totalQuestions = questions.length
  const sortedSubjects = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1])

  const handleSubjectClick = (subject: string) => {
    if (activeSubject === subject) {
      onSubjectChange(null)
    } else {
      onSubjectChange(subject)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-900">বিষয়ভিত্তিক প্রশ্ন দেখুন!</span>
        <span className="text-lg text-slate-500">{isExpanded ? '−' : '+'}</span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onSubjectChange(null)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeSubject === null
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  সকলে ({toBanglaNum(totalQuestions)} টি)
                </button>

                {sortedSubjects.map(([subject, count]) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => handleSubjectClick(subject)}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeSubject === subject
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {subject} ({toBanglaNum(count)} টি)
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
