"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
})

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Champs invalides !" }
  }

  const { email, password, name } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    return { error: "Cet email est déjà utilisé !" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "STUDENT", // Par défaut
    },
  })

  // Pas de signIn auto ici pour garder simple, on redirige vers login
  return { success: "Compte créé ! Veuillez vous connecter." }
}
