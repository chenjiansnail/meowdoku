import type { CellState } from '../game/types'
import type { CellConflictFlags } from '../game/engine'
import { regionColor } from '../game/palette'
import { CatIcon, XMarkIcon } from './icons'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
  size: number
  regions: number[][]
  cells: CellState[][]
  lockedCells: boolean[][]
  conflicts: CellConflictFlags[][]
  onCell: (r: number, c: number) => void
  disabled?: boolean
}

function conflictReason(flags: CellConflictFlags, t: Translation): string {
  if (flags.row) return t.board.conflicts.row
  if (flags.col) return t.board.conflicts.col
  if (flags.region) return t.board.conflicts.region
  if (flags.touch) return t.board.conflicts.touch
  return ''
}

export function GameBoard({
  t,
  size,
  regions,
  cells,
  lockedCells,
  conflicts,
  onCell,
  disabled,
}: Props) {
  return (
    <div
      className="grid w-full max-w-[560px] mx-auto gap-[2px] rounded-2xl bg-line2 p-1.5 shadow-card ring-1 ring-line2"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        aspectRatio: '1 / 1',
      }}
    >
      {Array.from({ length: size }).map((_, r) =>
        Array.from({ length: size }).map((__, c) => {
          const state = cells[r][c]
          const reg = regions[r][c]
          const cf = conflicts[r][c]
          const locked = lockedCells[r]?.[c] === true
          const hasConflict = state === 'cat' && (cf.row || cf.col || cf.region || cf.touch)
          const reason = hasConflict ? conflictReason(cf, t) : ''
          const cellLabel = t.board.rowCol(r + 1, c + 1)
          return (
            <button
              key={`${r}-${c}`}
              type="button"
              disabled={disabled || locked}
              onClick={() => onCell(r, c)}
              className={[
                'relative flex aspect-square min-h-0 items-center justify-center overflow-hidden',
                'box-border rounded-[6px] border border-white/90 shadow-cell',
                'transition duration-150',
                locked ? 'ring-2 ring-sun ring-inset' : '',
                hasConflict ? 'z-10 ring-2 ring-rose ring-inset' : '',
                disabled || locked
                  ? locked && !disabled
                    ? 'cursor-default'
                    : 'cursor-not-allowed'
                  : 'hover:-translate-y-[1px] hover:brightness-105 active:scale-95',
              ].join(' ')}
              style={{
                backgroundColor: hasConflict ? '#ffb6c5' : regionColor(reg),
              }}
              aria-label={`${cellLabel}${locked ? `, ${t.board.starterCat}` : ''}${reason ? `, ${reason}` : ''}`}
              title={locked ? t.board.starterCat : reason || cellLabel}
            >
              {hasConflict && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-black text-rose shadow-chip">
                  !
                </span>
              )}
              {state === 'cat' && (
                <CatIcon
                  className={`h-[68%] w-[68%] animate-catPop ${
                    hasConflict ? 'text-[#b8324d]' : 'text-inkSoft'
                  } drop-shadow-[0_2px_2px_rgba(60,40,35,0.18)]`}
                />
              )}
              {state === 'mark' && (
                <XMarkIcon className="h-[40%] w-[40%] animate-pawFade text-inkSoft/45" />
              )}
            </button>
          )
        }),
      )}
    </div>
  )
}
