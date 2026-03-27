"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { CEFRLevel } from "@/generated/prisma/enums"

const LEVELS = [
  {
    level: "A1" as CEFRLevel,
    name: "Principiante",
    description: "Apenas empiezo. Sé algunas palabras y frases básicas.",
    example: "Puedes: presentarte, decir tu nombre y pedir algo simple.",
  },
  {
    level: "A2" as CEFRLevel,
    name: "Elemental",
    description: "Entiendo frases del día a día si hablan despacio.",
    example: "Puedes: hablar de tu familia, trabajo y hacer compras sencillas.",
  },
  {
    level: "B1" as CEFRLevel,
    name: "Intermedio",
    description: "Me defiendo. Entiendo los temas principales.",
    example: "Puedes: describir experiencias, dar opiniones, contar historias.",
  },
  {
    level: "B2" as CEFRLevel,
    name: "Intermedio alto",
    description: "Hablo con fluidez sobre muchos temas.",
    example: "Puedes: conversar con nativos sin esfuerzo en temas variados.",
  },
  {
    level: "C1" as CEFRLevel,
    name: "Avanzado",
    description: "Me expreso con precisión y espontaneidad.",
    example: "Puedes: usar el idioma para fines profesionales y académicos.",
  },
]

interface LevelAssessmentProps {
  selected: string | null
  onSelect: (level: string) => void
}

export function LevelAssessment({ selected, onSelect }: LevelAssessmentProps) {
  return (
    <div className="space-y-3">
      {LEVELS.map(({ level, name, description, example }) => {
        const isSelected = selected === level

        return (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={cn(
              "w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all",
              isSelected
                ? "border-foreground bg-surface ring-2 ring-foreground/20"
                : "border-border bg-card hover:border-border-strong"
            )}
          >
            <Badge variant={level} className="mt-0.5 shrink-0 font-bold">
              {level}
            </Badge>
            <div className="space-y-1">
              <p className="text-title-sm text-foreground">{name}</p>
              <p className="text-body-sm text-text-secondary">{description}</p>
              <p className="text-label text-text-tertiary">{example}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
