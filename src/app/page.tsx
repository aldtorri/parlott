import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Mic, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function LandingPage() {
  const session = await auth()
  if (session?.user) redirect("/dashboard")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="space-y-6 max-w-md">
          {/* Logo */}
          <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <span className="text-3xl font-bold text-primary">P</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">
              Aprende inglés<br />
              <span className="text-primary">hablando con IA</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Un tutor de voz personalizado que te guía a través de lecciones prácticas según tu nivel y objetivo.
            </p>
          </div>

          <Button asChild size="lg" className="w-full max-w-xs mx-auto">
            <Link href="/auth/signin">
              Comenzar gratis
            </Link>
          </Button>

          <p className="text-xs text-muted-foreground">Sin tarjeta de crédito. Sin contraseña.</p>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 pb-16 max-w-lg mx-auto w-full">
        <div className="space-y-3">
          {[
            {
              icon: Mic,
              title: "Conversaciones 100% habladas",
              description: "Practica hablando en tiempo real con un tutor de IA que te corrige y guía.",
            },
            {
              icon: BookOpen,
              title: "Currículum personalizado",
              description: "Track estructurado por nivel CEFR y objetivo: negocios, viajes, entrevistas y más.",
            },
            {
              icon: TrendingUp,
              title: "Progresión guiada",
              description: "Avanza lección por lección con retroalimentación automática después de cada sesión.",
            },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 p-4 rounded-2xl border border-border bg-card">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-foreground text-sm">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
