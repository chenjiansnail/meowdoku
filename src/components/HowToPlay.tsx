import type { Translation } from '../i18n'

interface Props {
  t: Translation
}

export function HowToPlay({ t }: Props) {
  return (
    <section id="how" className="scroll-mt-16 border-y border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-rose">
          {t.how.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
          {t.how.title}
        </h2>
        <p className="mt-3 max-w-2xl text-muted leading-7">
          {t.how.body}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.how.rules.map((r) => (
            <article
              key={r.n}
              className="rounded-2xl border border-line2 bg-cream p-5 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="text-xs font-black tracking-widest text-rose">
                {r.n}
              </div>
              <h3 className="mt-2 text-lg font-black text-ink">{r.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{r.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
