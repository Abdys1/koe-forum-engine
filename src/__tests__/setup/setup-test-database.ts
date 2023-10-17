import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

let container: StartedTestContainer;
let teardownHappened = false;

async function shareDatabaseConfig(cont: StartedTestContainer) {
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

// TODO olvassuk fel a compose filet
export async function setup() {
  container = await new GenericContainer('postgres:14.3-alpine')
    .withEnvironment({ POSTGRES_USER: 'koe_engine', POSTGRES_DB: 'koe_forum_db', POSTGRES_PASSWORD: 'test' })
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
