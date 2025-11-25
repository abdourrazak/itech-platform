"use server"

import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { auth } from "@/auth"

export async function createCourse(title: string) {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      throw new Error("Unauthorized")
    }

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    })

    revalidatePath("/teacher/courses")
    return { success: true, id: course.id }
  } catch (error) {
    console.error("[CREATE_COURSE]", error)
    return { success: false, error: "Internal Error" }
  }
}
