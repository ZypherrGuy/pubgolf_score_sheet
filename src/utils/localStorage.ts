import type { TeamScore } from '../types/score'

const STORAGE_KEY = 'pub_golf_scores'

export const loadScores = (): TeamScore[] | null => {
  const json = localStorage.getItem(STORAGE_KEY)
  if (!json) return null
  try {
    return JSON.parse(json) as TeamScore[]
  } catch {
    return null
  }
}

export const saveScores = (scores: TeamScore[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
}
