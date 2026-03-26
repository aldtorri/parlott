import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Resend from "next-auth/providers/resend"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: process.env.EMAIL_FROM ?? "Parlott <noreply@parlott.app>",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        // Fetch extra fields from DB on first sign in
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { currentLevel: true, currentObjective: true },
        })
        if (dbUser) {
          token.currentLevel = dbUser.currentLevel
          token.currentObjective = dbUser.currentObjective
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.currentLevel = token.currentLevel as string | null
        session.user.currentObjective = token.currentObjective as string | null
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify",
  },
})
