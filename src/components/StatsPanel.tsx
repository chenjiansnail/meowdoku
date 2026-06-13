import type { Stats } from '../storage/stats'
import type { Difficulty } from '../hooks/useGame'
import { DIFFICULTY_SIZE } from '../hooks/useGame'
import type { Translation } from '../i18n'

function formatTime(s: number | null, emptyText: string): string {
  if (s === null) return emptyText
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m.toString().padStart(2, '0')}:${r.toString().padStart(2, '0')}`
}

interface Props {
  t: Translation
  stats: Stats
  current: Difficulty
  onReset: () => void
}

export function StatsPanel({ t, stats, current, onReset }: Props) {
  const totalWins = (Object.keys(stats) as Difficulty[]).reduce(
    (s, k) => s + stats[k].wins,
    0,
  )
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-line2 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-rose">
            {t.stats.title}
          </div>
          <div className="mt-1 text-sm font-semibold text-mutedSoft">
            <span className="font-black text-ink">{t.stats.totalWins(totalWins)}</span>
          </div>
        </div>
        {totalWins > 0 && (
          <button
            onClick={() => {
              if (window.confirm(t.stats.clearConfirm)) onReset()
            }}
            className="rounded-full px-3 py-1 text-[11px] font-bold text-mutedSoft transition hover:bg-cream hover:text-ink"
          >
            {t.stats.clear}
          </button>
        )}
      </div>
      <ul className="mt-4 space-y-2">
        {(Object.keys(stats) as Difficulty[]).map((d) => {
          const s = stats[d]
          const active = d === current
          return (
            <li
              key={d}
              className={[
                'flex items-baseline justify-between rounded-xl px-3 py-2.5 transition',
                active
                  ? 'bg-rose/10 ring-1 ring-rose/30'
                  : 'bg-cream/60 ring-1 ring-line2/60',
              ].join(' ')}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-sm font-black ${
                    active ? 'text-rose' : 'text-ink'
                  }`}
                >
                  {t.controls.difficulty[d]}
                </span>
                <span className="text-[11px] font-semibold text-mutedSoft">
                  {DIFFICULTY_SIZE[d]}×{DIFFICULTY_SIZE[d]}
                </span>
              </div>
              <div className="text-right">
                <div className="font-black text-leaf text-sm tabular-nums">
                  {formatTime(s.bestSeconds, t.stats.emptyTime)}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-wide text-mutedSoft">
                  {t.stats.wins(s.wins)}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
