import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/ui/page-header"
import type { CEFRLevel } from "@/generated/prisma/enums"
import Link from "next/link"
import { LogOut, RefreshCcw } from "lucide-react"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  return (
    <div className="max-w-lg mx-auto px-5 py-6 pb-24">
      <PageHeader
        title="Ajustes"
        subtitle="Tu perfil y preferencias"
      />

      {/* Profile */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-4 shadow-sm mt-8">
        <h2 className="text-title-sm text-foreground">Perfil</h2>

        <div className="space-y-1">
          <p className="text-label text-text-secondary">Nombre</p>
          <p className="text-body text-foreground font-medium">
            {session.user.name ?? "Sin nombre"}
          </p>
        </div>
        <Separator />
        <div className="space-y-1">
          <p className="text-label text-text-secondary">Correo electrónico</p>
          <p className="text-body text-foreground font-medium">
            {session.user.email}
          </p>
        </div>
      </div>

      {/* Learning config */}
      <div className="rounded-2xl border border-border bg-card p-4 space-y-4 shadow-sm mt-8">
        <h2 className="text-title-sm text-foreground">
          Configuración de aprendizaje
        </h2>

        {session.user.currentLevel && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label text-text-secondary">Nivel actual</p>
                <p className="text-body text-foreground font-medium">
                  CEFR {session.user.currentLevel}
                </p>
              </div>
              <Badge variant={session.user.currentLevel as CEFRLevel}>
                {session.user.currentLevel}
              </Badge>
            </div>
            <Separator />
          </>
        )}

        {session.user.currentObjective && (
          <div>
            <p className="text-label text-text-secondary">Objetivo actual</p>
            <p className="text-body text-foreground font-medium capitalize">
              {session.user.currentObjective}
            </p>
          </div>
        )}

        <Button variant="outline" asChild className="w-full">
          <Link href="/onboarding">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Cambiar objetivo o nivel
          </Link>
        </Button>
      </div>

      {/* Sign out */}
      <form
        className="mt-8"
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/" })
        }}
      >
        <Button variant="outline" className="w-full text-destructive hover:text-destructive" type="submit">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </Button>
      </form>
    </div>
  )
}
