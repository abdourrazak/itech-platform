"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

const RegisterSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

const LoginSchema = z.object({
    email: z.string().email("Email invalide"),
    password: z.string().min(1, "Le mot de passe est requis"),
})

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Champs invalides" }
    }

    const { name, email, password } = validatedFields.data

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await db.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return { error: "Cet email est déjà utilisé" }
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10)

        // Créer l'utilisateur
        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        // Connecter automatiquement l'utilisateur après l'inscription
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })

        return { success: "Compte créé avec succès !" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Identifiants invalides" }
                default:
                    return { error: "Une erreur est survenue" }
            }
        }
        throw error
    }
}

export async function login(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Champs invalides" }
    }

    const { email, password } = validatedFields.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        })

        return { success: "Connexion réussie !" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Email ou mot de passe incorrect" }
                default:
                    return { error: "Une erreur est survenue" }
            }
        }
        throw error
    }
}
