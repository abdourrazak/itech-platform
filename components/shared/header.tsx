"use client"

import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { UserNav } from "@/components/shared/user-nav"
import { useSession } from "next-auth/react"

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Activity className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Itech
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/courses"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Catalogue
            </Link>
            <Link
              href="/paths"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Parcours
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search placeholder */}
          </div>
          <nav className="flex items-center gap-2">
            {/* Boutons Connexion et Inscription - toujours visibles */}
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Se connecter
            </Link>
            <Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
              S'inscrire
            </Link>

            {/* Profil utilisateur - visible si connecté */}
            {status === "loading" ? (
              <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            ) : session?.user ? (
              <UserNav user={session.user} />
            ) : null}

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
