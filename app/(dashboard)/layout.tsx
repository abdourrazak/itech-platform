import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import Link from "next/link"
import { BookOpen, LayoutDashboard, ListVideo, PlusCircle, Settings, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-6 md:py-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
           <div className="h-full py-6 pr-6 lg:py-8">
             <div className="w-full space-y-6">
                <div className="space-y-1">
                  <h4 className="font-medium text-sm px-2 mb-2 text-muted-foreground">Apprenant</h4>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Tableau de bord
                    </Button>
                  </Link>
                  <Link href="/dashboard/courses">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <BookOpen className="h-4 w-4" />
                      Mes cours
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-1">
                   <h4 className="font-medium text-sm px-2 mb-2 text-muted-foreground">Instructeur</h4>
                   <Link href="/teacher/courses">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <ListVideo className="h-4 w-4" />
                      Mes formations
                    </Button>
                   </Link>
                   <Link href="/teacher/create">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Créer un cours
                    </Button>
                   </Link>
                   <Link href="/teacher/analytics">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Analytics
                    </Button>
                   </Link>
                </div>

                <div className="space-y-1">
                   <h4 className="font-medium text-sm px-2 mb-2 text-muted-foreground">Compte</h4>
                   <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      Paramètres
                    </Button>
                   </Link>
                </div>
             </div>
           </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}
