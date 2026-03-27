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
  LOCKED: { icon: Lock, label: "Bloqueada", color: "text-text-tertiary" },
  AVAILABLE: { icon: Circle, label: "Disponible", color: "text-foreground" },
  IN_PROGRESS: { icon: Play, label: "En progreso", color: "text-warning" },
  COMPLETED: { icon: CheckCircle2, label: "Completada", color: "text-success" },
}

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="space-y-3">
      {lessons.map((lesson) => {
        const config = statusConfig[lesson.status]
        const Icon = config.icon
        const isClickable = lesson.status === "AVAILABLE" || lesson.status === "IN_PROGRESS"

        const content = (
          <div
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border transition-all",
              isClickable
                ? "border-border bg-card hover:border-border-strong cursor-pointer shadow-sm"
                : "border-border bg-card opacity-50 cursor-default"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center shrink-0">
              <span className="text-label text-text-secondary tabular-nums">{lesson.order}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-title-sm truncate",
                isClickable ? "text-foreground" : "text-text-tertiary"
              )}>
                {lesson.title}
              </p>
              <p className={cn("text-label", config.color)}>{config.label}</p>
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
