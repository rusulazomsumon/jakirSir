"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Modal from '@/components/ui/Modal'

type Question = {
  id: number
  text: string
  choices: string[]
  answer: number
}

const generateQuestions = (n = 20): Question[] =>
  Array.from({ length: n }).map((_, i) => ({ id: i + 1, text: `Question ${i + 1} - sample?`, choices: ['A', 'B', 'C', 'D'], answer: i % 4 }))

export default function InstantMCQ() {
  const [course, setCourse] = useState('Bank Math')
  const [subject, setSubject] = useState('Quant')
  const [started, setStarted] = useState(false)
  const [questions] = useState(() => generateQuestions(20))
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [secondsLeft, setSecondsLeft] = useState(10 * 60) // 10 minutes
  const [openResult, setOpenResult] = useState(false)

  useEffect(() => {
    let t: number | undefined
    if (started && secondsLeft > 0) {
      t = window.setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    }
    if (secondsLeft === 0 && started) setOpenResult(true)
    return () => { if (t) clearInterval(t) }
  }, [started, secondsLeft])

  const start = () => {
    setStarted(true)
    setSecondsLeft(10 * 60)
    setCurrent(0)
    setAnswers({})
  }

  const select = (qid: number, choice: number) => {
    setAnswers((a) => ({ ...a, [qid]: choice }))
  }

  const submit = () => {
    setOpenResult(true)
  }

  const score = useMemo(() => {
    let s = 0
    for (const q of questions) {
      if (answers[q.id] === q.answer) s++
    }
    return s
  }, [answers, questions])

  return (
    <section className="pt-6" id="mockTestSection">
      <div className="rounded-[16px] border border-border bg-white p-4 shadow-card">
        {!started ? (
          <div>
             <h3 className="text-lg font-semibold mb-2">📝 মক টেস্ট</h3>
            <div className="flex gap-2 mb-3">
              <select value={course} onChange={(e) => setCourse(e.target.value)} className="flex-1 rounded-[16px] border border-border p-2">
                <option>Bank Math</option>
                <option>GK</option>
                <option>English</option>
              </select>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="flex-1 rounded-[16px] border border-border p-2">
                <option>Quant</option>
                <option>Verbal</option>
                <option>English</option>
              </select>
            </div>
            <button onClick={start} className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-primary px-4 text-white">Start 20 Q</button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">{course} — {subject}</h4>
                <p className="text-sm text-textSecondary">Question {current + 1} / {questions.length}</p>
              </div>
              <div className="text-right text-sm">
                <div>Time</div>
                <div className="font-mono">{Math.floor(secondsLeft / 60).toString().padStart(2,'0')}:{(secondsLeft % 60).toString().padStart(2,'0')}</div>
              </div>
            </div>

            <motion.div key={questions[current].id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-3">
              <div className="text-sm text-textSecondary mb-2">{questions[current].text}</div>
              <div className="grid grid-cols-1 gap-2">
                {questions[current].choices.map((c, idx) => {
                  const selected = answers[questions[current].id] === idx
                  return (
                     <button key={idx} onClick={() => select(questions[current].id, idx)} className={`w-full text-left min-h-[48px] rounded-[16px] p-3 border transition ${selected ? 'border-primary bg-primary/10' : 'border-border'} transition`}>{String.fromCharCode(65+idx)}. {c}</button>
                  )
                })}
              </div>
            </motion.div>

            <div className="flex items-center gap-2 mt-4">
               <button disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c-1))} className="inline-flex h-[52px] items-center justify-center rounded-[16px] border border-border px-3">Prev</button>
               <button disabled={current === questions.length-1} onClick={() => setCurrent((c) => Math.min(questions.length-1, c+1))} className="inline-flex h-[52px] items-center justify-center rounded-[16px] border border-border px-3">Next</button>
              <div className="flex-1" />
              <button onClick={submit} className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-accent px-4 text-textPrimary">Submit</button>
            </div>

            <Modal open={openResult} onClose={() => setOpenResult(false)}>
              <div>
                <h3 className="text-lg font-bold">Results</h3>
                <p className="mt-2">Score: {score} / {questions.length}</p>
                <div className="mt-4 flex gap-2">
                   <button onClick={() => { setOpenResult(false); setStarted(false); }} className="inline-flex h-[52px] items-center justify-center rounded-[16px] border border-border px-4">Close</button>
                   <button onClick={() => { setOpenResult(false); start(); }} className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-primary px-4 text-white">Retry</button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </section>
  )
}
