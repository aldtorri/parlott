import { prisma } from "@/lib/prisma"
import { CURRICULUM } from "./templates"
import type { CEFRLevel } from "@/generated/prisma/enums"

export async function generateTrack(
  userId: string,
  objectiveSlug: string,
  level: CEFRLevel
) {
  const objective = await prisma.objective.findUnique({
    where: { slug: objectiveSlug },
  })

  if (!objective) {
    throw new Error(`Objetivo no encontrado: ${objectiveSlug}`)
  }

  const templates = CURRICULUM[objectiveSlug as keyof typeof CURRICULUM]?.[level]
  if (!templates || templates.length === 0) {
    throw new Error(`No hay lecciones para ${objectiveSlug} - ${level}`)
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

  return track
}
