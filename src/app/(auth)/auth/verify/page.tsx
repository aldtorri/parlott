export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
          <span className="text-2xl font-bold text-primary">P</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-foreground">Revisa tu correo</h1>
          <p className="text-sm text-muted-foreground">
            Hemos enviado un enlace de acceso. Haz clic en él para entrar a Parlott.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Si no ves el correo, revisa tu carpeta de spam.
        </p>
      </div>
    </div>
  )
}
