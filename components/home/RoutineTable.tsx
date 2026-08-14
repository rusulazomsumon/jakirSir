"use client"

import React, { useState, useEffect } from 'react'

export default function RoutineTable() {
  const [currentDayIndex, setCurrentDayIndex] = useState<number | null>(null)

  // JS Day Index: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  useEffect(() => {
    const today = new Date().getDay()
    setCurrentDayIndex(today)
  }, [])

  const routineData = [
    { day: 'শনিবার', dayIndex: 6, subjects: 'বাংলা + English', isMega: false },
    { day: 'রবিবার', dayIndex: 0, subjects: 'গণিত + সাধারণ জ্ঞান', isMega: false },
    { day: 'সোমবার', dayIndex: 1, subjects: 'বাংলা + সাধারণ জ্ঞান', isMega: false },
    { day: 'মঙ্গলবার', dayIndex: 2, subjects: 'English + গণিত', isMega: false },
    { day: 'বুধবার', dayIndex: 3, subjects: 'বাংলা + গণিত', isMega: false },
    { day: 'বৃহস্পতিবার', dayIndex: 4, subjects: 'English + সাধারণ জ্ঞান', isMega: false },
    { 
      day: 'শুক্রবার', 
      dayIndex: 5, 
      subjects: 'সাপ্তাহিক মেগা মডেল টেস্ট', 
      isMega: true 
    },
  ]

  return (
    <section className="pt-6 w-full max-w-4xl mx-auto px-2 sm:px-4">
      <div className="rounded-[16px] border border-slate-200 bg-white p-3.5 sm:p-5 shadow-sm">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-3 border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Weekly Exam Routine
            </h3>
            <p className="text-xs text-slate-500">
              সাপ্তাহিক পরীক্ষার নিয়মাবলী ও সময়সূচী
            </p>
          </div>
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-amber-200/60 flex items-center gap-1">
              ⏰ প্রতিদিন রাত ০৮:০০ টা
            </span>
            <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-100">
              ২টি বিষয়
            </span>
          </div>
        </div>

        {/* 3-Column Compact Table */}
        <div className="w-full">
          <table className="w-full text-left table-fixed border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold">
                <th className="py-2.5 px-2 w-[30%] text-slate-700">দিন</th>
                <th className="py-2.5 px-2 w-[40%] text-slate-700">বিষয়</th>
                <th className="py-2.5 px-2 w-[30%] text-right text-slate-700">পরীক্ষা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {routineData.map((item, index) => {
                const isToday = currentDayIndex === item.dayIndex

                return (
                  <tr 
                    key={index} 
                    className={`transition-colors ${
                      isToday 
                        ? 'bg-blue-50/50 hover:bg-blue-50/80 font-bold' 
                        : item.isMega 
                          ? 'bg-amber-50/30' 
                          : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Column 1: Day */}
                    <td className="py-3 px-2 font-bold text-slate-800 w-[30%] truncate">
                      <div className="flex items-center gap-1">
                        {item.day}
                        {isToday && (
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="আজকের দিন" />
                        )}
                      </div>
                    </td>

                    {/* Column 2: Subject */}
                    <td className="py-3 px-2 font-medium w-[40%]">
                      {item.isMega ? (
                        <span className="inline-block font-bold text-amber-700 text-[11px] leading-tight">
                          🏆 {item.subjects}
                        </span>
                      ) : (
                        <span className={`${isToday ? 'text-blue-900 font-semibold' : 'text-slate-700'} text-xs leading-tight`}>
                          {item.subjects}
                        </span>
                      )}
                    </td>

                    {/* Column 3: Dynamic Action Button */}
                    <td className="py-3 px-2 text-right w-[30%]">
                      {isToday ? (
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className={`inline-block px-3 py-1 rounded-md text-xs font-semibold transition-all shadow-md ${
                            item.isMega
                              ? 'bg-amber-600 hover:bg-amber-700 text-white animate-bounce'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          Start
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-block px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        >
                          Locked
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}