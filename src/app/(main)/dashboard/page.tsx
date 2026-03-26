import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { TrackCard } from "@/components/dashboard/track-card"
import { LessonList } from "@/components/dashboard/lesson-list"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  const track = await prisma.track.findFirst({
    where: {
      userId: session.user.id,
      status: "ACTIVE",
    },
    include: {
      objective: true,
      lessons: {
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  if (!track) {
    redirect("/onboarding")
  }

  const completedLessons = track.lessons.filter(l => l.status === "COMPLETED").length
  const nextLesson = track.lessons.find(l => l.status === "AVAILABLE" || l.status === "IN_PROGRESS")

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Hola 👋</h1>
          <p className="text-sm text-muted-foreground">Continúa tu progreso en inglés</p>
        </div>
        <Link
          href="/settings"
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground hover:bg-muted/80 transition-colors"
        >
          {session.user.name?.[0] ?? session.user.email?.[0] ?? "U"}
        </Link>
      </div>

      {/* Track card */}
      <TrackCard
        objectiveName={track.objective.name}
        objectiveIcon={track.objective.icon}
        level={track.level}
        completedLessons={completedLessons}
        totalLessons={track.lessons.length}
      />

      {/* Next lesson CTA */}
      {nextLesson && (
        <Link
          href={`/lesson/${nextLesson.id}`}
          className="block w-full p-5 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <p className="text-xs font-medium opacity-80">Siguiente lección</p>
          <p className="font-bold mt-0.5">{nextLesson.title}</p>
          <p className="text-xs opacity-70 mt-1">Lección {nextLesson.order} · Toca para comenzar</p>
        </Link>
      )}

      {/* All lessons */}
      <div className="space-y-3">
        <h2 className="font-semibold text-foreground text-sm px-1">Todas las lecciones</h2>
        <LessonList lessons={track.lessons} />
      </div>
    </div>
  )
}
