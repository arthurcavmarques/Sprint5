// prisma.config.ts

// Updated for Prisma v7+: use the new config entrypoint
import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  // Move connection details here — prefer the `env()` helper for type-safety
  datasource: {
    url: env('DATABASE_URL_UNPOOLED'),
  },
});