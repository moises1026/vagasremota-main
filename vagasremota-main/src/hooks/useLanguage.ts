import { createContext, useContext, useState } from "react"
import { i18n } from "@/config/i18n"

type Language = "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = i18n[language]

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) return key
    }

    return value
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
} 