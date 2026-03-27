"use client"

import { cn } from "@/lib/utils"
import { Zap, Target, Star, Rocket } from "lucide-react"

const GOALS = [
  { value: 5, label: "5 min/día", description: "Para días muy ocupados", icon: Zap },
  { value: 10, label: "10 min/día", description: "El mínimo recomendado", icon: Target, popular: true },
  { value: 20, label: "20 min/día", description: "Progreso consistente", icon: Star },
  { value: 30, label: "30+ min/día", description: "Resultados más rápidos", icon: Rocket },
]

interface DailyGoalSelectorProps {
  selected: number | null
  onSelect: (value: number) => void
}

export function DailyGoalSelector({ selected, onSelect }: DailyGoalSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {GOALS.map(({ value, label, description, icon: Icon, popular }) => {
        const isSelected = selected === value

        return (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={cn(
              "relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all",
              isSelected
                ? "border-foreground bg-surface ring-2 ring-foreground/20"
                : "border-border bg-card hover:border-border-strong"
            )}
          >
            {popular && (
              <span className="absolute -top-2 right-3 px-2 py-0.5 bg-foreground text-background text-[10px] font-semibold rounded-full">
                Más elegido
              </span>
            )}
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
              isSelected ? "bg-foreground text-background" : "bg-surface-elevated text-text-secondary"
            )}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-title-sm text-foreground">{label}</p>
            <p className="text-label text-text-secondary mt-0.5">{description}</p>
          </button>
        )
      })}
    </div>
  )
}
