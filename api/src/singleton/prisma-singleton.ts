import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { env } from 'process';
export default class PrismaSingleton {
  static #instance: PrismaSingleton;
  #prisma: PrismaClient;

  private constructor() {
    const connectionString: string = `${env.DATABASE_URL}`;
    const adapter: PrismaPg = new PrismaPg({ connectionString });
    this.#prisma = new PrismaClient({
      adapter,
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  public static get instance(): PrismaSingleton {
    if (!PrismaSingleton.#instance) {
      PrismaSingleton.#instance = new PrismaSingleton();
    }
    return PrismaSingleton.#instance;
  }

  public get client(): PrismaClient {
    return this.#prisma;
  }

  async disconnect(): Promise<void> {
    await this.#prisma.$disconnect();
  }
}
