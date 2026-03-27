import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { TrackCard } from "@/components/dashboard/track-card"
import { LessonList } from "@/components/dashboard/lesson-list"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Play } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
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

  const completedLessons = track.lessons.filter(
    (l) => l.status === "COMPLETED"
  ).length
  const nextLesson = track.lessons.find(
    (l) => l.status === "AVAILABLE" || l.status === "IN_PROGRESS"
  )

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches"

  return (
    <div className="max-w-lg mx-auto px-5 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-title-lg text-foreground">
            {greeting}{session.user.name ? `, ${session.user.name}` : ""}
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">
            Continúa tu progreso
          </p>
        </div>
        <Link href="/settings">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-sm font-semibold bg-surface-elevated text-foreground">
              {session.user.name?.[0] ?? session.user.email?.[0]?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>

      {/* Track card */}
      <div className="mt-8">
        <TrackCard
          objectiveName={track.objective.name}
          objectiveIcon={track.objective.icon}
          level={track.level}
          completedLessons={completedLessons}
          totalLessons={track.lessons.length}
        />
      </div>

      {/* Next lesson CTA */}
      {nextLesson && (
        <Link
          href={`/lesson/${nextLesson.id}`}
          className="block w-full p-5 rounded-2xl bg-foreground text-background hover:bg-foreground/90 transition-colors shadow-md mt-8"
        >
          <p className="text-caption opacity-70">Siguiente lección</p>
          <p className="text-title mt-1">{nextLesson.title}</p>
          <div className="flex items-center justify-between mt-3">
            <p className="text-body-sm opacity-60">
              Lección {nextLesson.order}
            </p>
            <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
              <Play className="w-4 h-4 text-background" />
            </div>
          </div>
        </Link>
      )}

      {/* All lessons */}
      <div className="mt-8">
        <h2 className="text-title-sm text-foreground px-1 mb-3">
          Todas las lecciones
        </h2>
        <LessonList lessons={track.lessons} />
      </div>
    </div>
  )
}
