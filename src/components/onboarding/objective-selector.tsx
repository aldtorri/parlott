"use client"

import { Briefcase, BookOpen, Plane, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const ICON_MAP = {
  Briefcase,
  BookOpen,
  Plane,
  UserCheck,
}

interface Objective {
  id: string
  slug: string
  name: string
  description: string
  icon: string
}

interface ObjectiveSelectorProps {
  objectives: Objective[]
  selected: string | null
  onSelect: (slug: string) => void
}

export function ObjectiveSelector({ objectives, selected, onSelect }: ObjectiveSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {objectives.map((obj) => {
        const Icon = ICON_MAP[obj.icon as keyof typeof ICON_MAP] ?? BookOpen
        const isSelected = selected === obj.slug

        return (
          <button
            key={obj.slug}
            onClick={() => onSelect(obj.slug)}
            className={cn(
              "flex items-start gap-4 p-4 rounded-2xl border text-left transition-all",
              isSelected
                ? "border-foreground bg-surface ring-2 ring-foreground/20"
                : "border-border bg-card hover:border-border-strong"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              isSelected ? "bg-foreground text-background" : "bg-surface-elevated text-text-secondary"
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-title-sm text-foreground">{obj.name}</p>
              <p className="text-body-sm text-text-secondary">{obj.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
