import { GenericContainer } from 'testcontainers';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';
import config from '#src/Config.js';

let container;
let teardownHappened = false;

async function shareDatabaseConfig(cont) {
  const variablesDir = path.join(
    os.tmpdir(),
    'testcontainer_global_setup',
  );
  await mkdir(variablesDir, { recursive: true });
  await writeFile(
    path.join(variablesDir, 'databasePort'),
    cont.getMappedPort(5432).toString(),
  );
}

export async function setup() {
  container = await new GenericContainer('postgres:14.3-alpine')
    .withEnvironment({
      POSTGRES_USER: config.database.username,
      POSTGRES_DB: config.database.name,
      POSTGRES_PASSWORD: config.database.password,
    })
    .withExposedPorts(5432)
    .withTmpFs({ '/temp_pgdata': 'rw,noexec,nosuid,size=65536k' })
    .start();
  await shareDatabaseConfig(container);
}

export async function teardown() {
  if (teardownHappened) {
    throw new Error('Teardown happened twice');
  }
  await container?.stop();
  teardownHappened = true;
}
