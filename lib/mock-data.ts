export interface Lesson {
    title: string
    duration: string
    type: "video" | "text" | "quiz"
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
        lessonsCount: 42,
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
                    { title: "Pourquoi Next.js ?", duration: "10:00", type: "video" },
                    { title: "Installation et configuration", duration: "15:00", type: "text" },
                    { title: "Structure du projet", duration: "08:00", type: "video" }
                ]
            },
            {
                title: "React 19 & Server Components",
                lessons: [
                    { title: "Comprendre les Server Components", duration: "20:00", type: "video" },
                    { title: "Le hook use() et les nouvelles APIs", duration: "12:00", type: "text" },
                    { title: "Quiz : React 19", duration: "05:00", type: "quiz" }
                ]
            },
            {
                title: "Projet Final & Certification",
                lessons: [
                    { title: "Construction du projet final", duration: "45:00", type: "video" },
                    { title: "Examen final", duration: "30:00", type: "quiz" },
                    { title: "Obtenir votre certificat", duration: "02:00", type: "text" }
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
        lessonsCount: 65,
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
                    { title: "Introduction aux conteneurs", duration: "12:00", type: "video" },
                    { title: "Écrire un Dockerfile", duration: "15:00", type: "text" },
                    { title: "Docker Compose", duration: "10:00", type: "video" }
                ]
            },
            {
                title: "Kubernetes pour les développeurs",
                lessons: [
                    { title: "Architecture de K8s", duration: "25:00", type: "video" },
                    { title: "Déploiement de Pods et Services", duration: "20:00", type: "text" },
                    { title: "Quiz : Docker & K8s", duration: "10:00", type: "quiz" }
                ]
            },
            {
                title: "Certification",
                lessons: [
                    { title: "Projet : Pipeline CI/CD complet", duration: "50:00", type: "video" },
                    { title: "Examen final DevOps", duration: "40:00", type: "quiz" },
                    { title: "Votre certificat DevOps", duration: "01:00", type: "text" }
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
                    { title: "Qu'est-ce que l'IA ?", duration: "08:00", type: "video" },
                    { title: "Histoire et évolution", duration: "10:00", type: "text" },
                    { title: "Quiz : Concepts de base", duration: "05:00", type: "quiz" }
                ]
            },
            {
                title: "Machine Learning Pratique",
                lessons: [
                    { title: "Apprentissage supervisé vs non-supervisé", duration: "15:00", type: "video" },
                    { title: "Votre premier modèle avec Scikit-Learn", duration: "20:00", type: "text" },
                    { title: "Validation du modèle", duration: "10:00", type: "quiz" }
                ]
            },
            {
                title: "Conclusion & Certificat",
                lessons: [
                    { title: "L'éthique dans l'IA", duration: "12:00", type: "video" },
                    { title: "Examen final IA", duration: "20:00", type: "quiz" },
                    { title: "Certificat de réussite", duration: "01:00", type: "text" }
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
                    { title: "Introduction à Framer Motion", duration: "10:00", type: "video" },
                    { title: "Propriétés d'animation", duration: "15:00", type: "text" },
                    { title: "Quiz : Principes d'animation", duration: "05:00", type: "quiz" }
                ]
            },
            {
                title: "Animations Complexes",
                lessons: [
                    { title: "Layout Animations", duration: "18:00", type: "video" },
                    { title: "Gestures & Drag", duration: "20:00", type: "text" },
                    { title: "Scroll Animations", duration: "15:00", type: "video" }
                ]
            },
            {
                title: "Projet & Certificat",
                lessons: [
                    { title: "Création d'un portfolio animé", duration: "30:00", type: "video" },
                    { title: "Examen final Animation", duration: "15:00", type: "quiz" },
                    { title: "Certificat", duration: "01:00", type: "text" }
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
                    { title: "Pourquoi TypeScript ?", duration: "08:00", type: "video" },
                    { title: "Types primitifs et interfaces", duration: "12:00", type: "text" },
                    { title: "Quiz : Typage statique", duration: "05:00", type: "quiz" }
                ]
            },
            {
                title: "TypeScript Avancé",
                lessons: [
                    { title: "Generics et Utility Types", duration: "20:00", type: "video" },
                    { title: "Type Narrowing & Guards", duration: "15:00", type: "text" },
                    { title: "Decorators", duration: "10:00", type: "video" }
                ]
            },
            {
                title: "Certification",
                lessons: [
                    { title: "Projet : Librairie typée", duration: "35:00", type: "video" },
                    { title: "Examen final TypeScript", duration: "25:00", type: "quiz" },
                    { title: "Certificat de réussite", duration: "01:00", type: "text" }
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
                    { title: "Rappels Python", duration: "10:00", type: "video" },
                    { title: "Environnement Jupyter", duration: "10:00", type: "text" },
                    { title: "Quiz : Python", duration: "05:00", type: "quiz" }
                ]
            },
            {
                title: "Analyse de données",
                lessons: [
                    { title: "NumPy Arrays", duration: "15:00", type: "video" },
                    { title: "Pandas DataFrames", duration: "25:00", type: "text" },
                    { title: "Visualisation de données", duration: "20:00", type: "video" }
                ]
            },
            {
                title: "Projet Data & Certificat",
                lessons: [
                    { title: "Projet : Analyse exploratoire", duration: "45:00", type: "video" },
                    { title: "Examen Data Science", duration: "30:00", type: "quiz" },
                    { title: "Certificat", duration: "01:00", type: "text" }
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
                    { title: "Les piliers de la sécurité (CIA)", duration: "10:00", type: "video" },
                    { title: "Types de hackers", duration: "08:00", type: "text" },
                    { title: "Quiz : Bases sécu", duration: "05:00", type: "quiz" }
                ]
            },
            {
                title: "Attaques Web",
                lessons: [
                    { title: "Injections SQL", duration: "20:00", type: "video" },
                    { title: "XSS & CSRF", duration: "25:00", type: "text" },
                    { title: "Défense en profondeur", duration: "15:00", type: "video" }
                ]
            },
            {
                title: "Audit & Certificat",
                lessons: [
                    { title: "Outils de pentest", duration: "30:00", type: "video" },
                    { title: "Examen Cybersécurité", duration: "35:00", type: "quiz" },
                    { title: "Certificat de réussite", duration: "01:00", type: "text" }
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
                    { title: "React Native vs Web", duration: "10:00", type: "video" },
                    { title: "Installation d'Expo", duration: "15:00", type: "text" },
                    { title: "Premier écran", duration: "12:00", type: "video" }
                ]
            },
            {
                title: "Composants & Navigation",
                lessons: [
                    { title: "Composants natifs (View, Text...)", duration: "20:00", type: "video" },
                    { title: "React Navigation", duration: "25:00", type: "text" },
                    { title: "Quiz : Mobile Dev", duration: "10:00", type: "quiz" }
                ]
            },
            {
                title: "Publication & Certificat",
                lessons: [
                    { title: "Build & Deploy", duration: "30:00", type: "video" },
                    { title: "Examen final Mobile", duration: "20:00", type: "quiz" },
                    { title: "Certificat", duration: "01:00", type: "text" }
                ]
            }
        ]
    }
]
