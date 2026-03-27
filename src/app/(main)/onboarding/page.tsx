"use client"

import { useState, useTransition } from "react"
import { ObjectiveSelector } from "@/components/onboarding/objective-selector"
import { LevelAssessment } from "@/components/onboarding/level-assessment"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { completeOnboarding } from "./actions"
import { ChevronLeft, ChevronRight, Target, GraduationCap } from "lucide-react"

const OBJECTIVES = [
  { id: "1", slug: "business", name: "Inglés de negocios", description: "Para reuniones, presentaciones y comunicación profesional", icon: "Briefcase" },
  { id: "2", slug: "general", name: "Inglés general", description: "Para conversaciones cotidianas y situaciones del día a día", icon: "BookOpen" },
  { id: "3", slug: "travel", name: "Inglés para viajes", description: "Para viajar con confianza y conectar con personas de todo el mundo", icon: "Plane" },
  { id: "4", slug: "interviews", name: "Entrevistas de trabajo", description: "Para conseguir trabajos en empresas internacionales", icon: "UserCheck" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [objective, setObjective] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleContinue() {
    if (step === 1 && objective) setStep(2)
    else if (step === 2 && level) setStep(3)
    else if (step === 3 && objective && level) {
      startTransition(async () => {
        await completeOnboarding(objective, level)
      })
    }
  }

  const canContinue = (step === 1 && !!objective) || (step === 2 && !!level) || step === 3

  const objectiveName = OBJECTIVES.find(o => o.slug === objective)?.name

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {step > 1 ? (
            <button onClick={() => setStep(s => s - 1)} className="p-2 rounded-xl hover:bg-muted transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s <= step ? "w-8 bg-primary" : "w-4 bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="w-9" />
        </div>

        {/* Step 1: Objetivo */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">¿Cuál es tu objetivo?</h1>
              <p className="text-muted-foreground text-sm">Personalizaremos tu track de aprendizaje según esto.</p>
            </div>
            <ObjectiveSelector
              objectives={OBJECTIVES}
              selected={objective}
              onSelect={setObjective}
            />
          </div>
        )}

        {/* Step 2: Nivel */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">¿Cuál es tu nivel?</h1>
              <p className="text-muted-foreground text-sm">Sé honesto — empezarás con el nivel correcto para ti.</p>
            </div>
            <LevelAssessment selected={level} onSelect={setLevel} />
          </div>
        )}

        {/* Step 3: Confirmación */}
        {step === 3 && objective && level && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-foreground">¡Todo listo!</h1>
              <p className="text-muted-foreground text-sm">Así quedó tu track personalizado.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                  <Target className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Objetivo</p>
                  <p className="font-semibold text-foreground">{objectiveName}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nivel CEFR</p>
                  <p className="font-semibold text-foreground">Nivel {level}</p>
                </div>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">
                Generaremos un track con lecciones habladas personalizadas para ti. Podrás cambiar tu objetivo o nivel en cualquier momento.
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8">
          <Button
            onClick={handleContinue}
            disabled={!canContinue || isPending}
            className="w-full"
            size="lg"
          >
            {isPending ? "Generando tu track..." : step === 3 ? "Comenzar a aprender" : (
              <span className="flex items-center gap-2">
                Continuar <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
