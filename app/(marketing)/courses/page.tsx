"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/courses/course-card"
import { Search, SlidersHorizontal } from "lucide-react"

// Données factices pour la démo
const courses = [
  {
    id: 1,
    title: "Maîtriser Next.js 15 & React 19",
    description: "Le guide complet pour créer des applications web modernes avec les dernières technologies.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3270&auto=format&fit=crop",
    level: "Intermédiaire",
    category: "Développement Web",
    price: 49,
    rating: 4.8,
    lessonsCount: 42,
    duration: "12h",
    slug: "nextjs-15-react-19"
  },
  {
    id: 2,
    title: "DevOps : De zéro à héros",
    description: "Apprenez Docker, Kubernetes, CI/CD et l'infrastructure as code.",
    image: "https://images.unsplash.com/photo-1667372393119-c8f473886484?q=80&w=3270&auto=format&fit=crop",
    level: "Avancé",
    category: "DevOps",
    price: 89,
    rating: 4.9,
    lessonsCount: 65,
    duration: "20h",
    slug: "devops-zero-hero"
  },
  {
    id: 3,
    title: "Introduction à l'IA et au Machine Learning",
    description: "Comprendre les bases de l'intelligence artificielle et créer ses premiers modèles.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=3132&auto=format&fit=crop",
    level: "Débutant",
    category: "Intelligence Artificielle",
    price: 0,
    rating: 4.7,
    lessonsCount: 24,
    duration: "8h",
    slug: "intro-ia-ml"
  },
  {
    id: 4,
    title: "Framer Motion & Animations Avancées",
    description: "Donnez vie à vos interfaces React avec des animations fluides et complexes.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3270&auto=format&fit=crop",
    level: "Intermédiaire",
    category: "Design & UX",
    price: 39,
    rating: 4.9,
    lessonsCount: 18,
    duration: "6h",
    slug: "framer-motion-animations"
  }
]

export default function CoursesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Catalogue des formations</h1>
          <p className="text-muted-foreground">
            Découvrez nos cours et progressez à votre rythme.
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un cours..."
              className="pl-9 w-full"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  )
}
