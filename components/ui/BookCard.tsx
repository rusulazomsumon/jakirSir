'use client'

import Image from 'next/image'
import React from 'react'
import Button from './Button'

export type BookCardProps = {
  thumbnail: string
  title: string
  subtitle?: string
  price?: string
  oldPrice?: string
  badge?: 'Paid' | 'Free'
  onAction?: () => void
}

export default function BookCard({ thumbnail, title, subtitle, price, oldPrice, badge, onAction }: BookCardProps) {
  const imageSrc = thumbnail.startsWith('/') ? thumbnail : `/${thumbnail}`

  return (
    <article className="overflow-hidden rounded-[16px] border border-border bg-white shadow-card">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <Image src={imageSrc} alt={title} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-textPrimary">{title}</h3>
            {subtitle ? <p className="text-sm text-textSecondary">{subtitle}</p> : null}
          </div>
          {badge ? (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge === 'Free' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {badge}
            </span>
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-textPrimary">
          <div className="flex items-baseline gap-2">
            {price ? <span className="font-semibold">{price}</span> : null}
            {oldPrice ? <span className="text-textSecondary line-through">{oldPrice}</span> : null}
          </div>
          <Button variant={badge === 'Free' ? 'success' : 'primary'} className="h-[52px] px-4" onClick={onAction}>
            {badge === 'Free' ? 'Download' : 'Buy Now'}
          </Button>
        </div>
      </div>
    </article>
  )
}
