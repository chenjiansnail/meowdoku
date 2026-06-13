import { useEffect, useState } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './components/Hero'
import { PlaySection } from './components/PlaySection'
import { HowToPlay } from './components/HowToPlay'
import { Features } from './components/Features'
import { FAQSection } from './components/FAQSection'
import { SiteFooter } from './components/SiteFooter'
import { getLocale, isLanguage, type Language, translations } from './i18n'

const LANGUAGE_KEY = 'meowdoku:language:v1'

function initialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(LANGUAGE_KEY)
  return stored && isLanguage(stored) ? stored : 'en'
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => initialLanguage())
  const t = translations[language]

  useEffect(() => {
    document.documentElement.lang = getLocale(language)
    document.title = t.seo.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t.seo.description)
    window.localStorage.setItem(LANGUAGE_KEY, language)
  }, [language, t])

  return (
    <div className="flex min-h-full flex-col antialiased">
      <SiteHeader language={language} onLanguage={setLanguage} t={t} />
      <main className="flex-1">
        <PlaySection t={t} />
        <Hero t={t} />
        <HowToPlay t={t} />
        <Features t={t} />
        <FAQSection t={t} />
      </main>
      <SiteFooter t={t} />
    </div>
  )
}
