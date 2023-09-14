import path from 'path';
import os from 'os';
import { readFileSync } from 'fs';

function readTestDatabasePort() {
  const variablesDir = path.join(
    os.tmpdir(),
    'testcontainer_global_setup',
  );
  const port = readFileSync(path.join(variablesDir, 'databasePort'), 'utf8');
  return port ? Number(port) : undefined;
}

export default {
  development: {
    client: 'postgresql',
    debug: false,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      loadExtensions: ['.js'],
      stub: 'migration.stub.js',
    },
    seeds: {
      stub: 'seed.stub.js',
    },
  },
  test: {
    client: 'postgresql',
    debug: false,
    connection: {
      host: 'localhost',
      port: readTestDatabasePort(),
      user: 'koe_engine',
      password: 'test',
      database: 'koe_forum_db',
    },
    migrations: {
      tableName: 'knex_migrations',
      loadExtensions: ['.js'],
    },
  },
};
