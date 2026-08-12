'use client'

import Image from 'next/image'
import React from 'react'
import Button from './Button'

export type CourseCardProps = {
  thumbnail: string
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
  thumbnail,
  category,
  title,
  description,
  duration,
  students,
  price,
  badge,
  onAction
}: CourseCardProps) {
  const imageSrc = thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`

  return (
    <article className="min-w-[260px] overflow-hidden rounded-[20px] border border-border bg-white shadow-card">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <Image src={imageSrc} alt={title} fill style={{ objectFit: 'cover' }} />
        {badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-primary/95 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-textPrimary">
            {category || 'Course'}
          </span>
          {price ? <span className="text-sm font-semibold text-primary">{price}</span> : null}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
          {description ? <p className="text-sm text-textSecondary">{description}</p> : null}
        </div>
        <div className="flex items-center justify-between text-sm text-textSecondary">
          <span>{duration || '—'}</span>
          <span>{students || '0 জন শিক্ষার্থী'}</span>
        </div>
        <Button variant="primary" className="w-full" onClick={onAction}>
          View Course
        </Button>
      </div>
    </article>
  )
}
