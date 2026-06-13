import { CatIcon } from './icons'
import { LANGUAGES, type Language, type Translation } from '../i18n'

interface Props {
  language: Language
  onLanguage: (language: Language) => void
  t: Translation
}

export function SiteHeader({ language, onLanguage, t }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#play" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose/15 text-rose">
            <CatIcon className="h-7 w-7" />
          </span>
          <div className="leading-tight">
            <div className="text-base font-black text-ink">{t.brand.name}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-mutedSoft">
              {t.brand.tagline}
            </div>
          </div>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {[
            ['#play', t.nav.play],
            ['#how', t.nav.how],
            ['#features', t.nav.features],
            ['#faq', t.nav.faq],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3 py-2 text-sm font-bold text-muted transition hover:bg-cream hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="language-select">
            Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(event) => onLanguage(event.target.value as Language)}
            className="h-10 rounded-full bg-white px-2 text-xs font-black text-inkSoft shadow-chip ring-1 ring-line2 outline-none transition hover:bg-cream sm:px-3"
          >
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.short}
              </option>
            ))}
          </select>
          <a
            href="#play"
            className="inline-flex h-10 items-center rounded-full bg-rose px-3 text-sm font-black text-white shadow-chip transition hover:-translate-y-[1px] hover:bg-roseDark sm:px-4"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
