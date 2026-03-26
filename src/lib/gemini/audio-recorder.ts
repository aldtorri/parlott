export type AudioRecorderCallback = (base64Data: string) => void

export class AudioRecorder {
  private stream: MediaStream | null = null
  private audioContext: AudioContext | null = null
  private processor: ScriptProcessorNode | null = null
  private source: MediaStreamAudioSourceNode | null = null
  private onData: AudioRecorderCallback | null = null
  private isRecording = false

  async start(onData: AudioRecorderCallback): Promise<void> {
    this.onData = onData

    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        sampleRate: 16000,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    })

    this.audioContext = new AudioContext({ sampleRate: 16000 })
    this.source = this.audioContext.createMediaStreamSource(this.stream)

    // 4096 samples / 16000hz = 256ms chunks
    this.processor = this.audioContext.createScriptProcessor(4096, 1, 1)

    this.processor.onaudioprocess = (event) => {
      if (!this.isRecording) return
      const float32Data = event.inputBuffer.getChannelData(0)
      const base64 = this.float32ToBase64PCM16(float32Data)
      this.onData?.(base64)
    }

    this.source.connect(this.processor)
    this.processor.connect(this.audioContext.destination)
    this.isRecording = true
  }

  stop(): void {
    this.isRecording = false
    this.processor?.disconnect()
    this.source?.disconnect()
    this.stream?.getTracks().forEach(t => t.stop())
    this.audioContext?.close()

    this.processor = null
    this.source = null
    this.stream = null
    this.audioContext = null
  }

  pause(): void {
    this.isRecording = false
  }

  resume(): void {
    this.isRecording = true
  }

  private float32ToBase64PCM16(float32Array: Float32Array): string {
    const int16Array = new Int16Array(float32Array.length)
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]))
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff
    }

    const uint8Array = new Uint8Array(int16Array.buffer)
    let binary = ""
    for (let i = 0; i < uint8Array.byteLength; i++) {
      binary += String.fromCharCode(uint8Array[i])
    }
    return btoa(binary)
  }
}
