import { app } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { disconnectDatabase } from './config/database.js';

const server = app.listen(env.PORT, () => {
  logger.info(`====================================================`);
  logger.info(`  Aveniq API Server running in [${env.NODE_ENV}] mode`);
  logger.info(`  Local URL:   http://localhost:${env.PORT}`);
  logger.info(`  Health Check: http://localhost:${env.PORT}${env.API_PREFIX}/health`);
  logger.info(`====================================================`);
});

// Handle graceful shutdown
let isShuttingDown = false;

async function handleShutdown(signal: string): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  // Close server accepting new connections
  server.close(async () => {
    logger.info('HTTP server closed.');

    // Disconnect Prisma client
    await disconnectDatabase();

    logger.info('Clean shutdown completed. Exiting.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds timeout
  setTimeout(() => {
    logger.error('Shutdown timed out. Forcing process exit.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});
