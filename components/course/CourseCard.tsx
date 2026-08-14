'use client'

import React from 'react'
import Button from '@/components/ui/Button'

export interface CourseCardProps {
  id: string | number
  title: string
  badge?: string
  price: string
  duration: string
  enrolledCount: string | number
  bannerBg?: string
  onViewDetails?: () => void
}

export default function CourseCard({
  title,
  badge,
  price,
  duration,
  enrolledCount,
  bannerBg,
  onViewDetails
}: CourseCardProps) {
  return (
    <article className="min-w-[260px] overflow-hidden rounded-[24px] border border-[#EADBFF] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`relative w-full aspect-video rounded-t-3xl ${
          bannerBg || 'bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#0D0D12]'
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-5 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-white/90">
            {badge || 'LIVE ব্যাচ'}
          </p>
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
          ) : null}
          {price ? <span className="text-sm font-bold text-[#2563EB]">{price}</span> : null}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{duration || 'LIVE ব্যাচ'}</span>
          <span>{enrolledCount ? `${enrolledCount} জন` : '5240 জন'}</span>
        </div>

        <Button
          variant="primary"
          className="w-full rounded-2xl py-3 bg-[#2563EB] text-white font-semibold"
          onClick={onViewDetails}
        >
          View Course
        </Button>
      </div>
    </article>
  )
}
