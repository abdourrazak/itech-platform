import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// Schéma de validation simple pour le login
import { z } from "zod"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          
          // Note: On ne peut pas utiliser prisma ici car on est en Edge runtime potentiellement
          // Mais pour l'instant authorize est server-side nodejs compatible.
          // Cependant, auth.config.ts est souvent importé dans middleware (Edge).
          // Donc on met la logique DB dans auth.ts et on merge.
          return null
        }
        return null
      }
    })
  ],
} satisfies NextAuthConfig
