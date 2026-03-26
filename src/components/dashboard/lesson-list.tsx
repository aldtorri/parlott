import Link from "next/link"
import { Lock, Circle, Play, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LessonStatus } from "@/generated/prisma/enums"

interface Lesson {
  id: string
  title: string
  order: number
  status: LessonStatus
}

const statusConfig = {
  LOCKED: { icon: Lock, label: "Bloqueada", color: "text-muted-foreground/40" },
  AVAILABLE: { icon: Circle, label: "Disponible", color: "text-primary" },
  IN_PROGRESS: { icon: Play, label: "En progreso", color: "text-amber-400" },
  COMPLETED: { icon: CheckCircle2, label: "Completada", color: "text-emerald-400" },
}

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="space-y-2">
      {lessons.map((lesson) => {
        const config = statusConfig[lesson.status]
        const Icon = config.icon
        const isClickable = lesson.status === "AVAILABLE" || lesson.status === "IN_PROGRESS"

        const content = (
          <div
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border transition-all",
              isClickable
                ? "border-border bg-card hover:border-primary/50 hover:bg-card/80 cursor-pointer"
                : "border-border/50 bg-card/30 opacity-60 cursor-default"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-muted-foreground">{lesson.order}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium text-sm truncate",
                isClickable ? "text-foreground" : "text-muted-foreground"
              )}>
                {lesson.title}
              </p>
              <p className={cn("text-xs", config.color)}>{config.label}</p>
            </div>
            <Icon className={cn("w-5 h-5 shrink-0", config.color)} />
          </div>
        )

        if (isClickable) {
          return (
            <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
              {content}
            </Link>
          )
        }

        return <div key={lesson.id}>{content}</div>
      })}
    </div>
  )
}
