"use client"

import { Mic, MicOff, PhoneOff } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SessionStatus } from "@/hooks/use-voice-session"

interface VoiceControlsProps {
  status: SessionStatus
  isMuted: boolean
  onStart: () => void
  onEnd: () => void
  onToggleMute: () => void
}

export function VoiceControls({ status, isMuted, onStart, onEnd, onToggleMute }: VoiceControlsProps) {
  const isActive = status === "active"
  const isConnecting = status === "connecting"

  if (status === "idle" || status === "error") {
    return (
      <div className="flex justify-center">
        <button
          onClick={onStart}
          className="w-20 h-20 rounded-full bg-foreground flex items-center justify-center shadow-lg hover:bg-foreground/90 active:scale-95 transition-all"
        >
          <Mic className="w-8 h-8 text-background" />
        </button>
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-foreground/50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-background border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-8">
      {/* Mute toggle */}
      <button
        onClick={onToggleMute}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all active:scale-95",
          isMuted
            ? "bg-destructive/10 border-destructive text-destructive"
            : "bg-surface border-border text-text-secondary hover:border-border-strong"
        )}
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* End session */}
      <button
        onClick={onEnd}
        disabled={!isActive}
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-destructive/10 text-destructive text-body-sm font-medium hover:bg-destructive/20 active:scale-95 transition-all disabled:opacity-50"
      >
        <PhoneOff className="w-4 h-4" />
        Terminar
      </button>
    </div>
  )
}
