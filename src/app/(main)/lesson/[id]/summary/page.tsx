import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Clock, ArrowRight, Home, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ session?: string }>
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  if (m === 0) return `${s}s`
  return `${m}m ${s}s`
}

export default async function SummaryPage({ params, searchParams }: PageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const { id } = await params
  const { session: sessionId } = await searchParams

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      track: {
        include: {
          objective: true,
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  })

  if (!lesson) notFound()
  if (lesson.track.userId !== session.user.id) notFound()

  const voiceSession = sessionId
    ? await prisma.voiceSession.findUnique({ where: { id: sessionId } })
    : await prisma.voiceSession.findFirst({
        where: { lessonId: id, userId: session.user.id },
        orderBy: { startedAt: "desc" },
      })

  const lessons = lesson.track.lessons
  const currentIndex = lessons.findIndex((l) => l.id === id)
  const nextLesson = lessons[currentIndex + 1]
  const isTrackComplete = !nextLesson

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-10 pb-24">
        {/* Success header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-title-lg text-foreground">
            {isTrackComplete
              ? "Track completado"
              : "Lección completada"}
          </h1>
          <p className="text-body-sm text-text-secondary">{lesson.title}</p>
        </div>

        {/* Stats */}
        {voiceSession?.duration && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-body text-foreground font-medium tabular-nums">
                {formatDuration(voiceSession.duration)} de práctica
              </span>
            </div>
          </div>
        )}

        {/* Scores */}
        {(voiceSession?.pronunciation != null || voiceSession?.fluency != null) && (
          <div className="grid grid-cols-2 gap-3 mt-8">
            {voiceSession?.pronunciation != null && (
              <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-foreground tabular-nums">
                  {Math.round(voiceSession.pronunciation * 100)}%
                </p>
                <p className="text-label text-text-secondary mt-1">Pronunciación</p>
              </div>
            )}
            {voiceSession?.fluency != null && (
              <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-foreground tabular-nums">
                  {Math.round(voiceSession.fluency * 100)}%
                </p>
                <p className="text-label text-text-secondary mt-1">Fluidez</p>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        {voiceSession?.summary && (
          <div className="rounded-2xl border border-border bg-card p-4 space-y-2 shadow-sm mt-8">
            <h2 className="text-title-sm text-foreground">
              Resumen de la sesión
            </h2>
            <p className="text-body-sm text-text-secondary leading-relaxed">
              {voiceSession.summary}
            </p>
          </div>
        )}

        {/* Feedback */}
        {voiceSession?.feedback && (
          <div className="rounded-2xl border border-border bg-card p-4 space-y-2 shadow-sm mt-8">
            <h2 className="text-title-sm text-foreground">
              Retroalimentación
            </h2>
            <p className="text-body-sm text-text-secondary leading-relaxed">
              {voiceSession.feedback}
            </p>
          </div>
        )}

        {/* Track complete message */}
        {isTrackComplete && (
          <div className="rounded-2xl border border-border bg-surface p-4 text-center space-y-2 shadow-sm mt-8">
            <Trophy className="w-8 h-8 text-foreground mx-auto" />
            <p className="text-title-sm text-foreground">
              Completaste el track de {lesson.track.objective.name}
            </p>
            <p className="text-body-sm text-text-secondary">
              Considera avanzar al siguiente nivel o explorar otro objetivo.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3 mt-8">
          {nextLesson && (
            <Button asChild className="w-full" size="lg">
              <Link href={`/lesson/${nextLesson.id}`}>
                Siguiente lección
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">
              <Home className="w-4 h-4 mr-1" />
              Ir al dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
