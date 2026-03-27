"use client"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useVoiceSession } from "@/hooks/use-voice-session"
import { VoiceVisualizer } from "./voice-visualizer"
import { VoiceControls } from "./voice-controls"
import { saveSession } from "@/app/(main)/lesson/[id]/actions"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface LessonData {
  id: string
  title: string
  topic: string
  description: string
  order: number
  level: string
  objectiveName: string
  language?: string
  keyTopics?: string[]
  warmupQuestion?: string | null
  promptHints?: string | null
  lessonsCompleted?: number
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0")
  const s = (seconds % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

export function VoiceSessionView({ lesson }: { lesson: LessonData }) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)

  const {
    status,
    isMuted,
    isAiSpeaking,
    transcripts,
    elapsedSeconds,
    errorMessage,
    startSession,
    endSession,
    toggleMute,
  } = useVoiceSession({
    id: lesson.id,
    topic: lesson.topic,
    description: lesson.description,
    level: lesson.level,
    objectiveName: lesson.objectiveName,
    language: lesson.language,
    keyTopics: lesson.keyTopics,
    warmupQuestion: lesson.warmupQuestion,
    promptHints: lesson.promptHints,
    lessonsCompleted: lesson.lessonsCompleted,
  })

  const handleEnd = useCallback(async () => {
    setIsSaving(true)
    const result = await endSession()

    try {
      await saveSession({
        lessonId: lesson.id,
        duration: result.duration,
        transcripts: result.transcripts?.map(t => `${t.role === "assistant" ? "Tutor" : "Estudiante"}: ${t.text}`) ?? [],
        startedAt: result.startedAt?.toISOString() ?? new Date().toISOString(),
      })
    } catch (e) {
      console.error("Error saving session:", e)
      router.push("/dashboard")
    }
  }, [endSession, lesson.id, router])

  const statusLabel = {
    idle: "Toca el micrófono para comenzar",
    connecting: "Conectando con el tutor...",
    active: isMuted ? "Micrófono silenciado" : isAiSpeaking ? "El tutor está hablando..." : "Escuchando...",
    ended: "Sesión terminada",
    error: errorMessage ?? "Error de conexión",
  }[status]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <Link href="/dashboard" className="p-2 rounded-xl hover:bg-surface transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="text-center">
          <p className="text-xs text-text-secondary">Lección {lesson.order}</p>
          <p className="font-semibold text-foreground text-sm">{lesson.title}</p>
        </div>
        <div className="w-9 text-center">
          {status === "active" && (
            <span className="text-sm font-mono text-text-secondary">{formatTime(elapsedSeconds)}</span>
          )}
        </div>
      </div>

      {/* Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
        <VoiceVisualizer
          status={status}
          isAiSpeaking={isAiSpeaking}
        />

        {/* Status label */}
        <div className="text-center space-y-1 min-h-12">
          <p className="text-sm text-text-secondary">{statusLabel}</p>
          {status === "active" && transcripts.length > 0 && (
            <p className="text-xs text-text-secondary/60 max-w-xs mx-auto line-clamp-2">
              {transcripts[transcripts.length - 1].text}
            </p>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 pb-12">
        {isSaving ? (
          <div className="text-center py-6">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-text-secondary">Guardando tu sesión...</p>
          </div>
        ) : (
          <VoiceControls
            status={status}
            isMuted={isMuted}
            onStart={startSession}
            onEnd={handleEnd}
            onToggleMute={toggleMute}
          />
        )}
      </div>
    </div>
  )
}
