import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, PlayCircle, Star, User, Clock, BookOpen, Share2, FileText, HelpCircle, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { isEnrolledInCourse } from "@/actions/enrollment"
import { EnrollButton } from "@/components/courses/enroll-button"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params

  let course
  let enrolled = false

  try {
    // Fetch course from database
    course = await db.course.findUnique({
      where: { slug },
      include: {
        chapters: {
          orderBy: { position: "asc" },
        },
        category: true,
        instructor: true,
      },
    })

    if (!course) {
      notFound()
    }

    // Check enrollment status
    const enrollmentResult = await isEnrolledInCourse(course.id)
    enrolled = enrollmentResult.enrolled || false
  } catch (error) {
    console.error("[COURSE_PAGE_ERROR]", error)
    notFound()
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "video": return <PlayCircle className="w-4 h-4 text-blue-500" />;
      case "text": return <FileText className="w-4 h-4 text-orange-500" />;
      case "quiz": return <HelpCircle className="w-4 h-4 text-green-500" />;
      default: return <PlayCircle className="w-4 h-4" />;
    }
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Hero Header du Cours */}
      <div className="bg-muted/30 border-b">
        <div className="container max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link href="/courses" className="hover:text-primary transition-colors">Formations</Link>
              <span>/</span>
              {course.category && (
                <Link
                  href={`/categories/${course.category.name.toLowerCase()}`}
                  className="text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                >
                  {course.category.name}
                </Link>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {course.title}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border shadow-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>4.8 (120 avis)</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border shadow-sm">
                <User className="w-4 h-4 text-primary" />
                <span>{course.instructor?.name || "Instructeur"}</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border shadow-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>10h</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full border shadow-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>{course.chapters.length} leçons</span>
              </div>
            </div>
          </div>

          {/* Carte d'inscription (Desktop) */}
          <div className="hidden lg:block w-[400px] shrink-0">
            <div className="sticky top-24 rounded-2xl border bg-card shadow-xl overflow-hidden">
              <div className="aspect-video relative w-full border-b">
                {course.imageUrl ? (
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-bold px-3 py-1 mb-2">
                    Formation Complète
                  </Badge>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-primary">Gratuit</span>
                  <Badge variant="outline" className="text-xs uppercase tracking-wider font-bold py-1 px-2">Accès libre</Badge>
                </div>

                <div className="space-y-4">
                  <EnrollButton
                    courseId={course.id}
                    courseSlug={course.slug}
                    isEnrolled={enrolled}
                  />
                  <p className="text-xs text-center text-muted-foreground font-medium">
                    Accès immédiat et illimité après inscription
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground mb-3">Ce cours comprend :</p>
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-blue-500" />
                    <span>Vidéos explicatives HD</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-orange-500" />
                    <span>Cours textuels détaillés</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-green-500" />
                    <span>Quiz de validation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                    <span>Certificat de réussite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-16">
          {/* Carte d'inscription (Mobile only) */}
          <div className="lg:hidden space-y-6 rounded-2xl border p-6 bg-card shadow-lg">
            <div className="aspect-video relative w-full rounded-xl overflow-hidden">
              {course.imageUrl && (
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">Gratuit</span>
              <Badge variant="outline">Accès libre</Badge>
            </div>
            <EnrollButton
              courseId={course.id}
              courseSlug={course.slug}
              isEnrolled={enrolled}
            />
          </div>

          {/* Méthodologie */}
          <div className="rounded-2xl border bg-card/50 p-8 md:p-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Notre méthodologie</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Une approche pratique basée sur des projets réels. Apprenez en construisant, validez vos acquis étape par étape.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <PlayCircle className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Vidéos HD</h3>
                  <p className="text-sm text-muted-foreground">Des explications claires et concises</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Support écrit</h3>
                  <p className="text-sm text-muted-foreground">Fiches récapitulatives et code source</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Quiz interactifs</h3>
                  <p className="text-sm text-muted-foreground">Validez vos connaissances</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Certification</h3>
                  <p className="text-sm text-muted-foreground">Attestez de votre réussite</p>
                </div>
              </div>
            </div>
          </div>

          {/* Programme */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Programme de la formation</h2>
            <div className="rounded-2xl border bg-card overflow-hidden divide-y">
              {course.chapters.map((chapter: any, index: number) => (
                <div key={chapter.id} className="p-4 md:p-6 hover:bg-muted/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                          {chapter.title}
                        </h3>
                        {/* Type icon logic simplified for now as we don't store type in DB explicitly yet, assuming video for most or mixed */}
                        <Badge variant="secondary" className="text-xs">
                          Leçon
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {chapter.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
