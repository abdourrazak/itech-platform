import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { CoursePlayer } from "@/components/courses/course-player"

interface CourseLearnPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CourseLearnPage({ params }: CourseLearnPageProps) {
  const session = await auth()

  if (!session?.user) {
    return redirect("/login")
  }

  const { slug } = await params

  const course = await db.course.findUnique({
    where: { slug },
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
    return redirect("/courses")
  }

  // Transform data for the player
  // We map the DB structure to the structure expected by CoursePlayer
  const playerCourse = {
    id: course.id,
    title: course.title,
    slug: course.slug,
    chapters: course.chapters.map((chapter: any) => ({
      id: chapter.id,
      title: chapter.title,
      description: chapter.description,
      videoUrl: chapter.videoUrl,
      position: chapter.position,
      isCompleted: chapter.userProgress[0]?.isCompleted || false,
    })),
  }

  return (
    <CoursePlayer
      course={playerCourse}
      userId={session.user.id || ""}
      userName={session.user.name || "Étudiant"}
    />
  )
}
