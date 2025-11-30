export interface Lesson {
    title: string
    duration: string
    type: "video" | "text" | "quiz"
    videoUrl?: string
    content?: string
    questions?: {
        question: string
        options: string[]
        correctAnswer: number
    }[]
}

export interface Section {
    title: string
    lessons: Lesson[]
}

export interface Instructor {
    name: string
    role: string
    image: string
    bio: string
}

export interface Course {
    id: number
    title: string
    description: string
    image: string
    level: "Débutant" | "Intermédiaire" | "Avancé"
    category: string
    price: number
    rating: number
    reviewsCount: number
    lessonsCount: number
    duration: string
    slug: string
    lastUpdated: string
    instructor: Instructor
    objectives: string[]
    curriculum: Section[]
}

const abdRazak: Instructor = {
    name: "Abd Razak",
    role: "Lead Instructor & Fullstack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    bio: "Passionné par l'enseignement et le développement web, j'ai formé plus de 10 000 étudiants à travers le monde. Mon objectif est de rendre la technologie accessible à tous grâce à une pédagogie claire et pratique."
}

export const courses: Course[] = [
    {
        id: 1,
        title: "Maîtriser Next.js 15 & React 19",
        description: "Le guide complet pour créer des applications web modernes avec les dernières technologies du web.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=3270&auto=format&fit=crop",
        level: "Intermédiaire",
        category: "Développement Web",
        price: 0,
        rating: 4.8,
        reviewsCount: 124,
        lessonsCount: 18,
        duration: "12h",
        slug: "nextjs-15-react-19",
        lastUpdated: "Novembre 2024",
        instructor: abdRazak,
        objectives: [
            "Comprendre le App Router de Next.js 15",
            "Maîtriser les Server Components et Server Actions",
            "Gérer l'authentification et les bases de données",
            "Déployer une application fullstack en production"
        ],
        curriculum: [
            {
                title: "Introduction à Next.js 15",
                lessons: [
                    {
                        title: "Pourquoi choisir Next.js en 2024 ?",
                        duration: "12:30",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs"
                    },
                    {
                        title: "Installation et configuration complète",
                        duration: "18:45",
                        type: "text",
                        content: `# Installation de Next.js 15

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** version 18.17 ou supérieure
- **npm** ou **yarn** comme gestionnaire de paquets
- Un éditeur de code (VS Code recommandé)

## Création d'un nouveau projet

Pour créer un nouveau projet Next.js 15, ouvrez votre terminal et exécutez :

\`\`\`bash
npx create-next-app@latest mon-projet-nextjs
\`\`\`

### Options de configuration

Lors de l'installation, vous serez invité à répondre aux questions suivantes :

1. **What is your project named?** \`mon-projet-nextjs\`
2. **Would you like to use TypeScript?** ✅ **Yes** (fortement recommandé)
3. **Would you like to use ESLint?** ✅ **Yes**
4. **Would you like to use Tailwind CSS?** ✅ **Yes**
5. **Would you like to use \`src/\` directory?** ⬜ **No** (optionnel)
6. **Would you like to use App Router?** ✅ **Yes** (nouvelle architecture)
7. **Would you like to customize the default import alias?** ⬜ **No**

## Structure du projet créé

Après l'installation, votre projet aura la structure suivante :

\`\`\`
mon-projet-nextjs/
├── app/
│   ├── layout.tsx       # Layout racine
│   ├── page.tsx         # Page d'accueil
│   └── globals.css      # Styles globaux
├── public/              # Fichiers statiques
├── node_modules/        # Dépendances
├── package.json         # Configuration npm
├── tsconfig.json        # Configuration TypeScript
├── next.config.ts       # Configuration Next.js
└── tailwind.config.ts   # Configuration Tailwind
\`\`\`

## Lancement du serveur de développement

Naviguez dans le dossier de votre projet et démarrez le serveur :

\`\`\`bash
cd mon-projet-nextjs
npm run dev
\`\`\`

Votre application est maintenant accessible sur **http://localhost:3000** 🎉

## Configuration de VS Code

Pour une meilleure expérience de développement, installez les extensions suivantes :

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**

### Configuration recommandée (.vscode/settings.json)

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
\`\`\`

## Commandes utiles

- \`npm run dev\` - Démarre le serveur de développement
- \`npm run build\` - Crée une version de production
- \`npm run start\` - Démarre le serveur de production
- \`npm run lint\` - Vérifie le code avec ESLint

## Prochaines étapes

Maintenant que votre environnement est configuré, nous allons explorer :
- L'architecture App Router
- Le système de routing basé sur les fichiers
- Les Server Components et Client Components
- La gestion des données avec Server Actions`
                    },
                    {
                        title: "Architecture App Router vs Pages Router",
                        duration: "15:20",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/gSSsZReIFRk"
                    },
                    {
                        title: "Structure des dossiers et conventions de nommage",
                        duration: "22:15",
                        type: "text",
                        content: `# Structure des dossiers dans Next.js 15

## Le dossier \`app/\`

Next.js 15 utilise le **App Router**, une nouvelle approche basée sur le dossier \`app/\`. Chaque dossier représente un segment de route.

### Fichiers spéciaux

Next.js utilise des conventions de nommage pour des fichiers spéciaux :

| Fichier | Description | Requis |
|---------|-------------|--------|
| \`layout.tsx\` | UI partagée pour un segment et ses enfants | ✅ Oui (racine) |
| \`page.tsx\` | Interface unique d'une route | ✅ Oui |
| \`loading.tsx\` | UI de chargement pour un segment | ⬜ Non |
| \`error.tsx\` | UI d'erreur pour un segment | ⬜ Non |
| \`not-found.tsx\` | UI pour les erreurs 404 | ⬜ Non |
| \`route.ts\` | Endpoint API | ⬜ Non |

### Exemple de structure

\`\`\`
app/
├── layout.tsx          # Layout racine (obligatoire)
├── page.tsx            # Page d'accueil (/)
├── about/
│   └── page.tsx        # Page À propos (/about)
├── blog/
│   ├── layout.tsx      # Layout pour toutes les pages blog
│   ├── page.tsx        # Liste des articles (/blog)
│   └── [slug]/
│       └── page.tsx    # Article individuel (/blog/mon-article)
└── api/
    └── users/
        └── route.ts    # API endpoint (/api/users)
\`\`\`

## Routes dynamiques

Utilisez les crochets \`[]\` pour créer des routes dynamiques :

\`\`\`typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Article : {params.slug}</h1>
}
\`\`\`

## Route Groups

Organisez vos routes sans affecter l'URL en utilisant des parenthèses \`()\` :

\`\`\`
app/
├── (marketing)/
│   ├── about/
│   │   └── page.tsx    # /about
│   └── contact/
│       └── page.tsx    # /contact
└── (dashboard)/
    ├── settings/
    │   └── page.tsx    # /settings
    └── profile/
        └── page.tsx    # /profile
\`\`\`

## Dossier \`public/\`

Contient les fichiers statiques accessibles depuis la racine :

\`\`\`
public/
├── images/
│   └── logo.png        # Accessible via /images/logo.png
├── favicon.ico
└── robots.txt
\`\`\`

## Bonnes pratiques

1. **Colocation** : Placez les composants, styles et tests à côté des pages qui les utilisent
2. **Nommage** : Utilisez kebab-case pour les dossiers de routes
3. **Organisation** : Groupez les routes par fonctionnalité avec les Route Groups
4. **Séparation** : Gardez la logique métier dans des dossiers séparés (\`lib/\`, \`utils/\`)`
                    },
                    {
                        title: "Quiz : Fondamentaux Next.js",
                        duration: "10:00",
                        type: "quiz",
                        questions: [
                            {
                                question: "Quel est le fichier obligatoire à la racine du dossier app/ ?",
                                options: ["page.tsx", "layout.tsx", "index.tsx", "app.tsx"],
                                correctAnswer: 1
                            },
                            {
                                question: "Comment créer une route dynamique dans Next.js 15 ?",
                                options: ["Utiliser :param dans le nom", "Utiliser [param] dans le nom du dossier", "Utiliser {param} dans le nom", "Utiliser <param> dans le nom"],
                                correctAnswer: 1
                            },
                            {
                                question: "À quoi servent les Route Groups (dossiers entre parenthèses) ?",
                                options: ["Créer des routes privées", "Organiser sans affecter l'URL", "Créer des routes dynamiques", "Définir des middlewares"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quelle version minimale de Node.js est requise pour Next.js 15 ?",
                                options: ["16.x", "18.17", "20.x", "14.x"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quel fichier permet de créer un endpoint API ?",
                                options: ["api.ts", "route.ts", "endpoint.ts", "handler.ts"],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            },
            {
                title: "React 19 & Server Components",
                lessons: [
                    {
                        title: "Introduction aux Server Components",
                        duration: "20:15",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/TQQPAU21ZUw"
                    },
                    {
                        title: "Server Components vs Client Components",
                        duration: "25:30",
                        type: "text",
                        content: `# Server Components vs Client Components

## Qu'est-ce qu'un Server Component ?

Les **Server Components** sont une nouvelle fonctionnalité de React 19 qui permet de rendre des composants côté serveur, réduisant ainsi la taille du bundle JavaScript envoyé au client.

### Avantages des Server Components

✅ **Performance** : Moins de JavaScript côté client
✅ **SEO** : Contenu rendu côté serveur
✅ **Sécurité** : Accès direct aux bases de données et APIs
✅ **Simplicité** : Pas besoin de useEffect pour fetcher les données

## Par défaut : Server Components

Dans Next.js 15, **tous les composants sont des Server Components par défaut** :

\`\`\`tsx
// app/page.tsx - Server Component par défaut
export default async function HomePage() {
  // Vous pouvez faire des appels directs à la base de données
  const posts = await db.post.findMany()
  
  return (
    <div>
      <h1>Articles</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  )
}
\`\`\`

## Client Components

Pour utiliser des hooks React ou des événements, ajoutez la directive \`'use client'\` :

\`\`\`tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Compteur : {count}
    </button>
  )
}
\`\`\`

## Quand utiliser chaque type ?

### Utilisez Server Components pour :
- Fetcher des données
- Accéder aux ressources backend
- Garder des dépendances sensibles côté serveur
- Réduire le JavaScript côté client

### Utilisez Client Components pour :
- Interactivité (onClick, onChange, etc.)
- Hooks React (useState, useEffect, etc.)
- APIs du navigateur (localStorage, etc.)
- Composants de librairies tierces nécessitant le client

## Composition : Le meilleur des deux mondes

Vous pouvez combiner Server et Client Components :

\`\`\`tsx
// app/page.tsx - Server Component
import ClientCounter from './ClientCounter'

export default async function Page() {
  const data = await fetchData() // Côté serveur
  
  return (
    <div>
      <h1>{data.title}</h1>
      <ClientCounter /> {/* Client Component imbriqué */}
    </div>
  )
}
\`\`\`

## Règles importantes

1. ❌ Vous ne pouvez pas importer un Server Component dans un Client Component
2. ✅ Vous pouvez passer un Server Component comme children à un Client Component
3. ❌ Les Client Components ne peuvent pas être async
4. ✅ Les Server Components peuvent être async

## Exemple pratique

\`\`\`tsx
// app/dashboard/page.tsx - Server Component
import { Suspense } from 'react'
import UserStats from './UserStats' // Server Component
import InteractiveChart from './InteractiveChart' // Client Component

export default async function Dashboard() {
  const user = await getUser()
  
  return (
    <div>
      <h1>Tableau de bord de {user.name}</h1>
      
      <Suspense fallback={<div>Chargement des stats...</div>}>
        <UserStats userId={user.id} />
      </Suspense>
      
      <InteractiveChart data={user.chartData} />
    </div>
  )
}
\`\`\``
                    },
                    {
                        title: "Le hook use() de React 19",
                        duration: "16:40",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ytXM05PVcFU"
                    },
                    {
                        title: "Server Actions et mutations de données",
                        duration: "28:20",
                        type: "text",
                        content: `# Server Actions dans Next.js 15

## Qu'est-ce qu'une Server Action ?

Les **Server Actions** permettent d'exécuter du code côté serveur directement depuis vos composants, sans créer d'API routes.

## Création d'une Server Action

Utilisez la directive \`'use server'\` :

\`\`\`tsx
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  await db.post.create({
    data: { title, content }
  })
  
  revalidatePath('/blog')
}
\`\`\`

## Utilisation dans un formulaire

\`\`\`tsx
// app/blog/new/page.tsx
import { createPost } from '@/app/actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Titre" required />
      <textarea name="content" placeholder="Contenu" required />
      <button type="submit">Publier</button>
    </form>
  )
}
\`\`\`

## Avec useFormState pour le feedback

\`\`\`tsx
'use client'

import { useFormState } from 'react-dom'
import { createPost } from '@/app/actions'

export default function NewPostForm() {
  const [state, formAction] = useFormState(createPost, null)
  
  return (
    <form action={formAction}>
      {state?.error && <p className="error">{state.error}</p>}
      <input name="title" />
      <button type="submit">Créer</button>
    </form>
  )
}
\`\`\`

## Avantages

✅ Pas besoin de créer des routes API
✅ Type-safe avec TypeScript
✅ Gestion automatique de la sérialisation
✅ Progressive Enhancement (fonctionne sans JS)

## Bonnes pratiques

1. Validez toujours les données côté serveur
2. Utilisez \`revalidatePath()\` pour mettre à jour le cache
3. Retournez des objets sérialisables
4. Gérez les erreurs proprement`
                    },
                    {
                        title: "Quiz : React 19 & Server Components",
                        duration: "12:00",
                        type: "quiz",
                        questions: [
                            {
                                question: "Par défaut, les composants dans Next.js 15 sont :",
                                options: ["Client Components", "Server Components", "Hybrid Components", "Static Components"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quelle directive permet de créer un Client Component ?",
                                options: ["'use client'", "'client side'", "'use browser'", "'client component'"],
                                correctAnswer: 0
                            },
                            {
                                question: "Les Server Components peuvent-ils être async ?",
                                options: ["Oui", "Non", "Seulement avec un wrapper", "Seulement dans les layouts"],
                                correctAnswer: 0
                            },
                            {
                                question: "Quelle directive permet de créer une Server Action ?",
                                options: ["'use action'", "'use server'", "'server side'", "'use backend'"],
                                correctAnswer: 1
                            },
                            {
                                question: "Peut-on importer un Server Component dans un Client Component ?",
                                options: ["Oui, toujours", "Non, jamais directement", "Seulement avec un HOC", "Seulement dans les pages"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quel hook permet de gérer l'état d'un formulaire avec Server Actions ?",
                                options: ["useFormState", "useState", "useServerState", "useActionState"],
                                correctAnswer: 0
                            }
                        ]
                    }
                ]
            },
            {
                title: "Routing et Navigation",
                lessons: [
                    {
                        title: "Système de routing basé sur les fichiers",
                        duration: "18:30",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/nSJBXwLEQJA"
                    },
                    {
                        title: "Navigation avec Link et useRouter",
                        duration: "14:25",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/ZHn726VDoE4"
                    },
                    {
                        title: "Routes dynamiques et catch-all",
                        duration: "20:10",
                        type: "text",
                        content: `# Routes dynamiques dans Next.js

## Routes dynamiques simples

Créez un dossier avec des crochets \`[param]\` :

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Article : {params.slug}</h1>
}
\`\`\`

URL : \`/blog/mon-article\` → \`params.slug = "mon-article"\`

## Routes dynamiques multiples

\`\`\`tsx
// app/shop/[category]/[product]/page.tsx
export default function Product({ 
  params 
}: { 
  params: { category: string; product: string } 
}) {
  return (
    <div>
      <p>Catégorie : {params.category}</p>
      <p>Produit : {params.product}</p>
    </div>
  )
}
\`\`\`

URL : \`/shop/electronics/laptop\`

## Catch-all routes

Utilisez \`[...param]\` pour capturer tous les segments :

\`\`\`tsx
// app/docs/[...slug]/page.tsx
export default function Docs({ params }: { params: { slug: string[] } }) {
  return <p>Path : {params.slug.join('/')}</p>
}
\`\`\`

- \`/docs/getting-started\` → \`slug = ["getting-started"]\`
- \`/docs/api/reference/auth\` → \`slug = ["api", "reference", "auth"]\`

## Optional catch-all routes

Utilisez \`[[...param]]\` pour rendre le catch-all optionnel :

\`\`\`tsx
// app/shop/[[...categories]]/page.tsx
\`\`\`

Correspond à :
- \`/shop\` → \`categories = undefined\`
- \`/shop/electronics\` → \`categories = ["electronics"]\`
- \`/shop/electronics/laptops\` → \`categories = ["electronics", "laptops"]\``
                    },
                    {
                        title: "Quiz : Routing",
                        duration: "8:00",
                        type: "quiz",
                        questions: [
                            {
                                question: "Comment créer une route dynamique ?",
                                options: ["[param]", ":param", "{param}", "<param>"],
                                correctAnswer: 0
                            },
                            {
                                question: "Quelle syntaxe pour un catch-all route ?",
                                options: ["[...slug]", "[*slug]", "[slug*]", "[slug+]"],
                                correctAnswer: 0
                            },
                            {
                                question: "Comment rendre un catch-all optionnel ?",
                                options: ["[[...slug]]", "[...slug?]", "[...slug]?", "[?...slug]"],
                                correctAnswer: 0
                            }
                        ]
                    }
                ]
            },
            {
                title: "Projet Final & Certification",
                lessons: [
                    {
                        title: "Planification du projet fullstack",
                        duration: "22:00",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/VSB2h7mVhPg"
                    },
                    {
                        title: "Construction du backend avec Prisma",
                        duration: "35:40",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/RebA5J-rlwg"
                    },
                    {
                        title: "Authentification avec NextAuth",
                        duration: "28:15",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/1MTyCvS05V4"
                    },
                    {
                        title: "Déploiement sur Vercel",
                        duration: "18:30",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/2HBIzEx6IZA"
                    },
                    {
                        title: "Examen final Next.js",
                        duration: "30:00",
                        type: "quiz",
                        questions: [
                            {
                                question: "Quel fichier définit le layout racine dans Next.js 15 ?",
                                options: ["_app.js", "layout.tsx", "page.tsx", "index.html"],
                                correctAnswer: 1
                            },
                            {
                                question: "Comment définir une route dynamique ?",
                                options: ["/users/:id", "/users/[id]", "/users/{id}", "/users/(id)"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quelle fonction permet de revalider des données ?",
                                options: ["revalidatePath", "refresh()", "reload()", "update()"],
                                correctAnswer: 0
                            },
                            {
                                question: "Les Server Components peuvent-ils utiliser useState ?",
                                options: ["Oui", "Non", "Seulement avec 'use client'", "Seulement dans les pages"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quelle est la commande pour créer un build de production ?",
                                options: ["npm run prod", "npm run build", "npm run compile", "npm run deploy"],
                                correctAnswer: 1
                            },
                            {
                                question: "Où placer les fichiers statiques (images, fonts) ?",
                                options: ["assets/", "static/", "public/", "resources/"],
                                correctAnswer: 2
                            },
                            {
                                question: "Comment créer un endpoint API dans Next.js 15 ?",
                                options: ["api.ts", "route.ts", "endpoint.ts", "handler.ts"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quelle directive marque un composant comme Client Component ?",
                                options: ["'use client'", "'client side'", "'use browser'", "'client'"],
                                correctAnswer: 0
                            },
                            {
                                question: "Les Server Actions nécessitent quelle directive ?",
                                options: ["'use action'", "'use server'", "'server'", "'action'"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quel composant Next.js optimise automatiquement les images ?",
                                options: ["<img>", "<Image>", "<Picture>", "<OptimizedImage>"],
                                correctAnswer: 1
                            }
                        ]
                    },
                    {
                        title: "Obtenir votre certificat",
                        duration: "02:00",
                        type: "text",
                        content: "CERTIFICAT"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "DevOps : De zéro à héros",
        description: "Apprenez Docker, Kubernetes, CI/CD et l'infrastructure as code pour automatiser vos déploiements.",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=3288&auto=format&fit=crop",
        level: "Avancé",
        category: "DevOps",
        price: 0,
        rating: 4.9,
        reviewsCount: 89,
        lessonsCount: 14,
        duration: "20h",
        slug: "devops-zero-hero",
        lastUpdated: "Octobre 2024",
        instructor: abdRazak,
        objectives: [
            "Conteneuriser des applications avec Docker",
            "Orchestrer des conteneurs avec Kubernetes",
            "Mettre en place des pipelines CI/CD",
            "Gérer l'infrastructure avec Terraform"
        ],
        curriculum: [
            {
                title: "Les bases de Docker",
                lessons: [
                    {
                        title: "Introduction aux conteneurs",
                        duration: "16:30",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/gAkwW2tuIqE"
                    },
                    {
                        title: "Installation de Docker",
                        duration: "12:20",
                        type: "text",
                        content: `# Installation de Docker

## Windows

1. Téléchargez **Docker Desktop** depuis le site officiel
2. Exécutez l'installateur
3. Redémarrez votre ordinateur
4. Vérifiez l'installation :

\`\`\`bash
docker --version
docker run hello-world
\`\`\`

## macOS

\`\`\`bash
# Avec Homebrew
brew install --cask docker

# Ou téléchargez Docker Desktop
\`\`\`

## Linux (Ubuntu/Debian)

\`\`\`bash
# Mise à jour des paquets
sudo apt-get update

# Installation des dépendances
sudo apt-get install ca-certificates curl gnupg

# Ajout de la clé GPG officielle de Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Configuration du repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installation de Docker
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

# Vérification
sudo docker run hello-world
\`\`\`

## Commandes de base

\`\`\`bash
# Vérifier la version
docker --version

# Informations système
docker info

# Lister les conteneurs en cours
docker ps

# Lister tous les conteneurs
docker ps -a

# Lister les images
docker images
\`\`\``
                    },
                    {
                        title: "Écrire un Dockerfile",
                        duration: "22:45",
                        type: "text",
                        content: `# Maîtriser les Dockerfiles

## Qu'est-ce qu'un Dockerfile ?

Un **Dockerfile** est un fichier texte contenant les instructions pour construire une image Docker.

## Exemple : Application Node.js

\`\`\`dockerfile
# Image de base
FROM node:18-alpine

# Métadonnées
LABEL maintainer="dev@example.com"
LABEL version="1.0"

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
\`\`\`

## Instructions principales

### FROM
Définit l'image de base :
\`\`\`dockerfile
FROM ubuntu:22.04
FROM node:18-alpine
FROM python:3.11-slim
\`\`\`

### WORKDIR
Définit le répertoire de travail :
\`\`\`dockerfile
WORKDIR /app
\`\`\`

### COPY vs ADD
\`\`\`dockerfile
# COPY : Simple copie de fichiers
COPY package.json .
COPY src/ ./src/

# ADD : Copie + extraction d'archives
ADD archive.tar.gz /app/
\`\`\`

### RUN
Exécute des commandes lors du build :
\`\`\`dockerfile
RUN apt-get update && apt-get install -y curl git
\`\`\`

### ENV
Définit des variables d'environnement :
\`\`\`dockerfile
ENV NODE_ENV=production
ENV PORT=3000
\`\`\`

### EXPOSE
Documente les ports utilisés :
\`\`\`dockerfile
EXPOSE 3000
EXPOSE 8080
\`\`\`

### CMD vs ENTRYPOINT

**CMD** : Commande par défaut (peut être overridée)
\`\`\`dockerfile
CMD ["npm", "start"]
\`\`\`

**ENTRYPOINT** : Point d'entrée fixe
\`\`\`dockerfile
ENTRYPOINT ["node"]
CMD ["server.js"]
\`\`\`

## Multi-stage builds

Optimisez la taille de vos images :

\`\`\`dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]
\`\`\`

## Bonnes pratiques

1. ✅ Utilisez des images de base légères (alpine)
2. ✅ Minimisez le nombre de layers
3. ✅ Utilisez .dockerignore
4. ✅ Ne stockez jamais de secrets dans l'image
5. ✅ Utilisez multi-stage builds
6. ✅ Spécifiez des versions précises`
                    },
                    {
                        title: "Docker Compose en pratique",
                        duration: "24:40",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/DM65_JyGxCo"
                    },
                    {
                        title: "Quiz : Docker",
                        duration: "10:00",
                        type: "quiz",
                        questions: [
                            {
                                question: "Quelle instruction Dockerfile copie des fichiers ?",
                                options: ["COPY", "ADD", "Les deux", "MOVE"],
                                correctAnswer: 2
                            },
                            {
                                question: "Quelle commande lance un conteneur Docker ?",
                                options: ["docker start", "docker run", "docker exec", "docker create"],
                                correctAnswer: 1
                            },
                            {
                                question: "À quoi sert docker-compose ?",
                                options: ["Créer des images", "Gérer des applications multi-conteneurs", "Monitorer les conteneurs", "Sauvegarder des données"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quelle est la différence entre CMD et ENTRYPOINT ?",
                                options: ["Aucune", "CMD peut être overridé, ENTRYPOINT est fixe", "ENTRYPOINT est obsolète", "CMD est plus rapide"],
                                correctAnswer: 1
                            },
                            {
                                question: "Que fait un multi-stage build ?",
                                options: ["Accélère le build", "Réduit la taille de l'image finale", "Permet plusieurs CMD", "Crée plusieurs images"],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            },
            {
                title: "Kubernetes pour les développeurs",
                lessons: [
                    {
                        title: "Architecture Kubernetes",
                        duration: "22:30",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/X48VuDVv0do"
                    },
                    {
                        title: "Pods, Deployments et Services",
                        duration: "28:15",
                        type: "text",
                        content: `# Kubernetes : Concepts Fondamentaux

## Architecture Kubernetes

### Composants du Control Plane

- **API Server** : Point d'entrée pour toutes les commandes
- **etcd** : Base de données clé-valeur pour l'état du cluster
- **Scheduler** : Assigne les Pods aux Nodes
- **Controller Manager** : Gère les contrôleurs

### Composants des Nodes

- **kubelet** : Agent qui s'exécute sur chaque node
- **kube-proxy** : Gère le réseau
- **Container Runtime** : Docker, containerd, etc.

## Pods

Le **Pod** est la plus petite unité déployable dans Kubernetes.

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
\`\`\`

## Deployments

Les **Deployments** gèrent les Pods et leur réplication.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
\`\`\`

## Services

Les **Services** exposent les Pods au réseau.

### ClusterIP (par défaut)

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: ClusterIP
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
\`\`\`

### NodePort

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
\`\`\`

## Commandes kubectl essentielles

\`\`\`bash
# Créer des ressources
kubectl apply -f deployment.yaml

# Lister les ressources
kubectl get pods
kubectl get deployments
kubectl get services

# Détails d'une ressource
kubectl describe pod nginx-pod

# Logs
kubectl logs nginx-pod

# Exécuter une commande
kubectl exec -it nginx-pod -- /bin/bash

# Scaler un deployment
kubectl scale deployment nginx-deployment --replicas=5
\`\`\``
                    },
                    {
                        title: "Déploiement d'une application complète",
                        duration: "28:50",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/s_o8dwzRlu4"
                    },
                    {
                        title: "Quiz : Kubernetes",
                        duration: "10:00",
                        type: "quiz",
                        questions: [
                            {
                                question: "Quelle est la plus petite unité déployable dans Kubernetes ?",
                                options: ["Container", "Pod", "Deployment", "Service"],
                                correctAnswer: 1
                            },
                            {
                                question: "Que signifie K8s ?",
                                options: ["Kubernetes (8 lettres entre K et s)", "Kernel 8 systems", "Kube 8 services", "Rien"],
                                correctAnswer: 0
                            },
                            {
                                question: "Quel type de Service expose l'application à l'extérieur du cluster ?",
                                options: ["ClusterIP", "NodePort", "LoadBalancer", "NodePort et LoadBalancer"],
                                correctAnswer: 3
                            },
                            {
                                question: "À quoi sert un ConfigMap ?",
                                options: ["Stocker des secrets", "Stocker des configurations non sensibles", "Gérer les volumes", "Monitorer"],
                                correctAnswer: 1
                            },
                            {
                                question: "Quelle commande permet de scaler un deployment ?",
                                options: ["kubectl scale", "kubectl resize", "kubectl expand", "kubectl grow"],
                                correctAnswer: 0
                            }
                        ]
                    }
                ]
            },
            {
                title: "Certification",
                lessons: [
                    {
                        title: "Projet : Pipeline CI/CD complet",
                        duration: "50:00",
                        type: "video",
                        videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs"
                    },
                    {
                        title: "Examen final DevOps",
                        duration: "40:00",
                        type: "quiz",
                        questions: [
                            { question: "Quel outil est utilisé pour le CI/CD ?", options: ["Jenkins", "Word", "Excel", "Paint"], correctAnswer: 0 }
                        ]
                    },
                    {
                        title: "Votre certificat DevOps",
                        duration: "01:00",
                        type: "text",
                        content: "CERTIFICAT"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Introduction à l'IA et au Machine Learning",
        description: "Comprendre les bases de l'intelligence artificielle, les réseaux de neurones et créer ses premiers modèles.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=3132&auto=format&fit=crop",
        level: "Débutant",
        category: "Intelligence Artificielle",
        price: 0,
        rating: 4.7,
        reviewsCount: 210,
        lessonsCount: 24,
        duration: "8h",
        slug: "intro-ia-ml",
        lastUpdated: "Septembre 2024",
        instructor: abdRazak,
        objectives: [
            "Comprendre les concepts clés de l'IA",
            "Utiliser Python pour la Data Science",
            "Créer un modèle de régression simple",
            "Introduction aux réseaux de neurones"
        ],
        curriculum: [
            {
                title: "Fondamentaux de l'IA",
                lessons: [
                    { title: "Qu'est-ce que l'IA ?", duration: "08:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Histoire et évolution", duration: "10:00", type: "text", content: "# Histoire de l'IA\n\nL'IA a commencé dans les années 50..." },
                    { title: "Quiz : Concepts de base", duration: "05:00", type: "quiz", questions: [{ question: "Qui est le père de l'IA ?", options: ["Alan Turing", "Steve Jobs", "Bill Gates"], correctAnswer: 0 }] }
                ]
            },
            {
                title: "Machine Learning Pratique",
                lessons: [
                    { title: "Apprentissage supervisé vs non-supervisé", duration: "15:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Votre premier modèle avec Scikit-Learn", duration: "20:00", type: "text", content: "# Scikit-Learn\n\nUne librairie puissante pour le ML..." },
                    { title: "Validation du modèle", duration: "10:00", type: "quiz", questions: [{ question: "Quelle métrique pour la classification ?", options: ["Accuracy", "MSE", "R2"], correctAnswer: 0 }] }
                ]
            },
            {
                title: "Conclusion & Certificat",
                lessons: [
                    { title: "L'éthique dans l'IA", duration: "12:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Examen final IA", duration: "20:00", type: "quiz", questions: [{ question: "Le biais est-il un problème ?", options: ["Oui", "Non"], correctAnswer: 0 }] },
                    { title: "Certificat de réussite", duration: "01:00", type: "text", content: "CERTIFICAT" }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Framer Motion & Animations Avancées",
        description: "Donnez vie à vos interfaces React avec des animations fluides, complexes et performantes.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3270&auto=format&fit=crop",
        level: "Intermédiaire",
        category: "Design & UX",
        price: 0,
        rating: 4.9,
        reviewsCount: 56,
        lessonsCount: 18,
        duration: "6h",
        slug: "framer-motion-animations",
        lastUpdated: "Décembre 2024",
        instructor: abdRazak,
        objectives: [
            "Maîtriser l'API de Framer Motion",
            "Créer des animations de layout complexes",
            "Gérer les gestes et le drag & drop",
            "Optimiser les performances des animations"
        ],
        curriculum: [
            {
                title: "Bases de l'animation",
                lessons: [
                    { title: "Introduction à Framer Motion", duration: "10:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Propriétés d'animation", duration: "15:00", type: "text", content: "# Framer Motion\n\nLibrary d'animation pour React..." },
                    { title: "Quiz : Principes d'animation", duration: "05:00", type: "quiz", questions: [{ question: "Quelle prop pour animer ?", options: ["animate", "move", "run"], correctAnswer: 0 }] }
                ]
            },
            {
                title: "Animations Complexes",
                lessons: [
                    { title: "Layout Animations", duration: "18:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Gestures & Drag", duration: "20:00", type: "text", content: "# Gestures\n\nDrag, hover, tap..." },
                    { title: "Scroll Animations", duration: "15:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" }
                ]
            },
            {
                title: "Projet & Certificat",
                lessons: [
                    { title: "Création d'un portfolio animé", duration: "30:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Examen final Animation", duration: "15:00", type: "quiz", questions: [{ question: "LayoutId sert à ?", options: ["Shared Element Transition", "Rien", "Debug"], correctAnswer: 0 }] },
                    { title: "Certificat", duration: "01:00", type: "text", content: "CERTIFICAT" }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "TypeScript : Du débutant à l'expert",
        description: "Maîtrisez TypeScript pour écrire du code JavaScript plus robuste, maintenable et scalable.",
        image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=3270&auto=format&fit=crop",
        level: "Débutant",
        category: "Développement Web",
        price: 0,
        rating: 4.8,
        reviewsCount: 145,
        lessonsCount: 35,
        duration: "10h",
        slug: "typescript-expert",
        lastUpdated: "Août 2024",
        instructor: abdRazak,
        objectives: [
            "Comprendre le système de types de TS",
            "Utiliser les Generics avancés",
            "Configurer tsconfig pour des projets stricts",
            "Migrer un projet JS vers TS"
        ],
        curriculum: [
            {
                title: "Les bases de TypeScript",
                lessons: [
                    { title: "Pourquoi TypeScript ?", duration: "08:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Types primitifs et interfaces", duration: "12:00", type: "text", content: "# TypeScript Types\n\nString, Number, Boolean..." },
                    { title: "Quiz : Typage statique", duration: "05:00", type: "quiz", questions: [{ question: "Extension de fichier TS ?", options: [".ts", ".js", ".jsx"], correctAnswer: 0 }] }
                ]
            },
            {
                title: "TypeScript Avancé",
                lessons: [
                    { title: "Generics et Utility Types", duration: "20:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Type Narrowing & Guards", duration: "15:00", type: "text", content: "# Generics\n\n<T>..." },
                    { title: "Decorators", duration: "10:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" }
                ]
            },
            {
                title: "Certification",
                lessons: [
                    { title: "Projet : Librairie typée", duration: "35:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Examen final TypeScript", duration: "25:00", type: "quiz", questions: [{ question: "Partial<T> rend tout optionnel ?", options: ["Oui", "Non"], correctAnswer: 0 }] },
                    { title: "Certificat de réussite", duration: "01:00", type: "text", content: "CERTIFICAT" }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Python pour la Data Science",
        description: "Analysez des données avec Pandas, NumPy et créez des visualisations percutantes avec Matplotlib.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=3270&auto=format&fit=crop",
        level: "Intermédiaire",
        category: "Data Science",
        price: 0,
        rating: 4.7,
        reviewsCount: 98,
        lessonsCount: 48,
        duration: "15h",
        slug: "python-data-science",
        lastUpdated: "Juillet 2024",
        instructor: abdRazak,
        objectives: [
            "Maîtriser la syntaxe Python pour la data",
            "Manipuler des DataFrames avec Pandas",
            "Créer des graphiques avec Matplotlib/Seaborn",
            "Nettoyer et préparer des datasets"
        ],
        curriculum: [
            {
                title: "Python Essentials",
                lessons: [
                    { title: "Rappels Python", duration: "10:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Environnement Jupyter", duration: "10:00", type: "text", content: "# Jupyter\n\nNotebooks interactifs..." },
                    { title: "Quiz : Python", duration: "05:00", type: "quiz", questions: [{ question: "print('hello') affiche ?", options: ["hello", "print", "error"], correctAnswer: 0 }] }
                ]
            },
            {
                title: "Analyse de données",
                lessons: [
                    { title: "NumPy Arrays", duration: "15:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Pandas DataFrames", duration: "25:00", type: "text", content: "# Pandas\n\nManipulation de données..." },
                    { title: "Visualisation de données", duration: "20:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" }
                ]
            },
            {
                title: "Projet Data & Certificat",
                lessons: [
                    { title: "Projet : Analyse exploratoire", duration: "45:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Examen Data Science", duration: "30:00", type: "quiz", questions: [{ question: "Pandas sert à ?", options: ["Data Analysis", "Web Dev", "Game Dev"], correctAnswer: 0 }] },
                    { title: "Certificat", duration: "01:00", type: "text", content: "CERTIFICAT" }
                ]
            }
        ]
    },
    {
        id: 7,
        title: "Cybersécurité : Les fondamentaux",
        description: "Apprenez à sécuriser vos applications, comprendre les attaques courantes et détecter les vulnérabilités.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3270&auto=format&fit=crop",
        level: "Intermédiaire",
        category: "Cybersécurité",
        price: 0,
        rating: 4.9,
        reviewsCount: 75,
        lessonsCount: 52,
        duration: "18h",
        slug: "cybersecurity-fundamentals",
        lastUpdated: "Novembre 2024",
        instructor: abdRazak,
        objectives: [
            "Comprendre les vecteurs d'attaque (OWASP Top 10)",
            "Sécuriser une application web",
            "Introduction à la cryptographie",
            "Réaliser un audit de sécurité basique"
        ],
        curriculum: [
            {
                title: "Introduction à la sécurité",
                lessons: [
                    { title: "Les piliers de la sécurité (CIA)", duration: "10:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Types de hackers", duration: "08:00", type: "text", content: "# CIA Triad\n\nConfidentiality, Integrity, Availability..." },
                    { title: "Quiz : Bases sécu", duration: "05:00", type: "quiz", questions: [{ question: "Que signifie CIA ?", options: ["Confidentiality Integrity Availability", "Central Intelligence Agency"], correctAnswer: 0 }] }
                ]
            },
            {
                title: "Attaques Web",
                lessons: [
                    { title: "Injections SQL", duration: "20:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "XSS & CSRF", duration: "25:00", type: "text", content: "# OWASP Top 10\n\nLes failles les plus courantes..." },
                    { title: "Défense en profondeur", duration: "15:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" }
                ]
            },
            {
                title: "Audit & Certificat",
                lessons: [
                    { title: "Outils de pentest", duration: "30:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Examen Cybersécurité", duration: "35:00", type: "quiz", questions: [{ question: "SQL Injection cible ?", options: ["Base de données", "Navigateur", "Serveur"], correctAnswer: 0 }] },
                    { title: "Certificat de réussite", duration: "01:00", type: "text", content: "CERTIFICAT" }
                ]
            }
        ]
    },
    {
        id: 8,
        title: "React Native : Applications mobiles",
        description: "Créez des applications natives performantes pour iOS et Android avec React Native et Expo.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=3270&auto=format&fit=crop",
        level: "Intermédiaire",
        category: "Développement Mobile",
        price: 0,
        rating: 4.6,
        reviewsCount: 64,
        lessonsCount: 38,
        duration: "14h",
        slug: "react-native-mobile",
        lastUpdated: "Octobre 2024",
        instructor: abdRazak,
        objectives: [
            "Configurer l'environnement Expo",
            "Créer des interfaces natives avec Flexbox",
            "Gérer la navigation et les données",
            "Publier sur l'App Store et Google Play"
        ],
        curriculum: [
            {
                title: "Démarrer avec React Native",
                lessons: [
                    { title: "React Native vs Web", duration: "10:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Installation d'Expo", duration: "15:00", type: "text", content: "# Expo\n\nFramework pour React Native..." },
                    { title: "Premier écran", duration: "12:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" }
                ]
            },
            {
                title: "Composants & Navigation",
                lessons: [
                    { title: "Composants natifs (View, Text...)", duration: "20:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "React Navigation", duration: "25:00", type: "text", content: "# Navigation\n\nStack, Tab, Drawer..." },
                    { title: "Quiz : Mobile Dev", duration: "10:00", type: "quiz", questions: [{ question: "Equivalent de div ?", options: ["View", "Div", "Box"], correctAnswer: 0 }] }
                ]
            },
            {
                title: "Publication & Certificat",
                lessons: [
                    { title: "Build & Deploy", duration: "30:00", type: "video", videoUrl: "https://www.youtube.com/embed/Sklc_fQBmcs" },
                    { title: "Examen final Mobile", duration: "20:00", type: "quiz", questions: [{ question: "EAS Build sert à ?", options: ["Build dans le cloud", "Rien", "Test"], correctAnswer: 0 }] },
                    { title: "Certificat", duration: "01:00", type: "text", content: "CERTIFICAT" }
                ]
            }
        ]
    }
]
