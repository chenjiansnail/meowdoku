import { CatIcon } from './icons'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
}

export function SiteFooter({ t }: Props) {
  return (
    <footer className="border-t border-line bg-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
              <CatIcon className="h-7 w-7" />
            </span>
            <div className="leading-tight">
              <div className="text-base font-black">{t.brand.name}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Meow Puzzle Lab
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
            {t.footer.body}
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-black text-sun">{t.footer.playTitle}</div>
          <ul className="grid gap-2 text-sm text-white/75">
            <li><a className="hover:text-white" href="#play">{t.footer.playLinks[0]}</a></li>
            <li><a className="hover:text-white" href="#how">{t.footer.playLinks[1]}</a></li>
            <li><a className="hover:text-white" href="#features">{t.footer.playLinks[2]}</a></li>
            <li><a className="hover:text-white" href="#faq">{t.footer.playLinks[3]}</a></li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-black text-sun">{t.footer.aboutTitle}</div>
          <ul className="grid gap-2 text-sm text-white/75">
            {t.footer.aboutLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {t.brand.name} · {t.footer.copyright}
      </div>
    </footer>
  )
}
