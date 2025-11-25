import Image from "next/image"
import Link from "next/link"
import { BookOpen, Clock, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CourseCardProps {
  title: string
  description: string
  image: string
  level: string
  category: string
  price: number
  rating: number
  lessonsCount: number
  duration: string
  slug: string
}

export function CourseCard({
  title,
  description,
  image,
  level,
  category,
  price,
  rating,
  lessonsCount,
  duration,
  slug,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${slug}`}>
      <Card className="group h-full overflow-hidden border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur-md shadow-sm border-none">
            {category}
          </Badge>
        </div>
        <CardHeader className="p-5">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="font-medium text-foreground">{rating}</span>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border/50">
              {level}
            </span>
          </div>
          <h3 className="line-clamp-1 text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-2 leading-relaxed">
            {description}
          </p>
        </CardHeader>
        <CardFooter className="p-5 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {lessonsCount} Leçons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {duration}
            </span>
          </div>
          <div className="text-lg font-bold text-primary">
            {price === 0 ? "Gratuit" : `${price}€`}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
