import { cn } from "@/lib/utils"

const LANGUAGE_CONFIG = {
  ENGLISH: { label: "Inglés", color: "bg-lang-english" },
  SPANISH: { label: "Español", color: "bg-lang-spanish" },
  PORTUGUESE: { label: "Portugués", color: "bg-lang-portuguese" },
  FRENCH: { label: "Francés", color: "bg-lang-french" },
} as const

type LanguageKey = keyof typeof LANGUAGE_CONFIG

interface LanguageFlagProps {
  language: LanguageKey
  showLabel?: boolean
  className?: string
}

export function LanguageFlag({ language, showLabel = true, className }: LanguageFlagProps) {
  const config = LANGUAGE_CONFIG[language]

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("w-2 h-2 rounded-full", config.color)} />
      {showLabel && <span className="text-label text-text-secondary">{config.label}</span>}
    </div>
  )
}

export { LANGUAGE_CONFIG }
