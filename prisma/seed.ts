import { PrismaClient } from "../src/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const objectives = [
    {
      slug: "business",
      name: "Inglés de negocios",
      description: "Para reuniones, presentaciones y comunicación profesional",
      icon: "Briefcase",
    },
    {
      slug: "general",
      name: "Inglés general",
      description: "Para conversaciones cotidianas y situaciones del día a día",
      icon: "BookOpen",
    },
    {
      slug: "travel",
      name: "Inglés para viajes",
      description: "Para viajar con confianza y conectar con personas de todo el mundo",
      icon: "Plane",
    },
    {
      slug: "interviews",
      name: "Entrevistas de trabajo",
      description: "Para conseguir trabajos en empresas internacionales",
      icon: "UserCheck",
    },
  ]

  for (const objective of objectives) {
    await prisma.objective.upsert({
      where: { slug: objective.slug },
      update: objective,
      create: objective,
    })
    console.log(`✓ Objetivo: ${objective.name}`)
  }

  console.log("✅ Seed completado")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
