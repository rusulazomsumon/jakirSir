'use client'

import { useEffect, useMemo, useState } from 'react'
import Modal from '@/components/ui/Modal'

type ExamCountdownModalProps = {
  isOpen: boolean
  onClose: () => void
  courseName: string
  examDate: string
}

const getTimeRemaining = (targetDate: Date) => {
  const total = Math.max(targetDate.getTime() - new Date().getTime(), 0)
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { total, days, hours, minutes, seconds }
}

const formatNumber = (value: number) => String(value).padStart(2, '0')

export default function ExamCountdownModal({ isOpen, onClose, courseName, examDate }: ExamCountdownModalProps) {
  const [targetDate, setTargetDate] = useState<Date>(() => new Date(examDate))
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining(new Date(examDate)))

  useEffect(() => {
    const date = new Date(examDate)
    setTargetDate(date)
    setTimeRemaining(getTimeRemaining(date))
  }, [examDate])

  useEffect(() => {
    if (!isOpen) return undefined

    const intervalId = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining(targetDate))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isOpen, targetDate])

  const statusLabel = useMemo(() => {
    if (timeRemaining.total === 0) return 'Exam started'
    return 'Time remaining until exam'
  }, [timeRemaining.total])

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="space-y-5 p-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Exam Countdown</h3>
            <p className="text-sm text-slate-500">{courseName} পরীক্ষার জন্য বর্তমান কাউন্টডাউন</p>
          </div>
          <button className="text-sm text-slate-500" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-center">
          <p className="text-sm text-slate-500">{statusLabel}</p>
          <p className="mt-2 text-base font-semibold text-slate-900">{courseName}</p>
          <p className="mt-1 text-sm text-slate-500">{new Date(examDate).toLocaleString()}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {[
            { label: 'Days', value: timeRemaining.days },
            { label: 'Hours', value: timeRemaining.hours },
            { label: 'Minutes', value: timeRemaining.minutes },
            { label: 'Seconds', value: timeRemaining.seconds },
          ].map((item) => (
            <div key={item.label} className="rounded-[20px] border border-slate-200 bg-white p-4 text-center">
              <p className="text-xs text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{formatNumber(item.value)}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[20px] border border-blue-100 bg-blue-50 p-4 text-center text-sm text-blue-700">
          ব্যাকড্রপে ক্লিক করলে এই মডাল বন্ধ হবে।
        </div>
      </div>
    </Modal>
  )
}
