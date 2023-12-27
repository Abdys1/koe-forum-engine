import { MongoDBContainer } from '@testcontainers/mongodb';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

let container;
let teardownHappened = false;

async function shareDatabaseConfig(databaseUrl) {
  const variablesDir = path.join(
    os.tmpdir(),
    'testcontainer_global_setup',
  );
  await mkdir(variablesDir, { recursive: true });
  await writeFile(path.join(variablesDir, 'databaseUrl'), databaseUrl);
}

export async function setup() {
  container = await new MongoDBContainer('mongo:6.0.1').start();
  const connectionUrl = `mongodb://127.0.0.1:${container.getMappedPort(27017)}/koe-forum-engine?directConnection=true`;
  await shareDatabaseConfig(connectionUrl);
}

export async function teardown() {
  if (teardownHappened) {
    throw new Error('Teardown happened twice');
  }
  await container?.stop();
  teardownHappened = true;
}
