export interface Hole {
    score: number
    penalty: number
  }
  export interface TeamScore {
    teamName: string
    holes: Hole[]
  }