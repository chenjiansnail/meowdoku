import { useEffect, useState } from 'react'
import { GameBoard } from './GameBoard'
import { GameControls } from './GameControls'
import { GameStatus } from './GameStatus'
import { StatsPanel } from './StatsPanel'
import { Confetti } from './Confetti'
import { useGame } from '../hooks/useGame'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
}

export function PlaySection({ t }: Props) {
  const game = useGame('easy')
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (game.lastResult?.isNewBest) {
      setShowConfetti(true)
    }
  }, [game.lastResult])

  return (
    <section
      id="play"
      className="min-h-[calc(100vh-64px)] scroll-mt-16 border-b border-line bg-sand px-3 py-4 sm:px-6 sm:py-8 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 items-start gap-6 2xl:grid-cols-[300px_minmax(0,1fr)_300px]">
        <aside className="hidden 2xl:block pt-20">
          <StatsPanel
            t={t}
            stats={game.stats}
            current={game.difficulty}
            onReset={game.resetStats}
          />
        </aside>

        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
          <div className="w-full max-w-[560px] rounded-2xl bg-white/85 px-4 py-3 shadow-chip ring-1 ring-line2 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.18em] text-rose">
                  {t.play.kicker}
                </div>
                <h1 className="mt-1 text-2xl font-black leading-tight text-ink sm:text-3xl">
                  {t.play.title}
                </h1>
              </div>
              <div className="hidden rounded-full bg-sun/30 px-3 py-1 text-xs font-black text-inkSoft ring-1 ring-sun sm:block">
                {t.play.unique}
              </div>
            </div>
          </div>
          <GameControls
            t={t}
            difficulty={game.difficulty}
            shareUrl={game.shareUrl}
            onDifficulty={(d) => game.newGame(d)}
            hearts={game.hearts}
            seconds={game.seconds}
            onUndo={game.undo}
            onRestart={game.restart}
            onNewGame={() => game.newGame()}
            canUndo={game.canUndo}
          />
          <GameBoard
            t={t}
            size={game.level.size}
            regions={game.level.regions}
            cells={game.cells}
            lockedCells={game.lockedCells}
            conflicts={game.conflicts}
            onCell={game.cycleCell}
            disabled={game.solved || game.gameOver}
          />
          <div className="mx-auto w-full max-w-[560px] rounded-2xl bg-white/85 px-5 py-4 text-sm leading-7 text-muted ring-1 ring-line2">
            <span className="font-black text-ink">{t.play.label}</span>{' '}
            {t.play.instruction}
          </div>
          <div className="mx-auto w-full max-w-[560px] 2xl:hidden">
            <StatsPanel
              t={t}
              stats={game.stats}
              current={game.difficulty}
              onReset={game.resetStats}
            />
          </div>
        </div>

        <aside className="hidden 2xl:block pt-20 space-y-4">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-line2 shadow-sm">
            <div className="text-xs font-black uppercase tracking-widest text-rose">
              {t.play.tipTitle}
            </div>
            <p className="mt-2 text-sm leading-7 text-muted">
              {t.play.tipBody}
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 ring-1 ring-line2 shadow-sm">
            <div className="text-xs font-black uppercase tracking-widest text-rose">
              {t.play.carefulTitle}
            </div>
            <p className="mt-2 text-sm leading-7 text-muted">
              {t.play.carefulBody}
            </p>
          </div>
        </aside>
      </div>

      <GameStatus
        t={t}
        solved={game.solved}
        gameOver={game.gameOver}
        onRestart={game.restart}
        onNewGame={() => game.newGame()}
      />
      <Confetti show={showConfetti} onDone={() => setShowConfetti(false)} />
    </section>
  )
}
