import { useEffect, useState } from 'react'
import { CatIcon } from './icons'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
  solved: boolean
  gameOver: boolean
  onNewGame: () => void
  onRestart: () => void
}

export function GameStatus({
  t,
  solved,
  gameOver,
  onNewGame,
  onRestart,
}: Props) {
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    if (!solved && !gameOver) {
      setShowActions(false)
      return
    }
    if (gameOver) {
      setShowActions(true)
      return
    }
    setShowActions(false)
    const timer = window.setTimeout(() => setShowActions(true), 1750)
    return () => window.clearTimeout(timer)
  }, [solved, gameOver])

  if (!solved && !gameOver) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-inkSoft/35 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-sm flex-col items-center">
        {solved ? (
          <div className="relative flex h-56 w-56 items-center justify-center">
            <div className="absolute inset-7 animate-winGlow rounded-full bg-sun/35 blur-xl" />
            <div className="absolute inset-0 animate-winSparkle rounded-full border-4 border-dashed border-white/70" />
            <CatIcon className="relative h-32 w-32 animate-winCatDance text-inkSoft drop-shadow-[0_18px_22px_rgba(52,36,33,0.25)]" />
          </div>
        ) : (
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-line2">
            <div className="text-6xl">😿</div>
          </div>
        )}
        {showActions && (
          <div className="mt-5 grid w-full grid-cols-2 gap-3 animate-winActionsIn">
            <button
              onClick={onRestart}
              className="flex h-12 items-center justify-center rounded-xl bg-white text-sm font-black text-inkSoft shadow-chip ring-1 ring-line2 transition hover:-translate-y-[1px]"
            >
              {t.status.again}
            </button>
            <button
              onClick={onNewGame}
              className="flex h-12 items-center justify-center rounded-xl bg-rose text-sm font-black text-white shadow-chip transition hover:-translate-y-[1px] hover:bg-roseDark"
            >
              {t.status.next}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
