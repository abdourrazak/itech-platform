import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data for blog posts
const blogPosts: Record<string, any> = {
    "nouveautes-nextjs-15": {
        title: "Les nouveautés de Next.js 15",
        excerpt: "Découvrez les server actions, le nouveau caching et plus encore.",
        content: `
      <p className="mb-4">Next.js 15 apporte des changements majeurs à l'écosystème React. Avec une stabilité accrue pour l'App Router et des améliorations de performance significatives, c'est le moment idéal pour mettre à jour vos applications.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Server Actions stables</h2>
      <p className="mb-4">Les Server Actions sont désormais stables et prêts pour la production. Ils permettent d'exécuter du code serveur directement depuis vos composants, simplifiant grandement la gestion des formulaires et des mutations de données.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Caching amélioré</h2>
      <p className="mb-4">Le système de cache a été revu pour être plus intuitif. Par défaut, le fetch est désormais plus prévisible, et les options de revalidation sont plus granulaires.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Support partiel du Prerendering (PPR)</h2>
      <p className="mb-4">Le Partial Prerendering est une fonctionnalité expérimentale qui promet de combiner le meilleur du statique et du dynamique. Une partie de la page est pré-rendue, tandis que les composants dynamiques sont streamés.</p>
    `,
        date: "24 Nov 2025",
        category: "Tech",
        author: "Alex Dev",
        readTime: "5 min",
        tags: ["Next.js", "React", "Web"]
    },
    "pourquoi-typescript": {
        title: "Pourquoi apprendre TypeScript en 2025 ?",
        excerpt: "TypeScript est devenu incontournable. Voici pourquoi vous ne pouvez plus l'ignorer.",
        content: `
      <p className="mb-4">JavaScript est le langage du web, mais TypeScript est le langage des applications web robustes. En 2025, ne pas connaître TypeScript est un véritable handicap sur le marché du travail.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Sécurité du typage</h2>
      <p className="mb-4">Le principal avantage est évidemment le typage statique. Il permet d'attraper les erreurs à la compilation plutôt qu'à l'exécution, sauvant des heures de débogage.</p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Meilleure expérience développeur</h2>
      <p className="mb-4">L'autocomplétion et l'intelliSense offerts par TypeScript dans VS Code sont incomparables. Vous savez exactement quelles propriétés sont disponibles sur vos objets.</p>
    `,
        date: "20 Nov 2025",
        category: "Carrière",
        author: "Sarah Lead",
        readTime: "7 min",
        tags: ["TypeScript", "JavaScript", "Carrière"]
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = blogPosts[slug]

    if (!post) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Hero */}
            <div className="relative border-b bg-muted/20">
                <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
                    <div className="mb-8">
                        <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Retour au blog
                        </Link>
                    </div>

                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Badge variant="secondary" className="text-primary">{post.category}</Badge>
                            <span className="text-muted-foreground text-sm flex items-center">
                                <Clock className="w-3 h-3 mr-1" /> {post.readTime} de lecture
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-center gap-4 pt-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {post.author}
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {post.date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 py-16">
                <div className="grid gap-12 lg:grid-cols-[1fr_300px] max-w-6xl mx-auto">
                    {/* Main Content */}
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Partager cet article</CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-2">
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                                {/* Add social share buttons here */}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Tags</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {post.tags.map((tag: string) => (
                                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </Badge>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
