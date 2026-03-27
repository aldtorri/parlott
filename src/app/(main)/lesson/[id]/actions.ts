"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { updateUserStats, checkAchievements } from "@/lib/stats"

interface SaveSessionInput {
  lessonId: string
  duration: number
  transcripts: string[]
  startedAt: string
}

async function generateSummary(topic: string, transcripts: string[]): Promise<{ summary: string; feedback: string }> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey || transcripts.length === 0) {
    return {
      summary: "Completaste una sesión de práctica hablada con el tutor de IA.",
      feedback: "Sigue practicando para mejorar tu fluidez y confianza.",
    }
  }

  const transcriptText = transcripts.join("\n")
  const prompt = `Eres un tutor de inglés. Analiza esta transcripción de una sesión de práctica de inglés hablado y proporciona:
1. Un resumen breve (2-3 oraciones) en español de lo que se practicó.
2. Retroalimentación específica (2-3 oraciones) en español sobre el desempeño del estudiante, destacando fortalezas y áreas de mejora.

TEMA DE LA LECCIÓN: ${topic}

TRANSCRIPCIÓN:
${transcriptText}

Responde SOLO en formato JSON con esta estructura exacta:
{"summary": "...", "feedback": "..."}`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    )

    if (!res.ok) throw new Error("Gemini API error")

    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (text) {
      const parsed = JSON.parse(text)
      return { summary: parsed.summary ?? "", feedback: parsed.feedback ?? "" }
    }
  } catch (e) {
    console.error("Error generating summary:", e)
  }

  return {
    summary: "Completaste una sesión de práctica hablada con el tutor de IA.",
    feedback: "Sigue practicando para mejorar tu fluidez y confianza.",
  }
}

export async function saveSession(input: SaveSessionInput) {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/signin")

  const lesson = await prisma.lesson.findUnique({
    where: { id: input.lessonId },
    include: { track: { include: { lessons: { orderBy: { order: "asc" } } } } },
  })

  if (!lesson) throw new Error("Lección no encontrada")

  // Generate AI summary
  const { summary, feedback } = await generateSummary(lesson.topic, input.transcripts)

  const endedAt = new Date()
  const startedAt = new Date(input.startedAt)

  // Save voice session
  const voiceSession = await prisma.voiceSession.create({
    data: {
      lessonId: input.lessonId,
      userId: session.user.id,
      startedAt,
      endedAt,
      duration: input.duration,
      summary,
      feedback,
    },
  })

  // Mark lesson as completed
  await prisma.lesson.update({
    where: { id: input.lessonId },
    data: { status: "COMPLETED", completedAt: endedAt },
  })

  // Unlock next lesson
  const lessons = lesson.track.lessons
  const currentIndex = lessons.findIndex(l => l.id === input.lessonId)
  const nextLesson = lessons[currentIndex + 1]

  if (nextLesson) {
    await prisma.lesson.update({
      where: { id: nextLesson.id },
      data: { status: "AVAILABLE" },
    })
  } else {
    // All lessons done — mark track as completed
    await prisma.track.update({
      where: { id: lesson.trackId },
      data: { status: "COMPLETED" },
    })
  }

  // Update user stats and check achievements
  try {
    await updateUserStats(session.user.id, input.duration)
    await checkAchievements(session.user.id)
  } catch (e) {
    console.error("Error updating stats:", e)
  }

  redirect(`/lesson/${input.lessonId}/summary?session=${voiceSession.id}`)
}
