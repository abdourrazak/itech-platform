import { courses } from "@/lib/mock-data"
import { CourseCard } from "@/components/courses/course-card"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Helper to normalize strings for comparison (remove accents, lowercase, replace spaces with dashes)
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
}

// Map slugs back to display names if needed, or just use the category from the course
const getCategoryName = (slug: string) => {
    const category = courses.find(c => slugify(c.category) === slug)?.category
    return category
}

interface CategoryPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params
    const categoryName = getCategoryName(slug)

    if (!categoryName) {
        // If we can't find a category name from the courses, maybe it's a valid category but has no courses yet?
        // For this demo, let's 404 if not found in our mock data
        // Or we could try to un-slugify it for display
        return notFound()
    }

    const categoryCourses = courses.filter(course => course.category === categoryName)

    return (
        <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
                <div className="w-full flex justify-start mb-4 lg:mb-0 lg:absolute lg:left-12 lg:top-24">
                    <Link href="/courses">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Retour au catalogue
                        </Button>
                    </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{categoryName}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Découvrez nos meilleures formations en {categoryName}.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>

            {categoryCourses.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground">Aucune formation trouvée pour cette catégorie.</p>
                </div>
            )}
        </div>
    )
}
