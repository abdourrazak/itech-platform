import { use } from "react"
import { IconBadge } from "@/components/icon-badge"
import { LayoutDashboard, ListChecks, CircleDollarSign, File } from "lucide-react"
import { TitleForm } from "./_components/title-form"
import { DescriptionForm } from "./_components/description-form"
import { ImageForm } from "./_components/image-form"
import { CategoryForm } from "./_components/category-form"
import { PriceForm } from "./_components/price-form"
import { ChaptersForm } from "./_components/chapters-form"
import { AttachmentForm } from "./_components/attachment-form"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

interface CourseIdPageProps {
  params: Promise<{
    courseId: string
  }>
}

import { auth } from "@/auth"

export default async function CourseIdPage({ params }: CourseIdPageProps) {
  const { courseId } = await params
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.length > 0,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length
  const completionText = `(${completedFields}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Configuration du cours
          </h1>
          <span className="text-sm text-muted-foreground">
            Complétez tous les champs {completionText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Personnalisez votre cours
            </h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={course.id}
          />
          <DescriptionForm
            initialData={course}
            courseId={course.id}
          />
          <ImageForm
            initialData={course}
            courseId={course.id}
          />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">
                Chapitres du cours
              </h2>
            </div>
            <ChaptersForm
              initialData={course}
              courseId={course.id}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">
                Prix
              </h2>
            </div>
            <PriceForm
              initialData={course}
              courseId={course.id}
            />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">
                Ressources & Pièces jointes
              </h2>
            </div>
            <AttachmentForm
              initialData={course}
              courseId={course.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
