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
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all"
        >
          <Mic className="w-8 h-8 text-primary-foreground" />
        </button>
      </div>
    )
  }

  if (isConnecting) {
    return (
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/50 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
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
            ? "bg-destructive/20 border-destructive text-destructive"
            : "bg-muted border-border text-muted-foreground hover:border-foreground/30"
        )}
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* End session */}
      <button
        onClick={onEnd}
        disabled={!isActive}
        className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center shadow-lg shadow-destructive/30 hover:bg-destructive/90 active:scale-95 transition-all disabled:opacity-50"
      >
        <PhoneOff className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
