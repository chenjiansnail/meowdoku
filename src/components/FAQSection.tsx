import { useState } from 'react'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
}

export function FAQSection({ t }: Props) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="scroll-mt-16 border-y border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-rose">
            {t.faq.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            {t.faq.title}
          </h2>
          <p className="mt-3 leading-7 text-muted">
            {t.faq.body}
          </p>
        </div>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const opened = open === i
            return (
              <div
                key={i}
                className="rounded-2xl border border-line2 bg-cream transition"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpen(opened ? null : i)}
                >
                  <span className="font-black text-ink">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full bg-white text-rose ring-1 ring-line2 transition ${
                      opened ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {opened && (
                  <div className="px-5 pb-5 text-muted leading-7">{item.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
