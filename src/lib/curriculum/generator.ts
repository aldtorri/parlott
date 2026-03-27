import { prisma } from "@/lib/prisma"
import { CURRICULUM } from "./templates"
import type { CEFRLevel, Language } from "@/generated/prisma/enums"

export async function generateTrack(
  userId: string,
  objectiveSlug: string,
  level: CEFRLevel,
  language: Language = "ENGLISH"
) {
  const objective = await prisma.objective.findFirst({
    where: { slug: objectiveSlug, language },
  })

  if (!objective) {
    throw new Error(`Objetivo no encontrado: ${objectiveSlug} (${language})`)
  }

  const templates = CURRICULUM[language]?.[objectiveSlug]?.[level]
  if (!templates || templates.length === 0) {
    throw new Error(`No hay lecciones para ${objectiveSlug} - ${level} (${language})`)
  }

  // Create track (upsert in case it already exists)
  const track = await prisma.track.upsert({
    where: {
      userId_objectiveId_level: {
        userId,
        objectiveId: objective.id,
        level,
      },
    },
    update: {
      status: "ACTIVE",
    },
    create: {
      userId,
      objectiveId: objective.id,
      level,
      status: "ACTIVE",
    },
  })

  // Delete existing lessons and recreate (fresh start)
  await prisma.lesson.deleteMany({ where: { trackId: track.id } })

  // Create lessons: first one AVAILABLE, rest LOCKED
  await prisma.lesson.createMany({
    data: templates.map((template, index) => ({
      trackId: track.id,
      title: template.title,
      topic: template.topic,
      description: template.description,
      order: index + 1,
      status: index === 0 ? "AVAILABLE" : "LOCKED",
      keyTopics: template.keyTopics,
      warmupQuestion: template.warmupQuestion,
      promptHints: template.promptHints,
    })),
  })

  // Update user's current level and objective
  await prisma.user.update({
    where: { id: userId },
    data: {
      currentLevel: level,
      currentObjective: objectiveSlug,
    },
  })

  // Ensure UserStats exists
  await prisma.userStats.upsert({
    where: { userId },
    create: { userId },
    update: {},
  })

  return track
}
