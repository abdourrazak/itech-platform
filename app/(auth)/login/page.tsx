"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Github, Mail } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000))

        login(email)
        setIsLoading(false)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Connexion</CardTitle>
                    <CardDescription className="text-center">
                        Entrez votre email pour vous connecter à votre compte
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                            {isLoading ? "Connexion..." : "Se connecter"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Ou continuer avec
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" type="button">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" type="button">
                            <Mail className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                    <div>
                        Pas encore de compte ?{" "}
                        <Link href="/register" className="underline hover:text-primary">
                            S'inscrire
                        </Link>
                    </div>
                    <Link href="/forgot-password" className="underline hover:text-primary">
                        Mot de passe oublié ?
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
