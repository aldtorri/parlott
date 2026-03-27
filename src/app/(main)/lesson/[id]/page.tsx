import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect, notFound } from "next/navigation"
import { VoiceSessionView } from "@/components/lesson/voice-session"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LessonPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const { id } = await params

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      track: {
        include: { objective: true },
      },
    },
  })

  if (!lesson) notFound()

  // Check the lesson belongs to this user
  if (lesson.track.userId !== session.user.id) notFound()

  // Only allow available or in-progress lessons
  if (lesson.status === "LOCKED") {
    redirect("/dashboard")
  }

  return (
    <VoiceSessionView
      lesson={{
        id: lesson.id,
        title: lesson.title,
        topic: lesson.topic,
        description: lesson.description,
        order: lesson.order,
        level: lesson.track.level,
        objectiveName: lesson.track.objective.name,
      }}
    />
  )
}
