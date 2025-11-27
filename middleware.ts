import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = nextUrl.pathname === "/" ||
    nextUrl.pathname.startsWith("/courses") ||
    nextUrl.pathname.startsWith("/blog") ||
    nextUrl.pathname.startsWith("/paths") ||
    nextUrl.pathname.startsWith("/categories")
  const isAuthRoute = nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register")

  // Ne jamais bloquer les routes API auth
  if (isApiAuthRoute) {
    return undefined
  }

  // Si l'utilisateur est connecté et essaie d'accéder à login/register
  // Le rediriger vers le dashboard
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", nextUrl))
    }
    // Sinon, laisser accéder aux pages login/register
    return undefined
  }

  // Si l'utilisateur n'est PAS connecté et essaie d'accéder à une route protégée
  // Le rediriger vers login
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  return undefined
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
