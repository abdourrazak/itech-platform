"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft, CheckCircle, PlayCircle, Menu, ChevronLeft, ChevronRight, FileText, Award, HelpCircle } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { courses, Course, Lesson } from "@/lib/mock-data"
import ReactConfetti from 'react-confetti'

export default function CoursePlayerPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  useEffect(() => {
    if (slug) {
      const foundCourse = courses.find(c => c.slug === slug)
      if (foundCourse) {
        setCourse(foundCourse)
        // Set first lesson as current if not set
        if (foundCourse.curriculum.length > 0 && foundCourse.curriculum[0].lessons.length > 0) {
          setCurrentLesson(foundCourse.curriculum[0].lessons[0])
        }
      }
    }
  }, [slug])

  const handleLessonChange = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    setQuizAnswers({})
    setQuizSubmitted(false)
    setQuizScore(0)
  }

  const markAsCompleted = (lessonTitle: string) => {
    if (!completedLessons.includes(lessonTitle)) {
      setCompletedLessons([...completedLessons, lessonTitle])
    }
  }

  const handleQuizSubmit = () => {
    if (!currentLesson?.questions) return

    let correct = 0
    currentLesson.questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        correct++
      }
    })
    setQuizScore(correct)
    setQuizSubmitted(true)

    if (correct >= currentLesson.questions.length * 0.7) {
      markAsCompleted(currentLesson.title)
    }
  }

  const nextLesson = () => {
    if (!course || !currentLesson) return

    let found = false
    for (const section of course.curriculum) {
      for (const lesson of section.lessons) {
        if (found) {
          handleLessonChange(lesson)
          return
        }
        if (lesson.title === currentLesson.title) {
          found = true
        }
      }
    }
  }

  const prevLesson = () => {
    if (!course || !currentLesson) return

    let prev: Lesson | null = null
    for (const section of course.curriculum) {
      for (const lesson of section.lessons) {
        if (lesson.title === currentLesson.title) {
          if (prev) handleLessonChange(prev)
          return
        }
        prev = lesson
      }
    }
  }

  if (!course || !currentLesson) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  const progress = Math.round((completedLessons.length / course.lessonsCount) * 100)

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
          <Link href={`/courses/${slug}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
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
          {course.curriculum.map((section, i) => (
            <div key={i} className="mb-4">
              <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-0.5">
                {section.lessons.map((lesson, j) => {
                  const isActive = lesson.title === currentLesson.title
                  const isCompleted = completedLessons.includes(lesson.title)

                  let Icon = PlayCircle
                  if (lesson.type === 'text') Icon = FileText
                  if (lesson.type === 'quiz') Icon = HelpCircle
                  if (lesson.title.includes("Certificat")) Icon = Award

                  return (
                    <button
                      key={j}
                      onClick={() => handleLessonChange(lesson)}
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
                        <p className={cn("line-clamp-1", isCompleted && "line-through decoration-border")}>{lesson.title}</p>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-14 md:pt-0 relative">
        {/* Top Bar Desktop */}
        <div className="hidden md:flex h-14 items-center justify-between border-b px-6 shrink-0">
          <h1 className="font-medium truncate">{currentLesson.title}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevLesson}>
              <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
            </Button>
            <Button size="sm" onClick={nextLesson}>
              Suivant <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">

            {/* VIDEO PLAYER */}
            {currentLesson.type === 'video' && (
              <div className="space-y-6">
                <div className="aspect-video bg-black rounded-xl shadow-lg overflow-hidden relative">
                  {currentLesson.videoUrl ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
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
                  <Button onClick={() => markAsCompleted(currentLesson.title)} disabled={completedLessons.includes(currentLesson.title)}>
                    {completedLessons.includes(currentLesson.title) ? "Terminé" : "Marquer comme terminé"}
                  </Button>
                </div>
              </div>
            )}

            {/* TEXT LESSON */}
            {currentLesson.type === 'text' && !currentLesson.content?.includes("CERTIFICAT") && (
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: currentLesson.content?.replace(/\n/g, '<br/>') || '' }} />
                <div className="mt-8 pt-8 border-t flex justify-end">
                  <Button onClick={() => markAsCompleted(currentLesson.title)} disabled={completedLessons.includes(currentLesson.title)}>
                    {completedLessons.includes(currentLesson.title) ? "Lu et approuvé" : "Marquer comme lu"}
                  </Button>
                </div>
              </div>
            )}

            {/* QUIZ */}
            {currentLesson.type === 'quiz' && currentLesson.questions && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Quiz de validation</h2>

                  {quizSubmitted ? (
                    <div className="text-center py-8">
                      <div className="mb-4 flex justify-center">
                        {quizScore >= currentLesson.questions.length * 0.7 ? (
                          <CheckCircle className="h-16 w-16 text-green-500" />
                        ) : (
                          <HelpCircle className="h-16 w-16 text-orange-500" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Score: {quizScore} / {currentLesson.questions.length}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {quizScore >= currentLesson.questions.length * 0.7
                          ? "Félicitations ! Vous avez validé ce module."
                          : "Vous devez obtenir au moins 70% de bonnes réponses."}
                      </p>
                      <Button onClick={() => {
                        setQuizSubmitted(false)
                        setQuizAnswers({})
                        setQuizScore(0)
                      }}>Réessayer</Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {currentLesson.questions.map((q, idx) => (
                        <div key={idx} className="space-y-4">
                          <h3 className="font-medium text-lg">{idx + 1}. {q.question}</h3>
                          <div className="space-y-2">
                            {q.options.map((option, optIdx) => (
                              <div
                                key={optIdx}
                                onClick={() => setQuizAnswers({ ...quizAnswers, [idx]: optIdx })}
                                className={cn(
                                  "p-4 rounded-lg border cursor-pointer transition-all hover:border-primary",
                                  quizAnswers[idx] === optIdx ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-background"
                                )}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={Object.keys(quizAnswers).length !== currentLesson.questions.length}
                        onClick={handleQuizSubmit}
                      >
                        Valider mes réponses
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CERTIFICATE */}
            {currentLesson.content === "CERTIFICAT" && (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                {completedLessons.length >= (course.lessonsCount * 0.8) ? (
                  <>
                    <ReactConfetti recycle={false} numberOfPieces={500} />
                    <div className="w-full max-w-3xl bg-card border-4 border-double border-primary/20 p-12 rounded-xl shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                      <Award className="h-24 w-24 text-primary mx-auto mb-6" />
                      <h2 className="text-4xl font-serif font-bold mb-4 text-foreground">Certificat de Réussite</h2>
                      <p className="text-muted-foreground text-lg mb-8">Ce certificat est fièrement décerné à</p>
                      <p className="text-3xl font-bold mb-8 text-primary">Abd Razak</p>
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
                      Vous devez compléter au moins 80% des leçons pour débloquer votre certificat.
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
