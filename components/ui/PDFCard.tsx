'use client'

import React from 'react'
import Button from './Button'

export type PDFCardProps = {
  title: string
  size?: string
  free?: boolean
  onDownload?: () => void
}

export default function PDFCard({ title, size = '1.2MB', free = true, onDownload }: PDFCardProps) {
  return (
    <div className="rounded-[16px] border border-border bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-textPrimary">{title}</p>
          <p className="text-xs text-textSecondary">{size}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${free ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
            {free ? 'Free' : 'Paid'}
          </span>
          <Button variant={free ? 'success' : 'danger'} onClick={onDownload}>{free ? 'Download' : 'Buy'}</Button>
        </div>
      </div>
    </div>
  )
}
