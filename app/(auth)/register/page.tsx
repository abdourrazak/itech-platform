import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Github, Mail } from "lucide-react"

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Créer un compte</CardTitle>
                    <CardDescription className="text-center">
                        Entrez vos informations pour commencer votre apprentissage
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">Prénom</Label>
                            <Input id="first-name" placeholder="Jean" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Nom</Label>
                            <Input id="last-name" placeholder="Dupont" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full" type="submit">
                        S'inscrire
                    </Button>
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
                        <Button variant="outline">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline">
                            <Mail className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
                    <div>
                        Déjà un compte ?{" "}
                        <Link href="/login" className="underline hover:text-primary">
                            Se connecter
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
