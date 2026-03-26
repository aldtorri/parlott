export class AudioPlayer {
  private audioContext: AudioContext | null = null
  private queue: AudioBuffer[] = []
  private isPlaying = false
  private nextStartTime = 0

  private getContext(): AudioContext {
    if (!this.audioContext || this.audioContext.state === "closed") {
      this.audioContext = new AudioContext({ sampleRate: 24000 })
    }
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume()
    }
    return this.audioContext
  }

  async play(base64Audio: string): Promise<void> {
    const ctx = this.getContext()

    // Decode base64 -> Int16 -> Float32 -> AudioBuffer
    const binary = atob(base64Audio)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }

    const int16Array = new Int16Array(bytes.buffer)
    const float32Array = new Float32Array(int16Array.length)
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768.0
    }

    const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000)
    audioBuffer.copyToChannel(float32Array, 0)

    this.queue.push(audioBuffer)
    if (!this.isPlaying) {
      this.playNext()
    }
  }

  private playNext(): void {
    if (this.queue.length === 0) {
      this.isPlaying = false
      return
    }

    const ctx = this.getContext()
    this.isPlaying = true
    const buffer = this.queue.shift()!

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const gainNode = ctx.createGain()
    gainNode.gain.value = 1.0
    source.connect(gainNode)
    gainNode.connect(ctx.destination)

    const startTime = Math.max(ctx.currentTime, this.nextStartTime)
    source.start(startTime)
    this.nextStartTime = startTime + buffer.duration

    source.onended = () => {
      this.playNext()
    }
  }

  stop(): void {
    this.queue = []
    this.isPlaying = false
    this.nextStartTime = 0
    this.audioContext?.close()
    this.audioContext = null
  }

  get playing(): boolean {
    return this.isPlaying
  }
}
