# 🎓 iTech Platform - Plateforme de Formation Tech

## ✅ État actuel du projet

La plateforme fonctionne **parfaitement avec des données mock** (simulées) stockées dans `lib/mock-data.ts`.

### 📚 Fonctionnalités disponibles

- ✅ **Catalogue de formations** - 8 cours complets avec Abd Razak comme instructeur
- ✅ **Pages de détails des cours** - Informations complètes, curriculum, vidéos
- ✅ **Lecteur de cours** - Vidéos, leçons textuelles, quiz, certificats
- ✅ **Système d'authentification** - NextAuth avec login/register
- ✅ **Dashboard utilisateur** - Vue d'ensemble simple
- ✅ **Interface responsive** - Design moderne et élégant
- ✅ **Mode sombre/clair** - Thème adaptatif

### 🎯 Cours disponibles

1. **Next.js 15** - 18 leçons (App Router, Server Components, etc.)
2. **DevOps** - 14 leçons (Docker, Kubernetes, CI/CD)
3. **IA & Machine Learning** - 13 leçons (Python, NumPy, Scikit-learn)
4. **Framer Motion** - 12 leçons (Animations, gestures, scroll)
5. **TypeScript** - 9 leçons (Generics, Utility Types, Decorators)
6. **Python Data Science** - 9 leçons (Pandas, Matplotlib, Titanic)
7. **Cybersécurité** - 9 leçons (CIA Triad, OWASP, Kali Linux)
8. **React Native** - 9 leçons (Expo, Flexbox, EAS Build)

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build pour production
npm run build

# Démarrage en production
npm start
```

Visitez `http://localhost:3000`

## 📁 Structure du projet

```
├── app/
│   ├── (marketing)/        # Pages publiques (accueil, cours, blog)
│   ├── (learn)/            # Lecteur de cours
│   ├── (dashboard)/        # Dashboard utilisateur et enseignant
│   └── (auth)/             # Pages d'authentification
├── components/
│   ├── shared/             # Composants partagés (header, footer)
│   ├── ui/                 # Composants UI réutilisables
│   └── courses/            # Composants spécifiques aux cours
├── lib/
│   └── mock-data.ts        # 📊 DONNÉES DES COURS (source de vérité)
└── prisma/
    └── schema.prisma       # Schéma DB (désactivé pour l'instant)
```

## 🎨 Technologies utilisées

- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling moderne
- **NextAuth** - Authentification
- **Radix UI** - Composants UI accessibles
- **Framer Motion** - Animations
- **Lucide React** - Icônes

## 📝 Notes importantes

### Base de données
La base de données Prisma est **désactivée** pour simplifier le déploiement. Toutes les données proviennent de `lib/mock-data.ts`.

Si vous souhaitez activer la base de données plus tard :
1. Décommentez le code dans `lib/db.ts`
2. Configurez `DATABASE_URL` dans `.env`
3. Exécutez `npx prisma db push`

### Déploiement sur Vercel
Le projet est prêt à être déployé sur Vercel sans configuration supplémentaire :
- ✅ Pas besoin de base de données
- ✅ Pas de variables d'environnement obligatoires (sauf pour l'auth en production)
- ✅ Build rapide et fiable

## 🔐 Variables d'environnement (optionnelles)

Pour l'authentification en production, créez un fichier `.env` :

```env
# NextAuth (générez avec: openssl rand -base64 32)
AUTH_SECRET=votre-secret-aleatoire

# URL de votre application
NEXTAUTH_URL=https://votre-domaine.vercel.app
```

## 📞 Support

Pour toute question ou problème, consultez le code ou créez une issue sur GitHub.

---

**Version actuelle** : Mock Data (Stable) ✅  
**Dernière mise à jour** : Décembre 2024
