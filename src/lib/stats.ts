import { prisma } from "@/lib/prisma"

/**
 * Update user stats after a voice session is saved.
 * Calculates streak, total minutes, and lessons completed.
 */
export async function updateUserStats(userId: string, sessionDurationSeconds: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const stats = await prisma.userStats.upsert({
    where: { userId },
    create: {
      userId,
      currentStreak: 1,
      longestStreak: 1,
      totalMinutes: Math.round(sessionDurationSeconds / 60),
      lastSessionDate: new Date(),
      lessonsCompleted: 1,
    },
    update: {},
  })

  // Calculate streak
  let newStreak = stats.currentStreak
  if (stats.lastSessionDate) {
    const lastDate = new Date(stats.lastSessionDate)
    lastDate.setHours(0, 0, 0, 0)

    const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      // Consecutive day
      newStreak = stats.currentStreak + 1
    } else if (diffDays === 0) {
      // Same day — keep streak
      newStreak = stats.currentStreak
    } else {
      // Streak broken
      newStreak = 1
    }
  } else {
    newStreak = 1
  }

  const newMinutes = stats.totalMinutes + Math.round(sessionDurationSeconds / 60)
  const newLessonsCompleted = stats.lessonsCompleted + 1
  const newLongestStreak = Math.max(stats.longestStreak, newStreak)

  await prisma.userStats.update({
    where: { userId },
    data: {
      currentStreak: newStreak,
      longestStreak: newLongestStreak,
      totalMinutes: newMinutes,
      lastSessionDate: new Date(),
      lessonsCompleted: newLessonsCompleted,
    },
  })

  return { currentStreak: newStreak, totalMinutes: newMinutes, lessonsCompleted: newLessonsCompleted }
}

/**
 * Check if user has earned any new achievements based on their stats.
 */
export async function checkAchievements(userId: string) {
  const stats = await prisma.userStats.findUnique({ where: { userId } })
  if (!stats) return []

  const allAchievements = await prisma.achievement.findMany()
  const earnedSlugs = (
    await prisma.userAchievement.findMany({
      where: { userId },
      select: { achievement: { select: { slug: true } } },
    })
  ).map((ua) => ua.achievement.slug)

  const newAchievements: string[] = []

  for (const achievement of allAchievements) {
    if (earnedSlugs.includes(achievement.slug)) continue

    const [type, valueStr] = achievement.condition.split(":")
    const value = parseInt(valueStr, 10)

    let earned = false
    switch (type) {
      case "lessons":
        earned = stats.lessonsCompleted >= value
        break
      case "streak":
        earned = stats.currentStreak >= value
        break
      case "minutes":
        earned = stats.totalMinutes >= value
        break
      case "languages": {
        const trackCount = await prisma.track.findMany({
          where: { userId },
          select: { objective: { select: { language: true } } },
          distinct: ["objectiveId"],
        })
        const uniqueLanguages = new Set(trackCount.map((t) => t.objective.language))
        earned = uniqueLanguages.size >= value
        break
      }
    }

    if (earned) {
      await prisma.userAchievement.create({
        data: { userId, achievementId: achievement.id },
      })
      newAchievements.push(achievement.slug)
    }
  }

  return newAchievements
}
