import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, BarChart, BookOpen, ArrowRight, ChevronLeft, PlayCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data for paths (in a real app, this would come from a DB or CMS)
const pathsData: Record<string, any> = {
    "fullstack-nextjs": {
        title: "Fullstack Next.js",
        description: "Devenez un expert du développement web moderne avec la stack la plus populaire du moment. Du frontend au backend, maîtrisez chaque brique.",
        longDescription: "Ce parcours intensif vous guidera à travers l'écosystème React et Next.js. Vous apprendrez à construire des applications performantes, référencées et scalables. Nous aborderons le rendu serveur (SSR), les Server Components, l'interaction avec une base de données PostgreSQL via Prisma, et le déploiement sur Vercel.",
        level: "Intermédiaire",
        duration: "40 heures",
        modules: 12,
        tools: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
        outcomes: [
            "Créer des applications fullstack avec Next.js App Router",
            "Gérer l'authentification et la sécurité",
            "Modéliser et interagir avec une base de données SQL",
            "Maîtriser TypeScript pour un code robuste",
            "Déployer et scaler sur le cloud"
        ],
        syllabus: [
            {
                title: "Les bases de React & TypeScript",
                description: "Remise à niveau sur les hooks, les composants et le typage strict.",
                duration: "5h"
            },
            {
                title: "Next.js App Router : Les fondations",
                description: "Routing, Layouts, Server vs Client Components, Data Fetching.",
                duration: "8h"
            },
            {
                title: "Styling avancé avec Tailwind CSS",
                description: "Design systems, dark mode, animations et responsive design.",
                duration: "4h"
            },
            {
                title: "Base de données & ORM",
                description: "PostgreSQL, Prisma Schema, Migrations et requêtes complexes.",
                duration: "6h"
            },
            {
                title: "Authentification & Sécurité",
                description: "NextAuth.js (Auth.js), Middleware, Protection des routes.",
                duration: "5h"
            },
            {
                title: "Projet Final : Clone de SaaS",
                description: "Mise en pratique de toutes les connaissances sur un projet complet.",
                duration: "12h"
            }
        ]
    },
    "devops-modern": {
        title: "DevOps Modern",
        description: "Maîtrisez l'art du déploiement continu et de l'infrastructure as code.",
        longDescription: "Un parcours complet pour comprendre comment automatiser le cycle de vie du développement logiciel. De la conteneurisation avec Docker à l'orchestration avec Kubernetes, en passant par les pipelines CI/CD.",
        level: "Avancé",
        duration: "35 heures",
        modules: 10,
        tools: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "AWS"],
        outcomes: [
            "Conteneuriser des applications avec Docker",
            "Mettre en place des pipelines CI/CD robustes",
            "Gérer l'infrastructure avec Terraform",
            "Orchestrer des conteneurs avec Kubernetes",
            "Monitorer et sécuriser des environnements cloud"
        ],
        syllabus: [
            { title: "Fondamentaux de Linux & Scripting", description: "Bases essentielles pour tout ingénieur DevOps.", duration: "4h" },
            { title: "Docker & Conteneurisation", description: "Images, Conteneurs, Docker Compose.", duration: "6h" },
            { title: "CI/CD avec GitHub Actions", description: "Pipelines, Tests, Build et Déploiement auto.", duration: "5h" },
            { title: "Infrastructure as Code (Terraform)", description: "Provisionner des ressources AWS par le code.", duration: "8h" },
            { title: "Kubernetes pour les débutants", description: "Pods, Services, Deployments.", duration: "12h" }
        ]
    }
}

export default async function PathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const path = pathsData[slug]

    if (!path) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative border-b bg-muted/20">
                <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
                    <div className="mb-8">
                        <Link href="/paths" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                            <ChevronLeft className="mr-1 h-4 w-4" />
                            Retour aux parcours
                        </Link>
                    </div>
                    <div className="grid gap-12 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <Badge variant="outline" className="mb-2">{path.level}</Badge>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{path.title}</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {path.description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button size="lg" className="h-12 px-8 text-base">
                                    Commencer le parcours <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                                    Voir le programme
                                </Button>
                            </div>
                        </div>
                        {/* Hero Stats / Visual (Optional) */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="p-8 rounded-2xl bg-muted/50 border border-border/50 backdrop-blur-sm">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center p-4">
                                        <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <div className="font-bold text-2xl">{path.duration}</div>
                                        <div className="text-sm text-muted-foreground">Durée</div>
                                    </div>
                                    <div className="text-center p-4">
                                        <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                                        <div className="font-bold text-2xl">{path.modules}</div>
                                        <div className="text-sm text-muted-foreground">Modules</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 py-16">
                <div className="grid gap-12 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* About */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">À propos de ce parcours</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {path.longDescription}
                            </p>
                        </section>

                        {/* What you'll learn */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Ce que vous allez apprendre</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {path.outcomes.map((outcome: string, i: number) => (
                                    <div key={i} className="flex items-start">
                                        <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-0.5 shrink-0" />
                                        <span className="text-muted-foreground">{outcome}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Programme détaillé</h2>
                            <div className="space-y-4">
                                {path.syllabus.map((item: any, i: number) => (
                                    <Card key={i} className="group hover:border-primary/50 transition-colors cursor-pointer">
                                        <CardHeader className="flex flex-row items-center gap-4 py-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <span className="font-bold text-sm">{i + 1}</span>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <CardTitle className="text-base">{item.title}</CardTitle>
                                                <CardDescription>{item.description}</CardDescription>
                                            </div>
                                            <div className="text-sm text-muted-foreground font-medium hidden sm:block">
                                                {item.duration}
                                            </div>
                                            <PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Informations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground flex items-center"><BarChart className="h-4 w-4 mr-2" /> Niveau</span>
                                    <span className="font-medium">{path.level}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground flex items-center"><Clock className="h-4 w-4 mr-2" /> Durée totale</span>
                                    <span className="font-medium">{path.duration}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground flex items-center"><BookOpen className="h-4 w-4 mr-2" /> Modules</span>
                                    <span className="font-medium">{path.modules}</span>
                                </div>

                                <div className="pt-4 border-t">
                                    <h4 className="font-medium mb-3">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {path.tools.map((tool: string) => (
                                            <Badge key={tool} variant="secondary">{tool}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full mt-4" size="lg">
                                    S'inscrire au parcours
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
