"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea" // J'ai créé ce composant plus tôt

interface ChapterDescriptionFormProps {
  initialData: {
    description: string | null;
  };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  description: z.string().min(1),
});

export const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId
}: ChapterDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      setIsEditing(false);
      router.refresh();
    } catch {
      console.error("Error");
    }
  }

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Description du chapitre
        <Button onClick={toggleEdit} variant="ghost">
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
      {!isEditing && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.description && "text-muted-foreground italic"
        )}>
          {initialData.description || "Pas de description"}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea // Assurez-vous que Textarea est bien importé
                      disabled={isSubmitting}
                      placeholder="Ce chapitre traite de..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
