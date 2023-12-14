import 'dotenv/config';
import path from 'path';
import os from 'os';
import { readFileSync } from 'fs';

function readTestDatabaseUrl() {
  try {
    const variablesDir = path.join(
      os.tmpdir(),
      'testcontainer_global_setup',
    );
    return readFileSync(path.join(variablesDir, 'databaseUrl'), 'utf8');
  } catch (err) {
    return '';
  }
}

const databaseUrl = process.env.NODE_ENV === 'test' ? readTestDatabaseUrl() : process.env.DATABASE_URL;

export default {
  database: {
    url: databaseUrl,
  },
  auth: {
    secrets: {
      accessToken: process.env.ACCESS_TOKEN_SECRET,
      refreshToken: process.env.REFRESH_TOKEN_SECRET,
    },
  },
};
