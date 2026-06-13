export type CellState = 'empty' | 'mark' | 'cat'

export interface Level {
  size: number
  regions: number[][]   // size×size, each cell = region id (0..size-1)
  solution: [number, number][] // queen positions, length = size
  seed: number
}

export interface Conflict {
  row: boolean
  col: boolean
  region: boolean
  touch: boolean
}
