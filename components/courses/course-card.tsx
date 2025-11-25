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
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute right-2 top-2 bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90">
            {category}
          </Badge>
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {rating}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted">
              {level}
            </span>
          </div>
          <h3 className="line-clamp-1 text-lg font-bold">{title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground mt-2">
            {description}
          </p>
        </CardHeader>
        <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {lessonsCount} Leçons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
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
