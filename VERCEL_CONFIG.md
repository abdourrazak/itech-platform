# Configuration Vercel - Variables d'environnement

Pour que l'authentification fonctionne sur Vercel, vous devez ajouter ces variables d'environnement :

## Étapes :

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `itech-platform`
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les variables suivantes :

### Variables requises :

```bash
# URL de production Vercel
NEXTAUTH_URL=https://itech-platform.vercel.app

# Secret NextAuth (généré ci-dessous)
NEXTAUTH_SECRET=WR9fSbCsr9ugMmnzH+D3WT9bopB0CHmW30ltsCqFvxw=

# Base de données Neon (déjà configurée)
DATABASE_URL=postgresql://neondb_owner:npg_KARLguY2j1DN@ep-ancient-mode-a4p4iqe3-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Après avoir ajouté les variables :

1. Cliquez sur **Save**
2. Allez dans **Deployments**
3. Cliquez sur les 3 points `...` du dernier déploiement
4. Cliquez sur **Redeploy**
5. Attendez que le déploiement se termine

## Test de l'authentification :

1. Allez sur votre site Vercel
2. Cliquez sur **"S'inscrire"**
3. Créez un compte avec :
   - Prénom et Nom
   - Email
   - Mot de passe (min 6 caractères)
4. Vous serez automatiquement connecté
5. Le **profil utilisateur** apparaîtra en haut à droite (icône avatar)
6. Cliquez dessus pour voir le menu avec **"Se déconnecter"**

## Génération d'un nouveau secret (si besoin) :

```bash
openssl rand -base64 32
```

## Vérification :

Une fois les variables ajoutées et redéployé, vous devriez voir :
- ✅ Boutons "Se connecter" et "S'inscrire" (toujours visibles)
- ✅ Avatar utilisateur (après connexion)
- ✅ Menu déroulant avec "Dashboard", "Paramètres", "Se déconnecter"
