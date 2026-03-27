"use client"

import { useEffect, useRef } from "react"
import type { SessionStatus } from "@/hooks/use-voice-session"

interface VoiceVisualizerProps {
  status: SessionStatus
  isAiSpeaking: boolean
  isUserSpeaking?: boolean
}

export function VoiceVisualizer({ status, isAiSpeaking, isUserSpeaking }: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const size = canvas.width

    function draw() {
      if (!ctx) return
      timeRef.current += 0.05

      ctx.clearRect(0, 0, size, size)

      const cx = size / 2
      const cy = size / 2

      // Determine state color and animation
      let baseRadius = 80
      let pulseAmount = 0
      let color1 = "rgba(99, 102, 241, 0.6)"   // indigo (AI)
      let color2 = "rgba(99, 102, 241, 0.2)"

      if (status === "idle" || status === "connecting") {
        // Gentle breathing
        baseRadius = 70
        pulseAmount = Math.sin(timeRef.current * 0.8) * 5
        color1 = "rgba(163, 163, 163, 0.5)"
        color2 = "rgba(163, 163, 163, 0.15)"
      } else if (isAiSpeaking) {
        // AI speaking: dark pulsing
        pulseAmount = Math.sin(timeRef.current * 3) * 20 + Math.sin(timeRef.current * 7) * 8
        color1 = "rgba(23, 23, 23, 0.8)"
        color2 = "rgba(23, 23, 23, 0.2)"
      } else if (isUserSpeaking) {
        // User speaking: blue/teal pulsing
        pulseAmount = Math.sin(timeRef.current * 4) * 18 + Math.sin(timeRef.current * 9) * 6
        color1 = "rgba(20, 184, 166, 0.8)"
        color2 = "rgba(20, 184, 166, 0.2)"
      } else if (status === "active") {
        // Listening: slow pulse
        pulseAmount = Math.sin(timeRef.current * 1.5) * 8
        color1 = "rgba(64, 64, 64, 0.6)"
        color2 = "rgba(64, 64, 64, 0.15)"
      }

      const radius = baseRadius + pulseAmount

      // Outer glow
      const outerGradient = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.4)
      outerGradient.addColorStop(0, color2)
      outerGradient.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.4, 0, Math.PI * 2)
      ctx.fillStyle = outerGradient
      ctx.fill()

      // Inner orb
      const innerGradient = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, 0, cx, cy, radius)
      innerGradient.addColorStop(0, color1.replace("0.6", "0.9").replace("0.7", "0.95").replace("0.5", "0.8").replace("0.4", "0.6"))
      innerGradient.addColorStop(0.5, color1)
      innerGradient.addColorStop(1, color2)
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = innerGradient
      ctx.fill()

      // Connecting dots ring (only when active)
      if (status === "active" || status === "connecting") {
        const numDots = 8
        const dotRadius = 3
        const ringRadius = radius + 30 + Math.sin(timeRef.current * 2) * 4

        for (let i = 0; i < numDots; i++) {
          const angle = (i / numDots) * Math.PI * 2 + timeRef.current * 0.5
          const x = cx + Math.cos(angle) * ringRadius
          const y = cy + Math.sin(angle) * ringRadius
          const opacity = 0.3 + Math.sin(timeRef.current * 2 + i * 0.8) * 0.3

          ctx.beginPath()
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
          ctx.fillStyle = color1.replace(/[\d.]+\)$/, `${opacity})`)
          ctx.fill()
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animationRef.current)
  }, [status, isAiSpeaking, isUserSpeaking])

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={280}
      className="mx-auto"
    />
  )
}
