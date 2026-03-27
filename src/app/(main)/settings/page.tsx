import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { CEFRLevel } from "@/generated/prisma/enums"
import Link from "next/link"
import { LogOut, RefreshCcw } from "lucide-react"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold text-foreground">Ajustes</h1>
        <p className="text-sm text-muted-foreground">Tu perfil y preferencias</p>
      </div>

      {/* Profile */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
        <h2 className="font-semibold text-foreground text-sm">Perfil</h2>

        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Nombre</p>
          <p className="text-sm font-medium text-foreground">
            {session.user.name ?? "Sin nombre"}
          </p>
        </div>
        <Separator />
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Correo electrónico</p>
          <p className="text-sm font-medium text-foreground">
            {session.user.email}
          </p>
        </div>
      </div>

      {/* Learning config */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
        <h2 className="font-semibold text-foreground text-sm">
          Configuración de aprendizaje
        </h2>

        {session.user.currentLevel && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Nivel actual</p>
                <p className="text-sm font-medium text-foreground">
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
            <p className="text-xs text-muted-foreground">Objetivo actual</p>
            <p className="text-sm font-medium text-foreground capitalize">
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
