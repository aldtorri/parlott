import type { CEFRLevel, LessonStatus, TrackStatus } from "@/generated/prisma/enums"

export type { CEFRLevel, LessonStatus, TrackStatus }

export interface ObjectiveData {
  id: string
  slug: string
  name: string
  description: string
  icon: string
}

export interface LessonData {
  id: string
  title: string
  topic: string
  description: string
  order: number
  status: LessonStatus
  completedAt: Date | null
}

export interface TrackWithLessons {
  id: string
  level: CEFRLevel
  status: TrackStatus
  objective: ObjectiveData
  lessons: LessonData[]
}

export interface SessionSummary {
  lessonTitle: string
  duration: number
  summary: string
  feedback: string
  nextLessonId: string | null
}
