"use client"

import React, { createContext, useContext, useState } from 'react'
import SubjectSelectionModal from './SubjectSelectionModal'
import MiniQuiz from './MiniQuiz'

type SubjectSelectionContextType = {
  open: boolean
  quizSubject: string | null
  openModal: () => void
  closeModal: () => void
  selectSubject: (key: string) => void
  closeQuiz: () => void
}

const SubjectSelectionContext = createContext<SubjectSelectionContextType | undefined>(undefined)

export function SubjectSelectionProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [quizSubject, setQuizSubject] = useState<string | null>(null)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)
  const selectSubject = (key: string) => {
    setOpen(false)
    setQuizSubject(key)
  }
  const closeQuiz = () => setQuizSubject(null)

  return (
    <SubjectSelectionContext.Provider value={{ open, quizSubject, openModal, closeModal, selectSubject, closeQuiz }}>
      {children}
      <SubjectSelectionModalWrapper />
      {quizSubject && <MiniQuiz subject={quizSubject} onClose={closeQuiz} />}
    </SubjectSelectionContext.Provider>
  )
}

function SubjectSelectionModalWrapper() {
  const ctx = useContext(SubjectSelectionContext)
  if (!ctx) return null

  return (
    <SubjectSelectionModal
      open={ctx.open}
      onClose={ctx.closeModal}
      onSubjectSelect={ctx.selectSubject}
    />
  )
}

export function useSubjectSelection() {
  const ctx = useContext(SubjectSelectionContext)
  if (!ctx) throw new Error('useSubjectSelection must be used within SubjectSelectionProvider')
  return ctx
}
