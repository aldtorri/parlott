import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: "API key no configurada" }, { status: 500 })
  }

  // TODO: In production, exchange for an ephemeral token via Google's token endpoint
  // to avoid exposing the raw API key to the client
  return NextResponse.json({ apiKey })
}
