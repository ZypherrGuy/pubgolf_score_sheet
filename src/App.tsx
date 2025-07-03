// src/App.tsx
import { useState, useEffect } from 'react'
import ScoreTable from './components/ScoreTable'
import type { TeamScore } from './types/score'
import { loadScores, saveScores } from './utils/localStorage'

// === EDIT THESE TO YOUR ACTUAL TEAM NAMES ===
const TEAM_NAMES = [
  'Suck Tuggers',
  'Puff Pussies',
  'The Leprcunts',
  'Two Guys One Cup',
  'Cooked Cocks',
  'Pineapple Predators',
]

const HOLE_COUNT = 9

function App() {
  const [teams, setTeams] = useState<TeamScore[]>(() => {
    const saved = loadScores()
    if (saved) return saved
    return TEAM_NAMES.map(name => ({
      teamName: name,
      holes: Array.from({ length: HOLE_COUNT }, () => ({ score: 0, penalty: 0 })),
    }))
  })

  useEffect(() => {
    saveScores(teams)
  }, [teams])

  const updateHole = (
    teamIdx: number,
    holeIdx: number,
    field: 'score' | 'penalty',
    value: number
  ) => {
    setTeams(prev =>
      prev.map((team, t) =>
        t !== teamIdx
          ? team
          : {
              ...team,
              holes: team.holes.map((h, hI) =>
                hI !== holeIdx ? h : { ...h, [field]: value }
              ),
            }
      )
    )
  }

  return (
    <div>
      <h1>Pub Golf Scorecard</h1>
      <ScoreTable teams={teams} updateHole={updateHole} />
    </div>
  )
}

export default App
