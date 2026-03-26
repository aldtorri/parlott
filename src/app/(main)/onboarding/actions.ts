"use server"

import { auth } from "@/lib/auth"
import { generateTrack } from "@/lib/curriculum/generator"
import type { CEFRLevel } from "@/generated/prisma/enums"
import { redirect } from "next/navigation"

export async function completeOnboarding(objectiveSlug: string, level: string) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/auth/signin")
  }

  await generateTrack(session.user.id, objectiveSlug, level as CEFRLevel)

  redirect("/dashboard")
}
