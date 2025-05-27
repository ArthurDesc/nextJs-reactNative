import { PrismaClient } from '../packages/db/generated/client';
import bcrypt from 'bcryptjs';

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