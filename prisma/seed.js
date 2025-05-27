const { PrismaClient } = require('../packages/db/generated/client');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// Charger les variables d'environnement depuis .env
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, '');
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyer les données existantes
  await prisma.post.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Créer un utilisateur de test
  const hashedPassword = await bcrypt.hash('Password123@', 12);
  
  const testUser = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@mail.com',
      hashedPassword,
    },
  });

  // Créer quelques posts de test
  await prisma.post.createMany({
    data: [
      {
        title: 'Premier article',
        content: 'Ceci est le contenu du premier article de test.',
        published: true,
        authorId: testUser.id,
      },
      {
        title: 'Article en brouillon',
        content: 'Ceci est un article en brouillon.',
        published: false,
        authorId: testUser.id,
      },
      {
        title: 'Guide du monorepo',
        content: 'Comment bien structurer un monorepo avec TurboRepo et Prisma.',
        published: true,
        authorId: testUser.id,
      },
    ],
  });

  console.log('✅ Seeding terminé avec succès !');
  console.log(`📧 Utilisateur créé: ${testUser.email}`);
  console.log('🔑 Mot de passe: Password123@');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 