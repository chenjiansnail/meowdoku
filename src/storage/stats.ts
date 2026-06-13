import type { Difficulty } from '../hooks/useGame'

export interface DifficultyStats {
  bestSeconds: number | null
  wins: number
  plays: number
}

export type Stats = Record<Difficulty, DifficultyStats>

const KEY = 'meowdoku:stats:v1'

const emptyStats = (): DifficultyStats => ({
  bestSeconds: null,
  wins: 0,
  plays: 0,
})

const fresh = (): Stats => ({
  easy: emptyStats(),
  medium: emptyStats(),
  hard: emptyStats(),
  expert: emptyStats(),
})

export function loadStats(): Stats {
  if (typeof window === 'undefined') return fresh()
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return fresh()
    const parsed = JSON.parse(raw) as Partial<Stats>
    const out = fresh()
    for (const k of Object.keys(out) as Difficulty[]) {
      const v = parsed[k]
      if (v && typeof v === 'object') {
        out[k] = {
          bestSeconds:
            typeof v.bestSeconds === 'number' && v.bestSeconds > 0
              ? v.bestSeconds
              : null,
          wins: typeof v.wins === 'number' ? v.wins : 0,
          plays: typeof v.plays === 'number' ? v.plays : 0,
        }
      }
    }
    return out
  } catch {
    return fresh()
  }
}

export function saveStats(stats: Stats): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(stats))
  } catch {
    // quota / disabled — ignore silently
  }
}

export function clearStats(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

export interface SolveResult {
  isNewBest: boolean
  previousBest: number | null
}

// Record a solved game. Returns whether this run was a new personal best.
export function recordSolve(
  stats: Stats,
  difficulty: Difficulty,
  seconds: number,
): { stats: Stats; result: SolveResult } {
  const prev = stats[difficulty]
  const isNewBest = prev.bestSeconds === null || seconds < prev.bestSeconds
  const next: Stats = {
    ...stats,
    [difficulty]: {
      bestSeconds: isNewBest ? seconds : prev.bestSeconds,
      wins: prev.wins + 1,
      plays: prev.plays + 1,
    },
  }
  return {
    stats: next,
    result: { isNewBest, previousBest: prev.bestSeconds },
  }
}

// Record a loss / abandonment as just a play count bump.
export function recordPlay(stats: Stats, difficulty: Difficulty): Stats {
  const prev = stats[difficulty]
  return {
    ...stats,
    [difficulty]: { ...prev, plays: prev.plays + 1 },
  }
}
