"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle, PlayCircle, Menu, ChevronLeft, ChevronRight } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useState } from "react"
import { cn } from "@/lib/utils"

// Composants manquants que je vais devoir créer ou simuler (ScrollArea, Separator)
// Pour l'instant je vais utiliser des divs standards si ScrollArea n'existe pas encore

export default function CoursePlayerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  // Données factices
  const course = {
    title: "Maîtriser Next.js 15",
    sections: [
      {
        title: "Introduction",
        lessons: [
          { id: 1, title: "Bienvenue", duration: "5:00", completed: true },
          { id: 2, title: "Installation", duration: "10:00", completed: true },
        ]
      },
      {
        title: "Routing",
        lessons: [
          { id: 3, title: "Pages & Layouts", duration: "15:00", completed: false, active: true },
          { id: 4, title: "Navigation", duration: "12:00", completed: false },
          { id: 5, title: "Route Groups", duration: "08:00", completed: false },
        ]
      }
    ]
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Header Mobile (visible seulement sur petit écran) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b bg-background z-50 flex items-center justify-between px-4">
         <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
           <Menu className="h-5 w-5" />
         </Button>
         <span className="font-semibold truncate ml-2">{course.title}</span>
         <ModeToggle />
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-80 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static",
        !sidebarOpen && "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="h-14 flex items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Link>
          </div>
          
          <div className="p-4 border-b bg-muted/30">
            <h2 className="font-semibold">{course.title}</h2>
            <div className="w-full bg-muted h-2 mt-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[30%]"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">30% complété</p>
          </div>

          <div className="flex-1 overflow-y-auto py-2">
             {course.sections.map((section, i) => (
               <div key={i} className="mb-4">
                 <h3 className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                   {section.title}
                 </h3>
                 <div className="space-y-0.5">
                   {section.lessons.map((lesson) => (
                     <button
                       key={lesson.id}
                       className={cn(
                         "w-full flex items-center px-4 py-3 text-sm hover:bg-accent/50 transition-colors text-left",
                         lesson.active && "bg-accent text-accent-foreground border-r-2 border-primary",
                         lesson.completed && "text-muted-foreground"
                       )}
                     >
                       {lesson.completed ? (
                         <CheckCircle className="h-4 w-4 mr-3 text-primary shrink-0" />
                       ) : (
                         <PlayCircle className={cn("h-4 w-4 mr-3 shrink-0", lesson.active ? "text-primary" : "text-muted-foreground")} />
                       )}
                       <div className="flex-1">
                         <p className={cn("line-clamp-1", lesson.completed && "line-through decoration-border")}>{lesson.title}</p>
                         <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                       </div>
                     </button>
                   ))}
                 </div>
               </div>
             ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-14 md:pt-0 relative">
        {/* Top Bar Desktop */}
        <div className="hidden md:flex h-14 items-center justify-between border-b px-6">
           <h1 className="font-medium">Pages & Layouts</h1>
           <div className="flex items-center gap-2">
             <Button variant="outline" size="sm">
               <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
             </Button>
             <Button size="sm">
               Suivant <ChevronRight className="h-4 w-4 ml-2" />
             </Button>
           </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           <div className="max-w-5xl mx-auto space-y-8">
              <div className="aspect-video bg-black rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 pb-12">
                   <div className="w-full">
                     <div className="h-1 bg-white/30 rounded-full w-full mb-4 overflow-hidden">
                        <div className="h-full bg-primary w-1/3 relative">
                           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow"></div>
                        </div>
                     </div>
                     <div className="flex items-center justify-between text-white">
                       <span>04:23 / 15:00</span>
                     </div>
                   </div>
                </div>
                <PlayCircle className="w-20 h-20 text-white/80" />
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h2>À propos de cette leçon</h2>
                <p>Dans cette leçon, nous allons explorer le système de fichiers de l'App Router. Nous verrons comment créer des pages, définir des layouts partagés et imbriqués.</p>
                <h3>Ressources</h3>
                <ul>
                  <li><a href="#" className="text-primary underline">Documentation Next.js</a></li>
                  <li><a href="#" className="text-primary underline">Code source de la leçon</a></li>
                </ul>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
