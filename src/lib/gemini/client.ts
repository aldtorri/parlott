export interface GeminiCallbacks {
  onAudioData: (base64Audio: string) => void
  onInputTranscript: (text: string) => void
  onOutputTranscript: (text: string) => void
  onSetupComplete: () => void
  onTurnComplete: () => void
  onError: (error: Error) => void
  onClose: () => void
}

export interface SessionConfig {
  systemPrompt: string
  model?: string
  voiceName?: string
}

const GEMINI_LIVE_URL =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent"

export class GeminiLiveClient {
  private ws: WebSocket | null = null
  private callbacks: GeminiCallbacks
  private pendingOutputTranscript = ""

  constructor(callbacks: GeminiCallbacks) {
    this.callbacks = callbacks
  }

  connect(apiKey: string, config: SessionConfig): void {
    const url = `${GEMINI_LIVE_URL}?key=${apiKey}`
    this.ws = new WebSocket(url)

    this.ws.onopen = () => {
      this.sendSetup(config)
    }

    this.ws.onmessage = async (event) => {
      const data = event.data instanceof Blob
        ? await event.data.text()
        : event.data as string

      try {
        const message = JSON.parse(data)
        this.handleMessage(message)
      } catch (e) {
        console.error("Error parsing Gemini message:", e)
      }
    }

    this.ws.onerror = () => {
      this.callbacks.onError(new Error("Error de conexión con Gemini"))
    }

    this.ws.onclose = () => {
      this.callbacks.onClose()
    }
  }

  private sendSetup(config: SessionConfig): void {
    const setupMessage = {
      setup: {
        model: `models/${config.model ?? "gemini-2.0-flash-live-001"}`,
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: config.voiceName ?? "Aoede",
              },
            },
          },
        },
        systemInstruction: {
          parts: [{ text: config.systemPrompt }],
        },
        inputAudioTranscription: {},
        outputAudioTranscription: {},
      },
    }

    this.ws?.send(JSON.stringify(setupMessage))
  }

  private handleMessage(message: Record<string, unknown>): void {
    // Setup complete
    if (message.setupComplete) {
      this.callbacks.onSetupComplete()
      return
    }

    // Server content (audio response, transcripts)
    const serverContent = message.serverContent as Record<string, unknown> | undefined
    if (serverContent) {
      // Output transcript
      const outputTranscription = serverContent.outputTranscription as Record<string, unknown> | undefined
      if (outputTranscription?.text) {
        this.pendingOutputTranscript += outputTranscription.text as string
      }

      // Audio data
      const modelTurn = serverContent.modelTurn as Record<string, unknown> | undefined
      if (modelTurn) {
        const parts = modelTurn.parts as Array<Record<string, unknown>> | undefined
        if (parts) {
          for (const part of parts) {
            const inlineData = part.inlineData as Record<string, unknown> | undefined
            if (inlineData?.data) {
              this.callbacks.onAudioData(inlineData.data as string)
            }
          }
        }
      }

      // Turn complete
      if (serverContent.turnComplete) {
        if (this.pendingOutputTranscript) {
          this.callbacks.onOutputTranscript(this.pendingOutputTranscript)
          this.pendingOutputTranscript = ""
        }
        this.callbacks.onTurnComplete()
      }
    }

    // Input transcription
    const inputTranscription = (message as Record<string, unknown>).inputTranscription as Record<string, unknown> | undefined
    if (inputTranscription?.finalTranscription) {
      const finalTrans = inputTranscription.finalTranscription as Record<string, unknown>
      if (finalTrans.text) {
        this.callbacks.onInputTranscript(finalTrans.text as string)
      }
    }
  }

  sendAudio(base64PcmData: string): void {
    if (this.ws?.readyState !== WebSocket.OPEN) return

    const audioMessage = {
      realtimeInput: {
        audio: {
          data: base64PcmData,
          mimeType: "audio/pcm;rate=16000",
        },
      },
    }
    this.ws.send(JSON.stringify(audioMessage))
  }

  disconnect(): void {
    this.ws?.close()
    this.ws = null
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}
