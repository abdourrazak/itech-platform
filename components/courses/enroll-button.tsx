"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { enrollInCourse } from "@/actions/enrollment"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EnrollButtonProps {
    courseId: string
    courseSlug: string
    isEnrolled?: boolean
}

export function EnrollButton({ courseId, courseSlug, isEnrolled = false }: EnrollButtonProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [enrolled, setEnrolled] = useState(isEnrolled)

    const handleEnroll = () => {
        if (enrolled) {
            // Already enrolled, go to course
            router.push(`/courses/${courseSlug}/learn`)
            return
        }

        startTransition(async () => {
            const result = await enrollInCourse(courseId)

            if (result.error) {
                toast({
                    title: "Erreur",
                    description: result.error,
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Inscription réussie !",
                    description: "Vous pouvez maintenant commencer la formation",
                })
                setEnrolled(true)
                router.push(`/courses/${courseSlug}/learn`)
                router.refresh()
            }
        })
    }

    return (
        <Button
            onClick={handleEnroll}
            disabled={isPending}
            size="lg"
            className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:-translate-y-0.5"
        >
            {isPending ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Inscription...
                </>
            ) : enrolled ? (
                <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Commencer la formation
                </>
            ) : (
                "S'inscrire gratuitement"
            )}
        </Button>
    )
}
