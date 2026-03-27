import { redirect } from "next/navigation"

interface PageProps {
  searchParams: Promise<{ callbackUrl?: string }>
}

export default async function SignInPage({ searchParams }: PageProps) {
  const { callbackUrl } = await searchParams
  const url = callbackUrl ? `/?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/"
  redirect(url)
}
