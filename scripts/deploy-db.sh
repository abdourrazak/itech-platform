#!/bin/bash
# Script pour déployer les migrations Prisma sur Vercel

echo "🚀 Déploiement des migrations Prisma sur Vercel..."

# 1. Générer le client Prisma
echo "📦 Génération du client Prisma..."
npx prisma generate

# 2. Pousser le schéma vers la base de données
echo "🔄 Push du schéma vers la base de données..."
npx prisma db push

echo "✅ Migrations terminées !"
echo ""
echo "⚠️  IMPORTANT: Assurez-vous que DATABASE_URL est configuré dans vos variables d'environnement Vercel"
echo "   1. Allez sur https://vercel.com/[votre-projet]/settings/environment-variables"
echo "   2. Ajoutez DATABASE_URL avec votre URL de connexion PostgreSQL"
echo "   3. Redéployez votre application"
