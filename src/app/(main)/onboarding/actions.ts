"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateTrack } from "@/lib/curriculum/generator"
import type { CEFRLevel, Language } from "@/generated/prisma/enums"
import { redirect } from "next/navigation"

export async function completeOnboarding(
  objectiveSlug: string,
  level: string,
  language: string = "ENGLISH",
  dailyGoal: number = 10
) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
  }

  // Update daily goal
  await prisma.user.update({
    where: { id: session.user.id },
    data: { dailyGoal },
  })

  await generateTrack(
    session.user.id,
    objectiveSlug,
    level as CEFRLevel,
    language as Language
  )

  redirect("/dashboard")
}
