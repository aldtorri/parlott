"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInPage() {
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-primary">P</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Parlott</h1>
          <p className="text-muted-foreground text-sm">Tu tutor de inglés con IA</p>
        </div>

        {sent ? (
          <div className="rounded-xl border border-border bg-card p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="font-semibold text-foreground">Revisa tu correo</h2>
            <p className="text-sm text-muted-foreground">
              Enviamos un enlace de acceso a <strong className="text-foreground">{email}</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              El enlace expira en 24 horas. Revisa tu carpeta de spam si no lo encuentras.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Enviando..." : "Enviar enlace mágico"}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Sin contraseña. Solo un enlace en tu correo.
        </p>
      </div>
    </div>
  )
}
