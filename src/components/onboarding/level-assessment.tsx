"use client"

import { cn } from "@/lib/utils"

const LEVELS = [
  {
    level: "A1",
    name: "Principiante",
    description: "Entiendo y uso frases muy básicas. Puedo presentarme y hacer preguntas simples.",
    color: "bg-slate-500",
  },
  {
    level: "A2",
    name: "Básico",
    description: "Puedo comunicarme en situaciones sencillas. Entiendo frases del día a día.",
    color: "bg-blue-500",
  },
  {
    level: "B1",
    name: "Intermedio",
    description: "Me puedo defender en la mayoría de las situaciones. Entiendo los temas principales.",
    color: "bg-teal-500",
  },
  {
    level: "B2",
    name: "Intermedio alto",
    description: "Puedo expresar ideas complejas con fluidez. Me comunico con hablantes nativos sin dificultad.",
    color: "bg-violet-500",
  },
  {
    level: "C1",
    name: "Avanzado",
    description: "Me expreso de forma clara y espontánea. Manejo temas complejos con precisión.",
    color: "bg-amber-500",
  },
]

interface LevelAssessmentProps {
  selected: string | null
  onSelect: (level: string) => void
}

export function LevelAssessment({ selected, onSelect }: LevelAssessmentProps) {
  return (
    <div className="space-y-3">
      {LEVELS.map(({ level, name, description, color }) => {
        const isSelected = selected === level

        return (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={cn(
              "w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all",
              isSelected
                ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm",
              color
            )}>
              {level}
            </div>
            <div className="space-y-0.5">
              <p className="font-semibold text-foreground text-sm">{name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
