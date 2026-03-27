"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const LANGUAGES = [
  {
    code: "ENGLISH",
    name: "Inglés",
    subtitle: "1.5 mil millones de hablantes",
    gradient: "radial-gradient(ellipse at 30% 50%, #C7D2FE 0%, #818CF8 40%, #3730A3 100%)",
  },
  {
    code: "SPANISH",
    name: "Español",
    subtitle: "600 millones de hablantes",
    gradient: "radial-gradient(ellipse at 70% 30%, #FED7AA 0%, #FB923C 40%, #DC2626 100%)",
  },
  {
    code: "PORTUGUESE",
    name: "Portugués",
    subtitle: "260 millones de hablantes",
    gradient: "radial-gradient(ellipse at 40% 60%, #BBF7D0 0%, #34D399 40%, #065F46 100%)",
  },
  {
    code: "FRENCH",
    name: "Francés",
    subtitle: "300 millones de hablantes",
    gradient: "radial-gradient(ellipse at 60% 40%, #E9D5FF 0%, #A855F7 40%, #6D28D9 100%)",
  },
]

interface LanguageSelectorProps {
  selected: string[]
  onToggle: (code: string) => void
}

export function LanguageSelector({ selected, onToggle }: LanguageSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {LANGUAGES.map(({ code, name, subtitle, gradient }) => {
        const isSelected = selected.includes(code)

        return (
          <button
            key={code}
            onClick={() => onToggle(code)}
            className={cn(
              "relative overflow-hidden rounded-2xl p-4 text-left transition-all aspect-[4/3] flex flex-col justify-end",
              isSelected
                ? "ring-2 ring-white shadow-lg scale-[1.02]"
                : "hover:scale-[1.01] hover:shadow-md"
            )}
            style={{ background: gradient }}
          >
            {/* Noise overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />

            {/* Check mark */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <Check className="w-4 h-4 text-foreground" />
              </div>
            )}

            {/* Content */}
            <div className="relative z-10">
              <p className="text-white text-title font-bold drop-shadow-sm">{name}</p>
              <p className="text-white/80 text-label mt-0.5">{subtitle}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export { LANGUAGES }
