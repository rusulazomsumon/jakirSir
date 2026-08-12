'use client'

import Image from 'next/image'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Course } from '@/data/courses'

type CourseInfoModalProps = {
  isOpen: boolean
  onClose: () => void
  course: Course
}

export default function CourseInfoModal({ isOpen, onClose, course }: CourseInfoModalProps) {
  const imageSrc = course.image.startsWith('/') ? course.image : `/${course.image}`
  const instructor = (course as Course & { instructor?: string }).instructor ?? 'Jakir Sir'

  const handleEnroll = () => {
    onClose()
    if (course.link) {
      window.location.href = course.link
    }
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="space-y-5 p-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{course.description}</p>
          </div>
          <button onClick={onClose} className="text-sm text-slate-500">
            Close
          </button>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-border bg-slate-100">
          <div className="relative h-52 w-full">
            <Image src={imageSrc} alt={course.title} fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <div className="space-y-4 rounded-[24px] border border-border bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Course duration</p>
              <p className="mt-1 font-semibold text-slate-900">{course.duration}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Instructor</p>
              <p className="mt-1 font-semibold text-slate-900">{instructor}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Total enrolled</p>
              <p className="mt-1 font-semibold text-slate-900">{course.students.toLocaleString()}+</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-1 text-lg font-semibold text-primary">{course.price}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-border bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Syllabus summary</p>
            {course.badge ? (
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-900">
                {course.badge}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
        </div>

        <Button variant="primary" className="w-full rounded-[18px]" onClick={handleEnroll}>
          Enroll Now
        </Button>
      </div>
    </Modal>
  )
}
