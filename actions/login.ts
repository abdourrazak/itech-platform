"use server"

import * as z from "zod"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Champs invalides !" }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", // Par défaut
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email ou mot de passe incorrect !" }
        default:
          return { error: "Une erreur est survenue !" }
      }
    }
    throw error
  }
}
