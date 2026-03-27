import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SignInForm } from "@/components/auth/sign-in-form"

export default async function LandingPage() {
  const session = await auth()
  if (session?.user) redirect("/dashboard")

  return <SignInForm />
}
