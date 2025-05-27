const { execSync } = require('child_process');
const { Client } = require('pg');
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

async function createDatabase() {
  loadEnv();
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ DATABASE_URL n\'est pas définie dans le fichier .env');
    process.exit(1);
  }

  // Parse l'URL de la base de données
  const url = new URL(dbUrl);
  const dbName = url.pathname.slice(1); // Supprime le '/' initial
  const connectionConfig = {
    host: url.hostname,
    port: url.port || 5432,
    user: url.username,
    password: decodeURIComponent(url.password),
    database: 'postgres', // Se connecter à la base par défaut pour créer la nouvelle
  };

  const client = new Client(connectionConfig);

  try {
    await client.connect();
    console.log('✅ Connexion à PostgreSQL réussie');

    // Vérifier si la base de données existe
    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [dbName]
    );

    if (result.rows.length === 0) {
      // Créer la base de données
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Base de données '${dbName}' créée avec succès`);
    } else {
      console.log(`ℹ️  La base de données '${dbName}' existe déjà`);
    }
  } catch (error) {
    console.error('❌ Erreur lors de la création de la base de données:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createDatabase(); 