"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"
import type { SessionStatus } from "@/hooks/use-voice-session"

interface VoiceVisualizerProps {
  status: SessionStatus
  isAiSpeaking: boolean
  isUserSpeaking?: boolean
}

const ORB_STATES = {
  idle: {
    gradient: "radial-gradient(circle, #E2E8F0 0%, #94A3B8 60%, #64748B 100%)",
    scale: [0.97, 1.03, 0.97],
    glowOpacity: 0.15,
    duration: 3,
  },
  connecting: {
    gradient: "radial-gradient(circle, #D1D5DB 0%, #9CA3AF 60%, #6B7280 100%)",
    scale: [0.95, 1.05, 0.95],
    glowOpacity: 0.2,
    duration: 1.5,
  },
  aiSpeaking: {
    gradient: "radial-gradient(circle, #374151 0%, #1F2937 60%, #111827 100%)",
    scale: [0.95, 1.12, 0.95],
    glowOpacity: 0.3,
    duration: 1.2,
  },
  userSpeaking: {
    gradient: "radial-gradient(circle, #99F6E4 0%, #14B8A6 60%, #0F766E 100%)",
    scale: [0.96, 1.08, 0.96],
    glowOpacity: 0.35,
    duration: 0.8,
  },
  listening: {
    gradient: "radial-gradient(circle, #D1D5DB 0%, #6B7280 60%, #374151 100%)",
    scale: [0.98, 1.04, 0.98],
    glowOpacity: 0.2,
    duration: 2,
  },
  ended: {
    gradient: "radial-gradient(circle, #E5E7EB 0%, #D1D5DB 60%, #9CA3AF 100%)",
    scale: [1, 1, 1],
    glowOpacity: 0.1,
    duration: 3,
  },
}

function getOrbState(status: SessionStatus, isAiSpeaking: boolean, isUserSpeaking?: boolean) {
  if (status === "idle" || status === "error") return ORB_STATES.idle
  if (status === "connecting") return ORB_STATES.connecting
  if (status === "ended") return ORB_STATES.ended
  if (isAiSpeaking) return ORB_STATES.aiSpeaking
  if (isUserSpeaking) return ORB_STATES.userSpeaking
  return ORB_STATES.listening
}

export function VoiceVisualizer({ status, isAiSpeaking, isUserSpeaking }: VoiceVisualizerProps) {
  const orbState = getOrbState(status, isAiSpeaking, isUserSpeaking)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      scale: orbState.scale,
      transition: {
        duration: orbState.duration,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    })
  }, [status, isAiSpeaking, isUserSpeaking, controls, orbState.scale, orbState.duration])

  return (
    <div className="relative w-[200px] h-[200px] flex items-center justify-center mx-auto">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: orbState.gradient,
          filter: "blur(40px)",
          opacity: orbState.glowOpacity,
        }}
        animate={{
          scale: orbState.scale,
          opacity: orbState.glowOpacity,
        }}
        transition={{
          scale: { duration: orbState.duration, repeat: Infinity, ease: "easeInOut" as const },
          opacity: { duration: 0.5 },
        }}
      />

      {/* Main orb */}
      <motion.div
        className="w-[140px] h-[140px] rounded-full shadow-lg"
        style={{ background: orbState.gradient }}
        animate={controls}
      />

      {/* Inner highlight */}
      <motion.div
        className="absolute w-[60px] h-[60px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
          top: "35%",
          left: "35%",
        }}
        animate={{
          scale: orbState.scale,
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: orbState.duration,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />
    </div>
  )
}
