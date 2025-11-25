import { CheckCircle2, Code2, GraduationCap, Users } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "Projets Concrets",
    description: "Apprenez en construisant de vraies applications, pas juste en regardant des vidéos.",
  },
  {
    icon: GraduationCap,
    title: "Mentors Experts",
    description: "Soyez guidé par des développeurs seniors travaillant dans les meilleures entreprises.",
  },
  {
    icon: Users,
    title: "Communauté Active",
    description: "Rejoignez une communauté de passionnés pour échanger et progresser ensemble.",
  },
  {
    icon: CheckCircle2,
    title: "Certifications Reconnues",
    description: "Validez vos compétences avec des certificats que vous pouvez partager sur LinkedIn.",
  },
]

export function Features() {
  return (
    <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Pourquoi choisir Itech ?
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Une approche pédagogique unique basée sur la pratique et l'accompagnement.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="relative overflow-hidden rounded-lg border bg-background p-2 text-left transition-all hover:shadow-md"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <feature.icon className="h-12 w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
