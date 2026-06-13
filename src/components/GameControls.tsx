import { useState } from 'react'
import { HeartIcon } from './icons'
import type { Difficulty } from '../hooks/useGame'
import { DIFFICULTY_SIZE } from '../hooks/useGame'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
  hearts: number
  seconds: number
  difficulty: Difficulty
  shareUrl: string
  onDifficulty: (d: Difficulty) => void
  onUndo: () => void
  onRestart: () => void
  onNewGame: () => void
  canUndo: boolean
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to legacy path
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function GameControls({
  t,
  hearts,
  seconds,
  difficulty,
  shareUrl,
  onDifficulty,
  onUndo,
  onRestart,
  onNewGame,
  canUndo,
}: Props) {
  const [toast, setToast] = useState<string | null>(null)

  const handleShare = async (): Promise<void> => {
    const ok = await copyToClipboard(shareUrl)
    setToast(ok ? t.controls.copied : t.controls.copyFailed)
    window.setTimeout(() => setToast(null), 2400)
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px] space-y-3">
      <div className="grid gap-3 rounded-2xl bg-white/90 p-3 shadow-chip ring-1 ring-line2 sm:p-3.5">
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-full rounded-2xl bg-cream p-1.5 ring-1 ring-line2">
          {(Object.keys(DIFFICULTY_SIZE) as Difficulty[]).map((d) => {
            const active = d === difficulty
            return (
              <button
                key={d}
                onClick={() => onDifficulty(d)}
                className={[
                  'min-h-9 flex-1 whitespace-nowrap rounded-full px-2 text-[10px] font-black uppercase tracking-normal transition sm:min-h-10 sm:px-4 sm:text-[13px] sm:tracking-wider',
                  active
                    ? 'bg-inkSoft text-white shadow-chip'
                    : 'text-muted hover:bg-cream hover:text-inkSoft',
                ].join(' ')}
              >
                {t.controls.difficulty[d]} · {DIFFICULTY_SIZE[d]}
              </button>
            )
          })}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-black text-leaf ring-1 ring-line2">
            <span aria-hidden="true">⏱</span>
            <span className="tabular-nums">{formatTime(seconds)}</span>
          </div>
          <div className="flex h-11 min-w-[116px] items-center justify-center gap-1 rounded-xl bg-white px-3 text-rose ring-1 ring-line2">
            {Array.from({ length: 3 }).map((_, i) => (
              <HeartIcon
                key={i}
                className={`h-4 w-4 ${i < hearts ? 'text-rose' : 'text-line2'}`}
              />
            ))}
          </div>
        </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="flex h-11 items-center justify-center gap-1 rounded-xl bg-white px-2 text-sm font-black text-inkSoft ring-1 ring-line2 transition hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          <span aria-hidden="true">↶</span>
          <span>{t.controls.undo}</span>
        </button>
        <button
          onClick={onRestart}
          className="flex h-11 items-center justify-center gap-1 rounded-xl bg-white px-2 text-sm font-black text-inkSoft ring-1 ring-line2 transition hover:-translate-y-[1px]"
        >
          <span aria-hidden="true">↻</span>
          <span>{t.controls.restart}</span>
        </button>
        <button
          onClick={handleShare}
          className="flex h-11 items-center justify-center gap-1 rounded-xl bg-white px-2 text-sm font-black text-inkSoft ring-1 ring-line2 transition hover:-translate-y-[1px]"
          title={t.controls.copyTitle}
        >
          <span aria-hidden="true">🔗</span>
          <span>{t.controls.share}</span>
        </button>
        <button
          onClick={onNewGame}
          className="flex h-11 items-center justify-center gap-1 rounded-xl bg-rose px-2 text-sm font-black text-white shadow-chip transition hover:-translate-y-[1px] hover:bg-roseDark"
        >
          <span aria-hidden="true">🎲</span>
          <span>{t.controls.newGame}</span>
        </button>
      </div>
      </div>

      {toast && (
        <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 max-w-[calc(100vw-2rem)] -translate-x-1/2 animate-toastIn whitespace-nowrap rounded-full bg-inkSoft px-4 py-2 text-xs font-black text-white shadow-card">
          {toast}
        </div>
      )}
    </div>
  )
}
