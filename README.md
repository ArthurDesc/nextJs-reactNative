# boilerplate Monorepo

Ce projet est un monorepo géré avec pnpm workspaces et Turborepo, conçu pour une application Fullstack Web (Next.js) et Mobile (React Native - Expo) avec une base de données partagée (Prisma).

## Démarrage rapide

1. **Installation des dépendances :**

```bash
pnpm install
```

2. **Configuration de la base de données :**

Assurez-vous que votre serveur PostgreSQL est lancé et que la variable `DATABASE_URL` dans `.env` est correcte.

```bash
pnpm db:setup
pnpm seed # Optionnel: peupler la base de données avec des données de test
```

3. **Lancer le serveur de développement :**

```bash
pnpm dev # Lance les applications Web et Mobile
```

## Commandes utiles

- `pnpm build` : Build le projet
- `pnpm lint` : Linter le code
- `pnpm format` : Formatter le code
- `pnpm prisma studio` : Lancer Prisma Studio
- `pnpm db:reset` : Reset la base de données

Pour plus de commandes, consultez les scripts dans `package.json` et la configuration dans `turbo.json`.