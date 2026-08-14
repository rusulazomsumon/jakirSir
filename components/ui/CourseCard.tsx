'use client'

import React from 'react'
import Button from './Button'

export type CourseCardProps = {
  thumbnail?: string
  category?: string
  title: string
  description?: string
  duration?: string
  students?: string
  price?: string
  badge?: string
  onAction?: () => void
}

export default function CourseCard({
  category = 'Course',
  title,
  duration,
  students,
  price,
  badge,
  onAction
}: CourseCardProps) {
  return (
    <article className="min-w-[260px] overflow-hidden rounded-[24px] border border-[#EADBFF] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative w-full aspect-video rounded-t-3xl bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-white/90">{badge || 'LIVE ব্যাচ'}</p>
          <h3 className="mt-1 text-[#D4AF37] text-xl font-bold drop-shadow-md">{title}</h3>
          {price ? (
            <p className="mt-2 text-lg font-bold text-[#D4AF37]">
              {price} <span className="text-sm font-medium text-white">মাত্র</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          {badge ? (
            <span className="bg-[#F5F2FE] text-[#7C3AED] font-semibold px-2.5 py-1 rounded-full text-xs">
              {badge}
            </span>
          ) : (
            <span className="bg-[#F5F2FE] text-[#7C3AED] font-semibold px-2.5 py-1 rounded-full text-xs">
              {category}
            </span>
          )}
          {price ? <span className="text-sm font-bold text-[#2563EB]">{price}</span> : null}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{duration || 'LIVE ব্যাচ'}</span>
          <span>{students || '5240 জন'}</span>
        </div>

        <Button variant="primary" className="w-full rounded-2xl py-3 bg-[#2563EB] text-white font-semibold" onClick={onAction}>
          View Course
        </Button>
      </div>
    </article>
  )
}
