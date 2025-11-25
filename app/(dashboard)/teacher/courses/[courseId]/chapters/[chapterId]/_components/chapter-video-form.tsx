"use client"

import * as z from "zod"
import { Pencil, PlusCircle, Video } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ChapterVideoFormProps {
  initialData: {
    videoUrl: string | null;
  };
  courseId: string;
  chapterId: string;
};

// Simulation d'upload vidéo (Mux ou autre)
export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Vidéo du chapitre
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Annuler</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une vidéo
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-muted rounded-md mt-2">
            <Video className="h-10 w-10 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 rounded-md overflow-hidden bg-black flex items-center justify-center text-white">
             Vidéo chargée (Simulée)
          </div>
        )
      )}
      {isEditing && (
        <div className="h-60 bg-muted border-dashed border-2 rounded-md flex items-center justify-center mt-4 cursor-pointer hover:opacity-75 transition">
           <span className="text-muted-foreground text-sm">Composant d'Upload Vidéo à implémenter (Mux)</span>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Le traitement de la vidéo peut prendre quelques minutes.
        </div>
      )}
    </div>
  )
}
