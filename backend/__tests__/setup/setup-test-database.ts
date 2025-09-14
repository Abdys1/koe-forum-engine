import { execSync } from 'child_process';
import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from 'testcontainers';

let environment: StartedDockerComposeEnvironment | undefined;
let teardownHappened = false;

export async function setup() {
  console.log('Setting up test database...');
  environment = await new DockerComposeEnvironment('./__tests__/setup', 'docker-compose.yml').up();
  console.log('Test database is up and running.');
  execSync(`npm run migrate:test`);
  console.log('Database migrations applied.');
}

export async function teardown() {
  if (teardownHappened) {
    throw new Error('Teardown happened twice');
  }
  await environment?.down();
  teardownHappened = true;
}