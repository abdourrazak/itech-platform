import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar, Tag } from "lucide-react"

export default function BlogPage() {
  const posts = [
    {
      slug: "nouveautes-nextjs-15",
      title: "Les nouveautés de Next.js 15",
      excerpt: "Découvrez les server actions, le nouveau caching et plus encore. Une plongée en profondeur dans les fonctionnalités qui changent la donne.",
      date: "24 Nov 2025",
      category: "Tech",
      readTime: "5 min"
    },
    {
      slug: "pourquoi-typescript",
      title: "Pourquoi apprendre TypeScript en 2025 ?",
      excerpt: "TypeScript est devenu incontournable. Voici pourquoi vous ne pouvez plus l'ignorer pour vos projets professionnels.",
      date: "20 Nov 2025",
      category: "Carrière",
      readTime: "7 min"
    },
    {
      slug: "design-system-react",
      title: "Créer un Design System avec React",
      excerpt: "Guide étape par étape pour construire une bibliothèque de composants réutilisables et cohérents avec Tailwind et Radix UI.",
      date: "15 Nov 2025",
      category: "Design",
      readTime: "10 min"
    },
    {
      slug: "optimisation-performance-web",
      title: "Optimiser les performances Web",
      excerpt: "Core Web Vitals, chargement différé, et optimisation des images. Comment rendre votre site ultra-rapide.",
      date: "10 Nov 2025",
      category: "Performance",
      readTime: "6 min"
    },
    {
      slug: "ia-pour-developpeurs",
      title: "L'IA pour les développeurs",
      excerpt: "Comment intégrer l'intelligence artificielle dans votre workflow quotidien pour coder plus vite et mieux.",
      date: "05 Nov 2025",
      category: "IA",
      readTime: "8 min"
    },
    {
      slug: "docker-pour-debutants",
      title: "Docker pour les débutants",
      excerpt: "Comprendre les conteneurs et commencer à utiliser Docker pour vos environnements de développement.",
      date: "01 Nov 2025",
      category: "DevOps",
      readTime: "12 min"
    }
  ]

  return (
    <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Le Blog Itech</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Actualités, tutoriels et conseils pour les développeurs. Restez à jour sur les dernières technologies.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {posts.map((post, index) => (
          <Card key={index} className="flex flex-col w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transition-all duration-200 hover:border-primary/50 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </div>
                <div className="flex items-center text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
                  <Tag className="mr-1 h-3 w-3" />
                  {post.category}
                </div>
              </div>
              <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {/* Spacer or additional content if needed */}
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild className="w-full" variant="outline">
                <Link href={`/blog/${post.slug}`}>
                  Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
