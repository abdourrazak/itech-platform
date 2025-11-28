"use client"

import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, PlayCircle, Star, User, Clock, BookOpen, Share2, FileText, HelpCircle, GraduationCap } from "lucide-react"
import { use } from "react"
import { cn } from "@/lib/utils"
import { courses } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CoursePage({ params }: CoursePageProps) {
  // Unwrap params
  const { slug } = use(params)

  const course = courses.find((c) => c.slug === slug)

  if (!course) {
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
              <Link
                href={`/categories/${course.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}
                className="text-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                {course.category}
              </Link>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl leading-tight">
              {course.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm pt-4">
              <Badge variant="secondary" className="text-sm py-1.5 px-4 rounded-full">
                {course.level}
              </Badge>
              <div className="flex items-center gap-1.5 text-amber-500 font-medium">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-base">{course.rating}</span>
                <span className="text-muted-foreground font-normal ml-1">({course.reviewsCount} avis)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-5 w-5" />
                <span>Créé par <span className="text-foreground font-medium underline decoration-dotted underline-offset-4">{course.instructor.name}</span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>Mis à jour : {course.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Carte d'inscription flottante (Desktop) */}
          <div className="hidden lg:block w-[400px] shrink-0 relative">
            <div className="sticky top-24">
              <div className="rounded-2xl border bg-card shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
                <div className="aspect-video relative w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-colors cursor-pointer">
                    <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform drop-shadow-lg" />
                  </div>
                </div>
                <div className="p-8 space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary">Gratuit</span>
                    <Badge variant="outline" className="text-xs uppercase tracking-wider font-bold py-1 px-2">Accès libre</Badge>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/register"
                      className={cn(buttonVariants({ size: "lg" }), "w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:-translate-y-0.5")}
                    >
                      S'inscrire gratuitement
                    </Link>
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
      </div>

      <div className="container max-w-6xl mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-16">
          {/* Carte d'inscription (Mobile only) */}
          <div className="lg:hidden space-y-6 rounded-2xl border p-6 bg-card shadow-lg">
            <div className="aspect-video relative w-full rounded-xl overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">Gratuit</span>
              <Badge variant="outline">Accès libre</Badge>
            </div>
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }), "w-full h-12 text-base font-bold")}
            >
              S'inscrire gratuitement
            </Link>
          </div>

          {/* Méthodologie */}
          <div className="rounded-2xl border bg-card/50 p-8 md:p-10 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Notre méthodologie</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Une approche pédagogique éprouvée pour maximiser votre apprentissage.
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-2">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">1. Comprendre</h3>
                <p className="text-muted-foreground">Des vidéos courtes pour saisir les concepts clés.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 mb-2">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">2. Approfondir</h3>
                <p className="text-muted-foreground">Des cours écrits pour aller plus loin dans la technique.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-2">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg">3. Valider</h3>
                <p className="text-muted-foreground">Des quiz pour tester vos connaissances à chaque étape.</p>
              </div>
            </div>
          </div>

          {/* Objectifs */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Ce que vous allez apprendre</h2>
            <div className="rounded-2xl border bg-card p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {course.objectives.map((objective, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-base leading-relaxed">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Programme */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Programme de la formation</h2>
            <div className="space-y-4">
              {course.curriculum.map((section, index) => (
                <Card key={index} className="overflow-hidden border-muted shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-muted/30 py-5 px-8">
                    <CardTitle className="text-lg font-semibold flex justify-between items-center">
                      {section.title}
                      <span className="text-sm font-normal text-muted-foreground bg-background px-3 py-1 rounded-full border">
                        {section.lessons.length} étapes
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="divide-y divide-border/50">
                      {section.lessons.map((lesson, lIndex) => (
                        <li key={lIndex} className="flex items-center justify-between py-4 px-8 hover:bg-muted/20 transition-colors group cursor-default">
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-md bg-muted group-hover:bg-background transition-colors text-muted-foreground group-hover:text-primary">
                              {getIconForType(lesson.type)}
                            </div>
                            <span className="text-base font-medium">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                              {lesson.duration}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Instructeur */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Votre formateur</h2>
            <div className="rounded-2xl border bg-card p-8 flex flex-col sm:flex-row gap-8 items-start">
              <div className="relative w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-muted shadow-sm">
                <Image
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{course.instructor.name}</h3>
                  <p className="text-primary font-medium text-lg">{course.instructor.role}</p>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
