import { CatIcon } from './icons'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
}

export function Hero({ t }: Props) {
  return (
    <section
      id="top"
      className="scroll-mt-16 border-b border-line"
      style={{
        background:
          'linear-gradient(180deg, #fffaf8 0%, #fff1f6 100%)',
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-black uppercase tracking-wider text-rose ring-1 ring-line2">
            🐾 {t.hero.kicker}
          </span>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.05] text-ink text-balance sm:text-6xl">
            {t.hero.titleBefore}
            <span className="text-rose">{t.hero.titleAccent}</span>
            {t.hero.titleAfter}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
            {t.hero.body}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#play"
              className="inline-flex h-12 items-center rounded-xl bg-rose px-6 text-sm font-black text-white shadow-chip transition hover:-translate-y-[1px] hover:bg-roseDark"
            >
              {t.hero.backToBoard}
            </a>
            <a
              href="#how"
              className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-sm font-black text-inkSoft ring-1 ring-line2 transition hover:-translate-y-[1px]"
            >
              {t.hero.rules}
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-3 text-left">
            {[
              ['5–8', t.hero.statSizes],
              ['∞', t.hero.statRandom],
              ['100%', t.hero.statLogic],
            ].map(([n, l]) => (
              <div
                key={l}
                className="rounded-2xl bg-white p-4 shadow-chip ring-1 ring-line2"
              >
                <dt className="text-2xl font-black text-ink">{n}</dt>
                <dd className="mt-1 text-xs font-bold uppercase tracking-wide text-mutedSoft">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-line2">
            <div className="absolute -left-3 -top-3 rounded-full bg-sun px-3 py-1 text-xs font-black text-inkSoft shadow-chip">
              ✨ {t.hero.preview}
            </div>
            <div
              className="grid h-full w-full gap-[3px] rounded-2xl bg-inkSoft p-[3px]"
              style={{
                gridTemplateColumns: 'repeat(4, minmax(0,1fr))',
                gridTemplateRows: 'repeat(4, minmax(0,1fr))',
              }}
            >
              {[
                ['#ffd6df', false],
                ['#ffd6df', true],
                ['#ffe7b4', false],
                ['#ffe7b4', false],
                ['#ffd6df', false],
                ['#cfe6f5', false],
                ['#cfe6f5', false],
                ['#ffe7b4', false],
                ['#cfead7', true],
                ['#cfe6f5', false],
                ['#ffe7b4', false],
                ['#ffe7b4', false],
                ['#cfead7', false],
                ['#cfead7', false],
                ['#cfe6f5', true],
                ['#cfead7', false],
              ].map(([bg, hasCat], i) => (
                <div
                  key={i}
                  className="flex aspect-square min-h-0 items-center justify-center rounded-[3px]"
                  style={{ backgroundColor: bg as string }}
                >
                  {hasCat && (
                    <CatIcon className="h-[70%] w-[70%] text-inkSoft drop-shadow-[0_2px_2px_rgba(60,40,35,0.18)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
