'use client'

import React from 'react'
import { books } from '@/data/books'
import { BookCard } from '@/components/ui'

export default function PDFLibrary(){
  return (
    <section className="pt-6 px-2" id="jakirsLibrary">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-textPrimary">📕 Jakir&apos;s Library</h2>
          <p className="text-sm text-textSecondary">বইপত্র ও প্রস্তুতি রিসোর্স</p>
        </div>
        <a href="#" className="text-sm font-semibold text-primary">সব বই দেখুন</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <BookCard
            key={book.id}
            thumbnail={book.image}
            title={book.title}
            subtitle={book.type === 'pdf' ? `${book.price || 'Free'} • PDF` : book.description}
            price={book.price}
            oldPrice={book.oldPrice}
            badge={book.badge}
          />
        ))}
      </div>
    </section>
  )
}
