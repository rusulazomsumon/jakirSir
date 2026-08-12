"use client"

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'accent' | 'success' | 'danger'

export type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: Variant
}

export default function Button({ variant = 'primary', children, className = '', onClick, type = 'button', ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-4 h-[52px] min-w-[48px] rounded-[16px] text-sm font-medium transition-shadow focus:outline-none relative overflow-hidden'

  const variantClass: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:shadow-floating',
    secondary: 'bg-transparent border border-border text-textPrimary hover:bg-white/50',
    accent: 'bg-accent text-textPrimary hover:shadow-floating',
    success: 'bg-success text-white hover:shadow-floating',
    danger: 'bg-danger text-white hover:shadow-floating'
  }

  return (
    <motion.button
      type={type}
      {...rest}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variantClass[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
