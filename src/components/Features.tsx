import type { Translation } from '../i18n'

interface Props {
  t: Translation
}

export function Features({ t }: Props) {
  return (
    <section id="features" className="scroll-mt-16 bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-rose">
          {t.features.eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
          {t.features.title}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-line2 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose/10 text-2xl">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-black text-ink">{f.title}</h3>
              <p className="mt-2 leading-7 text-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
