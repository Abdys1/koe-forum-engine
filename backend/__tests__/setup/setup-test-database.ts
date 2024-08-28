import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';
import { mkdir, writeFile } from 'fs/promises';
import os from 'os';
import path from 'path';

let container: StartedMongoDBContainer | undefined;
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
  container = await new MongoDBContainer('mongo:6.0.1').start();
  const connectionUrl = `mongodb://127.0.0.1:${container.getMappedPort(27017)}/koe-forum-engine?directConnection=true&w=majority`;
  await shareDatabaseConfig(connectionUrl);
}

export async function teardown() {
  if (teardownHappened) {
    throw new Error('Teardown happened twice');
  }
  await container?.stop();
  teardownHappened = true;
}
