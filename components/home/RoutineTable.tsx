import React from 'react'

export default function RoutineTable() {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  return (
    <section className="pt-6">
      <div className="rounded-[16px] border border-border bg-white p-4 shadow-card">
        <h3 className="font-semibold mb-3">Weekly Exam Routine</h3>
        <div className="grid grid-cols-1 gap-2">
          {days.map((d) => (
            <div key={d} className="flex items-center justify-between rounded-[12px] border border-border px-3 py-2">
              <div>
                <p className="font-bold">{d}</p>
                <p className="text-xs text-textSecondary">Course</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">07:00 PM</p>
                <p className="text-xs text-textSecondary">Live</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
