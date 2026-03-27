import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  // ---- Objectives (16 total: 4 per language) ----

  const objectives = [
    // English
    { slug: "en-business", name: "Inglés de negocios", description: "Para reuniones, presentaciones y comunicación profesional", icon: "Briefcase", language: "ENGLISH" as const },
    { slug: "en-general", name: "Inglés general", description: "Para conversaciones cotidianas y situaciones del día a día", icon: "BookOpen", language: "ENGLISH" as const },
    { slug: "en-travel", name: "Inglés para viajes", description: "Para viajar con confianza y conectar con personas de todo el mundo", icon: "Plane", language: "ENGLISH" as const },
    { slug: "en-interviews", name: "Entrevistas en inglés", description: "Para conseguir trabajos en empresas internacionales", icon: "UserCheck", language: "ENGLISH" as const },

    // Spanish
    { slug: "es-everyday", name: "Español cotidiano", description: "Conversaciones naturales del día a día", icon: "BookOpen", language: "SPANISH" as const },
    { slug: "es-business", name: "Español de negocios", description: "Entorno profesional en LATAM y España", icon: "Briefcase", language: "SPANISH" as const },
    { slug: "es-culture", name: "Cultura hispana", description: "Literatura, cine y tradiciones del mundo hispano", icon: "BookOpen", language: "SPANISH" as const },
    { slug: "es-travel", name: "Español para viajes", description: "Recorre Latinoamérica y España con confianza", icon: "Plane", language: "SPANISH" as const },

    // Portuguese
    { slug: "pt-brazilian", name: "Portugués brasileño", description: "El portugués más hablado del mundo", icon: "BookOpen", language: "PORTUGUESE" as const },
    { slug: "pt-european", name: "Portugués europeo", description: "Portugal y África lusófona", icon: "BookOpen", language: "PORTUGUESE" as const },
    { slug: "pt-business", name: "Negocios en portugués", description: "Mercado más grande de Latinoamérica", icon: "Briefcase", language: "PORTUGUESE" as const },
    { slug: "pt-travel", name: "Portugués para viajes", description: "Viaja por Brasil y Portugal con fluidez", icon: "Plane", language: "PORTUGUESE" as const },

    // French
    { slug: "fr-everyday", name: "Francés cotidiano", description: "Vivir y viajar en Francia con naturalidad", icon: "BookOpen", language: "FRENCH" as const },
    { slug: "fr-business", name: "Francés de negocios", description: "Organizaciones internacionales y comercio", icon: "Briefcase", language: "FRENCH" as const },
    { slug: "fr-culture", name: "Cultura francesa", description: "Cinema, literatura y gastronomía francesa", icon: "BookOpen", language: "FRENCH" as const },
    { slug: "fr-african", name: "Francés africano", description: "Más de 20 países africanos francófonos", icon: "BookOpen", language: "FRENCH" as const },
  ]

  // Migrate old objectives: rename slugs from "business" to "en-business", etc.
  const oldToNew: Record<string, string> = {
    business: "en-business",
    general: "en-general",
    travel: "en-travel",
    interviews: "en-interviews",
  }

  for (const [oldSlug, newSlug] of Object.entries(oldToNew)) {
    const existing = await prisma.objective.findFirst({ where: { slug: oldSlug } })
    if (existing) {
      await prisma.objective.update({
        where: { id: existing.id },
        data: { slug: newSlug, language: "ENGLISH" },
      })
      console.log(`  Migrated: ${oldSlug} → ${newSlug}`)
    }
  }

  // Upsert all objectives
  for (const obj of objectives) {
    await prisma.objective.upsert({
      where: { slug_language: { slug: obj.slug, language: obj.language } },
      update: { name: obj.name, description: obj.description, icon: obj.icon },
      create: obj,
    })
    console.log(`✓ Objetivo: ${obj.name} (${obj.language})`)
  }

  // ---- Achievements ----

  const achievements = [
    { slug: "first-lesson", name: "Primera lección", description: "Completaste tu primera lección", icon: "Star", condition: "lessons:1" },
    { slug: "streak-3", name: "3 días seguidos", description: "Practicaste 3 días consecutivos", icon: "Flame", condition: "streak:3" },
    { slug: "streak-7", name: "Primera semana", description: "7 días seguidos practicando", icon: "Flame", condition: "streak:7" },
    { slug: "streak-30", name: "Constante", description: "30 días de práctica consecutiva", icon: "Flame", condition: "streak:30" },
    { slug: "lessons-10", name: "10 lecciones", description: "Completaste 10 lecciones", icon: "BookOpen", condition: "lessons:10" },
    { slug: "lessons-50", name: "50 lecciones", description: "Completaste 50 lecciones", icon: "Trophy", condition: "lessons:50" },
    { slug: "minutes-60", name: "Conversador", description: "60 minutos de práctica total", icon: "Clock", condition: "minutes:60" },
    { slug: "minutes-300", name: "Dedicado", description: "5 horas de práctica total", icon: "Clock", condition: "minutes:300" },
    { slug: "polyglot-2", name: "Políglota", description: "Aprendiendo 2 idiomas a la vez", icon: "Globe", condition: "languages:2" },
  ]

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { slug: ach.slug },
      update: { name: ach.name, description: ach.description, icon: ach.icon, condition: ach.condition },
      create: ach,
    })
    console.log(`✓ Logro: ${ach.name}`)
  }

  console.log("\n✅ Seed completado")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
