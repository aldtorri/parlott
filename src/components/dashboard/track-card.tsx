import { Briefcase, BookOpen, Plane, UserCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProgressRing } from "./progress-ring"
import type { CEFRLevel } from "@/generated/prisma/enums"

const ICON_MAP = { Briefcase, BookOpen, Plane, UserCheck }

interface TrackCardProps {
  objectiveName: string
  objectiveIcon: string
  level: CEFRLevel
  completedLessons: number
  totalLessons: number
}

export function TrackCard({
  objectiveName,
  objectiveIcon,
  level,
  completedLessons,
  totalLessons,
}: TrackCardProps) {
  const Icon = ICON_MAP[objectiveIcon as keyof typeof ICON_MAP] ?? BookOpen

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">{objectiveName}</p>
            <Badge variant={level as CEFRLevel} className="mt-1 text-xs">
              Nivel {level}
            </Badge>
          </div>
        </div>
        <ProgressRing completed={completedLessons} total={totalLessons} size={56} />
      </div>

      {/* Progress bar */}
      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progreso del track</span>
          <span>{completedLessons} de {totalLessons} lecciones</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  )
}
