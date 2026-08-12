'use client'

import { useMemo, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Course, popularCourses, runningCourses } from '@/data/courses'

const categories = ['Bank', 'BCS', 'Primary', 'Nibondhon', 'Grade 12-20']
const paymentMethods = ['bKash', 'Nagad', 'Rocket'] as const

const paymentNumbers: Record<(typeof paymentMethods)[number], string> = {
  bKash: '০১৭XXXXXXXX',
  Nagad: '০১৫XXXXXXXX',
  Rocket: '০১৮XXXXXXXX',
}

type EnrollModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function EnrollModal({ isOpen, onClose }: EnrollModalProps) {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<(typeof paymentMethods)[number] | null>(null)
  const [senderNumber, setSenderNumber] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const allCourses = useMemo(() => [...popularCourses, ...runningCourses], [])
  const filteredCourses = useMemo(() => {
    if (!category) return []
    return allCourses.filter((course) => course.category.toLowerCase() === category.toLowerCase())
  }, [allCourses, category])

  const reset = () => {
    setStep(1)
    setCategory(null)
    setSelectedCourse(null)
    setPaymentMethod(null)
    setSenderNumber('')
    setTransactionId('')
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleStart = () => {
    if (category) setStep(2)
  }

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course)
    setStep(3)
  }

  const handlePaymentSubmit = () => {
    if (!paymentMethod || !senderNumber.trim() || !transactionId.trim()) return
    setStep(4)
  }

  const selectedPaymentNumber = paymentMethod ? paymentNumbers[paymentMethod] : ''

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="space-y-5 p-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Course Enrollment</h3>
            <p className="mt-2 text-sm text-slate-500">৪ ধাপে আপনার কোর্স সফলভাবে ভর্তি করুন।</p>
          </div>
          <button className="text-sm text-slate-500" onClick={handleClose}>
            Close
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4 rounded-[24px] border border-border bg-slate-50 p-5">
            <p className="text-sm text-slate-500">একটি ক্যাটেগরি নির্বাচন করুন যাতে আমরা আপনার জন্য সঠিক কোর্স দেখাতে পারি।</p>
            <div className="grid gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`w-full rounded-[18px] border px-4 py-4 text-left text-sm font-semibold transition ${category === item ? 'border-primary bg-primary/10 text-slate-900' : 'border-border bg-white text-slate-700 hover:border-primary'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button variant="primary" className="w-full rounded-[18px]" onClick={handleStart} disabled={!category}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-[24px] border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm text-slate-500">Selected category</p>
                <p className="mt-1 font-semibold text-slate-900">{category}</p>
              </div>
              <button className="text-sm text-primary" onClick={() => setStep(1)}>
                Change
              </button>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid gap-3">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="rounded-[20px] border border-border bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-900">{course.title}</p>
                        <p className="text-sm text-slate-500">{course.description}</p>
                      </div>
                      <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-900">
                        {course.price}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
                      <span>{course.duration}</span>
                      <span>{course.students.toLocaleString()} enrolled</span>
                    </div>
                    <button
                      className="mt-4 inline-flex w-full items-center justify-center rounded-[16px] bg-primary px-4 py-3 text-sm font-semibold text-white"
                      onClick={() => handleSelectCourse(course)}
                    >
                      Select Course
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[20px] border border-border bg-white p-5 text-center">
                <p className="text-sm text-slate-500">এই ক্যাটেগরিতে কোন কোর্স পাওয়া যায়নি।</p>
              </div>
            )}
          </div>
        )}

        {step === 3 && selectedCourse && (
          <div className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="rounded-[20px] border border-border bg-white p-4">
              <p className="text-sm text-slate-500">Selected course</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{selectedCourse.title}</p>
              <p className="mt-2 text-sm text-slate-600">{selectedCourse.description}</p>
            </div>

            <div className="grid gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full rounded-[18px] border px-4 py-4 text-left text-sm font-semibold transition ${paymentMethod === method ? 'border-primary bg-primary/10 text-slate-900' : 'border-border bg-white text-slate-700 hover:border-primary'}`}
                >
                  {method}
                </button>
              ))}
            </div>

            {paymentMethod && (
              <div className="space-y-4 rounded-[20px] border border-border bg-white p-4">
                <div>
                  <p className="text-sm text-slate-500">Payment number</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedPaymentNumber}</p>
                </div>
                <div className="space-y-3">
                  <label className="block text-sm text-slate-600">Sender Mobile Number</label>
                  <input
                    value={senderNumber}
                    onChange={(event) => setSenderNumber(event.target.value)}
                    placeholder="01xxxxxxxxx"
                    className="w-full rounded-[16px] border border-border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm text-slate-600">Transaction ID</label>
                  <input
                    value={transactionId}
                    onChange={(event) => setTransactionId(event.target.value)}
                    placeholder="TXN123456789"
                    className="w-full rounded-[16px] border border-border bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => setStep(2)} className="inline-flex h-11 w-full items-center justify-center rounded-[16px] border border-border bg-white text-sm text-slate-700">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePaymentSubmit}
                    className="inline-flex h-11 w-full items-center justify-center rounded-[16px] bg-primary px-4 text-sm font-semibold text-white"
                    disabled={!senderNumber.trim() || !transactionId.trim()}
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 4 && selectedCourse && (
          <div className="space-y-5 rounded-[24px] border border-slate-200 bg-white p-5 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success text-3xl">✓</div>
            <h4 className="text-xl font-semibold text-slate-900">Enrollment Confirmed</h4>
            <p className="text-sm text-slate-500">আপনি সফলভাবে {selectedCourse.title} কোর্সে ভর্তি হয়েছেন।</p>
            <div className="grid gap-3 rounded-[20px] border border-border bg-slate-50 p-4 text-left text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">Course:</span> {selectedCourse.title}</p>
              <p><span className="font-semibold text-slate-900">Payment:</span> {paymentMethod}</p>
              <p><span className="font-semibold text-slate-900">Transaction ID:</span> {transactionId}</p>
            </div>
            <Button variant="primary" className="w-full rounded-[18px]" onClick={handleClose}>
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}
