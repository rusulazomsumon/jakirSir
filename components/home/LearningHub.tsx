import Image from 'next/image'
import React from 'react'
import { books, videos } from '@/data/books'

export default function LearningHub() {
  const heroVideo = videos[0]
  const heroImage = heroVideo.image.startsWith('/') ? heroVideo.image : `/${heroVideo.image}`

  return (
    <section className="pt-6">
      <div className="mb-3 px-2 flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-textPrimary">Learning Hub</h2>
          <p className="text-sm text-textSecondary">ভিডিও লেকচার ও PDF সহায়ক নোট</p>
        </div>
        <a href="#" className="text-sm font-semibold text-primary">সব PDF দেখুন</a>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] px-2">
        <div className="overflow-hidden rounded-[24px] border border-border bg-white shadow-card">
          <div className="relative h-72 sm:h-[32rem]">
            <Image src={heroImage} alt={heroVideo.title} fill style={{ objectFit: 'cover' }} />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.2em] text-white/80">ভিডিও গাইড</p>
              <h3 className="mt-2 text-2xl font-bold">{heroVideo.title}</h3>
              <p className="mt-2 max-w-xl text-sm text-white/90">{heroVideo.description || 'Jakir Sir এর ব্যাংক জব প্রস্তুতির সম্পূর্ণ গাইডলাইন।'}</p>
              <a href={heroVideo.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex h-[42px] items-center justify-center rounded-[16px] bg-accent px-5 text-sm font-semibold text-textPrimary shadow-card">
                Watch Now
              </a>
            </div>
          </div>
        </div>

        <aside className="rounded-[24px] border border-border bg-white p-4 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-textPrimary">📕 জনপ্রিয় PDF</h3>
              <p className="text-sm text-textSecondary">প্রস্তুতির দ্রুত নোট</p>
            </div>
            <a href="#" className="text-sm font-semibold text-primary">সব দেখুন</a>
          </div>
          <div className="space-y-3">
            {books.slice(0, 4).map((book) => (
              <div key={book.id} className="flex items-center justify-between rounded-[18px] border border-border bg-slate-50 p-3">
                <div>
                  <p className="font-semibold text-textPrimary">{book.title}</p>
                  <p className="text-xs text-textSecondary">{book.price || 'Free'}</p>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${book.badge === 'Paid' ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'}`}>
                  {book.badge}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
