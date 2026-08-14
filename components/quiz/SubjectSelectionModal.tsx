"use client"

import React from 'react'
import Modal from '@/components/ui/Modal'

const subjects = [
  {
    key: 'bangla',
    label: 'বাংলা',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A9 9 0 006 18c1.052 0 2.062-.18 3-.512m12-6.042A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A9 9 0 0118 18c-1.052 0-2.062-.18-3-.512" />
      </svg>
    )
  },
  {
    key: 'english',
    label: 'ইংরেজি',
    icon: (
      <span className="text-2xl font-bold text-slate-700">En</span>
    )
  },
  {
    key: 'math',
    label: 'গণিত',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm0 2.25h.008v.008H8.25v-.008zm2.25-4.5h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5V18zm0 2.25h.008v.008H10.5v-.008zm2.25-4.5h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75V18zm0 2.25h.008v.008H12.75v-.008zm2.25-4.5h.008v.008H15v-.008zm0 2.25h.008v.008H15V18zm0 2.25h.008v.008H15v-.008zM4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    )
  },
  {
    key: 'gk',
    label: 'সাধারণ জ্ঞান',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-10 w-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    )
  }
]

type SubjectSelectionModalProps = {
  open: boolean
  onClose: () => void
  onSubjectSelect: (key: string) => void
}

export default function SubjectSelectionModal({ open, onClose, onSubjectSelect }: SubjectSelectionModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="overflow-hidden rounded-2xl">
        <div className="bg-red-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span>🔥</span>
            <span>Live MCQ</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-slate-800 text-lg mb-4">১. বিষয় নির্বাচন করুন</h4>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <button
                key={subject.key}
                type="button"
                onClick={() => onSubjectSelect(subject.key)}
                className="border rounded-xl p-4 text-center cursor-pointer hover:border-red-500 hover:bg-red-50/50 transition-all"
              >
                <div className="flex flex-col items-center gap-2">
                  {subject.icon}
                  <span className="text-sm font-semibold text-slate-700">{subject.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
