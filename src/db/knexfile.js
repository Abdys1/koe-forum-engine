import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default {
  development: {
    client: 'postgresql',
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
      stub: './migration.stub.js',
    },
    seeds: {
      stub: './seed.stub.js',
    },
  },
};
