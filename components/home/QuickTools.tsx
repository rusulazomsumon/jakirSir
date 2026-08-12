import React from 'react'
import { tools } from '@/data/tools'

export default function QuickTools() {
  return (
    <section className="pt-6">
      <div className="mb-3 px-2 flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-textPrimary">⚡ Quick Tools</h2>
        <a href="#popularCourses" className="text-sm font-semibold text-primary">সব দেখুন</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 px-2">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={tool.link}
            className="group relative flex flex-col items-center justify-center rounded-[18px] border border-border bg-white p-4 text-center shadow-card transition hover:-translate-y-1"
          >
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-textPrimary" style={{ color: tool.color }}>
              <i className={tool.icon} />
            </div>
            <span className="text-sm font-semibold text-textPrimary">{tool.label}</span>
            {tool.liveBadge ? (
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                {tool.liveBadge}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  )
}
