"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, CreditCard, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="p-6">
       <div className="mb-8">
         <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
         <p className="text-muted-foreground">Suivez vos revenus et vos étudiants.</p>
       </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234.00 €</div>
              <p className="text-xs text-muted-foreground">+20.1% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23</div>
              <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Étudiants Actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+201 depuis la semaine dernière</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground">+2% par rapport au mois dernier</p>
            </CardContent>
          </Card>
       </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
         <Card className="col-span-4">
           <CardHeader>
             <CardTitle>Aperçu des revenus (6 derniers mois)</CardTitle>
           </CardHeader>
           <CardContent className="pl-2">
             {/* Placeholder pour un graphique Recharts */}
             <div className="h-[200px] flex items-end justify-between px-4 gap-2">
               {[35, 50, 45, 80, 65, 90].map((height, i) => (
                 <div key={i} className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-md relative group" style={{ height: `${height}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height * 100}€
                    </div>
                 </div>
               ))}
             </div>
             <div className="flex justify-between px-4 mt-2 text-xs text-muted-foreground">
               <span>Juin</span><span>Juil</span><span>Août</span><span>Sept</span><span>Oct</span><span>Nov</span>
             </div>
           </CardContent>
         </Card>

         <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Dernières ventes</CardTitle>
              <CardDescription>Vous avez réalisé 3 ventes cette semaine.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-8">
                 <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Jean Dupont</p>
                      <p className="text-sm text-muted-foreground">jean@example.com</p>
                    </div>
                    <div className="ml-auto font-medium">+49.00€</div>
                 </div>
                 <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Marie Martin</p>
                      <p className="text-sm text-muted-foreground">marie@example.com</p>
                    </div>
                    <div className="ml-auto font-medium">+89.00€</div>
                 </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Pierre Durant</p>
                      <p className="text-sm text-muted-foreground">pierre@example.com</p>
                    </div>
                    <div className="ml-auto font-medium">+39.00€</div>
                 </div>
               </div>
            </CardContent>
         </Card>
       </div>
    </div>
  )
}
