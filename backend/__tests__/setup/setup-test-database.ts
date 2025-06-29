import { execSync } from 'child_process';
import { DockerComposeEnvironment, StartedDockerComposeEnvironment } from 'testcontainers';

let environment: StartedDockerComposeEnvironment | undefined;
let teardownHappened = false;

export async function setup() {
  environment = await new DockerComposeEnvironment('./__tests__/setup', 'docker-compose.yml').up();
  execSync(`npm run migrate:test`);
}

export async function teardown() {
  if (teardownHappened) {
    throw new Error('Teardown happened twice');
  }
  await environment?.down();
  teardownHappened = true;
}