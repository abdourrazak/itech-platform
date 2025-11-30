"use server"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

/**
 * Mark a lesson as completed for the current user
 */
export async function markLessonComplete(chapterId: string) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { error: "Non authentifié" }
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: session.user.id,
                    chapterId,
                },
            },
            update: {
                isCompleted: true,
            },
            create: {
                userId: session.user.id,
                chapterId,
                isCompleted: true,
            },
        })

        revalidatePath(`/courses`)
        revalidatePath(`/dashboard`)

        return { success: true, userProgress }
    } catch (error) {
        console.error("[MARK_LESSON_COMPLETE]", error)
        return { error: "Erreur lors de la sauvegarde de la progression" }
    }
}

/**
 * Mark a lesson as incomplete for the current user
 */
export async function markLessonIncomplete(chapterId: string) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { error: "Non authentifié" }
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId: session.user.id,
                    chapterId,
                },
            },
            update: {
                isCompleted: false,
            },
            create: {
                userId: session.user.id,
                chapterId,
                isCompleted: false,
            },
        })

        revalidatePath(`/courses`)
        revalidatePath(`/dashboard`)

        return { success: true, userProgress }
    } catch (error) {
        console.error("[MARK_LESSON_INCOMPLETE]", error)
        return { error: "Erreur lors de la sauvegarde de la progression" }
    }
}

/**
 * Get user progress for a specific course
 */
export async function getUserCourseProgress(courseId: string) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { error: "Non authentifié" }
        }

        const course = await db.course.findUnique({
            where: { id: courseId },
            include: {
                chapters: {
                    orderBy: { position: "asc" },
                    include: {
                        userProgress: {
                            where: {
                                userId: session.user.id,
                            },
                        },
                    },
                },
            },
        })

        if (!course) {
            return { error: "Cours non trouvé" }
        }

        const completedChapters = course.chapters.filter(
            (chapter) => chapter.userProgress[0]?.isCompleted
        ).length

        const totalChapters = course.chapters.length
        const progressPercentage = totalChapters > 0
            ? Math.round((completedChapters / totalChapters) * 100)
            : 0

        return {
            success: true,
            completedChapters,
            totalChapters,
            progressPercentage,
            chapters: course.chapters.map((chapter) => ({
                id: chapter.id,
                title: chapter.title,
                isCompleted: chapter.userProgress[0]?.isCompleted || false,
            })),
        }
    } catch (error) {
        console.error("[GET_USER_COURSE_PROGRESS]", error)
        return { error: "Erreur lors de la récupération de la progression" }
    }
}

/**
 * Get all courses with user progress
 */
export async function getAllCoursesWithProgress() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { error: "Non authentifié" }
        }

        const courses = await db.course.findMany({
            where: { isPublished: true },
            include: {
                chapters: {
                    where: { isPublished: true },
                    include: {
                        userProgress: {
                            where: {
                                userId: session.user.id,
                            },
                        },
                    },
                },
                category: true,
            },
            orderBy: { createdAt: "desc" },
        })

        const coursesWithProgress = courses.map((course) => {
            const completedChapters = course.chapters.filter(
                (chapter) => chapter.userProgress[0]?.isCompleted
            ).length

            const totalChapters = course.chapters.length
            const progressPercentage = totalChapters > 0
                ? Math.round((completedChapters / totalChapters) * 100)
                : 0

            return {
                id: course.id,
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                category: course.category?.name,
                completedChapters,
                totalChapters,
                progressPercentage,
            }
        })

        return { success: true, courses: coursesWithProgress }
    } catch (error) {
        console.error("[GET_ALL_COURSES_WITH_PROGRESS]", error)
        return { error: "Erreur lors de la récupération des cours" }
    }
}

/**
 * Get user's enrolled courses (purchased courses)
 */
export async function getEnrolledCourses() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { error: "Non authentifié" }
        }

        const purchases = await db.purchase.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                course: {
                    include: {
                        chapters: {
                            where: { isPublished: true },
                            include: {
                                userProgress: {
                                    where: {
                                        userId: session.user.id,
                                    },
                                },
                            },
                        },
                        category: true,
                    },
                },
            },
        })

        const enrolledCourses = purchases.map((purchase) => {
            const completedChapters = purchase.course.chapters.filter(
                (chapter) => chapter.userProgress[0]?.isCompleted
            ).length

            const totalChapters = purchase.course.chapters.length
            const progressPercentage = totalChapters > 0
                ? Math.round((completedChapters / totalChapters) * 100)
                : 0

            return {
                id: purchase.course.id,
                title: purchase.course.title,
                description: purchase.course.description,
                imageUrl: purchase.course.imageUrl,
                category: purchase.course.category?.name,
                completedChapters,
                totalChapters,
                progressPercentage,
                enrolledAt: purchase.createdAt,
            }
        })

        return { success: true, courses: enrolledCourses }
    } catch (error) {
        console.error("[GET_ENROLLED_COURSES]", error)
        return { error: "Erreur lors de la récupération des cours inscrits" }
    }
}

/**
 * Get user statistics
 */
export async function getUserStats() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return { error: "Non authentifié" }
        }

        const [totalEnrolled, totalCompleted, totalInProgress] = await Promise.all([
            // Total enrolled courses
            db.purchase.count({
                where: { userId: session.user.id },
            }),

            // Total completed courses (100% progress)
            db.purchase.findMany({
                where: { userId: session.user.id },
                include: {
                    course: {
                        include: {
                            chapters: {
                                where: { isPublished: true },
                                include: {
                                    userProgress: {
                                        where: { userId: session.user.id },
                                    },
                                },
                            },
                        },
                    },
                },
            }).then((purchases) => {
                return purchases.filter((purchase) => {
                    const totalChapters = purchase.course.chapters.length
                    const completedChapters = purchase.course.chapters.filter(
                        (chapter) => chapter.userProgress[0]?.isCompleted
                    ).length
                    return totalChapters > 0 && completedChapters === totalChapters
                }).length
            }),

            // Total in progress courses (> 0% and < 100%)
            db.purchase.findMany({
                where: { userId: session.user.id },
                include: {
                    course: {
                        include: {
                            chapters: {
                                where: { isPublished: true },
                                include: {
                                    userProgress: {
                                        where: { userId: session.user.id },
                                    },
                                },
                            },
                        },
                    },
                },
            }).then((purchases) => {
                return purchases.filter((purchase) => {
                    const totalChapters = purchase.course.chapters.length
                    const completedChapters = purchase.course.chapters.filter(
                        (chapter) => chapter.userProgress[0]?.isCompleted
                    ).length
                    return completedChapters > 0 && completedChapters < totalChapters
                }).length
            }),
        ])

        return {
            success: true,
            stats: {
                totalEnrolled,
                totalCompleted,
                totalInProgress,
                completionRate: totalEnrolled > 0
                    ? Math.round((totalCompleted / totalEnrolled) * 100)
                    : 0,
            },
        }
    } catch (error) {
        console.error("[GET_USER_STATS]", error)
        return { error: "Erreur lors de la récupération des statistiques" }
    }
}
