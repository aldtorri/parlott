"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Logo } from "@/components/brand/logo"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mic, BookOpen, TrendingUp, Mail, ArrowRight } from "lucide-react"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn("resend", {
      email,
      redirect: false,
      callbackUrl: "/dashboard",
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left: Form */}
      <div className="flex flex-col justify-between px-6 py-10 md:px-12 lg:px-20">
        <div>
          <Logo className="text-xl" />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full md:mx-0">
          {sent ? (
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <Mail className="w-5 h-5 text-foreground" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  Revisa tu correo
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Enviamos un enlace de acceso a{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                El enlace expira en 24 horas. Revisa tu carpeta de spam si no lo encuentras.
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSent(false)
                  setEmail("")
                }}
              >
                Usar otro correo
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  Empieza a hablar inglés
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ingresa tu correo para acceder a tu tutor de IA personalizado.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    "Enviando..."
                  ) : (
                    <span className="flex items-center gap-2">
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center">
                Sin contraseña. Solo un enlace en tu correo.
              </p>
            </div>
          )}
        </div>

        {/* Trust indicators */}
        <div className="hidden md:flex gap-6 pt-8 border-t border-border mt-8">
          {[
            { icon: Mic, text: "Conversaciones habladas con IA" },
            { icon: BookOpen, text: "Currículum personalizado" },
            { icon: TrendingUp, text: "Progresión guiada" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Hero visual */}
      <div className="hidden md:block relative overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-stone-100 to-neutral-200" />
        {/* Decorative orb */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-neutral-300/60 to-neutral-400/30 blur-3xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neutral-200 to-white border border-neutral-200/50 shadow-2xl" />
            </div>
          </div>
        </div>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>
    </div>
  )
}
