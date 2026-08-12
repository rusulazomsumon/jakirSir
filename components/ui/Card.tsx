import React from 'react'

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export default function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={`bg-white p-4 rounded-[16px] shadow-card transition-transform hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  )
}
