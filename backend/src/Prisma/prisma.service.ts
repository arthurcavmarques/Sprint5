import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Use the official Prisma driver adapter for Postgres
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente (garante que a URL esteja disponível)
dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Load env earlier (already done above) and ensure we have the connection string
    const url = process.env.DATABASE_URL_UNPOOLED;

    if (!url) {
      throw new Error('DATABASE_URL_UNPOOLED não definida no ambiente.');
    }

    // Create the adapter factory with a PoolConfig (PrismaPg accepts PoolConfig)
    // PrismaClient will call the adapter factory's connect() internally.
    const adapterFactory = new PrismaPg({ connectionString: url });

    // Provide the adapter factory to the generated client constructor
    super({ adapter: adapterFactory, log: ['warn', 'error'] });
  }

  async onModuleInit() {
    // Connect the Prisma client (the adapter factory will be used under the hood)
    await this.$connect();
  }

  // Ensure we disconnect cleanly when the module shuts down
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Use `any` to avoid TypeScript mismatch in event typings for the generated client
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}