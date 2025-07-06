const { Client } = require('pg');

// Railway PostgreSQL konfigurácia
const dbConfig = {
  host: 'hopper.proxy.rlwy.net',
  port: 56034,
  database: 'railway',
  user: 'postgres',
  password: 'igZOWrPdUDmfodROdwluvHonWNXlmZIj',
  ssl: {
    rejectUnauthorized: false
  }
};

class DatabaseUtils {
  constructor() {
    this.client = null;
  }

  async connect() {
    try {
      this.client = new Client(dbConfig);
      await this.client.connect();
      console.log('✅ Pripojenie k databáze úspešné');
      return true;
    } catch (error) {
      console.error('❌ Chyba pri pripojení:', error.message);
      return false;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.end();
      this.client = null;
      console.log('🔌 Pripojenie k databáze ukončené');
    }
  }

  async query(sql, params = []) {
    if (!this.client) {
      throw new Error('Nie ste pripojený k databáze. Najskôr zavolajte connect()');
    }
    
    try {
      const result = await this.client.query(sql, params);
      return result;
    } catch (error) {
      console.error('❌ Chyba pri vykonávaní query:', error.message);
      throw error;
    }
  }

  // Základné informácie o databáze
  async getInfo() {
    const info = await this.query('SELECT current_database() as db_name, version() as version');
    const tables = await this.query(`
      SELECT count(*) as table_count 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `);
    const size = await this.query(`
      SELECT pg_size_pretty(pg_database_size(current_database())) as size
    `);

    return {
      database: info.rows[0].db_name,
      version: info.rows[0].version.split(' ')[0],
      tables: parseInt(tables.rows[0].table_count),
      size: size.rows[0].size
    };
  }

  // Zoznam všetkých tabuliek
  async getTables() {
    const result = await this.query(`
      SELECT tablename, 
             pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename
    `);
    return result.rows;
  }

  // Počet záznamov v tabuľke
  async getRowCount(tableName) {
    const result = await this.query(`SELECT count(*) as count FROM "${tableName}"`);
    return parseInt(result.rows[0].count);
  }

  // Zoznam používateľov
  async getUsers() {
    const result = await this.query(`
      SELECT id, email, first_name, last_name, created_at
      FROM "user"
      ORDER BY created_at DESC
    `);
    return result.rows;
  }

  // Zoznam produktov
  async getProducts() {
    const result = await this.query(`
      SELECT id, title, handle, status, created_at
      FROM product
      ORDER BY created_at DESC
      LIMIT 10
    `);
    return result.rows;
  }

  // Zoznam objednávok
  async getOrders() {
    const result = await this.query(`
      SELECT id, display_id, email, total, currency_code, status, created_at
      FROM "order"
      ORDER BY created_at DESC
      LIMIT 10
    `);
    return result.rows;
  }

  // Vykonanie vlastného SQL dotazu
  async customQuery(sql) {
    console.log('🔍 Vykonávam query:', sql);
    const result = await this.query(sql);
    console.log(`📊 Výsledok: ${result.rows.length} záznamov`);
    return result.rows;
  }

  // Backup tabuľky do JSON súboru
  async backupTable(tableName) {
    const fs = require('fs');
    const result = await this.query(`SELECT * FROM "${tableName}"`);
    const filename = `backup_${tableName}_${new Date().toISOString().slice(0, 10)}.json`;
    
    fs.writeFileSync(filename, JSON.stringify(result.rows, null, 2));
    console.log(`💾 Backup tabuľky ${tableName} uložený do ${filename}`);
    return filename;
  }
}

// Funkcie pre priame použitie
async function quickConnect() {
  const db = new DatabaseUtils();
  const connected = await db.connect();
  if (connected) {
    const info = await db.getInfo();
    console.log(`📊 Databáza: ${info.database}`);
    console.log(`📊 Verzia: ${info.version}`);
    console.log(`📊 Tabuliek: ${info.tables}`);
    console.log(`📊 Veľkosť: ${info.size}`);
    await db.disconnect();
  }
}

async function listTables() {
  const db = new DatabaseUtils();
  await db.connect();
  const tables = await db.getTables();
  
  console.log('\n📋 Zoznam tabuliek:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  tables.forEach(table => {
    console.log(`${table.tablename.padEnd(30)} ${table.size}`);
  });
  
  await db.disconnect();
}

async function showUsers() {
  const db = new DatabaseUtils();
  await db.connect();
  const users = await db.getUsers();
  
  console.log('\n👥 Používatelia:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  users.forEach(user => {
    console.log(`${user.email.padEnd(30)} ${user.first_name || ''} ${user.last_name || ''}`);
  });
  
  await db.disconnect();
}

async function showProducts() {
  const db = new DatabaseUtils();
  await db.connect();
  const products = await db.getProducts();
  
  console.log('\n🛍️ Produkty (posledných 10):');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  products.forEach(product => {
    console.log(`${product.title.padEnd(30)} ${product.status}`);
  });
  
  await db.disconnect();
}

async function showOrders() {
  const db = new DatabaseUtils();
  await db.connect();
  const orders = await db.getOrders();
  
  console.log('\n📦 Objednávky (posledných 10):');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  orders.forEach(order => {
    console.log(`#${order.display_id.toString().padEnd(8)} ${order.email.padEnd(25)} ${order.total} ${order.currency_code} ${order.status}`);
  });
  
  await db.disconnect();
}

// Export tried a funkcií
module.exports = {
  DatabaseUtils,
  quickConnect,
  listTables,
  showUsers,
  showProducts,
  showOrders,
  dbConfig
};

// Ak sa spustí priamo
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🛠️  Databázové nástroje - Použitie:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('node db-utils.js info      - Základné informácie o databáze');
    console.log('node db-utils.js tables    - Zoznam všetkých tabuliek');
    console.log('node db-utils.js users     - Zoznam používateľov');
    console.log('node db-utils.js products  - Zoznam produktov');
    console.log('node db-utils.js orders    - Zoznam objednávok');
    console.log('node db-utils.js query "SELECT * FROM users LIMIT 5" - Vlastný SQL dotaz');
    console.log('\n📖 Príklady programového použitia:');
    console.log('const { DatabaseUtils } = require("./db-utils");');
    console.log('const db = new DatabaseUtils();');
    console.log('await db.connect();');
    console.log('const users = await db.getUsers();');
    console.log('await db.disconnect();');
    process.exit(0);
  }
  
  const command = args[0];
  
  switch (command) {
    case 'info':
      quickConnect();
      break;
    case 'tables':
      listTables();
      break;
    case 'users':
      showUsers();
      break;
    case 'products':
      showProducts();
      break;
    case 'orders':
      showOrders();
      break;
    case 'query':
      if (args[1]) {
        (async () => {
          const db = new DatabaseUtils();
          await db.connect();
          const results = await db.customQuery(args[1]);
          console.table(results);
          await db.disconnect();
        })();
      } else {
        console.error('❌ Zadajte SQL dotaz');
      }
      break;
    default:
      console.error('❌ Neznámy príkaz:', command);
      process.exit(1);
  }
} 