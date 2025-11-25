"use client"

import * as z from "zod"
import { Pencil, PlusCircle, ImageIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

interface ImageFormProps {
  initialData: {
    imageUrl: string | null;
  };
  courseId: string;
};

// Simulation d'upload pour l'instant
export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Image du cours
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Annuler</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter une image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-muted rounded-md">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div className="h-60 bg-muted border-dashed border-2 rounded-md flex items-center justify-center mt-4 cursor-pointer hover:opacity-75 transition">
           <span className="text-muted-foreground text-sm">Composant d'Upload à implémenter (ex: UploadThing)</span>
        </div>
      )}
    </div>
  )
}
