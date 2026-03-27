"use client"

import { useState, useTransition } from "react"
import { LanguageSelector, LANGUAGES } from "@/components/onboarding/language-selector"
import { ObjectiveSelector } from "@/components/onboarding/objective-selector"
import { LevelAssessment } from "@/components/onboarding/level-assessment"
import { DailyGoalSelector } from "@/components/onboarding/daily-goal-selector"
import { OnboardingSummary } from "@/components/onboarding/onboarding-summary"
import { Button } from "@/components/ui/button"
import { completeOnboarding } from "./actions"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Objectives per language
const OBJECTIVES_BY_LANGUAGE: Record<string, { id: string; slug: string; name: string; description: string; icon: string }[]> = {
  ENGLISH: [
    { id: "1", slug: "en-business", name: "Inglés de negocios", description: "Reuniones, emails y presentaciones profesionales", icon: "Briefcase" },
    { id: "2", slug: "en-general", name: "Inglés general", description: "Conversaciones del día a día", icon: "BookOpen" },
    { id: "3", slug: "en-travel", name: "Inglés para viajes", description: "Hoteles, aeropuertos y turismo", icon: "Plane" },
    { id: "4", slug: "en-interviews", name: "Entrevistas en inglés", description: "Consigue trabajo en empresas internacionales", icon: "UserCheck" },
  ],
  SPANISH: [
    { id: "5", slug: "es-everyday", name: "Español cotidiano", description: "Conversaciones naturales", icon: "BookOpen" },
    { id: "6", slug: "es-business", name: "Español de negocios", description: "Entorno profesional en LATAM/España", icon: "Briefcase" },
    { id: "7", slug: "es-culture", name: "Cultura hispana", description: "Literatura, cine y tradiciones", icon: "BookOpen" },
    { id: "8", slug: "es-travel", name: "Español para viajes", description: "Recorre Latinoamérica y España", icon: "Plane" },
  ],
  PORTUGUESE: [
    { id: "9", slug: "pt-brazilian", name: "Portugués brasileño", description: "El más hablado del mundo", icon: "BookOpen" },
    { id: "10", slug: "pt-european", name: "Portugués europeo", description: "Portugal y África lusófona", icon: "BookOpen" },
    { id: "11", slug: "pt-business", name: "Negocios en portugués", description: "Mercado más grande de LATAM", icon: "Briefcase" },
    { id: "12", slug: "pt-travel", name: "Portugués para viajes", description: "Viaja por Brasil y Portugal", icon: "Plane" },
  ],
  FRENCH: [
    { id: "13", slug: "fr-everyday", name: "Francés cotidiano", description: "Vivir y viajar en Francia", icon: "BookOpen" },
    { id: "14", slug: "fr-business", name: "Francés de negocios", description: "Organizaciones internacionales", icon: "Briefcase" },
    { id: "15", slug: "fr-culture", name: "Cultura francesa", description: "Cinema, literatura, gastronomía", icon: "BookOpen" },
    { id: "16", slug: "fr-african", name: "Francés africano", description: "Más de 20 países africanos", icon: "BookOpen" },
  ],
}

const TOTAL_STEPS = 5

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [languages, setLanguages] = useState<string[]>([])
  const [objective, setObjective] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [dailyGoal, setDailyGoal] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  function toggleLanguage(code: string) {
    setLanguages((prev) =>
      prev.includes(code) ? prev.filter((l) => l !== code) : [...prev, code]
    )
    // Reset objective when language changes
    setObjective(null)
  }

  function handleContinue() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
    } else if (step === TOTAL_STEPS && objective && level && languages.length > 0) {
      startTransition(async () => {
        await completeOnboarding(
          objective,
          level,
          languages[0], // Primary language
          dailyGoal ?? 10
        )
      })
    }
  }

  const canContinue =
    (step === 1 && languages.length > 0) ||
    (step === 2 && !!objective) ||
    (step === 3 && !!level) ||
    (step === 4 && dailyGoal !== null) ||
    step === 5

  // Get objectives for selected language(s)
  const activeLanguage = languages[0] ?? "ENGLISH"
  const objectives = OBJECTIVES_BY_LANGUAGE[activeLanguage] ?? []
  const objectiveName = objectives.find((o) => o.slug === objective)?.name ?? ""
  const languageName = LANGUAGES.find((l) => l.code === activeLanguage)?.name ?? ""

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-5 py-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="p-2 rounded-xl hover:bg-surface transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9" />
          )}
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i < step ? "w-6 bg-foreground" : "w-3 bg-surface-elevated"
                }`}
              />
            ))}
          </div>
          <div className="w-9" />
        </div>

        {/* Step 1: Idioma */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-title-lg text-foreground">¿Qué idioma quieres aprender?</h1>
              <p className="text-body-sm text-text-secondary">
                Puedes seleccionar más de uno.
              </p>
            </div>
            <LanguageSelector selected={languages} onToggle={toggleLanguage} />
          </div>
        )}

        {/* Step 2: Objetivo */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-title-lg text-foreground">¿Cuál es tu objetivo?</h1>
              <p className="text-body-sm text-text-secondary">
                Personalizaremos tu experiencia según esto.
              </p>
            </div>
            <ObjectiveSelector
              objectives={objectives}
              selected={objective}
              onSelect={setObjective}
            />
          </div>
        )}

        {/* Step 3: Nivel */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-title-lg text-foreground">¿Cuál es tu nivel?</h1>
              <p className="text-body-sm text-text-secondary">
                Sé honesto — empezarás con el nivel correcto para ti.
              </p>
            </div>
            <LevelAssessment selected={level} onSelect={setLevel} />
          </div>
        )}

        {/* Step 4: Meta diaria */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-title-lg text-foreground">¿Cuánto tiempo tienes para practicar?</h1>
              <p className="text-body-sm text-text-secondary">
                Crearemos un plan realista. Sin presión.
              </p>
            </div>
            <DailyGoalSelector selected={dailyGoal} onSelect={setDailyGoal} />
          </div>
        )}

        {/* Step 5: Resumen */}
        {step === 5 && objective && level && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-title-lg text-foreground">Tu plan está listo</h1>
              <p className="text-body-sm text-text-secondary">
                Personalizado para aprender {languageName.toLowerCase()}.
              </p>
            </div>
            <OnboardingSummary
              language={activeLanguage}
              languageName={languageName}
              objectiveName={objectiveName}
              level={level}
              dailyGoal={dailyGoal ?? 10}
            />
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
            {isPending ? (
              "Generando tu plan..."
            ) : step === TOTAL_STEPS ? (
              "Comenzar mi primera lección"
            ) : (
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
