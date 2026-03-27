import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { Trophy, BookOpen } from "lucide-react"
import type { CEFRLevel } from "@/generated/prisma/enums"

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export default async function ProgressPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      tracks: {
        include: {
          objective: true,
          lessons: true,
        },
        orderBy: { createdAt: "desc" },
      },
      voiceSessions: {
        select: { duration: true },
      },
    },
  })

  if (!user) redirect("/")

  const totalSeconds = user.voiceSessions.reduce(
    (acc, s) => acc + (s.duration ?? 0),
    0
  )
  const totalSessions = user.voiceSessions.length
  const activeTrack = user.tracks.find((t) => t.status === "ACTIVE")
  const completedTracks = user.tracks.filter((t) => t.status === "COMPLETED")

  return (
    <div className="max-w-lg mx-auto px-5 py-6 pb-24">
      <PageHeader
        title="Tu progreso"
        subtitle="Tu avance en Amelia"
      />

      {/* Level badge */}
      {user.currentLevel && (
        <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4 shadow-sm mt-8">
          <div className="w-14 h-14 rounded-2xl bg-surface-elevated flex items-center justify-center">
            <span className="text-xl font-bold text-foreground tabular-nums">
              {user.currentLevel}
            </span>
          </div>
          <div>
            <p className="text-label text-text-secondary">Tu nivel actual</p>
            <p className="text-title-sm text-foreground mt-0.5">
              CEFR {user.currentLevel}
            </p>
            <Badge
              variant={user.currentLevel as CEFRLevel}
              className="mt-1"
            >
              Nivel {user.currentLevel}
            </Badge>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-8">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold text-foreground tabular-nums">
            {formatTime(totalSeconds)}
          </p>
          <p className="text-label text-text-secondary mt-1">
            Tiempo de práctica
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-2xl font-bold text-foreground tabular-nums">{totalSessions}</p>
          <p className="text-label text-text-secondary mt-1">
            Sesiones completadas
          </p>
        </div>
      </div>

      {/* Active track */}
      {activeTrack && (
        <div className="mt-8">
          <h2 className="text-title-sm text-foreground px-1 mb-3">
            Track activo
          </h2>
          <div className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-title-sm text-foreground">
                  {activeTrack.objective.name}
                </p>
                <p className="text-body-sm text-text-secondary">
                  Nivel {activeTrack.level}
                </p>
              </div>
              <Badge variant={activeTrack.level as CEFRLevel}>
                {activeTrack.level}
              </Badge>
            </div>
            {(() => {
              const completed = activeTrack.lessons.filter(
                (l) => l.status === "COMPLETED"
              ).length
              const total = activeTrack.lessons.length
              const pct = total > 0 ? (completed / total) * 100 : 0
              return (
                <div className="space-y-2">
                  <div className="flex justify-between text-label text-text-secondary">
                    <span>
                      {completed} de {total} lecciones
                    </span>
                    <span className="tabular-nums">{Math.round(pct)}%</span>
                  </div>
                  <Progress value={pct} />
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Completed tracks */}
      {completedTracks.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 px-1 mb-3">
            <Trophy className="w-4 h-4 text-text-secondary" />
            <h2 className="text-title-sm text-foreground">
              Tracks completados
            </h2>
          </div>
          <div className="space-y-3">
            {completedTracks.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card shadow-sm"
              >
                <div>
                  <p className="text-title-sm text-foreground">
                    {track.objective.name}
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    {track.lessons.length} lecciones
                  </p>
                </div>
                <Badge variant={track.level as CEFRLevel}>
                  {track.level}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {!activeTrack && completedTracks.length === 0 && (
        <div className="mt-8">
          <EmptyState
            icon={BookOpen}
            title="Sin lecciones aún"
            description="Tu primera lección te está esperando. Solo toma 10 minutos."
            actionLabel="Comenzar"
            actionHref="/onboarding"
          />
        </div>
      )}
    </div>
  )
}
