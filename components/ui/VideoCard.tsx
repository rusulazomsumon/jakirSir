'use client'

import React from 'react'
import Button from './Button'

export type VideoCardProps = {
  title: string
  duration?: string
  free?: boolean
  onWatch?: () => void
}

export default function VideoCard({ title, duration = '12:34', free = true, onWatch }: VideoCardProps) {
  return (
    <div className="rounded-[16px] border border-border bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-textPrimary">{title}</p>
          <p className="text-xs text-textSecondary">{duration}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${free ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
            {free ? 'Free' : 'Paid'}
          </span>
          <Button variant={free ? 'primary' : 'secondary'} onClick={onWatch}>{free ? 'Watch' : 'Preview'}</Button>
        </div>
      </div>
    </div>
  )
}
