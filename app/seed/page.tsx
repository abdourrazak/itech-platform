"use client"

import { seedDatabase } from "@/actions/seed"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SeedPage() {
    const [status, setStatus] = useState("Ready")

    if (process.env.NODE_ENV !== "development") {
        return <div>Not allowed</div>
    }

    const handleSeed = async () => {
        setStatus("Seeding...")
        const result = await seedDatabase()
        if (result.success) {
            setStatus("Success!")
        } else {
            setStatus("Error: " + result.error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Database Seeder</h1>
            <p className="text-muted-foreground">Click to populate database from mock data</p>
            <Button onClick={handleSeed} disabled={status === "Seeding..."}>
                {status === "Seeding..." ? "Seeding..." : "Run Seed"}
            </Button>
            <p className="font-mono">{status}</p>
        </div>
    )
}
