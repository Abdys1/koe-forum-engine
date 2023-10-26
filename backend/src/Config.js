import 'dotenv/config';
import path from 'path';
import os from 'os';
import { readFileSync } from 'fs';

function readTestDatabasePort() {
  try {
    const variablesDir = path.join(
      os.tmpdir(),
      'testcontainer_global_setup',
    );
    const port = readFileSync(path.join(variablesDir, 'databasePort'), 'utf8');
    return port ? Number(port) : undefined;
  } catch (err) {
    return 5432;
  }
}

let dbConfig;
if (process.env.NODE_ENV !== 'test') {
  dbConfig = {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
} else {
  dbConfig = {
    name: 'koe_forum_db',
    host: 'localhost',
    port: readTestDatabasePort(),
    username: 'koe_engine',
    password: 'test',
  };
}

export default {
  database: dbConfig,
  auth: {
    secrets: {
      accessToken: process.env.ACCESS_TOKEN_SECRET,
      refreshToken: process.env.REFRESH_TOKEN_SECRET,
    },
  },
};
