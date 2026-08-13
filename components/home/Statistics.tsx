import React from 'react'

export default function Statistics(){
  const stats = [
    {label:'Followers', value:'446K+'},
    {label:'Students', value:'12K+'},
    {label:'Courses', value:'120+'},
    {label:'Videos', value:'1.2K+'}
  ]
  return (
    <section className="pt-6 px-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-[16px] bg-white p-4 text-center shadow-card">
            <div className="text-xl font-bold text-primary">{s.value}</div>
            <div className="text-sm text-textSecondary">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
