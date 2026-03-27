"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { GeminiLiveClient } from "@/lib/gemini/client"
import { AudioRecorder } from "@/lib/gemini/audio-recorder"
import { AudioPlayer } from "@/lib/gemini/audio-player"
import { buildTutorPrompt } from "@/lib/gemini/prompts"

export type SessionStatus = "idle" | "connecting" | "active" | "ended" | "error"

export interface TranscriptEntry {
  role: "user" | "assistant"
  text: string
  timestamp: Date
}

interface LessonContext {
  id: string
  topic: string
  description: string
  level: string
  objectiveName: string
  language?: string
  keyTopics?: string[]
  warmupQuestion?: string | null
  promptHints?: string | null
  lessonsCompleted?: number
}

export function useVoiceSession(lesson: LessonContext) {
  const [status, setStatus] = useState<SessionStatus>("idle")
  const [isMuted, setIsMuted] = useState(false)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)
  const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([])
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const geminiClient = useRef<GeminiLiveClient | null>(null)
  const audioRecorder = useRef<AudioRecorder | null>(null)
  const audioPlayer = useRef<AudioPlayer | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<Date | null>(null)

  // Timer
  useEffect(() => {
    if (status === "active") {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [status])

  const startSession = useCallback(async () => {
    setStatus("connecting")
    setErrorMessage(null)
    setTranscripts([])
    setElapsedSeconds(0)

    try {
      // Get API key from server
      const res = await fetch("/api/voice/token")
      if (!res.ok) throw new Error("No se pudo obtener la API key")
      const { apiKey } = await res.json()

      // Initialize audio player
      audioPlayer.current = new AudioPlayer()

      // Initialize Gemini client
      geminiClient.current = new GeminiLiveClient({
        onAudioData: (base64Audio) => {
          setIsAiSpeaking(true)
          audioPlayer.current?.play(base64Audio)
        },
        onOutputTranscript: (text) => {
          setTranscripts(prev => [...prev, {
            role: "assistant",
            text,
            timestamp: new Date(),
          }])
        },
        onInputTranscript: (text) => {
          setTranscripts(prev => [...prev, {
            role: "user",
            text,
            timestamp: new Date(),
          }])
        },
        onSetupComplete: async () => {
          // Start recording after setup
          audioRecorder.current = new AudioRecorder()
          await audioRecorder.current.start((base64Audio) => {
            if (!isMuted) {
              geminiClient.current?.sendAudio(base64Audio)
            }
          })
          startTimeRef.current = new Date()
          setStatus("active")
        },
        onTurnComplete: () => {
          setIsAiSpeaking(false)
        },
        onError: (error) => {
          console.error("Gemini error:", error)
          setErrorMessage(error.message)
          setStatus("error")
        },
        onClose: () => {
          if (status !== "ended") {
            setStatus("idle")
          }
        },
      })

      // Connect with system prompt
      const systemPrompt = buildTutorPrompt({
        language: lesson.language ?? "ENGLISH",
        level: lesson.level,
        lessonTitle: lesson.topic,
        topic: lesson.topic,
        description: lesson.description,
        objectiveName: lesson.objectiveName,
        keyTopics: lesson.keyTopics ?? [],
        warmupQuestion: lesson.warmupQuestion ?? null,
        promptHints: lesson.promptHints,
        lessonsCompleted: lesson.lessonsCompleted,
      })
      geminiClient.current.connect(apiKey, { systemPrompt })

    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar la sesión"
      setErrorMessage(message)
      setStatus("error")
    }
  }, [lesson, isMuted, status])

  const endSession = useCallback(async () => {
    setStatus("ended")

    audioRecorder.current?.stop()
    audioPlayer.current?.stop()
    geminiClient.current?.disconnect()

    audioRecorder.current = null
    audioPlayer.current = null
    geminiClient.current = null

    return {
      duration: elapsedSeconds,
      transcripts,
      startedAt: startTimeRef.current,
    }
  }, [elapsedSeconds, transcripts])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev
      if (newMuted) {
        audioRecorder.current?.pause()
      } else {
        audioRecorder.current?.resume()
      }
      return newMuted
    })
  }, [])

  return {
    status,
    isMuted,
    isAiSpeaking,
    transcripts,
    elapsedSeconds,
    errorMessage,
    startSession,
    endSession,
    toggleMute,
  }
}
