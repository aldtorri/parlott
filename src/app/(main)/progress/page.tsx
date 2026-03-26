import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import type { CEFRLevel } from "@/generated/prisma/enums"

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export default async function ProgressPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/signin")

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

  if (!user) redirect("/auth/signin")

  const totalSeconds = user.voiceSessions.reduce((acc, s) => acc + (s.duration ?? 0), 0)
  const totalSessions = user.voiceSessions.length
  const activeTrack = user.tracks.find(t => t.status === "ACTIVE")
  const completedTracks = user.tracks.filter(t => t.status === "COMPLETED")

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-foreground">Tu progreso</h1>
        <p className="text-sm text-muted-foreground">Aquí está tu avance en Parlott</p>
      </div>

      {/* Level badge */}
      {user.currentLevel && (
        <div className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">{user.currentLevel}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Tu nivel actual</p>
            <p className="font-bold text-foreground text-lg">CEFR {user.currentLevel}</p>
            <Badge variant={user.currentLevel as CEFRLevel} className="mt-1">
              Nivel {user.currentLevel}
            </Badge>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
          <p className="text-2xl font-bold text-foreground">{formatTime(totalSeconds)}</p>
          <p className="text-xs text-muted-foreground">Tiempo total de práctica</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 space-y-1">
          <p className="text-2xl font-bold text-foreground">{totalSessions}</p>
          <p className="text-xs text-muted-foreground">Sesiones completadas</p>
        </div>
      </div>

      {/* Active track */}
      {activeTrack && (
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground text-sm px-1">Track activo</h2>
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">{activeTrack.objective.name}</p>
                <p className="text-xs text-muted-foreground">Nivel {activeTrack.level}</p>
              </div>
              <Badge variant={activeTrack.level as CEFRLevel}>{activeTrack.level}</Badge>
            </div>
            {(() => {
              const completed = activeTrack.lessons.filter(l => l.status === "COMPLETED").length
              const total = activeTrack.lessons.length
              const pct = total > 0 ? (completed / total) * 100 : 0
              return (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{completed} de {total} lecciones</span>
                    <span>{Math.round(pct)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      {/* Completed tracks */}
      {completedTracks.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold text-foreground text-sm px-1">Tracks completados 🏆</h2>
          <div className="space-y-2">
            {completedTracks.map(track => (
              <div key={track.id} className="flex items-center justify-between p-4 rounded-2xl border border-border bg-card">
                <div>
                  <p className="font-medium text-foreground text-sm">{track.objective.name}</p>
                  <p className="text-xs text-muted-foreground">{track.lessons.length} lecciones</p>
                </div>
                <Badge variant={track.level as CEFRLevel}>{track.level}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {!activeTrack && completedTracks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-muted-foreground text-sm">Aún no tienes lecciones completadas. ¡Empieza hoy!</p>
        </div>
      )}
    </div>
  )
}
