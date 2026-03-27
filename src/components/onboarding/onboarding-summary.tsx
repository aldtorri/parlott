"use client"

import { motion } from "framer-motion"
import { Globe, Target, GraduationCap, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { CEFRLevel } from "@/generated/prisma/enums"

interface OnboardingSummaryProps {
  language: string
  languageName: string
  objectiveName: string
  level: string
  dailyGoal: number
}

const stagger = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
}

export function OnboardingSummary({
  languageName,
  objectiveName,
  level,
  dailyGoal,
}: OnboardingSummaryProps) {
  const items = [
    { icon: Globe, label: "Idioma", value: languageName },
    { icon: Target, label: "Objetivo", value: objectiveName },
    { icon: GraduationCap, label: "Nivel CEFR", value: `Nivel ${level}`, badge: level },
    { icon: Clock, label: "Meta diaria", value: `${dailyGoal} min/día` },
  ]

  return (
    <div className="space-y-6">
      <motion.div
        className="rounded-2xl border border-border bg-card p-4 shadow-sm"
        initial="hidden"
        animate="visible"
      >
        {items.map((item, i) => (
          <motion.div key={item.label} custom={i} variants={stagger}>
            {i > 0 && <Separator className="my-3" />}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-elevated flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-label text-text-secondary">{item.label}</p>
                <p className="text-title-sm text-foreground">{item.value}</p>
              </div>
              {item.badge && (
                <Badge variant={item.badge as CEFRLevel}>{item.badge}</Badge>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="text-body-sm text-text-secondary text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Estudias con un tutor personalizado que adapta cada lección a tu progreso. No hay ejercicios aburridos — solo conversación real.
      </motion.p>
    </div>
  )
}
