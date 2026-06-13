import type { Difficulty } from '../hooks/useGame'
import { DIFFICULTY_SIZE } from '../hooks/useGame'

export interface SeedParams {
  size: number
  seed: number
}

export const SIZE_TO_DIFFICULTY: Record<number, Difficulty> = {
  5: 'easy',
  6: 'medium',
  7: 'hard',
  8: 'expert',
}

export function readSeedFromUrl(): SeedParams | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const rawSeed = params.get('seed')
  const rawSize = params.get('n')
  if (!rawSeed) return null
  const seed = Number.parseInt(rawSeed, 10)
  const size = rawSize ? Number.parseInt(rawSize, 10) : DIFFICULTY_SIZE.easy
  if (!Number.isFinite(seed) || seed < 0) return null
  if (!SIZE_TO_DIFFICULTY[size]) return null
  return { seed: seed >>> 0, size }
}

export function writeSeedToUrl(size: number, seed: number): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('seed', String(seed >>> 0))
  url.searchParams.set('n', String(size))
  window.history.replaceState(null, '', url.toString())
}

export function buildShareUrl(size: number, seed: number): string {
  if (typeof window === 'undefined') return ''
  const url = new URL(window.location.href)
  url.searchParams.set('seed', String(seed >>> 0))
  url.searchParams.set('n', String(size))
  url.hash = 'play'
  return url.toString()
}
