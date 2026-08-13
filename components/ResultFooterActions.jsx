'use client'

import React from 'react'

export default function ResultFooterActions() {
  const handleScrollToReview = () => {
    const target = document.getElementById('answer-review')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
        <h3 className="text-base font-semibold text-slate-900">আপনি কি জানেন...?</h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          BCSpark-এর স্পেশাল কন্টেস্টে অংশ নিলে গুরুত্বপূর্ণ MCQ পড়াশোনার পাশাপাশি প্রতিদিন থাকছে একাধিক পুরস্কার জেতার সম্ভাবনা!
        </p>
      </div>

      <button
        type="button"
        onClick={handleScrollToReview}
        className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
      >
        Answer Review &amp; Download 🔍
      </button>
    </div>
  )
}
