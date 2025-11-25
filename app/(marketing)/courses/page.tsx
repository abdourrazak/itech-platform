"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CourseCard } from "@/components/courses/course-card"
import { Search, SlidersHorizontal, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Données factices enrichies pour la démo
const allCourses = [
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
  },
  {
    id: 5,
    title: "TypeScript : Du débutant à l'expert",
    description: "Maîtrisez TypeScript pour écrire du code JavaScript robuste et maintenable.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=3270&auto=format&fit=crop",
    level: "Débutant",
    category: "Développement Web",
    price: 59,
    rating: 4.8,
    lessonsCount: 35,
    duration: "10h",
    slug: "typescript-expert"
  },
  {
    id: 6,
    title: "Python pour la Data Science",
    description: "Analysez des données avec Pandas, NumPy et créez des visualisations percutantes.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=3270&auto=format&fit=crop",
    level: "Intermédiaire",
    category: "Data Science",
    price: 69,
    rating: 4.7,
    lessonsCount: 48,
    duration: "15h",
    slug: "python-data-science"
  },
  {
    id: 7,
    title: "Cybersécurité : Les fondamentaux",
    description: "Apprenez à sécuriser vos applications et à détecter les vulnérabilités.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3270&auto=format&fit=crop",
    level: "Intermédiaire",
    category: "Cybersécurité",
    price: 79,
    rating: 4.9,
    lessonsCount: 52,
    duration: "18h",
    slug: "cybersecurity-fundamentals"
  },
  {
    id: 8,
    title: "React Native : Applications mobiles",
    description: "Créez des applications iOS et Android avec React Native et Expo.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=3270&auto=format&fit=crop",
    level: "Intermédiaire",
    category: "Développement Mobile",
    price: 0,
    rating: 4.6,
    lessonsCount: 38,
    duration: "14h",
    slug: "react-native-mobile"
  }
]

const categories = ["Tous", "Développement Web", "DevOps", "Intelligence Artificielle", "Design & UX", "Data Science", "Cybersécurité", "Développement Mobile"]
const levels = ["Tous", "Débutant", "Intermédiaire", "Avancé"]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedLevel, setSelectedLevel] = useState("Tous")

  // Filtrage des cours
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "Tous" || course.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Tous")
    setSelectedLevel("Tous")
  }

  const hasActiveFilters = searchQuery || selectedCategory !== "Tous" || selectedLevel !== "Tous"

  return (
    <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      {/* Header centré */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Catalogue des formations</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Découvrez nos cours et progressez à votre rythme. Des formations de qualité pour tous les niveaux.
        </p>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="relative w-full md:w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un cours..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Niveau" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Résultats */}
        <div className="text-center text-sm text-muted-foreground">
          {filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} trouvée{filteredCourses.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Grille de cours */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">Aucun cours trouvé avec ces critères.</p>
          <Button variant="outline" onClick={resetFilters}>
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  )
}
