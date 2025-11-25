"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PlusCircle, File, Loader2, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

interface AttachmentFormProps {
  initialData: {
    attachments: { name: string; url: string }[];
  };
  courseId: string;
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
       console.log(values);
       // API call
       setIsEditing(false);
       router.refresh();
    } catch {
      console.error("Error adding attachment");
    }
  };

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Ressources du cours
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Annuler</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un fichier
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-muted-foreground italic">
              Pas de pièces jointes
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.url}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md dark:bg-sky-900 dark:border-sky-800 dark:text-sky-300"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">
                    {attachment.name}
                  </p>
                  {deletingId === attachment.url && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.url && (
                    <button
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => console.log("Delete")}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div className="h-60 bg-muted border-dashed border-2 rounded-md flex items-center justify-center mt-4 cursor-pointer hover:opacity-75 transition">
            <span className="text-muted-foreground text-sm">Composant d'Upload de Fichiers à implémenter</span>
        </div>
      )}
    </div>
  )
}
