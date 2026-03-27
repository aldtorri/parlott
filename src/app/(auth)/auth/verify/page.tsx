import { Mail } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Card, CardContent } from "@/components/ui/card"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-8">
        <Logo className="text-xl" />
      </div>
      <Card className="w-full max-w-sm shadow-sm">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Mail className="w-5 h-5 text-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-semibold text-foreground">Revisa tu correo</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hemos enviado un enlace de acceso. Haz clic en él para entrar a Amelia.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Si no ves el correo, revisa tu carpeta de spam.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
