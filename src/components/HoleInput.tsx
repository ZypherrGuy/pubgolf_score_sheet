import React from 'react'
import type { Hole } from '../types/score'

interface Props {
  hole: Hole
  onChange: (field: 'score' | 'penalty', value: number) => void
}

const HoleInput: React.FC<Props> = ({ hole, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
    <label>
      S: <input
        type="number"
        min={0}
        value={hole.score}
        onChange={e => onChange('score', parseInt(e.target.value) || 0)}
      />
    </label>
    <label>
      P: <input
        type="number"
        min={0}
        value={hole.penalty}
        onChange={e => onChange('penalty', parseInt(e.target.value) || 0)}
      />
    </label>
  </div>
)

export default HoleInput
