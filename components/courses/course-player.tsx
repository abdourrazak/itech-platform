"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft, CheckCircle, PlayCircle, Menu, ChevronLeft, ChevronRight, FileText, Award, HelpCircle, Loader2 } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import ReactConfetti from 'react-confetti'
import { markLessonComplete, markLessonIncomplete } from "@/actions/progress"
import { useToast } from "@/hooks/use-toast"

// Types adaptés à la DB et au Player
interface Chapter {
    id: string
    title: string
    description: string | null
    videoUrl: string | null
    position: number
    isCompleted: boolean
}

interface Course {
    id: string
    title: string
    slug: string
    chapters: Chapter[]
}

interface CoursePlayerProps {
    course: Course
    userId: string
    userName: string
}

export function CoursePlayer({ course, userId, userName }: CoursePlayerProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [currentChapter, setCurrentChapter] = useState<Chapter>(course.chapters[0])
    const [isPending, startTransition] = useTransition()

    // Optimistic UI for completion
    const [completedChapterIds, setCompletedChapterIds] = useState<string[]>(
        course.chapters.filter(c => c.isCompleted).map(c => c.id)
    )

    // Quiz state (mocked for now as DB schema doesn't fully support quiz questions yet)
    // We will treat quiz chapters as text chapters for now or simple validation
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
    const [quizSubmitted, setQuizSubmitted] = useState(false)
    const [quizScore, setQuizScore] = useState(0)

    // Determine lesson type based on content/title
    const getLessonType = (chapter: Chapter) => {
        if (chapter.title.includes("Quiz") || chapter.title.includes("Examen")) return "quiz"
        if (chapter.title.includes("Certificat")) return "certificate"
        if (chapter.videoUrl) return "video"
        return "text"
    }

    const handleChapterChange = (chapter: Chapter) => {
        setCurrentChapter(chapter)
        setQuizAnswers({})
        setQuizSubmitted(false)
        setQuizScore(0)
    }

    const toggleCompletion = (chapterId: string) => {
        const isCompleted = completedChapterIds.includes(chapterId)

        // Optimistic update
        if (isCompleted) {
            setCompletedChapterIds(prev => prev.filter(id => id !== chapterId))
        } else {
            setCompletedChapterIds(prev => [...prev, chapterId])
        }

        startTransition(async () => {
            try {
                if (isCompleted) {
                    await markLessonIncomplete(chapterId)
                } else {
                    await markLessonComplete(chapterId)
                    toast({
                        title: "Leçon terminée !",
                        description: "Progression sauvegardée.",
                    })
                }
                router.refresh()
            } catch (error) {
                // Revert on error
                if (isCompleted) {
                    setCompletedChapterIds(prev => [...prev, chapterId])
                } else {
                    setCompletedChapterIds(prev => prev.filter(id => id !== chapterId))
                }
                toast({
                    title: "Erreur",
                    description: "Impossible de sauvegarder la progression.",
                    variant: "destructive",
                })
            }
        })
    }

    const nextLesson = () => {
        const currentIndex = course.chapters.findIndex(c => c.id === currentChapter.id)
        if (currentIndex < course.chapters.length - 1) {
            handleChapterChange(course.chapters[currentIndex + 1])
        }
    }

    const prevLesson = () => {
        const currentIndex = course.chapters.findIndex(c => c.id === currentChapter.id)
        if (currentIndex > 0) {
            handleChapterChange(course.chapters[currentIndex - 1])
        }
    }

    const progress = Math.round((completedChapterIds.length / course.chapters.length) * 100)
    const currentType = getLessonType(currentChapter)

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Header Mobile */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b bg-background z-50 flex items-center justify-between px-4">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu className="h-5 w-5" />
                </Button>
                <span className="font-semibold truncate ml-2">{course.title}</span>
                <ModeToggle />
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-80 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static flex flex-col",
                !sidebarOpen && "-translate-x-full"
            )}>
                <div className="h-14 flex items-center border-b px-4 shrink-0">
                    <Link href={`/courses/${course.slug}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour au cours
                    </Link>
                </div>

                <div className="p-4 border-b bg-muted/30 shrink-0">
                    <h2 className="font-semibold line-clamp-1">{course.title}</h2>
                    <div className="w-full bg-muted h-2 mt-3 rounded-full overflow-hidden">
                        <div
                            className="bg-primary h-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{progress}% complété</p>
                </div>

                <div className="flex-1 overflow-y-auto py-2">
                    <div className="space-y-0.5">
                        {course.chapters.map((chapter, i) => {
                            const isActive = chapter.id === currentChapter.id
                            const isCompleted = completedChapterIds.includes(chapter.id)
                            const type = getLessonType(chapter)

                            let Icon = PlayCircle
                            if (type === 'text') Icon = FileText
                            if (type === 'quiz') Icon = HelpCircle
                            if (type === 'certificate') Icon = Award

                            return (
                                <button
                                    key={chapter.id}
                                    onClick={() => handleChapterChange(chapter)}
                                    className={cn(
                                        "w-full flex items-center px-4 py-3 text-sm hover:bg-accent/50 transition-colors text-left",
                                        isActive && "bg-accent text-accent-foreground border-r-2 border-primary",
                                        isCompleted && "text-muted-foreground"
                                    )}
                                >
                                    {isCompleted ? (
                                        <CheckCircle className="h-4 w-4 mr-3 text-primary shrink-0" />
                                    ) : (
                                        <Icon className={cn("h-4 w-4 mr-3 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                                    )}
                                    <div className="flex-1">
                                        <p className={cn("line-clamp-1", isCompleted && "line-through decoration-border")}>{chapter.title}</p>
                                        <span className="text-xs text-muted-foreground">Leçon {i + 1}</span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-14 md:pt-0 relative">
                {/* Top Bar Desktop */}
                <div className="hidden md:flex h-14 items-center justify-between border-b px-6 shrink-0">
                    <h1 className="font-medium truncate">{currentChapter.title}</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={prevLesson} disabled={course.chapters[0].id === currentChapter.id}>
                            <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
                        </Button>
                        <Button size="sm" onClick={nextLesson} disabled={course.chapters[course.chapters.length - 1].id === currentChapter.id}>
                            Suivant <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-4xl mx-auto space-y-8 pb-20">

                        {/* VIDEO PLAYER */}
                        {currentType === 'video' && (
                            <div className="space-y-6">
                                <div className="aspect-video bg-black rounded-xl shadow-lg overflow-hidden relative">
                                    {currentChapter.videoUrl ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={currentChapter.videoUrl}
                                            title={currentChapter.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0"
                                        ></iframe>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-white">
                                            <p>Vidéo non disponible</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        onClick={() => toggleCompletion(currentChapter.id)}
                                        disabled={isPending}
                                        variant={completedChapterIds.includes(currentChapter.id) ? "outline" : "default"}
                                    >
                                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {completedChapterIds.includes(currentChapter.id) ? "Marquer comme non terminé" : "Marquer comme terminé"}
                                    </Button>
                                </div>
                                <div className="prose dark:prose-invert max-w-none">
                                    <h3>À propos de cette leçon</h3>
                                    <p>{currentChapter.description}</p>
                                </div>
                            </div>
                        )}

                        {/* TEXT LESSON */}
                        {currentType === 'text' && (
                            <div className="prose dark:prose-invert max-w-none">
                                <h1>{currentChapter.title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: currentChapter.description?.replace(/\n/g, '<br/>') || '' }} />
                                <div className="mt-8 pt-8 border-t flex justify-end">
                                    <Button
                                        onClick={() => toggleCompletion(currentChapter.id)}
                                        disabled={isPending}
                                        variant={completedChapterIds.includes(currentChapter.id) ? "outline" : "default"}
                                    >
                                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {completedChapterIds.includes(currentChapter.id) ? "Marquer comme non lu" : "Marquer comme lu"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* QUIZ (Simplified) */}
                        {currentType === 'quiz' && (
                            <div className="max-w-2xl mx-auto space-y-8">
                                <div className="bg-card border rounded-xl p-6 shadow-sm">
                                    <h2 className="text-2xl font-bold mb-6">Quiz de validation</h2>
                                    <p className="text-muted-foreground mb-6">
                                        Ce quiz est une auto-évaluation. Confirmez que vous avez compris les concepts clés de cette section.
                                    </p>

                                    <div className="flex justify-center">
                                        <Button
                                            onClick={() => toggleCompletion(currentChapter.id)}
                                            disabled={isPending}
                                            size="lg"
                                            className="w-full"
                                            variant={completedChapterIds.includes(currentChapter.id) ? "outline" : "default"}
                                        >
                                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {completedChapterIds.includes(currentChapter.id) ? "J'ai validé mes connaissances" : "Valider ce module"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CERTIFICATE */}
                        {currentType === 'certificate' && (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                                {progress >= 100 ? (
                                    <>
                                        <ReactConfetti recycle={false} numberOfPieces={500} />
                                        <div className="w-full max-w-3xl bg-card border-4 border-double border-primary/20 p-12 rounded-xl shadow-2xl relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                                            <Award className="h-24 w-24 text-primary mx-auto mb-6" />
                                            <h2 className="text-4xl font-serif font-bold mb-4 text-foreground">Certificat de Réussite</h2>
                                            <p className="text-muted-foreground text-lg mb-8">Ce certificat est fièrement décerné à</p>
                                            <p className="text-3xl font-bold mb-8 text-primary">{userName}</p>
                                            <p className="text-muted-foreground mb-2">Pour avoir complété avec succès la formation</p>
                                            <h3 className="text-2xl font-bold mb-12">{course.title}</h3>

                                            <div className="flex justify-between items-end border-t pt-8">
                                                <div className="text-left">
                                                    <p className="font-bold">Abd Razak</p>
                                                    <p className="text-xs text-muted-foreground">Instructeur Principal</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold">{new Date().toLocaleDateString()}</p>
                                                    <p className="text-xs text-muted-foreground">Date de délivrance</p>
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="lg" className="mt-8">Télécharger le certificat (PDF)</Button>
                                    </>
                                ) : (
                                    <div className="max-w-md mx-auto text-center space-y-4">
                                        <Award className="h-16 w-16 text-muted-foreground mx-auto opacity-50" />
                                        <h2 className="text-2xl font-bold">Certificat verrouillé</h2>
                                        <p className="text-muted-foreground">
                                            Vous devez compléter 100% des leçons pour débloquer votre certificat.
                                        </p>
                                        <div className="w-full bg-muted h-4 rounded-full overflow-hidden">
                                            <div
                                                className="bg-primary h-full transition-all duration-500"
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm font-medium">{progress}% complété</p>
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    )
}
