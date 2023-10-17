import db from 'db/index.js';

const MIGRATIONS_DIR = './src/db/migrations';

async function migrateDatabase() {
  await db.migrate.down({ directory: MIGRATIONS_DIR });
  return db.migrate.latest({ directory: MIGRATIONS_DIR });
}

export default migrateDatabase;
