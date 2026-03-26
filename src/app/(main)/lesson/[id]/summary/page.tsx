import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Clock, ArrowRight, Home } from "lucide-react"
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
  if (!session?.user?.id) redirect("/auth/signin")

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

  // Get the voice session (latest for this lesson if no specific sessionId)
  const voiceSession = sessionId
    ? await prisma.voiceSession.findUnique({ where: { id: sessionId } })
    : await prisma.voiceSession.findFirst({
        where: { lessonId: id, userId: session.user.id },
        orderBy: { startedAt: "desc" },
      })

  // Find next lesson
  const lessons = lesson.track.lessons
  const currentIndex = lessons.findIndex(l => l.id === id)
  const nextLesson = lessons[currentIndex + 1]
  const isTrackComplete = !nextLesson

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-10 space-y-8">
        {/* Success header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {isTrackComplete ? "¡Track completado! 🎉" : "¡Lección completada!"}
          </h1>
          <p className="text-muted-foreground text-sm">{lesson.title}</p>
        </div>

        {/* Stats */}
        {voiceSession?.duration && (
          <div className="flex justify-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {formatDuration(voiceSession.duration)} de práctica
              </span>
            </div>
          </div>
        )}

        {/* Summary */}
        {voiceSession?.summary && (
          <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
            <h2 className="font-semibold text-foreground text-sm">Resumen de la sesión</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{voiceSession.summary}</p>
          </div>
        )}

        {/* Feedback */}
        {voiceSession?.feedback && (
          <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
            <h2 className="font-semibold text-foreground text-sm">Retroalimentación</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{voiceSession.feedback}</p>
          </div>
        )}

        {/* Track complete message */}
        {isTrackComplete && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-center space-y-2">
            <p className="text-2xl">🏆</p>
            <p className="font-semibold text-foreground">¡Completaste el track de {lesson.track.objective.name}!</p>
            <p className="text-sm text-muted-foreground">Considera avanzar al siguiente nivel o explorar otro objetivo.</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
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
