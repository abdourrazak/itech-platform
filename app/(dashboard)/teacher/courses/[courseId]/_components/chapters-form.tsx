"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2, PlusCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChaptersFormProps {
  initialData: {
    chapters: { id: string; title: string; isPublished: boolean; isFree: boolean }[];
  };
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
});

export const ChaptersForm = ({
  initialData,
  courseId
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      toggleCreating();
      router.refresh();
    } catch {
      console.error("Error creating chapter");
    }
  }

  return (
    <div className="mt-6 border bg-card rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center z-50">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Chapitres du cours
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Annuler</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Ajouter un chapitre
            </>
          )}
        </Button>
      </div>
      
      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction au cours'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
                disabled={!isValid || isSubmitting}
                type="submit"
            >
                Créer
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>
          {!initialData.chapters.length && "Pas de chapitres"}
          {/* Liste des chapitres à implémenter (avec Drag n Drop si possible) */}
          {initialData.chapters.map((chapter) => (
             <div key={chapter.id} className="flex items-center gap-x-2 bg-slate-100 border-slate-200 border text-slate-700 rounded-md mb-2 text-sm p-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300">
               {chapter.title}
               <div className="ml-auto flex items-center gap-x-2">
                  {chapter.isFree && <span className="text-xs bg-emerald-500 text-white px-1 rounded">Gratuit</span>}
                  {chapter.isPublished ? <span className="text-xs bg-sky-700 text-white px-1 rounded">Publié</span> : <span className="text-xs bg-slate-500 text-white px-1 rounded">Brouillon</span>}
                  <Pencil className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
               </div>
             </div>
          ))}
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Glissez-déposez pour réorganiser les chapitres (à implémenter)
        </p>
      )}
    </div>
  )
}

import { Pencil } from "lucide-react"
