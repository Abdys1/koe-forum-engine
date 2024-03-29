import 'dotenv/config';
import { readFileSync } from 'fs';
import os from 'os';
import path from 'path';
import { Config } from '@src/types';

function readTestDatabaseUrl(): string {
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

// TODO dobjunk el exception ha nincsenek meg a szükséges környezeti változók
const databaseUrl = process.env.NODE_ENV === 'test' ? readTestDatabaseUrl() : (process.env.DATABASE_URL || '');

export default {
  database: {
    url: databaseUrl,
  },
  auth: {
    secrets: {
      accessToken: process.env.ACCESS_TOKEN_SECRET || '',
      refreshToken: process.env.REFRESH_TOKEN_SECRET || '',
    },
  },
} as Config;
