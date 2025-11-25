"use client"

import { CourseCard } from "@/components/courses/course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

// Données factices pour les cours achetés
const myCourses = [
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
    slug: "nextjs-15-react-19",
    progress: 35 // Pourcentage de progression
  }
]

export default function StudentCoursesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="text-2xl font-bold tracking-tight">Mes cours</h1>
        <div className="relative w-full sm:w-auto">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input
             type="search"
             placeholder="Filtrer mes cours..."
             className="w-full pl-9 sm:w-[300px]"
           />
        </div>
      </div>

      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myCourses.map((course) => (
            <div key={course.id} className="group relative">
               <CourseCard {...course} />
               <div className="mt-2">
                 <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                   <span>Progression</span>
                   <span>{course.progress}%</span>
                 </div>
                 <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                   <div 
                     className="h-full bg-primary transition-all" 
                     style={{ width: `${course.progress}%` }}
                   />
                 </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Aucun cours trouvé</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground max-w-sm">
            Vous n'êtes inscrit à aucun cours pour le moment. Parcourez le catalogue pour commencer votre apprentissage.
          </p>
          <Link href="/courses">
            <Button>Découvrir les cours</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
