import { Mail } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Card, CardContent } from "@/components/ui/card"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5">
      <div className="mb-8">
        <Logo className="text-xl" />
      </div>
      <Card className="w-full max-w-sm shadow-sm">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5 text-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-title text-foreground">Revisa tu correo</h1>
            <p className="text-body-sm text-text-secondary leading-relaxed">
              Hemos enviado un enlace de acceso. Haz clic en él para entrar a Amelia.
            </p>
          </div>
          <p className="text-label text-text-tertiary">
            Si no ves el correo, revisa tu carpeta de spam.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
