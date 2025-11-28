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
import Link from "next/link"

import { courses as allCourses } from "@/lib/mock-data"

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
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Catalogue des formations</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Découvrez nos cours et progressez à votre rythme. Des formations de qualité pour tous les niveaux.
        </p>
      </div>

      {/* Liens rapides vers les catégories */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.filter(c => c !== "Tous").map((cat) => (
          <Link
            key={cat}
            href={`/categories/${cat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}`}
          >
            <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors px-4 py-2 text-sm font-medium rounded-full">
              {cat}
            </Badge>
          </Link>
        ))}
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
