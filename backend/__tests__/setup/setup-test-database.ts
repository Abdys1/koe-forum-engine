import { mkdir, writeFile } from 'fs/promises';
import os from 'os';
import path from 'path';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';

let container: StartedPostgreSqlContainer | undefined;
let teardownHappened = false;

async function shareDatabaseConfig(databaseUrl: string) {
  const variablesDir = path.join(
    os.tmpdir(),
    'testcontainer_global_setup',
  );
  await mkdir(variablesDir, { recursive: true });
  await writeFile(path.join(variablesDir, 'databaseUrl'), databaseUrl);
}

export async function setup() {
  container = await new PostgreSqlContainer().start();

  const databaseUrl = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${container.getPort()}/${container.getDatabase()}`;

  execSync(`DATABASE_URL=${databaseUrl} npx prisma migrate deploy`);

  await shareDatabaseConfig(databaseUrl);
}

export async function teardown() {
  if (teardownHappened) {
    throw new Error('Teardown happened twice');
  }
  await container?.stop();
  teardownHappened = true;
}