import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, ArrowRight, Code2, Database, Cloud, Shield, Smartphone, Brain, Layout, Server } from "lucide-react"
import Link from "next/link"

export default function PathsPage() {
  const paths = [
    {
      title: "Fullstack Next.js",
      description: "Maîtrisez l'écosystème React complet pour créer des applications web modernes et performantes.",
      icon: Code2,
      steps: ["React & TypeScript", "Next.js App Router", "Prisma & PostgreSQL", "TailwindCSS"],
      status: "active",
      slug: "fullstack-nextjs"
    },
    {
      title: "DevOps Modern",
      description: "Automatisez les déploiements et gérez des infrastructures cloud à grande échelle.",
      icon: Cloud,
      steps: ["Docker & Kubernetes", "CI/CD (GitHub Actions)", "AWS / Azure", "Terraform"],
      status: "active",
      slug: "devops-modern"
    },
    {
      title: "Data Scientist",
      description: "Analysez des données complexes et créez des modèles prédictifs avancés.",
      icon: Database,
      steps: ["Python & Pandas", "Machine Learning", "Deep Learning", "Visualisation de données"],
      status: "active",
      slug: "data-scientist"
    },
    {
      title: "Développeur Mobile",
      description: "Créez des applications natives performantes pour iOS et Android.",
      icon: Smartphone,
      steps: ["React Native", "Expo", "Gestion d'état", "Déploiement Stores"],
      status: "active",
      slug: "mobile-dev"
    },
    {
      title: "Cybersécurité",
      description: "Apprenez à sécuriser les systèmes et à réaliser des tests d'intrusion.",
      icon: Shield,
      steps: ["Réseaux & Protocoles", "Pentesting", "SecDevOps", "Cryptographie"],
      status: "active",
      slug: "cybersecurity"
    },
    {
      title: "Intelligence Artificielle",
      description: "Comprenez et intégrez les LLMs et l'IA générative dans vos projets.",
      icon: Brain,
      steps: ["Prompt Engineering", "LangChain", "OpenAI API", "Vector Databases"],
      status: "active",
      slug: "ai-engineering"
    },
    {
      title: "Backend Master",
      description: "Concevez des architectures robustes, scalables et sécurisées.",
      icon: Server,
      steps: ["Node.js & NestJS", "Microservices", "Redis & Caching", "System Design"],
      status: "active",
      slug: "backend-master"
    },
    {
      title: "UI/UX Design",
      description: "Créez des interfaces utilisateur intuitives et esthétiques.",
      icon: Layout,
      steps: ["Figma avancé", "Design Systems", "Prototypage", "User Research"],
      status: "coming_soon",
      slug: "ui-ux-design"
    }
  ]

  return (
    <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Parcours d'apprentissage</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Des cursus structurés étape par étape pour vous guider de débutant à expert sur les technologies les plus demandées.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {paths.map((path, index) => (
          <Card key={index} className={`flex flex-col w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] transition-all duration-200 hover:border-primary/50 hover:shadow-lg ${path.status === "coming_soon" ? "opacity-75 border-dashed" : ""}`}>
            <CardHeader className="items-center text-center pb-2">
              <div className={`p-3 rounded-full bg-primary/10 mb-4 ${path.status === "coming_soon" ? "text-muted-foreground bg-muted" : "text-primary"}`}>
                <path.icon className="h-8 w-8" />
              </div>
              <CardTitle className="text-xl">{path.title}</CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px]">{path.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {path.status === "active" && (
                <ul className="space-y-2 text-sm text-muted-foreground mt-4">
                  {path.steps.map((step, i) => (
                    <li key={i} className="flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {step}
                    </li>
                  ))}
                </ul>
              )}
              {path.status === "coming_soon" && (
                <div className="flex items-center justify-center h-full min-h-[100px]">
                  <span className="text-sm font-medium bg-muted px-3 py-1 rounded-full text-muted-foreground">
                    Bientôt disponible
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              {path.status === "active" ? (
                <Button asChild className="w-full">
                  <Link href={`/paths/${path.slug}`}>
                    Voir le parcours <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  Bientôt disponible
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
