"use server"

import { db } from "@/lib/db"
import { courses } from "@/lib/mock-data"

export async function seedDatabase() {
    try {
        console.log("Starting seed...")

        // Extract unique categories from courses
        const categories = Array.from(new Set(courses.map(c => c.category)))

        // 1. Seed Categories
        console.log("Seeding categories...")
        for (const categoryName of categories) {
            await db.category.upsert({
                where: { name: categoryName },
                update: {},
                create: { name: categoryName },
            })
        }

        // Get admin user (create one if not exists for instructor)
        let instructor = await db.user.findFirst({
            where: { email: "abd.razak@example.com" }
        })

        if (!instructor) {
            // Try to find any user to be instructor if specific email not found
            instructor = await db.user.findFirst()

            if (!instructor) {
                // Create a default user if really no one exists (should be handled by auth usually)
                // For seed purpose, we might skip or create dummy.
                console.log("No user found. Creating dummy instructor.")
                instructor = await db.user.create({
                    data: {
                        email: "abd.razak@example.com",
                        name: "Abd Razak",
                        role: "INSTRUCTOR",
                    }
                })
            }
        }

        // 2. Seed Courses
        console.log("Seeding courses...")
        for (const courseData of courses) {
            // Find category ID
            const category = await db.category.findUnique({
                where: { name: courseData.category }
            })

            if (!category) {
                console.warn(`Category not found for course: ${courseData.title}`)
                continue
            }

            const existingCourse = await db.course.findFirst({
                where: { title: courseData.title }
            })

            let courseId = existingCourse?.id

            if (existingCourse) {
                // Update
                await db.course.update({
                    where: { id: courseId },
                    data: {
                        description: courseData.description,
                        imageUrl: courseData.image,
                        price: courseData.price,
                        isPublished: true,
                        categoryId: category.id,
                        slug: courseData.slug, // Update slug
                    }
                })
            } else {
                // Create
                const newCourse = await db.course.create({
                    data: {
                        userId: instructor.id,
                        title: courseData.title,
                        description: courseData.description,
                        imageUrl: courseData.image,
                        price: courseData.price,
                        isPublished: true,
                        categoryId: category.id,
                        slug: courseData.slug, // Add slug
                    }
                })
                courseId = newCourse.id
            }

            // 3. Seed Chapters (Lessons)
            if (courseId) {
                await db.chapter.deleteMany({
                    where: { courseId: courseId }
                })

                let position = 0
                for (const section of courseData.curriculum) {
                    for (const lesson of section.lessons) {
                        await db.chapter.create({
                            data: {
                                courseId: courseId!,
                                title: lesson.title,
                                description: lesson.type === 'text' ? lesson.content : `Section: ${section.title}`,
                                videoUrl: lesson.videoUrl,
                                position: position++,
                                isPublished: true,
                                isFree: true,
                            }
                        })
                    }
                }
            }
        }

        console.log("Seed completed successfully!")
        return { success: true }
    } catch (error) {
        console.error("Seed failed:", error)
        return { error: "Seed failed" }
    }
}
