import { shuffleInPlace } from './rng'

// Find all queen-style solutions for the given region map (row-by-row backtracking).
// Stops early once `cap` solutions are found.
export function countSolutions(regions: number[][], cap = 2): number {
  const N = regions.length
  const colUsed = new Array<boolean>(N).fill(false)
  const regUsed = new Array<boolean>(N).fill(false)
  const placed: number[] = new Array(N).fill(-1) // placed[row] = col
  let found = 0

  const dfs = (row: number): void => {
    if (found >= cap) return
    if (row === N) {
      found++
      return
    }
    for (let c = 0; c < N; c++) {
      if (colUsed[c]) continue
      const reg = regions[row][c]
      if (regUsed[reg]) continue
      if (row > 0) {
        const prev = placed[row - 1]
        if (prev === c - 1 || prev === c + 1) continue
      }
      colUsed[c] = true
      regUsed[reg] = true
      placed[row] = c
      dfs(row + 1)
      colUsed[c] = false
      regUsed[reg] = false
      if (found >= cap) return
    }
  }
  dfs(0)
  return found
}

// Generate a random valid solution (queens that satisfy row/col/diagonal-touch).
export function generateQueenSolution(
  N: number,
  rand: () => number,
  maxAttempts = 200,
): [number, number][] | null {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const cols: number[] = []
    const used = new Array<boolean>(N).fill(false)

    const tryRow = (row: number): boolean => {
      if (row === N) return true
      const order = shuffleInPlace(
        Array.from({ length: N }, (_, i) => i),
        rand,
      )
      for (const c of order) {
        if (used[c]) continue
        if (row > 0) {
          const prev = cols[row - 1]
          if (prev === c - 1 || prev === c + 1) continue
        }
        cols.push(c)
        used[c] = true
        if (tryRow(row + 1)) return true
        cols.pop()
        used[c] = false
      }
      return false
    }

    if (tryRow(0)) {
      return cols.map((c, r) => [r, c] as [number, number])
    }
  }
  return null
}

// Grow N regions outward from queens via random flood fill.
// Pure random gives irregular blob shapes — these constrain the puzzle better
// (fewer alternative solutions) than perfectly balanced regions.
export function growRegions(
  N: number,
  queens: [number, number][],
  rand: () => number,
): number[][] {
  const reg: number[][] = Array.from({ length: N }, () =>
    new Array<number>(N).fill(-1),
  )
  queens.forEach(([r, c], i) => {
    reg[r][c] = i
  })

  type Frontier = { r: number; c: number; reg: number }
  const frontier: Frontier[] = []
  const D = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ] as const

  const pushNeighbors = (r: number, c: number, region: number): void => {
    for (const [dr, dc] of D) {
      const nr = r + dr,
        nc = c + dc
      if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue
      if (reg[nr][nc] !== -1) continue
      frontier.push({ r: nr, c: nc, reg: region })
    }
  }
  queens.forEach(([r, c], i) => pushNeighbors(r, c, i))

  let remaining = N * N - N
  while (remaining > 0 && frontier.length > 0) {
    const idx = Math.floor(rand() * frontier.length)
    const f = frontier[idx]
    frontier[idx] = frontier[frontier.length - 1]
    frontier.pop()
    if (reg[f.r][f.c] !== -1) continue
    reg[f.r][f.c] = f.reg
    remaining--
    pushNeighbors(f.r, f.c, f.reg)
  }

  if (remaining > 0) {
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++)
        if (reg[r][c] === -1) {
          let assigned = -1
          for (const [dr, dc] of D) {
            const nr = r + dr,
              nc = c + dc
            if (nr >= 0 && nr < N && nc >= 0 && nc < N && reg[nr][nc] !== -1) {
              assigned = reg[nr][nc]
              break
            }
          }
          reg[r][c] = assigned === -1 ? 0 : assigned
        }
  }
  return reg
}
