Adding Integration Tests with TestContainers to a Next.js Monorepo

Prerequisites

- Docker installed and running
- Prisma with PostgreSQL
- Jest + ts-jest already configured for unit tests
- Monorepo structure: apps/web/, packages/database/

1. Install dependencies

In apps/web/package.json, add to devDependencies:

"@testcontainers/postgresql": "^11.5.1",
"testcontainers": "^11.5.1"

Add the integrationTest script:

"integrationTest": "jest --config jest.integration.config.cjs --coverage"

Run yarn install (or npm ci) from the repo root.

2. Add the Turbo task

In turbo.json:

"integrationTest": {
  "cache": false
}

In the root package.json scripts:

"integrationTest": "turbo integrationTest"

3. Exclude integration tests from unit test runs

In apps/web/jest.config.cjs, add:

testPathIgnorePatterns: ['/__integrationTests__/'],

4. Create the integration Jest config

apps/web/jest.integration.config.cjs

module.exports = {
  preset: '<your-jest-preset>',
  setupFilesAfterEnv: ['<rootDir>/jest.integration.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/**/__integrationTests__/*.test.ts'],
  testTimeout: 60000,
};

5. Create the global setup file

apps/web/jest.integration.setup.ts

import { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';

let container: StartedPostgreSqlContainer;
let prisma: PrismaClient;

beforeAll(async () => {
  container = await new PostgreSqlContainer('postgres:15')
    .withDatabase('testdb')
    .withUsername('testuser')
    .withPassword('testpass')
    .start();

  const databaseUrl = container.getConnectionUri();
  process.env.DATABASE_URL = databaseUrl;

  prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });
  global.testPrisma = prisma;

  execSync('npx prisma migrate deploy', {
    cwd: '../../packages/database',
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: 'inherit',
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  await container.stop();
});

6. Add the global type declaration

apps/web/tests/integration-tests.ts

import { PrismaClient } from '@prisma/client';

declare global {
  export var testPrisma: PrismaClient;
}

7. Write tests

Place test files under __integrationTests__/ anywhere in src/. Example:

apps/web/src/lib/db/__integrationTests__/database.test.ts

describe('Database Integration Tests', () => {
  beforeEach(async () => {
    await global.testPrisma.someModel.deleteMany();
  });

  it('creates and retrieves a record', async () => {
    const record = await global.testPrisma.someModel.create({ data: { ... } });
    expect(record.id).toBeDefined();
  });
});

Key points:
- Use global.testPrisma to access the Prisma client
- Clean up only the tables your tests touch in beforeEach
- All tests in a run share one container — cleanup prevents test pollution

8. Add to CI

In .github/workflows/build.yaml, add as the last step in the existing job:

- name: Run integration tests
  run: yarn integrationTest

No Docker setup needed — ubuntu-latest runners have Docker pre-installed.

Running locally

yarn integrationTest          # from repo root
# or
cd apps/web && yarn integrationTest  # from app directory
