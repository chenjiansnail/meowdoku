import type { Level } from './types'
import { mulberry32 } from './rng'
import { countSolutions, generateQueenSolution, growRegions } from './solver'

// Generate a uniquely-solvable level for the given board size.
// Retries with new region growths and (rarely) new queen layouts until unique.
export function generateLevel(size: number, seed?: number): Level {
  const baseSeed = seed ?? Math.floor(Math.random() * 0xffff_ffff)
  let s = baseSeed

  for (let seedAttempt = 0; seedAttempt < 200; seedAttempt++) {
    for (let layoutAttempt = 0; layoutAttempt < 40; layoutAttempt++) {
      const layoutSeed = (s + layoutAttempt * 0x9e3779b1) >>> 0
      const rand = mulberry32(layoutSeed)
      const queens = generateQueenSolution(size, rand)
      if (!queens) continue

      for (let growAttempt = 0; growAttempt < 300; growAttempt++) {
        const rand2 = mulberry32((layoutSeed ^ (growAttempt * 0x85ebca6b)) >>> 0)
        const regions = growRegions(size, queens, rand2)
        const count = countSolutions(regions, 2)
        if (count === 1) {
          return { size, regions, solution: queens, seed: layoutSeed }
        }
      }
    }
    s = (s + 0x6d2b79f5) >>> 0
  }

  throw new Error(`Unable to generate a unique ${size}x${size} level`)
}

// Conflict scan: returns a parallel grid of {hasConflict, why} for each placed cat.
export interface CellConflictFlags {
  row: boolean
  col: boolean
  region: boolean
  touch: boolean
}

export function scanConflicts(
  size: number,
  regions: number[][],
  cats: boolean[][],
): CellConflictFlags[][] {
  const flags: CellConflictFlags[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      row: false,
      col: false,
      region: false,
      touch: false,
    })),
  )
  const rowCount = new Array<number>(size).fill(0)
  const colCount = new Array<number>(size).fill(0)
  const regCount = new Array<number>(size).fill(0)
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (cats[r][c]) {
        rowCount[r]++
        colCount[c]++
        regCount[regions[r][c]]++
      }
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (cats[r][c]) {
        if (rowCount[r] > 1) flags[r][c].row = true
        if (colCount[c] > 1) flags[r][c].col = true
        if (regCount[regions[r][c]] > 1) flags[r][c].region = true
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue
            const nr = r + dr,
              nc = c + dc
            if (nr < 0 || nr >= size || nc < 0 || nc >= size) continue
            if (cats[nr][nc]) {
              flags[r][c].touch = true
              break
            }
          }
      }
  return flags
}

export function isSolved(
  size: number,
  regions: number[][],
  cats: boolean[][],
): boolean {
  let total = 0
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) if (cats[r][c]) total++
  if (total !== size) return false
  const flags = scanConflicts(size, regions, cats)
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (cats[r][c]) {
        const f = flags[r][c]
        if (f.row || f.col || f.region || f.touch) return false
      }
  return true
}
