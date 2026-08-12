import React from 'react'

export default function BlogGrid() {
  const posts = Array.from({ length: 4 }).map((_, i) => ({ id: i, title: `Blog Post ${i+1}`, excerpt: 'Preparation tips and updates.' }))
  return (
    <section className="pt-6 px-2">
      <h2 className="text-[22px] font-bold text-textPrimary">Blog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {posts.map(p => (
          <article key={p.id} className="rounded-[12px] border border-border bg-white p-3 shadow-card">
            <h3 className="font-semibold text-textPrimary">{p.title}</h3>
            <p className="text-sm text-textSecondary mt-2">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
