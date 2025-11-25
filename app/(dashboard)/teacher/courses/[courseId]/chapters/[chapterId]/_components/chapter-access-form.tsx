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
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

interface ChapterAccessFormProps {
  initialData: {
    isFree: boolean;
  };
  courseId: string;
  chapterId: string;
};

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export const ChapterAccessForm = ({
  initialData,
  courseId,
  chapterId
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!initialData.isFree // Double bang pour forcer boolean
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
        Accès au chapitre
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
        <p className={cn(
          "text-sm mt-2",
          !initialData.isFree && "text-muted-foreground italic"
        )}>
          {initialData.isFree ? (
            <>Ce chapitre est gratuit pour l'aperçu.</>
          ) : (
            <>Ce chapitre n'est pas gratuit.</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Cochez cette case si vous voulez rendre ce chapitre gratuit pour l'aperçu.
                    </FormDescription>
                  </div>
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
