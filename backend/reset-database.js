const { spawn } = require('child_process');
const { Client } = require('pg');

// Railway PostgreSQL pripojenie
const dbConfig = {
  host: 'hopper.proxy.rlwy.net',
  port: 56034,
  database: 'railway', // Štandardný názov databázy na Railway
  user: 'postgres',
  password: 'igZOWrPdUDmfodROdwluvHonWNXlmZIj',
  ssl: {
    rejectUnauthorized: false
  }
};

// Nastavenie environment premenných pre Medusa
const envVars = {
  ...process.env,
  DATABASE_URL: `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
  JWT_SECRET: 'super-secret-jwt-token',
  COOKIE_SECRET: 'super-secret-cookie-token',
  NODE_ENV: 'development'
};

async function checkDatabaseConnection() {
  const client = new Client(dbConfig);
  try {
    console.log('🔍 Kontrolujem pripojenie k databáze...');
    await client.connect();
    
    const result = await client.query('SELECT current_database(), version();');
    console.log('✅ Pripojenie úspešné!');
    console.log(`📊 Databáza: ${result.rows[0].current_database}`);
    console.log(`📊 PostgreSQL verzia: ${result.rows[0].version.split(' ')[0]}`);
    
    // Zistiť existujúce tabuľky
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    
    console.log(`📊 Počet tabuliek: ${tables.rows.length}`);
    
    return true;
  } catch (error) {
    console.error('❌ Chyba pri pripojení k databáze:', error.message);
    return false;
  } finally {
    await client.end();
  }
}

async function dropAllTables() {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    
    console.log('🧹 Vymazávam všetky tabuľky...');
    
    // Získať všetky tabuľky
    const tables = await client.query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public';
    `);
    
    if (tables.rows.length > 0) {
      // Vymazať všetky tabuľky s CASCADE
      for (const table of tables.rows) {
        await client.query(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE;`);
      }
      console.log(`✅ Vymazané ${tables.rows.length} tabuliek`);
    } else {
      console.log('ℹ️ Žiadne tabuľky na vymazanie');
    }
    
    // Vymazať všetky sekvencie
    const sequences = await client.query(`
      SELECT sequencename 
      FROM pg_sequences 
      WHERE schemaname = 'public';
    `);
    
    if (sequences.rows.length > 0) {
      for (const sequence of sequences.rows) {
        await client.query(`DROP SEQUENCE IF EXISTS "${sequence.sequencename}" CASCADE;`);
      }
      console.log(`✅ Vymazané ${sequences.rows.length} sekvencií`);
    }
    
    console.log('✅ Databáza je teraz prázdna');
    
  } catch (error) {
    console.error('❌ Chyba pri vymazávaní tabuliek:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 Spúšťam: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...envVars, ...options.env },
      cwd: options.cwd || process.cwd()
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${command} úspešne dokončený`);
        resolve();
      } else {
        console.error(`❌ ${command} zlyhalo s kódom ${code}`);
        reject(new Error(`Command failed with code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      console.error(`❌ Chyba pri spustení ${command}:`, error.message);
      reject(error);
    });
  });
}

async function installDependencies() {
  console.log('📦 Inštalujem dependencies...');
  try {
    await runCommand('pnpm', ['install']);
    console.log('✅ Dependencies nainštalované');
  } catch (error) {
    console.error('❌ Chyba pri inštalácii dependencies:', error.message);
    throw error;
  }
}

async function runMigrations() {
  console.log('🏗️ Spúšťam migrácie...');
  try {
    await runCommand('node', ['./node_modules/@medusajs/cli/cli.js', 'db:migrate']);
    console.log('✅ Migrácie úspešne dokončené');
  } catch (error) {
    console.error('❌ Chyba pri spustení migrácií:', error.message);
    throw error;
  }
}

async function runSeed() {
  console.log('🌱 Spúšťam seed...');
  try {
    await runCommand('node', ['./node_modules/@medusajs/cli/cli.js', 'exec', './src/scripts/seed.ts']);
    console.log('✅ Seed úspešne dokončený');
  } catch (error) {
    console.error('❌ Chyba pri spustení seed:', error.message);
    throw error;
  }
}

async function fullReset() {
  try {
    console.log('🚀 Začínam kompletnú obnovu databázy...\n');
    
    // 1. Kontrola pripojenia
    const connected = await checkDatabaseConnection();
    if (!connected) {
      throw new Error('Nepodarilo sa pripojiť k databáze');
    }
    
    // 2. Vymazanie všetkých tabuliek
    await dropAllTables();
    
    // 3. Inštalácia dependencies
    await installDependencies();
    
    // 4. Spustenie migrácií
    await runMigrations();
    
    // 5. Spustenie seed
    await runSeed();
    
    console.log('\n🎉 Databáza úspešne obnovená!');
    console.log('✅ Môžete teraz spustiť aplikáciu pomocou: npm run dev');
    
  } catch (error) {
    console.error('\n💥 Chyba pri obnove databázy:', error.message);
    process.exit(1);
  }
}

// Exportovať funkcie
module.exports = {
  checkDatabaseConnection,
  dropAllTables,
  installDependencies,
  runMigrations,
  runSeed,
  fullReset
};

// Ak je skript spustený priamo
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🔧 Použitie:');
    console.log('node reset-database.js check    - Kontrola pripojenia');
    console.log('node reset-database.js drop     - Vymazanie tabuliek');
    console.log('node reset-database.js migrate  - Spustenie migrácií');
    console.log('node reset-database.js seed     - Spustenie seed');
    console.log('node reset-database.js full     - Kompletná obnova');
    process.exit(0);
  }
  
  const command = args[0];
  
  switch (command) {
    case 'check':
      checkDatabaseConnection();
      break;
    case 'drop':
      dropAllTables();
      break;
    case 'migrate':
      runMigrations();
      break;
    case 'seed':
      runSeed();
      break;
    case 'full':
      fullReset();
      break;
    default:
      console.error('❌ Neznámy príkaz:', command);
      process.exit(1);
  }
} 