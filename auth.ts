import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    Credentials({
        async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials)
  
          if (validatedFields.success) {
            const { email, password } = validatedFields.data
            
            const user = await db.user.findUnique({
                where: { email }
            });

            if (!user || !user.password) return null;

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) return user;
          }
          return null
        }
      })
  ],
  callbacks: {
      async session({ token, session }) {
        if (token.sub && session.user) {
            session.user.id = token.sub;
        }
        
        // On ajoute le rôle à la session
        if (token.role && session.user) {
            // @ts-ignore
            session.user.role = token.role; 
        }

        return session;
      },
      async jwt({ token }) {
          if (!token.sub) return token;

          const existingUser = await db.user.findUnique({
              where: { id: token.sub }
          });

          if (!existingUser) return token;

          token.role = existingUser.role;

          return token;
      }
  }
})
