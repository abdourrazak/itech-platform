"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (email: string, name?: string) => void
    logout: () => void
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Vérifier le localStorage au chargement
        const storedUser = localStorage.getItem("itech_user")
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error("Failed to parse user from local storage")
                localStorage.removeItem("itech_user")
            }
        }
        setIsLoading(false)
    }, [])

    const login = (email: string, name: string = "Utilisateur") => {
        const newUser = { name, email }
        setUser(newUser)
        localStorage.setItem("itech_user", JSON.stringify(newUser))
        router.push("/dashboard")
        router.refresh()
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("itech_user")
        router.push("/")
        router.refresh()
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
