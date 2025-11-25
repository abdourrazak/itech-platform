"use client"

import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import { useState } from "react"

interface ChapterAccessFormProps {
  initialData: {
    isFree: boolean;
  };
  courseId: string;
  chapterId: string;
};

export const ChapterAccessForm = ({
  initialData,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Accès au chapitre
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing ? (
            <>Annuler</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </>
          )}
        </Button>
      </div>
      <p className="text-sm mt-2">
        {initialData.isFree ? (
          <>Ce chapitre est gratuit pour l'aperçu.</>
        ) : (
          <>Ce chapitre n'est pas gratuit.</>
        )}
      </p>
    </div>
  )
}
