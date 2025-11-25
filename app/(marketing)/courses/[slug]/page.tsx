"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, PlayCircle, Star, User, Clock, BookOpen, Share2 } from "lucide-react"
import { use } from "react"

interface CoursePageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CoursePage({ params }: CoursePageProps) {
  // Unwrap params
  const { slug } = use(params)

  // Données factices (simulant un fetch basé sur le slug)
  const course = {
    title: "Maîtriser Next.js 15 & React 19",
    description: "Le guide complet pour créer des applications web modernes avec les dernières technologies. Apprenez l'App Router, les Server Components, Server Actions et plus encore.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3270&auto=format&fit=crop",
    level: "Intermédiaire",
    category: "Développement Web",
    price: 49,
    rating: 4.8,
    reviewsCount: 128,
    lastUpdated: "Novembre 2025",
    language: "Français",
    instructor: {
      name: "Jean Dupont",
      role: "Senior Fullstack Dev",
      image: "https://github.com/shadcn.png", // Placeholder
      bio: "Développeur depuis 10 ans, passionné par l'écosystème React et l'enseignement."
    },
    objectives: [
      "Comprendre l'architecture App Router de Next.js 15",
      "Maîtriser les Server Components et Client Components",
      "Gérer les données avec Prisma et Server Actions",
      "Sécuriser son application avec NextAuth / Better Auth",
      "Déployer sur Vercel avec une base de données Neon"
    ],
    curriculum: [
      {
        title: "Introduction & Fondamentaux",
        lessons: [
          { title: "Bienvenue dans le cours", duration: "05:00", free: true },
          { title: "Configuration de l'environnement", duration: "15:00", free: true },
          { title: "Structure d'un projet Next.js 15", duration: "20:00", free: false }
        ]
      },
      {
        title: "App Router en profondeur",
        lessons: [
          { title: "Layouts et Templates", duration: "25:00", free: false },
          { title: "Navigation et Link", duration: "15:00", free: false },
          { title: "Loading et Error UI", duration: "18:00", free: false }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Header du Cours */}
      <div className="bg-muted/30 border-b">
        <div className="container py-10 md:py-16 flex flex-col lg:flex-row gap-12 items-center lg:items-start">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Link href="/courses" className="hover:text-primary transition-colors">Formations</Link>
              <span>/</span>
              <span className="text-foreground">{course.category}</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              {course.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Badge variant="secondary" className="text-sm py-1 px-3">
                {course.level}
              </Badge>
              <div className="flex items-center gap-1 text-amber-500 font-medium">
                <Star className="h-4 w-4 fill-current" />
                <span>{course.rating}</span>
                <span className="text-muted-foreground font-normal ml-1">({course.reviewsCount} avis)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Créé par <span className="text-foreground font-medium underline decoration-dotted underline-offset-4">{course.instructor.name}</span></span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Dernière mise à jour : {course.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Carte d'achat flottante (Desktop) */}
          <div className="hidden lg:block w-[380px] shrink-0 relative">
            <div className="sticky top-24">
               <div className="rounded-xl border bg-card shadow-xl overflow-hidden">
                 <div className="aspect-video relative w-full">
                    <Image 
                      src={course.image} 
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group hover:bg-black/30 transition-colors cursor-pointer">
                      <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                    </div>
                 </div>
                 <div className="p-6 space-y-6">
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold">{course.price === 0 ? "Gratuit" : `${course.price}€`}</span>
                      {course.price > 0 && <span className="text-muted-foreground line-through mb-1 text-lg">{course.price + 50}€</span>}
                    </div>
                    
                    <div className="space-y-3">
                      <Link href="/login">
                        <Button className="w-full h-12 text-base font-semibold shadow-md">
                          Ajouter au panier
                        </Button>
                      </Link>
                      <Link href="/login">
                         <Button variant="outline" className="w-full">
                           Acheter maintenant
                         </Button>
                      </Link>
                    </div>

                    <div className="space-y-2 pt-2 text-sm text-muted-foreground">
                       <p className="font-medium text-foreground mb-2">Ce cours inclut :</p>
                       <div className="flex items-center gap-2">
                         <PlayCircle className="w-4 h-4" />
                         <span>12 heures de vidéo</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <BookOpen className="w-4 h-4" />
                         <span>42 leçons</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <Share2 className="w-4 h-4" />
                         <span>Accès illimité</span>
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-12">
           {/* Carte d'achat (Mobile only) */}
           <div className="lg:hidden space-y-6 rounded-xl border p-6 bg-card">
              <div className="aspect-video relative w-full rounded-lg overflow-hidden">
                    <Image 
                      src={course.image} 
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">{course.price === 0 ? "Gratuit" : `${course.price}€`}</span>
              </div>
              <Link href="/login">
                  <Button className="w-full h-12 text-base">S'inscrire maintenant</Button>
              </Link>
           </div>

           {/* Objectifs */}
           <div className="rounded-xl border bg-card p-6 md:p-8">
             <h2 className="text-2xl font-bold mb-6">Ce que vous allez apprendre</h2>
             <div className="grid sm:grid-cols-2 gap-4">
               {course.objectives.map((objective, i) => (
                 <div key={i} className="flex gap-3 items-start">
                   <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                   <span className="text-sm leading-relaxed">{objective}</span>
                 </div>
               ))}
             </div>
           </div>

           {/* Programme */}
           <div className="space-y-6">
             <h2 className="text-2xl font-bold">Contenu du cours</h2>
             <div className="space-y-4">
                {course.curriculum.map((section, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-muted/40 py-4 px-6">
                      <CardTitle className="text-lg font-medium flex justify-between items-center">
                        {section.title}
                        <span className="text-sm font-normal text-muted-foreground">{section.lessons.length} leçons</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {section.lessons.map((lesson, lIndex) => (
                          <li key={lIndex} className="flex items-center justify-between py-3 px-6 hover:bg-muted/20 transition-colors">
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              {lesson.free && <Badge variant="outline" className="text-[10px] h-5">Aperçu gratuit</Badge>}
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
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
           <div className="space-y-6">
             <h2 className="text-2xl font-bold">Votre formateur</h2>
             <div className="rounded-xl border bg-card p-6 flex flex-col sm:flex-row gap-6">
                <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-muted">
                  <Image 
                    src={course.instructor.image} 
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{course.instructor.name}</h3>
                  <p className="text-primary font-medium text-sm">{course.instructor.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
