import { PrismaClient } from '@prisma/client';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

declare global {
  var __aveniq_prisma__: PrismaClient | undefined;
}

export const prisma =
  globalThis.__aveniq_prisma__ ||
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalThis.__aveniq_prisma__ = prisma;
}

export interface DbStatus {
  connected: boolean;
  message: string;
}

/**
 * Verifies live connection to PostgreSQL without crashing the application
 * if PostgreSQL has not yet been started or provisioned.
 */
export async function checkDatabaseConnection(): Promise<DbStatus> {
  try {
    // Basic ping test via raw query
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, message: 'Database connection verified' };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Unknown database error';
    return {
      connected: false,
      message: `Database connection pending or unavailable (${errMessage})`,
    };
  }
}

/**
 * Gracefully disconnects Prisma client on process termination.
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected cleanly');
  } catch (error) {
    logger.error('Error disconnecting database', error);
  }
}
