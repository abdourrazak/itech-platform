"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

// Je simule un DataTable ici, normalement on utiliserait TanStack Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function TeacherCoursesPage() {
  const courses = [
    {
      id: "1",
      title: "Maîtriser Next.js 15",
      price: 49,
      status: "Publié",
      sales: 120,
      createdAt: "20/11/2025"
    },
    {
      id: "2",
      title: "DevOps Avancé",
      price: 89,
      status: "Brouillon",
      sales: 0,
      createdAt: "22/11/2025"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mes formations</h1>
        <Link href="/teacher/create">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouveau cours
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Ventes</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.price}€</TableCell>
                <TableCell>
                  <Badge variant={course.status === "Publié" ? "default" : "secondary"}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>{course.sales}</TableCell>
                <TableCell>{course.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Éditer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
