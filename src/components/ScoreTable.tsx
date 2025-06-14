// src/components/ScoreTable.tsx
import React from 'react'
import type { TeamScore } from '../types/score'
import HoleInput from './HoleInput'

interface Props {
  teams: TeamScore[]
  updateHole: (
    teamIdx: number,
    holeIdx: number,
    field: 'score' | 'penalty',
    value: number
  ) => void
}

const ScoreTable: React.FC<Props> = ({ teams, updateHole }) => {
  const holeCount = teams[0]?.holes.length || 0

  // per-hole min/max totals
  const holeStats = Array.from({ length: holeCount }, (_, hIdx) => {
    const totals = teams.map(t => t.holes[hIdx].score + t.holes[hIdx].penalty)
    return { min: Math.min(...totals), max: Math.max(...totals) }
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          {[...Array(holeCount)].map((_, i) => (
            <th key={i}>Hole {i + 1}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, tIdx) => {
          const total = team.holes.reduce(
            (sum, h) => sum + h.score + h.penalty,
            0
          )
          return (
            <tr key={tIdx}>
              <td>{team.teamName}</td>
              {team.holes.map((hole, hIdx) => {
                const cellTotal = hole.score + hole.penalty
                const { min, max } = holeStats[hIdx]

                // prioritize zero-score highlight
                let className = ''
                if (hole.score === 0 && hole.penalty === 0) {
                  className = 'zero'
                } else if (cellTotal === min) {
                  className = 'leader'
                } else if (cellTotal === max) {
                  className = 'last'
                }

                return (
                  <td key={hIdx} className={className}>
                    <HoleInput
                      hole={hole}
                      onChange={(field, value) =>
                        updateHole(tIdx, hIdx, field, value)
                      }
                    />
                  </td>
                )
              })}
              <td><strong>{total}</strong></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default ScoreTable
