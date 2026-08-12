"use client"

import React from 'react'
import { motion } from 'framer-motion'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} className="relative z-10 w-[92%] max-w-lg rounded-[12px] bg-white p-4 shadow-floating">
        {children}
      </motion.div>
    </div>
  )
}
