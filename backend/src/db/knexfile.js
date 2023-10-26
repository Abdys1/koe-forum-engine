import config from '#src/Config.js';

export default {
  client: 'postgresql',
  debug: false,
  connection: {
    host: config.database.host,
    port: config.database.port,
    user: config.database.username,
    password: config.database.password,
    database: config.database.name,
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
};
