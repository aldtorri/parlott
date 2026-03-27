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
        include: {
          objective: true,
          lessons: {
            where: { status: "COMPLETED" },
            select: { id: true },
          },
        },
      },
    },
  })

  if (!lesson) notFound()
  if (lesson.track.userId !== session.user.id) notFound()
  if (lesson.status === "LOCKED") redirect("/dashboard")

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
        language: lesson.track.objective.language,
        keyTopics: lesson.keyTopics,
        warmupQuestion: lesson.warmupQuestion,
        promptHints: lesson.promptHints,
        lessonsCompleted: lesson.track.lessons.length,
      }}
    />
  )
}
