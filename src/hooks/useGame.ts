import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CellState, Level } from '../game/types'
import { generateLevel } from '../game/engine'
import { isSolved, scanConflicts } from '../game/engine'
import {
  clearStats as clearStatsStorage,
  loadStats,
  recordPlay,
  recordSolve,
  saveStats,
  type SolveResult,
  type Stats,
} from '../storage/stats'
import {
  buildShareUrl,
  readSeedFromUrl,
  SIZE_TO_DIFFICULTY,
  writeSeedToUrl,
} from '../storage/url'

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

export const DIFFICULTY_SIZE: Record<Difficulty, number> = {
  easy: 5,
  medium: 6,
  hard: 7,
  expert: 8,
}

interface HistoryEntry {
  r: number
  c: number
  prev: CellState
  next: CellState
}

function emptyGrid<T>(size: number, value: T): T[][] {
  return Array.from({ length: size }, () => Array.from({ length: size }, () => value))
}

function hasSingletonRegion(level: Level): boolean {
  const counts = new Array<number>(level.size).fill(0)
  for (let r = 0; r < level.size; r++)
    for (let c = 0; c < level.size; c++) counts[level.regions[r][c]]++
  return counts.some((count) => count === 1)
}

function starterPosition(level: Level): [number, number] | null {
  if (hasSingletonRegion(level)) return null
  return level.solution[level.seed % level.solution.length]
}

function starterCells(level: Level): boolean[][] {
  const grid = emptyGrid(level.size, false)
  const starter = starterPosition(level)
  if (starter) {
    const [r, c] = starter
    grid[r][c] = true
  }
  return grid
}

function initialCells(level: Level): CellState[][] {
  const grid = emptyGrid(level.size, 'empty' as CellState)
  const starter = starterPosition(level)
  if (starter) {
    const [r, c] = starter
    grid[r][c] = 'cat'
  }
  return grid
}

export function useGame(initialDifficulty: Difficulty = 'easy') {
  // Honor seed/size from URL on first mount so a shared link loads the same puzzle.
  const [{ initialLevel, initialDif }] = useState(() => {
    const fromUrl = readSeedFromUrl()
    if (fromUrl) {
      const dif = SIZE_TO_DIFFICULTY[fromUrl.size] ?? initialDifficulty
      return {
        initialLevel: generateLevel(fromUrl.size, fromUrl.seed),
        initialDif: dif,
      }
    }
    const lvl = generateLevel(DIFFICULTY_SIZE[initialDifficulty])
    writeSeedToUrl(lvl.size, lvl.seed)
    return { initialLevel: lvl, initialDif: initialDifficulty }
  })
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDif)
  const [level, setLevel] = useState<Level>(initialLevel)
  const [cells, setCells] = useState<CellState[][]>(() => initialCells(level))
  const [lockedCells, setLockedCells] = useState<boolean[][]>(() => starterCells(level))
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [hearts, setHearts] = useState(3)
  const [seconds, setSeconds] = useState(0)
  const [solved, setSolved] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [stats, setStats] = useState<Stats>(() => loadStats())
  const [lastResult, setLastResult] = useState<SolveResult | null>(null)
  const tickRef = useRef<number | null>(null)
  const recordedRef = useRef(false) // guard so we record each game only once

  const resetForLevel = useCallback((lvl: Level) => {
    setCells(initialCells(lvl))
    setLockedCells(starterCells(lvl))
    setHistory([])
    setHearts(3)
    setSeconds(0)
    setSolved(false)
    setGameOver(false)
    setLastResult(null)
    recordedRef.current = false
  }, [])

  useEffect(() => {
    if (solved || gameOver) {
      if (tickRef.current) window.clearInterval(tickRef.current)
      tickRef.current = null
      return
    }
    tickRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
    }
  }, [solved, gameOver])

  const cats = useMemo(() => {
    const grid = emptyGrid(level.size, false)
    for (let r = 0; r < level.size; r++)
      for (let c = 0; c < level.size; c++) grid[r][c] = cells[r][c] === 'cat'
    return grid
  }, [cells, level.size])

  const conflicts = useMemo(
    () => scanConflicts(level.size, level.regions, cats),
    [cats, level],
  )

  useEffect(() => {
    if (isSolved(level.size, level.regions, cats)) {
      setSolved(true)
    }
  }, [cats, level])

  // Persist stats when a game finishes (won or lost), exactly once per round.
  useEffect(() => {
    if (recordedRef.current) return
    if (solved) {
      recordedRef.current = true
      setStats((s) => {
        const { stats: next, result } = recordSolve(s, difficulty, seconds)
        saveStats(next)
        setLastResult(result)
        return next
      })
    } else if (gameOver) {
      recordedRef.current = true
      setStats((s) => {
        const next = recordPlay(s, difficulty)
        saveStats(next)
        return next
      })
    }
  }, [solved, gameOver, difficulty, seconds])

  const cycleCell = useCallback(
    (r: number, c: number) => {
      if (solved || gameOver) return
      if (lockedCells[r]?.[c]) return
      setCells((prev) => {
        const cur = prev[r][c]
        const next: CellState =
          cur === 'empty' ? 'mark' : cur === 'mark' ? 'cat' : 'empty'
        const newGrid = prev.map((row) => row.slice())
        newGrid[r][c] = next
        setHistory((h) => [...h, { r, c, prev: cur, next }])
        if (next === 'cat') {
          const newCats = newGrid.map((row) => row.map((s) => s === 'cat'))
          const flags = scanConflicts(level.size, level.regions, newCats)
          const f = flags[r][c]
          if (f.row || f.col || f.region || f.touch) {
            setHearts((h) => {
              const left = Math.max(0, h - 1)
              if (left === 0) setGameOver(true)
              return left
            })
          }
        }
        return newGrid
      })
    },
    [solved, gameOver, level, lockedCells],
  )

  const undo = useCallback(() => {
    if (solved || gameOver) return
    setHistory((h) => {
      if (h.length === 0) return h
      const last = h[h.length - 1]
      setCells((prev) => {
        const newGrid = prev.map((row) => row.slice())
        newGrid[last.r][last.c] = last.prev
        return newGrid
      })
      return h.slice(0, -1)
    })
  }, [solved, gameOver])

  const restart = useCallback(() => {
    resetForLevel(level)
  }, [level, resetForLevel])

  const newGame = useCallback(
    (d?: Difficulty) => {
      const dif = d ?? difficulty
      const lvl = generateLevel(DIFFICULTY_SIZE[dif])
      setDifficulty(dif)
      setLevel(lvl)
      resetForLevel(lvl)
      writeSeedToUrl(lvl.size, lvl.seed)
    },
    [difficulty, resetForLevel],
  )

  const shareUrl = useMemo(
    () => buildShareUrl(level.size, level.seed),
    [level],
  )

  const resetStats = useCallback(() => {
    clearStatsStorage()
    setStats(loadStats())
    setLastResult(null)
  }, [])

  return {
    difficulty,
    setDifficulty,
    level,
    cells,
    lockedCells,
    conflicts,
    hearts,
    seconds,
    solved,
    gameOver,
    cycleCell,
    undo,
    restart,
    newGame,
    canUndo: history.length > 0,
    stats,
    lastResult,
    resetStats,
    shareUrl,
  }
}
