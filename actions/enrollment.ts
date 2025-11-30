"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

/**
 * Enroll user in a free course
 */
export async function enrollInCourse(courseId: string) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { error: "Vous devez être connecté pour vous inscrire" }
        }

        // Check if course exists
        const course = await db.course.findUnique({
            where: { id: courseId },
        })

        if (!course) {
            return { error: "Cours non trouvé" }
        }

        // Check if already enrolled
        const existingPurchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId,
                },
            },
        })

        if (existingPurchase) {
            return { error: "Vous êtes déjà inscrit à ce cours" }
        }

        // Create purchase (enrollment)
        await db.purchase.create({
            data: {
                userId: session.user.id,
                courseId,
            },
        })

        revalidatePath(`/courses/${courseId}`)
        revalidatePath(`/dashboard`)

        return { success: true, message: "Inscription réussie !" }
    } catch (error) {
        console.error("[ENROLL_IN_COURSE]", error)
        return { error: "Erreur lors de l'inscription au cours" }
    }
}

/**
 * Check if user is enrolled in a course
 */
export async function isEnrolledInCourse(courseId: string) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { enrolled: false }
        }

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: session.user.id,
                    courseId,
                },
            },
        })

        return { enrolled: !!purchase }
    } catch (error) {
        console.error("[IS_ENROLLED_IN_COURSE]", error)
        return { enrolled: false }
    }
}
