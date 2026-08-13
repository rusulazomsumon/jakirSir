import React from 'react'
import { videos } from '@/data/books'

export default function VideoLibrary(){
  return (
    <section className="pt-6 px-2">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-bold text-textPrimary">🎥 Latest Videos</h2>
          <p className="text-sm text-textSecondary">পূর্ববর্তী বিডিও ক্লাস</p>
        </div>
        <a href="#" className="text-sm font-semibold text-primary">সব ভিডিও দেখুন</a>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {videos.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-[16px] border border-border bg-white shadow-card">
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={video.link}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="space-y-2 p-4">
              <h3 className="text-lg font-semibold text-textPrimary">{video.title}</h3>
              {video.description ? <p className="text-sm text-textSecondary">{video.description}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
