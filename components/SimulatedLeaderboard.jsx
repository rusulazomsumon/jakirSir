'use client'

import React, { useMemo } from 'react'
import { ExamInfo, ExamResult } from '@/types/exam'
import { calculateSimulatedRank, SimulatedRank } from '@/utils/examEngine'
import { toBanglaNum } from '@/utils/formatters'

type SimulatedLeaderboardProps = {
  examResult: ExamResult
  examInfo: ExamInfo
  totalMarks: number
  baseParticipants?: number
}

export default function SimulatedLeaderboard({ examResult, examInfo, totalMarks, baseParticipants = 2000 }: SimulatedLeaderboardProps) {
  const simulatedRank: SimulatedRank = useMemo(() => {
    return calculateSimulatedRank(examResult.totalScore, totalMarks, examInfo.cutMark ?? 49, baseParticipants)
  }, [examResult.totalScore, totalMarks, examInfo.cutMark, baseParticipants])

  const { rank, totalParticipants, percentile } = simulatedRank

  return (
    <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-5 shadow-sm sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900">📊 Leaderboard</h3>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Your Rank</p>
          <p className="mt-1 text-xl font-bold text-slate-900">
            #{toBanglaNum(rank)} / {toBanglaNum(totalParticipants)}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Percentile</p>
          <p className="mt-1 text-xl font-bold text-blue-700">{toBanglaNum(percentile.toFixed(1))}%</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">Based on {toBanglaNum(totalParticipants - 1)} participants</p>
    </div>
  )
}
