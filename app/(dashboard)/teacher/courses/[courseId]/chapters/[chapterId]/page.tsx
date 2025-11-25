"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react"

import { IconBadge } from "@/components/icon-badge"
import { Button } from "@/components/ui/button"

// Je vais devoir créer ces formulaires spécifiques aux chapitres
import { ChapterTitleForm } from "./_components/chapter-title-form"
import { ChapterDescriptionForm } from "./_components/chapter-description-form"
import { ChapterAccessForm } from "./_components/chapter-access-form"
import { ChapterVideoForm } from "./_components/chapter-video-form"

interface ChapterIdPageProps {
  params: Promise<{
    courseId: string;
    chapterId: string;
  }>
}

export default function ChapterIdPage({ params }: ChapterIdPageProps) {
  const { courseId, chapterId } = use(params)

  // Données factices
  const chapter = {
    id: chapterId,
    title: "Introduction au chapitre",
    description: "Description du chapitre...",
    videoUrl: null,
    isFree: false,
    isPublished: false,
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between w-full">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${courseId}`}
            className="flex items-center text-sm hover:opacity-75 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'édition du cours
          </Link>
          
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                Configuration du chapitre
              </h1>
              <span className="text-sm text-muted-foreground">
                Complétez tous les champs {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Personnalisez votre chapitre
              </h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
            <ChapterDescriptionForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye} />
              <h2 className="text-xl">
                Paramètres d'accès
              </h2>
            </div>
            <ChapterAccessForm
              initialData={chapter}
              courseId={courseId}
              chapterId={chapterId}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">
              Ajouter une vidéo
            </h2>
          </div>
          <ChapterVideoForm
            initialData={chapter}
            courseId={courseId}
            chapterId={chapterId}
          />
        </div>
      </div>
    </div>
  )
}
