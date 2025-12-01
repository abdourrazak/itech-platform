# 🔧 Guide de résolution de l'erreur Vercel

## Problème
Erreur "Application error: a server-side exception has occurred" lors de l'accès aux pages de cours.

## Cause
La base de données sur Vercel n'est pas encore peuplée avec les cours.

## ✅ Solution (Étapes à suivre)

### 1. Vérifier les variables d'environnement sur Vercel

Allez sur https://vercel.com/[votre-projet]/settings/environment-variables

Assurez-vous que ces variables sont configurées :
- `DATABASE_URL` : URL de connexion à votre base PostgreSQL
- `AUTH_SECRET` : Clé secrète pour NextAuth (générez-en une avec `openssl rand -base64 32`)
- `NEXTAUTH_URL` : URL de votre application (ex: https://itech-platform.vercel.app)

### 2. Le déploiement automatique

Le dernier commit a été poussé, Vercel va automatiquement :
1. ✅ Pousser le schéma Prisma vers la DB (`prisma db push`)
2. ✅ Générer le client Prisma
3. ✅ Builder l'application

### 3. Peupler la base de données

Une fois le déploiement réussi, vous devez ajouter les cours à la base de données.

#### Option A : Via l'interface web (Recommandé pour le premier seed)

1. Connectez-vous à votre base de données PostgreSQL
2. Utilisez un outil comme **Prisma Studio** :
   ```bash
   npx prisma studio
   ```
3. Ou utilisez la page `/seed` en développement local :
   ```bash
   npm run dev
   # Visitez http://localhost:3000/seed
   # Cliquez sur "Run Seed"
   ```

#### Option B : Via script (Pour automatiser)

```bash
# En local, connecté à la DB de production
DATABASE_URL="votre-url-de-production" npm run db:seed
```

### 4. Vérifier que tout fonctionne

1. Attendez que le déploiement Vercel soit terminé (environ 2-3 minutes)
2. Visitez votre site : https://itech-platform.vercel.app
3. Cliquez sur "Formations" ou "Parcours"
4. Les cours devraient maintenant s'afficher !

## 🚨 Si le problème persiste

1. Vérifiez les logs Vercel :
   - Allez sur https://vercel.com/[votre-projet]/deployments
   - Cliquez sur le dernier déploiement
   - Consultez les logs pour voir les erreurs

2. Vérifiez que la DB est accessible :
   ```bash
   # En local
   npx prisma db pull
   ```

3. Contactez-moi avec les logs d'erreur spécifiques !

## 📝 Notes importantes

- Le champ `slug` a été ajouté au modèle `Course`
- La relation `instructor` (User) a été ajoutée
- Le script de build pousse automatiquement le schéma à chaque déploiement
- La page `/seed` est protégée et ne fonctionne qu'en mode développement

## 🎯 Prochaines étapes après résolution

1. Créer un compte utilisateur
2. S'inscrire à un cours gratuit
3. Tester le lecteur de cours
4. Vérifier que la progression est sauvegardée
5. Consulter le dashboard utilisateur
